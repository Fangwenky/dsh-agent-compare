import React, { useMemo, useState } from 'react'
import { t } from './i18n.js'
import type { Cand } from './model.js'

interface DiffFile { name:string; lines:string[] }

function splitPatch(text:string): DiffFile[] {
  const files:DiffFile[] = []
  for (const line of text.split('\n')) {
    if (!files.length || line.startsWith('diff --git ')) files.push({name:'',lines:[]})
    const file=files[files.length-1]!
    file.lines.push(line)
    if (file.name === '' && line.startsWith('diff --git ')) file.name=line.slice(11)
    if (line.startsWith('--- a/')) file.name=line.slice(6).split('\t')[0]!
    if (line.startsWith('+++ b/')) file.name=line.slice(6).split('\t')[0]!
  }
  return files
}

export function DiffViewer({ text, label }: {text:string;label:string}):React.ReactElement {
  const files=useMemo(()=>splitPatch(text),[text])
  const [selected,setSelected]=useState(0)
  const [all,setAll]=useState(false)
  const file=files[selected]??files[0]!
  const lines=all?file.lines:file.lines.slice(0,120)
  let oldLine:number|undefined, newLine:number|undefined
  return <div className="ac-diff-browser">
    {files.length>1 && <nav className="ac-diff-files" aria-label={t("改动文件")}>{files.map((f,i)=><button type="button" key={i} aria-pressed={i===selected} onClick={()=>{setSelected(i);setAll(false)}}>{f.name||t("文件 {0}",{0:i+1})}</button>)}</nav>}
    <div className="ac-diff-body"><pre tabIndex={0} aria-label={t("候选 {0} 的补丁",{0:label})}>{lines.map((line,i)=>{
      const hunk=/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line)
      let number='',kind='meta'
      if(hunk){oldLine=Number(hunk[1]);newLine=Number(hunk[2])}
      else if(oldLine!==undefined && newLine!==undefined){
        if(line.startsWith('+')){number=String(newLine++);kind='add'}
        else if(line.startsWith('-')){number=String(oldLine++);kind='del'}
        else if(line.startsWith(' ')){number=String(newLine++);oldLine++;kind='context'}
      }
      return <span key={i} className="ac-diff-line" data-kind={kind}><i aria-hidden="true">{number}</i><code>{line||' '}</code>{'\n'}</span>
    })}</pre>
    {file.lines.length>120 && <button type="button" className="ac-text-btn" aria-expanded={all} onClick={()=>setAll(!all)}>{all?t("收起"):t("展开其余 {0} 行",{0:file.lines.length-120})}</button>}</div>
  </div>
}

export function ChangeSummary({stats}:{stats:NonNullable<Cand['patchStats']>}):React.ReactElement {
  return <div className="ac-change-summary" role="group" aria-label={t("改动概览")}>
    <span><b>{stats.files}</b>{t("文件")}</span><span><b>+{stats.insertions}</b>{t("新增行")}</span><span><b>−{stats.deletions}</b>{t("删除行")}</span>
  </div>
}

export function ReviewPaths({candidate}:{candidate?:Cand}):React.ReactElement|null {
  if(!candidate)return null
  const files=candidate.touchedFiles
  return <>{candidate.patchStats && <ChangeSummary stats={candidate.patchStats}/>}
    {!!files?.length && <div className="ac-review-files"><ul>{files.slice(0,8).map(f=><li key={f}><code>{f}</code></li>)}</ul>
      {files.length>8 && <details><summary>{t("还有 {0} 个路径",{0:files.length-8})}</summary><ul>{files.slice(8).map(f=><li key={f}><code>{f}</code></li>)}</ul></details>}
    </div>}</>
}

export function Banner({tone='info',className='',children,label,role='status'}:{tone?:'info'|'warn'|'error'|'success';className?:string;children:React.ReactNode;label?:string;role?:'status'|'alert'}):React.ReactElement {
  return <div className={`ac-banner ac-unified-banner ${className}`} data-tone={tone} aria-label={label} role={role}>{children}</div>
}

const FAILURE_MARKS:Record<string,string> = {
  network:'M3 8q7-6 14 0M6 11q4-4 8 0m-5 3q1-1 2 0',authentication:'M5 9h10v8H5z M7 9V6a3 3 0 0 1 6 0v3',
  filesystem:'M3 6h14v9H3z M5 12h10',runtime:'M3 4h14v12H3z m3 4 2 2-2 2m4 0h3',
  lockfile:'M5 2h7l4 4v12H5z m4 8h4m-4 3h4',timeout:'M10 3a7 7 0 1 0 .1 0 M10 6v4l3 2',
}
export function FailureMark({kind}:{kind:string}):React.ReactElement {
  return <svg className="ac-failure-mark" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"><path d={FAILURE_MARKS[kind]??'M10 3 2 17h16z M10 8v4 m0 2v.1'}/></svg>
}
