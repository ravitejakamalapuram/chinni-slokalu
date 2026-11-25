// Guru Brahma: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 the Guru is Brahma, the Guru is Vishnu: a child sits by an empty slate; the Guru teaches and letters appear on it (he creates knowledge, like Brahma the creator, who appears);
//   then a storm cloud rains on the child and the Guru's umbrella covers him (he protects, like Vishnu the protector, who appears).
// 1 the Guru is Maheshwara (Shiva): a grumpy dark cloud of bad habits (anger, laziness) hangs over the child; Shiva appears, the Guru points, the cloud breaks and the child smiles.
// 2 the Guru is truly the Supreme God: Brahma, Vishnu and Shiva stand apart; they glide into one big light behind the Guru, who shines with all three.
// 3 I bow to that great Guru: the child stands before the Guru, then folds hands and bows; flowers fall and the Guru blesses him.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// GRAW is the hero drawing (template/characters/guru.svg), injected by build_gur.sh. Its parrot and branch are hidden: they are not in the sloka.
const SC = (() => {
  const { P, cloud, stars, lotus, tree, tx, KID, fig, SHIVA, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const floor = `<path d="M-20 440 Q500 420 1020 440 V560 H-20Z" fill="#8CC97A" stroke="${O}" stroke-width="6"/>`;
  // the Guru from the hero drawing, ids prefixed; (x, y) is the bottom of his seat
  const GU = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}branch"`, `id="${p}branch" display="none"`).replace(`id="${p}parrot"`, `id="${p}parrot" display="none"`)}</g>`);
  const BRAHMA = (id, x, y, s) => fig({ id, x, y, s, skin: '#F2C27A', cloth: '#E63946', heads4: true, beard: '#F0F0F0', hold: 'book' });
  const VISHNU = (id, x, y, s) => fig({ id, x, y, s, skin: '#4A7BD8', cloth: '#FFC93C', crown: 'crown', hold: 'mace' });
  const label = (t, x, y, id, fs = 44) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFD23F', 8)}</g>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: d, ease: 'back.out(2.5)' }, t);
  const show = (tl, sel, t) => tl.fromTo(sel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, t);
  // the Guru's head nods gently so he is never still
  const alive = (tl, p, a, d) => swing(tl, `#${p}headNod`, '50% 50%', a, d, 3, 0.9);
  const KSKIN = '#E9B68A';
  const nmArms = `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${KSKIN}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const namaste = (tl, id, on, t) => { tl.set([`#${id}-aL`, `#${id}-aR`], { opacity: on ? 0 : 1 }, t); tl.set(`#${id}-nm`, { opacity: on ? 1 : 0 }, t); };
  const darkCloud = (c = '#5B5470') => `<path d="M-90 20 Q-100 -20 -60 -26 Q-50 -70 0 -60 Q40 -90 70 -50 Q110 -50 104 -10 Q130 10 100 30 Z" fill="${c}" stroke="${O}" stroke-width="5"/>`;
  const drops = (id, x0, n) => `<g id="${id}" opacity="0">${[...Array(n)].map((_, k) => `<path class="rdrop" d="M${x0 + k * 28} ${(k % 2) * 18} l-6 26" stroke="#5DADE2" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`;
  const flower = (c) => `${[...Array(6)].map((_, k) => `<ellipse rx="9" ry="16" cy="-11" transform="rotate(${k * 60})" fill="${c}" stroke="${O}" stroke-width="3"/>`).join('')}<circle r="7" fill="#FFC93C" stroke="${O}" stroke-width="2"/>`;

  // ---------- 0: Gurur Brahma Gurur Vishnu: the Guru creates (like Brahma) and protects (like Vishnu) ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#CFEFFF', '#F4FBE8')}${cloud(120, 80, 0.5, '#fff')}${tree(930, 450, 0.38)}${floor}
    ${GU('z0g', 200, 500, 0.62)}
    <g id="z0slate"><rect x="700" y="300" width="170" height="120" rx="10" fill="#2F3B35" stroke="#8B5A2B" stroke-width="12"/>
      ${['అ', 'ఆ', 'ఇ'].map((c, i) => `<g id="z0l${i}" opacity="0">${tx(c, 735 + i * 50, 380, 50, '#FFFFFF', 0)}</g>`).join('')}</g>
    ${KID('z0k', 560, 288, 0.5, { mood: 'sd', flip: true })}
    <g id="z0cl" opacity="0">${P('', 560, 150, 1.0, darkCloud())}<g transform="translate(0 185)">${drops('z0rn', 500, 5)}</g></g>
    <g id="z0um" opacity="0">${P('', 560, 185, 1, `<path d="M-110 30 Q0 -90 110 30 Q82 14 55 30 Q28 14 0 30 Q-28 14 -55 30 Q-82 14 -110 30Z" fill="${RD}" stroke="${O}" stroke-width="6"/><path d="M0 -30 V40" stroke="${O}" stroke-width="8"/>`)}</g>
    <g id="z0B" opacity="0">${glow('gl0b', '#FFF3B0')}<circle cx="420" cy="110" r="90" fill="url(#gl0b)"/>${BRAHMA('z0br', 420, 110, 0.24)}${tx('బ్రహ్మ', 420, 210, 40, '#FFD23F', 8)}</g>
    <g id="z0V" opacity="0">${glow('gl0v', '#CDE6FF')}<circle cx="880" cy="110" r="90" fill="url(#gl0v)"/>${VISHNU('z0vi', 880, 100, 0.24)}${tx('విష్ణువు', 880, 205, 40, '#FFD23F', 8)}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b), step = Math.max(0.7, Math.min(2.6, (b - r - 0.4) / 2));
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0l0', '#z0l1', '#z0l2', '#z0B', '#z0V', '#z0cl', '#z0um', '#z0rn'], { opacity: 0 }, a);
    face(tl, 'z0k', 'sd', a);
    alive(tl, 'z0g', a, Math.max(0.6, b - a));
    // before: the slate is empty and the child looks puzzled
    swing(tl, '#z0k', '50% 100%', a, Math.max(0.6, r - a), 3, 0.6);
    // Brahma: the Guru teaches and letters appear on the slate; knowledge is created
    for (let i = 0; i < 3; i++) pop(tl, `#z0l${i}`, r + i * 0.18, 0.3);
    face(tl, 'z0k', 'sm', r + 0.5);
    pop(tl, '#z0B', r + 0.2, 0.45);
    // Vishnu: a storm cloud rains on the child, the Guru's umbrella covers and protects him
    const v = r + step;
    tl.fromTo('#z0cl', { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, v - 0.2);
    tl.set('#z0rn', { opacity: 1 }, v + 0.15); face(tl, 'z0k', 'op', v + 0.15);
    tl.fromTo('#z0rn', { y: 0 }, { y: 20, duration: 0.25, repeat: Math.max(1, Math.floor((b - v) / 0.25)), ease: 'none' }, v + 0.15);
    pop(tl, '#z0um', v + 0.5, 0.35);
    tl.to('#z0rn', { opacity: 0, duration: 0.2 }, v + 0.75);
    face(tl, 'z0k', 'sm', v + 0.7);
    pop(tl, '#z0V', v + 0.6, 0.45);
  };

  // ---------- 1: Gurur Devo Maheshwaraha: like Shiva, the Guru removes what is bad ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#B9D7EA', '#EAF4E0')}${floor}
    ${GU('z1g', 200, 500, 0.62)}
    ${KID('z1k', 640, 288, 0.5, { mood: 'sd', flip: true })}
    <g id="z1bad">${P('', 650, 130, 1.25, `<g id="z1bc">${darkCloud('#4A4458')}<path d="M-40 -18 l16 8 M20 -18 l-16 8" stroke="#FFD23F" stroke-width="6" stroke-linecap="round"/><path d="M-26 14 q26 -16 52 0" stroke="#FFD23F" stroke-width="6" fill="none" stroke-linecap="round"/></g>`)}
      <g id="z1w0">${tx('కోపం', 560, 70, 34, '#FF8C8C', 7)}</g><g id="z1w1">${tx('బద్ధకం', 760, 76, 34, '#FF8C8C', 7)}</g></g>
    <g id="z1bolt" opacity="0"><path d="M330 150 L520 120 L500 140 L640 128" stroke="#FFF36B" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g id="z1bits" opacity="0">${[[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1.4]].map(([dx, dy], k) => `<g class="z1bit" data-dx="${dx}" data-dy="${dy}">${P('', 650, 130, 0.45, darkCloud('#4A4458'))}</g>`).join('')}</g>
    <g id="z1sun" opacity="0">${glow('gl1', '#FFF3B0')}<circle cx="650" cy="120" r="110" fill="url(#gl1)"/>${stars([[600, 90], [700, 110], [650, 60]], 14)}</g>
    <g id="z1S" opacity="0">${glow('gl1s', '#D6E8FF')}<circle cx="880" cy="230" r="110" fill="url(#gl1s)"/>${SHIVA('z1sh', 880, 200, 0.3)}${tx('శివుడు', 880, 345, 40, '#FFD23F', 8)}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1bolt', '#z1bits', '#z1sun', '#z1S'], { opacity: 0 }, a);
    tl.set('#z1bad', { opacity: 1 }, a);
    tl.set('.z1bit', { x: 0, y: 0 }, a);
    face(tl, 'z1k', 'sd', a);
    alive(tl, 'z1g', a, Math.max(0.6, b - a));
    // before: a grumpy dark cloud of bad habits hangs over the child
    tl.fromTo('#z1bc', { x: -8 }, { x: 8, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.4)), ease: 'sine.inOut' }, a);
    // meaning: Shiva appears, the Guru's light strikes the cloud, it breaks apart and the child smiles in the sun
    pop(tl, '#z1S', r - 0.5, 0.45);
    tl.fromTo('#z1bolt', { opacity: 0 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 }, r);
    tl.set('#z1bad', { opacity: 0 }, r + 0.35);
    tl.set('#z1bits', { opacity: 1 }, r + 0.35);
    document.querySelectorAll('#sc1 .z1bit').forEach(e => tl.to(e, { x: +e.dataset.dx * 260, y: +e.dataset.dy * 160, duration: 0.7, ease: 'power2.out' }, r + 0.35));
    tl.to('#z1bits', { opacity: 0, duration: 0.4 }, r + 0.75);
    tl.fromTo('#z1sun', { opacity: 0 }, { opacity: 1, duration: 0.5 }, r + 0.6);
    face(tl, 'z1k', 'sm', r + 0.6);
    tl.fromTo('#z1k', { y: 0 }, { y: -18, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.out' }, r + 0.7);
  };

  // ---------- 2: Guru Sakshat Parabrahma: Brahma, Vishnu and Shiva become one light in the Guru ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#2E1F5E', '#7B4FA0')}${stars([[80, 60], [220, 140], [380, 40], [640, 50], [800, 130], [940, 60]], 11)}
    <path d="M-20 470 Q500 450 1020 470 V560 H-20Z" fill="#5A3E86" stroke="${O}" stroke-width="6"/>
    ${glow('gl2', '#FFF3B0')}<g id="z2glow" opacity="0"><circle cx="500" cy="250" r="260" fill="url(#gl2)"/></g>
    ${GU('z2g', 500, 520, 0.52)}
    <g id="z2B">${BRAHMA('z2br', 150, 200, 0.3)}</g>
    <g id="z2V">${VISHNU('z2vi', 500, 40, 0.24)}</g>
    <g id="z2S">${SHIVA('z2sh', 850, 200, 0.3)}</g>
    ${label('పరబ్రహ్మ', 500, 90, 'z2t', 56)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2glow', '#z2t'], { opacity: 0 }, a);
    tl.set(['#z2B', '#z2V', '#z2S'], { opacity: 1, x: 0, y: 0, scale: 1 }, a);
    alive(tl, 'z2g', a, Math.max(0.6, b - a));
    // before: the three gods stand apart, each on his own
    [['#z2B', 0], ['#z2V', 0.2], ['#z2S', 0.4]].forEach(([s, d]) => tl.fromTo(s, { y: 0 }, { y: -10, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.6)), ease: 'sine.inOut' }, a + d));
    // meaning: they glide into the Guru and become one big light; he shines with all three
    const go = 0.8;
    tl.to('#z2B', { x: 350, y: 60, scale: 0.3, opacity: 0, smoothOrigin: false, transformOrigin: '50% 50%', duration: go, ease: 'power2.in' }, r - 0.4);
    tl.to('#z2V', { y: 160, scale: 0.3, opacity: 0, smoothOrigin: false, transformOrigin: '50% 50%', duration: go, ease: 'power2.in' }, r - 0.4);
    tl.to('#z2S', { x: -350, y: 60, scale: 0.3, opacity: 0, smoothOrigin: false, transformOrigin: '50% 50%', duration: go, ease: 'power2.in' }, r - 0.4);
    tl.fromTo('#z2glow', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, r + 0.3);
    tl.to('#z2glow', { scale: 1.06, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.9) / 0.6)), ease: 'sine.inOut' }, r + 0.9);
    show(tl, '#z2t', r + 0.6);
  };

  // ---------- 3: Tasmai Shri Gurave Namaha: I bow to that great Guru ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFD9A0', '#FFF4DC')}${tree(80, 450, 0.36, '#3E8E41', '#FF8FB1')}${floor}
    ${GU('z3g', 330, 500, 0.62)}
    <g id="z3kw">${KID('z3k', 690, 288, 0.5, { mood: 'sm', flip: true, extra: `<g id="z3k-nm" opacity="0">${nmArms}</g>` })}</g>
    <g id="z3fl" opacity="0">${[...Array(7)].map((_, k) => `<g class="z3f">${P('', 180 + k * 55, -30 - (k % 3) * 40, 1, flower(['#FF8FB1', '#FF9F1C', '#FFD23F', '#E63946'][k % 4]))}</g>`).join('')}</g>
    ${label('గురవే నమః', 760, 120, 'z3t', 50)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3t', '#z3fl', '#z3k-nm'], { opacity: 0 }, a);
    tl.set(['#z3k-aL', '#z3k-aR'], { opacity: 1 }, a);
    tl.set('#z3kw', { x: 120, rotation: 0 }, a);
    tl.set('.z3f', { y: 0 }, a);
    alive(tl, 'z3g', a, Math.max(0.6, b - a));
    // before: the child walks up to the Guru
    tl.to('#z3kw', { x: 0, duration: Math.max(0.5, r - a - 0.2), ease: 'sine.inOut' }, a);
    // meaning: the child folds hands and bows low; flowers fall on the Guru
    namaste(tl, 'z3k', true, r);
    tl.to('#z3kw', { rotation: -22, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut' }, r + 0.2);
    tl.set('#z3fl', { opacity: 1 }, r + 0.3);
    document.querySelectorAll('#sc3 .z3f').forEach((e, k) => tl.to(e, { y: 300 + (k % 3) * 30, duration: Math.max(1, b - r - 0.6), ease: 'none' }, r + 0.3 + k * 0.05));
    show(tl, '#z3t', r + 0.5);
  };

  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
