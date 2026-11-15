# 演示条件与结果 / Demo conditions and results

[中文指南](../README.md#install) · [English guide](../README.en.md#install) · [流程短片 / Workflow clip](media/comparison-workflow.mp4)

## 中文

演示录制于真实 DSH Web 宿主，安装 AgentCompare 3.0.0 候选包。固定本地候选先思考，再通过 DSH 自带的写文件工具，按各自收到的风格写出番茄钟页面，最后回复一句话；四个隔离副本、过程记录、页面检查、独立操作、盲选、选择理由、保存和继续主对话都实际执行。没有发送外部模型请求，因此这段演示不能衡量模型生成质量、费用或真实模型耗时。正常使用时，各版分别调用已配置的模型并消耗用量。

源码提交：`aab78977f1406a99db92aa41501f78de7c5e2c2b`。录制用候选包 SHA-256：`da2c074b4b872addfbe1aa37d2d32eb64568b726c6eb220bd330849fa29d1c24`（同一提交的构建，以唯一开发版本号打包，装入独立测试 profile）。除写有开发版本号的 `package.json` 外，profile 中安装的 153 个文件与该提交逐字节一致。之后的提交只更新文档和素材；公开发布包的摘要以 Release 附件为准，不把录制候选的摘要冒充为最终产物摘要。

环境：Windows、DSH `0.2.2-rc.1`、Microsoft Edge `157.0.4341.60`（无界面模式）。未操作用户桌面 profile。界面中的计时器是实际运行的 HTML 页面。

任务：在普通文件夹里做一个能开始、暂停、重置的番茄钟网页，使用四版盲选。盲选时风格随机分配，选择后才揭晓：

| 版本 | 揭晓后的风格 | 共同页面检查 |
| --- | --- | --- |
| A | 大胆 · Bold | passed |
| B | 极简 · Minimal | passed |
| C | 活力 · Vibrant | passed |
| D | 稳妥 · Conservative | passed |

发送后，对话里的比较卡片有两颗彗星绕边框奔跑。各版还在工作时就打开大窗口：每版显示 DSH 的鲸鱼标志，空心轮廓随进度注水、两道光沿轮廓奔跑；戳一下 B 的鲸鱼，它吐泡泡并回一句话；展开 A 的「过程」，实时看到它的思考和写文件。各版的回复先于页面出现。四个页面就绪后启动 A、C 的计时器；排除 B、D，专注 C（回复在左、页面在右），选择 C，揭晓时卡片上有光粒和扫光。随后点选两个理由「布局」「更简洁」，保存到新文件夹，再继续主对话。文件夹里原有的 `notes.txt` 保持不变。

此前在同一类独立测试宿主上，用提交 `72c03e8` 的构建还做了两项检查，截图收在[图库](storefront-gallery.md)；之后的代码改动只涉及工作中的等待动画，这些截图里没有出现：

- **在项目里打招呼。** 在带 `typecheck` 和 `build` 脚本的 Vite 仓库里发送「你好」，四版按各自风格直接回答，都没有改文件，也没有安装依赖、构建或预览；仓库的工作区和提交保持不变。截图里展开了 B 的「过程」。同一仓库里发送「做一个番茄钟网页」，四版照常各自生成并构建实时页面，依赖由比较开始时的预装复制而来。
- **英文界面。** 快速组合「三种视觉」得到 Minimal、Polished、Vibrant 三版公开对比的回答，选择 B 并点选「Layout」「More complete」。390 像素窗口的截图也来自这次检查。

原始录制 **69.22 秒**；流程短片 **45.1 秒**，保留设置与发送、各版工作时的大窗口（鲸鱼、戳一下、A 的实时过程）、回复出现，以及四版页面的操作、排除、专注、选择、理由和保存，剪去等待，保留片段均按原速播放。GIF **14.3 秒、5 帧/秒、640 像素宽**，截取工作中的鲸鱼与戳一下、实时过程、四版实时页面、专注与选择揭晓和理由；画面加入可见的固定候选标签。它不把生成时间压缩成性能承诺。区间、哈希与处理方式见[素材清单](media/manifest.json)。

本地路径已隐藏；顶部主图、流程图和社交预览图标为功能示意，不是实际截图。界面截图只做了裁剪和缩小，打包进插件的两张 PNG 另做了颜色压缩，没有改写操作结果。[1.1.0 历史演示](media/history/1.1.0/manifest.json)、[更早的演示](media/history/0.2.0-alpha.17/manifest.json)和[真实模型的首次体验测量](first-use.md)继续保留。

## English

This recording uses a real DSH Web host with an AgentCompare 3.0.0 candidate installed. A controlled local model thinks, writes each timer through DSH's native write tool using the assigned style, then replies in one line. Four isolated copies, the steps record, shared page checks, independent interaction, a blind pick, reasons for the pick, saving into a new folder and continuing the conversation execute for real. No external model request is made. This recording establishes neither model quality nor real-model latency or cost. Normal use calls your configured models and consumes usage per version.

Source commit: `aab78977f1406a99db92aa41501f78de7c5e2c2b`. Recording candidate archive SHA-256: `da2c074b4b872addfbe1aa37d2d32eb64568b726c6eb220bd330849fa29d1c24` (that commit's build, packed with a unique development version and installed in an isolated test profile). Apart from `package.json`, which carries the development version, all 153 installed files matched the commit byte for byte. Later commits update documentation and media only; the final published archive has its own checksum in the Release assets.

Environment: Windows, DSH `0.2.2-rc.1`, Microsoft Edge `157.0.4341.60` (headless). The user's desktop profile is untouched. The four styles are assigned blind and revealed after the pick: A Bold, B Minimal, C Vibrant, D Conservative; every shared page check passed. After sending, two comets race around the comparison card in the conversation. The large window is opened while the versions still work: each version shows DSH's whale mark, a hollow outline filling with water as it goes while two lights run around its edge; B's whale is poked and answers with bubbles and a line, and A's **Steps** are opened to show its thinking and its file write live. The replies arrive before the pages. A and C count down independently; B and D are set aside, C is shown in focus with its reply beside its page and picked, and light bursts and sweeps across the cards at the reveal. Two reasons, Layout and Simpler, are tapped, the pick is saved into a new folder, and the conversation continues. The existing `notes.txt` is unchanged.

Two more checks ran earlier on the same kind of isolated test host with the build of commit `72c03e8`, shown in the [gallery](storefront-gallery.md); the only code change since then is the waiting animation, which those captures do not show:

- **A greeting in a project.** In a Vite repository with `typecheck` and `build` scripts, "你好" (hello) was answered by four versions in their own styles. None changed a file, and nothing was installed, built or served; the repository's working tree and commits stayed unchanged. The capture shows B's steps open. In the same repository, a request for a pomodoro page still made all four versions build live pages, with dependencies copied from the install made when the comparison started.
- **English interface.** The Three looks quick set gives an open comparison of Minimal, Polished and Vibrant answers; B is picked with Layout and More complete. The 390-pixel image comes from this check.

The raw recording lasts **69.22 seconds**. The **45.1-second** workflow clip keeps the setup and sending, the large window while the versions work (whales, a poke, A's live steps), the replies arriving, and the interaction with the four pages, setting two aside, focus, the pick, the reasons and the save, cutting waits and playing retained footage at the original speed. The **14.3-second GIF at 5 fps and 640 pixels** shows the whales at work and a poke, the live steps, the four live pages, focus with the pick and its reveal, and the reasons, with a visible controlled-candidate caption. Neither clip is a generation-time promise. [The manifest](media/manifest.json) records the intervals, hashes and edits.

Local paths are hidden. The header, workflow graphic and social preview are labelled product illustrations, not screenshots. Interface captures are only cropped and resized; the two PNGs packaged with the plugin are also palette-compressed, without changing outcomes. [The 1.1.0 recording](media/history/1.1.0/manifest.json), [earlier recordings](media/history/0.2.0-alpha.17/manifest.json) and [real-model first-use measurements](first-use.md) remain separate evidence.
