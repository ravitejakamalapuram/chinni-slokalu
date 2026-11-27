// Karagre Vasate Lakshmih: one picture-story per line, drawn in a 1000x540 window (#vis). A child's big open palm sits in the
// middle; each line lights up one part of it and that part's deity appears beside it.
// 0 Karagre vasate Lakshmih: we see a sleepy child at dawn and a closed hand, then the hand opens, the fingertips glow gold, coins pop up and Lakshmi appears on her lotus.
// 1 Karamadhye Saraswati: we see the palm with a plain centre, then the light moves to the middle of the palm, a book opens there, music notes rise, Saraswati appears with her veena and the child's eyes open wide.
// 2 Karamule tu Govindah: we see the palm with a plain wrist, then the light moves to the base of the palm, a flute and a peacock feather appear there and Govinda (Krishna) appears and waves.
// 3 Prabhate karadarshanam: we see a dark bedroom window and a child in bed, then the sun rises in the window, the room fills with light, the child looks at both hands, smiles and jumps out of bed.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
const SC = (() => {
  const { P, stars, lotus, tx, SH, KID, LAKSHMI, DEVI, fig, book, O, GD, RD } = ST;
  const W = 1000, H = 540, BLUE = '#3B6FD8';
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glowDef = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".5" stop-color="${c}" stop-opacity=".6"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const eyes = (tl, id, open, t) => { tl.set(`#${id}-eo`, { opacity: open ? 1 : 0 }, t); tl.set(`#${id}-ec`, { opacity: open ? 0 : 1 }, t); };

  // a child's open right hand, palm facing us; (0,0) = centre of the palm. Fingertips near y -190, wrist near y +170.
  const SKN = '#F2C49B';
  const fingers = [[-72, -66, 112], [-26, -72, 140], [20, -70, 132], [64, -60, 104]];
  const palmIn = (pre) => `${fingers.map(([x, y, h]) => `<rect x="${x - 21}" y="${y - h}" width="42" height="${h + 30}" rx="21" fill="${SKN}" stroke="${O}" stroke-width="6"/>`).join('')}
    <path d="M-92 -10 Q-150 -40 -168 -96 Q-176 -124 -150 -128 Q-128 -128 -118 -96 Q-104 -60 -80 -50" fill="${SKN}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M-96 -70 Q-104 60 -70 112 L70 112 Q102 60 94 -70 Z" fill="${SKN}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M-66 104 L-62 190 L62 190 L66 104 Z" fill="${SKN}" stroke="${O}" stroke-width="6"/>
    <path d="M-80 180 L80 180 L84 236 L-84 236Z" fill="#FF8C1A" stroke="${O}" stroke-width="6"/>
    <path d="M-60 -10 Q0 20 54 -20 M-50 50 Q-10 30 30 70" stroke="#D99B6C" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g id="${pre}tip" opacity="0">${fingers.map(([x, y, h]) => `<circle cx="${x}" cy="${y - h + 12}" r="34" fill="url(#gTip)"/>`).join('')}</g>
    <g id="${pre}mid" opacity="0"><circle cx="0" cy="24" r="96" fill="url(#gMid)"/></g>
    <g id="${pre}base" opacity="0"><ellipse cx="0" cy="146" rx="96" ry="54" fill="url(#gBase)"/></g>`;
  const defs = glowDef('gTip', '#FFD23F') + glowDef('gMid', '#FFFFFF') + glowDef('gBase', '#7FB2FF') + glowDef('gSun', '#FFF3B0');
  const coin = (x, y, id) => `<g id="${id}" opacity="0">${P('', x, y, 1, `<circle r="20" fill="${GD}" stroke="${O}" stroke-width="5"/><circle r="11" fill="none" stroke="#E0A800" stroke-width="4"/>`)}</g>`;
  const note = (x, y, id) => `<g id="${id}" opacity="0">${P('', x, y, 1, `<path d="M0 0 V-46 L26 -54 V-10" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round"/><ellipse cx="-8" cy="2" rx="12" ry="9" fill="${O}"/><ellipse cx="18" cy="-8" rx="12" ry="9" fill="${O}"/>`)}</g>`;
  const veena = `<g transform="rotate(-30)"><circle cx="0" cy="110" r="46" fill="#B5651D" stroke="${O}" stroke-width="6"/><rect x="-10" y="-150" width="20" height="260" rx="8" fill="#8B4513" stroke="${O}" stroke-width="5"/><circle cx="0" cy="-150" r="26" fill="#B5651D" stroke="${O}" stroke-width="5"/>${[-4, 4].map(x => `<line x1="${x}" y1="-130" x2="${x}" y2="100" stroke="#FFF3B0" stroke-width="2"/>`).join('')}</g>`;
  const feather = (s = 1) => `<g transform="scale(${s})"><path d="M0 60 Q-4 0 0 -60" stroke="${O}" stroke-width="6" fill="none"/><ellipse cy="-50" rx="24" ry="42" fill="#2FA36B" stroke="${O}" stroke-width="5"/><ellipse cy="-44" rx="14" ry="24" fill="#2E86DE"/><ellipse cy="-42" rx="7" ry="12" fill="#1B2A6B"/></g>`;
  const fluteP = `<rect x="-110" y="-10" width="220" height="20" rx="10" fill="#A0622D" stroke="${O}" stroke-width="5"/>${[-40, -5, 30, 65].map(x => `<circle cx="${x}" r="4.5" fill="${O}"/>`).join('')}<rect x="-80" y="-12" width="12" height="24" fill="${GD}"/>`;
  const KRISHNA = (id, x, y, s) => fig({ id, x, y, s, skin: BLUE, cloth: '#FFC93C', top: BLUE, crown: 'mukut', extra: `<g transform="translate(26 -150) rotate(18)">${feather()}</g>` });
  const SARAS = (id, x, y, s) => DEVI(id, x, y, s, '#FFFFFF', '#FFC93C', { hold: 'book' });
  const window_ = (id, sky) => `<g transform="translate(560 40)"><rect width="300" height="220" fill="#8B5E34" stroke="${O}" stroke-width="6"/><rect x="16" y="16" width="268" height="188" fill="${sky}"/><g id="${id}"></g></g>`;
  const room = (id, wall) => `${bg(id, wall, '#E9C9A0')}<rect y="430" width="${W}" height="110" fill="#C98F5A" stroke="${O}" stroke-width="6"/>`;
  const bed = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-150" y="0" width="300" height="70" rx="12" fill="#8B5E34" stroke="${O}" stroke-width="6"/><rect x="-170" y="-90" width="26" height="170" rx="8" fill="#8B5E34" stroke="${O}" stroke-width="6"/><rect x="-136" y="-30" width="276" height="44" rx="18" fill="#7FB2FF" stroke="${O}" stroke-width="6"/><ellipse cx="-104" cy="-36" rx="42" ry="20" fill="#fff" stroke="${O}" stroke-width="5"/></g>`;
  const zzz = (id, x, y) => `<g id="${id}">${tx('Z', x, y, 40, '#fff', 6)}${tx('z', x + 34, y - 34, 30, '#fff', 5)}${tx('z', x + 60, y - 62, 24, '#fff', 4)}</g>`;
  const ray = (id, x1, y1, x2, y2, c) => `<line id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="10" stroke-linecap="round" stroke-dasharray="4 22" opacity="0"/>`;

  // ---------- 0: Karagre vasate Lakshmih ----------
  const s0 = `<g id="sc0" opacity="0">${defs}${room('g0', '#F6D7A7')}
    ${window_('h0win', '#FFB98A')}${P('', 710, 210, 0.22, ST.sunFace)}
    ${bed(150, 380)}<g id="h0kw">${KID('h0k', 150, 250, 0.36, { sit: true, eyes: 'closed', mood: 'sd' })}</g>${zzz('h0z', 220, 170)}
    <g transform="translate(470 310)"><g id="h0hand">${palmIn('h0')}</g></g>
    <g id="h0fist"><g transform="translate(470 330)"><circle r="96" fill="${SKN}" stroke="${O}" stroke-width="6"/>${[-54, -18, 18, 54].map(x => `<path d="M${x - 16} -70 Q${x} -96 ${x + 16} -70" fill="none" stroke="${O}" stroke-width="5"/>`).join('')}<path d="M-66 104 L-62 150 L62 150 L66 104 Z" fill="${SKN}" stroke="${O}" stroke-width="6"/><path d="M-80 140 L80 140 L84 196 L-84 196Z" fill="#FF8C1A" stroke="${O}" stroke-width="6"/></g></g>
    ${[[380, 70], [440, 46], [500, 56], [556, 86]].map(([x, y], i) => coin(x, y, 'h0c' + i)).join('')}
    ${ray('h0ray', 560, 140, 750, 220, '#FFD23F')}
    <g id="h0lak" opacity="0">${lotus(850, 470, 0.7)}${LAKSHMI('h0l', 850, 300, 0.4, { hold: 'abhaya' })}</g>
    <g id="h0dim"><rect width="${W}" height="${H}" fill="#1B2A6B" opacity=".55"/></g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set('#h0dim', { opacity: 1 }, a); tl.set('#h0hand', { opacity: 0, y: 60 }, a); tl.set('#h0fist', { opacity: 1 }, a);
    tl.set(['#h0tip', '#h0lak', '#h0ray', '#h0c0', '#h0c1', '#h0c2', '#h0c3'], { opacity: 0 }, a); tl.set('#h0z', { opacity: 1, y: 0 }, a);
    eyes(tl, 'h0k', false, a); face(tl, 'h0k', 'sd', a);
    tl.fromTo('#h0z', { y: 10 }, { y: -10, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.6)), ease: 'sine.inOut' }, a);
    tl.fromTo('#h0fist', { rotation: -3 }, { rotation: 3, transformOrigin: '470px 400px', duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.5)) }, a);
    // the hand opens and the fingertips light up gold
    tl.to('#h0z', { opacity: 0, duration: 0.3 }, r - 0.4);
    eyes(tl, 'h0k', true, r - 0.3); face(tl, 'h0k', 'op', r - 0.3);
    tl.to('#h0dim', { opacity: 0.25, duration: 0.8 }, r - 0.3);
    tl.to('#h0fist', { opacity: 0, duration: 0.25 }, r - 0.2);
    tl.to('#h0hand', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, r - 0.2);
    tl.fromTo('#h0tip', { opacity: 0 }, { opacity: 1, duration: 0.4 }, r + 0.2);
    tl.to('#h0tip', { opacity: 0.6, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.6) / 0.4)) }, r + 0.6);
    [0, 1, 2, 3].forEach(i => tl.fromTo(`#h0c${i}`, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(3)' }, r + 0.3 + i * 0.12));
    tl.to('#h0ray', { opacity: 1, duration: 0.3 }, r + 0.5);
    tl.fromTo('#h0lak', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, r + 0.5);
    face(tl, 'h0k', 'sm', r + 0.9);
  };

  // ---------- 1: Karamadhye Saraswati ----------
  const s1 = `<g id="sc1" opacity="0">${defs}${room('g1', '#F9E3BD')}
    ${window_('h1win', '#FFD39A')}${P('', 710, 180, 0.24, ST.sunFace)}
    ${bed(150, 380)}<g id="h1kw">${KID('h1k', 150, 250, 0.36, { sit: true, eyes: 'closed', mood: 'sd' })}</g>
    <g transform="translate(470 310)"><g id="h1hand">${palmIn('h1')}</g></g>
    <g id="h1book" opacity="0">${P('', 470, 334, 0.62, book('#2E86DE'))}</g>
    ${[[420, 250], [490, 210], [540, 260]].map(([x, y], i) => note(x, y, 'h1n' + i)).join('')}
    ${ray('h1ray', 570, 330, 740, 300, '#FFFFFF')}
    <g id="h1sar" opacity="0">${lotus(850, 470, 0.7)}<g transform="translate(790 330) scale(.42)">${veena}</g>${SARAS('h1s', 850, 300, 0.4)}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set('#h1tip', { opacity: 0.5 }, a); tl.set(['#h1mid', '#h1book', '#h1sar', '#h1ray', '#h1n0', '#h1n1', '#h1n2'], { opacity: 0 }, a);
    eyes(tl, 'h1k', false, a); face(tl, 'h1k', 'sd', a);
    tl.fromTo('#h1kw', { rotation: -3 }, { rotation: 3, transformOrigin: '150px 340px', duration: 0.7, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.7)), ease: 'sine.inOut' }, a);
    // the light slides from the fingertips into the middle of the palm; a book opens there and Saraswati plays
    tl.to('#h1tip', { opacity: 0, duration: 0.4 }, r - 0.2);
    tl.fromTo('#h1mid', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, r);
    tl.fromTo('#h1book', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, r + 0.2);
    [0, 1, 2].forEach(i => tl.fromTo(`#h1n${i}`, { opacity: 0, y: 40 }, { opacity: 1, y: -40, duration: 1.4, ease: 'sine.out' }, r + 0.6 + i * 0.25));
    tl.to('#h1ray', { opacity: 1, duration: 0.3 }, r + 0.4);
    tl.fromTo('#h1sar', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, r + 0.4);
    eyes(tl, 'h1k', true, r + 0.6); face(tl, 'h1k', 'op', r + 0.6); face(tl, 'h1k', 'sm', r + 1.3);
    tl.fromTo('#h1kw', { y: 0 }, { y: -14, duration: 0.25, yoyo: true, repeat: 1 }, r + 0.6);
  };

  // ---------- 2: Karamule tu Govindah ----------
  const s2 = `<g id="sc2" opacity="0">${defs}${room('g2', '#FBEACB')}
    ${window_('h2win', '#FFE6A8')}${P('', 710, 160, 0.26, ST.sunFace)}
    ${bed(150, 380)}<g id="h2kw">${KID('h2k', 150, 250, 0.36, { sit: true })}</g>
    <g transform="translate(470 270)"><g id="h2hand">${palmIn('h2')}</g></g>
    <g id="h2fl" opacity="0"><g transform="translate(470 420) rotate(-8) scale(.7)">${fluteP}</g></g>
    <g id="h2fe" opacity="0"><g transform="translate(560 400) rotate(30)">${feather(0.8)}</g></g>
    ${ray('h2ray', 580, 420, 750, 330, '#7FB2FF')}
    <g id="h2kr" opacity="0">${lotus(850, 470, 0.7)}${KRISHNA('h2g', 850, 300, 0.4)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set('#h2mid', { opacity: 0.5 }, a); tl.set(['#h2base', '#h2fl', '#h2fe', '#h2kr', '#h2ray'], { opacity: 0 }, a);
    face(tl, 'h2k', 'sm', a);
    tl.fromTo('#h2hand', { y: 0 }, { y: -6, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.6)), ease: 'sine.inOut' }, a);
    // the light slides down to the base of the palm; a flute and a peacock feather appear there and Govinda waves
    tl.to('#h2mid', { opacity: 0, duration: 0.4 }, r - 0.2);
    tl.fromTo('#h2base', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, r);
    tl.fromTo('#h2fl', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, ease: 'back.out(2)' }, r + 0.2);
    tl.fromTo('#h2fe', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', duration: 0.5, ease: 'back.out(3)' }, r + 0.35);
    tl.to('#h2ray', { opacity: 1, duration: 0.3 }, r + 0.4);
    tl.fromTo('#h2kr', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, r + 0.4);
    tl.fromTo('#h2g-aR', { rotation: 0 }, { rotation: -60, transformOrigin: '56px 60px', smoothOrigin: false, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 1.2) / 0.3)) }, r + 1.0);
    face(tl, 'h2k', 'op', r + 0.5); face(tl, 'h2k', 'sm', r + 1.2);
  };

  // ---------- 3: Prabhate karadarshanam ----------
  const smallPalm = (x, y, sx) => `<g transform="translate(${x} ${y}) scale(${sx * 0.32} 0.32)">${palmIn('x' + x)}</g>`;
  const s3 = `<g id="sc3" opacity="0">${defs}${room('g3', '#F7D9A9')}
    <g transform="translate(560 40)"><rect width="300" height="220" fill="#8B5E34" stroke="${O}" stroke-width="6"/><rect id="h3sky" x="16" y="16" width="268" height="188" fill="#1B2A6B"/>
      <g id="h3stars"><circle cx="70" cy="60" r="4" fill="#fff"/><circle cx="200" cy="50" r="3" fill="#fff"/><circle cx="240" cy="110" r="4" fill="#fff"/></g>
      <svg x="16" y="16" width="268" height="188"><g id="h3sun"><circle cx="134" cy="150" r="90" fill="url(#gSun)"/>${P('', 134, 150, 0.24, ST.sunFace)}</g>
      <path d="M0 170 Q70 140 134 160 Q200 140 268 165 V188 H0Z" fill="#6BBF59" stroke="${O}" stroke-width="4"/></svg>
      <line x1="150" y1="16" x2="150" y2="204" stroke="#8B5E34" stroke-width="8"/></g>
    <polygon id="h3beam" points="580,250 840,250 1000,540 380,540" fill="#FFF3B0" opacity="0"/>
    ${bed(200, 380)}
    <g id="h3kw"><g id="h3kin">${KID('h3k', 200, 250, 0.36, { sit: true, eyes: 'closed', mood: 'sd' })}</g></g>
    <g id="h3up" opacity="0"><g id="h3upin">${KID('h3u', 470, 300, 0.4, { mood: 'op' })}</g></g>
    <g id="h3hands" opacity="0">${smallPalm(150, 230, -1)}${smallPalm(250, 230, 1)}</g>
    <g id="h3dim"><rect width="${W}" height="${H}" fill="#1B2A6B" opacity=".6"/></g>
    ${[0, 1, 2, 3, 4].map(i => `<g id="h3s${i}" opacity="0">${P('', 380 + i * 110, 120 + (i % 2) * 60, 0.8, SH.spark)}</g>`).join('')}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set('#h3dim', { opacity: 1 }, a); tl.set('#h3sky', { fill: '#1B2A6B' }, a); tl.set('#h3sun', { y: 140 }, a); tl.set('#h3stars', { opacity: 1 }, a);
    tl.set(['#h3beam', '#h3hands'], { opacity: 0 }, a); tl.set('#h3kw', { x: 0, y: 0 }, a);
    eyes(tl, 'h3k', false, a); face(tl, 'h3k', 'sd', a);
    // dawn: the sun climbs into the window and the room fills with light
    tl.to('#h3sun', { y: 0, duration: 1.4, ease: 'power2.out' }, r - 0.6);
    tl.to('#h3sky', { fill: '#9ED8FF', duration: 1.2 }, r - 0.6);
    tl.to('#h3stars', { opacity: 0, duration: 0.6 }, r - 0.4);
    tl.to('#h3dim', { opacity: 0, duration: 1.0 }, r - 0.3);
    tl.to('#h3beam', { opacity: 0.45, duration: 0.8 }, r);
    // the child wakes, looks at both hands, smiles, then jumps out of bed
    eyes(tl, 'h3k', true, r); face(tl, 'h3k', 'op', r);
    tl.fromTo('#h3hands', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + 0.3);
    face(tl, 'h3k', 'sm', r + 0.7);
    [0, 1, 2, 3, 4].forEach(i => tl.fromTo(`#h3s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, r + 0.4 + i * 0.1));
    const j = Math.min(b - 0.9, r + 1.4);
    tl.set('#h3up', { opacity: 0 }, a);
    tl.to(['#h3hands', '#h3kw'], { opacity: 0, duration: 0.2 }, j - 0.1);
    tl.set('#h3up', { opacity: 1 }, j);
    tl.fromTo('#h3upin', { x: -240, y: -40 }, { x: 0, y: 0, duration: 0.6, ease: 'power1.inOut' }, j);
    tl.fromTo('#h3upin', { y: 0 }, { y: -50, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: Math.max(1, Math.floor((b - j - 0.7) / 0.25)) }, j + 0.6);
    tl.set('#h3kw', { opacity: 1 }, a);
  };

  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.flick').forEach(c => tl.fromTo(c, { scaleY: 0.88 }, { scaleY: 1.12, transformOrigin: '50% 100%', duration: 0.2, yoyo: true, repeat: Math.floor(d / 0.2) }, a));
    sc.querySelectorAll('.spinR').forEach(c => tl.fromTo(c, { rotation: 0 }, { rotation: 25, transformOrigin: '50% 50%', duration: d, ease: 'none' }, a));
    sc.querySelectorAll('.twk').forEach((c, k) => tl.fromTo(c, { opacity: 0.4 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: Math.floor(d / 0.5) }, a + k * 0.1));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
