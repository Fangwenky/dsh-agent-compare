/**
 * The interface and the backend of this plugin update separately: DSH reloads
 * a plugin's interface at once, but keeps running the backend it loaded when
 * it started. Until DSH restarts, a new interface talks to an old backend that
 * records no steps, sends no replies beside files and finishes slowly. This
 * notices that and says how to fix it.
 */
import React, { useEffect, useState } from 'react'
import { t } from './i18n.js'

declare const __AC_CLIENT_VERSION__: string | undefined
/** Set by the build; absent when the source runs unbundled. */
export const CLIENT_VERSION: string | undefined = typeof __AC_CLIENT_VERSION__ === 'string' ? __AC_CLIENT_VERSION__ : undefined

type Call = <T>(method: string, body: Record<string, unknown>, signal?: AbortSignal) => Promise<T>
/** What the backend says about itself: a version, `older` when it predates the version route, or nothing to report. */
export type Backend = { version: string } | { older: true } | undefined

let asked: Promise<Backend> | undefined
/** Asked once per page: the backend cannot change without DSH restarting, which reloads the page. */
export function backendVersion(call: Call): Promise<Backend> {
  asked ??= call<{ pluginVersion?: unknown }>('version', {}).then(
    value => typeof value?.pluginVersion === 'string' ? { version: value.pluginVersion } : undefined,
    (error: Error) => /unknown method/i.test(error.message) ? { older: true } as const : undefined,
  )
  return asked
}

/** The backend DSH is running, when it is not the one this interface belongs to. */
export function useStaleBackend(call: Call): Backend {
  const [stale, setStale] = useState<Backend>()
  useEffect(() => {
    let active = true
    if (CLIENT_VERSION === undefined) return
    void backendVersion(call).then(backend => {
      if (!active || backend === undefined) return
      if ('older' in backend || backend.version !== CLIENT_VERSION) setStale(backend)
    })
    return () => { active = false }
  }, [call])
  return stale
}

/** A plain, prominent request to restart DSH. */
export function StaleBackendNotice({ call }: { call: Call }): React.ReactElement | null {
  const stale = useStaleBackend(call)
  if (stale === undefined) return null
  const running = 'version' in stale ? stale.version : t('3.1.0 之前的版本')
  return <div className="ac-feedback ac-stale-backend" role="alert">
    <b>{t('请完全退出并重新打开 DSH')}</b>
    <span>{t('AgentCompare 的界面已是 {0}，但 DSH 仍在运行启动时加载的 {1} 后台。重启前看不到各版的过程和回复，完成也会慢约 40 秒。', { 0: CLIENT_VERSION ?? '', 1: running })}</span>
  </div>
}
