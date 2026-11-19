// Configure the disposable CI machine while preserving the distribution's
// signing keys and Playwright's browser dependencies.
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { lstat, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  aptDownloadDeadline, aptInstallFromCache, configureUbuntuBrowserSources,
  installUbuntuBrowserDependencies, selectUbuntuBrowserMirror,
} from './ubuntu-browser-sources.mjs'

assert.equal(process.platform, 'linux')
assert.equal(process.env.GITHUB_ACTIONS, 'true')
assert.equal(process.getuid(), 0)
assert.ok(process.argv.length <= 3, 'Use at most one CI browser argument')
const browser = process.argv[2]
assert.ok(browser === undefined || ['chromium', 'webkit'].includes(browser), 'Unsupported CI browser')

const release = await readFile('/etc/os-release', 'utf8')
const codename = /^VERSION_CODENAME="?([a-z][a-z0-9-]*)"?$/m.exec(release)?.[1]
assert.ok(codename, 'Ubuntu release codename is unavailable')
await writeFile('/etc/apt/apt.conf.d/99agentcompare-browser-network', 'Acquire::Retries "2";\nAcquire::http::Timeout "30";\nAcquire::https::Timeout "30";\nDpkg::Use-Pty "0";\n')

const io = { lstat, readFile, writeFile }
if (browser === undefined) {
  const selected = await selectUbuntuBrowserMirror({ codename })
  const { changedSourceFiles } = await configureUbuntuBrowserSources(io, selected.mirror)
  console.log(JSON.stringify({ signedUbuntuHttpsMirror: true, selectedMirror: selected.mirror, probes: selected.probes, changedSourceFiles }))
} else {
  const cli = fileURLToPath(new URL('../node_modules/playwright-core/cli.js', import.meta.url))
  const bin = await mkdtemp(path.join(tmpdir(), 'agentcompare-browser-apt-'))
  try {
    // Playwright still selects the packages. Bound metadata and download-only
    // operations separately so a failed download leaves time for the fallback.
    // APT applies packages from its verified cache only after downloads finish.
    const apt = `#!/bin/sh
set -u
fetch_packages() {
  deadline="$1"
  shift
  /usr/bin/timeout --kill-after=5s "$deadline" /usr/bin/apt-get "$@"
  result=$?
  if [ "$result" -eq 124 ]; then
    printf '%s\\n' '${aptDownloadDeadline}' >&2
  fi
  return "$result"
}
case "\${1:-}" in
  update) fetch_packages 45s "$@" ;;
  install)
    fetch_packages 110s --download-only "$@" || exit $?
    printf '%s\\n' '${aptInstallFromCache}'
    exec /usr/bin/timeout --kill-after=5s 70s /usr/bin/apt-get --no-download "$@"
    ;;
  *) printf '%s\\n' 'Unexpected Playwright APT command' >&2; exit 64 ;;
esac
`
    await writeFile(path.join(bin, 'apt-get'), apt, { flag: 'wx', mode: 0o700 })
    const env = { ...process.env, PATH: bin + path.delimiter + (process.env.PATH ?? ''), LC_ALL: 'C' }
    const result = await installUbuntuBrowserDependencies({
      codename, browser, io,
      run: selectedBrowser => new Promise((resolve, reject) => {
        const child = execFile(process.execPath, [cli, 'install-deps', selectedBrowser], { env, maxBuffer: 8 * 1024 * 1024 },
          (error, stdout, stderr) => {
            if (error && typeof error.code !== 'number' && !error.signal) reject(error)
            else resolve({ status: error ? error.code ?? null : 0, signal: error?.signal, output: stdout + '\n' + stderr })
          })
        child.stdout.pipe(process.stdout, { end: false })
        child.stderr.pipe(process.stderr, { end: false })
      }),
    })
    console.log(JSON.stringify({ ...result, signaturePolicyChanged: false, downloadRetries: 2, connectionTimeoutSeconds: 30 }))
  } catch (error) {
    console.error(JSON.stringify({ installed: false, message: error.message, attempts: error.attempts ?? [] }))
    process.exitCode = 1
  } finally {
    await rm(bin, { recursive: true, force: true })
  }
}
