export const TOKENS = `
@property --ac-turn{syntax:'<angle>';inherits:false;initial-value:0deg}
.ac-root{--ac-v-brand:#4d6bfe;--ac-v-brand-2:#6c88ff;--ac-v-sky:#45b6ff;--ac-v-ice:#a9e8ff;--ac-v-ink:#3b5af2;--ac-v-fill:#4866fa;--ac-v-soft:#eef3ff;--ac-v-accent:#a9e8ff;--ac-v-doing:#ffa51f;--ac-v-ring:#7d90f8;--ac-brand:var(--ac-v-brand);
--ac-fg:color-mix(in srgb,var(--dsw-alias-label-primary,#0f1115) 82%,#4d6bfe);--ac-fg2:color-mix(in srgb,var(--dsw-alias-label-secondary,#4b5260) 86%,#4d6bfe);--ac-fg3:color-mix(in srgb,var(--dsw-alias-label-secondary,#596475) 84%,#141c3d);
--ac-v-tint:color-mix(in srgb,var(--ac-v-brand) 6%,var(--ac-bg));--ac-v-tint-2:color-mix(in srgb,var(--ac-v-brand) 10%,var(--ac-bg));--ac-v-edge:color-mix(in srgb,var(--ac-v-brand) 11%,transparent);
--ac-v-grad:linear-gradient(120deg,#4866fa 0%,#3f6af4 52%,#316de7 100%);
--ac-v-flow:linear-gradient(90deg,#4d6bfe,#45b6ff,#8ea4ff,#4d6bfe);
--ac-g-panel:linear-gradient(180deg,rgba(255,255,255,.64),rgba(255,255,255,.46));
--ac-g-bar:linear-gradient(180deg,rgba(255,255,255,.97),rgba(255,255,255,.93));
--ac-g-card:linear-gradient(180deg,rgba(255,255,255,.78),rgba(255,255,255,.93) 62%);
--ac-g-field:linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.72));
--ac-g-lens:linear-gradient(180deg,#fff,rgba(255,255,255,.8));
--ac-g-stroke:linear-gradient(170deg,#fff 0%,rgba(255,255,255,.55) 30%,rgba(169,232,255,.8) 54%,rgba(255,255,255,.4) 74%,rgba(201,189,255,.75) 100%);
--ac-g-gloss:linear-gradient(180deg,rgba(255,255,255,.26) 0,rgba(255,255,255,0) 5px);--ac-g-depth:inset 0 -14px 18px -16px rgba(96,140,255,.36);
--ac-g-spot:rgba(255,255,255,.7);--ac-g-dust:.8;
--ac-v-glass:var(--ac-g-card);
--ac-v-rim:inset 0 1px 0 rgba(255,255,255,.96),inset 0 0 0 1px rgba(255,255,255,.5);
--ac-v-fringe:inset 1px 0 0 rgba(169,232,255,.75),inset -1px 0 0 rgba(201,189,255,.65);
--ac-v-shadow:0 0 0 1px rgba(52,84,180,.07),0 1px 2px rgba(28,48,120,.05),0 20px 40px -24px rgba(64,104,236,.42);
--ac-v-lift:0 0 0 1px rgba(52,84,180,.1),0 2px 4px rgba(28,48,120,.06),0 28px 54px -26px rgba(64,104,236,.55);
--ac-v-glow:radial-gradient(110% 70% at 6% 0%,rgba(110,140,255,.15),transparent 62%),radial-gradient(70% 55% at 100% 0%,rgba(80,190,255,.14),transparent 58%);
--ac-p-bg:var(--ac-g-gloss),var(--ac-v-grad),var(--ac-v-fill);
--ac-p-shadow:inset 0 1px 0 rgba(255,255,255,.6),inset 0 -7px 9px -7px rgba(150,225,255,.7),0 10px 22px -11px rgba(72,102,250,.75),0 2px 5px -2px rgba(50,110,232,.35);
--ac-p-shadow-hover:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -8px 10px -7px rgba(150,225,255,.85),0 14px 26px -11px rgba(72,102,250,.85),0 2px 6px -2px rgba(50,110,232,.4);
--ac-v-spring:cubic-bezier(.34,1.56,.64,1);--ac-v-out:cubic-bezier(.22,1,.36,1);--ac-v-expo:cubic-bezier(.16,1,.3,1);--ac-r-lg:22px;--ac-r-md:16px;--ac-r-sm:12px}
.ac-root ::selection{background:color-mix(in srgb,var(--ac-v-brand) 22%,transparent)}
.ac-root,.ac-root *{scrollbar-width:thin;scrollbar-color:color-mix(in srgb,var(--ac-v-brand) 28%,transparent) transparent}
`

export const UI_TOKENS = `
.ac-root {
  --ac-glass-thin:rgba(255,255,255,.44);
  --ac-glass-mid:rgba(255,255,255,.60);
  --ac-glass-thick:rgba(250,251,255,.96);
  --ac-glass-solid:#f8faff;
  --ac-glass-edge:rgba(54,78,137,.16);
  --ac-reading-ink:#23344f;
  --ac-reading-soft:#485970;
  --ac-thick-shadow:inset 0 1px 0 rgba(255,255,255,.9),0 0 0 1px var(--ac-glass-edge),0 8px 22px -16px rgba(37,54,99,.30);
  --ac-ver-a:#3b5af2; --ac-ver-b:#1670cc; --ac-ver-c:#6a54f0; --ac-ver-d:#0b7d99;
  --ac-ver-on:#fff;
  --ac-d-press:120ms; --ac-d-small:220ms; --ac-d-panel:360ms; --ac-d-ceremony:620ms; --ac-stagger:40ms;
  --ac-num:750 28px/1 ui-sans-serif,system-ui,sans-serif;
}
.ac-root [data-label="A"] { --ac-version:var(--ac-ver-a) }
.ac-root [data-label="B"] { --ac-version:var(--ac-ver-b) }
.ac-root [data-label="C"] { --ac-version:var(--ac-ver-c) }
.ac-root [data-label="D"] { --ac-version:var(--ac-ver-d) }
@media(prefers-color-scheme:dark) {
  .ac-root {
    --ac-glass-thin:rgba(20,28,56,.65); --ac-glass-mid:rgba(24,36,65,.83);
    --ac-glass-thick:rgba(18,24,46,.96); --ac-glass-solid:#131c32;
    --ac-glass-edge:rgba(166,191,255,.22); --ac-reading-ink:#e6efff; --ac-reading-soft:#b6c5de;
    --ac-ver-a:#99aeff; --ac-ver-b:#74bdff; --ac-ver-c:#b9a6ff; --ac-ver-d:#69d3e0; --ac-ver-on:#101b32;
    --ac-thick-shadow:inset 0 1px 0 rgba(205,220,255,.1),0 0 0 1px var(--ac-glass-edge),0 8px 22px -16px #050b18;
  }
}
@media(prefers-reduced-transparency:reduce) {
  .ac-root { --ac-glass-thin:var(--ac-glass-solid); --ac-glass-mid:var(--ac-glass-solid); --ac-glass-thick:var(--ac-glass-solid) }
}
`
