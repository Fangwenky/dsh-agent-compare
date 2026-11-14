// Configure the disposable CI machine, preserving the distribution's signed
// repositories and package versions. Never run as part of plugin installation.
import assert from 'node:assert/strict'
import {spawnSync} from 'node:child_process'
import {lstat,readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {configureUbuntuBrowserSources,installUbuntuBrowserDependencies,selectUbuntuBrowserMirror} from './ubuntu-browser-sources.mjs'
assert.equal(process.platform,'linux');assert.equal(process.env.GITHUB_ACTIONS,'true');assert.equal(process.getuid(),0)
assert.ok(process.argv.length<=3,'Use at most one CI browser argument')
const browser=process.argv[2]
assert.ok(browser===undefined||['chromium','webkit'].includes(browser),'Unsupported CI browser')
const release=await readFile('/etc/os-release','utf8')
const codename=/^VERSION_CODENAME="?([a-z][a-z0-9-]*)"?$/m.exec(release)?.[1]
assert.ok(codename,'Ubuntu release codename is unavailable')
await writeFile('/etc/apt/apt.conf.d/99agentcompare-browser-network','Acquire::Retries "2";\nAcquire::http::Timeout "30";\nAcquire::https::Timeout "30";\nDpkg::Use-Pty "0";\n')
if(browser===undefined){
  const selected=await selectUbuntuBrowserMirror({codename})
  const {changedSourceFiles}=await configureUbuntuBrowserSources({lstat,readFile,writeFile},selected.mirror)
  console.log(JSON.stringify({signedUbuntuHttpsMirror:true,selectedMirror:selected.mirror,probeMode:'sequential-first-success',probes:selected.probes,probeTimeoutMs:selected.timeoutMs,changedSourceFiles,signaturePolicyChanged:false,downloadRetries:2,connectionTimeoutSeconds:30}))
}else{
  // The workflow bounds this entire disposable-runner setup step to 8 minutes.
  const cli=fileURLToPath(new URL('../node_modules/playwright-core/cli.js',import.meta.url))
  try{
    const result=await installUbuntuBrowserDependencies({codename,browser,io:{lstat,readFile,writeFile},run:async selectedBrowser=>{
      const child=spawnSync(process.execPath,[cli,'install-deps',selectedBrowser],{encoding:'utf8',maxBuffer:8*1024*1024})
      if(child.stdout)process.stdout.write(child.stdout)
      if(child.stderr)process.stderr.write(child.stderr)
      if(child.error)throw child.error
      return {status:child.status,signal:child.signal,output:(child.stdout??'')+'\n'+(child.stderr??'')}
    }})
    console.log(JSON.stringify({...result,signaturePolicyChanged:false,downloadRetries:2,connectionTimeoutSeconds:30}))
  }catch(error){
    console.error(JSON.stringify({installed:false,message:error.message,attempts:error.attempts??[]}))
    process.exitCode=1
  }
}
