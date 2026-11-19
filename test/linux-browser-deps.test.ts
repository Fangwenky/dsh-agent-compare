import { describe, expect, it } from 'vitest'
import { aptDownloadDeadline, aptInstallFromCache, configureUbuntuBrowserSources, installUbuntuBrowserDependencies, selectUbuntuBrowserMirror } from '../scripts/ubuntu-browser-sources.mjs'

function fixture(entries: Record<string, string>, unsafe?: string) {
  const files = new Map(Object.entries(entries)), writes: string[] = []
  return { files, writes, io: {
    async lstat(file: string) {
      if (!files.has(file)) throw Object.assign(new Error('missing'), { code: 'ENOENT' })
      return { isFile: () => true, isSymbolicLink: () => file === unsafe, size: Buffer.byteLength(files.get(file)!) }
    },
    async readFile(file: string) { return files.get(file)! },
    async writeFile(file: string, value: string) { writes.push(file); files.set(file, value) },
  } }
}

describe('Ubuntu browser dependency sources', () => {
  it('updates indirect mirror lists while preserving priority and signed sources', async () => {
    const source = '/etc/apt/sources.list.d/ubuntu.sources', mirrors = '/etc/apt/apt-mirrors.txt'
    const config = 'Types: deb\nURIs: mirror+file:/etc/apt/apt-mirrors.txt\nSuites: noble noble-updates\nSigned-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n'
    const f = fixture({ [source]: config, [mirrors]: 'http://azure.archive.ubuntu.com/ubuntu/ priority:1\nhttp://archive.ubuntu.com/ubuntu/ priority:2\n' })
    expect(await configureUbuntuBrowserSources(f.io)).toEqual({ changedSourceFiles: 1 })
    expect(f.files.get(mirrors)).toBe('https://archive.ubuntu.com/ubuntu/ priority:1\nhttps://archive.ubuntu.com/ubuntu/ priority:2\n')
    expect(f.files.get(source)).toBe(config)
    expect(f.writes).toEqual([mirrors])
  })

  it('updates security mirror lists and classic sources without changing packages', async () => {
    const source = '/etc/apt/sources.list', mirrors = '/etc/apt/apt-mirrors-security.txt'
    const f = fixture({ [source]: 'deb http://azure.archive.ubuntu.com/ubuntu noble main universe\n', [mirrors]: 'https://azure.archive.ubuntu.com/ubuntu\r\n' })
    expect((await configureUbuntuBrowserSources(f.io)).changedSourceFiles).toBe(2)
    expect(f.files.get(source)).toBe('deb https://archive.ubuntu.com/ubuntu noble main universe\n')
    expect(f.files.get(mirrors)).toBe('https://archive.ubuntu.com/ubuntu\r\n')
    expect((await configureUbuntuBrowserSources(f.io)).changedSourceFiles).toBe(0)
  })

  it('rewrites Ubuntu EC2 mirrors from the current hosted runner image', async () => {
    const list = '/etc/apt/apt-mirrors.txt'
    const source = '/etc/apt/sources.list.d/ubuntu.sources'
    const region = 'http://us-east-2.ec2.archive.ubuntu.com/ubuntu'
    const unrelated = 'https://us-east-2.ec2.archive.ubuntu.com.example/ubuntu'
    const config = 'Types: deb\nURIs: mirror+file:/etc/apt/apt-mirrors.txt\nSuites: resolute resolute-updates\nSigned-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n'
    const f = fixture({ [source]: config, [list]: region + '/ priority:1\n' + unrelated + '\n' })
    await configureUbuntuBrowserSources(f.io, 'https://mirrors.edge.kernel.org/ubuntu')
    expect(f.files.get(list)).toBe('https://mirrors.edge.kernel.org/ubuntu/ priority:1\n' + unrelated + '\n')
    await configureUbuntuBrowserSources(f.io)
    expect(f.files.get(list)).toBe('https://archive.ubuntu.com/ubuntu/ priority:1\n' + unrelated + '\n')
    expect(f.files.get(source)).toBe(config)
  })


  it('preserves unrelated repositories and similarly named paths', async () => {
    const file = '/etc/apt/sources.list', text = 'deb https://packages.microsoft.com/ubuntu/24.04/prod noble main\nhttp://azure.archive.ubuntu.com/ubuntu-other\nhttp://azure.archive.ubuntu.com.example/ubuntu\n'
    const f = fixture({ [file]: text })
    expect((await configureUbuntuBrowserSources(f.io)).changedSourceFiles).toBe(0)
    expect(f.writes).toEqual([])
    expect(f.files.get(file)).toBe(text)
  })

  it('refuses a symbolic-link mirror list before writing it', async () => {
    const file = '/etc/apt/apt-mirrors.txt', f = fixture({ [file]: 'http://azure.archive.ubuntu.com/ubuntu\n' }, file)
    await expect(configureUbuntuBrowserSources(f.io)).rejects.toThrow()
    expect(f.writes).toEqual([])
  })

  it('selects a responding official origin when the primary cannot resolve', async () => {
    const probed: string[] = []
    const selected = await selectUbuntuBrowserMirror({ codename: 'noble', probe: async (url: string) => {
      probed.push(url)
      if (new URL(url).hostname === 'mirrors.edge.kernel.org') return false
      if (new URL(url).hostname === 'archive.ubuntu.com') throw Object.assign(new Error('DNS unavailable'), { code: 'EAI_AGAIN' })
      return true
    } })
    expect(selected.mirror).toBe('https://security.ubuntu.com/ubuntu')
    expect(probed).toHaveLength(3)
    expect(probed.every(url => url.endsWith('/dists/noble/InRelease'))).toBe(true)
    const file = '/etc/apt/sources.list.d/ubuntu.sources'
    const config = 'Types: deb\nURIs: https://archive.ubuntu.com/ubuntu/\nSuites: noble noble-updates noble-security\nComponents: main universe\nSigned-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n'
    const f = fixture({ [file]: config })
    await configureUbuntuBrowserSources(f.io, selected.mirror)
    expect(f.files.get(file)).toBe(config.replace('https://archive.ubuntu.com/ubuntu/', 'https://security.ubuntu.com/ubuntu/'))
  })

  it('does not start more requests after a healthy preferred origin', async () => {
    const probed: string[] = []
    const selected = await selectUbuntuBrowserMirror({ codename: 'noble', probe: async (url: string) => {
      probed.push(new URL(url).hostname)
      return true
    } })
    expect(selected.mirror).toBe('https://mirrors.edge.kernel.org/ubuntu')
    expect(probed).toEqual(['mirrors.edge.kernel.org'])
  })

  it('bounds stalled probes, aborts them and fails when all origins are unavailable', async () => {
    const signals: AbortSignal[] = []
    await expect(selectUbuntuBrowserMirror({ codename: 'noble', timeoutMs: 10, probe: async (_url: string, { signal }: { signal: AbortSignal }) => {
      signals.push(signal)
      return await new Promise(() => {})
    } })).rejects.toThrow('No supported Ubuntu HTTPS archive responded after 4 bounded 10 ms probes')
    expect(signals).toHaveLength(4)
    expect(signals.every(signal => signal.aborted)).toBe(true)
  })

  it('refuses an unapproved origin without reading or writing the source files', async () => {
    const f = fixture({ '/etc/apt/sources.list': 'deb https://archive.ubuntu.com/ubuntu noble main\n' })
    await expect(configureUbuntuBrowserSources(f.io, 'https://unapproved.example/ubuntu')).rejects.toThrow('Unsupported Ubuntu archive origin')
    expect(f.writes).toEqual([])
  })

  it('uses the independent signed archive when all Ubuntu-domain origins fail', async () => {
    const probed: string[] = []
    const selected = await selectUbuntuBrowserMirror({ codename: 'noble', probe: async (url: string) => {
      probed.push(new URL(url).hostname)
      if (new URL(url).hostname.endsWith('.ubuntu.com')) throw Object.assign(new Error('DNS unavailable'), { code: 'EAI_AGAIN' })
      return true
    } })
    expect(selected.mirror).toBe('https://mirrors.edge.kernel.org/ubuntu')
    expect(probed).toEqual(['mirrors.edge.kernel.org'])
    const file = '/etc/apt/apt-mirrors-security.txt', f = fixture({ [file]: 'https://security.ubuntu.com/ubuntu/ priority:1\n' })
    await configureUbuntuBrowserSources(f.io, selected.mirror)
    expect(f.files.get(file)).toBe('https://mirrors.edge.kernel.org/ubuntu/ priority:1\n')
    await configureUbuntuBrowserSources(f.io)
    expect(f.files.get(file)).toBe('https://archive.ubuntu.com/ubuntu/ priority:1\n')
  })

  it('validates release paths and probe limits before making requests', async () => {
    let calls = 0
    const probe = async () => { calls++; return true }
    await expect(selectUbuntuBrowserMirror({ codename: '../noble', probe })).rejects.toThrow()
    await expect(selectUbuntuBrowserMirror({ codename: 'noble', probe, timeoutMs: 0 })).rejects.toThrow()
    await expect(selectUbuntuBrowserMirror({ codename: 'noble', probe, timeoutMs: 10001 })).rejects.toThrow()
    expect(calls).toBe(0)
  })

  it('excludes a previously failed archive before probing another origin', async () => {
    const hosts: string[] = []
    const selected = await selectUbuntuBrowserMirror({ codename: 'noble', excludedMirrors: ['https://mirrors.edge.kernel.org/ubuntu'], probe: async (url: string) => { hosts.push(new URL(url).hostname); return true } })
    expect(selected.mirror).toBe('https://archive.ubuntu.com/ubuntu')
    expect(hosts).toEqual(['archive.ubuntu.com'])
    await expect(selectUbuntuBrowserMirror({ codename: 'noble', excludedMirrors: ['https://unapproved.example/ubuntu'] })).rejects.toThrow('Unsupported excluded archive origin')
  })
})

describe('Ubuntu browser dependency download recovery', () => {
  const networkFailure = 'E: Failed to fetch https://mirrors.edge.kernel.org/ubuntu/pool/main/f/fonts-freefont/fixture.deb Cannot initiate the connection: Network is unreachable; connection timed out'
  const source = '/etc/apt/sources.list.d/ubuntu.sources'
  const signed = 'Types: deb\nURIs: https://archive.ubuntu.com/ubuntu\nSuites: noble noble-updates noble-security\nComponents: main universe\nSigned-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n'

  it('does not repeat a successful dependency installation', async () => {
    const f = fixture({ [source]: signed }), browsers: string[] = []
    const result = await installUbuntuBrowserDependencies({ codename: 'noble', browser: 'webkit', io: f.io, probe: async () => true, run: async (browser: string) => { browsers.push(browser); return { status: 0, output: '' } } })
    expect(result.installed).toBe(true)
    expect(result.attempts).toHaveLength(1)
    expect(browsers).toEqual(['webkit'])
  })

  it('changes signed origin once when indexes work but actual package downloads fail', async () => {
    const f = fixture({ [source]: signed }), origins: string[] = []
    const result = await installUbuntuBrowserDependencies({ codename: 'noble', browser: 'chromium', io: f.io, probe: async () => true, run: async () => {
      origins.push(f.files.get(source)!)
      return origins.length === 1 ? { status: 100, output: networkFailure } : { status: 0, output: '' }
    } })
    expect(result.attempts.map((attempt: { mirror: string }) => attempt.mirror)).toEqual(['https://mirrors.edge.kernel.org/ubuntu', 'https://archive.ubuntu.com/ubuntu'])
    expect(origins).toEqual([signed.replace('archive.ubuntu.com', 'mirrors.edge.kernel.org'), signed])
    expect(result.attempts[0].transportFailure).toBe(true)
    expect(result.attempts[1].status).toBe(0)
  })

  it('stops after two failed downloads without cycling through more origins', async () => {
    const f = fixture({ [source]: signed }); let calls = 0
    await expect(installUbuntuBrowserDependencies({ codename: 'noble', browser: 'chromium', io: f.io, probe: async () => true, run: async () => { calls++; return { status: 100, output: networkFailure } } })).rejects.toThrow('bounded archive fallback')
    expect(calls).toBe(2)
  })

  it.each([0, 100].flatMap(status => ['NO_PUBKEY', 'Hash Sum mismatch', 'Unable to locate package', 'Unmet dependencies'].map(failure => ({ status, failure }))))('does not retry $failure at exit $status even alongside a connection error', async ({ status, failure }) => {
    const f = fixture({ [source]: signed }); let calls = 0
    await expect(installUbuntuBrowserDependencies({ codename: 'noble', browser: 'webkit', io: f.io, probe: async () => true, run: async () => { calls++; return { status, output: networkFailure + '\n' + failure } } })).rejects.toThrow('no eligible archive transport fallback')
    expect(calls).toBe(1)
  })

  it.each([{ status: 1, output: 'unknown installation error' }, { status: null, signal: 'SIGTERM', output: networkFailure }])('does not retry unknown or interrupted installations: %j', async outcome => {
    const f = fixture({ [source]: signed }); let calls = 0
    await expect(installUbuntuBrowserDependencies({ codename: 'noble', browser: 'webkit', io: f.io, probe: async () => true, run: async () => { calls++; return outcome } })).rejects.toThrow()
    expect(calls).toBe(1)
  })


  it('uses the alternate origin when the signed download stage reaches its deadline', async () => {
    const f = fixture({ [source]: signed })
    let runs = 0
    const result = await installUbuntuBrowserDependencies({ codename: 'noble', browser: 'webkit', io: f.io,
      probe: async () => true, run: async () => ++runs === 1 ? { status: 1, output: aptDownloadDeadline } : { status: 0, output: aptInstallFromCache },
    })
    expect(result.attempts.map((attempt: { transportFailure: boolean }) => attempt.transportFailure)).toEqual([true, false])
    expect(runs).toBe(2)
  })

  it.each([aptInstallFromCache, 'BADSIG'])('does not switch mirrors when %s is present', async marker => {
    const f = fixture({ [source]: signed })
    let runs = 0
    await expect(installUbuntuBrowserDependencies({ codename: 'noble', browser: 'webkit', io: f.io,
      probe: async () => true, run: async () => { runs++; return { status: 1, output: aptDownloadDeadline + '\n' + marker } },
    })).rejects.toThrow('no eligible archive transport fallback')
    expect(runs).toBe(1)
  })

  it('validates the browser before changing sources or starting a command', async () => {
    const f = fixture({ [source]: signed }); let calls = 0
    await expect(installUbuntuBrowserDependencies({ codename: 'noble', browser: 'unknown', io: f.io, run: async () => { calls++; return { status: 0 } } })).rejects.toThrow('Unsupported CI browser')
    expect(calls).toBe(0)
    expect(f.writes).toEqual([])
  })
})
