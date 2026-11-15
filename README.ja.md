[![鲸挑细选 · AgentCompare：青いガラスの4種類のタイマーからCを選択。DesktopとWeb、中国語と英語、リアルタイムの手順。機能イメージ。](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/hero-bilingual.webp)](#install)

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

[中文](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.md) · [English](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md) · **日本語** · [한국어](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.ko.md) · [Español](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.es.md) · [Português (Brasil)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.pt-BR.md) · [Français](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.fr.md) · [Deutsch](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.de.md)

**同じ依頼から、回答・ファイル・ページを 2〜4 バージョン。スタイルを選び、比較して決める。**

中国語名は **鲸挑细选**（ジン・ティアオ・シー・シュエン）。「精挑细选（えりすぐる）」のもじりで、鲸はクジラ。同じ依頼に 2〜4 頭の DeepSeek のクジラが同時に取り組み、いちばん良い版を選びます。愛称は **大肥鱼赛马**（「太っちょ魚のレース」）。中国のネットでは DeepSeek のクジラを「太っちょ魚」と呼びます。同じコースを何匹かが走り、勝者はあなたが決めます。

**DSH 桌面端 + 浏览器 / Desktop + Web**

<p align="center"><a href="#demo">真实演示 / Recorded demo</a> · <a href="#ui">界面与体验 / Interface</a> · <a href="#install">安装 / Install</a> · <a href="#whats-new">版本更新 / What's new</a></p>

> **このガイドは 3.1.0 に対応しています。公開済みの npm バージョンは上部のバッジで確認できます。** DSH Desktop と Web、中国語・英語の画面に対応。メイン会話内で 2〜4 バージョンの回答・ファイル・Web ページを比較できます。各バージョンの思考とツール呼び出しを開いて確認でき、返信は成果物と並べて表示されます。

<a id="demo"></a>

## 大肥鱼赛马を最初から最後まで見る

[![作業中のバージョンごとのクジラとリアルタイムのステップ、4 つのポモドーロページの同時実行、返信とページを並べた C の選択を示す固定候補の例](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/docs/media/comparison-preview.gif)](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4)

4 匹の太っちょ魚が 4 つのポモドーロに挑む、実際の DSH ホストで録画した固定候補の実演です（3.1.0 リリース候補のソース、画面は中国語）。通常のフォルダーで 4 つのバージョンがそれぞれポモドーロのページを作り、比較カードの周りを 2 つの彗星が走ります。作業中に大きなウィンドウを開くと、バージョンごとに DeepSeek の青いクジラがいて、頭の上に考えごとが浮かび、下には最新のステップがリアルタイムに流れます。つつくと返事をします。「过程」（Steps）を開くと思考とファイル書き込みがリアルタイムに見えます。返信はページより先に表示され、その後 4 つのライブページをそのまま操作できます。2 つを外し、C に絞ると返信が左、ページが右に並びます。選択後に各スタイルを公開し、新しいフォルダーに保存して会話を続けます。待機部分は省略し、それ以外は等速です。ローカルパスは非表示です。

選択後に理由（レイアウト、よりシンプル）を 2 つ選ぶと、主会話の次のリクエストに伝わります。

[動画全編（45秒）](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/media/comparison-workflow.mp4) · [条件と結果](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/demo.md)

[![2〜4案とスタイルを設定し、並列実行、体験と選択、変更の確認後に会話を続ける。機能イメージ。](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/comparison-workflow.webp)

<p align="center"><sub>功能示意 / Product illustration</sub></p>

AgentCompare は [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）のプラグインです。同じ依頼から 2〜4 バージョンの回答・ファイル・Web ページを作って比較します。実行可能なページはその場で操作でき、回答やファイルは内容を読んで選べます。ブラインド比較では選択後にモデルとスタイルを公開し、公開比較では最初から表示します。プロジェクトへの反映は改変内容と検証結果を確認してから行います。

[插件目录与安装](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.md) · [Plugin directories and installation](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/distribution.en.md) · [Listing status / 收录状态](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues/4)

<a id="ui"></a>
<a id="gallery"></a>

## 画面と体験

待ち時間も、比較も、選択も、すべて目に見えて操作できます。下のアニメーションと 2 枚の画像は、実際の DSH ホストで固定候補を比較した画面です。

- **青いリキッドグラス。** 半透明のガラスパネルとスライドする選択部品、その後ろでゆっくり流れて溶け合う青い光。ライトとダークに対応し、視差効果を減らす設定では静止します。検証した画面状態の製品 UI テキストは両テーマでグリフ単位に測定し、コントラスト比 4.5:1 以上でした。
- **太っちょ魚が付き添います。** バージョンごとに DeepSeek の青いクジラが 1 頭。進むにつれて青い水が満ち、2 つの光が輪郭を走ります。頭の上に考えごとが浮かび、つつくと返事をし、続けてつつくと回ったり、ふらついたり、水しぶきを上げたりします。
- **すべてのステップが見える。** 「Steps」ボタンで思考・ツール呼び出し・変更を一覧でき、作業中は最新の 3 ステップがクジラの下でリアルタイムに流れます。
- **返信と成果物を同じ重みで。** 回答だけなら回答だけ、ページがあれば返信と並べて表示し、1 つに絞ると返信が左、ページが右に並びます。
- **A〜D は 4 つの青。** ブラインド比較では A〜D だけが見え、スタイルとモデルは選んだ後に公開され、カードに光が走ります。
- **動いているのがひと目でわかる。** 実行中の比較の周りを 2 つの彗星が走り、ページは起動した瞬間から操作できます。
- **デスクトップ・ブラウザー・スマホ幅**に対応し、中国語と英語の画面を切り替えられます。

ステップに表示されるのは、モデルとホストが提供した情報です。長い記録は先頭と末尾を保持し、省略を明示します。ブラインド選択前はスタイル名を伏せます。クジラの水位は処理段階を表し、品質評価や正確な進捗率ではありません。

![大肥鱼特写：两版同时工作，头上冒出想法，连戳五下会跳、转圈、晕头、溅水花，展开「过程」看实时步骤，回复出现后水注满 / Whale close-up: thoughts, a five-poke combo, live steps and the Steps panel, then replies as the whales fill up; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/whale-closeup.webp)

<p align="center"><sub>クジラのクローズアップ：固定候補。見やすいよう台本モデルは各ステップで 9 秒待ちます。編集あり、それ以外は等速。</sub></p>

![四版页面直接操作 / Four independently interactive pages; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/02-live-comparison.png)

![打招呼得到四种回答 / A greeting answered four ways; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/03-main-conversation.png)

<details>
<summary>その他の画面：設定、英語の回答、スマホ幅</summary>

![版本、风格与上下文 / Versions, styles and context; controlled candidates in a real DSH host](https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/gallery-2.0/04-comparison-settings.png)

<p align="center"><img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/13-english-answers.webp" width="840" alt="Three open English answers from the Three looks quick set: B is the pick, with Layout and More complete as its reasons; controlled candidates in a real DSH host."> <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/readme/14-phone-answer.webp" width="260" alt="390-pixel English answer result in the blue glass interface, with the chosen version and a visible Continue conversation action; controlled candidates in a real DSH host."></p>

</details>

[全8枚の画像と撮影条件](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/storefront-gallery.md)

<a id="install"></a>

## インストール

画面言語は簡体字中国語と英語です。DSH Desktop と Web で切り替えられます。

以下のコマンドは自分で起動する DSH Web 用です。デスクトップ版の `desktop` プロファイルはアプリが管理するため、アプリのプラグイン画面を利用してください。

Node 26.13.0 と npm 12.2.2 が開発基準です。DSH パッケージ 0.2.1-rc.5 / 0.2.2-rc.1 で動作確認しています。既存の DSH プロファイル名を確認してください。

npm パッケージを既定の Web プロファイルに追加します。公開状態は上部の npm バッジで確認できます。

```bash
dsh plugin --profile web add dsh-agent-compare
```

別の自己管理プロファイルを使う場合は、`web` を実際の名前に置き換えてください。

**更新後は完全に再起動してください。** DSH Desktop を完全に終了してから開き直します。Web では対象の DSH サービスを再起動し、ページを再読み込みしてください。画面の再読み込みだけでは古いバックエンドが残ることがあり、バージョンの不一致は画面で通知されます。

ソースからビルドして導入することもできます。

```bash
git clone https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare.git
cd dsh-agent-compare
npm ci
npm pack
```

`<your-profile>` を実際に使っているプロファイル名に置き換えます。

```bash
dsh plugin --profile <your-profile> add ./dsh-agent-compare-3.1.0.tgz
```

DSH を再起動します。同じ記録を使う古いプラグインの実行は、更新前に終了してください。旧版と新版による同時変更はサポートしません。

## 最初の比較

1. 入力欄左下の **A|B** をクリックすると、入力欄の上に比較設定が開きます。
2. 2〜4 バージョンを選びます。既定は同じモデルで異なるスタイル。現在のモデルを再利用し、各バージョンのスタイルや一行の独自指示を設定できます。異なるモデルを使う場合も、DSH に設定済みのものから選びます。
3. ブラインド／公開比較、各バージョンの生成上限（5〜120 分）、共有する会話の文脈を選び、いつもの入力欄から依頼を送ります。
4. カードで進行状況と、回答・ファイル・ページの結果を確認します。実行中のページは操作でき、デスクトップ／スマホ幅、1〜4 キーでの集中表示、0 キーでの全体表示に切り替えられます。3〜4 版では不要な版を一時的に外せます。
5. 採用したい版を「Choose A」などで選ぶか、「None of these」でどれも選ばないことができます。ブラインド比較は選択後にモデルとスタイルを公開します。公開比較では最初から見えます。
6. プロジェクトの変更は「Review and adopt」で検証結果と差分を確認し、別の確認操作で反映します。Git 外のフォルダーでは新しいフォルダーに保存できます。回答だけならファイル反映は不要です。「Continue conversation」で主会話に戻り、選択の記録を引き継ぎます。

`试跑内置示例` は別のサンプル商店リポジトリを作成します。あなたのプロジェクトには触れず、採用先もそのサンプルです。右上の `比较记录` と `使用教程` は、新規会話と既存会話の両方から利用できます。

## 向いている課題

検索・絞り込み、フォーム、ランディングページ、ダッシュボード、コンポーネントの再設計など、操作して品質を比較したい課題に向いています。答えが明確な不具合修正や機械的なリファクタリングは、単一のエージェントとテストのほうが適しています。

同じモデルでは「既存構造を活かす」と「操作方法を見直す」という二つの戦略を使います。二つのモデルでは同じ依頼と指示を使います。いずれも同じコード基準点と共通の検証を利用します。一度の比較は、モデル全体の順位を意味しません。

<a id="whats-new"></a>

## 更新内容

**3.1.0 の新機能：**
- **すべてのステップを、実行中も終わった後も。** バージョンが作業を始めると、カードに「Steps」ボタンが現れます。開くと作業が順に並びます。所要時間つきの思考、ツール呼び出し（ファイルの読み取り・編集・コマンド実行など。開くと入力と出力を確認できます）、途中で書いた言葉です。作業中は最新の 3 ステップがクジラの下でリアルタイムに流れ、終わった後もすべてのステップをワンクリックで見返せます。ブラインド比較ではスタイルを示す語が ▒▒ になります。
- **返信をそのまま表示。** 回答だけのバージョンは回答だけを表示します。ページやファイルを作ったバージョンは、返信を成果物と同じ重みで表示します。並べて比較するときはページの上に、1 つに絞ったときはページの左に表示します。返信はバージョンが終わった時点で、ページより先に表示されます。
- **ページをそのまま表示。** 静的なページはプラグイン自身が配信するため、書き終えた時点で操作でき、デスクトップアプリに止められる別プロセスもありません。それでも配信できない場合は、HTML の成果物をそのままページとして表示し、ソースはワンクリックで切り替えられます。
- **成果物がより早く。** バージョンはターン終了から 1 秒以内に完了とみなします。以前はほかのプラグイン（記憶系など）がセッションを解放するまで待っており、一般的なデスクトップでは約 40 秒余計にかかっていました。各バージョンが作業している間にロックファイルから依存関係を先にインストールし、依存関係を変えていないバージョンにはその独立したコピーを渡します。チェックは並列で実行し、ページは起動した時点で操作できます。固定候補の録画環境では、4 つの Vite バージョンが送信から約 24〜30 秒ですべて使える状態になりました。
- **待ち時間も楽しく。** 作業中の各バージョンには DeepSeek の青いクジラのロゴが表示され、最初は淡い色で、進むにつれて青い水が満ち、2 つの光が輪郭を走ります。ときどき頭の上に考えごとの吹き出しが浮かびます（今していること、ひらめき、つついてという誘い）。ステップごとに潮を吹いてポインターのほうを向き、続けてつつくと跳ねたり、回ったり、ふらついたり、水しぶきを上げたりして、そのたびに新しいセリフを言います。実行中の比較の周りでは 2 つの彗星が枠を走り（古いエンジンやアニメーションを止めるテーマでも動きます）、背景ではゆっくり流れる青い光が溶け合います。
- **A〜D は 4 つの青。** バージョンのラベルは 4 種類の異なる青になりました。
- **DSH の再起動をお知らせ。** DSH はプラグインの画面をすぐ入れ替えますが、バックエンドは起動時に読み込んだものを使い続けます。両者が食い違うと、AgentCompare は黙ってステップや返信を欠くのではなく、DSH を完全に終了して開き直すよう案内します。
- **中国語名がつきました。** 正式名は「鲸挑细选」、愛称は「大肥鱼赛马」です。
- **単独では公開しなかった 2.1.0 の改善も含みます：** あいさつや質問にはページではなく回答が返ります。より明るく透明感のあるリキッドグラス、軽いボタン、スライドする操作部品。ライトとダークの両方で、21 の画面状態のすべての文字がコントラスト比 4.5:1 以上です。

**2.0.0 の新機能：** 一度に **2〜4 バージョン**を比較できます。各バージョンに**スタイル**を指定できます（変更の幅：堅実・大胆／見た目：ミニマル・洗練・活発／優先：使いやすさ・厳密・軽快、または一行の自由記述）。**ブラインド**（選択後に公開）と**公開比較**（最初から表示）を選べます。3〜4 バージョンでは不要な版を**外して**残りを並べて比べられ、カード内で 1〜4 キーを押すとその版に集中できます。
- **青いリキッドグラスの新しい UI。** オーロラと星屑の背景、ガラスのパネル、選択肢の間を滑るガラスのレンズ、液体の進捗表示。選んだ瞬間に光の粒がはじけ、公開時には光が走ります。ダークモード、視差効果を減らす設定、ハイコントラストに対応。
- **選んだ理由を伝える。** 選択後に理由（レイアウト、配色と質感、操作感など）を選ぶか一言添えると、主会話での後続の修正がその長所を保ちます。
- **クイックセット。** バージョン数とスタイルをワンタップで設定：定番の対比、3 つの見た目、3 つの優先、4 方向の探索。
- **2〜4 版をスタイルで比較。** 8 種のプリセットか一行のカスタム指定。異なるモデルで同じスタイルも使えます。
- **ブラインドか公開比較。** 各版を試し、一時除外して復元。1〜4 で集中表示、0 で全版に戻れます。
- **回答・ファイル・実行ページ。** Markdown を読み、回答・コード・内容・保存先をコピー。選んだ版が明確に表示されます。
- **主会話で続ける。** 比較・選択・採用・取り消しが現在の会話メモリに残り、そのまま修正を続けられます。
- **Desktop + Web、中国語・英語 UI。** 設定済みモデルを再利用。変更を確認してから採用し、取り消し・復元も行えます。

## 検証とコードの状態

Git リポジトリでは、コミットがまだなくても、未コミット・未追跡の内容を除外対象を除いて専用 index でスナップショット化します。Git 管理外のフォルダーでは、二つの実装はプラグイン専用の空の作業領域から始まり、選んだ結果はそのフォルダー内の新しいサブフォルダーに保存できます。元の HEAD と index を変更せず、各実装は個別の worktree とセッションを使います。差分はハッシュ付きのバイナリパッチとして保存されます。

基準点の `typecheck`、`lint`、`test`、`build` と、設定されたページ検証を両方に適用します。ロックファイルがあれば固定インストールを行い、失敗時に非固定インストールへ切り替えません。検証スクリプトや設定を変更して自分だけを合格にすることは、直接採用の根拠になりません。

根にある [`.agent-compare.json` の実例](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/examples/vite-react-demo/.agent-compare.json)で、入力、クリック、表示件数、文字列、画面幅などを共通条件として追加できます。定義は生成前に検証・固定されます。明示したページ受け入れ条件が未実行なら直接採用できません。基本的なページ読み込み確認だけが実行できなかった場合は、未検証の警告が表示されます。ビルド成功、ページ表示、要件達成、個人の好みは別の結果です。

## 採用・取り消し・復旧

採用では現在のプロジェクトと選択した差分を組み合わせます。変更箇所が重複する場合は停止します。他のファイルを編集していた場合は、一時コピーで組み合わせを再検証します。書き込み前には HEAD、index、対象内容を再確認し、復旧記録を保存します。

作業ツリーへの採用は、自動コミット、push、ブランチ切り替えを行いません。バイナリ、新規作成、削除も差分に含まれます。検証を満たさない実装は、確認用ブランチとして保存できます。取り消しや中断からの復旧では、その後の編集を検出すると競合として残します。

リポジトリロックはプラグイン同士を調整するもので、外部エディターをロックしません。実際の書き込み中は編集を一時停止してください。

## 履歴と実行環境

履歴は全会話を既定表示し、現在の会話、検索、30 件単位のページ送りに対応します。結果・選択・採用の説明は会話へ届けられ、会話が利用できない場合は再試行されます。長いログをすべて主会話へ入れません。破損した記録や旧形式は理由付きの読み取り専用として保持します。

再起動後は停止したプレビューと保存済みスクリーンショットを区別します。コピーが残っていればプレビューを再開できます。スクリーンショットは静的記録であり、実行中のページではありません。各起動には新しい `.localhost` アドレスを使い、実装間の Cookie とオリジンストレージを分けます。再開時にページ内の一時状態はリセットされますが、比較記録と画像は残ります。

worktree は完全な安全サンドボックスではありません。DSH の書き込み制約を使い、Windows の制約は **partial** として表示します。読み取りとネットワークは隔離しません。埋め込みページの Cookie はブラウザーの制限を受け、外部タブでは保存領域が異なる場合があります。ログイン、外部バックエンド、共有データベースは現在の対象外です。

## 時間・費用・確認済みの範囲

二つの実装にはそれぞれ生成コストがかかり、並列化が必ず安く、速くなるとは限りません。一方または両方を停止できます。上限時には、すでに書いた変更を検証します。使用量が返らない場合は「不明」であり、ゼロとは表示しません。

Windows・Linux・macOS のネイティブ検証を実行します。npm・pnpm・Yarn の検証済み構成と Windows／PnP の制約は[互換性一覧](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/README.en.md#compatibility)に分けて記載しています。ネイティブ Safari は別の検証対象です。固定応答によるテストは外部モデルの生成品質や所要時間の測定ではありません。

## フィードバックと開発

[Issue](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/issues)には DSH／プラグインの版、OS、再現手順、期待と実際の結果を記載してください。認証情報、非公開コード、完全なローカルパスは公開しないでください。[貢献ガイド](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CONTRIBUTING.md)と[変更履歴](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/CHANGELOG.md)も確認できます。

```bash
npm ci
npm run typecheck
npm test
npm run test:ui
```

## ライセンス

[MIT](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/LICENSE)。比較結果が役立った場合は、リポジトリへの Star や再現可能な事例で支援できます。Star や共有は任意です。

<!-- project-growth:start -->

## プロジェクトの推移

**メンテナンスのお知らせ：** 運営者によると、11 月 11 日（UTC）の保守・改善・修正に伴い、多くのプラグイン市場から一時的に公開を取り下げ、当日の配布とリクエストが減少しました。 [保守と配布のお知らせ（英語）](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/maintenance-update-2026-11-11.en.md).

<a href="https://www.npmjs.com/package/dsh-agent-compare">
<picture>
  <source media="(max-width: 600px) and (prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-dark.svg">
  <source media="(max-width: 600px)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-dark.svg">
  <img src="https://raw.githubusercontent.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/main/assets/statistics/npm-total-light.svg" width="960" alt="AgentCompare · Total npm download requests since first publication">
</picture>
</a>

初回公開から全公開バージョンを対象とした npm 累計ダウンロードリクエストです。集計終了日は画像に記載。重複・自動アクセスを含む場合があります。

[累計の定義と自動更新](https://github.com/lijiaqi-AI-Product-Manager/dsh-agent-compare/blob/main/docs/npm-total-downloads.md)

Star バッジは GitHub の値を約 5 分キャッシュします。npm の累計リクエスト数は毎日中国時間 19:00 に更新し、実行が遅れる場合があります。

<!-- project-growth:end -->
