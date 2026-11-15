[![鲸挑细选 · Agent Compare（大肥鱼赛马）：在主对话里比较 2–4 版回答、文件与网页。Desktop + Web，中英双语，选择后继续对话 / Compare 2–4 answers, files and live pages in the main conversation. Styles, blind or open comparison, reasons for the pick, reviewed adoption and conversation memory, in a blue liquid-glass interface. Product illustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#install)

<a id="agentcompare"></a>

# Agent Compare (dsh-agent-compare) · 鲸挑细选

[![GitHub stars](https://img.shields.io/github/stars/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=GitHub%20Stars&color=3657f5&style=flat&labelColor=0b1b4f&cacheSeconds=300)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/stargazers)
[![npm download/下载量](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-badge.svg)](https://www.npmjs.com/package/dsh-agent-compare)

[![Source version](https://img.shields.io/github/package-json/v/lijiaqi-AI-Product-Manager/dsh-agent-compare?label=source&color=3657f5&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![npm version](https://img.shields.io/npm/v/dsh-agent-compare?label=npm&color=3657f5&style=flat&labelColor=0b1b4f&logo=npm&logoColor=white)](https://www.npmjs.com/package/dsh-agent-compare)
[![CI](https://img.shields.io/github/actions/workflow/status/lijiaqi-AI-Product-Manager/dsh-agent-compare/ci.yml?branch=main&label=CI&logo=github&logoColor=white&style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml)
[![Node.js ^22.22.2 || ^24.15.0 || >=26.0.0](https://img.shields.io/badge/Node.js-22%20%2F%2024%20%2F%2026%2B-238636?style=flat&labelColor=0b1b4f&logo=nodedotjs&logoColor=white)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/package.json)
[![Tested on DSH 0.2.1-rc.5 and 0.2.2-rc.1](https://img.shields.io/badge/DSH%20tested-0.2.1--rc.5%20%2F%200.2.2--rc.1-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-4d6bfe?style=flat&labelColor=0b1b4f)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE)

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · **English** · [日本語](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ja.md) · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · [Español](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.es.md) · [Português (Brasil)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.pt-BR.md) · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · [Deutsch](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.de.md)

**One task. 2–4 versions of answers, files or pages. Pick styles, compare, then choose.**

Its Chinese name is **鲸挑细选** (*jīng tiāo xì xuǎn*), a pun on 精挑细选, "picked with care", where 鲸 means whale: 2–4 DeepSeek whales take on the same task, and you keep the best. Its nickname is **大肥鱼赛马**, "the Big Fat Fish race": Chinese users call DeepSeek's whale the Big Fat Fish, and here several of them race on one track while you call the winner.

**DSH 桌面端 + 浏览器 / Desktop + Web**

<p align="center"><a href="#demo">真实演示 / Recorded demo</a> · <a href="#ui">界面与体验 / Interface</a> · <a href="#install">安装 / Install</a> · <a href="#whats-new">版本更新 / What's new</a></p>

> **This guide covers 3.1.0. The npm badge above shows the published version.** DSH Desktop + Web, with Chinese and English interfaces. Compare 2–4 versions of answers, files or web pages in the main conversation; open each version's thinking and tool calls, and read its reply beside what it built.

<a id="demo"></a>

## Watch a whole Big Fat Fish race

[![Fixed-candidate workflow: DeepSeek's blue whale filling per working version and live steps, four live pomodoro pages, C in focus with its reply beside its page, C picked and the reasons given](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

Four fish, four pomodoro pages: a controlled-candidate recording in a real DSH host, from the 3.1.0 release-candidate source with the Chinese interface:
- Four versions each build a pomodoro page in a plain folder, while two comets race around the comparison card.
- The large window opens while they work: DeepSeek's blue whale per version, filling with water as it goes, with thoughts over its head and its newest steps running live underneath; a poke makes it answer, and **Steps** opens to show thinking and a file write.
- The replies arrive before the pages; then all four live pages can be used.
- Two are set aside, C is shown in focus with its reply beside its page, and the pick reveals every style.
- Two reasons are tapped (layout, simpler), which the next request in the main conversation carries; the pick is saved into a new folder, and the conversation continues.

The video cuts waiting and keeps the rest at the original speed. Local paths are hidden.

[Full video (45 seconds)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [Method and results](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[Four-step quick start](docs/quickstart.en.md) · [Troubleshooting a run](docs/runs-and-recovery.en.md)

[![设定 2–4 版与风格，并行实跑，体验后选择并说明理由，审查并继续主对话 / Set up, run, choose and say why, review and continue. Answers, files, live pages and conversation memory. Product illustration.](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

<p align="center"><sub>功能示意 / Product illustration</sub></p>

AgentCompare is a [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) plugin that completes 2–4 versions of a task as answers, files or web pages. Runnable pages get live previews. Content-only comparison does not claim arbitrary-language execution or functional test coverage. You try every version before choosing; in a blind comparison, the model and style are revealed only after the pick. Before adoption, you review the combination with your current project.

| You want | Where it works | What the card shows |
|---|---|---|
| A page or UI change | Vite, Node or static-site projects in a Git repository, including subfolders | Interactive previews when available, plus each version’s shared acceptance results |
| A script, document or other files | Any folder, including the DSH default workspace | Each version's files, each one openable before the pick |
| An answer | Any conversation | Formatted answers side by side with one-click copy; the picked one enters the conversation's memory |

**Start your first comparison:**
1. In DSH Desktop, install `dsh-agent-compare` from **Plugins → Add plugin** (for Web, see [Install](#install)).
2. Click **A|B** at the bottom left of the composer, then pick the number of versions and their styles.
3. Write the task and send, as usual. The race is on.

[插件目录与安装](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.md) · [Plugin directories and installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Listing status / 收录状态](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="ui"></a>
<a id="gallery"></a>

## Interface and experience

Waiting, comparing and picking are all visible and clickable. The animation and the two images below are controlled candidates in a real DSH host.

- **Blue liquid glass.** Translucent glass panels and sliding selectors over slowly flowing blue light, in light and dark themes; with reduced motion on, everything holds still. Product text in the tested interface states was measured glyph by glyph in both themes at 4.5:1 contrast or better.
- **A Big Fat Fish keeps you company.** One blue DeepSeek whale per version fills with blue water as it goes while two lights trace its edge. Thoughts rise over its head; poke it and it answers, keep poking and it spins, wobbles and splashes.
- **Every step in view.** The **Steps** button lists thoughts, tool calls and edits; while a version works, its newest three steps run live under the whale.
- **Reply and result side by side.** An answer stands alone; a page shares the card with its reply, and in focus the reply sits to the left of the page.
- **Four blues for A–D.** In a blind comparison you only see A–D; styles and models are revealed after the pick, with a sweep of light across the cards.
- **Easy to tell it's running.** Two comets race around a running comparison, and each page can be used the moment it starts.
- **Desktop, browser and phone widths**, with Chinese and English interfaces.

Steps contain only information the model and host provide. Long records retain their beginning and end; shortened text is marked, and style names are masked before a blind pick. The whale’s water level represents a processing stage, not a quality score or an exact completion percentage.

![大肥鱼特写：两版同时工作，头上冒出想法，连戳五下会跳、转圈、晕头、溅水花，展开「过程」看实时步骤，回复出现后水注满 / Whale close-up: thoughts, a five-poke combo, live steps and the Steps panel, then replies as the whales fill up; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>Whale close-up: controlled candidates; the scripted model waits 9 s per step so there is time to watch; cut, otherwise original speed.</sub></p>

![四版页面直接操作 / Four independently interactive pages; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

![打招呼得到四种回答 / A greeting answered four ways; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

<details>
<summary>More views: settings, English answers, phone width</summary>

![版本、风格与上下文 / Versions, styles and context; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

<p align="center"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp" width="840" alt="Three open English answers from the Three looks quick set: B is the pick, with Layout and More complete as its reasons; controlled candidates in a real DSH host."> <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="390-pixel English answer result in the blue glass interface, with the chosen version and a visible Continue conversation action; controlled candidates in a real DSH host."></p>

</details>

[All 8 images and capture notes](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="install"></a>

## Install

Interface languages: Simplified Chinese and English, selectable in DSH Desktop and Web.

These commands target a self-managed DSH Web profile. The desktop application's `desktop` profile is app-managed; use its Plugins page.

Install the npm package into the default Web profile (the npm badge above shows registry status):

```bash
dsh plugin --profile web add dsh-agent-compare
```

For another self-managed profile, replace `web` with its actual name.

**Restart fully after an update.** Quit DSH Desktop completely and reopen it. For Web, restart the relevant DSH service and reload the page. Refreshing the interface alone can leave the old backend running; a version mismatch now shows a restart notice.

Or build from source and install:

```bash
git clone https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare.git
```

```bash
cd dsh-agent-compare
npm ci
npm pack
```

```bash
dsh plugin --profile <your-profile> add ./dsh-agent-compare-3.1.0.tgz
```

After restarting DSH, enable **A|B at the bottom left of the conversation composer**:

1. A settings strip opens above the existing input. Choose **one model · different styles** (the default, reusing the current model) or **different models · one style** (a configured model for each version, all with the same style).
2. Choose 2, 3 or 4 versions, and blind or open. With one model, pick a style for each version or describe your own in one line. The strip notes that more versions use more.
3. Select a per-version generation limit (5–120 minutes) and the **main-conversation context** every version sees: none, the recent exchanges (3 by default) or messages you tick. The strip shows the complete excerpt they will receive. Settings are retained for this conversation across reopening.
4. Write the task in the original composer and send. No flags to type. Mode switching changes only its command chip, preserving the draft, references, and attachments. Unsupported attachment submissions are refused by the host while retaining the originals.
5. The conversation renders a persistent A|B card with **answers, files or runnable web pages**. Live pages support clicking and typing. In a new conversation without a chat timeline, the same record appears above the composer. Adaptive views support direct interaction. Matching desktop/phone sizes are available, and you can focus one version (press 1–4 in the card, 0 for all). With three or four versions, **Set aside** the ones you have ruled out so the rest move up side by side. Expand the card for closer inspection.
6. Choose a version or **None of these**. A blind pick reveals models and styles; an open comparison shows them from the start. For project changes that pass checks, **Review and adopt** shows the target, differences and preflight before a separate write confirmation. Outside Git, save into a new folder. Answers require no file adoption. **Continue conversation** returns to the composer, retaining the choice and recovery record.

The example selector offers a smaller search-and-clear case or the full filtering/mobile case and remembers the choice. It creates a separate repository in the same conversation, preserving unrelated drafts; adoption targets that example repository. Every version uses the configured real model and consumes usage. Smaller scope is not a fixed-time guarantee. [Example scope and timing](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/first-use.md).

Use **comparison records** and **tutorial** at the upper right of new or existing conversations. History retains the task, checks, choice, adoption and undo. When previews stop, verification screenshots remain available.

[Records, restarts and recovery](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/runs-and-recovery.en.md) · [Supported scope](#compatibility) · [Custom acceptance](#repository-acceptance-agent-comparejson)

Results, your pick, adoption and undo enter this conversation's memory. You can then ask how the comparison went, or keep working on the adopted version. After the reveal and before adopting, you can switch to another finished version; when none is usable, use **Compare again**. See [conversation memory and context](docs/conversation-memory.md#english).

[Windows process compatibility settings](docs/windows-process-compat.en.md) offer automatic/off controls that preserve host confinement and show observed hooks after reveal.

In 1.3.0, A|B works in any folder. A folder outside Git, including the DSH default workspace, compares each version's pages, files or answers from an empty folder and saves the pick into a new folder there. Subfolder projects, non-Vite Node projects and static sites are supported too. See [folders and project types](docs/workspaces-and-projects.md#english).

## What it is for

UI and interaction tasks, where quality is judged by using it and tests can only tell whether something was delivered: search and filters, form flows, landing pages, dashboard layouts, component redesigns. Bug fixes and refactors with one right answer are better served by a single agent plus tests.

Both modes run 2–4 versions, blind or open:

| Mode | Same for every version | Different |
|---|---|---|
| One model · different styles (default) | model, task, acceptance | the style (by default Conservative + Bold for two, plus Minimal for three, plus Vibrant for four) |
| Different models · one style | task, acceptance, style (Balanced by default) | the model (one configured in DSH per version, no repeats) |

<a id="styles"></a>

Eight styles in three groups. Every style must still deliver every requirement of the task:

| Group | Style | For a page or a project change | For an answer or written files |
|---|---|---|---|
| Approach | Conservative | Reuse existing components and patterns; smallest change | Conventional and direct |
| | Bold | Rethink layout and interaction | A fresh, creative angle |
| Look | Minimal | Few elements, generous whitespace, clear at a glance | Only what is asked |
| | Polished | Professional finish, clear hierarchy, complete states | Structured and thorough |
| | Vibrant | Colour, motion and personality | Warm tone, vivid examples |
| Priority | Friendly | Beginner-friendly, accessible, phone-first | Step by step, plain words |
| | Rigorous | Validation, edge cases and tests | States assumptions, covers exceptions |
| | Lean | Little code, fast to load, no dependencies | As short as possible |

A custom style is a one-line description of up to 120 characters. It is given to every version as a description of the style and cannot change the task or the rules. A style can be chosen more than once, which runs the same brief several times.

A blind comparison shuffles the chosen styles across A–D at the start and reveals them after the pick. An open comparison keeps them in order as A–D and shows them while you compare.

## What it does for you

- Every version starts from **the same baseline**, including uncommitted work, without touching your index or files.
- Each candidate requests the host's write policy rooted in its own copy; the host's enforcement limits are disclosed.
- Independent dependency files, checks and preview environments per version, running in parallel; an unchanged manifest can use its own copy of the private warm installation.
- **One fixed, content-bound acceptance**: a candidate that edits the test script, configs or existing tests does not count as passing.
- Adoption checks the result **together with what you changed meanwhile**, and stops when the checked target changes before a pending write.

<a id="whats-new"></a>

## What's new

**New in 3.1.0:**
- **Steps, live and afterwards.** Each version has a **Steps** button from the start, showing thoughts, tool calls and replies provided by the model and host. Its newest three steps also scroll under the whale while it works. Long records retain the first 40 and latest 280 items and mark omissions or shortened text. Before a blind pick, words that name a style show as ▒▒.
- **The reply, shown directly.** A version that only answers shows just its answer. A version that built a page or wrote files shows its reply with the same standing: above the page side by side, and to the left of the page when that version is in focus. The reply appears as soon as the version finishes, before its page.
- **Pages shown directly.** Static pages are served by the plugin itself, without a separate process for the desktop app to stop, and are interactive once the preview is ready. HTML file results can also open in a sandboxed page, with their source one click away.
- **Results sooner.** Completion is confirmed after a version's turn ends with nothing queued, without waiting for other plugins to release its whole session. This took 0.35–0.6 seconds on the recorded test host; the old backend's desktop cases took 41–44 seconds. Dependencies are installed from the lockfile while the versions work, and an unchanged manifest gets its own copy; checks run in parallel and a served page can be used immediately. Four Vite pages took about 24–30 seconds in the controlled recording setup. These measurements are not timing guarantees for other models or machines.
- **Waiting is fun.** Each working version shows DeepSeek's blue whale logo, pale at first and filling with blue water as the version gets further, while two lights run around its edge. Now and then a thought rises over its head: what it is doing, an idea, or an invitation to poke it. It spouts at every step and turns toward the pointer, and pokes in a row make it jump, spin, wobble and splash, with a new line each time. Two comets race around a running comparison (they keep moving on older engines and under themes that stop animations), over slowly flowing blue light.
- **Four blues for A–D.** Version labels are four different blues.
- **A reminder to restart DSH.** DSH swaps in a plugin's new interface at once but keeps running the backend it loaded at start. When the two differ, AgentCompare asks you to quit and reopen DSH instead of quietly missing steps and replies.
- **A Chinese name.** The official Chinese name is 鲸挑细选; the nickname is 大肥鱼赛马.
- **Also includes 2.1.0, which was not published on its own:** a greeting or a question gets answers instead of pages; brighter, clearer liquid glass, lighter buttons and sliding controls; in both themes, every text in 21 interface states measures at least 4.5:1.

**New in 2.0.0:**
- **A new blue liquid-glass interface.** Aurora and star dust behind glass panels, a glass lens that slides between options and liquid progress; a burst of light when you pick and a sweep of light at the reveal. Dark mode, reduced motion and high-contrast mode are supported.
- **Say why it won.** After the pick, tap a few reasons (layout, look and colour, feel in use…) or add a line; later changes in the main conversation keep those strengths.
- **Quick sets.** One tap sets the number of versions and their styles: Classic pair, Three looks, Three priorities, Four directions.
- **2–4 versions, with styles.** Eight presets or a one-line custom style; different models can share one style.
- **Blind or open comparison.** Try each version, set it aside and restore it; use 1–4 to focus and 0 to show all.
- **Answers, files and live pages.** Read formatted Markdown and copy answers, code, file contents or saved paths. Your pick is clearly marked.
- **Stay in the conversation.** Comparisons, picks, adoption and undo enter the current conversation's memory so you can keep working.
- **Desktop + Web, Chinese + English.** Reuse configured models; review changes before confirming adoption, with undo and recovery available.

Since 1.3.0, any folder works, including repository subfolders, non-Vite Node projects and static sites, and answers and files can be compared too. See the [changelog](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md#200) for scope and limits.

## How it works

1. **Baseline** — snapshot the working tree through a private temporary index (uncommitted and untracked files included, ignored ones excluded).
2. **Bound acceptance** — derive the checks from the baseline (`typecheck` / `lint` / `test` / `build` scripts plus a page check) and record the script bodies, content hashes of verification files (`tsconfig*`, Vite/Vitest config, lint config, existing tests, `.agent-compare.json`), the lockfile and runtime. A committed `.agent-compare.json` can add step-by-step interaction checks.
3. **Owned copies** — one branchless `git worktree` per candidate under the plugin home (`~/.dsh/agent-compare/w/<run>/<A|B>`), with an owner mark in its git admin dir.
4. **Candidate sessions** — each candidate is its own DSH session whose directory is its copy. The session requests `workspace-write` for that root before it runs; approvals are pinned to `never`. This uses the host's enforcement, including its platform limitations below. Each has a generation time limit (5 / 15 / 30 / 60 / 120 minutes in the interface, 30 by default). When it runs out, the agent is stopped and what it wrote is still sealed and verified. While it works, the card's **Steps** list its thoughts, tool calls and words live, and say how long it has been quiet. It is done when its turn ends with nothing queued; background work of other plugins in its session is not waited for.
5. **Seal** — the session is closed and the change frozen as a commit plus a full binary patch (SHA-256); `node_modules` is always excluded.
6. **Verify** — copy equals the sealed tree → **frozen install** (a failure fails; there is no unlocked retry) → acceptance commands (up to three at a time) → serve the **build output** with `vite preview` → page acceptance in a fresh headless browser context (loads, no console errors, scripted steps, desktop and phone screenshots) → the copy still equals the sealed tree. When the build fails, only a dev-server preview is offered, marked "for observation only". The page can be used in the card as soon as it is served, while acceptance continues.
   - For an npm project with a lockfile, no root install scripts and no local packages, the baseline's manifest is installed once with the same frozen command in a private folder of the run (`~/.dsh/agent-compare/d/<run>`) while the versions generate. A version whose manifest files (`package.json`, the lockfile, `.npmrc`) are byte-identical gets its own copy of that result instead of installing again; anything else installs as before. The folder is removed once every version has been verified.
   - The build-output sequence above describes Vite. Other Node projects use their applicable scripts; plain static pages need no install or build. Answers and files can be compared by content, without claiming checks that were not run.
7. **Verdict** — adoption requires recorded checks without failures or timeouts, unchanged verification definitions and a checked tree matching the sealed tree. An unrun scripted page acceptance blocks direct adoption. A skipped basic page-load check remains an explicit warning, not a verified check. Dependency changes and missing lockfiles are also disclosed.
8. **Pick** — 2–4 cards show answers, files or live pages, with independent iframes when a page is available. Blind comparisons label them A–D and shuffle styles at the start; the pick reveals styles, actual models and available usage. Open comparisons show them from the start. Applicable check results show whether your pick matches what the checks favoured.
9. **Adopt** (adoptable candidates only):
   - Compute the exact tree your checkout will have: your current files plus the candidate's touched paths. If you edited any of those paths since the baseline, stop — nothing is written.
   - If you changed other files meanwhile, **rehearse** that combination in a scratch copy with the full acceptance; if it fails, stop — nothing is written.
   - Recheck the checkout, HEAD and staged entries after rehearsal and before each file write or deletion. A detected change stops adoption; only earlier attempted paths are considered for rollback, preserving later user edits.
   - Persist a recovery journal (pre-adopt snapshot, expected tree, HEAD and staged-state fingerprints) and hold a repository lock before the first write.
   - Prepare candidate bytes with the repository's eol/filter settings, retain the actual original files, and publish through links that cannot replace an existing path. An edit or new file at the handoff boundary stops the operation while retaining both contents. Verify the checkout **equals the rehearsed tree** and HEAD and the index are unchanged. Nothing is committed.
   - A failed write is rolled back automatically; an interrupted one is offered for recovery the next time the panel opens. Undo is available later unless you edited those files (they are listed, never overwritten).
   - A candidate that did not pass can only be saved as a branch (one commit, no checkout switch) for inspection.
10. **Continue** — after a successful adoption, copies and previews are released and the panel offers "continue from this result": the next task starts from what you just adopted. History is browsed separately.

## Isolation and safety: what is and is not guaranteed

Candidate sealing and verification resolve the owned Git administration from the original repository, check reciprocal links and owner marks, and use explicit Git directory/worktree arguments. Changed, linked, oversized or missing pointer metadata blocks further capture or preview reopening; ambiguous copies are retained during cleanup. Ambient Git repository/index/config selectors are ignored, while intentional private indexes remain supported. These checks protect lifecycle operations from Git pointer redirection; the host sandbox remains responsible for project processes.

| Area | How | Limit |
|---|---|---|
| Candidate writes | The candidate session's directory is its copy; DSH's sandbox enforces it up front | DSH marks its Windows sandbox as partial; platform temp areas may be writable |
| Project commands | Installation, checks, initial preview and reopened preview use the host's `workspace-write` policy; ambient child variables use its canonical scrub | Missing confinement fails without an unconfined retry. Partial enforcement is recorded and shown; this is not read or network isolation |
| Your project | Compared with the baseline while candidates run and shown in the panel | Differences are reported without attributing their source; adoption checks for overlap |
| Concurrent editing | Checks the checkout and raw-file fingerprints, retains original files before publishing with no-replace links, and preserves conflicting content during undo and recovery | The repository lock does not lock external editors. Handoff is per file; wait before editing affected paths or rearranging directories. This is not a sandbox against same-permission processes |
| Acceptance | Script bodies, configs and test files are hash-bound; the copy is checked before and after | Requirements that cannot be checked automatically are left to you, never claimed as verified |
| Dependencies | Frozen installation when a lockfile exists, or an independent copy of a private frozen installation with identical manifests | Projects without a lockfile get an unlocked install, with a warning; a failed warm copy uses the candidate's normal installation without weakening lockfile checks |
| Processes | A recorded preview is stopped only when its command line proves it is ours; preview file writes use the same host policy | Network access and process visibility are **not** isolated |
| Browser state | Each preview launch gets a fresh random `.localhost` hostname; the server stays on `127.0.0.1`. Host probes connect directly to loopback and require a successful HTTP status | Embedded cookies follow browser policy. Login, external backends and shared databases are outside the current scope; an external tab may use different storage. Reopening resets page state, while comparison records and screenshots remain |
| Embedded navigation | Preview frames permit scripts and forms but cannot navigate the top-level comparison window | This is not a complete hostile-code sandbox; opened pages and network requests still use the browser's policies |
| Cleanup | Deletes only registered worktrees of that repository with a matching owner mark | Anything else is kept and listed |
| Retained originals | A self-ignored `.agent-compare-transfer-*` directory in the project retains raw files and a durable journal. Its location is available in the result, and preview cleanup keeps it | Direct application requires ordinary files, at most 10,000 paths, 128 MiB total original/replacement bytes and hard-link support. Symlinks, special files and unsupported filesystems can use branch adoption. Keep these directories until recovery is complete |
| Older records | Records from 0.1 are shown read-only | Nothing acts on their recorded paths or pids |

If the host has no session factory (`ctx.agents.create`), AgentCompare falls back to the 0.1 subagent path (`isolation: shared-root`): copies live inside the repository under `.agents/worktrees`, and escapes are only detected afterwards. The panel and the run record state which one is in use.

The current Windows host restricts named-pipe stdio in confined grandchildren. npm lifecycle scripts use foreground output without changing the project's script permissions. Private files capture esbuild version checks and Vite's optional `net use` probe; the esbuild service uses the host's public anonymous-pipe primitives and inherits the same restricted token. Other tools requiring nested named pipes may still fail; they are not retried with wider permissions. File-read access and network access remain outside this boundary.

## Configuration (optional)

Append an id-targeted entry to the profile's `cordis.patch.yml`:

```yaml
- id: agent-compare
  name: dsh-agent-compare
  config:
    generationMinutes: 20
```

| Key | Default | Meaning |
|---|---|---|
| `generationMinutes` | `30` | Per-candidate generation budget |
| `maxActiveRuns` | `1` | Comparisons generating at the same time |
| `isolation` | `own-root` | `shared-root` is the experimental 0.1 path |
| `home` | `~/.dsh/agent-compare` | Records, patches, screenshots and copies |

## Repository acceptance: `.agent-compare.json`

Commit it at the repository root (the baseline version is used; a candidate editing it does not count):

```json
{
  "scripts": ["test:e2e"],
  "browser": {
    "path": "/",
    "steps": [
      { "label": "8 products at first", "expectCount": "[data-testid=product-card]", "min": 8, "max": 8 },
      { "fill": "input[type=search]", "text": "lamp" },
      { "expectCount": "[data-testid=product-card]", "min": 1, "max": 1 },
      { "click": "button:has-text(\"Clear\")" },
      { "viewport": { "width": 390, "height": 844 } },
      { "expectVisible": "input[type=search]" }
    ]
  }
}
```

Step kinds: `fill`, `click`, `press`, `expectVisible`, `expectCount`, `expectText`, `viewport`; selectors are Playwright selectors. A complete example: [examples/vite-react-demo/.agent-compare.json](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json).

The definition is validated before generation. Unknown fields, unavailable scripts, malformed steps, and cross-origin page paths are rejected. Binding includes root JS/TS helpers, `scripts/`, `tools/`, `config/`, known configuration and existing tests. New verification configuration and changes to package scripts, including lifecycle hooks, also prevent direct adoption. Protect additional baseline data or helpers with `"protectedFiles": ["custom/fixture.json"]`; each entry must name an existing repository-relative file.

Binding does not infer every file an arbitrary program can read dynamically. Programmatic acceptance describes the configured checks; other quality requirements still need hands-on use and source review.

## Compatibility

| Item | Status |
|---|---|
| DSH 0.2.1-rc.3 desktop, Windows 11 | Historical compatibility case: real-model generation, verification, choice and adoption completed; candidate sessions requested their own copy's write boundary and shell commands ran |
| DSH 0.2.1-rc.5, Web UI, Windows 11 | Production command, real child sessions, live previews, adoption, refreshed history, and adopted-result context in the next main-session request; local scripted adapter |
| Linux, Ubuntu CI, DSH 0.2.1-rc.5 | Core regressions and real host confinement, environment scrub, frozen install, build, preview reopening and cancellation passed; no complete external-model delivery case yet |
| DSH next channel | Separate Windows/Linux/macOS native runtime canaries print the resolved version; see [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml). This is separate from full model-delivery acceptance |
| macOS | Current source adds native full regression, Chromium interface, actual DSH and package-manager checks. Safari live comparison remains separate in [#115](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/115); Chromium results do not replace it |
| 1.2.0 baseline | Windows/Linux/macOS pin DSH 0.2.1-rc.5 and 0.2.2-rc.1; Playwright 1.65.0, Vite 8.3.6 and pnpm 12.18.0. See the execution matrix and current CI for passing combinations and limits |
| Node | 26.13.0 is the primary development baseline; current 22/24 maintenance releases also have CI compatibility jobs |
| Projects | Answers, files and web pages; folders outside Git, repositories with or without commits, repository subfolders, Vite, non-Vite Node projects and static sites. See [folders and project types](docs/workspaces-and-projects.md#english), and the [execution matrix](docs/package-managers.md) for complete package-manager checks and known limitations |

## Verified (maintained through current CI and the cases below)

The cases below retain their original source and tool versions. 1.2.0 scripts use the baseline above; historical run numbers are not presented as new-version measurements.

Current results are available in [CI](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/ci.yml). The reproducible runtime check also exercised DSH 0.2.1-rc.5 with Node 26.13 and Vite 8.3.5 on Windows: adjacent writes denied, child environment scrubbed, frozen installation, typecheck/build, two preview starts and cancelled writes stopped. Windows correctly reported partial enforcement.

To repeat that check using the official current host in a separate dependency directory:

```bash
npm install --prefix .runtime-checks/host-sdk --ignore-scripts --no-audit --no-fund @deepseek-ai/dsh@latest
npm run test:runtime
```

The host dependency directory is ignored and excluded from the plugin package. This runtime check uses a controlled example and does not request a model.

- Automated regressions (see the current CI results for the count), including real git, frozen npm installs, builds and preview processes (temporary paths contain spaces), plus unit and host-contract tests. Regressions cover: a rewritten test script passes its check but is not adoptable; failing checks; dependency changes without a lockfile update fail the frozen install with no unlocked retry; generation budget; exact adoption with HEAD and index untouched and resources released; rehearsal that adopts and keeps your other changes, or blocks without writing when the combination fails; overlap; recovery after an interrupted write; the repository lock; cleanup refusing directories it cannot prove it owns; stale-record saves; read-only legacy records; process ownership by command line; and the candidate session contract (directory = copy, sandbox `workspace-write`, approvals `never`, a stop before start, reported token usage).
- Adoption regressions preserve edits made during rehearsal or journal persistence, stop on concurrent HEAD/index changes, guard replacements and deletions, preserve ignored files at addition paths, and roll back only attempted paths. Retrying after resolving an overlap still supports adoption and undo.
- Startup regressions reserve capacity before asynchronous preparation, permit retry after an initial-save failure and preserve history on identifier collisions. Shutdown drains pending starts, both candidates and journaled adoption. History tests page through 65 actual record files without changing their bytes.
- Browser assertions cover composer controls and persisted settings, separate run identities, two interactive previews, blank-conversation navigation and reopening, source review, adoption confirmation, return-to-composer focus, responsive states, and dialog keyboard behaviour. History navigation covers 72 sample entries, pagination, search, late responses, older backends, retry and read-only issue filtering. Light/dark interface states pass the automated WCAG 2 A/AA and 2.1 AA rules. These checks use labelled sample runs.
- `node scripts/smoke.mjs`: the built-in case with scripted agents on React 19.3.1, Vite 8.3.5, and Playwright Chromium 156.0.8078.4. The complete version passes 12/12 acceptance steps; the one missing the clear button passes 9/12 and is not adoptable. Notes are edited after the baseline, so adoption must rehearse the combined result and preserve the updated notes. With `--escape B`, a write outside the copy is detected.
- DSH 0.2.1-rc.5, isolated profile: the production command consumes a five-minute generation setting, creates two actual candidate sessions, serves both apps, and completes review and adoption. After reload and returning to normal conversation, a local scripted adapter observes the adopted result in the real main-session request. New and existing header controls remain available, with no page errors. No external model request is made in this check.
- Development and example dependency audits report zero known advisories. Backend coverage is reported separately by `npm run test:coverage`; browser and native-host integration checks are separate layers and are not included in that percentage.

- Real model (DSH 0.2.1-rc.3 desktop, deepseek-flash, built-in case): both candidate session headers record their own copy as `cwd`, with `sandbox/mode` `workspace-write` and `approval/policy` `never`; `pwsh` runs inside the candidates (the 0.1 `SetNamedSecurityInfoW` error is gone); token usage comes from the session logs. Neither candidate declared completion within 30 minutes. One had written its whole change, and the shared acceptance run on its copy afterwards passed the frozen install, typecheck, build and 12/12 page steps — which is why 0.2.0-alpha.2 verifies written work when the time limit is reached.

- A full real-model round (DSH 0.2.1-rc.3 desktop, deepseek-flash, one model with two strategies, 60-minute limit): each candidate generated for about 42 minutes, using about 2.64M and 2.94M tokens; both passed typecheck, build and page acceptance; B was picked and adopted into the working tree (`src/App.tsx`, `src/styles.css`), uncommitted, with index and HEAD unchanged.
- In-conversation runs (DSH 0.2.1-rc.3 runtime, test profile): `/ab` appears in the command menu; the composer's A|B button turns the draft into `/ab …`, which is executed as the command; the session log records `command/run` (`ab` and its arguments) and `command/done` (with the run id); when generation finishes, a note describing the result is queued into that conversation for the model's next step; the host accepted every registration (composer button, command card, tool card, header button).
- Packed-plugin interface checks (DSH 0.2.1-rc.3 Web UI, isolated profile): graphical submission through the resident composer, two real Vite previews with search and clear interaction, choice, adoption review and working-tree writes, persisted result notes in the next-step inbox, reload recovery of the adopted record, and return to ordinary conversation. This check used fixed scripted candidates, without a model request.

## Not verified yet

- The desktop shell's final appearance after updating, and the latest host's "adopt, then ask for the next change" flow with an external model provider. Request-context delivery has been checked with the local scripted adapter.
- Historical Windows cases recorded long tool calls and inter-step waits, sometimes exceeding 30 minutes per comparison. The contributing costs have not been isolated and cannot be attributed to a particular plugin or service; the current host still needs performance measurements with an external model.
- Privacy modes and browser engines beyond the tested Chromium/Edge environments. Candidate-state separation was checked in Chromium; embedded cookies and external tabs still follow their own browser policies. This is not a complete browser security boundary.
- Provider behaviour in two-model mode.

## Known limitations

- Answers and files are compared by their content. Live previews and page checks need a runnable web project; other languages' tests run only when the baseline's package scripts run them.
- In a folder outside Git, every version starts from an empty folder and does not read the files already there. To change existing files, enable Git in that folder from the settings strip first; the home folder, drive roots, system folders and folders over 5,000 files or 300 MB are refused.
- Each extra version adds a model session, an install and a preview. Four versions use about four times the usage of one, and more disk and memory in projects with heavy dependencies.
- Release 1.3.0 and earlier list a record with three or four versions as one to handle and do not act on it; after upgrading it reads normally.
- npm 12 installation policy can block dependency scripts; projects requiring native installation steps must first allow them under their own policy.
- One comparison says nothing about a model's or style's overall quality.

## Development

Use Node 26.13.0 (`.nvmrc`) and npm 12.2.2. The compiler and test baseline is TypeScript 7, React 19.3, and Vitest 5. The distributed client reuses the React runtime supplied by DSH.

```bash
npm ci && npm run typecheck && npm test
```

```bash
npx playwright-core install --only-shell chromium
npm run test:ui
npm run test:coverage
npm run smoke
```

```bash
node scripts/preview-ui.mjs
```

See [CONTRIBUTING.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CONTRIBUTING.md) and [CHANGELOG.md](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md).

## License

MIT

<!-- project-growth:start -->

## Project growth

**Maintenance notice:** The maintainer reports that November 11 UTC maintenance, improvements and fixes included a temporary withdrawal from most plugin marketplaces, reducing distribution and requests that day. [Maintenance and distribution notice](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/maintenance-update-2026-11-11.en.md).

<a href="https://www.npmjs.com/package/dsh-agent-compare">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-dark.svg">
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-dark.svg">
  <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-light.svg" width="960" alt="AgentCompare · Total npm download requests since first publication">
</picture>
</a>

Lifetime official npm download requests across all public versions, starting at first publication. The card states the available cutoff; repeated and automated requests may be included.

[Lifetime definition and automatic refresh](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/npm-total-downloads.md)

The Star badge reads GitHub with about five minutes of caching. Cumulative npm requests refresh daily at 19:00 Asia/Shanghai; execution may be delayed.

<!-- project-growth:end -->
