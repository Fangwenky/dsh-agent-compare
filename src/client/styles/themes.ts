export const SURFACE_MODES = `/* dark: deeper glass with a blue cast; no light patches, which read as smudges on a dark ground */
@media(prefers-color-scheme:dark){.ac-root{--ac-v-brand:#7089ff;--ac-v-brand-2:#93a5ff;--ac-v-ink:#cdd5ff;--ac-v-doing:#ffb547;--ac-v-ring:#6f83f0;--ac-brand:var(--ac-v-brand);
--ac-fg:var(--dsw-alias-label-primary,#0f1115);--ac-fg2:var(--dsw-alias-label-secondary,#4b5260);--ac-fg3:var(--dsw-alias-label-secondary,#596475);
--ac-g-panel:linear-gradient(180deg,rgba(52,62,108,.6),rgba(32,39,72,.54));--ac-g-bar:linear-gradient(180deg,rgba(44,53,98,.96),rgba(30,37,72,.94));--ac-g-card:linear-gradient(180deg,rgba(42,51,92,.62),rgba(24,30,54,.84) 62%);--ac-g-field:linear-gradient(180deg,rgba(16,21,42,.6),rgba(10,14,30,.5));--ac-g-lens:linear-gradient(180deg,rgba(112,137,255,.42),rgba(77,107,254,.26));
--ac-g-stroke:linear-gradient(170deg,rgba(255,255,255,.34),rgba(255,255,255,.07) 30%,rgba(143,227,255,.26) 54%,rgba(255,255,255,.05) 74%,rgba(160,140,255,.3));
--ac-g-depth:inset 0 -14px 18px -16px rgba(77,107,254,.34);--ac-g-spot:rgba(143,163,255,.14);--ac-g-dust:.32;
--ac-v-rim:inset 0 1px 0 rgba(255,255,255,.13),inset 0 0 0 1px rgba(255,255,255,.05);
--ac-v-fringe:inset 1px 0 0 rgba(143,227,255,.35),inset -1px 0 0 rgba(160,140,255,.3);
--ac-v-shadow:0 0 0 1px rgba(123,147,255,.14),0 18px 44px -22px rgba(0,0,0,.75);
--ac-v-lift:0 0 0 1px rgba(123,147,255,.24),0 24px 52px -20px rgba(0,0,0,.8),0 0 28px -10px rgba(77,107,254,.5);
--ac-v-glow:radial-gradient(110% 70% at 6% 0%,rgba(77,107,254,.24),transparent 62%),radial-gradient(70% 55% at 100% 0%,rgba(56,182,255,.13),transparent 58%)}
.ac-sheet{background:radial-gradient(86% 44% at 10% 0%,rgba(77,107,254,.2),transparent 64%),radial-gradient(64% 38% at 94% 0%,rgba(56,182,255,.12),transparent 62%),linear-gradient(180deg,color-mix(in srgb,#27357e 26%,var(--ac-bg)),color-mix(in srgb,#141a34 30%,var(--ac-bg)) 46%);border-color:rgba(123,147,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 40px 90px -30px rgba(0,0,0,.8)}
.ac-sheet::before{display:none}
.ac-run-heading>.ac-text-btn,.ac-run-heading>.ac-text-btn:hover{background:linear-gradient(180deg,rgba(112,137,255,.3),rgba(77,107,254,.18));box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 0 0 1px rgba(143,162,255,.24)}
.ac-action-dock{box-shadow:var(--ac-v-rim),0 0 0 1px rgba(123,147,255,.14),0 24px 44px -24px rgba(0,0,0,.8)}.ac-action-dock::after{background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,0))}
.ac-composer-settings{background:radial-gradient(120% 90% at 0% 0%,color-mix(in srgb,#4d6bfe 22%,transparent),transparent 58%),radial-gradient(60% 80% at 100% 0%,color-mix(in srgb,#45b6ff 12%,transparent),transparent 60%),color-mix(in srgb,var(--ac-bg) 82%,transparent)}
.ac-composer-settings::after{background:radial-gradient(220px 120px at var(--ac-mx,12%) var(--ac-my,0%),rgba(143,163,255,.12),transparent 70%)}
.ac-card-head{background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,0))}
.ac-card.picked{box-shadow:var(--ac-v-rim),0 0 0 1.5px #7089ff,0 0 0 6px rgba(112,137,255,.18),0 0 40px -8px rgba(77,107,254,.55)}
.ac-preview-stage,.ac-browser,.ac-shot,.ac-shotwrap{background:linear-gradient(180deg,rgba(10,14,30,.5),rgba(14,18,36,.36))}.ac-preview-stage{box-shadow:inset 0 7px 10px -9px rgba(0,0,0,.6),inset 0 -7px 10px -9px rgba(0,0,0,.4)}
.ac-hrow{box-shadow:var(--ac-v-rim),var(--ac-v-shadow)}
.ac-hrow:not(.legacy):hover{background:radial-gradient(180px 90px at var(--ac-mx,0%) var(--ac-my,0%),rgba(143,163,255,.18),transparent 70%),linear-gradient(180deg,rgba(52,62,108,.7),rgba(30,37,68,.9))}
.ac-btn,.ac-btn:hover:not(:disabled){background:linear-gradient(180deg,color-mix(in srgb,#7089ff 20%,var(--ac-bg)),color-mix(in srgb,#7089ff 12%,var(--ac-bg)))}.ac-btn{box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 0 0 1px rgba(123,147,255,.22)}
.ac-btn:hover:not(:disabled){filter:brightness(1.12)}
.ac-btn.primary,.ac-btn.primary:hover:not(:disabled),.ac-btn.sm.primary,.ac-btn.sm.primary:hover:not(:disabled){background:var(--ac-p-bg);filter:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.28),inset 0 -1px 0 rgba(0,0,0,.3),0 10px 24px -10px rgba(77,107,254,.75)}
.ac-btn.danger,.ac-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--ac-err) 14%,var(--ac-bg));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 0 0 1px color-mix(in srgb,var(--ac-err) 30%,transparent)}
.ac-icon-btn:hover{background:rgba(112,137,255,.18);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 0 0 1px rgba(143,162,255,.24)}
.ac-chip,.ac-chip:hover:not(:disabled):not(.on){background:linear-gradient(180deg,color-mix(in srgb,#7089ff 16%,var(--ac-bg)),color-mix(in srgb,#7089ff 9%,var(--ac-bg)));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 0 0 1px rgba(123,147,255,.2)}
.ac-chip:hover:not(:disabled):not(.on){filter:brightness(1.12)}
.ac-root .ac-chip.on{box-shadow:inset 0 1px 0 rgba(255,255,255,.3),0 6px 16px -6px rgba(77,107,254,.7)}
.ac-style-slot{box-shadow:inset 0 1px 0 rgba(255,255,255,.07),inset 0 0 0 1px rgba(123,147,255,.2)}
.ac-seg{background:linear-gradient(180deg,rgba(8,12,28,.42),rgba(20,26,50,.36));box-shadow:inset 0 1px 2px rgba(0,0,0,.5),inset 0 -1px 0 rgba(255,255,255,.07),0 0 0 1px rgba(123,147,255,.12)}
.ac-seg::before,.ac-seg button.on,.ac-tab.on{box-shadow:inset 0 1px 0 rgba(255,255,255,.2),var(--ac-v-fringe),0 0 0 1px rgba(143,162,255,.3),0 6px 18px -6px rgba(77,107,254,.6)}
.ac-tab:hover:not(.on){background:rgba(112,137,255,.12)}
.ac-root select,.ac-history-controls input,.ac-style-note,.ac-why-note{box-shadow:inset 0 1px 2px rgba(0,0,0,.35),0 0 0 1px rgba(123,147,255,.2)}.ac-root select:hover:not(:disabled){box-shadow:inset 0 1px 2px rgba(0,0,0,.35),0 0 0 1px rgba(143,162,255,.42)}
.ac-history-issue-filter input{background:linear-gradient(180deg,rgba(6,10,24,.55),rgba(16,22,44,.4));box-shadow:inset 0 1px 2px rgba(0,0,0,.5),inset 0 0 0 1px var(--ac-v-ring)}
.ac-history-issue-filter input::before{background:linear-gradient(180deg,#dfe6ff,#aebcff);box-shadow:inset 0 1px 0 #fff,0 2px 6px -1px rgba(0,0,0,.6)}
.ac-context-picker input,.ac-row>input[type=checkbox]{box-shadow:inset 0 1px 2px rgba(0,0,0,.4),inset 0 0 0 1px var(--ac-v-ring)}
.ac-context-picker{background:linear-gradient(180deg,rgba(8,12,28,.4),rgba(16,22,44,.3));box-shadow:inset 0 1px 2px rgba(0,0,0,.4),0 0 0 1px rgba(123,147,255,.12)}
.ac-context-picker li label:hover{background:rgba(112,137,255,.1)}.ac-context-picker li.on label{background:rgba(112,137,255,.16);box-shadow:0 0 0 1px rgba(143,162,255,.34)}
.ac-check{box-shadow:none}
.ac-pill.brand .ac-dot,.ac-pill.brand .ac-spin{color:var(--ac-v-doing)}
}
@media(prefers-reduced-transparency:reduce){.ac-action-dock,.ac-root.ac-composer-settings{backdrop-filter:none;-webkit-backdrop-filter:none}.ac-action-dock,.ac-root.ac-composer-settings,.ac-card,.ac-why,.ac-banner,.ac-copy-space,.ac-review,.ac-hrow{background:var(--ac-bg)}.ac-seg{background:var(--ac-l2)}.ac-action-dock::after,.ac-sheet::before,.ac-sheet::after,.ac-ambient{display:none}}
@media(forced-colors:active){.ac-seg::before,.ac-sheet::before,.ac-sheet::after,.ac-ambient,.ac-burst,.ac-action-dock::after{display:none}.ac-seg.ac-lensed button.on,.ac-chip.on{forced-color-adjust:none;background:Highlight;color:HighlightText}.ac-card,.ac-inline,.ac-composer-settings,.ac-conversation-run,.ac-action-dock,.ac-why{border:1px solid CanvasText}.ac-root select,.ac-history-issue-filter input,.ac-context-picker input,.ac-row>input[type=checkbox]{appearance:auto;-webkit-appearance:auto;background:Field;box-shadow:none}.ac-history-issue-filter input,.ac-context-picker input,.ac-row>input[type=checkbox]{width:16px;height:16px;border-radius:0}.ac-history-issue-filter input::before,.ac-context-picker input::before,.ac-row>input[type=checkbox]::before{display:none}}
`

export const CANDIDATE_MODES = `@media(prefers-color-scheme:dark){
.ac-steps{background:rgba(16,21,42,.55);box-shadow:inset 0 0 0 1px rgba(123,147,255,.16)}
.ac-step summary:hover,.ac-steps-toggle:hover{background:rgba(112,137,255,.12)}
.ac-step-target{background:rgba(112,137,255,.14)}.ac-step-io pre{background:rgba(0,0,0,.28)}
.ac-step-thinking{border-left-color:rgba(143,162,255,.28)}
.ac-reply{background:rgba(24,30,58,.72);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 0 0 1px rgba(123,147,255,.16)}
.ac-whale-stage{background:linear-gradient(180deg,rgba(20,26,50,.3),rgba(28,36,72,.5))}
.ac-whale-holes{fill:#f2f5ff}.ac-whale-glass{fill:rgba(125,149,255,.38)}.ac-whale-line{stroke:#9aaeff}.ac-whale-wave.back{fill:#7d95ff;opacity:.55}
.ac-whale-bubble.think{background:#1e2648;color:var(--ac-fg);box-shadow:0 0 0 1px rgba(143,162,255,.3),0 6px 14px -8px rgba(0,0,0,.6)}.ac-whale-bubble.think::before,.ac-whale-bubble.think::after{box-shadow:0 0 0 1px rgba(143,162,255,.3)}
.ac-live-steps{background:rgba(16,21,42,.55);box-shadow:inset 0 0 0 1px rgba(123,147,255,.18)}.ac-live-steps:hover{background:rgba(22,28,56,.75)}.ac-live-step b{color:var(--ac-v-ink)}
.ac-steps-toggle{background:rgba(143,162,255,.12);box-shadow:inset 0 0 0 1px rgba(143,162,255,.3);color:var(--ac-v-ink)}.ac-steps-toggle .ac-steps-count{color:#cfd5e6}.ac-steps-toggle.open{background:rgba(143,162,255,.2)}.ac-step-dot.text{background:#b9c6ff}
.ac-stale-backend{background:#3a2a0a;color:#ffe2a8;box-shadow:inset 0 0 0 1px #8a6420}
.ac-whale-caption{color:var(--ac-fg)}
.ac-shimmer{background-image:linear-gradient(90deg,var(--ac-fg2) 0 38%,#c0caff 50%,var(--ac-fg2) 62% 100%)}
}
@media(prefers-reduced-motion:reduce){.ac-shimmer{animation:none;-webkit-text-fill-color:currentColor;background:none}.ac-whale-stage :is(.ac-whale-trail,.ac-whale-head,.ac-whale-rise){display:none}}
@media(forced-colors:active){.ac-shimmer{-webkit-text-fill-color:currentColor;background:none}.ac-whale-stage :is(.ac-whale-water,.ac-whale-glass,.ac-whale-holes,.ac-whale-trail,.ac-whale-head){display:none}.ac-whale-line{stroke:CanvasText}}
`
