// Gayatri Mantra: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 Om, present in earth, sky and heavens: the world is three dark bands (earth, sky, heavens); a golden Om glows in the middle, then light fills the earth (flowers open), the sky (birds fly) and the heavens (stars shine), each named.
// 1 that most adorable Sun God: a child waits on a dark hill before dawn; Surya Deva rises from behind the hills, the sky turns golden, lotuses open and the child folds hands and smiles.
// 2 we meditate on that divine light: the child sits on a mat, eyes open and looking around; then the child closes eyes and folds hands, a beam of light comes down from Surya and the child glows.
// 3 may He guide our minds on the right path: the child stands at a fork, a dark thorny path and a dim path to a school, with a "?" above; Surya's ray lights the school path, the "?" becomes a bulb and the child walks that way.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// GRAW is the hero drawing (template/characters/surya.svg), injected by build_gay.sh.
const SC = (() => {
  const { P, cloud, stars, lotus, tree, tx, SH, KID, birdIn, palace, bulb, O, GD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  // Surya Deva from the hero drawing, ids prefixed so they never clash with the hero; centred on his sun face. Clouds, birds and cloud seat hidden.
  const SUN = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -260)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}seat"`, `id="${p}seat" display="none"`).replace(`id="${p}cloudA"`, `id="${p}cloudA" display="none"`).replace(`id="${p}cloudB"`, `id="${p}cloudB" display="none"`)}</g>`);
  const label = (t, x, y, id, fs = 44) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFD23F', 8)}</g>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const eyes = (tl, id, open, t) => { tl.set(`#${id}-eo`, { opacity: open ? 1 : 0 }, t); tl.set(`#${id}-ec`, { opacity: open ? 0 : 1 }, t); };
  // the change must happen inside the scene even when it is short (sung finale ~4 s) or long (line ~9 s)
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: d, ease: 'back.out(2.5)' }, t);
  // Surya's head nods gently so he is never still
  const alive = (tl, p, a, d) => swing(tl, `#${p}headNod`, '50% 50%', a, d, 4, 0.9);
  // folded hands (namaste) in the figure's own coordinates; shown instead of the arms
  const KSKIN = '#E9B68A';
  const nmArms = `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${KSKIN}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const namaste = (tl, id, on, t) => { tl.set([`#${id}-aL`, `#${id}-aR`], { opacity: on ? 0 : 1 }, t); tl.set(`#${id}-nm`, { opacity: on ? 1 : 0 }, t); };
  const flower = (c) => `${[...Array(6)].map((_, k) => `<ellipse rx="11" ry="20" cy="-14" transform="rotate(${k * 60})" fill="${c}" stroke="${O}" stroke-width="4"/>`).join('')}<circle r="9" fill="#FFC93C" stroke="${O}" stroke-width="3"/>`;

  // ---------- 0: Om Bhur Bhuvah Svah: God present in the earth, the sky and the heavens ----------
  const bands = [[0, 180, '#2B2A7A', '#4B3FA8'], [180, 360, '#7CC6F0', '#BEE6FA'], [360, 540, '#7CC46A', '#5FAE4E']];
  const s0 = `<g id="sc0" opacity="0">${bands.map(([y0, y1, c0, c1], i) => `<defs><linearGradient id="g0b${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs><rect x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="url(#g0b${i})"/>`).join('')}
    <g id="z0heav">${stars([[90, 50], [230, 120], [380, 40], [640, 60], [800, 130], [930, 50], [520, 140]], 13)}${palace(860, 150, 0.45, '#FFD23F')}</g>
    <g id="z0sky">${cloud(150, 250, 0.6, '#fff')}${cloud(820, 230, 0.55, '#fff')}${[0, 1, 2].map(i => `<g id="z0bd${i}">${P('', 260 + i * 70, 300 - (i % 2) * 30, 0.8, birdIn())}</g>`).join('')}</g>
    <g id="z0earth">${tree(110, 520, 0.42)}${tree(900, 520, 0.38)}${[0, 1, 2, 3, 4].map(i => `<g id="z0f${i}">${P('', 400 + i * 100, 500 - (i % 2) * 18, 0.9, `<path d="M0 0 V40" stroke="#2E7D32" stroke-width="7"/>${flower(['#FF8FB1', '#FF9F1C', '#E63946', '#FFD23F', '#B266FF'][i])}`)}</g>`).join('')}</g>
    <path d="M0 180 H${W} M0 360 H${W}" stroke="${O}" stroke-width="6"/>
    ${bands.map(([y0, y1], i) => `<rect id="z0d${i}" x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="#120A2A" opacity=".72"/>`).join('')}
    ${glow('gl0', '#FFF3B0')}
    <g id="z0om" opacity="0"><circle cx="500" cy="270" r="150" fill="url(#gl0)"/><circle cx="500" cy="270" r="74" fill="#FFD23F" stroke="${O}" stroke-width="7"/>${tx('ఓం', 500, 296, 70, '#C2410C', 0)}</g>
    ${label('స్వర్గం', 290, 110, 'z0l0', 42)}${label('ఆకాశం', 290, 290, 'z0l1', 42)}${label('భూమి', 290, 470, 'z0l2', 42)}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b), step = Math.max(0.25, Math.min(0.7, (b - 0.6 - r) / 3));
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0om', '#z0l0', '#z0l1', '#z0l2'], { opacity: 0 }, a);
    tl.set(['#z0d0', '#z0d1', '#z0d2'], { opacity: 0.72 }, a);
    tl.set([0, 1, 2, 3, 4].map(i => `#z0f${i}`), { scale: 0.2, smoothOrigin: false, transformOrigin: '50% 100%' }, a);
    // before: the whole world is dark and still; meaning: a golden Om glows, then earth, sky and heavens fill with light
    tl.fromTo('#z0om', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, r - 0.6);
    tl.to('#z0om', { scale: 1.08, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - r) / 0.6)), ease: 'sine.inOut' }, r);
    // earth: flowers open
    tl.to('#z0d2', { opacity: 0, duration: 0.4 }, r);
    for (let i = 0; i < 5; i++) tl.to(`#z0f${i}`, { scale: 1, duration: 0.35, ease: 'back.out(2.5)' }, r + 0.1 + i * 0.06);
    tl.fromTo('#z0l2', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)' }, r + 0.1);
    // sky: birds fly
    tl.to('#z0d1', { opacity: 0, duration: 0.4 }, r + step);
    for (let i = 0; i < 3; i++) tl.fromTo(`#z0bd${i}`, { x: 0, y: 0 }, { x: 260, y: -30, duration: Math.max(0.8, b - r - step), ease: 'none' }, r + step);
    tl.fromTo('#z0l1', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)' }, r + step + 0.1);
    // heavens: stars shine
    tl.to('#z0d0', { opacity: 0, duration: 0.4 }, r + 2 * step);
    tl.fromTo('#z0heav', { opacity: 0.6 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 3 }, r + 2 * step);
    tl.fromTo('#z0l0', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: 'back.out(2)' }, r + 2 * step + 0.1);
  };

  // ---------- 1: Tat Savitur Varenyam: that most adorable Sun God ----------
  const hill = (y, c) => `<path d="M-20 ${y} Q140 ${y - 110} 300 ${y - 20} Q480 ${y - 150} 660 ${y - 30} Q840 ${y - 120} 1020 ${y - 20} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFB347', '#FFE8A8')}${glow('gl1', '#FFF3B0')}
    <g id="z1sun"><circle cx="0" cy="0" r="1" fill="none"/>${P('', 500, 250, 1, `<circle r="230" fill="url(#gl1)"/>`)}${SUN('z1s', 500, 250, 0.38)}</g>
    ${hill(420, '#8C6BB1')}
    <path d="M-20 470 Q500 450 1020 470 V560 H-20Z" fill="#6FB35A" stroke="${O}" stroke-width="6"/>
    ${[0, 1].map(i => `<g id="z1lo${i}">${lotus([170, 830][i], 490, 0.5)}</g>`).join('')}
    ${KID('z1k', 300, 312, 0.42, { mood: 'op', flip: true, extra: `<g id="z1k-nm" opacity="0">${nmArms}</g>` })}
    <rect id="z1dk" width="${W}" height="${H}" fill="#1E1B4B" opacity=".7"/>
    <g id="z1st">${stars([[120, 60], [300, 110], [520, 50], [720, 100], [900, 70]], 11)}</g>
    ${label('సూర్య దేవుడు', 690, 520, 'z1t', 46)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1t', '#z1k-nm'], { opacity: 0 }, a);
    tl.set(['#z1k-aL', '#z1k-aR'], { opacity: 1 }, a);
    tl.set('#z1dk', { opacity: 0.7 }, a); tl.set('#z1st', { opacity: 1 }, a);
    tl.set(['#z1lo0', '#z1lo1'], { scale: 0.35, smoothOrigin: false, transformOrigin: '50% 100%' }, a);
    face(tl, 'z1k', 'op', a); eyes(tl, 'z1k', true, a);
    // before: night on the hill, the sun is hidden below the hills, the child waits
    tl.set('#z1sun', { y: 300 }, a);
    swing(tl, '#z1k', '50% 100%', a, Math.max(0.6, r - a), 3, 0.6);
    // meaning: Surya rises, the sky turns golden, lotuses open, the child folds hands and smiles
    tl.to('#z1sun', { y: 0, duration: 1.1, ease: 'power2.out' }, r - 0.5);
    tl.to('#z1dk', { opacity: 0, duration: 1.0 }, r - 0.3);
    tl.to('#z1st', { opacity: 0, duration: 0.6 }, r - 0.3);
    alive(tl, 'z1s', r, Math.max(0.6, b - r));
    tl.to(['#z1lo0', '#z1lo1'], { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, r + 0.3);
    namaste(tl, 'z1k', true, r + 0.5); face(tl, 'z1k', 'sm', r + 0.5);
    tl.fromTo('#z1t', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r + 0.6);
  };

  // ---------- 2: Bhargo Devasya Dhimahi: we meditate on that divine light ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#FFE7B8', '#FFC98A')}${glow('gl2', '#FFF3B0')}
    ${cloud(140, 90, 0.5)}${cloud(560, 70, 0.4)}
    ${SUN('z2s', 840, 110, 0.24)}
    <path d="M-20 430 Q500 400 1020 430 V560 H-20Z" fill="#E9B872" stroke="${O}" stroke-width="6"/>
    <g id="z2beam" opacity="0"><path d="M800 150 L560 330 L440 330 Z" fill="#FFF3B0" opacity=".75"/></g>
    <g id="z2aura" opacity="0"><circle cx="500" cy="330" r="170" fill="url(#gl2)"/></g>
    <ellipse cx="500" cy="440" rx="200" ry="34" fill="#C0392B" stroke="${O}" stroke-width="6"/><ellipse cx="500" cy="440" rx="160" ry="22" fill="none" stroke="#FFD23F" stroke-width="5"/>
    <g id="z2kw">${KID('z2k', 500, 300, 0.48, { mood: 'op', sit: true, extra: `<g id="z2k-nm" opacity="0">${nmArms}</g>` })}</g>
    ${[0, 1, 2, 3].map(i => `<g id="z2sp${i}" opacity="0">${P('', [380, 620, 430, 580][i], [220, 220, 330, 330][i], 0.9, SH.spark)}</g>`).join('')}
    ${label('ధ్యానం', 200, 520, 'z2t', 50)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2beam', '#z2aura', '#z2k-nm', '#z2t', '#z2sp0', '#z2sp1', '#z2sp2', '#z2sp3'], { opacity: 0 }, a);
    tl.set(['#z2k-aL', '#z2k-aR'], { opacity: 1 }, a);
    face(tl, 'z2k', 'op', a); eyes(tl, 'z2k', true, a);
    alive(tl, 'z2s', a, Math.max(0.6, b - a));
    // before: the child sits on the mat, eyes open, looking this way and that
    tl.fromTo('#z2kw', { x: -8 }, { x: 8, duration: 0.45, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.45)), ease: 'sine.inOut' }, a);
    // meaning: eyes close, hands fold, a beam of light comes down from Surya and the child glows
    tl.set('#z2kw', { x: 0 }, r);
    eyes(tl, 'z2k', false, r); face(tl, 'z2k', 'sm', r); namaste(tl, 'z2k', true, r);
    tl.fromTo('#z2beam', { opacity: 0 }, { opacity: 1, duration: 0.5 }, r + 0.2);
    tl.fromTo('#z2aura', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6, ease: 'power2.out' }, r + 0.4);
    for (let i = 0; i < 4; i++) tl.fromTo(`#z2sp${i}`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.6) / 0.4)) }, r + 0.6 + i * 0.15);
    tl.fromTo('#z2t', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r + 0.5);
  };

  // ---------- 3: Dhiyo Yo Nah Prachodayat: may He guide our minds on the right path ----------
  const thorn = (x, y, s) => P('', x, y, s, `<path d="M-60 0 Q-70 -60 -20 -80 Q10 -110 50 -70 Q80 -40 60 0Z" fill="#3B3B3B" stroke="${O}" stroke-width="6"/>${[[-40, -60], [0, -90], [40, -50], [-10, -40]].map(([a, c]) => `<path d="M${a} ${c} l-10 -16 l18 6Z" fill="#6E6E6E" stroke="${O}" stroke-width="3"/>`).join('')}`);
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#9ED8F5', '#E6F6FF')}${glow('gl3', '#FFF3B0')}
    ${SUN('z3s', 860, 90, 0.2)}
    <path d="M-20 300 Q500 270 1020 300 V560 H-20Z" fill="#7CC46A" stroke="${O}" stroke-width="6"/>
    <path d="M500 560 L470 420 Q380 340 160 330 L120 360 Q330 370 420 440 L440 560Z" fill="#9C8B7A" stroke="${O}" stroke-width="6"/>
    <path id="z3gp" d="M500 560 L530 420 Q620 340 820 320 L860 350 Q680 370 590 440 L570 560Z" fill="#C9B79C" stroke="${O}" stroke-width="6"/>
    <defs><linearGradient id="g3d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#120A2A" stop-opacity=".55"/><stop offset=".7" stop-color="#120A2A" stop-opacity=".4"/><stop offset="1" stop-color="#120A2A" stop-opacity="0"/></linearGradient></defs><rect id="z3dl" x="-20" y="285" width="520" height="275" fill="url(#g3d)"/>
    ${thorn(170, 330, 0.6)}${thorn(90, 380, 0.5)}
    ${palace(860, 300, 0.55, '#FFD23F')}
    <g id="z3sch">${tx('బడి', 860, 205, 34, '#fff', 6)}</g>
    <g id="z3ray" opacity="0"><path d="M840 120 L610 470 L760 320 Z" fill="#FFF3B0" opacity=".8"/><path id="z3gold" d="M500 560 L530 420 Q620 340 820 320 L860 350 Q680 370 590 440 L570 560Z" fill="#FFD23F" stroke="${O}" stroke-width="6"/></g>
    <g id="z3kw">${KID('z3k', 505, 360, 0.36, { mood: 'sd' })}</g>
    <g id="z3q">${P('', 505, 250, 1, `<circle r="34" fill="#fff" stroke="${O}" stroke-width="6"/>${tx('?', 0, 18, 50, '#E63946', 0, 'sans-serif')}`)}</g>
    <g id="z3b" opacity="0">${P('', 505, 250, 0.75, bulb)}</g>
    ${label('మంచి దారి', 300, 520, 'z3t', 50)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3ray', '#z3b', '#z3t'], { opacity: 0 }, a);
    tl.set('#z3q', { opacity: 1 }, a);
    tl.set(['#z3kw', '#z3q', '#z3b'], { x: 0, y: 0 }, a);
    face(tl, 'z3k', 'sd', a);
    alive(tl, 'z3s', a, Math.max(0.6, b - a));
    // before: the child stands at the fork, unsure which way, a "?" above
    swing(tl, '#z3q', '50% 50%', a, Math.max(0.6, r - a), 10, 0.4);
    tl.fromTo('#z3kw', { x: -6 }, { x: 6, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.5)), ease: 'sine.inOut' }, a);
    // meaning: Surya's ray lights the path to the school, the "?" becomes a bulb, the child smiles and walks that way
    tl.fromTo('#z3ray', { opacity: 0 }, { opacity: 1, duration: 0.5 }, r);
    tl.to('#z3q', { opacity: 0, duration: 0.2 }, r + 0.3);
    pop(tl, '#z3b', r + 0.35, 0.4);
    face(tl, 'z3k', 'sm', r + 0.35);
    const go = Math.max(0.8, b - r - 1.0);
    tl.to(['#z3kw', '#z3b'], { x: 150, y: -40, duration: go, ease: 'sine.inOut' }, r + 0.8);
    tl.fromTo('#z3t', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r + 0.5);
  };

  // small idle life (clouds drift) so no frame is ever still
  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
