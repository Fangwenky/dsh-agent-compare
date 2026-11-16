import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import os from 'node:os'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCli = process.env.npm_execpath
assert.ok(npmCli && path.isAbsolute(npmCli), 'Run through npm run check:publish-readme')
const requireNpm = createRequire(npmCli)
const pacote = requireNpm('pacote')
const tempParent = path.resolve(os.tmpdir())
const temporary = await mkdtemp(path.join(tempParent, 'agent-compare-readme-'))
try {
  const output = JSON.parse(execFileSync(process.execPath, [npmCli, 'pack', '--ignore-scripts', '--json', '--pack-destination', temporary], { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }))
  const packages = Array.isArray(output) ? output : Object.values(output)
  assert.equal(packages.length, 1)
  const archive = packages[0]
  assert.equal(path.basename(archive.filename), archive.filename)
  const metadata = await pacote.manifest(path.join(temporary, archive.filename), { fullMetadata: true, fullReadJson: true, ignoreScripts: true, cache: path.join(temporary, 'cache') })
  const expected = await readFile(path.join(root, 'README.md'), 'utf8')
  const normalize = text => text.replaceAll('\r\n', '\n')
  assert.equal(metadata.name, archive.name)
  assert.equal(metadata.version, archive.version)
  assert.ok(typeof metadata.readme === 'string' && normalize(metadata.readme) === normalize(expected), `npm selected ${metadata.readmeFilename ?? 'an unknown README'} without the complete README.md content`)
  console.log(JSON.stringify({ publishReadmeMatchesCanonical: true, selectedFile: metadata.readmeFilename, version: metadata.version, characters: metadata.readme.length, packageBytes: archive.size }))
} finally {
  assert.equal(path.dirname(path.resolve(temporary)), tempParent)
  assert.ok(path.basename(temporary).startsWith('agent-compare-readme-'))
  await rm(temporary, { recursive: true, force: true })
}
