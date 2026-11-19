import assert from 'node:assert/strict'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const repository = 'lijiaqi-AI-Product-Manager/dsh-agent-compare'
const starsSource = 'https://api.github.com/repos/' + repository
const starsFile = 'docs/measurements/github-stars.json'
const ranksFile = 'docs/measurements/market-ranks.json'
const marketSource = 'https://dshmarket.com/categories/workflow/'
const dshSoSource = 'https://www.dsh.so/artifact/dsh-agent-compare/'
const font = 'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Microsoft YaHei,Noto Sans CJK SC,sans-serif'
const formatNumber = new Intl.NumberFormat('en-US')
const xmlCharacters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }
const escape = value => String(value).replace(/[&<>"']/g, character => xmlCharacters[character])

function count(value, minimum = 0) {
  assert.ok(Number.isSafeInteger(value) && value >= minimum, 'Invalid metric value')
  return formatNumber.format(value)
}

function day(value) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/)
  const time = Date.parse(value + 'T00:00:00Z')
  assert.ok(Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value, 'Invalid metric date')
  return value
}

function svg(width, height, title, description, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">${escape(title)}</title>
  <desc id="description">${escape(description)}</desc>
  ${content.trim()}
</svg>
`
}

function numberSize(value, preferred, textWidth) {
  return Math.min(preferred, Math.floor(textWidth / (value.length * .65)))
}

export async function collectGitHubStars(get = fetch, checkedAt = new Date().toISOString(), token) {
  const headers = { accept: 'application/vnd.github+json', 'user-agent': 'dsh-agent-compare-statistics' }
  if (token) headers.authorization = 'Bearer ' + token
  const response = await get(starsSource, { headers, redirect: 'error', signal: AbortSignal.timeout(25_000) })
  assert.ok(response.ok, 'GitHub stars request failed: ' + response.status)
  const result = await response.json()
  assert.equal(result.full_name, repository)
  count(result.stargazers_count)
  return { schema: 'agentcompare.github-stars/v1', repository, source: starsSource, stars: result.stargazers_count, checkedAt }
}

export function renderStarsBadge(snapshot) {
  assert.equal(snapshot.schema, 'agentcompare.github-stars/v1')
  assert.equal(snapshot.repository, repository)
  assert.equal(snapshot.source, starsSource)
  const observation = day(snapshot.checkedAt.slice(0, 10))
  const value = count(snapshot.stars)
  return svg(146, 66, `GitHub Stars · ${value}`, `GitHub repository count observed on ${observation} UTC.`, `
  <defs>
    <linearGradient id="night" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#0a132c"/><stop offset="1" stop-color="#24376e"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff5ba"/><stop offset=".62" stop-color="#ffd56b"/><stop offset="1" stop-color="#ffad44"/></linearGradient>
    <radialGradient id="light"><stop stop-color="#ffd977" stop-opacity=".25"/><stop offset="1" stop-color="#ffd977" stop-opacity="0"/></radialGradient>
  </defs>
  <path d="M17 1h112q16 0 16 16v33q0 15-16 15H17Q1 65 1 50V17Q1 1 17 1Z" fill="url(#night)" stroke="#42598b"/>
  <circle cx="27" cy="33" r="26" fill="url(#light)"/>
  <ellipse cx="27" cy="33" rx="22" ry="9" transform="rotate(-34 27 33)" fill="none" stroke="#ffe4a2" stroke-opacity=".46"/>
  <path d="m27 16 4.8 10.3 11.2 1.3-8.3 7.6 2.3 11L27 40.6l-10 5.6 2.3-11-8.3-7.6 11.2-1.3Z" fill="url(#gold)" stroke="#ffedb0" stroke-width=".6"/>
  <path d="m27 16 4.8 10.3L27 33l-4.8-6.7Z" fill="#fff3b8" opacity=".8"/>
  <circle cx="43" cy="15" r="1.3" fill="#ffe8a6"/>
  <circle cx="15" cy="50" r="1.2" fill="#ffe8a6"/>
  <path d="M129 10h5m-2.5-2.5v5" stroke="#91a9e6" stroke-linecap="round" opacity=".88"/>
  <g font-family="${font}">
    <text x="53" y="23" fill="#edf2ff" font-size="10" font-weight="650" letter-spacing=".8">GITHUB STARS</text>
    <text x="51" y="51" fill="#ffe9a2" font-size="${numberSize(value, 28, 88)}" font-weight="750">${value}</text>
  </g>`)
}

export function renderDownloadBadge(snapshot) {
  const label = 'npm download/下载量'
  const value = count(snapshot.total)
  return svg(174, 66, `${label} · ${value}`, `Total npm download requests from ${day(snapshot.firstDay)} through ${day(snapshot.asOf)} UTC.`, `
  <defs>
    <linearGradient id="paper" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#aff2d4"/><stop offset="1" stop-color="#eefff5"/></linearGradient>
    <linearGradient id="disc" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#0c725c"/><stop offset="1" stop-color="#25a375"/></linearGradient>
  </defs>
  <path d="M14 1h146q13 0 13 13v9a10 10 0 0 0 0 20v9q0 13-13 13H14Q1 65 1 52v-9a10 10 0 0 0 0-20v-9Q1 1 14 1Z" fill="url(#paper)" stroke="#79c8aa"/>
  <path d="M15 5h144" fill="none" stroke="#fff" stroke-opacity=".92" stroke-linecap="round"/>
  <path d="M159 10v46" stroke="#61af95" stroke-opacity=".75" stroke-dasharray="2 3"/>
  <circle cx="31" cy="33" r="19" fill="url(#disc)"/>
  <circle cx="31" cy="33" r="15.5" fill="none" stroke="#b9ffdc" stroke-opacity=".5"/>
  <path d="M31 23.5v13m-5.5-5.5 5.5 5.5 5.5-5.5M24 42h14" stroke="#f6fff9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <g font-family="${font}">
    <text x="55" y="23" fill="#165449" font-size="9.8" font-weight="660" textLength="100" lengthAdjust="spacingAndGlyphs">${label}</text>
    <text x="55" y="50" fill="#083e33" font-size="${numberSize(value, 26, 100)}" font-weight="770" letter-spacing="-.4">${value}</text>
  </g>`)
}

export function renderMarketBadge(snapshot) {
  assert.equal(snapshot.source, marketSource)
  const date = day(snapshot.asOf)
  const rank = '#' + count(snapshot.position, 1)
  return svg(226, 66, `DSH Market · Workflow download rank ${rank}`, `Workflow & Automation category, 30-day npm download requests. Snapshot ${date}.`, `
  <defs>
    <linearGradient id="blue" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#25236b"/><stop offset=".55" stop-color="#3e50cf"/><stop offset="1" stop-color="#6748ba"/></linearGradient>
    <linearGradient id="medal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c9f3ff"/><stop offset="1" stop-color="#bdb1ff"/></linearGradient>
  </defs>
  <path d="M1 14 14 1h191l20 17v34l-14 13H14L1 52Z" fill="url(#blue)" stroke="#7484dd"/>
  <path d="M7 15 16 5h186l17 15M217 53l-8 7" fill="none" stroke="#d7e5ff" stroke-opacity=".58" stroke-linecap="round"/>
  <path d="m206 8-36 46h16l32-36Zm13 19-24 32h13l12-14Z" fill="#f2daff" opacity=".11"/>
  <path d="m30 43-7 16 11-4 7 4 7-16" fill="#b4b3f6"/>
  <circle cx="36" cy="31" r="22" fill="#262679" stroke="#90a0f6"/>
  <circle cx="36" cy="31" r="18.5" fill="url(#medal)" stroke="#e7efff"/>
  <path d="M12 25c-2 7 0 15 8 21m39-21c2 7 0 15-8 21" fill="none" stroke="#d9dfff" stroke-width="1.2"/>
  <path d="M14 33 9 29m8 10-6-3m47-3 5-4m-8 10 6-3" fill="none" stroke="#d9dfff" stroke-linecap="round" stroke-width="1.35"/>
  <g font-family="${font}">
    <text x="36" y="38" text-anchor="middle" fill="#29266b" font-size="${numberSize(rank, 20, 31)}" font-weight="800">${rank}</text>
    <text x="71" y="22" fill="#fff" font-size="11.5" font-weight="780" letter-spacing="1.05">DSH MARKET</text>
    <text x="71" y="38" fill="#f3f4ff" font-size="10.8" font-weight="660">Workflow downloads</text>
    <text x="71" y="53" fill="#f0edff" font-size="9.4">30 days · ${date}</text>
  </g>`)
}

export function renderDshSoBadge(snapshot) {
  assert.equal(snapshot.source, dshSoSource)
  const date = day(snapshot.asOf)
  const downloads = '#' + count(snapshot.weeklyDownloadsPosition, 1)
  const starGrowth = '#' + count(snapshot.weeklyStarGrowthPosition, 1)
  return svg(288, 32, `dsh.so weekly rankings · Downloads ${downloads}, Star growth ${starGrowth}`,
    `Snapshot ${date} UTC. Downloads combine npm and its mirror. Stars are weekly gains.`, `
  <defs><linearGradient id="enamel"><stop stop-color="#f4f1ff"/><stop offset="1" stop-color="#fff7e2"/></linearGradient></defs>
  <rect x="1" y="1" width="286" height="30" rx="15" fill="url(#enamel)" stroke="#d9cde9"/>
  <rect x="5" y="5" width="48" height="22" rx="11" fill="#6849a5"/>
  <path d="M143 9v14" stroke="#dacdea"/>
  <g font-family="${font}">
    <text x="29" y="20" text-anchor="middle" fill="#fff" font-size="10.5" font-weight="725">dsh.so</text>
    <text x="62" y="19.5" fill="#3d2863" font-size="10.2" font-weight="680">Downloads ${downloads}</text>
    <text x="151" y="19.5" fill="#674018" font-size="10.2" font-weight="680">Star gain ${starGrowth}</text>
    <text x="280" y="19.5" text-anchor="end" fill="#755223" font-size="8.4">${date}</text>
  </g>`)
}

async function main() {
  const check = process.argv.includes('--check')
  const offline = check || process.argv.includes('--render-only')
  const saved = JSON.parse(await readFile(path.join(root, starsFile), 'utf8'))
  const ranks = JSON.parse(await readFile(path.join(root, ranksFile), 'utf8'))
  assert.equal(ranks.schema, 'agentcompare.market-ranks/v1')
  const stars = offline ? saved : await collectGitHubStars(fetch, new Date().toISOString(), process.env.GITHUB_TOKEN)
  if (!offline && stars.stars === saved.stars && stars.repository === saved.repository) stars.checkedAt = saved.checkedAt

  const assets = new Map([
    ['assets/statistics/github-stars.svg', renderStarsBadge(stars)],
    ['assets/statistics/dsh-market-rank.svg', renderMarketBadge(ranks.dshMarket)],
    ['assets/statistics/dshso-weekly-ranks.svg', renderDshSoBadge(ranks.dshSo)],
    [starsFile, JSON.stringify(stars, null, 2) + '\n'],
  ])
  for (const [file, content] of assets) {
    const target = path.join(root, file)
    if (check) assert.equal(await readFile(target, 'utf8'), content, 'Stale metric asset: ' + file)
    else await writeFile(target, content)
  }
  console.log(JSON.stringify({ stars: stars.stars, marketRank: ranks.dshMarket.position, marketAsOf: ranks.dshMarket.asOf, mode: offline ? 'offline' : 'public-source' }))
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { process.stderr.write(error.message + '\n'); process.exitCode = 1 })
}
