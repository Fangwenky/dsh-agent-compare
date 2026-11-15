/**
 * Install dependencies once, while the versions are still being generated.
 *
 * Most versions do not change a project's dependencies. For an npm project
 * with a lockfile, the baseline's manifest is installed with the same frozen
 * command into a private directory of the run as soon as the copies exist.
 * A version whose manifest files are byte-identical to that baseline gets
 * its own copy of that tree instead of running its own install.
 * Anything unusual (another package manager, local `file:` packages, root
 * install scripts, a changed manifest, a failed or unfinished warm install,
 * a copy error) falls back to the version's own frozen install.
 *
 * The warm tree is outside every version's copy and each version gets its own
 * files, so no version can change the warm tree or another version.
 */
import { createHash } from 'node:crypto';
import { constants, existsSync } from 'node:fs';
import { copyFile, lstat, mkdir, opendir, readFile, readdir, realpath, rm, stat, symlink } from 'node:fs/promises';
import path from 'node:path';
/** Files that decide what `npm ci` installs. */
export const NPM_MANIFESTS = ['package.json', 'package-lock.json', 'npm-shrinkwrap.json', '.npmrc'];
const ROOT_SCRIPTS = ['preinstall', 'install', 'postinstall', 'prepare', 'prepublish'];
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
/** Fingerprint the manifest files of a project directory; absent files are recorded as absent. */
export async function manifestDigests(projectDir) {
    const out = {};
    for (const file of NPM_MANIFESTS) {
        const full = path.join(projectDir, file);
        out[file] = existsSync(full) ? digest(await readFile(full)) : null;
    }
    return out;
}
/**
 * Whether this project's dependencies can be installed ahead: an npm lockfile,
 * no root install scripts (they may need project files or write into the
 * project), and no local packages linked from inside the repository.
 */
export async function warmable(projectDir) {
    let pkg;
    let lock;
    try {
        pkg = JSON.parse(await readFile(path.join(projectDir, 'package.json'), 'utf8'));
        lock = JSON.parse(await readFile(path.join(projectDir, 'package-lock.json'), 'utf8'));
    }
    catch {
        return { ok: false, reason: 'no npm lockfile' };
    }
    if (typeof pkg.packageManager === 'string' && !pkg.packageManager.startsWith('npm@'))
        return { ok: false, reason: 'another package manager' };
    if (existsSync(path.join(projectDir, 'pnpm-lock.yaml')) || existsSync(path.join(projectDir, 'yarn.lock')))
        return { ok: false, reason: 'several lockfiles' };
    if (ROOT_SCRIPTS.some(name => typeof pkg.scripts?.[name] === 'string'))
        return { ok: false, reason: 'root install scripts' };
    for (const entry of Object.values(lock.packages ?? {})) {
        if (entry?.link === true || (typeof entry?.resolved === 'string' && entry.resolved.startsWith('file:')))
            return { ok: false, reason: 'local packages' };
    }
    return { ok: true };
}
/** Copy the manifest files into the warm directory. */
export async function stageManifests(projectDir, warmDir) {
    await mkdir(warmDir, { recursive: true });
    for (const file of NPM_MANIFESTS) {
        const from = path.join(projectDir, file);
        if (existsSync(from))
            await copyFile(from, path.join(warmDir, file));
    }
    return { manifests: await manifestDigests(warmDir) };
}
export function sameManifests(a, b) {
    return NPM_MANIFESTS.every(file => (a[file] ?? null) === (b[file] ?? null));
}
/** Files copied at once: enough to keep the disk busy, few enough to stay clear of open-file limits. */
export const COPY_CONCURRENCY = 32;
/**
 * Recreate `from` at `to` as an independent copy, so nothing a version's
 * checks write can reach the warm tree or another version. Files are copied
 * many at a time, and cloned where the file system can share blocks until a
 * write. Internal links are relocated into the copy. Escaping or dangling
 * links, redirected roots and a nonempty destination reject the copy so
 * the caller can use the version's own frozen install instead.
 */
export async function copyTree(from, to) {
    const plainDirectory = async (dir, role) => {
        const info = await lstat(dir);
        if (!info.isDirectory() || info.isSymbolicLink())
            throw new Error(`${role} must be a plain directory`);
    };
    const inside = (root, target) => {
        const relative = path.relative(root, target);
        return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
    };
    await plainDirectory(from, 'Dependency source');
    const sourceRoot = await realpath(from);
    await mkdir(to, { recursive: true });
    await plainDirectory(to, 'Dependency destination');
    const targetRoot = await realpath(to);
    if (inside(sourceRoot, targetRoot) || inside(targetRoot, sourceRoot))
        throw new Error('Dependency source and destination must be separate directories');
    if ((await readdir(targetRoot)).length)
        throw new Error('Dependency destination must be empty');
    const files = [];
    const links = [];
    const walk = async (src, dest) => {
        await plainDirectory(src, 'Dependency source');
        await mkdir(dest, { recursive: true });
        await plainDirectory(dest, 'Dependency destination');
        for await (const entry of await opendir(src)) {
            const s = path.join(src, entry.name), d = path.join(dest, entry.name);
            if (entry.isDirectory())
                await walk(s, d);
            else if (entry.isSymbolicLink()) {
                const target = await realpath(s);
                if (!inside(sourceRoot, target))
                    throw new Error('Link resolves outside the dependency tree');
                links.push({ dest: d, target: path.join(targetRoot, path.relative(sourceRoot, target)), directory: (await stat(s)).isDirectory() });
            }
            else
                files.push([s, d]);
        }
    };
    await walk(sourceRoot, targetRoot);
    for (const link of links) {
        const kind = link.directory ? 'junction' : 'file';
        const target = process.platform === 'win32' && link.directory ? link.target : path.relative(path.dirname(link.dest), link.target) || '.';
        await symlink(target, link.dest, process.platform === 'win32' ? kind : undefined);
    }
    let next = 0, failed = false;
    // A rejected copy must not leave other workers writing into the caller's
    // fallback installation. Stop queued work and drain every in-flight write.
    const results = await Promise.allSettled(Array.from({ length: Math.min(COPY_CONCURRENCY, files.length) }, async () => {
        while (!failed && next < files.length) {
            const [s, d] = files[next++];
            try {
                await copyFile(s, d, constants.COPYFILE_FICLONE);
            }
            catch (error) {
                failed = true;
                throw error;
            }
        }
    }));
    const error = results.find(result => result.status === 'rejected');
    if (error?.status === 'rejected')
        throw error.reason;
    return files.length;
}
export async function removeTree(dir) {
    await rm(dir, { recursive: true, force: true, maxRetries: 3 });
}
