// Sarva Mangala: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 O Mother, the goodness in all good things: a grey, dull home with unlit lamps and a sad child; Amma appears and everything turns auspicious: lamps light, a mango-leaf toran and a rangoli appear, flowers bloom, colour comes back, the child smiles.
// 1 kind one, who fulfils all our good wishes: a child dreams of a school book and his dry little plant; Amma blesses, the book lands in his hands, rain falls and the plant flowers, two ticks pop.
// 2 our refuge, O Gauri, wife of three-eyed Shiva: a storm with lightning, the child runs scared; Gauri appears, a dome of light shelters him, the storm clears, and three-eyed Shiva appears beside her.
// 3 O Narayani, I bow to you: Amma sits in her shrine with her lion; the child walks in, folds hands and bows, flowers fall.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// SRAW (template/characters/shiva.svg) and PRAW (durga.svg) are injected by build_sav.sh with prefixed ids.
const SC = (() => {
  const { P, stars, tx, KID, lotus, heartP, book, thought, check, diya, bigCloud, O } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const floor = (c = '#C98B5B') => `<path d="M-20 450 Q500 430 1020 450 V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const snow = `<path d="M-20 470 Q120 380 260 430 Q380 340 520 420 Q660 350 800 425 Q910 380 1020 440 V560 H-20Z" fill="#F4F8FF" stroke="${O}" stroke-width="6"/>`;
  const pre = (raw, p) => raw.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`);
  // Lord Shiva, ids prefixed; (x, y) is the bottom of his seat
  const SHV = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="#1B2340" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(SRAW, p)}</g>`);
  // Mother Durga / Gauri (durga.svg, with her lion), ids prefixed; (x, y) is the bottom of her seat
  const AMMA = (p, x, y, s) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="#3A1408" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${pre(PRAW, p)}</g>`);
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
  // a small house; its colour layer (#<id>col) fades in over a grey copy
  const house = (id, x, y, s) => P('', x, y, s, `<g><rect x="-120" y="-150" width="240" height="150" fill="#A9A9B0" stroke="${O}" stroke-width="6"/><path d="M-145 -150 L0 -250 L145 -150Z" fill="#8A8A92" stroke="${O}" stroke-width="6"/></g>
    <g id="${id}col" opacity="0"><rect x="-120" y="-150" width="240" height="150" fill="#FFD9A0" stroke="${O}" stroke-width="6"/><path d="M-145 -150 L0 -250 L145 -150Z" fill="#E2573B" stroke="${O}" stroke-width="6"/></g>
    <path d="M-34 0 V-96 Q0 -124 34 -96 V0Z" fill="#7A4A26" stroke="${O}" stroke-width="5"/><rect x="-96" y="-120" width="44" height="44" fill="#5D6B8A" stroke="${O}" stroke-width="5"/><rect x="52" y="-120" width="44" height="44" fill="#5D6B8A" stroke="${O}" stroke-width="5"/>
    <g id="${id}toran" opacity="0"><path d="M-60 -128 Q0 -104 60 -128" fill="none" stroke="${O}" stroke-width="4"/>${[-48, -24, 0, 24, 48].map((k, j) => `<path transform="translate(${k} ${-122 + Math.abs(k) * -0.12 + 8})" d="M0 0 Q-9 14 0 30 Q9 14 0 0Z" fill="${j % 2 ? '#FF9F1C' : '#3FA34D'}" stroke="${O}" stroke-width="3"/>`).join('')}</g>`);
  // a clay lamp; its flame group is <id>f
  const lamp = (id, x, y, s) => P('', x, y, s, `<path d="M-40 0 Q0 40 40 0 Z" fill="#C2410C" stroke="${O}" stroke-width="5"/><g id="${id}f" opacity="0"><path d="M0 -4 Q-14 -24 0 -50 Q14 -24 0 -4Z" fill="#FFB703" stroke="${O}" stroke-width="3"/></g>`);
  const rangoli = (id, x, y) => `<g id="${id}" opacity="0" transform="translate(${x} ${y}) scale(1 0.32)">${[0, 45, 90, 135].map(a => `<ellipse rx="22" ry="80" transform="rotate(${a})" fill="none" stroke="#E63946" stroke-width="10"/>`).join('')}<circle r="92" fill="none" stroke="#FFD23F" stroke-width="10"/><circle r="22" fill="#2EC4B6" stroke="${O}" stroke-width="5"/></g>`;
  // a potted plant: drooping sprout (<id>dry) that becomes a flowering plant (<id>grow)
  const plant = (id, x, y, s) => P('', x, y, s, `<path d="M-46 -60 H46 L34 0 H-34Z" fill="#C46A2B" stroke="${O}" stroke-width="5"/>
    <g id="${id}dry"><path d="M0 -60 Q4 -90 -24 -96" fill="none" stroke="#9C8B4A" stroke-width="7"/><path d="M-24 -96 q-16 4 -20 18 q16 -2 20 -18Z" fill="#B7A76A" stroke="${O}" stroke-width="3"/></g>
    <g id="${id}grow" opacity="0"><path d="M0 -60 V-190" stroke="#3FA34D" stroke-width="9"/>${[[-1, -110], [1, -140], [-1, -165]].map(([d, yy]) => `<path d="M0 ${yy} q${d * 40} -30 ${d * 60} -4 q${d * -30} 20 ${d * -60} 4Z" fill="#4CB963" stroke="${O}" stroke-width="4"/>`).join('')}<g transform="translate(0 -200)">${flower('#FF8FB1')}</g><g transform="translate(-50 -150) scale(.7)">${flower('#FFD23F')}</g><g transform="translate(50 -175) scale(.7)">${flower('#E63946')}</g></g>`);
  const bolt = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 L-30 70 L-6 70 L-26 140 L34 50 L8 50 L26 0Z" fill="#FFE34D" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>`;
  const rainLines = (id, x0, x1, y0, y1, n) => `<g id="${id}">${[...Array(n)].map((_, k) => { const x = x0 + (k * 97) % (x1 - x0), y = y0 + (k * 53) % (y1 - y0); return `<path d="M${x} ${y} l-10 30" stroke="#BFE3FF" stroke-width="5" stroke-linecap="round"/>`; }).join('')}</g>`;

  // ---------- 0: Sarva Mangala Maangalye: O Mother, the goodness in all good things ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0a', '#FFE7A8', '#FFC27A')}<g id="z0grey">${bg('g0b', '#8C8E99', '#C4C5CC')}</g>${floor('#B07A4E')}
    <g id="z0A" opacity="0">${glow('gl0a', '#FFF4C2')}<circle cx="250" cy="290" r="240" fill="url(#gl0a)"/>${AMMA('z0a', 250, 540, 0.5)}</g>
    ${house('z0h', 760, 450, 1)}
    ${rangoli('z0r', 760, 500)}
    ${lamp('z0l1', 560, 452, 0.8)}${lamp('z0l2', 960, 452, 0.8)}${lamp('z0l3', 640, 500, 0.7)}
    ${plant('z0p', 900, 520, 0.6)}
    ${KID('z0k', 520, 318, 0.45, { mood: 'sd', flip: true })}
    <g id="z0sp" opacity="0">${sparkle(620, 180, 0.8)}${sparkle(930, 150, 0.7)}${sparkle(460, 120, 0.6)}</g>
    ${label('సర్వ మంగళ', 250, 60, 'z0t1', 46)}
    ${label('అంతా శుభం!', 760, 60, 'z0t2', 44)}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0A', '#z0sp', '#z0t1', '#z0t2', '#z0hcol', '#z0htoran', '#z0r', '#z0l1f', '#z0l2f', '#z0l3f', '#z0pgrow'], { opacity: 0 }, a);
    tl.set(['#z0grey', '#z0pdry'], { opacity: 1 }, a);
    face(tl, 'z0k', 'sd', a);
    // before: a grey, dull home: lamps unlit, the plant dry, the child sad
    swing(tl, '#z0k-head', '50% 100%', a, Math.max(0.6, r - a), 3, 0.8);
    // meaning: Amma appears and every good thing comes: colour, lamps, toran, rangoli, flowers
    pop(tl, '#z0A', r - 0.3, 0.6);
    show(tl, '#z0t1', r);
    blessing(tl, 'z0a', r + 0.4, Math.max(0.6, b - r - 0.4));
    tl.to('#z0grey', { opacity: 0, duration: 0.8 }, r + 0.2);
    tl.to('#z0hcol', { opacity: 1, duration: 0.8 }, r + 0.2);
    ['#z0l1f', '#z0l2f', '#z0l3f'].forEach((s, k) => pop(tl, s, r + 0.5 + k * 0.15, 0.3));
    pop(tl, '#z0htoran', r + 0.8, 0.4, '50% 0%');
    tl.to('#z0r', { opacity: 1, duration: 0.5 }, r + 1.0);
    tl.set('#z0pdry', { opacity: 0 }, r + 1.0);
    pop(tl, '#z0pgrow', r + 1.0, 0.5);
    face(tl, 'z0k', 'sm', r + 0.9);
    pop(tl, '#z0sp', r + 1.2, 0.4, '50% 50%');
    show(tl, '#z0t2', r + 1.3);
  };

  // ---------- 1: Shive Sarvaartha Saadhike: kind one, who fulfils all our good wishes ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#BFE6FF', '#F2FAFF')}${floor('#9BC46A')}
    ${KID('z1k', 200, 300, 0.48, { mood: 'op' })}
    <g id="z1bub">${P('', 360, 120, 1, thought(85, `<g transform="translate(-34 -10) scale(.42)">${book()}</g><g transform="translate(40 18) scale(.36)"><path d="M-46 -60 H46 L34 0 H-34Z" fill="#C46A2B" stroke="${O}" stroke-width="8"/><path d="M0 -60 V-150" stroke="#3FA34D" stroke-width="10"/><g transform="translate(0 -160)">${flower('#FF8FB1')}</g></g>`))}</g>
    <g id="z1bk" opacity="0">${P('', 262, 330, 0.5, book())}</g>
    ${plant('z1p', 470, 450, 0.75)}
    <g id="z1cl" opacity="0">${bigCloud(470, 140, 0.4, '#E9F2FF')}${rainLines('z1rain', 400, 540, 190, 330, 10)}</g>
    <g id="z1A">${glow('gl1a', '#FFF4C2')}<circle cx="780" cy="290" r="230" fill="url(#gl1a)"/>${AMMA('z1a', 780, 540, 0.48)}</g>
    <g id="z1ray" opacity="0"><path d="M690 260 L300 230 L300 340 Z" fill="#FFF4C2" opacity=".6"/></g>
    <g id="z1ok1" opacity="0">${P('', 140, 170, 0.8, check)}</g><g id="z1ok2" opacity="0">${P('', 560, 260, 0.8, check)}</g>
    ${label('సర్వార్థ సాధికే', 500, 60, 'z1t1', 44)}
    ${label('కోరికలు తీరాయి!', 300, 520, 'z1t2', 40)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1bk', '#z1cl', '#z1ray', '#z1ok1', '#z1ok2', '#z1t1', '#z1t2', '#z1pgrow'], { opacity: 0 }, a);
    tl.set(['#z1bub', '#z1pdry'], { opacity: 1 }, a);
    face(tl, 'z1k', 'op', a);
    // before: the child wishes for a school book and for his dry plant to flower
    show(tl, '#z1t1', a + 0.3);
    pulse(tl, '#z1bub', a, Math.max(0.6, r - a), 1.05, 0.5);
    swing(tl, '#z1aheadNod', '50% 100%', a, Math.max(0.6, r - a), 2, 1.0);
    // meaning: Amma blesses; the book lands in his hands, rain falls and the plant flowers
    tl.fromTo('#z1ray', { opacity: 0 }, { opacity: 1, duration: 0.4 }, r - 0.2);
    blessing(tl, 'z1a', r, Math.max(0.6, b - r));
    tl.to('#z1bub', { opacity: 0, scale: 0.4, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3 }, r + 0.2);
    pop(tl, '#z1bk', r + 0.4, 0.5, '50% 50%');
    face(tl, 'z1k', 'sm', r + 0.5);
    tl.to('#z1cl', { opacity: 1, duration: 0.3 }, r + 0.5);
    tl.fromTo('#z1rain', { y: -20 }, { y: 20, duration: 0.3, repeat: 4, ease: 'none' }, r + 0.5);
    tl.to('#z1cl', { opacity: 0, duration: 0.3 }, r + 1.9);
    tl.set('#z1pdry', { opacity: 0 }, r + 1.0);
    pop(tl, '#z1pgrow', r + 1.0, 0.6);
    pop(tl, '#z1ok1', r + 0.9, 0.4, '50% 50%');
    pop(tl, '#z1ok2', r + 1.5, 0.4, '50% 50%');
    show(tl, '#z1t2', r + 1.2);
  };

  // ---------- 2: Sharanye Tryambake Gauri: our refuge, O Gauri, wife of three-eyed Shiva ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2a', '#BFE0FF', '#FFF2DC')}<g id="z2dark">${bg('g2b', '#2B2F4A', '#55607E')}</g>${floor('#7C8A6A')}
    <g id="z2storm">${bigCloud(200, 90, 0.5, '#6F7690')}${bigCloud(780, 70, 0.5, '#6F7690')}${rainLines('z2rain', 20, 990, 110, 430, 34)}<g id="z2bolt">${bolt(150, 130, 1)}${bolt(860, 110, 0.9)}</g></g>
    <g id="z2G" opacity="0">${glow('gl2g', '#FFF8D6')}<circle cx="470" cy="300" r="250" fill="url(#gl2g)"/>${AMMA('z2g', 470, 540, 0.5)}</g>
    <g id="z2dome" opacity="0"><path d="M150 455 Q150 160 470 140 Q790 160 790 455Z" fill="#FFF4C2" opacity=".35" stroke="#FFD23F" stroke-width="8"/></g>
    <g id="z2kw">${KID('z2k', 0, 318, 0.42, { mood: 'sd' })}</g>
    <g id="z2S" opacity="0">${SHV('z2s', 850, 540, 0.4)}</g>
    ${label('శరణ్యే గౌరి', 470, 60, 'z2t1', 46)}
    ${label('త్ర్యంబకుడు', 850, 230, 'z2t2', 36)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2G', '#z2dome', '#z2S', '#z2t1', '#z2t2', '#z2glion'], { opacity: 0 }, a);
    tl.set(['#z2dark', '#z2storm'], { opacity: 1 }, a);
    tl.set('#z2kw', { x: 60 }, a);
    face(tl, 'z2k', 'sd', a);
    // before: a storm with lightning; the child runs, scared
    tl.fromTo('#z2bolt', { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.35)), repeatDelay: 0.2 }, a);
    tl.fromTo('#z2rain', { y: -20 }, { y: 20, duration: 0.3, repeat: Math.max(1, Math.floor((r - a + 0.8) / 0.3)), ease: 'none' }, a);
    tl.to('#z2kw', { x: 250, duration: Math.max(0.5, r - a - 0.2), ease: 'sine.inOut' }, a);
    // meaning: Gauri appears, her light shelters him, the storm clears; three-eyed Shiva appears beside her
    pop(tl, '#z2G', r - 0.3, 0.6);
    show(tl, '#z2t1', r);
    tl.fromTo('#z2dome', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5 }, r + 0.1);
    blessing(tl, 'z2g', r + 0.4, Math.max(0.6, b - r - 0.4));
    tl.to(['#z2dark', '#z2storm'], { opacity: 0, duration: 0.8 }, r + 0.5);
    face(tl, 'z2k', 'sm', r + 0.7);
    pop(tl, '#z2S', r + 1.1, 0.6);
    blessing(tl, 'z2s', r + 1.6, Math.max(0.6, b - r - 1.6));
    show(tl, '#z2t2', r + 1.5);
  };

  // ---------- 3: Naaraayani Namostute: O Narayani, I bow to you ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFD3A1', '#FFF1D8')}${floor('#C98B5B')}
    <g transform="translate(380 0)"><path d="M-230 450 V170 Q0 20 230 170 V450" fill="#F2B33D" stroke="${O}" stroke-width="6"/><path d="M-190 450 V190 Q0 70 190 190 V450" fill="#FFE7B0" stroke="${O}" stroke-width="5"/></g>
    ${glow('gl3a', '#FFF4C2')}<circle cx="380" cy="300" r="200" fill="url(#gl3a)"/>${AMMA('z3a', 380, 540, 0.5)}
    <g id="z3kw">${KID('z3k', 0, 318, 0.42, { mood: 'sm', flip: true, extra: `<g id="z3k-nm" opacity="0">${nmArms}</g>` })}</g>
    <g id="z3fl" opacity="0">${[...Array(8)].map((_, k) => `<g class="z3f">${P('', 120 + k * 80, -30 - (k % 3) * 40, 1, flower(['#FF8FB1', '#FF9F1C', '#FFD23F', '#E63946'][k % 4]))}</g>`).join('')}</g>
    ${label('నారాయణి', 380, 60, 'z3t1', 48)}
    ${label('నమోస్తుతే', 840, 110, 'z3t2', 50)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3t1', '#z3t2', '#z3fl', '#z3k-nm'], { opacity: 0 }, a);
    tl.set(['#z3k-aL', '#z3k-aR'], { opacity: 1 }, a);
    tl.set('#z3kw', { x: 1080, rotation: 0 }, a);
    tl.set('.z3f', { y: 0 }, a);
    // before: Amma sits in her shrine with her lion; the child walks in
    show(tl, '#z3t1', a + 0.3);
    swing(tl, '#z3aheadNod', '50% 100%', a, Math.max(0.6, r - a), 2, 1.0);
    tl.to('#z3kw', { x: 800, duration: Math.max(0.5, r - a - 0.3), ease: 'sine.out' }, a);
    // meaning: the child folds hands and bows; flowers fall and Amma blesses
    namaste(tl, 'z3k', true, r);
    tl.to('#z3kw', { rotation: -18, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut' }, r + 0.2);
    tl.set('#z3fl', { opacity: 1 }, r + 0.3);
    document.querySelectorAll('#sc3 .z3f').forEach((e, k) => tl.to(e, { y: 340 + (k % 3) * 30, duration: Math.max(1, b - r - 0.6), ease: 'none' }, r + 0.3 + k * 0.05));
    blessing(tl, 'z3a', r + 0.4, Math.max(0.6, b - r - 0.4));
    show(tl, '#z3t2', r + 0.6);
  };

  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts };
})();
