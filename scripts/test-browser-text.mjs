import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { createServer } from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { runBrowserCheck } from '../lib/core/checks.js'

const output = await mkdtemp(path.join(os.tmpdir(), 'ac-browser-text-'))
const server = createServer((request, response) => {
  if (request.url === '/favicon.ico') { response.writeHead(204).end(); return }
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.end(`<!doctype html><html><body>
    <p>Account <strong>settings</strong></p><p hidden>Private draft</p>
    <p style="display:none">Hidden confirmation</p><p id="ready"></p>
    <button id="save">Save</button><p id="status" role="status"></p>
    <script>
      setTimeout(() => document.querySelector('#ready').textContent = ['Page','ready'].join(' '), 1100)
      document.querySelector('#save').onclick = () => setTimeout(() =>
        document.querySelector('#status').textContent = ['Changes','saved'].join(' '), 600)
      const internalLabel = 'Internal marker'
    </script>
  </body></html>`)
})
try {
  await new Promise((resolve, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolve))
  const url = 'http://127.0.0.1:' + server.address().port
  const exercise = (name, expectText, steps) => runBrowserCheck(url, { expectText, steps, mobileShot: false }, path.join(output, name + '.png'))
  const shown = await exercise('shown', 'Page ready', [{ expectText: 'Account settings' }, { click: '#save' }, { expectText: 'Changes saved' }])
  assert.equal(shown.outcome, 'passed', shown.reason)
  assert.ok(shown.steps.every(step => step.ok))
  const hidden = await exercise('hidden', 'Private draft', [{ expectText: 'Hidden confirmation' }, { expectText: 'Internal marker' }, { expectText: 'Absent text' }])
  assert.equal(hidden.outcome, 'failed')
  assert.match(hidden.reason, /Private draft/)
  assert.deepEqual(hidden.steps.map(step => step.ok), [false, false, false])
  console.log('Rendered text verified before actions and after a delayed click. Hidden, script-only and absent text all failed.')
} finally {
  server.closeAllConnections()
  if (server.listening) await new Promise(resolve => server.close(resolve))
  await rm(output, { recursive: true, force: true })
}
