import { createServer } from 'node:net';
import { createServer as createHttpServer } from 'node:http';
import { createReadStream, existsSync, realpathSync, statSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { commandHasMarkers, DiagnosticLog, killTree, spawnSpec, startLongRunning, Tail } from './proc.js';
import { prepareProjectProcess } from './project-process.js';
import { fetchPreview } from './preview-url.js';
import { inspectProject } from './project.js';
/** Ask the OS for a free loopback port. The caller still uses --strictPort, so a race fails loudly. */
export function freePort() {
    return new Promise((resolve, reject) => {
        const srv = createServer();
        srv.unref();
        srv.on('error', reject);
        srv.listen(0, '127.0.0.1', () => {
            const addr = srv.address();
            srv.close(() => (addr && typeof addr === 'object' ? resolve(addr.port) : reject(new Error('no port'))));
        });
    });
}
/**
 * The helper that serves static files and wraps script previews. It is plain
 * compiled CommonJS next to this module; from source (tests), the build output.
 */
export const PREVIEW_RUNNER = fileURLToPath(import.meta.url.endsWith('.ts')
    ? new URL('../../lib/core/preview-runner.cjs', import.meta.url)
    : new URL('./preview-runner.cjs', import.meta.url));
/** A persisted Yarn wrapper must name this exact project and preview port. */
export function isPreviewProcess(preview, commandLine, windows = process.platform === 'win32') {
    if (!commandHasMarkers(commandLine, [`--port ${preview.port}`], windows))
        return false;
    if (preview.kind === 'static' || preview.kind === 'script')
        return commandHasMarkers(commandLine, [PREVIEW_RUNNER], windows);
    if (preview.launcher !== 'yarn')
        return commandHasMarkers(commandLine, [path.join(preview.cwd, 'node_modules', 'vite', 'bin', 'vite.js')], windows);
    const cwd = [`--cwd ${preview.cwd}`, `--cwd "${preview.cwd}"`, `--cwd '${preview.cwd}'`];
    return cwd.some(marker => commandHasMarkers(commandLine, [marker], windows)) && commandHasMarkers(commandLine, ['exec vite'], windows);
}
export class PreviewError extends Error {
    log;
    constructor(message, log) {
        super(message);
        this.log = log;
        this.name = 'PreviewError';
    }
}
const SUCCESS = (status) => status >= 200 && status < 300;
/** Any answer short of a server error means a project server is up (it may redirect or have no root page). */
const ANSWERING = (status) => status >= 200 && status < 500;
async function httpReady(url, signal, accept = SUCCESS) {
    try {
        const res = await fetchPreview(url, { signal });
        await res.body?.cancel();
        return accept(res.status);
    }
    catch {
        return false;
    }
}
/**
 * Serve a copy on a dedicated loopback port and return only after it answers
 * HTTP. `build` serves the output of the build the checks just ran (`vite
 * preview`), so what the user tries is the artifact that passed; `dev` runs the
 * dev server and is used only when there is no build to serve. The Vite binary
 * runs on the host Node directly, except modern Yarn's project-aware loader;
 * its wrapper and the complete child tree share this preview's lifecycle.
 */
export async function startVitePreview(dir, opts = {}) {
    const viteBin = path.join(dir, 'node_modules', 'vite', 'bin', 'vite.js');
    const project = await inspectProject(dir);
    const modernYarn = project.packageManager === 'yarn' && project.modernYarn === true;
    if (!modernYarn && !existsSync(viteBin))
        throw new PreviewError('副本里没有安装 vite', '');
    const kind = opts.kind ?? 'build';
    const timeoutMs = opts.timeoutMs ?? 60_000;
    const host = `ac-${randomBytes(16).toString('hex')}.localhost`;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
        const port = await freePort();
        const root = `http://${host}:${port}/`;
        const args = kind === 'build' ? ['preview'] : [];
        const command = modernYarn ? ['yarn', '--cwd', dir, 'exec', 'vite'] : ['node', viteBin];
        const prepared = await prepareProjectProcess({ argv: [...command, ...args, '--host', '127.0.0.1', '--port', String(port), '--strictPort'], cwd: dir,
            env: { BROWSER: 'none', FORCE_COLOR: '0', NO_COLOR: '1' }, signal: opts.signal }, opts.prepareProjectProcess);
        const child = startLongRunning(prepared.argv, {
            cwd: dir,
            env: prepared.env,
        });
        const log = new DiagnosticLog(6000);
        let closed = false;
        const exit = new Promise((resolve) => child.once('close', () => { closed = true; resolve(); }));
        child.stdout?.setEncoding('utf8').on('data', (d) => log.push(d));
        child.stderr?.setEncoding('utf8').on('data', (d) => { log.push(d); prepared.observeStderr?.(d); });
        const entry = () => {
            const printed = new RegExp(`http://127\\.0\\.0\\.1:${port}/[^\\s\\u001b]*`).exec(log.toString())?.[0];
            const url = new URL(printed ?? root);
            url.hostname = host;
            return url.href;
        };
        const outcome = await waitReady(child, entry, timeoutMs, opts.signal);
        if (outcome === 'ready' && child.pid !== undefined) {
            const pid = child.pid;
            let stopping;
            return { url: entry(), port, pid, log, ...(modernYarn ? { launcher: 'yarn' } : {}), stop: () => closed ? Promise.resolve() : stopping ??= (async () => {
                    try {
                        await killTree(pid);
                    }
                    finally {
                        if (!closed && child.exitCode === null && child.signalCode === null)
                            child.kill('SIGKILL');
                    }
                    let timer;
                    try {
                        await Promise.race([exit, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`预览进程 ${pid} 未在终止后退出`)), 5000); })]);
                    }
                    finally {
                        if (timer)
                            clearTimeout(timer);
                    }
                })().catch((error) => { stopping = undefined; throw error; }) };
        }
        try {
            await killTree(child.pid);
        }
        finally {
            if (!closed && child.exitCode === null && child.signalCode === null)
                child.kill('SIGKILL');
        }
        lastError = new PreviewError(outcome === 'exited' ? '预览服务在响应前退出' : outcome === 'aborted' ? 'cancelled' : `预览服务 ${Math.round(timeoutMs / 1000)} 秒内没有响应`, log.toString());
        if (outcome === 'aborted')
            break;
        // A port taken between probe and bind shows up as an early exit; retry with a new port.
        if (outcome !== 'exited' || !/(EADDRINUSE|port .* (in use|already))/i.test(log.toString()))
            break;
    }
    throw lastError ?? new PreviewError('预览服务启动失败', '');
}
/**
 * Serve a folder of static files (an `index.html` page, or another entry
 * page). No project code runs: only files inside `dir` are read. They are
 * served from this process, so the page is up at once and no child process
 * can be stopped by the host before it answers (the desktop app did exactly
 * that to the helper); the helper is the fallback.
 */
export async function startStaticPreview(dir, entry, opts = {}) {
    if (!entry || path.isAbsolute(entry) || entry.split(/[\\/]/).includes('..'))
        throw new PreviewError('静态页面入口无效', '');
    opts.signal?.throwIfAborted();
    try {
        return await serveStaticHere(dir, entry);
    }
    catch { /* fall back to the helper process */ }
    return startStaticHelperPreview(dir, entry, opts);
}
/** The same files served by the helper process: the fallback when this process cannot listen. */
export function startStaticHelperPreview(dir, entry, opts = {}) {
    if (!entry || path.isAbsolute(entry) || entry.split(/[\\/]/).includes('..'))
        return Promise.reject(new PreviewError('静态页面入口无效', ''));
    return startHelperPreview(dir, opts, async (port, host) => ({
        argv: [process.execPath, PREVIEW_RUNNER, 'static', '--port', String(port), '--cwd', dir, '--entry', entry, '--browser-host', host],
        env: helperEnvironment(),
    }));
}
const STATIC_TYPES = {
    '.html': 'text/html; charset=utf-8', '.htm': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.cjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.map': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
    '.md': 'text/plain; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
    '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.bmp': 'image/bmp',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf',
    '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.mp4': 'video/mp4', '.webm': 'video/webm',
    '.wasm': 'application/wasm', '.pdf': 'application/pdf',
};
/** The served file for a request path, or undefined when it must not be served (same rules as the helper). */
export function staticFileFor(root, entry, pathname) {
    let decoded;
    try {
        decoded = decodeURIComponent(pathname);
    }
    catch {
        return undefined;
    }
    if (decoded.includes('\0'))
        return undefined;
    const relative = decoded.replace(/^\/+/, '');
    let file = path.resolve(root, relative === '' ? entry : relative);
    const inside = path.relative(root, file);
    if (inside.startsWith('..') || path.isAbsolute(inside))
        return undefined;
    let stat;
    try {
        stat = statSync(file);
    }
    catch {
        return undefined;
    }
    if (stat.isDirectory()) {
        file = path.join(file, 'index.html');
        try {
            stat = statSync(file);
        }
        catch {
            return undefined;
        }
    }
    if (!stat.isFile())
        return undefined;
    // A link inside the copy must not expose files outside it.
    let real;
    try {
        real = realpathSync.native(file);
    }
    catch {
        return undefined;
    }
    const realInside = path.relative(root, real);
    if (realInside.startsWith('..') || path.isAbsolute(realInside))
        return undefined;
    return real;
}
/** A loopback server inside this process that only reads files below `dir`, never lists folders and never caches. */
function serveStaticHere(dir, entry) {
    const root = realpathSync.native(dir);
    const log = new DiagnosticLog(2000);
    const sockets = new Set();
    const host = `ac-${randomBytes(16).toString('hex')}.localhost`;
    // Set once the port is known; until then nothing is served.
    let allowedHosts = new Set();
    const server = createHttpServer((request, response) => {
        const headers = { 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' };
        // A loopback listener alone does not reject requests sent through another
        // domain. Bind file access to this preview's authority, never forwarded
        // data: the same rule as the helper's static server.
        const hosts = request.rawHeaders.filter((value, index) => index % 2 === 0 && value.toLowerCase() === 'host');
        if (hosts.length !== 1 || typeof request.headers.host !== 'string' || !allowedHosts.has(request.headers.host.toLowerCase())) {
            response.writeHead(403, { ...headers, 'content-type': 'text/plain; charset=utf-8' }).end('Forbidden host');
            return;
        }
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            response.writeHead(405, { ...headers, allow: 'GET, HEAD' }).end();
            return;
        }
        let pathname = '/';
        try {
            pathname = new URL(request.url ?? '/', 'http://preview.invalid').pathname;
        }
        catch { /* keep the entry */ }
        const file = staticFileFor(root, entry, pathname);
        if (file === undefined) {
            response.writeHead(404, { ...headers, 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
            return;
        }
        let size;
        try {
            size = statSync(file).size;
        }
        catch {
            response.writeHead(404, headers).end();
            return;
        }
        response.writeHead(200, { ...headers, 'content-type': STATIC_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'content-length': String(size) });
        if (request.method === 'HEAD') {
            response.end();
            return;
        }
        createReadStream(file).on('error', () => response.destroy()).pipe(response);
    });
    server.on('connection', socket => { sockets.add(socket); socket.once('close', () => sockets.delete(socket)); });
    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(0, '127.0.0.1', () => {
            const address = server.address();
            if (!address || typeof address !== 'object') {
                server.close();
                reject(new Error('no port'));
                return;
            }
            server.off('error', reject);
            server.on('error', error => log.push(`preview server error: ${error.message}\n`));
            allowedHosts = new Set(['127.0.0.1', 'localhost', host].map(name => `${name}:${address.port}`));
            log.push(`serving http://127.0.0.1:${address.port}/ in process\n`);
            let stopping;
            resolve({
                url: `http://${host}:${address.port}/`, port: address.port, pid: process.pid, log, inProcess: true,
                stop: () => stopping ??= new Promise(done => { for (const socket of sockets)
                    socket.destroy(); server.close(() => done()); }),
            });
        });
    });
}
/**
 * Run a project's own `dev` or `start` script as a preview. The script runs
 * inside the host's process boundary like every other project command; the
 * helper only owns its process tree. `PORT` and `HOST` ask the server for this
 * preview's loopback port; a server that ignores them never answers there and
 * the preview ends as "no live page".
 */
export function startScriptPreview(dir, command, opts = {}) {
    return startHelperPreview(dir, opts, async (port) => {
        const prepared = await prepareProjectProcess({ argv: command, cwd: dir, signal: opts.signal,
            env: { PORT: String(port), HOST: '127.0.0.1', HOSTNAME: '127.0.0.1', BROWSER: 'none', FORCE_COLOR: '0', NO_COLOR: '1', CI: '1' } }, opts.prepareProjectProcess);
        // Resolve the confined command exactly as other project processes are spawned.
        const spec = spawnSpec(prepared.argv);
        return {
            argv: [process.execPath, PREVIEW_RUNNER, 'script', '--port', String(port), '--cwd', dir, ...(spec.shell ? ['--shell', '--', spec.file] : ['--', spec.file, ...spec.args])],
            env: { ...prepared.env, ...helperEnvironment() },
            ...(prepared.observeStderr ? { observeStderr: prepared.observeStderr } : {}),
        };
    });
}
/** The helper runs on the host's own runtime, which may be Electron. */
function helperEnvironment() {
    return { ELECTRON_RUN_AS_NODE: '1', ...(process.env.SystemRoot ? { SystemRoot: process.env.SystemRoot } : {}) };
}
async function startHelperPreview(dir, opts, launch) {
    if (!existsSync(PREVIEW_RUNNER))
        throw new PreviewError('预览辅助进程缺失，请重新安装插件', '');
    const timeoutMs = opts.timeoutMs ?? 60_000;
    const host = `ac-${randomBytes(16).toString('hex')}.localhost`;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
        opts.signal?.throwIfAborted();
        const port = await freePort();
        const launched = await launch(port, host);
        const child = startLongRunning(launched.argv, { cwd: dir, env: launched.env });
        const log = new DiagnosticLog(6000);
        let closed = false;
        const exit = new Promise((resolve) => child.once('close', () => { closed = true; resolve(); }));
        child.stdout?.setEncoding('utf8').on('data', (d) => log.push(d));
        child.stderr?.setEncoding('utf8').on('data', (d) => { log.push(d); launched.observeStderr?.(d); });
        const url = `http://${host}:${port}/`;
        const outcome = await waitReady(child, () => url, timeoutMs, opts.signal, ANSWERING);
        if (outcome === 'ready' && child.pid !== undefined) {
            const pid = child.pid;
            let stopping;
            return { url, port, pid, log, stop: () => closed ? Promise.resolve() : stopping ??= (async () => {
                    try {
                        await killTree(pid);
                    }
                    finally {
                        if (!closed && child.exitCode === null && child.signalCode === null)
                            child.kill('SIGKILL');
                    }
                    let timer;
                    try {
                        await Promise.race([exit, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`预览进程 ${pid} 未在终止后退出`)), 5000); })]);
                    }
                    finally {
                        if (timer)
                            clearTimeout(timer);
                    }
                })().catch((error) => { stopping = undefined; throw error; }) };
        }
        try {
            await killTree(child.pid);
        }
        finally {
            if (!closed && child.exitCode === null && child.signalCode === null)
                child.kill('SIGKILL');
        }
        lastError = new PreviewError(outcome === 'exited' ? '预览服务在响应前退出' : outcome === 'aborted' ? 'cancelled' : `预览服务 ${Math.round(timeoutMs / 1000)} 秒内没有在指定端口响应`, log.toString());
        if (outcome === 'aborted')
            break;
        if (outcome !== 'exited' || !/(EADDRINUSE|port .* (in use|already))/i.test(log.toString()))
            break;
    }
    throw lastError ?? new PreviewError('预览服务启动失败', '');
}
function waitReady(child, url, timeoutMs, signal, accept = SUCCESS) {
    return new Promise((resolve) => {
        let done = false;
        const ctl = new AbortController();
        const finish = (r) => {
            if (done)
                return;
            done = true;
            ctl.abort();
            clearTimeout(timer);
            signal?.removeEventListener('abort', onAbort);
            resolve(r);
        };
        const onAbort = () => finish('aborted');
        signal?.addEventListener('abort', onAbort, { once: true });
        const timer = setTimeout(() => finish('timeout'), timeoutMs);
        child.once('exit', () => finish('exited'));
        child.once('error', () => finish('exited'));
        const poll = async () => {
            while (!done) {
                if (await httpReady(url(), ctl.signal, accept))
                    return finish('ready');
                await new Promise((r) => setTimeout(r, 300));
            }
        };
        if (signal?.aborted)
            onAbort();
        else
            void poll();
    });
}
