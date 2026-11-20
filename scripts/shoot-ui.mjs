// Render the plugin components with labelled sample runs in a local host fixture.
import { parseArgs } from 'node:util'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createUiHarness } from './preview-ui.mjs'
import { launchUiBrowser } from './ui-browser.mjs'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    widths: { type: 'string', default: '1440' },
    out: { type: 'string', default: '.research/ui-shots' },
  },
})
const states = (positionals[0] ?? 'start,compose,history,running,judging,failed,revealed,blocked,adopted,recovery,guide').split(',')
const themes = (positionals[1] ?? 'light,dark').split(',')
const widths = values.widths.split(',').map(Number)
if (positionals.length > 2 || states.some(s => !/^[a-z][a-z-]*$/.test(s)) ||
    themes.some(t => !['light', 'dark'].includes(t)) ||
    widths.some(w => !Number.isInteger(w) || w < 280 || w > 4096)) throw new Error('Invalid capture options')

await mkdir(values.out, { recursive: true })
const host = await createUiHarness({ port: 0, demoPort: 0 })
let browser
try {
  browser = (await launchUiBrowser()).browser
  for (const width of widths) {
    for (const theme of themes) {
      const page = await browser.newPage({
        viewport: { width, height: width <= 600 ? 844 : 900 }, colorScheme: theme,
        locale: 'zh-CN', deviceScaleFactor: 1, reducedMotion: 'reduce',
      })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      for (const state of states) {
        await page.goto(host.url + '/?' + new URLSearchParams({ state, theme }))
        if (state === 'start' || state === 'compose') {
          const toggle = page.locator('.ac-mode-btn').first()
          await toggle.waitFor()
          if (state === 'compose' && await toggle.getAttribute('aria-pressed') !== 'true') await toggle.click()
          if (state === 'compose') await page.locator('.ac-composer-settings').waitFor()
        } else {
          const target = state.startsWith('history') ? '.ac-history-controls' : state === 'guide' ? '.ac-guide' :
            state.startsWith('inline') ? '.ac-inline .ac-card' : '.ac-sheet .ac-card'
          await page.locator(target).first().waitFor()
        }
        await page.evaluate(async () => {
          await document.fonts.ready
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
        })
        const problems = await page.evaluate(() => window.__harnessErrors ?? [])
        if (errors.length || problems.length) throw new Error([...errors, ...problems].join('\n'))
        const filename = [state, theme, width].join('-') + '.png'
        await page.screenshot({ path: path.join(values.out, filename), animations: 'disabled' })
        console.log(filename)
      }
      await page.close()
    }
  }
} finally {
  try { await browser?.close() } finally { await host.close() }
}
