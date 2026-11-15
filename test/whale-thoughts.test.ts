import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runningTool } from '../src/client/agent-view.tsx'
import { setLanguagePreference } from '../src/client/i18n.ts'
import type { Trace, TraceItem } from '../src/client/model.ts'

// Labels follow the interface language; pin it so the machine's own language does not matter.
beforeEach(() => { setLanguagePreference('zh-CN') })
afterEach(() => { setLanguagePreference('auto') })

const trace = (items: Omit<TraceItem, 'at'>[], done = false): Trace => ({
  items: items.map((item, index) => ({ at: index * 1000, ...item })),
  steps: items.length, tools: items.filter(item => item.kind === 'tool').length, thinking: items.filter(item => item.kind === 'thinking').length,
  truncated: false, done, updatedAt: 0,
})

describe('what the whale says it is doing', () => {
  it('names a tool while it runs', () => {
    expect(runningTool(trace([{ kind: 'thinking', text: '…' }, { kind: 'tool', name: 'write', target: 'index.html', status: 'running' }]))).toBe('写入文件 · index.html')
    expect(runningTool(trace([{ kind: 'tool', name: 'bash', status: 'running' }]))).toBe('运行命令')
    setLanguagePreference('en')
    expect(runningTool(trace([{ kind: 'tool', name: 'write', target: 'index.html', status: 'running' }]))).toBe('Write file · index.html')
  })

  it('has nothing to name between tools, so a thought never reads "正在：正在…"', () => {
    expect(runningTool(trace([{ kind: 'thinking', text: '…' }]))).toBeUndefined()
    expect(runningTool(trace([{ kind: 'tool', name: 'write', status: 'done' }]))).toBeUndefined()
    expect(runningTool(trace([{ kind: 'tool', name: 'write', status: 'error' }]))).toBeUndefined()
    expect(runningTool(trace([{ kind: 'text', text: '…' }]))).toBeUndefined()
  })

  it('says nothing for an empty or finished version', () => {
    expect(runningTool(undefined)).toBeUndefined()
    expect(runningTool(trace([]))).toBeUndefined()
    expect(runningTool(trace([{ kind: 'tool', name: 'write', status: 'running' }], true))).toBeUndefined()
  })
})
