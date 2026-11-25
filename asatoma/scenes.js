// Asato Ma: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS the change the line asks for:
// 0 untruth -> truth: in the fog a "snake" scares the child; the fog lifts and it is only a rope (the classic rope-and-snake).
// 1 darkness -> light: a dark room, the child lights the lamp, light spreads, the shadows run away, every lamp lights up.
// 2 death -> immortality: a wilted flower, a drop of amrit from the golden pot, it blooms again and a tree of life grows.
// 3 shanti x3: children meditate by a calm lake; three ripples of peace, doves, the sun rises.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
const SC = (() => {
  const { P, cloud, bigCloud, stars, lotus, tree, tx, SH, KID, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const flameP = (id) => `<g id="${id}"><path d="M0 0 Q-22 -30 0 -70 Q22 -30 0 0Z" fill="#FFB703" stroke="${O}" stroke-width="5"/><path d="M0 -8 Q-9 -26 0 -46 Q9 -26 0 -8Z" fill="#FFF3B0"/></g>`;
  const bigDiya = (x, y, s, id) => P('', x, y, s, `<rect x="-14" y="10" width="28" height="90" fill="#C47A3A" stroke="${O}" stroke-width="6"/><ellipse cx="0" cy="104" rx="60" ry="16" fill="#C47A3A" stroke="${O}" stroke-width="6"/><path d="M-70 0 Q0 60 70 0 Z" fill="#E85D04" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><path d="M-70 0 Q0 14 70 0" fill="none" stroke="${O}" stroke-width="5"/><g transform="translate(0 -2)"><g id="${id}">${flameP(id + 'f')}</g></g>`);
  const smallDiya = (x, y, id) => P('', x, y, 0.55, `<path d="M-50 0 Q0 44 50 0 Z" fill="#C2410C" stroke="${O}" stroke-width="7"/><g transform="translate(0 -2)"><g id="${id}" opacity="0">${flameP(id + 'f')}</g></g>`);
  // a walk: hop the wrapper from x0 to x1 in small steps
  const walk = (tl, sel, x0, x1, t, dur) => {
    tl.fromTo(sel, { x: x0 }, { x: x1, duration: dur, ease: 'none' }, t);
    const n = Math.max(2, Math.round(dur / 0.32));
    tl.fromTo(sel, { y: 0 }, { y: -10, duration: dur / n / 2, ease: 'sine.out', yoyo: true, repeat: n * 2 - 1 }, t);
  };
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  // the change must happen inside the scene even when it is short (sung finale ~4 s) or long (line ~9 s)
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);

  // ---------- 0: Asato ma sadgamaya: lead me from untruth to truth ----------
  const snakeD = 'M-150 20 Q-110 -30 -60 10 Q-10 50 40 10 Q90 -30 130 4';
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#BFE6FF', '#FFF1C9')}
    <g id="a0sun">${P('', 820, 150, 0.4, ST.sunFace)}</g>
    <path d="M-20 330 Q200 250 420 320 Q640 240 860 310 Q950 280 1020 300 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>${grass(440, '#6BBF59')}
    <path d="M-20 500 Q300 440 520 452 Q760 466 1020 430" fill="none" stroke="#E8C98A" stroke-width="40" stroke-linecap="round"/>
    ${tree(80, 430, 0.42)}${lotus(930, 470, 0.5)}
    <g id="a0rope" opacity="0" transform="translate(640 455)"><path d="${snakeD}" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round"/><path d="${snakeD}" fill="none" stroke="#C9A063" stroke-width="20" stroke-linecap="round"/><path d="${snakeD}" fill="none" stroke="#8B5E34" stroke-width="20" stroke-dasharray="6 12"/><path d="M130 4 l26 -14 M130 4 l30 4 M130 4 l22 18" stroke="#8B5E34" stroke-width="6" stroke-linecap="round"/></g>

    <g id="a0dim"><rect width="${W}" height="${H}" fill="#3B3F5C" opacity=".72"/>${bigCloud(260, 300, 0.9, '#C9CCDA', 'a0fog1', 0.92)}${bigCloud(720, 240, 1.0, '#BFC3D3', 'a0fog2', 0.9)}${bigCloud(330, 480, 0.7, '#D3D6E2', 'a0fog3', 0.85)}</g>
    <g transform="translate(640 455) scale(1.25)"><g id="a0snake"><path d="${snakeD}" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round"/><path d="${snakeD}" fill="none" stroke="#3FA34D" stroke-width="20" stroke-linecap="round"/><path d="${snakeD}" fill="none" stroke="#B6E36B" stroke-width="6" stroke-dasharray="10 16"/>
      <g id="a0head" transform="translate(140 -2)"><ellipse rx="34" ry="24" fill="#3FA34D" stroke="${O}" stroke-width="6"/><circle cx="8" cy="-8" r="8" fill="#fff" stroke="${O}" stroke-width="3"/><circle cx="10" cy="-8" r="4" fill="${RD}"/><g id="a0tng"><path d="M32 4 L58 4 L66 -4 M58 4 L66 12" stroke="${RD}" stroke-width="5" fill="none" stroke-linecap="round"/></g></g></g></g>
    <g id="a0kw">${KID('a0k', 210, 290, 0.5, { mood: 'sd' })}</g>
    <g id="a0scare" opacity="0">${P('', 300, 120, 1, `<circle r="40" fill="#fff" stroke="${O}" stroke-width="6"/>${tx('!', -10, 22, 64, RD, 6)}`)}</g>
    <g id="a0ok" opacity="0">${P('', 640, 360, 1.1, ST.check)}</g>
    ${[0, 1, 2, 3, 4].map(i => `<g id="a0s${i}" opacity="0">${P('', 560 + i * 45, 400 - (i % 2) * 40, 0.8, SH.spark)}</g>`).join('')}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#a0dim', '#a0snake'], { opacity: 1 }, a); tl.set(['#a0fog1', '#a0fog2', '#a0fog3'], { x: 0, y: 0, opacity: 0.9 }, a); tl.set(['#a0kw', '#a0ok'], { x: 0, y: 0, opacity: 1, scale: 1 }, a); tl.set('#a0ok', { opacity: 0 }, a); tl.set('#a0rope', { opacity: 0 }, a); tl.set('#a0sun', { y: 160 }, a);
    face(tl, 'a0k', 'sd', a);
    // the "snake" sways and flicks its tongue; the scared child trembles
    tl.fromTo('#a0head', { rotation: -10 }, { rotation: 12, transformOrigin: '0% 50%', duration: 0.35, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.35)), ease: 'sine.inOut' }, a);
    tl.fromTo('#a0tng', { scaleX: 0.2 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 0.15, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.15)) }, a);
    tl.fromTo('#a0scare', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, a + 0.2);
    tl.fromTo('#a0kw', { rotation: -2 }, { rotation: 2, transformOrigin: '210px 450px', duration: 0.08, yoyo: true, repeat: Math.max(1, Math.floor((r - a - 0.3) / 0.08)) }, a + 0.3);
    // truth: the fog rolls away, the sun comes up, and it is only a rope
    tl.to('#a0fog1', { x: -700, opacity: 0, duration: 1.2, ease: 'power2.in' }, r - 0.3);
    tl.to('#a0fog2', { x: 700, opacity: 0, duration: 1.2, ease: 'power2.in' }, r - 0.3);
    tl.to('#a0fog3', { y: 300, opacity: 0, duration: 1.0, ease: 'power2.in' }, r - 0.2);
    tl.to('#a0dim', { opacity: 0, duration: 1.0 }, r);
    tl.to('#a0sun', { y: 0, duration: 1.2, ease: 'power2.out' }, r);
    tl.to('#a0snake', { opacity: 0, duration: 0.5 }, r + 0.3); tl.to('#a0rope', { opacity: 1, duration: 0.5 }, r + 0.3);
    tl.to('#a0scare', { opacity: 0, duration: 0.2 }, r + 0.2);
    tl.fromTo('#a0ok', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(3)' }, r + 0.8);
    for (let i = 0; i < 5; i++) tl.fromTo(`#a0s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(3)' }, r + 0.8 + i * 0.1);
    face(tl, 'a0k', 'sm', r + 0.8);
    tl.to('#a0kw', { rotation: 0, duration: 0.1 }, r);
    walk(tl, '#a0kw', 0, 200, r + 1.0, Math.min(1.6, b - r - 1.1));
  };

  // ---------- 1: Tamaso ma jyotirgamaya: lead me from darkness to light ----------
  const shade = (id, x, y, s) => `<g id="${id}">${P('', x, y, s, `<g transform="scale(1 1)"><path d="M-50 60 L-50 -10 Q-50 -70 0 -70 Q50 -70 50 -10 L50 60 L30 44 L10 62 L-10 44 L-30 62Z" fill="#1B1530" stroke="#000" stroke-width="5"/><ellipse cx="-16" cy="-14" rx="8" ry="11" fill="#FFF36B"/><ellipse cx="16" cy="-14" rx="8" ry="11" fill="#FFF36B"/></g>`)}</g>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFE3A3', '#F6B96B')}${glow('gl1', '#FFF3B0')}
    <rect x="0" y="400" width="${W}" height="140" fill="#C98B4F" stroke="${O}" stroke-width="6"/>
    <rect x="700" y="70" width="190" height="200" rx="14" fill="#2E3B78" stroke="${O}" stroke-width="7"/><path d="M795 70 V270 M700 170 H890" stroke="${O}" stroke-width="7"/>${stars([[740, 110], [850, 130], [760, 220], [860, 235]], 10)}
    <g id="a1sky" opacity="0"><rect x="704" y="74" width="182" height="192" rx="10" fill="#9FD8FF"/>${P('', 800, 230, 0.25, ST.sunFace)}</g>
    <circle id="a1glow" cx="500" cy="330" r="260" fill="url(#gl1)" opacity="0"/>
    <g id="a1rays" opacity="0">${ST.rays(500, 330, 12, '#FFF3B0', 0.35, 700, 50)}</g>
    ${bigDiya(500, 352, 0.9, 'a1fl')}
    ${[90, 210, 330, 670, 790, 910].map((x, i) => smallDiya(x, 470, 'a1d' + i)).join('')}
    <g id="a1kw">${KID('a1k', 270, 255, 0.5, { mood: 'sd' })}</g>
    <g id="a1dark"><rect width="${W}" height="${H}" fill="#0B1026" opacity=".88"/></g>
    ${shade('a1g0', 120, 150, 0.9)}${shade('a1g1', 880, 360, 0.8)}${shade('a1g2', 640, 120, 0.7)}
    <g id="a1sp" opacity="0">${P('', 0, 0, 0.9, SH.ember)}</g>
    <g id="a1kid2" opacity="0"><g id="a1eyes"><ellipse cx="258" cy="233" rx="6" ry="8" fill="#fff"/><ellipse cx="282" cy="233" rx="6" ry="8" fill="#fff"/></g></g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#a1dark', '#a1kid2', '#a1g0', '#a1g1', '#a1g2'], { opacity: 1, x: 0, y: 0, scale: 1 }, a);
    tl.set(['#a1glow', '#a1rays', '#a1sky', '#a1sp'], { opacity: 0, rotation: 0 }, a);
    tl.set('#a1fl', { scale: 0, transformOrigin: '50% 100%' }, a);
    for (let i = 0; i < 6; i++) tl.set('#a1d' + i, { opacity: 0 }, a);
    face(tl, 'a1k', 'sd', a);
    // in the dark only the child's eyes and the shadows' eyes show; the shadows creep closer
    tl.fromTo('#a1eyes', { scaleY: 1 }, { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.1, yoyo: true, repeat: 1 }, a + 0.6);
    tl.to('#a1g0', { x: 60, duration: Math.max(0.5, r - a - 0.4), ease: 'sine.inOut' }, a);
    tl.to('#a1g1', { x: -60, duration: Math.max(0.5, r - a - 0.4), ease: 'sine.inOut' }, a);
    // a spark from the child's hand flies to the wick
    tl.fromTo('#a1sp', { x: 320, y: 340, opacity: 1, scale: 0.6 }, { x: 500, y: 300, scale: 1.2, duration: 0.6, ease: 'power1.inOut' }, r - 0.6);
    tl.to('#a1sp', { opacity: 0, duration: 0.1 }, r);
    // LIGHT: the lamp catches, light floods the room, darkness and shadows run away
    tl.to('#a1fl', { scale: 1.25, duration: 0.45, ease: 'back.out(3)' }, r);
    tl.to('#a1fl', { scaleY: 1.1, scaleX: 0.95, duration: 0.2, yoyo: true, repeat: Math.max(1, Math.floor((b - r) / 0.2)), ease: 'sine.inOut' }, r + 0.45);
    tl.fromTo('#a1glow', { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1.6, transformOrigin: '50% 50%', duration: 1.2, ease: 'power2.out' }, r);
    tl.to('#a1dark', { opacity: 0, duration: 1.1, ease: 'power1.in' }, r + 0.1);
    tl.to('#a1kid2', { opacity: 0, duration: 0.4 }, r + 0.3);
    tl.to('#a1g0', { x: -400, scale: 0.3, opacity: 0, duration: 0.8, ease: 'power2.in' }, r + 0.2);
    tl.to('#a1g1', { x: 400, scale: 0.3, opacity: 0, duration: 0.8, ease: 'power2.in' }, r + 0.25);
    tl.to('#a1g2', { y: -300, scale: 0.3, opacity: 0, duration: 0.8, ease: 'power2.in' }, r + 0.3);
    tl.to('#a1rays', { opacity: 1, duration: 0.6 }, r + 0.5);
    tl.to('#a1rays', { rotation: 30, transformOrigin: '500px 330px', duration: Math.max(1, b - r), ease: 'none' }, r + 0.5);
    tl.to('#a1sky', { opacity: 1, duration: 1 }, r + 0.8);
    [2, 3, 1, 4, 0, 5].forEach((i, k) => tl.fromTo('#a1d' + i, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', duration: 0.3, ease: 'back.out(3)' }, r + 0.6 + k * 0.14));
    face(tl, 'a1k', 'sm', r + 0.4);
    tl.fromTo('#a1kw', { y: 0 }, { y: -26, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, r + 0.6);
  };

  // ---------- 2: Mrityor ma amritam gamaya: lead me from death to immortality ----------
  const bloom = `${[0, 60, 120, 180, 240, 300].map(a => `<ellipse rx="22" ry="40" cy="-38" transform="rotate(${a})" fill="#FF8FB1" stroke="${O}" stroke-width="5"/>`).join('')}<circle r="22" fill="${GD}" stroke="${O}" stroke-width="5"/>`;
  const wilt = `${[200, 250, 300].map(a => `<ellipse rx="18" ry="34" cy="-30" transform="rotate(${a})" fill="#A39B8B" stroke="${O}" stroke-width="5"/>`).join('')}<circle r="18" fill="#8A7F6A" stroke="${O}" stroke-width="5"/>`;
  const kalasha = `<path d="M-60 -20 Q-90 60 0 80 Q90 60 60 -20Z" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-44" y="-40" width="88" height="24" rx="8" fill="${GD}" stroke="${O}" stroke-width="6"/><path d="M-30 -40 Q-40 -80 0 -96 Q40 -80 30 -40Z" fill="#6BBF59" stroke="${O}" stroke-width="5"/><circle cy="-104" r="16" fill="#C47A3A" stroke="${O}" stroke-width="5"/><path d="M-50 20 H50" stroke="${RD}" stroke-width="8"/>`;
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#BFE9FF', '#E5F7D0')}${glow('gl2', '#FFE066')}
    ${cloud(160, 90, 0.5)}<g id="a2tree" transform="translate(780 450)"><g id="a2treeIn">${tree(0, 0, 0.6, '#3E8E41')}${[[-50, -330], [40, -350], [0, -290], [-70, -270], [60, -280]].map(([x, y]) => P('', x * 0.6, y * 0.6, 0.9, SH.petal)).join('')}</g></g>
    ${grass(450, '#6BBF59')}
    <circle id="a2gl" cx="470" cy="300" r="200" fill="url(#gl2)" opacity="0"/>
    <g id="a2cl">${bigCloud(470, 70, 0.55)}<g transform="translate(470 50) rotate(135)">${P('', 0, 0, 0.7, kalasha)}</g></g>
    ${[0, 1, 2].map(i => `<g id="a2d${i}" opacity="0">${P('', 470, 90, 1, `<path d="M0 -20 Q14 0 0 14 Q-14 0 0 -20Z" fill="${GD}" stroke="${O}" stroke-width="3"/>`)}</g>`).join('')}
    <g transform="translate(470 452)"><path id="a2stem" d="M0 0 Q-6 -80 0 -150" fill="none" stroke="${O}" stroke-width="14"/><path d="M0 0 Q-6 -80 0 -150" fill="none" stroke="#3FA34D" stroke-width="7"/>
      ${P('', -26, -70, 1.6, SH.leaf)}${P('', 24, -100, 1.4, SH.leaf)}
      <g transform="translate(0 -150)"><g id="a2head"><g id="a2wilt">${wilt}</g><g id="a2bloom" opacity="0">${bloom}</g></g></g></g>
    ${[0, 1, 2].map(i => `<g id="a2p${i}">${P('', 420 + i * 40, 445, 0.7, `<ellipse rx="16" ry="8" fill="#A39B8B" stroke="${O}" stroke-width="3"/>`)}</g>`).join('')}
    <g id="a2grey"><rect width="${W}" height="${H}" fill="#6B6458" opacity=".5"/></g>
    <g id="a2kw">${KID('a2k', 200, 290, 0.5, { mood: 'sd' })}</g>
    <g id="a2inf" opacity="0">${tx('∞', 860, 120, 130, GD, 9)}</g>
    ${[0, 1, 2, 3, 4, 5].map(i => `<g id="a2s${i}" opacity="0">${P('', 380 + (i % 3) * 90, 220 + Math.floor(i / 3) * 110, 0.8, SH.spark)}</g>`).join('')}
    <g id="a2bf" opacity="0">${P('', 0, 0, 1, `<g id="a2wing"><path d="M0 0 Q-40 -40 -36 -4 Q-30 20 0 0Z M0 0 Q40 -40 36 -4 Q30 20 0 0Z" fill="#FFB31A" stroke="${O}" stroke-width="4"/></g><ellipse rx="5" ry="16" fill="${O}"/>`)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#a2grey', '#a2wilt'], { opacity: 1 }, a); tl.set(['#a2bloom', '#a2gl', '#a2inf', '#a2bf'], { opacity: 0 }, a);
    tl.set('#a2head', { rotation: 120, transformOrigin: '50% 50%' }, a);
    tl.set('#a2treeIn', { scale: 0, transformOrigin: '50% 100%' }, a); tl.set('#a2bloom', { scale: 1, rotation: 0 }, a); tl.set(['#a2p0', '#a2p1', '#a2p2'], { opacity: 1 }, a);
    face(tl, 'a2k', 'sd', a);
    // the flower is wilting: its head droops lower, petals drop
    tl.to('#a2head', { rotation: 150, duration: Math.max(0.4, r - a - 0.6), ease: 'sine.in' }, a);
    // amrit: golden drops fall from the pot on the cloud
    for (let i = 0; i < 3; i++) tl.fromTo(`#a2d${i}`, { opacity: 1, y: 0 }, { y: 200, duration: 0.45, ease: 'power2.in' }, r - 0.6 + i * 0.18);
    for (let i = 0; i < 3; i++) tl.set(`#a2d${i}`, { opacity: 0 }, r - 0.15 + i * 0.18);
    // ... and life comes back: the flower lifts and blooms, the world gets colour, a tree of life grows
    tl.fromTo('#a2gl', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1.3, transformOrigin: '50% 50%', duration: 0.9, ease: 'power2.out' }, r);
    tl.to('#a2head', { rotation: 0, duration: 0.7, ease: 'back.out(2)' }, r);
    tl.to('#a2wilt', { opacity: 0, duration: 0.3 }, r + 0.2); tl.to('#a2bloom', { opacity: 1, duration: 0.3 }, r + 0.2);
    tl.fromTo('#a2bloom', { scale: 0.5 }, { scale: 1.3, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(3)' }, r + 0.2);
    tl.to('#a2bloom', { rotation: 360, transformOrigin: '50% 50%', duration: Math.max(1, b - r - 0.8), ease: 'none' }, r + 0.8);
    [0, 1, 2].forEach(i => tl.to(`#a2p${i}`, { opacity: 0, duration: 0.3 }, r + 0.2));
    tl.to('#a2grey', { opacity: 0, duration: 0.9 }, r + 0.1);
    tl.to('#a2treeIn', { scale: 1, duration: 1.1, ease: 'back.out(1.4)' }, r + 0.4);
    tl.fromTo('#a2inf', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, r + 1.0);
    for (let i = 0; i < 6; i++) tl.fromTo(`#a2s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, r + 0.5 + i * 0.12);
    tl.fromTo('#a2bf', { opacity: 1, x: 120, y: 380 }, { x: 560, y: 160, duration: Math.max(1, b - r - 0.6), ease: 'sine.inOut' }, r + 0.6);
    tl.fromTo('#a2wing', { scaleX: 1 }, { scaleX: 0.3, transformOrigin: '50% 50%', duration: 0.12, yoyo: true, repeat: Math.max(1, Math.floor((b - r) / 0.12)) }, r + 0.6);
    face(tl, 'a2k', 'sm', r + 0.5);
    tl.fromTo('#a2kw', { y: 0 }, { y: -24, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, r + 0.7);
  };

  // ---------- 3: Om Shantih Shantih Shantih: peace, peace, peace ----------
  const dove = (id) => `<g id="${id}" opacity="0">${P('', 0, 0, 1, `<ellipse rx="34" ry="18" fill="#fff" stroke="${O}" stroke-width="5"/><circle cx="30" cy="-10" r="13" fill="#fff" stroke="${O}" stroke-width="5"/><path d="M42 -10 L56 -6 L42 -2Z" fill="#FFB31A" stroke="${O}" stroke-width="3"/><circle cx="33" cy="-13" r="3" fill="${O}"/><g class="wingD"><path d="M-6 -6 Q-30 -60 10 -50 Q20 -30 10 -6Z" fill="#fff" stroke="${O}" stroke-width="5"/></g>`)}</g>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFD6A5', '#FFF3D6')}${glow('gl3', '#FFF3B0')}
    <g id="a3sun"><circle cx="500" cy="300" r="150" fill="url(#gl3)"/>${P('', 500, 300, 0.38, ST.sunFace)}</g>
    <path d="M-20 300 Q200 240 420 290 Q640 230 860 280 Q950 260 1020 270 V560 H-20Z" fill="#A9D7A0" stroke="${O}" stroke-width="6"/>
    <rect x="-10" y="320" width="1020" height="240" fill="#7EC8E3" stroke="${O}" stroke-width="6"/>
    ${[0, 1, 2].map(i => `<ellipse id="a3r${i}" cx="500" cy="400" rx="60" ry="14" fill="none" stroke="#fff" stroke-width="6" opacity="0"/>`).join('')}
    <g id="a3lt">${lotus(500, 404, 0.55)}</g>
    <path d="M-20 470 Q250 450 500 462 Q750 476 1020 455 V560 H-20Z" fill="#6BBF59" stroke="${O}" stroke-width="6"/>
    <g id="a3k1w">${KID('a3k1', 200, 330, 0.42, { sit: true, eyes: 'closed' })}</g>
    <g id="a3k2w">${KID('a3k2', 500, 350, 0.42, { sit: true, eyes: 'closed', top: '#2EC4B6' })}</g>
    <g id="a3k3w">${KID('a3k3', 800, 330, 0.42, { sit: true, eyes: 'closed', top: '#E74C8B' })}</g>
    <g id="a3om" opacity="0">${tx('ఓం', 500, 120, 80, '#FF8C1A', 8)}</g>
    ${dove('a3dv1')}${dove('a3dv2')}
    ${[0, 1, 2].map(i => `<g id="a3t${i}" opacity="0">${tx('శాంతి', [200, 500, 800][i], 220, 50, '#fff', 8)}</g>`).join('')}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const d = b - a;
    tl.set('#sc3', { opacity: 1 }, a);
    tl.fromTo('#a3sun', { y: 120 }, { y: 0, duration: d, ease: 'sine.out' }, a);
    tl.fromTo('#a3om', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, a + 0.2);
    // children breathe slowly, eyes closed
    ['#a3k1w', '#a3k2w', '#a3k3w'].forEach((k, i) => tl.fromTo(k, { scaleY: 1 }, { scaleY: 1.03, transformOrigin: '50% 100%', duration: 1.1, yoyo: true, repeat: Math.max(1, Math.floor(d / 1.1)), ease: 'sine.inOut' }, a + i * 0.2));
    tl.fromTo('#a3lt', { y: 0 }, { y: -6, duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.9)), ease: 'sine.inOut' }, a);
    // three shantis: three ripples of peace spread over the water, one word over each child
    [0.22, 0.45, 0.68].forEach((f, i) => {
      const t = a + 0.6 + f * (d - 1);
      tl.fromTo(`#a3r${i}`, { opacity: 0.9, scale: 0.4 }, { opacity: 0, scale: 6, transformOrigin: '50% 50%', duration: 1.6, ease: 'sine.out' }, t);
      tl.fromTo(`#a3t${i}`, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, t);
    });
    // doves glide across
    tl.fromTo('#a3dv1', { opacity: 1, x: -80, y: 150 }, { x: 1080, y: 90, duration: Math.max(2, d - 0.5), ease: 'none' }, a + 0.3);
    tl.fromTo('#a3dv2', { opacity: 1, x: -80, y: 210 }, { x: 1080, y: 170, duration: Math.max(2, d - 1), ease: 'none' }, a + 1.0);
    document.querySelectorAll('#sc3 .wingD').forEach(w => tl.fromTo(w, { scaleY: 1 }, { scaleY: -0.4, transformOrigin: '50% 100%', duration: 0.22, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.22)) }, a));
  };

  // small idle life (flames flicker, sun turns, clouds drift) so no frame is ever still
  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.flick').forEach(c => tl.fromTo(c, { scaleY: 0.88 }, { scaleY: 1.12, transformOrigin: '50% 100%', duration: 0.2, yoyo: true, repeat: Math.floor(d / 0.2) }, a));
    sc.querySelectorAll('.spinR').forEach(c => tl.fromTo(c, { rotation: 0 }, { rotation: 25, transformOrigin: '50% 50%', duration: d, ease: 'none' }, a));
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
    sc.querySelectorAll('.sway').forEach(c => tl.fromTo(c, { rotation: -2 }, { rotation: 2, transformOrigin: '50% 100%', duration: 1, yoyo: true, repeat: Math.floor(d) }, a));
    sc.querySelectorAll('.twk').forEach((c, k) => tl.fromTo(c, { opacity: 0.4 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: Math.floor(d / 0.5) }, a + k * 0.1));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
