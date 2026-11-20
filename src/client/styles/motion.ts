export const WHALE_MOTION = `@keyframes ac-whale-bob{50%{transform:translateY(-5px) rotate(-1.2deg)}}
@keyframes ac-whale-drift{to{transform:translateX(var(--ac-p))}}
@keyframes ac-whale-rise{0%{opacity:0;transform:translateY(0)}20%{opacity:.75}100%{opacity:0;transform:translateY(-2.6px)}}
@keyframes ac-whale-trace{to{stroke-dashoffset:-100}}
@keyframes ac-whale-trace-head{from{stroke-dashoffset:-19.8}to{stroke-dashoffset:-119.8}}
@keyframes ac-whale-flash{30%{opacity:.9}100%{opacity:0}}
@keyframes ac-whale-jiggle{25%{transform:scale(1.08,.9) translateY(3px)}55%{transform:scale(.95,1.07) translateY(-8px) rotate(-3deg)}80%{transform:scale(1.02,.98)}}
@keyframes ac-whale-puff{0%{opacity:0;transform:translateY(1.4px) scale(.4)}35%{opacity:1}100%{opacity:0;transform:translateY(-2.6px) scale(1.15)}}
@keyframes ac-whale-say{0%{opacity:0;transform:translateY(6px) scale(.8)}12%{opacity:1;transform:scale(1.06)}20%{transform:none}85%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}
@keyframes ac-whale-think{0%{opacity:0;transform:translateY(8px) scale(.86)}12%{opacity:1;transform:none}80%{opacity:1;transform:translateY(-3px)}100%{opacity:0;transform:translateY(-10px) scale(.97)}}
@keyframes ac-whale-ripple{from{opacity:.9;transform:scale(.4)}to{opacity:0;transform:scale(1.6)}}
@keyframes ac-whale-spin{0%{transform:none}35%{transform:translateY(-16px) rotate(-190deg) scale(1.05)}70%{transform:translateY(-8px) rotate(-340deg)}100%{transform:rotate(-360deg)}}
@keyframes ac-whale-dizzy{0%,100%{transform:none}20%{transform:rotate(9deg)}40%{transform:rotate(-8deg)}60%{transform:rotate(6deg)}80%{transform:rotate(-4deg)}}
@keyframes ac-whale-pop{0%{opacity:0;transform:translate(0,0) scale(.4)}20%{opacity:1}100%{opacity:0;transform:translate(var(--x),-90px) scale(1.1)}}
/* crisper controls: real buttons are rounded rectangles; chips, tabs and toggles stay pills */
.ac-root .ac-btn{border-radius:10px}
.ac-root{--ac-p-shadow:inset 0 1px 0 rgba(255,255,255,.32),0 1px 2px rgba(28,48,120,.22),0 8px 18px -10px rgba(72,102,250,.7);--ac-p-shadow-hover:inset 0 1px 0 rgba(255,255,255,.38),0 1px 2px rgba(28,48,120,.24),0 12px 24px -10px rgba(72,102,250,.78);--ac-p-bg:var(--ac-v-grad),var(--ac-v-fill)}
.ac-btn.primary::before{display:none}
`
