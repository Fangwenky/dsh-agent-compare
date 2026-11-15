/**
 * Live pages for projects that are not Vite: static files served from the
 * host process itself (with the helper process as fallback), and a project's
 * own server script run as a recognisable helper process.
 */
import { describe, expect, it } from 'vitest'
import { mkdir, symlink, writeFile } from 'node:fs/promises'
import { request } from 'node:http'
import path from 'node:path'
import { isPreviewProcess, startScriptPreview, startStaticHelperPreview, startStaticPreview, type Preview } from '../src/core/preview.ts'
import { fetchPreview } from '../src/core/preview-url.ts'
import { observeProcess, waitGone } from '../src/core/proc.ts'
import { prepareFixtureProcess, tmp } from './fixture.ts'

const T = 120_000
const text = async (url: string): Promise<{ status: number; body: string; type: string | null }> => {
  const response = await fetchPreview(url)
  return { status: response.status, body: await response.text(), type: response.headers.get('content-type') }
}
const post = (port: number): Promise<number> => new Promise((resolve, reject) => {
  const req = request({ host: '127.0.0.1', port, path: '/', method: 'POST' }, res => { res.resume(); resolve(res.statusCode ?? 0) })
  req.on('error', reject); req.end('x')
})

/** A folder with a page, a nested page, and a secret outside it (linked in when allowed). */
async function staticFixture(): Promise<{ root: string; outside: string; linked: boolean }> {
  const root = await tmp('ac-static'), outside = await tmp('ac-outside')
  await writeFile(path.join(root, 'index.html'), '<h1>calculator</h1>')
  await mkdir(path.join(root, 'pages'))
  await writeFile(path.join(root, 'pages', 'about.html'), '<p>about</p>')
  await writeFile(path.join(outside, 'secret.txt'), 'secret')
  let linked = false
  try { await symlink(path.join(outside, 'secret.txt'), path.join(root, 'link.txt')); linked = true } catch { /* no symlink permission on this machine */ }
  return { root, outside, linked }
}
async function expectOnlyFolderFiles(preview: Preview, outside: string, linked: boolean): Promise<void> {
  expect(await text(preview.url)).toMatchObject({ status: 200, body: '<h1>calculator</h1>', type: expect.stringContaining('text/html') })
  expect((await text(new URL('pages/about.html', preview.url).href)).body).toBe('<p>about</p>')
  expect((await text(new URL('pages/', preview.url).href)).status).toBe(404)
  const escape = `%2e%2e%2f${encodeURIComponent(path.basename(outside))}%2fsecret.txt`
  expect((await text(`${preview.url}${escape}`)).status).toBe(404)
  if (linked) expect((await text(new URL('link.txt', preview.url).href)).status).toBe(404)
  expect(await post(preview.port)).toBe(405)
}

describe('static preview', () => {
  it('serves only regular files inside its folder from this process, at once, and stops cleanly', async () => {
    const { root, outside, linked } = await staticFixture()
    const started = Date.now()
    const preview = await startStaticPreview(root, 'index.html', { timeoutMs: 30_000 })
    // No child process: nothing for a desktop host to stop before the page answers.
    expect(preview).toMatchObject({ inProcess: true, pid: process.pid })
    expect(Date.now() - started).toBeLessThan(2_000)
    try { await expectOnlyFolderFiles(preview, outside, linked) }
    finally { await preview.stop() }
    await expect(fetchPreview(preview.url, { signal: AbortSignal.timeout(3_000) })).rejects.toThrow()
    await preview.stop()
  }, T)

  it('serves the same files through the helper process as a fallback', async () => {
    const { root, outside, linked } = await staticFixture()
    const preview = await startStaticHelperPreview(root, 'index.html', { timeoutMs: 30_000 })
    try {
      await expectOnlyFolderFiles(preview, outside, linked)
      const observed = await observeProcess(preview.pid)
      expect(observed.state).toBe('observed')
      if (observed.state === 'observed') {
        expect(isPreviewProcess({ url: preview.url, port: preview.port, pid: preview.pid, kind: 'static', cwd: root }, observed.commandLine)).toBe(true)
        expect(isPreviewProcess({ url: preview.url, port: preview.port + 1, pid: preview.pid, kind: 'static', cwd: root }, observed.commandLine)).toBe(false)
      }
    } finally { await preview.stop() }
    expect(await waitGone(preview.pid, 5_000)).toBe(true)
    await expect(startStaticHelperPreview(root, '../outside.html')).rejects.toThrow(/入口无效/)
  }, T)

  it('opens another entry page when there is no index.html', async () => {
    const root = await tmp('ac-static-entry')
    await writeFile(path.join(root, 'calc.html'), '<h1>calc</h1>')
    const preview = await startStaticPreview(root, 'calc.html', { timeoutMs: 30_000 })
    try { expect((await text(preview.url)).body).toBe('<h1>calc</h1>') }
    finally { await preview.stop() }
    await expect(startStaticPreview(root, '../outside.html')).rejects.toThrow(/入口无效/)
  }, T)
})

describe('script preview', () => {
  const server = `const http = require('http')
http.createServer((q, s) => { s.setHeader('content-type', 'text/plain'); s.end('script ok ' + (q.headers.host || '')) })
  .listen(Number(process.env.PORT), process.env.HOST || '127.0.0.1', () => console.log('listening ' + process.env.PORT))
`
  it('runs the project start script on the preview port and stops its whole tree', async () => {
    const dir = await tmp('ac-script')
    await writeFile(path.join(dir, 'server.cjs'), server)
    await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'script-fixture', private: true, scripts: { start: 'node server.cjs' } }))
    let preview: Preview | undefined
    try {
      preview = await startScriptPreview(dir, ['npm', 'run', 'start', '--silent'], { timeoutMs: 60_000, prepareProjectProcess: prepareFixtureProcess })
      const page = await text(preview.url)
      expect(page.status).toBe(200)
      expect(page.body).toMatch(/^script ok ac-[0-9a-f]{32}\.localhost:/)
      const observed = await observeProcess(preview.pid)
      if (observed.state === 'observed') expect(isPreviewProcess({ url: preview.url, port: preview.port, pid: preview.pid, kind: 'script', cwd: dir }, observed.commandLine)).toBe(true)
    } finally { await preview?.stop() }
    // The server child is gone with the helper: the port no longer answers.
    await expect(fetchPreview(preview!.url, { signal: AbortSignal.timeout(3_000) })).rejects.toThrow()
  }, T)

  it('reports a script that never serves the preview port instead of hanging', async () => {
    const dir = await tmp('ac-script-silent')
    await writeFile(path.join(dir, 'package.json'), JSON.stringify({ name: 'silent', private: true, scripts: { start: 'node -e "setTimeout(() => {}, 60000)"' } }))
    await expect(startScriptPreview(dir, ['npm', 'run', 'start', '--silent'], { timeoutMs: 4_000, prepareProjectProcess: prepareFixtureProcess })).rejects.toThrow(/没有在指定端口响应/)
  }, T)
})
