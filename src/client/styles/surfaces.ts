export const SURFACES = `/* the workspace: one step deeper than the glass on it, with light sinking in from the top */
.ac-sheet{isolation:isolate;background:radial-gradient(86% 44% at 10% 0%,rgba(111,140,255,.15),transparent 64%),radial-gradient(64% 38% at 94% 0%,rgba(92,196,255,.16),transparent 62%),linear-gradient(180deg,color-mix(in srgb,#e8efff 72%,var(--ac-bg)),color-mix(in srgb,#eef2f9 84%,var(--ac-bg)) 40%,color-mix(in srgb,#eff2f8 82%,var(--ac-bg)));border-color:rgba(255,255,255,.78);border-radius:28px;box-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 44px 90px -40px rgba(64,104,236,.46),0 14px 34px -20px rgba(28,48,120,.2)}
/* living light: slow blue fields that drift and merge like liquid, drawn small and scaled up (fx.tsx) */
.ac-ambient{position:absolute;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;border-radius:inherit;opacity:1;transition:opacity .8s var(--ac-v-out)}
/* a fine grain keeps large gradients from banding */
.ac-sheet::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;border-radius:inherit;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
/* glass edges: white where light lands, a breath of cyan and lilac where it bends */
:is(.ac-composer-settings,.ac-card:not(.ac-card-excluded):not(.picked),.ac-action-dock,.ac-why)::before,:is(.ac-inline:not(.ac-conversation-run .ac-inline),.ac-conversation-run)::after{content:"";position:absolute;inset:0;z-index:4;border-radius:inherit;padding:1px;pointer-events:none;background:var(--ac-g-stroke);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.ac-head,.ac-run-heading,.ac-bar,.ac-inline-head,.ac-conversation-run-head,.ac-shotbar,.ac-shottools,.ac-history-controls,.ac-history-pages{border-color:transparent}
.ac-head,.ac-inline-head{background:transparent}.ac-run-heading{padding-bottom:8px}.ac-history-controls{padding-bottom:2px}.ac-history-pages{padding-top:4px}
.ac-header-caption{border-left-color:color-mix(in srgb,var(--ac-v-brand) 20%,transparent)}.ac-copy-plan{border-top-color:var(--ac-v-edge)}
/* the action bar floats: a capsule of nearly solid glass, readable over a candidate page of any colour */
.ac-action-dock{top:8px;margin:4px 16px 0;border-radius:24px;background:radial-gradient(260px 120px at var(--ac-mx,50%) var(--ac-my,-140%),var(--ac-g-spot),transparent 70%),var(--ac-g-bar);backdrop-filter:blur(16px) saturate(180%);-webkit-backdrop-filter:blur(16px) saturate(180%);box-shadow:var(--ac-v-rim),var(--ac-g-depth),0 0 0 1px rgba(52,84,180,.07),0 1px 2px rgba(28,48,120,.05),0 24px 44px -28px rgba(64,104,236,.62)}
.ac-action-dock::after{content:"";position:absolute;left:1px;right:1px;top:1px;height:52%;border-radius:23px 23px 50% 50%/23px 23px 100% 100%;background:linear-gradient(180deg,rgba(255,255,255,.46),rgba(255,255,255,0));pointer-events:none}
.ac-action-dock>.ac-bar{position:relative;z-index:1;background:transparent;border-radius:inherit;padding:10px 12px 10px 20px}
.ac-inline .ac-action-dock{position:relative;top:0;margin:8px 12px 0}.ac-conversation-run .ac-action-dock{position:sticky;top:6px}
/* glass surfaces in the conversation: light from above, a bright rim instead of hairlines */
.ac-inline,.ac-conversation-run,.ac-composer-settings{position:relative;isolation:isolate;border-color:transparent;border-radius:20px;background:var(--ac-v-glow),var(--ac-v-glass),var(--ac-bg);box-shadow:var(--ac-v-rim),var(--ac-v-shadow)}
.ac-composer-settings{background:radial-gradient(120% 90% at 0% 0%,color-mix(in srgb,#4d6bfe 16%,transparent),transparent 58%),radial-gradient(60% 80% at 100% 0%,color-mix(in srgb,#45b6ff 14%,transparent),transparent 60%),color-mix(in srgb,var(--ac-bg) 80%,transparent);backdrop-filter:blur(18px) saturate(170%);-webkit-backdrop-filter:blur(18px) saturate(170%)}
.ac-composer-settings::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:-1;background:radial-gradient(220px 120px at var(--ac-mx,12%) var(--ac-my,0%),rgba(255,255,255,.55),transparent 70%)}
/* a running comparison: two comets race around the edge at an even speed, whatever the shape, and the frame breathes light */
.ac-run-ring{position:absolute;inset:0;width:100%;height:100%;z-index:5;pointer-events:none;overflow:visible;display:none;filter:drop-shadow(0 0 4px rgba(69,182,255,.9))}
:is(.ac-inline:not(.ac-conversation-run .ac-inline)[data-state=running],.ac-conversation-run:has(.ac-inline[data-state=running]),.ac-sheet .ac-action-dock:has(>.ac-bar.running))>.ac-run-ring{display:block}
.ac-run-ring rect{x:1.5px;y:1.5px;width:calc(100% - 3px);height:calc(100% - 3px);fill:none;stroke-linecap:round}
.ac-run-ring .track{stroke:rgba(77,107,254,.22);stroke-width:1}
.ac-run-ring .t1{stroke-width:3;stroke-dasharray:22 28;opacity:.28}.ac-run-ring .t2{stroke-width:3;stroke-dasharray:12 38;opacity:.6}.ac-run-ring .t3{stroke-width:3.4;stroke-dasharray:6 44}
.ac-run-ring .head{stroke:#fff;stroke-width:4;stroke-dasharray:.8 49.2}
/* Plain offsets and staggered starts: older Chromium (the desktop app's) drops a calc() of custom properties here and the comets freeze. */
.ac-run-ring :is(.t1,.t2,.t3,.head){animation:ac-ring-run 3s linear infinite}
.ac-run-ring .t2{animation-delay:-.3s}.ac-run-ring .t3{animation-delay:-.48s}.ac-run-ring .head{animation-delay:-.636s}
@keyframes ac-ring-run{from{stroke-dashoffset:0}to{stroke-dashoffset:-100}}
@media(prefers-reduced-motion:reduce){.ac-run-ring :is(.t1,.t2,.t3,.head){display:none}.ac-run-ring .track{stroke:rgba(77,107,254,.6);stroke-width:2}}
@media(forced-colors:active){.ac-run-ring{display:none!important}}
:is(.ac-inline:not(.ac-conversation-run .ac-inline)[data-state=running],.ac-conversation-run:has(.ac-inline[data-state=running]),.ac-sheet .ac-action-dock:has(>.ac-bar.running)){animation:ac-v-breathe 2.6s ease-in-out infinite}
@keyframes ac-v-turn{to{--ac-turn:360deg}}
@keyframes ac-v-breathe{50%{box-shadow:var(--ac-v-rim),0 0 0 1px rgba(77,107,254,.18),0 0 0 6px rgba(77,107,254,.07),0 18px 46px -18px rgba(69,182,255,.75)}}
/* versions: thicker glass, one height, and light that follows the pointer */
.ac-grid{align-items:stretch}
.ac-card{position:relative;isolation:isolate;border-color:transparent;border-radius:var(--ac-r-lg);background:radial-gradient(220px 150px at var(--ac-mx,50%) var(--ac-my,-30%),var(--ac-g-spot),transparent 70%),var(--ac-g-card);box-shadow:var(--ac-v-rim),var(--ac-g-depth),var(--ac-v-shadow);transition:box-shadow .3s var(--ac-v-out)}
.ac-card-head{border-bottom-color:transparent;background:linear-gradient(180deg,rgba(255,255,255,.46),rgba(255,255,255,0))}.ac-card-evidence{border-top-color:transparent;margin-top:auto}
.ac-card.picked{box-shadow:var(--ac-v-rim),0 0 0 1.5px color-mix(in srgb,var(--ac-v-brand) 90%,transparent),0 0 0 6px color-mix(in srgb,var(--ac-v-brand) 12%,transparent),0 30px 60px -26px color-mix(in srgb,var(--ac-v-brand) 62%,transparent)}
.ac-card.picked::before{content:"";position:absolute;inset:-1px;z-index:4;border-radius:inherit;padding:2px;pointer-events:none;background:conic-gradient(from var(--ac-turn),transparent 0 60%,#a9e8ff 72%,#fff 76%,#6c88ff 82%,transparent 94%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);animation:ac-v-turn 6s linear infinite}
.ac-card.ac-revealing::after{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;border-radius:inherit;background:linear-gradient(105deg,transparent 28%,rgba(255,255,255,.78) 45%,color-mix(in srgb,#a9e8ff 70%,transparent) 50%,color-mix(in srgb,#8ea4ff 40%,transparent) 54%,transparent 68%);transform:translateX(-110%);animation:ac-v-reveal 1.15s var(--ac-v-expo) forwards}
@keyframes ac-v-reveal{to{transform:translateX(110%)}}
.ac-grid>.ac-card{animation:ac-v-rise .62s var(--ac-v-expo) both}.ac-grid>.ac-card:nth-child(2){animation-delay:60ms}.ac-grid>.ac-card:nth-child(3){animation-delay:120ms}.ac-grid>.ac-card:nth-child(4){animation-delay:180ms}
@keyframes ac-v-rise{from{opacity:0;transform:translateY(14px) scale(.97)}}
.ac-preview-stage,.ac-browser,.ac-shot,.ac-shotwrap{background:linear-gradient(180deg,rgba(214,224,248,.5),rgba(226,234,250,.34))}
.ac-preview-stage{box-shadow:inset 0 7px 10px -9px rgba(28,48,120,.22),inset 0 -7px 10px -9px rgba(28,48,120,.12)}
.ac-preview-surface{border-radius:14px;box-shadow:0 0 0 1px rgba(52,84,180,.08),0 14px 30px -16px rgba(28,48,120,.3)}
.ac-banner,.ac-copy-space,.ac-review{border-color:transparent;border-radius:var(--ac-r-md);background:var(--ac-g-card);box-shadow:var(--ac-v-rim),var(--ac-v-shadow)}
.ac-banner.warn{background:color-mix(in srgb,var(--ac-warn) 9%,var(--ac-bg))}.ac-banner.err{background:color-mix(in srgb,var(--ac-err) 7%,var(--ac-bg))}
.ac-review{box-shadow:var(--ac-v-rim),0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 34%,transparent),0 20px 40px -24px rgba(64,104,236,.42)}
.ac-hrow{position:relative;border-color:transparent;border-radius:18px;background:radial-gradient(180px 90px at var(--ac-mx,0%) var(--ac-my,0%),var(--ac-g-spot),transparent 70%),var(--ac-g-card);box-shadow:var(--ac-v-rim),0 0 0 1px rgba(52,84,180,.07),0 12px 26px -20px rgba(64,104,236,.5);transition:transform .24s var(--ac-v-spring),box-shadow .24s var(--ac-v-out)}
.ac-hrow:not(.legacy):hover{transform:translateY(-2px);background:radial-gradient(180px 90px at var(--ac-mx,0%) var(--ac-my,0%),rgba(255,255,255,.85),transparent 70%),linear-gradient(180deg,rgba(255,255,255,.8),rgba(255,255,255,.95));box-shadow:var(--ac-v-rim),var(--ac-v-lift)}
.ac-hrow:not(.legacy):active{transform:scale(.99)}
.ac-history>.ac-hrow{animation:ac-v-rise .46s var(--ac-v-expo) both}.ac-history>.ac-hrow:nth-of-type(2){animation-delay:40ms}.ac-history>.ac-hrow:nth-of-type(3){animation-delay:80ms}.ac-history>.ac-hrow:nth-of-type(4){animation-delay:120ms}.ac-history>.ac-hrow:nth-of-type(5){animation-delay:160ms}
/* the mark and the version letters: beads of blue gel */
.ac-logo{position:relative;color:#fff;border-radius:10px;background:var(--ac-g-gloss),linear-gradient(140deg,#4866fa,#3f6af4 52%,#316de7);box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -5px 7px -5px rgba(150,225,255,.7),0 8px 16px -8px rgba(72,102,250,.8)}
.ac-label{position:relative;overflow:hidden;color:#fff;border-radius:9px;background:#4866fa linear-gradient(135deg,#4866fa,#3f6af4);box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -4px 6px -4px rgba(150,225,255,.6),0 5px 12px -6px rgba(72,102,250,.8)}
.ac-label::after{content:"";position:absolute;left:0;right:0;top:0;height:5px;background:linear-gradient(180deg,rgba(255,255,255,.3),rgba(255,255,255,0));pointer-events:none}
[data-label=B] .ac-label{background:#1a6fd8 linear-gradient(135deg,#1a6fd8,#1665cc)}[data-label=C] .ac-label{background:#2340b8 linear-gradient(135deg,#2c4bd0,#2340b8)}[data-label=D] .ac-label{background:#0a6aa8 linear-gradient(135deg,#0d74b5,#0a6aa8)}
/* controls: pale blue glass with blue words; one bright bead for the main action */
.ac-btn{border-radius:999px;border-color:transparent;background:linear-gradient(180deg,color-mix(in srgb,var(--ac-v-brand) 4%,var(--ac-bg)),color-mix(in srgb,var(--ac-v-brand) 10%,var(--ac-bg)));color:var(--ac-v-ink);font-weight:500;box-shadow:inset 0 1px 0 rgba(255,255,255,.95),inset 0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 13%,transparent),0 6px 14px -10px rgba(64,104,236,.6);transition:transform .16s var(--ac-v-spring),background .16s,box-shadow .2s}
.ac-btn:hover:not(:disabled){background:linear-gradient(180deg,color-mix(in srgb,var(--ac-v-brand) 7%,var(--ac-bg)),color-mix(in srgb,var(--ac-v-brand) 12%,var(--ac-bg)))}
.ac-btn:active:not(:disabled){transform:scale(.97)}
.ac-btn.primary{position:relative;isolation:isolate;overflow:hidden;background:var(--ac-p-bg);color:#fff;font-weight:600;box-shadow:var(--ac-p-shadow)}
.ac-btn.primary::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.34) 48%,transparent 62%);transform:translateX(-120%);transition:transform .7s var(--ac-v-expo)}
.ac-btn.primary::after{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(90px 46px at var(--ac-mx,50%) var(--ac-my,0%),rgba(255,255,255,.32),transparent 70%);opacity:0;transition:opacity .2s}
.ac-btn.primary:hover:not(:disabled){background:var(--ac-p-bg);filter:none;box-shadow:var(--ac-p-shadow-hover)}
.ac-btn.primary:hover:not(:disabled)::before{transform:translateX(120%)}.ac-btn.primary:hover:not(:disabled)::after{opacity:1}
.ac-btn.sm.primary,.ac-btn.sm.primary:hover:not(:disabled){box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -4px 5px -4px rgba(150,225,255,.6),0 8px 16px -10px rgba(72,102,250,.75)}
.ac-btn.danger,.ac-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--ac-err) 7%,var(--ac-bg));color:var(--ac-err);box-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 0 0 1px color-mix(in srgb,var(--ac-err) 16%,transparent)}
.ac-btn.danger:hover:not(:disabled){background:color-mix(in srgb,var(--ac-err) 11%,var(--ac-bg))}
.ac-text-btn{color:var(--ac-v-ink);font-weight:500;border-radius:8px}.ac-text-btn:hover{background:var(--ac-v-tint-2)}.ac-link{color:var(--ac-v-ink)}
.ac-run-heading>.ac-text-btn{padding:4px 12px 4px 10px;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.92),rgba(255,255,255,.72));box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(255,255,255,.7),0 6px 14px -9px rgba(64,104,236,.6)}.ac-run-heading>.ac-text-btn:hover{background:#fff}
.ac-icon-btn{border-radius:999px}.ac-icon-btn:hover{background:rgba(255,255,255,.75);color:var(--ac-v-ink);box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(255,255,255,.8),0 6px 12px -8px rgba(64,104,236,.6)}
.ac-chip{border-color:transparent;background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(255,255,255,.72));color:var(--ac-fg);box-shadow:inset 0 1px 0 #fff,inset 0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 12%,transparent),0 5px 10px -8px rgba(64,104,236,.55);transition:transform .16s var(--ac-v-spring),background .16s,color .16s}
.ac-chip:hover:not(:disabled):not(.on){background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--ac-v-brand) 8%,var(--ac-bg)));color:var(--ac-fg)}.ac-chip.on:hover:not(:disabled){filter:brightness(1.05)}.ac-chip:active:not(:disabled){transform:scale(.96)}.ac-chip:disabled{opacity:.55;cursor:default}
.ac-root .ac-chip.on,.ac-root .ac-pill.ac-picked,.ac-style-badge,.ac-guide-steps li:before{background:var(--ac-p-bg);color:#fff;font-weight:600;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 6px 14px -8px rgba(72,102,250,.8)}
.ac-chip.on{animation:ac-v-pop .36s var(--ac-v-spring)}
/* segmented controls: a groove in the glass, and a lens that slides to the choice */
.ac-seg{position:relative;isolation:isolate;background:linear-gradient(180deg,color-mix(in srgb,var(--ac-v-brand) 9%,transparent),color-mix(in srgb,var(--ac-v-brand) 4%,transparent)),rgba(255,255,255,.4);border-radius:999px;padding:3px;box-shadow:inset 0 1px 2px rgba(28,48,120,.13),inset 0 -1px 0 rgba(255,255,255,.9),0 0 0 1px rgba(255,255,255,.7)}
.ac-seg button{position:relative;z-index:1;border-radius:999px;color:var(--ac-fg2);font-weight:400;transition:color .22s var(--ac-v-out),transform .2s var(--ac-v-spring)}
/* a hidden bold copy of the label holds the width, so choosing an option never shifts its neighbours */
.ac-seg button,.ac-tab{display:inline-flex;flex-direction:column;align-items:center;justify-content:center}
.ac-seg button::after,.ac-tab::after{content:attr(data-text);height:0;overflow:hidden;visibility:hidden;font-weight:600;pointer-events:none}
.ac-seg button:hover:not(:disabled):not(.on){color:var(--ac-fg)}.ac-seg button:active:not(:disabled){transform:scale(.96)}
.ac-seg button.on{background:var(--ac-g-lens);color:var(--ac-v-ink);font-weight:600;box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(255,255,255,.85),0 1px 2px rgba(28,48,120,.08),0 7px 14px -7px rgba(64,104,236,.55)}
.ac-seg.ac-lensed button.on{background:transparent;box-shadow:none}
.ac-seg::before{content:"";position:absolute;z-index:0;left:0;top:0;width:var(--ac-lens-w,0);height:var(--ac-lens-h,0);transform:translate(var(--ac-lens-x,0),var(--ac-lens-y,0));border-radius:999px;opacity:0;pointer-events:none;background:var(--ac-g-lens);box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 color-mix(in srgb,var(--ac-v-brand) 10%,transparent),var(--ac-v-fringe),0 0 0 1px rgba(255,255,255,.85),0 1px 2px rgba(28,48,120,.08),0 7px 14px -7px rgba(64,104,236,.65);transition:transform .46s var(--ac-v-spring),width .46s var(--ac-v-spring),height .3s var(--ac-v-out),opacity .2s}
.ac-seg.ac-lensed::before{opacity:1}.ac-seg.ac-lens-snap::before{transition:none}.ac-seg:has(>button:disabled)::before{opacity:.6}
@keyframes ac-v-pop{0%{transform:scale(.94)}60%{transform:scale(1.04)}}
.ac-tab{border-radius:999px;color:var(--ac-fg2);transition:background .16s,color .16s}.ac-tab:hover:not(.on){background:rgba(255,255,255,.5);color:var(--ac-fg)}
.ac-tab.on{background:var(--ac-g-lens);color:var(--ac-v-ink);font-weight:600;box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(255,255,255,.85),0 1px 2px rgba(28,48,120,.08),0 7px 14px -7px rgba(64,104,236,.55)}
/* fields: nearly solid glass; selects share one chevron */
.ac-root select{appearance:none;-webkit-appearance:none;padding-right:26px;cursor:pointer;border-color:transparent;border-radius:10px;background:linear-gradient(45deg,transparent 44%,var(--ac-fg2) 56%) calc(100% - 13.5px) 54%/4.5px 4.5px no-repeat,linear-gradient(135deg,var(--ac-fg2) 44%,transparent 56%) calc(100% - 9px) 54%/4.5px 4.5px no-repeat,var(--ac-g-field);box-shadow:inset 0 1px 0 #fff,0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 14%,transparent),0 4px 9px -7px rgba(64,104,236,.6);transition:box-shadow .16s}
.ac-root select:hover:not(:disabled){box-shadow:inset 0 1px 0 #fff,0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 30%,transparent),0 6px 12px -7px rgba(64,104,236,.7)}
.ac-root select:disabled{opacity:.6;cursor:default}
.ac-history-controls input{border-color:transparent;border-radius:10px;background:var(--ac-g-field);box-shadow:inset 0 1px 0 #fff,0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 14%,transparent)}
/* a switch: a groove in the glass and the brightest bead in it */
.ac-history-issue-filter{gap:10px;cursor:pointer;color:var(--ac-fg)}
.ac-history-issue-filter input{appearance:none;-webkit-appearance:none;position:relative;flex:none;width:38px;height:22px;margin:0;border-radius:999px;cursor:pointer;background:linear-gradient(180deg,rgba(28,48,120,.13),rgba(28,48,120,.05));box-shadow:inset 0 1px 2px rgba(28,48,120,.2),inset 0 0 0 1px var(--ac-v-ring);transition:background .25s var(--ac-v-out),box-shadow .25s var(--ac-v-out)}
.ac-history-issue-filter input::before{content:"";position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:999px;background:linear-gradient(180deg,#fff,#eef3ff);box-shadow:inset 0 1px 0 #fff,0 0 0 1px rgba(59,90,242,.5),0 3px 7px -2px rgba(64,104,236,.6);transition:transform .36s var(--ac-v-spring),width .18s var(--ac-v-out)}
.ac-history-issue-filter input:checked{background:var(--ac-v-grad);box-shadow:inset 0 1px 2px rgba(20,40,140,.3),inset 0 -6px 8px -6px rgba(150,225,255,.75),0 6px 12px -8px rgba(72,102,250,.85)}
.ac-history-issue-filter input:checked::before{transform:translateX(16px);box-shadow:inset 0 1px 0 #fff,var(--ac-v-fringe),0 3px 7px -2px rgba(20,40,140,.5)}
.ac-history-issue-filter input:active:not(:disabled)::before{width:20px}.ac-history-issue-filter input:checked:active:not(:disabled)::before{transform:translateX(12px)}
/* ticks */
.ac-context-picker input,.ac-row>input[type=checkbox]{appearance:none;-webkit-appearance:none;display:inline-grid;place-content:center;flex:none;width:18px;height:18px;margin:1px 0 0;border-radius:6px;cursor:pointer;background:var(--ac-g-field);box-shadow:inset 0 1px 0 #fff,inset 0 0 0 1px var(--ac-v-ring),0 3px 6px -4px rgba(64,104,236,.55);transition:background .16s,box-shadow .16s,transform .16s var(--ac-v-spring)}
.ac-context-picker input::before,.ac-row>input[type=checkbox]::before{content:"";width:10px;height:6px;margin-top:-2px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(-45deg) scale(0);transition:transform .24s var(--ac-v-spring)}
.ac-context-picker input:checked,.ac-row>input[type=checkbox]:checked{background:var(--ac-v-grad);box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 4px 8px -4px rgba(72,102,250,.85)}
.ac-context-picker input:checked::before,.ac-row>input[type=checkbox]:checked::before{transform:rotate(-45deg) scale(1)}
.ac-context-picker input:active,.ac-row>input[type=checkbox]:active{transform:scale(.9)}
/* the mode button lives in the host's composer, outside the plugin root, so it carries its own colours */
.ac-mode-btn{border-radius:999px;transition:transform .2s var(--ac-v-spring),box-shadow .2s}
.ac-mode-btn.on{position:relative;background:linear-gradient(180deg,rgba(255,255,255,.26) 0,rgba(255,255,255,0) 5px),#4866fa linear-gradient(120deg,#4866fa 0%,#3f6af4 52%,#316de7 100%);color:#fff;border-color:transparent;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),0 0 0 3px rgba(77,107,254,.16),0 6px 16px -8px rgba(72,102,250,.85);animation:ac-v-pop .38s var(--ac-v-spring)}
/* status: work in progress is warm, done is calm, live progress flows like liquid */
.ac-pill{border-radius:999px}
.ac-pill.brand{background:color-mix(in srgb,var(--ac-v-doing) 12%,var(--ac-bg));color:var(--ac-fg);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ac-v-doing) 60%,transparent)}
.ac-pill.brand .ac-dot,.ac-pill.brand .ac-spin{color:#c46f00}
.ac-pill.ok{box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ac-ok) 26%,transparent)}
.ac-pill.ac-picked{flex:none}
.ac-track{gap:5px}.ac-track i{height:6px;border-radius:999px;background:color-mix(in srgb,var(--ac-v-brand) 10%,var(--ac-l2));box-shadow:inset 0 1px 1px rgba(28,48,120,.08)}
.ac-track i.done{background:linear-gradient(90deg,#4d6bfe,#45b6ff)}
.ac-track i.now{position:relative;overflow:hidden;background:var(--ac-v-flow);background-size:300% 100%;animation:ac-v-flow 2.6s linear infinite;box-shadow:0 0 10px -2px rgba(69,182,255,.8)}
.ac-track i.now::after{content:"";position:absolute;top:0;bottom:0;width:30%;border-radius:999px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent);transform:translateX(-120%);animation:ac-v-drop 1.7s var(--ac-v-out) infinite}
@keyframes ac-v-flow{to{background-position:-300% 0}}@keyframes ac-v-drop{to{transform:translateX(380%)}}
.ac-skel i{background:linear-gradient(90deg,var(--ac-v-tint),var(--ac-v-tint-2),var(--ac-v-tint));background-size:200% 100%;animation:ac-v-shimmer 1.4s linear infinite}
@keyframes ac-v-shimmer{to{background-position:-200% 0}}
.ac-check{border-color:transparent;border-radius:999px;background:var(--ac-l1);box-shadow:inset 0 1px 0 rgba(255,255,255,.7)}.ac-check.passed{background:color-mix(in srgb,var(--ac-ok) 10%,var(--ac-bg))}.ac-check.failed,.ac-check.timeout{background:color-mix(in srgb,var(--ac-err) 9%,var(--ac-bg))}
.ac-fail{border-radius:var(--ac-r-md)}.ac-salvage{border-color:var(--ac-v-edge);border-radius:12px}
.ac-guide-steps li:before{border-radius:10px;font-weight:700}
.ac-case{border:0;border-radius:20px;background:var(--ac-v-glow),var(--ac-v-tint);box-shadow:var(--ac-v-rim),var(--ac-v-shadow)}
:is(.ac-btn,.ac-chip,.ac-icon-btn,.ac-tab,.ac-seg button,.ac-text-btn,.ac-mode-btn):focus-visible{outline:2px solid var(--ac-v-brand,#4d6bfe);outline-offset:2px;box-shadow:0 0 0 5px color-mix(in srgb,var(--ac-v-brand,#4d6bfe) 18%,transparent)}
.ac-history-issue-filter input:focus-visible,.ac-context-picker input:focus-visible,.ac-row>input[type=checkbox]:focus-visible{outline:2px solid var(--ac-v-ink);outline-offset:3px}
/* how a comparison is tied to the main conversation */
.ac-link-strip{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin:12px 20px 0;font-size:12px;color:var(--ac-fg2)}
.ac-inline .ac-link-strip{margin:10px 12px 0}
.ac-link-item{display:inline-flex;flex-wrap:wrap;align-items:center;gap:6px;max-width:100%}.ac-link-item>summary{cursor:pointer;display:inline-flex;align-items:center;gap:6px}.ac-link-item.ok{color:var(--ac-fg)}
.ac-link-dot{width:8px;height:8px;border-radius:50%;background:var(--ac-l2);flex:none}.ac-link-dot.in{background:var(--ac-v-brand)}.ac-link-dot.ok{background:var(--ac-ok);box-shadow:0 0 0 3px color-mix(in srgb,var(--ac-ok) 18%,transparent)}.ac-link-dot.wait{background:var(--ac-v-doing);animation:ac-pulse 1.6s ease-in-out infinite}
.ac-context-text{max-height:220px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0 0;padding:10px 12px;border-radius:12px;background:var(--ac-v-tint);font:12px/1.6 var(--dsw-font-family,inherit);color:var(--ac-fg)}
/* main-conversation context in the settings */
.ac-context{display:flex;flex-direction:column;gap:6px}
.ac-context-label{font-size:12px;font-weight:600;color:var(--ac-fg)}
.ac-context .ac-seg button{font-size:12px;height:28px;padding:0 12px}
.ac-context-summary{font-size:12px;color:var(--ac-fg2)}.ac-context-summary>details,.ac-context-reserved{margin-top:4px}.ac-context-reserved{visibility:hidden;font-weight:600}.ac-context-summary summary{cursor:pointer;color:var(--ac-v-ink);font-weight:600}
.ac-context-picker{border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(255,255,255,.3));box-shadow:inset 0 1px 2px rgba(28,48,120,.1),0 0 0 1px rgba(255,255,255,.7);padding:8px 10px;max-height:260px;overflow:auto}
.ac-context-picker ul{list-style:none;margin:6px 0 0;padding:0;display:flex;flex-direction:column;gap:4px}
.ac-context-picker li label{display:flex;align-items:flex-start;gap:8px;padding:7px 8px;border-radius:10px;cursor:pointer;transition:background .16s}
.ac-context-picker li label:hover{background:rgba(255,255,255,.7)}.ac-context-picker li.on label{background:rgba(255,255,255,.9);box-shadow:0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 30%,transparent),0 6px 12px -10px rgba(64,104,236,.7)}
.ac-context-role{flex:none;font-size:11px;font-weight:700;padding:1px 7px;border-radius:999px;background:var(--ac-l2);color:var(--ac-fg)}
.ac-context-role.user{background:color-mix(in srgb,var(--ac-v-brand) 14%,var(--ac-bg))}.ac-context-role.note{background:color-mix(in srgb,var(--ac-v-accent) 55%,var(--ac-bg))}.ac-context-role.assistant{background:color-mix(in srgb,var(--ac-v-sky) 16%,var(--ac-bg))}
.ac-context-preview{flex:1;min-width:0;font-size:12px;line-height:1.5;color:var(--ac-fg);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
.ac-rerun{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap}
.ac-result{display:flex;flex-direction:column;gap:8px;padding:12px 14px;min-height:150px;max-height:560px;flex:1}
/* a result read as content sizes to what it holds; cards in a row still share one height */
.ac-card:has(>.ac-result){min-height:0}
.ac-result-head{display:flex;align-items:center;gap:6px 10px;flex-wrap:wrap}
.ac-result-head>.ac-copy{margin-left:auto}
.ac-grid:has(.ac-result){align-items:stretch}
.ac-answer{flex:1;overflow:auto;overflow-wrap:anywhere;font-size:14px;line-height:1.7;color:var(--ac-fg);background:var(--ac-v-tint);border-radius:14px;padding:12px 16px}
.ac-md>:first-child{margin-top:0}.ac-md>:last-child{margin-bottom:0}
.ac-md p{margin:0 0 .7em}
.ac-md :is(h3,h4,h5,h6){margin:1em 0 .4em;line-height:1.35;color:var(--ac-fg);font-weight:700}
.ac-md h3{font-size:16px}.ac-md h4{font-size:15px}.ac-md :is(h5,h6){font-size:14px}
.ac-md :is(ul,ol){margin:0 0 .7em;padding-left:1.4em}.ac-md li{margin:.2em 0}.ac-md li>p{margin:0}.ac-md li>:is(ul,ol){margin:.2em 0 0}
.ac-md li::marker{color:var(--ac-v-ink)}
.ac-md code{font:12.5px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:color-mix(in srgb,var(--ac-fg) 8%,transparent);border-radius:5px;padding:1px 5px}
.ac-md blockquote{margin:0 0 .7em;padding:2px 0 2px 12px;border-left:3px solid color-mix(in srgb,var(--ac-v-brand) 45%,transparent);color:var(--ac-fg2)}
.ac-md hr{border:0;border-top:1px solid color-mix(in srgb,var(--ac-fg) 14%,transparent);margin:1em 0}
.ac-md a{color:var(--ac-v-ink);text-decoration:underline;text-underline-offset:2px}
.ac-md-code{margin:0 0 .8em;border-radius:12px;overflow:hidden;background:var(--ac-bg);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ac-fg) 12%,transparent)}
.ac-md-code-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:2px 4px 2px 12px;font-size:11.5px;color:var(--ac-fg2);border-bottom:1px solid color-mix(in srgb,var(--ac-fg) 10%,transparent)}
.ac-md-code pre{margin:0;padding:10px 12px;overflow:auto;white-space:pre;font:12.5px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.ac-md-code pre code{background:none;padding:0;border-radius:0}
.ac-md-table{overflow:auto;margin:0 0 .8em;border-radius:10px;background:var(--ac-bg);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ac-fg) 12%,transparent)}
.ac-md table{border-collapse:collapse;width:100%;font-size:13px;line-height:1.5}
.ac-md :is(th,td){padding:6px 10px;border-bottom:1px solid color-mix(in srgb,var(--ac-fg) 10%,transparent);text-align:left;vertical-align:top}
.ac-md th{font-weight:600;background:color-mix(in srgb,var(--ac-v-brand) 7%,var(--ac-bg))}.ac-md tr:last-child td{border-bottom:0}
.ac-md-table:focus-visible,.ac-md-code pre:focus-visible,.ac-answer:focus-visible{outline:2px solid var(--ac-v-brand);outline-offset:2px}
.ac-copy.done{color:var(--ac-ok)}
.ac-style-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}
.ac-style-row-label{font-size:12px;color:var(--ac-fg2);font-weight:600;margin-right:2px}
.ac-style-slot{display:inline-flex;align-items:center;gap:4px;padding:2px;border-radius:999px;background:var(--ac-v-tint);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 10%,transparent)}
.ac-style-slot select,.ac-style-note{height:28px;border:0;border-radius:999px;color:var(--ac-fg);font:inherit;font-size:12px;padding:0 10px}.ac-style-slot select{padding-right:26px}.ac-style-note,.ac-why-note{background:var(--ac-g-field);box-shadow:inset 0 1px 0 #fff,0 0 0 1px color-mix(in srgb,var(--ac-v-brand) 14%,transparent)}
.ac-style-slot select:focus-visible,.ac-style-note:focus-visible{outline:2px solid var(--ac-v-brand);outline-offset:1px}
.ac-style-note{min-width:180px;max-width:min(320px,70vw)}
.ac-style-badge{display:inline-flex;align-items:center;justify-content:center;flex:none;width:22px;height:22px;border-radius:999px;font-size:11px}
.ac-composer-settings .ac-models{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}
.ac-composer-settings .ac-models label{display:inline-flex;flex-direction:row;align-items:center;gap:4px;padding:2px;border-radius:999px;background:var(--ac-v-tint)}
.ac-composer-settings .ac-models select{width:auto;min-width:150px;max-width:240px;height:28px;border-radius:999px;font-size:12px}
.ac-settings-facts{display:flex;flex-wrap:wrap;align-items:baseline;gap:2px 14px}
.ac-usage-hint{color:var(--ac-warn);font-weight:600}
.ac-style-habit{color:var(--ac-v-ink);font-weight:600}
.ac-exclude{font-size:12px}
.ac-grid.count-1{grid-template-columns:minmax(0,1fr)}
.ac-sheet .ac-grid.count-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.ac-grid>.ac-card-excluded{grid-column:1/-1;order:9;min-height:0;padding:8px 12px;opacity:.9;animation:none}
.ac-card-excluded .ac-label{width:22px;height:22px;font-size:12px}
@media(max-width:900px){.ac-sheet .ac-grid.count-3{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}}
@media(max-width:600px){.ac-sheet .ac-grid.count-3,.ac-grid.count-4{grid-template-columns:minmax(0,1fr)}.ac-style-note{min-width:0;flex:1}}
.ac-path-chip{display:block;width:fit-content;max-width:100%;margin:4px 0;padding:3px 8px;border-radius:8px;background:var(--ac-v-tint);font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ac-fg);overflow-wrap:anywhere}
.ac-files{display:grid;grid-template-columns:minmax(120px,34%) 1fr;gap:10px;min-height:0;flex:1}
.ac-file-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px;overflow:auto;max-height:420px}
.ac-file{all:unset;box-sizing:border-box;display:block;width:100%;padding:6px 9px;border-radius:9px;font:12px/1.4 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ac-fg);cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ac-file:hover{background:var(--ac-v-tint)}.ac-file.on{background:var(--ac-v-tint);box-shadow:inset 3px 0 0 var(--ac-v-brand);color:var(--ac-v-ink);font-weight:600}
.ac-file:focus-visible{outline:2px solid var(--ac-v-brand);outline-offset:1px}
.ac-file-view{min-width:0;overflow:auto;max-height:420px}
.ac-file-text{margin:0;white-space:pre;overflow:auto;font:12px/1.55 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--ac-v-tint);border-radius:12px;padding:10px 12px;color:var(--ac-fg)}
.ac-project-notes{display:flex;flex-direction:column;gap:6px}
.ac-info{margin:0;font-size:12.5px;line-height:1.55;color:var(--ac-fg);background:color-mix(in srgb,var(--ac-v-brand) 8%,var(--ac-bg));border-radius:12px;padding:8px 12px}
.ac-enable-git{display:flex;flex-wrap:wrap;align-items:center;gap:2px 8px;font-size:12.5px;color:var(--ac-fg2);padding:0 4px}
.ac-enable-git>.ac-text-btn{flex:none;font-size:12.5px}
.ac-enable-git>p{flex-basis:100%}
.ac-enable-git.confirm{flex-direction:column;align-items:stretch;gap:8px;padding:10px 12px;border-radius:12px;background:var(--ac-v-tint)}
.ac-enable-git p{margin:0;color:var(--ac-fg);line-height:1.55}
@media(max-width:600px){.ac-files{grid-template-columns:1fr}.ac-file-list{max-height:140px}}
/* an HTML file is shown as a page, its source one click away */
.ac-files:has(.ac-file-page){grid-template-columns:minmax(96px,24%) 1fr}
.ac-file-view:has(.ac-file-page){max-height:none;overflow:visible}
.ac-file-mode{display:inline-flex;gap:2px;margin:0 0 6px;padding:2px;border-radius:999px;background:var(--ac-v-tint)}
.ac-file-mode button{height:24px;padding:0 10px;border:0;border-radius:999px;background:transparent;color:var(--ac-fg2);font:inherit;font-size:12px;cursor:pointer}
.ac-file-mode button.on{background:var(--ac-bg);color:var(--ac-v-ink);font-weight:600;box-shadow:0 1px 3px rgba(28,48,120,.18)}
.ac-file-page{display:block;width:100%;height:420px;border:0;border-radius:12px;background:#fff;box-shadow:0 0 0 1px rgba(52,84,180,.12)}
.ac-combos{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px}
.ac-combo{display:inline-flex;align-items:baseline;gap:5px}.ac-combo small{font-size:11px;font-weight:500;color:var(--ac-fg2)}.ac-combo.on small{color:#fff}
.ac-empty{gap:14px}
/* the pick lands: a ring and sparks of light */
.ac-burst{position:absolute;width:0;height:0;z-index:40;pointer-events:none}
.ac-burst i{position:absolute;left:0;top:0;border-radius:50%;box-shadow:0 0 8px rgba(69,182,255,.9)}
.ac-burst b{position:absolute;left:0;top:0;width:46px;height:46px;border-radius:50%;border:2px solid #45b6ff;box-shadow:0 0 18px rgba(69,182,255,.8),inset 0 0 12px rgba(169,232,255,.6)}
/* why the pick won */
.ac-why{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:12px 20px 0;padding:10px 14px;border-radius:20px;background:radial-gradient(260px 120px at var(--ac-mx,50%) var(--ac-my,-140%),var(--ac-g-spot),transparent 70%),var(--ac-g-panel);box-shadow:var(--ac-v-rim),var(--ac-v-shadow)}
.ac-inline .ac-why{margin:10px 12px 0}
.ac-why-q{font-weight:700;font-size:13px;color:var(--ac-fg)}
.ac-why-chips{display:flex;flex-wrap:wrap;align-items:center;gap:6px;min-width:0}
.ac-why-note{height:28px;min-width:200px;max-width:min(320px,100%);border:0;border-radius:999px;padding:0 12px;color:var(--ac-fg);font:inherit;font-size:12px}
.ac-why-note:focus-visible{outline:2px solid var(--ac-v-brand);outline-offset:1px}
.ac-hrow-why{color:var(--ac-v-ink);font-weight:600}.ac-why>.ac-meta{flex-basis:100%}.ac-why.said>.ac-meta{color:var(--ac-v-ink)}
@media(max-width:600px){.ac-why{margin:10px 12px 0}.ac-why-note{min-width:0;flex:1 1 160px}.ac-why-link{display:none}}
@media(max-width:600px){.ac-sheet{border-radius:22px 22px 0 0}.ac-action-dock{margin:4px 10px 0;border-radius:20px}.ac-action-dock>.ac-bar{padding:10px 12px}}
`
