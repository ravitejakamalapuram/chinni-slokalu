// Karpura Gauram: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 fair as camphor, compassion in person: camphor burns white on an aarti plate and a child sits crying; Lord Shiva appears, white as the camphor flame, blesses, and the child's tears stop and he smiles.
// 1 the essence of the world, wearing the king of snakes as a garland: Shiva glows above the turning Earth (its essence); a big cobra slithers up to him, and at the meaning moment it curls round his neck as his garland.
// 2 he always lives in the lotus of our heart: a child folds hands and a big heart opens from him with a closed lotus bud inside; the bud blooms and a little glowing Shiva sits in it.
// 3 I bow to Shiva together with Bhavani: Shiva sits alone on snowy Kailash; Mother Bhavani (Parvati) appears beside him, the child folds hands and bows, flowers fall.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// SRAW (template/characters/shiva.svg) and PRAW (durga.svg, used as Bhavani with her lion hidden) are injected by build_kar.sh with prefixed ids.
const SC = (() => {
  const { P, stars, tx, KID, lotus, heartP, globe, O } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const floor = (c = '#C98B5B') => `<path d="M-20 450 Q500 430 1020 450 V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const snow = `<path d="M-20 470 Q120 380 260 430 Q380 340 520 420 Q660 350 800 425 Q910 380 1020 440 V560 H-20Z" fill="#F4F8FF" stroke="${O}" stroke-width="6"/>`;
  const pre = (raw, p) => raw.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`);
  // Lord Shiva, ids prefixed; (x, y) is the bottom of his seat
  const SHV = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="#1B2340" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(SRAW, p)}</g>`);
  // Mother Bhavani (Parvati), ids prefixed; (x, y) is the bottom of her seat
  const BHV = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="#3A1408" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(PRAW, p)}</g>`);
  const label = (t, x, y, id, fs = 44) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFD23F', 8)}</g>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pulse = (tl, sel, a, d, k = 1.08, per = 0.6, org = '50% 50%') => tl.fromTo(sel, { scale: 1 }, { scale: k, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4, org = '50% 100%') => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: org, duration: d, ease: 'back.out(2.5)' }, t);
  const show = (tl, sel, t) => tl.fromTo(sel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, t);
  const blessing = (tl, p, a, d) => { swing(tl, `#${p}headNod`, '50% 100%', a, d, 3, 0.9); swing(tl, `#${p}armBless`, '30% 90%', a, d, 6, 0.5); };
  const KSKIN = '#E9B68A';
  const nmArms = `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${KSKIN}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const namaste = (tl, id, on, t) => { tl.set([`#${id}-aL`, `#${id}-aR`], { opacity: on ? 0 : 1 }, t); tl.set(`#${id}-nm`, { opacity: on ? 1 : 0 }, t); };
  const flower = (c) => `${[...Array(6)].map((_, k) => `<ellipse rx="9" ry="16" cy="-11" transform="rotate(${k * 60})" fill="${c}" stroke="${O}" stroke-width="3"/>`).join('')}<circle r="7" fill="#FFC93C" stroke="${O}" stroke-width="2"/>`;
  const sparkle = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -22 Q4 -4 22 0 Q4 4 0 22 Q-4 4 -22 0 Q-4 -4 0 -22Z" fill="#FFF3B0" stroke="${O}" stroke-width="3"/>`;
  // a brass aarti plate with a burning white camphor tablet; (x, y) is the plate's centre
  const camphor = (id, x, y, s) => P('', x, y, s, `<ellipse cx="0" cy="0" rx="110" ry="26" fill="#E0A526" stroke="${O}" stroke-width="6"/><ellipse cx="0" cy="-6" rx="80" ry="14" fill="#F4C64A" stroke="${O}" stroke-width="4"/>
    <rect x="-26" y="-34" width="52" height="28" rx="8" fill="#FFFFFF" stroke="${O}" stroke-width="5"/>
    <g id="${id}f">${glow(id + 'g', '#E8F4FF')}<circle cy="-90" r="80" fill="url(#${id}g)"/><path d="M0 -30 Q-38 -60 -14 -120 Q-4 -92 8 -100 Q4 -140 26 -168 Q36 -116 48 -96 Q52 -54 0 -30Z" fill="#FFFFFF" stroke="${O}" stroke-width="5"/><path d="M4 -38 Q-14 -62 2 -92 Q16 -70 24 -62 Q22 -42 4 -38Z" fill="#BFE3FF"/></g>`);
  // the king of snakes: a big friendly cobra, head at (0, 0)
  const cobra = `<path d="M150 70 Q110 30 70 70 Q30 110 -10 70 Q-30 40 -10 10" fill="none" stroke="${O}" stroke-width="34"/><path d="M150 70 Q110 30 70 70 Q30 110 -10 70 Q-30 40 -10 10" fill="none" stroke="#4CB963" stroke-width="22"/>
    <path d="M-40 -14 Q-38 -54 0 -60 Q38 -54 40 -14 Q20 6 0 6 Q-20 6 -40 -14Z" fill="#4CB963" stroke="${O}" stroke-width="5"/><ellipse cx="0" cy="-30" rx="14" ry="18" fill="#BFE8A8" stroke="none"/>
    <circle cx="-12" cy="-40" r="4.5" fill="${O}"/><circle cx="12" cy="-40" r="4.5" fill="${O}"/><path d="M0 6 l0 14 m0 0 l-7 8 m7 -8 l7 8" fill="none" stroke="#E63946" stroke-width="4"/>`;

  // ---------- 0: Karpura Gauram Karunavataram: fair as camphor, compassion in person ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#2E2A5E', '#6A5FA8')}${floor('#5A4B7A')}${stars([[90, 70], [930, 60], [880, 170], [160, 190]], 10)}
    ${camphor('z0c', 160, 470, 0.9)}
    <g id="z0S" opacity="0">${glow('gl0s', '#FFFFFF')}<circle cx="470" cy="290" r="250" fill="url(#gl0s)"/>${SHV('z0s', 470, 530, 0.56)}</g>
    <g id="z0bless" opacity="0"><path d="M560 300 L800 230 L800 380 Z" fill="#E8F4FF" opacity=".7"/></g>
    ${KID('z0k', 820, 288, 0.5, { mood: 'sd', flip: true })}
    <g id="z0tear"><path d="M790 205 Q782 222 790 230 Q798 222 790 205Z" fill="#7FD3FF" stroke="${O}" stroke-width="3"/><path d="M850 205 Q842 222 850 230 Q858 222 850 205Z" fill="#7FD3FF" stroke="${O}" stroke-width="3"/></g>
    <g id="z0sp" opacity="0">${sparkle(730, 150, 0.8)}${sparkle(920, 230, 0.7)}${sparkle(880, 110, 0.6)}</g>
    ${label('కర్పూర గౌరం', 470, 60, 'z0t1', 46)}
    ${label('కరుణామయుడు', 820, 60, 'z0t2', 42)}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0S', '#z0bless', '#z0sp', '#z0t1', '#z0t2'], { opacity: 0 }, a);
    tl.set('#z0tear', { opacity: 1, y: 0 }, a);
    face(tl, 'z0k', 'sd', a);
    // before: the camphor burns white and a child sits crying
    pulse(tl, '#z0cf', a, Math.max(0.6, b - a), 1.06, 0.3, '50% 100%');
    tl.fromTo('#z0tear', { y: 0 }, { y: 18, duration: 0.5, repeat: Math.max(1, Math.floor((r - a) / 0.5)), ease: 'power1.in' }, a);
    // meaning: Shiva appears, white as the camphor flame, and his kindness stops the child's tears
    pop(tl, '#z0S', r - 0.2, 0.6);
    show(tl, '#z0t1', r + 0.2);
    blessing(tl, 'z0s', r + 0.5, Math.max(0.6, b - r - 0.5));
    tl.fromTo('#z0bless', { opacity: 0 }, { opacity: 1, duration: 0.4 }, r + 0.6);
    tl.to('#z0tear', { opacity: 0, duration: 0.3 }, r + 0.9);
    face(tl, 'z0k', 'sm', r + 1.0);
    pop(tl, '#z0sp', r + 1.1, 0.4, '50% 50%');
    show(tl, '#z0t2', r + 1.2);
  };

  // ---------- 1: Samsara Saaram Bhujagendra Haaram: the essence of the world, wearing the king of snakes ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#7FB8F0', '#DDEBFF')}
    <g transform="translate(500 640) scale(1.1)"><g id="z1w">${globe('z1gl')}</g></g>
    <g id="z1S">${glow('gl1s', '#FFF8D6')}<circle cx="500" cy="250" r="230" fill="url(#gl1s)"/>${SHV('z1s', 500, 430, 0.48)}</g>
    <g transform="translate(880 470)"><g id="z1c"><g id="z1cw">${cobra}</g></g></g>
    ${label('సంసార సారం', 500, 60, 'z1t1', 44)}
    ${label('నాగ హారం', 830, 120, 'z1t2', 48)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1t1', '#z1t2'], { opacity: 0 }, a);
    tl.set(['#z1ssnake'], { opacity: 0 }, a);
    tl.set('#z1c', { opacity: 1, x: 0, y: 0, scale: 1 }, a);
    // before: the world turns below Shiva, its essence; a big cobra slithers up to him
    tl.fromTo('#z1w', { rotation: -10 }, { rotation: 10, smoothOrigin: false, transformOrigin: '50% 50%', duration: Math.max(1, b - a), ease: 'none' }, a);
    show(tl, '#z1t1', a + 0.3);
    swing(tl, '#z1sheadNod', '50% 100%', a, Math.max(0.6, b - a), 2, 1.0);
    tl.fromTo('#z1cw', { scaleY: 1 }, { scaleY: 0.85, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.25)), ease: 'sine.inOut' }, a);
    tl.to('#z1c', { x: -250, y: -50, duration: Math.max(0.5, r - a - 0.4), ease: 'sine.inOut' }, a + 0.2);
    // meaning: the cobra rises and curls round Shiva's neck as his garland
    tl.to('#z1c', { x: -360, y: -150, scale: 0.5, opacity: 0, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.5, ease: 'power1.in' }, r - 0.2);
    pop(tl, '#z1ssnake', r + 0.2, 0.5, '50% 50%');
    swing(tl, '#z1ssnakeHead', '0% 100%', r + 0.7, Math.max(0.6, b - r - 0.7), 10, 0.4);
    show(tl, '#z1t2', r + 0.5);
  };

  // ---------- 2: Sadaa Vasantam Hridayaravinde: he always lives in the lotus of our heart ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#FFD9E4', '#FFF4F7')}${floor('#E9A9B8')}
    ${KID('z2k', 190, 288, 0.5, { mood: 'sm', extra: `<g id="z2k-nm">${nmArms}</g>` })}
    <g id="z2dots"><circle cx="290" cy="300" r="10" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="330" cy="285" r="15" fill="#fff" stroke="${O}" stroke-width="4"/><circle cx="378" cy="270" r="20" fill="#fff" stroke="${O}" stroke-width="4"/></g>
    <g id="z2H">${P('', 640, 250, 2.9, heartP(1))}</g>
    <g id="z2bud">${P('', 640, 330, 1, `<path d="M0 0 Q-34 -40 0 -96 Q34 -40 0 0Z" fill="#FF8FB1" stroke="${O}" stroke-width="5"/><path d="M0 0 Q-16 -40 0 -96" fill="none" stroke="${O}" stroke-width="3"/><ellipse cx="0" cy="4" rx="56" ry="14" fill="#3FA34D" stroke="${O}" stroke-width="5"/>`)}</g>
    <g id="z2open" opacity="0">${lotus(640, 336, 1.1)}</g>
    <g id="z2S" opacity="0">${glow('gl2s', '#FFFFFF')}<circle cx="640" cy="240" r="110" fill="url(#gl2s)"/>${SHV('z2s', 640, 318, 0.24)}</g>
    <g id="z2sp" opacity="0">${sparkle(470, 130, 0.8)}${sparkle(820, 120, 0.8)}${sparkle(860, 380, 0.6)}</g>
    ${label('హృదయ కమలంలో', 640, 60, 'z2t', 46)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2open', '#z2S', '#z2sp', '#z2t'], { opacity: 0 }, a);
    tl.set('#z2bud', { opacity: 1 }, a);
    namaste(tl, 'z2k', true, a);
    // before: the child prays; his heart beats with a closed lotus bud inside
    pulse(tl, '#z2H', a, Math.max(0.6, b - a), 1.05, 0.45);
    swing(tl, '#z2bud', '50% 100%', a, Math.max(0.5, r - a), 4, 0.5);
    // meaning: the bud blooms and Shiva is seen sitting in the lotus of the heart
    tl.to('#z2bud', { opacity: 0, duration: 0.25 }, r);
    pop(tl, '#z2open', r, 0.5);
    pop(tl, '#z2S', r + 0.4, 0.6);
    blessing(tl, 'z2s', r + 1.0, Math.max(0.6, b - r - 1.0));
    pop(tl, '#z2sp', r + 0.9, 0.4, '50% 50%');
    show(tl, '#z2t', r + 0.6);
  };

  // ---------- 3: Bhavam Bhavani Sahitam Namami: I bow to Shiva together with Bhavani ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#9EC9F5', '#EAF4FF')}${snow}
    ${SHV('z3s', 330, 540, 0.5)}
    <g id="z3P" opacity="0">${BHV('z3p', 590, 540, 0.5)}</g>
    <g id="z3kw">${KID('z3k', 880, 300, 0.42, { mood: 'sm', flip: true, extra: `<g id="z3k-nm" opacity="0">${nmArms}</g>` })}</g>
    <g id="z3fl" opacity="0">${[...Array(8)].map((_, k) => `<g class="z3f">${P('', 140 + k * 70, -30 - (k % 3) * 40, 1, flower(['#FF8FB1', '#FF9F1C', '#FFD23F', '#E63946'][k % 4]))}</g>`).join('')}</g>
    ${label('భవానీ సహితం', 460, 60, 'z3t1', 44)}
    ${label('నమామి', 860, 110, 'z3t2', 50)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3P', '#z3t1', '#z3t2', '#z3fl', '#z3k-nm', '#z3plion'], { opacity: 0 }, a);
    tl.set(['#z3k-aL', '#z3k-aR'], { opacity: 1 }, a);
    tl.set('#z3kw', { rotation: 0 }, a);
    tl.set('.z3f', { y: 0 }, a);
    swing(tl, '#z3sheadNod', '50% 100%', a, Math.max(0.6, r - a), 2, 1.0);
    // before: Shiva sits alone on snowy Kailash
    // meaning: Mother Bhavani appears beside him, and the child bows to both; flowers fall
    pop(tl, '#z3P', r - 0.3, 0.6);
    show(tl, '#z3t1', r);
    blessing(tl, 'z3p', r + 0.5, Math.max(0.6, b - r - 0.5));
    namaste(tl, 'z3k', true, r + 0.5);
    tl.to('#z3kw', { rotation: -20, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut' }, r + 0.7);
    tl.set('#z3fl', { opacity: 1 }, r + 0.6);
    document.querySelectorAll('#sc3 .z3f').forEach((e, k) => tl.to(e, { y: 340 + (k % 3) * 30, duration: Math.max(1, b - r - 0.8), ease: 'none' }, r + 0.6 + k * 0.05));
    blessing(tl, 'z3s', r + 0.5, Math.max(0.6, b - r - 0.5));
    show(tl, '#z3t2', r + 0.9);
  };

  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts };
})();
