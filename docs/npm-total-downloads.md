# 累计 npm 下载请求 · Total npm download requests

README 的累计数值从 npm 注册表记录的首次发布时间开始，统计至 npm `last-day` 返回的最后可用日，覆盖该包全部公开版本。统计日采用 UTC，不把尚未提供数据的日期补为零。请求量可能包含重复安装、自动化与测试访问，不等于独立用户或成功安装数。

The displayed lifetime total starts on the registry's first-publication date and ends on the official API's last available day. It covers all public package versions. Dates use UTC. Missing days are not silently filled with zero; requests are not unique users or successful installations.

徽章显示为 **npm download/下载量**，数值仍采用上述累计口径。

The badge reads **npm download/下载量** and retains the lifetime coverage defined above.

Star 徽章取自 GitHub 仓库接口的 Star 快照。它与 npm 累计下载量共用每日刷新任务，具体取数时间分别保存在公开快照中。

The Star badge uses the GitHub repository API snapshot. The same daily job refreshes both sources, with a separate observation date for each.

[Star 快照](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/measurements/github-stars.json) · [榜单快照](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/measurements/market-ranks.json)

[DSH插件市场下载榜](https://dshmarket.com/zh/categories/workflow/) 展示工作流与自动化分类的名次，按近 30 天 npm 下载请求排序。[dsh.so](https://www.dsh.so/artifact/dsh-agent-compare/) 周下载榜合计 npm 与镜像请求，Star 周榜按增量排序。榜单的观察日期保存在公开快照中。维护者核对两个榜单后更新快照。徽章图和八语 README 的替代文字都取自同一份数据，关闭图片也能读到数字。

The [DSH Market badge](https://dshmarket.com/categories/workflow/) shows the Workflow & Automation category rank by 30-day npm download requests. [dsh.so](https://www.dsh.so/artifact/dsh-agent-compare/) combines npm and mirror requests for weekly downloads and ranks weekly Star gains separately. The public snapshot records each board’s observation date. Maintainers verify both boards before updating the snapshots. The badge images and the alternative text in every README use the same figures, so the values are available when images are hidden.

来源：[发布元数据](https://registry.npmjs.org/dsh-agent-compare) · [最后可用日](https://api.npmjs.org/downloads/point/last-day/dsh-agent-compare) · [npm API 定义](https://github.com/npm/registry/blob/main/docs/download-counts.md)。完整逐日来源及范围保留在[公开快照](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/measurements/npm-total.json)，README 只展示累计总数。

[刷新任务](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/actions/workflows/npm-total.yml)每天北京时间 **19:00**（UTC **11:00**）检查一次。只有数值、统计截止日或源数据发生变化时才保存更新。接口失败、缺日或统计互相矛盾时，刷新任务失败并保留上次成功发布的总数，不把错误显示为零。每次范围请求不超过 365 天，避免把 npm 的单次范围上限误当成生命周期上限。

The refresh runs once daily at **19:00 Asia/Shanghai (11:00 UTC)**, saves meaningful changes only and retains the last published total on source errors. Daily ranges are fetched in chunks of at most 365 days so the API's per-request range limit does not become a rolling lifetime limit. The snapshot and SVGs are committed together.

定时时间表示预定触发时间，实际执行以 Actions 运行记录为准。[GitHub 的调度说明](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule)指出，繁忙时任务可能延迟或被丢弃；没有运行记录不能视为已检查且数据未变。

The configured time is a target; the Actions run history establishes whether a check actually ran. [GitHub documents scheduling delays and dropped jobs](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule). No run record is not evidence of an unchanged-data check.

手动核验：

```bash
node --test test/npm-total-downloads.node.mjs
node scripts/npm-total-downloads.mjs
node scripts/npm-total-downloads.mjs --check
node scripts/metric-badges.mjs
node scripts/metric-badges.mjs --check
```

`--render-only` 根据已保存的快照离线生成徽章并同步 README 数字。`--check` 核对图片、替代文字与快照。上述过程不登录 npm，也不发布新包。

