import { describe, expect, it } from 'vitest'
import { runningTool } from '../src/client/agent-view.tsx'
import type { Trace, TraceItem } from '../src/client/model.ts'

const trace = (items: Omit<TraceItem, 'at'>[], done = false): Trace => ({
  items: items.map((item, index) => ({ at: index * 1000, ...item })),
  steps: items.length, tools: items.filter(item => item.kind === 'tool').length, thinking: items.filter(item => item.kind === 'thinking').length,
  truncated: false, done, updatedAt: 0,
})

describe('what the whale says it is doing', () => {
  it('names a tool while it runs', () => {
    expect(runningTool(trace([{ kind: 'thinking', text: '…' }, { kind: 'tool', name: 'write', target: 'index.html', status: 'running' }]))).toBe('写入文件 · index.html')
    expect(runningTool(trace([{ kind: 'tool', name: 'bash', status: 'running' }]))).toBe('运行命令')
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
