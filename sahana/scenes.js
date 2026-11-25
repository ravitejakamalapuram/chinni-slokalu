// Om Sahana Vavatu: one picture-story per line in the 1000x540 window (#vis). Guru (SAGE) and student (KID) do everything together.
// SC.act[i](tl, a, m, b): a = scene start, m = meaning moment, b = scene end. Beats use fractions of (b - a) so they fit both the
// line-by-line clips and the shorter sung lines.
const SC = (() => {
  const { P, cloud, stars, tree, lotus, tx, book, boulder, birdIn, muscle, SH, KID, SAGE, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const hut = (x, y, s) => P('', x, y, s, `<rect x="-90" y="-80" width="180" height="120" fill="#E9C48A" stroke="${O}" stroke-width="6"/><path d="M-120 -70 L0 -170 L120 -70Z" fill="#C9973F" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><path d="M-100 -90 L0 -160 M100 -90 L0 -160" stroke="#8A5A1F" stroke-width="4"/><rect x="-26" y="-30" width="52" height="70" rx="20" fill="#7A4A26" stroke="${O}" stroke-width="5"/>`);
  const leafPlate = (id, x, y) => `<g id="${id}" opacity="0">${P('', x, y, 1, `<path d="M-90 10 Q-60 -26 0 -24 Q70 -22 96 8 Q60 30 0 28 Q-60 30 -90 10Z" fill="#4CAF50" stroke="${O}" stroke-width="5"/><path d="M-84 8 H90" stroke="#2E7D32" stroke-width="3"/><ellipse cx="-20" cy="-6" rx="34" ry="18" fill="#FFFDF4" stroke="${O}" stroke-width="4"/><circle cx="30" cy="-10" r="14" fill="#FFB703" stroke="${O}" stroke-width="4"/><circle cx="56" cy="-4" r="11" fill="#FFB703" stroke="${O}" stroke-width="4"/><path d="M-70 4 q10 -14 22 0" fill="#E85D04" stroke="${O}" stroke-width="3"/>`)}</g>`;
  const arm = (tl, id, side, at, n, deg = -70) => tl.fromTo(`#${id}-a${side}`, { rotation: 0 }, { rotation: side === 'R' ? deg : -deg, svgOrigin: `${side === 'R' ? 56 : -56} 60`, duration: 0.35, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, at);
  const mood = (tl, id, m, at) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === m ? 1 : 0 }, at));
  const bob = (tl, id, a, b, d = 0.5, y = -8) => tl.fromTo(`#${id}`, { y: 0 }, { y, duration: d, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / d) - 1), ease: 'sine.inOut' }, a);

  // ---------- 0: Om saha navavatu, saha nau bhunaktu: God protects both of us, and feeds both of us ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#BFD9F2', '#E8F2FF')}<g id="s0dark">${bg('g0d', '#5C6580', '#8E97AE')}</g>
    ${hut(150, 400, 0.9)}${tree(880, 430, 0.75)}${grass(440, '#7CC46A')}
    <g id="s0dome" opacity="0"><path d="M150 450 Q150 70 500 70 Q850 70 850 450" fill="#FFF3B0" fill-opacity=".55" stroke="#FFD23F" stroke-width="10"/>${tx('ॐ', 500, 150, 70, '#FF8C1A', 8)}</g>
    <g id="s0rain">${[...Array(14)].map((_, i) => `<g id="s0r${i}" opacity="0">${P('', 0, 0, 0.9, SH.drop)}</g>`).join('')}</g>
    <g id="s0cl">${[[230, 60, 1.1], [520, 40, 1.2], [800, 70, 1.1]].map(([x, y, s], i) => `<g id="s0c${i}">${ST.cloud(x, y, s, '#6D6A80')}</g>`).join('')}</g>
    ${SAGE('s0g', 360, 205, 0.62, { sit: true, hold: '', mood: 'sd' })}
    ${KID('s0k', 650, 255, 0.5, { sit: true, mood: 'sd', flip: true })}
    ${leafPlate('s0p1', 360, 440)}${leafPlate('s0p2', 650, 450)}
    <g id="s0h">${[0, 1, 2].map(i => `<g id="s0h${i}" opacity="0">${P('', 420 + i * 80, 210, 1.1, SH.heart)}</g>`).join('')}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const L = b - a, f = k => a + L * k;
    tl.set('#sc0', { opacity: 1 }, a); tl.set('#s0dark', { opacity: 1 }, a); tl.set('#s0dome', { opacity: 0 }, a);
    ['s0p1', 's0p2'].forEach(i => tl.set('#' + i, { opacity: 0 }, a));
    mood(tl, 's0g', 'sd', a); mood(tl, 's0k', 'sd', a);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s0c${i}`, { x: 0, opacity: 1 }, { x: i % 2 ? -16 : 16, duration: 0.7, yoyo: true, repeat: 3, ease: 'sine.inOut' }, a);
    // rain falls on the two of them...
    for (let i = 0; i < 14; i++) {
      const x = 180 + (i * 53) % 660, t = a + 0.1 + (i % 7) * 0.12;
      tl.fromTo(`#s0r${i}`, { x, y: 100, opacity: 1 }, { y: 470, duration: 0.6, repeat: Math.max(0, Math.floor(L * 0.16 / 0.6) - 1), ease: 'none' }, t);
      // ...until the golden dome of protection appears: drops slide off it
      tl.fromTo(`#s0r${i}`, { x, y: 40, opacity: 1 }, { x: x < 500 ? x - 260 : x + 260, y: 300, duration: 0.7, repeat: 2, ease: 'power1.in' }, f(0.16) + (i % 7) * 0.1);
      tl.set(`#s0r${i}`, { opacity: 0 }, f(0.38));
    }
    tl.fromTo('#s0dome', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', duration: 0.5, ease: 'back.out(2)' }, f(0.12));
    tl.to('#s0k', { x: 80, duration: 0.5 }, f(0.14));
    mood(tl, 's0g', 'sm', f(0.18)); mood(tl, 's0k', 'sm', f(0.18));
    for (let i = 0; i < 3; i++) tl.to(`#s0c${i}`, { x: i ? 700 : -700, opacity: 0, duration: 0.8, ease: 'power2.in' }, f(0.36));
    tl.to('#s0dark', { opacity: 0, duration: 0.8 }, f(0.36));
    // ...and food: two leaf plates, both eat together
    tl.fromTo('#s0p1', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, f(0.34));
    tl.fromTo('#s0p2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, f(0.38));
    const n = Math.max(2, Math.floor(L * 0.5 / 0.7));
    arm(tl, 's0g', 'L', f(0.44), n, -95); arm(tl, 's0k', 'L', f(0.46), n, -95);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s0h${i}`, { opacity: 0, scale: 0, y: 0 }, { opacity: 1, scale: 1, y: -40, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(3)' }, f(0.6) + i * 0.25);
  };

  // ---------- 1: Saha veeryam karavavahai: we work together with strength ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFE7B8', '#FFF6E0')}${cloud(160, 90, 0.6)}${cloud(820, 70, 0.5)}${grass(450, '#8BCB5E')}
    <g id="s1tree" opacity="0">${tree(820, 450, 0.9)}</g>
    <g id="s1sap">${P('', 820, 450, 1, `<path d="M0 0 V-50" stroke="#3E8E41" stroke-width="8"/><g transform="translate(-14 -44)">${SH.leaf}</g><g transform="translate(14 -54) scale(-1 1)">${SH.leaf}</g>`)}</g>
    <g id="s1rock">${P('', 600, 360, 0.95, boulder)}</g>
    ${KID('s1k', 450, 240, 0.5, { mood: 'op' })}
    ${SAGE('s1g', 160, 185, 0.58, { hold: '', mood: 'sm' })}
    <g id="s1sw">${[0, 1, 2].map(i => `<g id="s1s${i}" opacity="0">${P('', 450 + i * 22, 120 - i * 18, 0.8, SH.drop)}</g>`).join('')}</g>
    <g id="s1mus" opacity="0">${P('', 300, 90, 0.9, muscle)}${P('', 700, 90, 0.9, `<g transform="scale(-1 1)">${muscle}</g>`)}${tx('బలం!', 500, 110, 58, '#FF8C1A', 9)}</g>
    <g id="s1st">${[[640, 220], [900, 200], [760, 120]].map(([x, y], i) => `<g id="s1t${i}" opacity="0">${P('', x, y, 1.2, SH.star5)}</g>`).join('')}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const L = b - a, f = k => a + L * k;
    tl.set('#sc1', { opacity: 1 }, a); tl.set('#s1tree', { opacity: 0 }, a); tl.set('#s1sap', { opacity: 1 }, a); tl.set('#s1mus', { opacity: 0 }, a);
    tl.set('#s1rock', { x: 0, rotation: 0, opacity: 1 }, a); tl.set('#s1g', { x: 0 }, a); tl.set('#s1k', { x: 0 }, a);
    mood(tl, 's1k', 'op', a);
    // the kid alone pushes the big rock: it does not move
    tl.fromTo('#s1k', { x: 0 }, { x: 14, duration: 0.15, yoyo: true, repeat: Math.max(3, Math.floor(L * 0.2 / 0.15)), ease: 'none' }, a + 0.1);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s1s${i}`, { opacity: 0, y: 0 }, { opacity: 1, y: 30, duration: 0.5 }, a + 0.4 + i * 0.2).to(`#s1s${i}`, { opacity: 0, duration: 0.2 }, f(0.25));
    mood(tl, 's1k', 'sd', f(0.12));
    // the guru comes to help; together they push
    tl.to('#s1g', { x: 380, duration: 0.7, ease: 'power1.inOut' }, f(0.2));
    mood(tl, 's1k', 'sm', f(0.3));
    tl.fromTo('#s1g', { y: 0 }, { y: -6, duration: 0.18, yoyo: true, repeat: 5, ease: 'none' }, f(0.3));
    // the rock rolls away
    tl.to('#s1rock', { x: 520, rotation: 200, svgOrigin: '600 360', duration: 1.2, ease: 'power2.in' }, f(0.38));
    tl.to('#s1k', { x: 300, duration: 0.8 }, f(0.38)); tl.to('#s1g', { x: 640, duration: 0.8 }, f(0.4));
    tl.fromTo('#s1mus', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, f(0.45));
    tl.to('#s1mus', { opacity: 0, duration: 0.3 }, f(0.68));
    // and the little plant they cleared the way for grows into a big tree
    tl.to('#s1sap', { opacity: 0, duration: 0.3 }, f(0.62));
    tl.fromTo('#s1tree', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.6)' }, f(0.62));
    arm(tl, 's1k', 'R', f(0.7), 2, -110); arm(tl, 's1g', 'R', f(0.72), 2, -110);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s1t${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, f(0.75) + i * 0.15);
  };

  // ---------- 2: Tejasvi navadhitamastu: what we learn together shines bright ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#3A3570', '#6B5BA8')}<g id="s2day" opacity="0">${bg('g2b', '#FFF3C4', '#FFD08A')}</g>
    ${stars([[90, 70], [210, 140], [800, 60], [930, 150], [600, 40]], 9)}${grass(460, '#6E8F5A')}
    <g id="s2rays" opacity="0">${[...Array(12)].map((_, k) => `<path d="M500 250 L${500 + Math.cos(k * 0.5236) * 700} ${250 + Math.sin(k * 0.5236) * 700} L${500 + Math.cos(k * 0.5236 + 0.18) * 700} ${250 + Math.sin(k * 0.5236 + 0.18) * 700}Z" fill="#FFF3B0" opacity=".55"/>`).join('')}</g>
    <g id="s2lamp">${P('', 500, 430, 0.8, `<ellipse rx="60" ry="22" fill="${GD}" stroke="${O}" stroke-width="5"/><path d="M0 -20 Q-16 -50 0 -80 Q16 -50 0 -20Z" fill="#FF8C1A" stroke="${O}" stroke-width="4"/>`)}</g>
    ${SAGE('s2g', 260, 205, 0.6, { sit: true, hold: '' })}
    ${KID('s2k', 740, 255, 0.5, { sit: true, flip: true, mood: 'op' })}
    <g id="s2book">${P('', 500, 330, 1.0, book())}</g>
    <g id="s2let">${['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ'].map((c, i) => `<g id="s2l${i}" opacity="0">${tx(c, 500, 330, 52, ['#FFD23F', '#7FD0FF', '#FF8FB1', '#B6FF6B', '#FFB703'][i], 7)}</g>`).join('')}</g>
    <g id="s2sun" opacity="0">${P('', 500, 200, 1, `<circle r="70" fill="#FFE066" stroke="${O}" stroke-width="6"/><circle cx="-22" cy="-8" r="7" fill="${O}"/><circle cx="22" cy="-8" r="7" fill="${O}"/><path d="M-26 18 Q0 40 26 18" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/>`)}</g>
    <g id="s2aura" opacity="0"><circle cx="260" cy="240" r="130" fill="#FFF3B0" opacity=".5"/><circle cx="740" cy="270" r="110" fill="#FFF3B0" opacity=".5"/></g>
    <g id="s2label" opacity="0">${tx('వెలుగు!', 500, 90, 58, '#FF8C1A', 9)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const L = b - a, f = k => a + L * k;
    tl.set('#sc2', { opacity: 1 }, a); ['s2day', 's2rays', 's2sun', 's2aura', 's2label'].forEach(i => tl.set('#' + i, { opacity: 0 }, a));
    mood(tl, 's2k', 'op', a);
    // the guru reads from the book, letters float out to the kid
    arm(tl, 's2g', 'R', a + 0.2, 2, -40);
    for (let i = 0; i < 5; i++) tl.fromTo(`#s2l${i}`, { opacity: 0, x: 0, y: 0, scale: 0.4 }, { opacity: 1, x: 170 + (i % 2) * 40, y: -130 - i * 22, scale: 1, transformOrigin: '50% 50%', duration: 0.9, ease: 'power1.out' }, a + 0.3 + i * L * 0.06).to(`#s2l${i}`, { opacity: 0, duration: 0.3 }, f(0.45) + i * 0.05);
    mood(tl, 's2k', 'sm', f(0.25));
    tl.fromTo('#s2book', { y: 0 }, { y: -8, duration: 0.4, yoyo: true, repeat: 3 }, a + 0.2);
    // the learning lights up like a sun: both glow
    tl.fromTo('#s2sun', { opacity: 0, scale: 0.2, y: 120 }, { opacity: 1, scale: 1, y: 0, transformOrigin: '50% 50%', duration: 0.9, ease: 'back.out(1.8)' }, f(0.42));
    tl.to('#s2day', { opacity: 1, duration: 0.9 }, f(0.45));
    tl.fromTo('#s2rays', { opacity: 0, rotation: 0 }, { opacity: 1, rotation: 30, svgOrigin: '500 250', duration: L * 0.5, ease: 'none' }, f(0.45));
    tl.fromTo('#s2aura', { opacity: 0 }, { opacity: 1, duration: 0.6, yoyo: true, repeat: 3 }, f(0.55));
    tl.fromTo('#s2label', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, f(0.6));
    arm(tl, 's2k', 'R', f(0.65), 2, -120);
  };

  // ---------- 3: Ma vidvishavahai, Om shanti shanti shanti: no anger between us; peace everywhere ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#BDE8F5', '#F2FBFF')}<g id="s3gold" opacity="0">${bg('g3b', '#FFF6D8', '#FFDDA8')}</g>
    ${cloud(150, 80, 0.6)}${cloud(860, 110, 0.55)}${grass(450, '#8BCB5E')}${lotus(120, 470, 0.6)}${lotus(880, 470, 0.6)}
    ${SAGE('s3g', 250, 185, 0.58, { hold: '', mood: 'sm' })}
    ${KID('s3k', 750, 240, 0.5, { mood: 'sd', flip: true })}
    <g id="s3storm" opacity="0">${ST.cloud(500, 140, 0.9, '#5B5470')}${P('', 500, 210, 1, SH.bolt)}</g>
    <g id="s3hearts">${[0, 1, 2, 3].map(i => `<g id="s3h${i}" opacity="0">${P('', 500, 160, 1, SH.heart)}</g>`).join('')}</g>
    <g id="s3birds">${[0, 1, 2].map(i => `<g id="s3b${i}" opacity="0">${P('', 0, 0, 1.1, birdIn('#fff'))}</g>`).join('')}</g>
    <g id="s3sh">${[0, 1, 2].map(i => `<g id="s3s${i}" opacity="0">${tx('శాంతి', 290 + i * 230, 100 + (i === 1 ? -20 : 0), 54, '#2EC4B6', 9)}</g>`).join('')}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    const L = b - a, f = k => a + L * k;
    tl.set('#sc3', { opacity: 1 }, a); ['s3gold', 's3storm'].forEach(i => tl.set('#' + i, { opacity: 0 }, a));
    tl.set('#s3g', { x: 0 }, a); tl.set('#s3k', { x: 0 }, a);
    mood(tl, 's3k', 'sd', a); mood(tl, 's3g', 'sd', a);
    // a little angry storm cloud between them...
    tl.fromTo('#s3storm', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, a + 0.1);
    tl.fromTo('#s3storm', { x: 0 }, { x: 10, duration: 0.1, yoyo: true, repeat: 7, ease: 'none' }, a + 0.5);
    tl.to('#s3g', { x: -60, duration: 0.3 }, a + 0.2); tl.to('#s3k', { x: -60, duration: 0.3 }, a + 0.2);
    // ...melts into hearts, and they come together, smiling
    tl.to('#s3storm', { opacity: 0, scale: 0.2, duration: 0.4 }, f(0.14));
    for (let i = 0; i < 4; i++) tl.fromTo(`#s3h${i}`, { opacity: 0, x: 0, y: 0, scale: 0.3 }, { opacity: 1, x: (i - 1.5) * 90, y: -60 - (i % 2) * 30, scale: 1.1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, f(0.15) + i * 0.1).to(`#s3h${i}`, { opacity: 0, duration: 0.4 }, f(0.5));
    mood(tl, 's3k', 'sm', f(0.17)); mood(tl, 's3g', 'sm', f(0.17));
    tl.to('#s3g', { x: 300, duration: 0.7, ease: 'power1.inOut' }, f(0.2)); tl.to('#s3k', { x: 360, duration: 0.7, ease: 'power1.inOut' }, f(0.2));
    arm(tl, 's3g', 'R', f(0.27), 2, -60); arm(tl, 's3k', 'R', f(0.27), 2, -60);
    tl.to('#s3gold', { opacity: 1, duration: 1 }, f(0.3));
    // Shanti, shanti, shanti: peace words and doves
    for (let i = 0; i < 3; i++) tl.fromTo(`#s3s${i}`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, f(0.32 + i * 0.1));
    for (let i = 0; i < 3; i++) tl.fromTo(`#s3b${i}`, { opacity: 1, x: -60, y: 140 + i * 50 }, { x: 1080, y: 40 + i * 30, duration: L * 0.45, ease: 'none' }, f(0.5) + i * 0.3);
    bob(tl, 's3g', f(0.5), b, 0.6, -6); bob(tl, 's3k', f(0.5), b, 0.5, -10);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
