// Saraswati Namastubhyam: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 Saraswati, I bow to you: we see a child standing by the river before Saraswati on her lotus, then the child folds hands and bows, and petals shower down as she glows.
// 1 giver of boons, who takes any form: we see the child wishing with empty hands, then a shining gift floats from Saraswati into the child's hands; then she turns into her swan and back.
// 2 I am beginning my studies: we see a closed book and a blank slate in front of the child, then the book opens and the child writes the first letters అ ఆ ఇ on the slate.
// 3 bless me with success, always: we see a worried child before a test paper full of question marks, then Saraswati's light turns each one into a tick and a gold medal lands on the child, while the sun and moon go round.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// GRAW is the hero drawing (template/characters/saraswati.svg), injected by build_sar.sh.
const SC = (() => {
  const { P, cloud, tx, SH, KID, O, GD, RD, check, book, lotus } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const river = (y) => `<path d="M-20 ${y} Q250 ${y - 18} 500 ${y} Q750 ${y + 18} 1020 ${y} V560 H-20Z" fill="#5DB7DE" stroke="${O}" stroke-width="6"/><path d="M80 ${y + 40} q30 -12 60 0 M380 ${y + 60} q30 -12 60 0 M700 ${y + 34} q30 -12 60 0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" class="drift"/>`;
  // Saraswati from the hero drawing, ids prefixed so they never clash with the hero; her seat sits at (x, y).
  const SAR = (p, x, y, s, swan = true) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}swan"`, `id="${p}swan"${swan ? '' : ' display="none"'}`)}</g>`);
  // a white swan, Saraswati's own vahana, facing right; body centre at (0, 0)
  const swanArt = `<path d="M-90 10 Q-100 -40 -40 -30 Q10 -24 40 -4 Q70 20 40 44 Q-20 66 -70 44 Q-96 30 -90 10Z" fill="#fff" stroke="${O}" stroke-width="6"/>
    <path d="M-60 0 Q-20 -30 20 4 Q-10 20 -60 0Z" fill="#EAF2FF" stroke="${O}" stroke-width="4"/>
    <path d="M30 0 Q60 -20 50 -70 Q42 -110 70 -116 Q96 -118 98 -96" fill="none" stroke="${O}" stroke-width="26" stroke-linecap="round"/>
    <path d="M30 0 Q60 -20 50 -70 Q42 -110 70 -116 Q96 -118 98 -96" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
    <path d="M96 -102 L128 -94 L98 -86Z" fill="#FF9F1C" stroke="${O}" stroke-width="4"/><circle cx="80" cy="-104" r="5" fill="${O}"/>`;
  // a child's folded hands (namaste), drawn in the figure's own coordinates; shown instead of the arms
  const nmArms = (skin) => `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${skin}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${skin}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${skin}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const KSKIN = '#E9B68A';
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  // the change must happen inside the scene even when it is short (sung finale ~4 s) or long (line ~9 s)
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: d, ease: 'back.out(2.5)' }, t);
  // the veena strums and her head nods a little, so Saraswati is never still
  const play = (tl, p, a, d) => {
    swing(tl, `#${p}armStrum`, '20% 10%', a, d, 6, 0.35);
    swing(tl, `#${p}headNod`, '50% 90%', a, d, 3, 0.9);
  };

  // ---------- 0: Saraswati Namastubhyam: I bow to you ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#BFE6FF', '#FFF1C9')}${glow('gl0', '#FFF3B0')}
    ${cloud(150, 80, 0.5)}${cloud(520, 60, 0.4)}
    <path d="M-20 330 Q300 280 620 320 Q860 290 1020 310 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    ${river(440)}${lotus(90, 500, 0.35)}${lotus(930, 505, 0.3)}
    <g id="w0gl" opacity="0.3"><circle cx="700" cy="250" r="230" fill="url(#gl0)"/></g>
    <g id="w0s">${SAR('w0', 700, 480, 0.55)}</g>
    <g id="w0kw"><g id="w0kb">${KID('w0k', 270, 300, 0.5, { mood: 'sm', extra: `<g id="w0k-nm" opacity="0">${nmArms(KSKIN)}</g>` })}</g></g>
    <g id="w0t" opacity="0">${tx('నమస్తే', 270, 110, 52, '#FFD23F', 8)}</g>
    ${[...Array(10)].map((_, i) => `<g id="w0p${i}" opacity="0">${P('', 140 + i * 60, -30, 0.9, SH.petal)}</g>`).join('')}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#w0t', '#w0k-nm'], { opacity: 0 }, a); tl.set(['#w0k-aL', '#w0k-aR'], { opacity: 1 }, a); tl.set('#w0gl', { opacity: 0.3 }, a);
    face(tl, 'w0k', 'sm', a);
    play(tl, 'w0', a, b - a);
    // the child walks up to Saraswati
    tl.fromTo('#w0kw', { x: -120 }, { x: 0, duration: Math.min(1.2, r - a - 0.2), ease: 'power1.out' }, a);
    // meaning: hands fold, the child bows, she glows and petals shower down
    tl.set(['#w0k-aL', '#w0k-aR'], { opacity: 0 }, r); tl.set('#w0k-nm', { opacity: 1 }, r);
    tl.to('#w0kb', { rotation: 12, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'power2.out' }, r + 0.1);
    tl.to('#w0kb', { rotation: 0, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'power2.inOut' }, r + 1.3);
    tl.to('#w0gl', { opacity: 1, duration: 0.6 }, r + 0.2);
    tl.fromTo('#w0t', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + 0.3);
    for (let i = 0; i < 10; i++) {
      const t = r + 0.3 + (i % 5) * 0.12;
      tl.fromTo(`#w0p${i}`, { opacity: 1, y: 0, rotation: 0 }, { y: 420 + (i % 3) * 30, rotation: 180, smoothOrigin: false, transformOrigin: '50% 50%', duration: 1.8, ease: 'power1.in' }, t);
    }
  };

  // ---------- 1: Varade Kamarupini: giver of boons, who takes any form ----------
  const gift = `<rect x="-40" y="-30" width="80" height="64" rx="6" fill="${RD}" stroke="${O}" stroke-width="6"/><rect x="-8" y="-30" width="16" height="64" fill="#FFD23F" stroke="${O}" stroke-width="4"/><rect x="-46" y="-42" width="92" height="20" rx="5" fill="${RD}" stroke="${O}" stroke-width="5"/><path d="M0 -42 Q-30 -76 -36 -48 Q-30 -40 0 -42 Q30 -76 36 -48 Q30 -40 0 -42Z" fill="#FFD23F" stroke="${O}" stroke-width="4"/>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#E8D7FF', '#FFD6E8')}${glow('gl1', '#FFF3B0')}
    ${cloud(860, 70, 0.45)}
    <path d="M-20 420 Q250 400 500 420 Q750 440 1020 410 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    <g id="w1gl" opacity="0.35"><circle cx="660" cy="250" r="220" fill="url(#gl1)"/></g>
    <g id="w1s">${SAR('w1', 660, 470, 0.52, false)}</g>
    <g id="w1sw" opacity="0"><g transform="translate(660 340) scale(1.6)">${swanArt}</g></g>
    <g id="w1kw">${KID('w1k', 210, 300, 0.5, { mood: 'op' })}</g>
    <g id="w1th">${P('', 340, 110, 0.7, ST.thought(56, tx('?', 0, 20, 64, '#7A2E0B', 0)))}</g>
    <g id="w1g" opacity="0">${P('', 0, 0, 0.9, `<circle r="70" fill="url(#gl1)"/>${gift}`)}</g>
    <g id="w1t" opacity="0">${tx('వరదే', 440, 500, 48, '#FFD23F', 8)}</g>
    <g id="w1t2" opacity="0">${tx('కామరూపిణి', 700, 520, 46, '#FFD23F', 8)}</g>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<g id="w1k${i}" opacity="0">${P('', 660 + Math.cos(i / 8 * 6.283) * 130, 290 + Math.sin(i / 8 * 6.283) * 130, 0.9, SH.spark)}</g>`).join('')}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#w1g', '#w1t', '#w1t2', '#w1sw'], { opacity: 0 }, a); tl.set(['#w1s', '#w1th'], { opacity: 1 }, a); tl.set('#w1gl', { opacity: 0.35 }, a);
    face(tl, 'w1k', 'op', a);
    play(tl, 'w1', a, b - a);
    // the child wishes with empty hands held out
    tl.fromTo('#w1k-aL', { rotation: 0 }, { rotation: 40, svgOrigin: '-56 60', duration: 0.5 }, a + 0.2);
    tl.fromTo('#w1k-aR', { rotation: 0 }, { rotation: -40, svgOrigin: '56 60', duration: 0.5 }, a + 0.2);
    tl.fromTo('#w1th', { scale: 0.9 }, { scale: 1.05, smoothOrigin: false, transformOrigin: '0% 100%', duration: 0.4, yoyo: true, repeat: 3 }, a + 0.2);
    // meaning: a shining gift floats from Saraswati into the child's hands
    tl.to('#w1gl', { opacity: 1, duration: 0.4 }, r - 0.3);
    tl.to('#w1th', { opacity: 0, duration: 0.2 }, r);
    tl.fromTo('#w1g', { opacity: 0, x: 660, y: 200, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3 }, r);
    tl.to('#w1g', { x: 210, y: 380, duration: 0.9, ease: 'power1.inOut' }, r + 0.2);
    tl.fromTo('#w1g', { rotation: -8 }, { rotation: 8, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 2 }, r + 0.2);
    face(tl, 'w1k', 'sm', r + 1.1);
    tl.fromTo('#w1kw', { y: 0 }, { y: -16, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, r + 1.1);
    tl.fromTo('#w1t', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + 0.5);
    // "takes any form": a sparkle, and Saraswati becomes her swan, then herself again
    const f = r + 1.6, back = Math.min(b - 0.5, f + 1.6);
    if (f < b - 0.4) {
      for (let i = 0; i < 8; i++) pop(tl, `#w1k${i}`, f - 0.2 + i * 0.03, 0.3);
      for (let i = 0; i < 8; i++) tl.to(`#w1k${i}`, { opacity: 0, duration: 0.3 }, f + 0.4);
      tl.to('#w1s', { opacity: 0, duration: 0.25 }, f);
      tl.fromTo('#w1sw', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, f + 0.1);
      swing(tl, '#w1sw', '50% 100%', f + 0.5, Math.max(0.6, back - f - 0.6), 4, 0.5);
      tl.fromTo('#w1t2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, f + 0.2);
      tl.to('#w1sw', { opacity: 0, duration: 0.25 }, back);
      tl.to('#w1s', { opacity: 1, duration: 0.3 }, back + 0.05);
    }
  };

  // ---------- 2: Vidyarambham Karishyami: I am beginning my studies ----------
  const closedBook = `<rect x="-70" y="-24" width="140" height="48" rx="8" fill="#2E86DE" stroke="${O}" stroke-width="6"/><rect x="-52" y="-12" width="104" height="16" rx="4" fill="#FFD23F" stroke="${O}" stroke-width="4"/>`;
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#FFE9C7', '#FFD08A')}${glow('gl2', '#FFF3B0')}
    <rect x="-10" y="400" width="1020" height="160" fill="#C98B4E" stroke="${O}" stroke-width="6"/>
    <path d="M60 60 h120 v150 h-120Z M240 60 h120 v150 h-120Z" fill="#BFE6FF" stroke="${O}" stroke-width="6"/>
    <g id="w2gw"><circle cx="500" cy="115" r="105" fill="url(#gl2)"/>${SAR('w2', 500, 205, 0.22)}</g>
    <g id="w2kw">${KID('w2k', 330, 290, 0.5, { mood: 'sm', sit: true })}</g>
    <g transform="translate(200 470)"><g id="w2b0">${closedBook}</g><g id="w2b1" opacity="0"><g transform="scale(.8)">${book()}</g></g></g>
    <g transform="translate(680 330)">
      <rect x="-12" y="60" width="24" height="90" fill="#8B5E34" stroke="${O}" stroke-width="5"/>
      <rect x="-150" y="-100" width="300" height="180" rx="12" fill="#B07A45" stroke="${O}" stroke-width="7"/>
      <rect x="-130" y="-82" width="260" height="144" rx="6" fill="#2F3B35" stroke="${O}" stroke-width="5"/>
      <defs><clipPath id="w2clip"><rect id="w2wipe" x="-130" y="-82" width="0" height="144"/></clipPath></defs>
      <g clip-path="url(#w2clip)"><text x="-82" y="30" font-size="76" font-weight="800" font-family="Baloo Tammudu 2" fill="#FFFFFF" text-anchor="middle">అ</text>
        <text x="2" y="30" font-size="76" font-weight="800" font-family="Baloo Tammudu 2" fill="#FFFFFF" text-anchor="middle">ఆ</text>
        <text x="84" y="30" font-size="76" font-weight="800" font-family="Baloo Tammudu 2" fill="#FFFFFF" text-anchor="middle">ఇ</text></g>
      <g id="w2ch"><rect x="-140" y="-10" width="40" height="14" rx="5" fill="#fff" stroke="${O}" stroke-width="4" transform="rotate(-30 -120 -3)"/></g>
    </g>
    <g id="w2sp" opacity="0">${P('', 500, 140, 0.9, SH.spark)}</g>
    <g id="w2t" opacity="0">${tx('విద్యారంభం', 760, 90, 50, '#FFD23F', 8)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b), d = b - a;
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#w2b1', '#w2sp', '#w2t'], { opacity: 0 }, a); tl.set('#w2b0', { opacity: 1 }, a);
    tl.set('#w2wipe', { attr: { width: 0 } }, a); tl.set('#w2ch', { x: 0, y: 0 }, a);
    face(tl, 'w2k', 'sm', a);
    play(tl, 'w2', a, d);
    tl.fromTo('#w2gw', { scale: 1 }, { scale: 1.06, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.8, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.8)), ease: 'sine.inOut' }, a);
    // meaning: Saraswati's spark lands, the book opens and the first letters are written on the slate
    tl.fromTo('#w2sp', { opacity: 1, x: 0, y: 0 }, { x: -300, y: 320, duration: 0.4, ease: 'power1.in' }, r - 0.4);
    tl.set('#w2sp', { opacity: 0 }, r);
    tl.set('#w2b0', { opacity: 0 }, r);
    pop(tl, '#w2b1', r, 0.35);
    const wr = Math.max(0.9, Math.min(2.4, b - r - 0.5));
    tl.to('#w2wipe', { attr: { width: 260 }, duration: wr, ease: 'none' }, r + 0.3);
    tl.to('#w2ch', { x: 230, duration: wr, ease: 'none' }, r + 0.3);
    tl.fromTo('#w2ch', { y: 0 }, { y: -16, duration: 0.15, yoyo: true, repeat: Math.max(1, Math.floor(wr / 0.15)), ease: 'sine.inOut' }, r + 0.3);
    swing(tl, '#w2k-aR', '0% 0%', r + 0.3, wr, 10, 0.3);
    tl.fromTo('#w2t', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + 0.4);
  };

  // ---------- 3: Siddhirbhavatu Me Sada: bless me with success, always ----------
  const qm = `<circle r="30" fill="#FF6B6B" stroke="${O}" stroke-width="5"/>${tx('?', 0, 18, 50, '#fff', 0)}`;
  const medal = `<path d="M-30 -70 L-8 0 M30 -70 L8 0" stroke="${O}" stroke-width="20" stroke-linecap="round"/><path d="M-30 -70 L-8 0 M30 -70 L8 0" stroke="${RD}" stroke-width="10" stroke-linecap="round"/><circle cy="24" r="34" fill="${GD}" stroke="${O}" stroke-width="6"/><g transform="translate(0 24) scale(.9)">${SH.star5}</g>`;
  const sunSmall = `<circle r="34" fill="#FFC93C" stroke="${O}" stroke-width="5"/>${[...Array(8)].map((_, k) => `<path d="M0 -44 V-58" stroke="${O}" stroke-width="6" stroke-linecap="round" transform="rotate(${k * 45})"/>`).join('')}`;
  const moon = `<path d="M10 -36 A36 36 0 1 0 10 36 A28 28 0 1 1 10 -36Z" fill="#FFF3B0" stroke="${O}" stroke-width="5"/>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#BFE6FF', '#E8F7FF')}${glow('gl3', '#FFF3B0')}
    <rect id="w3nt" width="${W}" height="${H}" fill="#1E2A55" opacity="0"/>
    <g transform="translate(500 470)"><g id="w3sun"><g transform="translate(-440 0)">${sunSmall}</g><g transform="translate(440 0)" opacity=".95">${moon}</g></g></g>
    <rect x="-10" y="420" width="1020" height="140" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    <g id="w3gw" opacity="0.5"><circle cx="850" cy="120" r="100" fill="url(#gl3)"/>${SAR('w3', 850, 205, 0.2)}</g>
    <path id="w3ray" opacity="0" d="M820 170 L430 120 L430 420 Z" fill="#FFF3B0"/>
    <g transform="translate(560 270)"><rect x="-130" y="-160" width="260" height="320" rx="10" fill="#fff" stroke="${O}" stroke-width="7"/>
      ${[0, 1, 2].map(i => `<rect x="-100" y="${-118 + i * 95}" width="120" height="14" rx="7" fill="#B0B7C3"/><rect x="-100" y="${-94 + i * 95}" width="90" height="14" rx="7" fill="#B0B7C3"/>
      <g transform="translate(70 ${-100 + i * 95})"><g id="w3q${i}">${qm}</g><g id="w3c${i}" opacity="0">${check}</g></g>`).join('')}</g>
    <g id="w3kw">${KID('w3k', 220, 300, 0.5, { mood: 'sd' })}</g>
    <g id="w3m" opacity="0"><g transform="translate(220 350) scale(.7)">${medal}</g></g>
    <g id="w3t" opacity="0">${tx('సిద్ధి', 220, 110, 56, '#FFD23F', 8)}</g>
    ${[...Array(10)].map((_, i) => `<g id="w3f${i}" opacity="0">${P('', 120 + i * 85, -20, 1, i % 2 ? SH.conf : SH.conf2)}</g>`).join('')}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b), d = b - a;
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#w3ray', '#w3m', '#w3t', '#w3c0', '#w3c1', '#w3c2'], { opacity: 0 }, a); tl.set(['#w3q0', '#w3q1', '#w3q2'], { opacity: 1 }, a); tl.set('#w3gw', { opacity: 0.5 }, a);
    face(tl, 'w3k', 'sd', a);
    play(tl, 'w3', a, d);
    // "always": the sun goes over and the moon follows, day and night, round and round
    tl.fromTo('#w3sun', { rotation: 42 }, { rotation: 318, smoothOrigin: false, transformOrigin: '50% 50%', duration: d, ease: 'none' }, a);
    tl.fromTo('#w3nt', { opacity: 0 }, { opacity: 0.3, duration: d / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, a);
    // the worried child scratches the head
    tl.fromTo('#w3k-aR', { rotation: 0 }, { rotation: -130, svgOrigin: '56 60', duration: 0.4 }, a + 0.2);
    tl.to('#w3k-aR', { rotation: 0, svgOrigin: '56 60', duration: 0.3 }, r - 0.2);
    // meaning: Saraswati's light falls on the paper, every ? becomes a tick, a medal lands on the child
    tl.to('#w3gw', { opacity: 1, duration: 0.3 }, r - 0.3);
    tl.fromTo('#w3ray', { opacity: 0 }, { opacity: 0.6, duration: 0.3 }, r - 0.2);
    const step = Math.max(0.25, Math.min(0.6, (b - r - 1) / 4));
    [0, 1, 2].forEach(i => {
      tl.to(`#w3q${i}`, { opacity: 0, duration: 0.12 }, r + i * step);
      pop(tl, `#w3c${i}`, r + i * step, 0.3);
    });
    const md = r + 3 * step;
    tl.to('#w3ray', { opacity: 0, duration: 0.4 }, md + 0.3);
    face(tl, 'w3k', 'sm', md - 0.2);
    tl.fromTo('#w3m', { opacity: 0, y: -260 }, { opacity: 1, y: 0, duration: 0.5, ease: 'bounce.out' }, md);
    tl.fromTo('#w3t', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, md + 0.1);
    tl.fromTo(['#w3kw', '#w3m'], { y: 0 }, { y: -18, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, md + 0.55);
    for (let i = 0; i < 10; i++) tl.fromTo(`#w3f${i}`, { opacity: 1, y: 0, rotation: 0 }, { y: 480, rotation: 300, smoothOrigin: false, transformOrigin: '50% 50%', duration: 1.6, ease: 'power1.in' }, md + 0.2 + (i % 4) * 0.1);
  };

  // small idle life (clouds drift, water ripples) so no frame is ever still
  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
