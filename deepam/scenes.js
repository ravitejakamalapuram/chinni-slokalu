// Deepa Jyoti: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 the lamp's light is the Supreme God: a dark night room, an unlit lamp, a scared child; the lamp lights up, the room fills with light, the child smiles and a glowing Om (the Supreme) shines in the light.
// 1 the lamp's light is Janardhana (Vishnu): the lit lamp sends a ball of light across; it grows and Lord Vishnu appears inside it and blesses.
// 2 may the lamp take away the bad in me: dark grumpy blobs (anger, lies, laziness) circle a sad child; the lamp shines a beam on him, the blobs shrink away one by one and he smiles.
// 3 O lamp's light, I bow to you: the child walks up to the lamp, folds hands and bows; flowers fall and the lamp glows.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// DRAW (template/characters/deepam.svg, the hero lamp) and VRAW (vishnu.svg) are injected by build_dee.sh with prefixed ids.
const SC = (() => {
  const { P, stars, tx, KID, demonIn, O, GD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const floor = (c = '#C98B5B') => `<path d="M-20 450 Q500 430 1020 450 V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const pre = (raw, p) => raw.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`);
  // the hero lamp, ids prefixed; (x, y) is the bottom of its plate
  const DEEP = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(DRAW, p)}</g>`);
  // Lord Vishnu, ids prefixed; (x, y) is the bottom of his seat
  const VISH = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="#1B2340" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(VRAW, p)}</g>`);
  const label = (t, x, y, id, fs = 44) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFD23F', 8)}</g>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4, org = '50% 100%') => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: org, duration: d, ease: 'back.out(2.5)' }, t);
  const show = (tl, sel, t) => tl.fromTo(sel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, t);
  // a lit lamp is never still: its flames flicker and its head sways
  const flicker = (tl, p, a, d) => {
    [['flame', '50% 100%'], ['flameL', '50% 100%'], ['flameR', '50% 100%']].forEach(([k, org], i) =>
      tl.fromTo(`#${p}${k}`, { scaleX: 1, scaleY: 1 }, { scaleX: 0.9, scaleY: 1.08, smoothOrigin: false, transformOrigin: org, duration: 0.3 + i * 0.05, yoyo: true, repeat: Math.max(1, Math.floor(d / (0.3 + i * 0.05))), ease: 'sine.inOut' }, a));
    swing(tl, `#${p}headNod`, '50% 100%', a, d, 2, 1.0);
  };
  const unlit = (tl, p, t) => tl.set([`#${p}flame`, `#${p}flameL`, `#${p}flameR`, `#${p}halo`], { opacity: 0 }, t);
  const light = (tl, p, t) => {
    tl.set(`#${p}halo`, { opacity: 0 }, t);
    pop(tl, `#${p}flame`, t, 0.5);
    tl.to(`#${p}halo`, { opacity: 1, duration: 0.6 }, t + 0.2);
    pop(tl, `#${p}flameL`, t + 0.35, 0.3); pop(tl, `#${p}flameR`, t + 0.45, 0.3);
  };
  const KSKIN = '#E9B68A';
  const nmArms = `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${KSKIN}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const namaste = (tl, id, on, t) => { tl.set([`#${id}-aL`, `#${id}-aR`], { opacity: on ? 0 : 1 }, t); tl.set(`#${id}-nm`, { opacity: on ? 1 : 0 }, t); };
  const flower = (c) => `${[...Array(6)].map((_, k) => `<ellipse rx="9" ry="16" cy="-11" transform="rotate(${k * 60})" fill="${c}" stroke="${O}" stroke-width="3"/>`).join('')}<circle r="7" fill="#FFC93C" stroke="${O}" stroke-width="2"/>`;
  const sparkle = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -22 Q4 -4 22 0 Q4 4 0 22 Q-4 4 -22 0 Q-4 -4 0 -22Z" fill="#FFF3B0" stroke="${O}" stroke-width="3"/>`;

  // ---------- 0: Deepa Jyoti Parabrahma: the light of the lamp is the Supreme God ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#FFE3A8', '#FFF6E0')}${floor()}
    <g id="z0dark">${bg('g0d', '#1E1838', '#3A2C5A')}<path d="M-20 450 Q500 430 1020 450 V560 H-20Z" fill="#3B2A3E" stroke="${O}" stroke-width="6"/>${stars([[120, 80], [880, 70], [930, 160]], 10)}</g>
    ${DEEP('z0d', 330, 530, 0.62)}
    ${KID('z0k', 760, 288, 0.5, { mood: 'sd', flip: true })}
    <g id="z0om" opacity="0">${glow('gl0', '#FFF3B0')}<circle cx="760" cy="105" r="95" fill="url(#gl0)"/>${tx('ఓం', 760, 135, 92, '#FF8C1A', 8)}</g>
    ${label('పరబ్రహ్మ', 580, 60, 'z0t', 46)}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0om', '#z0t'], { opacity: 0 }, a);
    tl.set('#z0dark', { opacity: 1 }, a);
    unlit(tl, 'z0d', a);
    face(tl, 'z0k', 'sd', a);
    // before: a dark night, the lamp is not lit and the child shivers
    tl.fromTo('#z0k', { x: -4 }, { x: 4, duration: 0.15, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.15)), ease: 'none' }, a);
    // meaning: the lamp lights up, darkness goes, and the Supreme (Om) shines in its light
    light(tl, 'z0d', r - 0.3);
    tl.to('#z0dark', { opacity: 0, duration: 0.8, ease: 'power1.out' }, r);
    flicker(tl, 'z0d', r + 0.3, Math.max(0.6, b - r - 0.3));
    face(tl, 'z0k', 'sm', r + 0.5);
    pop(tl, '#z0om', r + 0.6, 0.5, '50% 50%');
    tl.to('#z0om', { scale: 1.08, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 1.2) / 0.6)), ease: 'sine.inOut' }, r + 1.1);
    show(tl, '#z0t', r + 0.9);
  };

  // ---------- 1: Deepa Jyoti Janardhana: the light of the lamp is Lord Vishnu ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFD9A0', '#FFF4DC')}${floor()}
    ${DEEP('z1d', 210, 530, 0.55)}
    <g id="z1ball" opacity="0">${glow('gl1b', '#FFF3B0')}<circle cx="210" cy="170" r="60" fill="url(#gl1b)"/></g>
    <g id="z1V" opacity="0">${glow('gl1v', '#FFF3B0')}<circle cx="700" cy="300" r="250" fill="url(#gl1v)"/>${VISH('z1v', 700, 520, 0.6)}</g>
    ${label('జనార్దనుడు', 700, 60, 'z1t', 48)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1V', '#z1t', '#z1ball'], { opacity: 0 }, a);
    tl.set('#z1ball', { x: 0, y: 0, scale: 1 }, a);
    flicker(tl, 'z1d', a, Math.max(0.6, b - a));
    // before: a ball of light rises from the flame and floats across
    tl.to('#z1ball', { opacity: 1, duration: 0.3 }, a + 0.2);
    tl.to('#z1ball', { x: 490, y: 110, scale: 2.2, smoothOrigin: false, transformOrigin: '50% 50%', duration: Math.max(0.6, r - a - 0.3), ease: 'sine.inOut' }, a + 0.3);
    // meaning: the light becomes Lord Vishnu, who blesses
    tl.to('#z1ball', { opacity: 0, duration: 0.3 }, r);
    pop(tl, '#z1V', r - 0.05, 0.6);
    swing(tl, '#z1vheadNod', '50% 100%', r + 0.6, Math.max(0.6, b - r - 0.6), 3, 0.9);
    swing(tl, '#z1varmBless', '30% 90%', r + 0.6, Math.max(0.6, b - r - 0.6), 6, 0.5);
    show(tl, '#z1t', r + 0.5);
  };

  // ---------- 2: Deepo Haratu Me Paapam: may this lamp take away all that is bad in me ----------
  const bads = [['కోపం', 560, 150], ['అబద్ధం', 880, 170], ['బద్ధకం', 900, 360]];
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#5E4A7A', '#B79BC9')}${floor('#8A6A7A')}
    <g id="z2lit" opacity="0">${bg('g2l', '#FFE3A8', '#FFF6E0')}${floor()}</g>
    ${DEEP('z2d', 210, 530, 0.55)}
    <g id="z2beam" opacity="0"><path d="M300 200 L720 90 L720 470 Z" fill="#FFF1A8" opacity=".75"/></g>
    ${KID('z2k', 720, 288, 0.5, { mood: 'sd', flip: true })}
    ${bads.map(([w, x, y], k) => `<g id="z2b${k}"><g class="z2bob">${P('', x, y, 0.55, demonIn(['#6B3FA0', '#4A4458', '#3D5A80'][k]))}${tx(w, x, y + 75, 30, '#FF8C8C', 6)}</g></g>`).join('')}
    <g id="z2sp" opacity="0">${sparkle(620, 140)}${sparkle(840, 260, 0.8)}${sparkle(650, 420, 0.7)}</g>
    ${label('చెడు పోయింది!', 760, 60, 'z2t', 46)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2lit', '#z2beam', '#z2sp', '#z2t'], { opacity: 0 }, a);
    bads.forEach((_, k) => tl.set(`#z2b${k}`, { opacity: 1, scale: 1 }, a));
    face(tl, 'z2k', 'sd', a);
    flicker(tl, 'z2d', a, Math.max(0.6, b - a));
    // before: grumpy blobs of bad habits bob around the sad child
    document.querySelectorAll('#sc2 .z2bob').forEach((e, k) => tl.fromTo(e, { y: -10 }, { y: 10, duration: 0.5 + k * 0.1, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / (0.5 + k * 0.1))), ease: 'sine.inOut' }, a));
    // meaning: the lamp shines on him and the bad things shrink away one by one
    tl.fromTo('#z2beam', { opacity: 0 }, { opacity: 1, duration: 0.4 }, r - 0.2);
    bads.forEach((_, k) => tl.to(`#z2b${k}`, { opacity: 0, scale: 0.1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.in(2)' }, r + 0.15 + k * 0.3));
    tl.to('#z2lit', { opacity: 1, duration: 0.8 }, r + 0.9);
    tl.to('#z2beam', { opacity: 0, duration: 0.5 }, r + 1.3);
    face(tl, 'z2k', 'sm', r + 1.0);
    pop(tl, '#z2sp', r + 1.1, 0.4, '50% 50%');
    show(tl, '#z2t', r + 1.2);
  };

  // ---------- 3: Deepa Jyoti Namostute: O light of the lamp, I bow to you ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFD9A0', '#FFF4DC')}${floor()}
    ${DEEP('z3d', 330, 530, 0.62)}
    <g id="z3kw">${KID('z3k', 720, 288, 0.5, { mood: 'sm', flip: true, extra: `<g id="z3k-nm" opacity="0">${nmArms}</g>` })}</g>
    <g id="z3fl" opacity="0">${[...Array(7)].map((_, k) => `<g class="z3f">${P('', 170 + k * 55, -30 - (k % 3) * 40, 1, flower(['#FF8FB1', '#FF9F1C', '#FFD23F', '#E63946'][k % 4]))}</g>`).join('')}</g>
    ${label('నమోస్తుతే', 780, 120, 'z3t', 52)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3t', '#z3fl', '#z3k-nm'], { opacity: 0 }, a);
    tl.set(['#z3k-aL', '#z3k-aR'], { opacity: 1 }, a);
    tl.set('#z3kw', { x: 160, rotation: 0 }, a);
    tl.set('.z3f', { y: 0 }, a);
    flicker(tl, 'z3d', a, Math.max(0.6, b - a));
    // before: the child walks up to the lamp
    tl.to('#z3kw', { x: 0, duration: Math.max(0.5, r - a - 0.2), ease: 'sine.inOut' }, a);
    // meaning: the child folds hands and bows; flowers fall and the lamp glows brighter
    namaste(tl, 'z3k', true, r);
    tl.to('#z3kw', { rotation: -22, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut' }, r + 0.2);
    tl.to('#z3dhalo', { scale: 1.12, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.4) / 0.6)), ease: 'sine.inOut' }, r + 0.4);
    tl.set('#z3fl', { opacity: 1 }, r + 0.3);
    document.querySelectorAll('#sc3 .z3f').forEach((e, k) => tl.to(e, { y: 300 + (k % 3) * 30, duration: Math.max(1, b - r - 0.6), ease: 'none' }, r + 0.3 + k * 0.05));
    show(tl, '#z3t', r + 0.5);
  };

  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts };
})();
