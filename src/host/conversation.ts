/**
 * How a comparison lives inside a conversation: the `/ab` command's input
 * grammar, and the notes that tell the conversation's model what happened
 * (generation finished, the user's pick, adoption) so later turns can build on
 * it. Notes state recorded facts only.
 */
import { publicView, type AgentRoute, type PickReason, type RunRecord } from '../core/index.ts'

export interface AbInput {
  readonly task: string
  readonly example: boolean
  readonly minutes?: number
  /** 2–4 routes: a cross-model comparison. */
  readonly models?: readonly AgentRoute[]
  /** 2–4 versions with the saved styles. */
  readonly versions?: number
}

/**
 * `/ab [--example] [--minutes N] [--versions N] [--models provider/model,provider/model[,…]] <task>`.
* Use a standalone -- after any leading options to make the rest of the prompt literal.
 * Existing trailing option groups are also accepted. Embedded examples stay in the prompt.
 */
export function parseAbInput(raw: string): AbInput {
  const words = [...raw.matchAll(/\S+/g)]
  const options: { example: boolean; minutes?: number; versions?: number; models?: AgentRoute[] } = { example: false }
  const takesValue = (flag: string): boolean => flag === '--minutes' || flag === '--versions' || flag === '--models'

  function apply(flag: string, value?: string): void {
    if (flag === '--example') { options.example = true; return }
    if (value === undefined || value.startsWith('--')) throw new Error(flag + ' 需要一个值')
    if (flag === '--models') {
      const models = value.split(',').map(s => s.trim()).filter(Boolean).map(routeOf)
      if (models.length < 2 || models.length > 4) throw new Error('--models 需要 2 到 4 个模型，用逗号分隔，例如 deepseek/deepseek-chat,deepseek/deepseek-reasoner')
      options.models = models
    } else if (flag === '--versions') {
      const n = Number(value)
      if (!Number.isSafeInteger(n) || n < 2 || n > 4) throw new Error('--versions 需要 2 到 4 之间的整数')
      options.versions = n
    } else {
      const n = Number(value)
      if (!Number.isFinite(n) || n < 5 || n > 120) throw new Error('--minutes 需要 5 到 120 之间的分钟数')
      options.minutes = n
    }
  }

  let first = 0, end = words.length
  while (first < end) {
    const flag = words[first]![0]
    if (flag !== '--example' && !takesValue(flag)) break
    first++
    apply(flag, takesValue(flag) ? words[first++]?.[0] : undefined)
  }
  if (words[first]?.[0] === '--') {
    first++
  } else {
    // A number or a model list at the end can be a legacy option. Prose in the middle is always literal.
    const trailing: Array<[string, string?]> = []
    while (end > first) {
      const value = words[end - 1]![0]
      if (value === '--example' || takesValue(value)) {
        trailing.push([value])
        end--
        continue
      }
      const flag = end - first >= 2 ? words[end - 2]![0] : ''
      const looksLikeValue = flag === '--models'
        ? /[,/]/.test(value) || /^[\w.-]+-[\w.-]+$/.test(value)
        : /^[+-]?(?:\d|\.\d)/.test(value)
      if (!takesValue(flag) || !looksLikeValue) break
      trailing.push([flag, value])
      end -= 2
    }
    for (const [flag, value] of trailing.reverse()) apply(flag, value)
  }
  if (options.models && options.versions !== undefined && options.versions !== options.models.length) throw new Error('--versions 与 --models 给出的模型数量不一致')
  const last = words[end - 1]
  const task = first < end && last ? raw.slice(words[first]!.index, last.index + last[0].length) : ''
  return { task, ...options }
}

function routeOf(spec: string): AgentRoute {
  const slash = spec.indexOf('/')
  return slash > 0 ? { provider: spec.slice(0, slash), model: spec.slice(slash + 1) } : { model: spec }
}

/** The run id a `/ab` command result carries. */
export const commandResultText = (runId: string): string => `A|B 比较已开始 · 运行 ${runId}`
export const runIdInText = (text: string | undefined): string | undefined => /运行 ([0-9a-f]{8})/.exec(text ?? '')?.[1] ?? /"runId"\s*:\s*"([0-9a-f]{8})"/.exec(text ?? '')?.[1]

const REASON_TEXT: Record<PickReason, string> = {
  layout: 'layout', look: 'look and colours', interaction: 'how it feels to use', wording: 'wording',
  complete: 'more complete', robust: 'fewer problems', simple: 'simpler', fast: 'faster and lighter',
}

/** Why the user picked a version, as they said it after the pick. */
function pickWhy(r: RunRecord): string {
  const reasons = r.choice?.reasons ?? []
  const note = r.choice?.note?.trim()
  if (!reasons.length && !note) return ''
  const said = [...reasons.map(reason => REASON_TEXT[reason]), ...(note ? [JSON.stringify(note)] : [])].join('; ')
  return ` The user said they picked it for: ${said}. Keep these qualities in follow-up changes.`
}

/** A short, stable key for the reasons, so new reasons become a new note. */
function whyKey(r: RunRecord): string {
  const reasons = r.choice?.reasons ?? []
  const note = r.choice?.note?.trim() ?? ''
  if (!reasons.length && !note) return ''
  let hash = 2166136261
  for (const char of `${reasons.join(',')}|${note}`) hash = Math.imul(hash ^ char.codePointAt(0)!, 16777619)
  return `:why:${(hash >>> 0).toString(16)}`
}

/** A stable key per fact worth telling the model; a new key means a new note. */
export function milestoneOf(r: RunRecord): string | undefined {
  if (r.adoption !== undefined && ['adopted', 'needs-attention', 'reverted', 'rolled-back', 'blocked', 'needs-recovery'].includes(r.adoption.state)) {
    return `adoption:${r.adoption.mode}:${r.adoption.state}:${r.adoption.startedAt}${r.adoption.state === 'adopted' || r.adoption.state === 'needs-attention' ? whyKey(r) : ''}`
  }
  // A pick changed after the reveal is a new fact; the original key stays unchanged for older records.
  if (r.choice !== undefined) return (r.choice.initialPick === undefined ? `choice:${r.choice.pick}` : `choice:${r.choice.pick}:revised:${r.choice.at}`) + (r.choice.pick === 'none' ? '' : whyKey(r))
  if (r.state === 'judging') return 'judging'
  if (r.state === 'abandoned') return 'abandoned'
  return undefined
}

const files = (paths: readonly string[] | undefined): string => (paths && paths.length > 0 ? paths.slice(0, 20).join(', ') + (paths.length > 20 ? ` (+${paths.length - 20} more)` : '') : 'none')

/** The model-facing note for the run's current milestone. */
export function memoryNote(r: RunRecord): string | undefined {
  const m = milestoneOf(r)
  if (m === undefined) return undefined
  // A folder comparison ran in a private workspace; the user's folder is what matters to them.
  const folder = r.target !== undefined
  const head = `[AgentCompare run ${r.runId}] Task: ${r.task.slice(0, 400)}\n${folder ? `Folder: ${r.target!.folder ?? '(none: the conversation has no directory)'}` : `Target repository: ${r.baseline.repoRoot}`}`
  const place = folder ? 'folder' : 'project'
  const n = r.candidates.length
  const all = n === 2 ? 'both' : `all ${n}`
  if (m === 'judging') {
    const open = r.blind === false
    const lines = publicView(r).candidates.map((c) => {
      // An open comparison shows every style; a blind one keeps them for after the pick.
      const who = open && c.strategy ? `${c.label} (${c.strategy.title})` : c.label
      if (c.stage !== 'ready') return `- ${who}: did not produce a result (${c.error?.message.split('\n')[0] ?? c.stage})`
      if (c.result === 'answer') return `- ${who}: replied with an answer and wrote no files`
      const v = c.verdict
      const kind = c.result === 'files' ? `wrote ${c.resultFiles?.length ?? 'some'} file(s), no live page; ` : ''
      return `- ${who}: ${kind}${v?.eligible ? 'passed the shared acceptance' : `did not pass (${v?.reasons.join('; ') ?? 'no verdict'})`}`
    })
    const guidance = open
      ? `The user compares ${all} in the A|B card with their styles shown, and chooses; do not choose for them.`
      : `The user compares ${all} in the A|B card without knowing which is which, and chooses; do not choose for them or reveal styles.`
    return `${head}\n${n === 2 ? 'Both candidates have' : `All ${n} candidates have`} finished in isolated copies; nothing in the ${place} has changed yet. ${guidance}\n${lines.join('\n')}`
  }
  if (m.startsWith('choice:')) {
    const pick = r.choice!.pick
    if (pick === 'none') return `${head}\nThe user rejected ${all} versions. The ${place} is unchanged.`
    const c = r.candidates.find((x) => x.label === pick)!
    const route = c.actualRoute ?? c.route
    const revised = r.choice!.initialPick !== undefined ? ` after the reveal (blind pick: ${r.choice!.initialPick === 'none' ? 'neither' : r.choice!.initialPick})` : ''
    const picked = `The user picked ${pick}${revised} (strategy: ${c.strategy.title}${route.model ? `; model: ${route.model}` : ''}).${pickWhy(r)}`
    // An answer is the whole result: the conversation keeps the picked text itself.
    if (c.result === 'answer') return `${head}\n${picked} It is an answer with no files; nothing needs to be written. The picked answer:\n${(c.summary ?? '').slice(0, 2000)}${(c.summary ?? '').length > 2000 ? '\n[…]' : ''}`
    if (folder) return `${head}\n${picked} Its files are not saved yet; the folder is unchanged. Files: ${files(c.touchedFiles)}.`
    return `${head}\n${picked} It is not adopted yet; the project is unchanged.`
  }
  if (m === 'abandoned') return `${head}\nThe comparison was ended without adopting anything. The ${place} is unchanged.`
  const a = r.adoption!
  const c = r.candidates.find((x) => x.label === a.label)
  const touched = a.writtenPaths ?? c?.touchedFiles
  if (a.mode === 'folder') {
    if (a.state === 'adopted') return `${head}\nCandidate ${a.label}'s files were saved into the new folder ${a.exportPath ?? '(unknown)'}; nothing else in the folder changed. Files: ${files(touched)}.${pickWhy(r)}`
    if (a.state === 'reverted') return `${head}\nThe saved folder ${a.exportPath ?? '(unknown)'} was removed again; nothing else changed.`
    return undefined
  }
  switch (a.state) {
    case 'adopted':
    case 'needs-attention':
      if (a.mode === 'branch') return `${head}\nCandidate ${a.label} was saved as branch ${a.branch ?? '(unknown)'}; the working tree and current branch are unchanged.`
      return `${head}\nCandidate ${a.label} (${c?.strategy.title ?? ''}) is now in the target repository's working tree, uncommitted. Files written: ${files(touched)}. These changes apply only to the target repository above. Before following up, confirm your working directory matches it; an example repository can differ from this conversation's original project.${a.state === 'needs-attention' ? ` Other files changed during the write: ${files(a.attention)}.` : ''}${pickWhy(r)}`
    case 'reverted':
    case 'rolled-back':
      return `${head}\nThe adoption of ${a.label} was undone; these files are back to their previous content: ${files(touched)}.`
    case 'blocked':
      return `${head}\nAdopting ${a.label} was refused before anything was written: ${a.message ?? ''}`
    case 'needs-recovery':
      return `${head}\nAdopting ${a.label} did not finish cleanly; the user must restore or keep the files: ${files(a.attention)}.`
    default:
      return undefined
  }
}
