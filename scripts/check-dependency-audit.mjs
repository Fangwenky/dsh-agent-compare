import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { lstatSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const example = path.join(root, 'examples', 'vite-react-demo')
const vendor = path.join(root, 'vendor', 'picomatch')
const readJson = file => JSON.parse(readFileSync(file, 'utf8'))
const backport = readJson(path.join(vendor, 'picomatch-4.0.7.json'))
const archive = path.join(example, 'vendor', backport.archive)
const archiveBytes = readFileSync(archive)
assert.equal('sha512-' + createHash('sha512').update(archiveBytes).digest('base64'), backport.integrity)

const scope = process.argv[2] ?? 'project'
assert.ok(scope === 'project' || scope === 'example', 'Expected project or example')
const cwd = scope === 'example' ? example : root
const lock = readJson(path.join(cwd, 'package-lock.json'))
const entries = Object.entries(lock.packages).filter(([name, spec]) =>
  name.split('/').at(-1) === 'picomatch' || spec.name === 'picomatch'
)
assert.ok(entries.length > 0, 'Expected a matcher in the frozen dependency tree')
const manifest = readJson(path.join(cwd, 'package.json'))
const expected = 'file:' + path.relative(cwd, archive).split(path.sep).join('/')
assert.equal(manifest.devDependencies.picomatch, expected)
assert.equal(manifest.overrides.picomatch, '$picomatch')
const require = createRequire(import.meta.url)

for (const [name, spec] of entries) {
  assert.equal(spec.version, backport.version, name)
  assert.equal(spec.resolved, expected, name)
  assert.equal(spec.integrity, backport.integrity, name)
  assert.ok(!spec.link && !name.split('/').includes('..'), name)
  const directory = path.join(cwd, name)
  assert.ok(lstatSync(directory).isDirectory(), name)
  for (const [file, digest] of Object.entries(backport.files)) {
    const installed = path.join(directory, file)
    assert.ok(lstatSync(installed).isFile(), installed)
    assert.equal(createHash('sha256').update(readFileSync(installed)).digest('hex'), digest, installed)
  }

  const match = require(directory)
  assert.ok(match('src/**/*.ts')('src/core/example.ts'))
  assert.ok(match('static/+(one|two).svg')('static/onetwo.svg'))
  assert.throws(() => match.makeRe('photos/+(collection-*.jpg)'), SyntaxError)
}

const npm = process.env.npm_execpath
assert.ok(npm, 'Run this check through npm run check:dependency-audit')
const audit = spawnSync(process.execPath, [npm, 'audit', '--audit-level=moderate', '--json'], {
  cwd,
  encoding: 'utf8',
  timeout: 120_000,
  maxBuffer: 8 * 1024 * 1024
})
if (audit.error) throw audit.error
assert.ok(audit.status === 0 || audit.status === 1, 'npm audit did not finish normally')
const report = JSON.parse(audit.stdout)
assert.equal(report.auditReportVersion, 2)
assert.ok(!report.error && report.vulnerabilities && report.metadata?.vulnerabilities, 'Expected an npm audit report')

const severity = ['info', 'low', 'moderate', 'high', 'critical']
const verified = new Set(entries.map(([name]) => name))
const findings = report.vulnerabilities
const blocked = []
let mitigated = 0

for (const [name, finding] of Object.entries(findings)) {
  assert.ok(Array.isArray(finding.via) && finding.via.length && severity.includes(finding.severity))
  for (const advisory of finding.via) {
    if (typeof advisory === 'string') {
      assert.ok(Object.hasOwn(findings, advisory), 'npm audit report omitted a referenced finding')
      continue
    }
    const level = severity.indexOf(advisory.severity)
    assert.ok(level >= 0, 'npm audit reported an unknown severity')
    if (level < severity.indexOf('moderate')) continue

    // npm identifies the original release by version. The sole local
    // mitigation applies to this advisory and to the byte-verified copies.
    if (name === 'picomatch' && advisory.dependency === name && advisory.url === backport.advisory &&
        advisory.range === backport.range && finding.nodes.length && finding.nodes.every(node => verified.has(node))) {
      mitigated++
    } else {
      blocked.push(advisory.url || advisory.title || name)
    }
  }
}

assert.equal(blocked.length, 0, `Unresolved npm advisories: ${[...new Set(blocked)].join(', ')}`)
assert.ok(audit.status === 0 || mitigated > 0, 'npm audit failed without a verified local mitigation')
console.log(JSON.stringify({ scope, verifiedMatcherCopies: verified.size, npmExit: audit.status, mitigated, unresolved: 0 }))
