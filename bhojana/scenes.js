// Bhojana mantra (Gita 4.24): one picture-story per line in the 1000x540 window (#vis).
// God is shown the same way in every scene: a warm golden light with "ఓం" in it.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
const SC = (() => {
  const { P, cloud, stars, tree, tx, SH, KID, fig, flameIn, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const floor = (y, c) => `<rect x="-10" y="${y}" width="1020" height="${H - y + 10}" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  // God-light: golden glow with Om
  const god = (id, x, y, s) => `<g id="${id}" opacity="0">${P('', x, y, s, `<g class="spinR">${[...Array(12)].map((_, i) => `<path d="M0 0 L-12 -120 L12 -120Z" fill="#FFE066" opacity=".75" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="78" fill="#FFF3B0" opacity=".7"/><circle r="56" fill="#FFD23F" stroke="${O}" stroke-width="6"/>${tx('ఓం', 0, 22, 62, '#C2410C', 0)}`)}</g>`;
  const omTag = (id, x, y, s = 1) => `<g id="${id}" opacity="0">${P('', x, y, s, `<circle r="30" fill="#FFF3B0" opacity=".8"/><circle r="22" fill="#FFD23F" stroke="${O}" stroke-width="4"/>${tx('ఓం', 0, 9, 26, '#C2410C', 0)}`)}</g>`;
  const glowTo = (tl, id, at) => tl.fromTo(id, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, at);
  const pulse = (tl, id, a, b, p = 0.8) => tl.fromTo(id, { scale: 1 }, { scale: 1.12, transformOrigin: '50% 50%', duration: p, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / p)), ease: 'sine.inOut' }, a);
  // banana-leaf meal
  const leaf = `<path d="M-230 0 Q-200 -70 0 -70 Q200 -70 240 0 Q200 60 0 62 Q-200 60 -230 0Z" fill="#4CAF50" stroke="${O}" stroke-width="6"/><path d="M-220 0 H230" stroke="#2E7D32" stroke-width="5"/>${[...Array(9)].map((_, i) => `<path d="M${-180 + i * 45} 0 l-20 -50 M${-180 + i * 45} 0 l-20 48" stroke="#2E7D32" stroke-width="3"/>`).join('')}`;
  const rice = `<path d="M-70 10 Q-60 -60 0 -62 Q60 -60 70 10Z" fill="#FFFDF5" stroke="${O}" stroke-width="5"/>${[[-30, -30], [0, -45], [28, -24], [-10, -10], [20, -2]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#EDE6D3"/>`).join('')}`;
  const bowl = (c) => `<path d="M-40 -10 Q-40 30 0 30 Q40 30 40 -10Z" fill="#C9A26B" stroke="${O}" stroke-width="5"/><ellipse cy="-10" rx="40" ry="11" fill="${c}" stroke="${O}" stroke-width="5"/>`;
  const laddu = `<circle r="26" fill="#FFB703" stroke="${O}" stroke-width="5"/>${[[-8, -8], [8, 2], [-2, 12], [10, -12]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#E85D04"/>`).join('')}`;
  const meal = (id, x, y, s) => P(id, x, y, s, `${leaf}<g id="${id}-r">${P('', -95, 0, 1, rice)}</g><g id="${id}-b">${P('', 40, -8, 1, bowl('#FFC93C'))}</g><g id="${id}-l">${P('', 150, 4, 1, laddu)}</g>`);

  // ---------- 0: Brahmarpanam Brahma Havih: the offering is God, the food is God ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#FFF1D6', '#FFD9A0')}
    <rect x="60" y="40" width="170" height="150" rx="16" fill="#BDE3FF" stroke="${O}" stroke-width="6"/><path d="M145 40 V190 M60 115 H230" stroke="${O}" stroke-width="5"/>
    ${floor(360, '#E9C79A')}
    ${KID('b0k', 500, 205, 0.52, { sit: true, eyes: 'closed' })}
    ${meal('b0m', 500, 440, 1)}
    ${god('b0g', 820, 175, 0.75)}
    <g id="b0beam" opacity="0"><path d="M790 160 L330 440 L700 470Z" fill="#FFF3B0" opacity=".6"/></g>
    ${omTag('b0t1', 405, 390)}${omTag('b0t2', 540, 395)}${omTag('b0t3', 650, 400)}
    <g id="b0sp">${[[360, 380], [460, 360], [620, 370], [700, 430], [300, 450]].map(([x, y], i) => `<g id="b0s${i}" opacity="0">${P('', x, y, 0.8, SH.spark)}</g>`).join('')}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    tl.set('#sc0', { opacity: 1 }, a);
    ['#b0g', '#b0beam', '#b0t1', '#b0t2', '#b0t3'].forEach(i => tl.set(i, { opacity: 0 }, a));
    // kid offers the food first: hands folded, eyes closed, bowing
    tl.fromTo('#b0k', { rotation: 0 }, { rotation: 6, transformOrigin: '50% 100%', duration: 0.7, yoyo: true, repeat: 3, ease: 'sine.inOut' }, a + 0.2);
    glowTo(tl, '#b0g', a + 0.8); pulse(tl, '#b0g', a + 1.4, b);
    tl.fromTo('#b0beam', { opacity: 0 }, { opacity: 1, duration: 0.5 }, m - 0.6);
    // the offering (leaf) and the food each light up as God
    tl.fromTo('#b0m-r', { scale: 1 }, { scale: 1.15, transformOrigin: '50% 100%', duration: 0.3, yoyo: true, repeat: 1 }, m);
    glowTo(tl, '#b0t1', m); glowTo(tl, '#b0t2', m + 0.45); glowTo(tl, '#b0t3', m + 0.9);
    for (let i = 0; i < 5; i++) tl.fromTo(`#b0s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.45, yoyo: true, repeat: 1, ease: 'back.out(3)' }, m + 0.3 + i * 0.3);
    tl.set('#b0k-ec', { opacity: 0 }, m + 1.6); tl.set('#b0k-eo', { opacity: 1 }, m + 1.6);
    tl.set('#b0k-ec', { opacity: 1 }, a); tl.set('#b0k-eo', { opacity: 0 }, a);
  };

  // ---------- 1: Brahmagnau Brahmana Hutam: the fire in our tummy is God, the eater is God ----------
  const kunda = `<path d="M-90 0 L90 0 L70 60 L-70 60Z" fill="#B5651D" stroke="${O}" stroke-width="6"/><path d="M-100 0 H100" stroke="${O}" stroke-width="10"/><path d="M-100 0 H100" stroke="#D98B3A" stroke-width="4"/>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFE8C2', '#FFC48A')}${floor(430, '#E9C79A')}
    <!-- left: the sacred fire receiving an offering -->
    <g id="b1fireL">${P('', 230, 400, 1, `<g id="b1fl">${P('', 0, 0, 1.05, flameIn)}</g>`)}</g>${P('', 230, 400, 1, kunda)}
    <g id="b1spoon"><g transform="translate(370 140)"><path d="M0 0 L-80 52" stroke="#8B5A2B" stroke-width="10" stroke-linecap="round"/><ellipse cx="-86" cy="56" rx="18" ry="10" fill="#C9A26B" stroke="${O}" stroke-width="4"/></g></g>
    <g id="b1ghee" opacity="0">${P('', 284, 210, 0.7, SH.drop)}</g>
    ${omTag('b1o1', 230, 230, 1.3)}
    ${tx('=', 500, 300, 110, '#FFF4D6', 10)}
    <!-- right: kid eating, with a little fire glowing in the tummy -->
    ${KID('b1k', 770, 150, 0.6, { mood: 'op' })}
    <g id="b1x" opacity="0"><circle cx="770" cy="275" r="50" fill="#FFF3B0" stroke="#FF9F1C" stroke-width="6" stroke-dasharray="10 8"/>${P('', 770, 305, 0.4, `<g id="b1tf">${flameIn}</g>`)}</g>
    <g id="b1bite">${P('', 0, 0, 0.35, rice)}</g>
    ${omTag('b1o2', 900, 150, 1.1)}
    <g id="b1puff">${[0, 1, 2].map(i => `<g id="b1e${i}" opacity="0">${P('', 770 + (i - 1) * 28, 250, 0.7, SH.ember)}</g>`).join('')}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    tl.set('#sc1', { opacity: 1 }, a);
    ['#b1x', '#b1o1', '#b1o2', '#b1bite'].forEach(i => tl.set(i, { opacity: 0 }, a));
    tl.fromTo('#b1fl', { scaleY: 0.9 }, { scaleY: 1.1, transformOrigin: '50% 100%', duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.25)), ease: 'sine.inOut' }, a);
    // offering spoon tips ghee into the fire, fire leaps
    tl.fromTo('#b1spoon', { rotation: 0 }, { rotation: -18, svgOrigin: '370 140', duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' }, a + 0.5);
    tl.fromTo('#b1ghee', { opacity: 0, y: 0 }, { opacity: 1, y: 40, duration: 0.5, ease: 'power1.in' }, a + 0.8).to('#b1ghee', { opacity: 0, duration: 0.1 }, a + 1.3);
    tl.fromTo('#b1fireL', { scale: 1 }, { scale: 1.3, svgOrigin: '230 400', duration: 0.3, yoyo: true, repeat: 1 }, a + 1.3);
    glowTo(tl, '#b1o1', a + 1.6);
    // the kid eats a bite: it travels into the mouth, the tummy fire glows
    const bite = (t) => { tl.fromTo('#b1bite', { x: 640, y: 440, opacity: 1, scale: 1 }, { x: 770, y: 210, duration: 0.6, ease: 'power1.inOut' }, t).to('#b1bite', { opacity: 0, scale: 0.4, duration: 0.15 }, t + 0.6);
      tl.set('#b1k-op', { opacity: 1 }, t).set('#b1k-sm', { opacity: 0 }, t).set('#b1k-op', { opacity: 0 }, t + 0.65).set('#b1k-sm', { opacity: 1 }, t + 0.65); };
    bite(m - 0.4); bite(m + 1.6);
    tl.fromTo('#b1x', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, m + 0.3);
    tl.fromTo('#b1tf', { scale: 0.7 }, { scale: 1.25, transformOrigin: '50% 100%', duration: 0.35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, m + 0.4);
    for (let i = 0; i < 3; i++) tl.fromTo(`#b1e${i}`, { opacity: 0, y: 0 }, { opacity: 1, y: -50, duration: 0.6, yoyo: true, repeat: 1 }, m + 0.6 + i * 0.25);
    glowTo(tl, '#b1o2', m + 1.0);
  };

  // ---------- 2: Brahmaiva Tena Gantavyam: such a person reaches God ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#BFE3FF', '#FFF0C9')}
    ${cloud(140, 90, 0.9, '#fff')}${cloud(420, 60, 0.7, '#fff')}
    <path d="M-20 330 Q200 230 420 300 Q640 200 1020 240 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>${grass(450, '#6BBF59')}
    <path d="M90 520 Q300 470 380 400 Q470 330 640 300 Q760 280 830 210" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round"/><path id="b2path" d="M90 520 Q300 470 380 400 Q470 330 640 300 Q760 280 830 210" fill="none" stroke="#FFE9A8" stroke-width="28" stroke-linecap="round"/>
    ${tree(200, 330, 0.35)}${tree(940, 330, 0.3)}
    ${god('b2g', 850, 175, 0.95)}
    <g id="b2kw">${KID('b2k', 0, 0, 0.36, {})}</g>
    <g id="b2st">${[[700, 120], [940, 250], [780, 60], [960, 90], [690, 240]].map(([x, y], i) => `<g id="b2s${i}" opacity="0">${P('', x, y, 1, SH.star5)}</g>`).join('')}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    tl.set('#sc2', { opacity: 1 }, a);
    glowTo(tl, '#b2g', a + 0.2); pulse(tl, '#b2g', a + 0.8, b);
    // kid walks up the golden path, step by step
    const pts = [[110, 395], [300, 345], [400, 270], [520, 210], [650, 175], [780, 105]];
    const dur = Math.max(2.5, m + 1.2 - a);
    tl.set('#b2kw', { x: pts[0][0], y: pts[0][1] }, a);
    pts.slice(1).forEach((p, i) => tl.to('#b2kw', { x: p[0], y: p[1], duration: dur / (pts.length - 1), ease: 'none' }, a + i * dur / (pts.length - 1)));
    tl.fromTo('#b2k', { y: 0 }, { y: -20, duration: 0.22, yoyo: true, repeat: Math.floor(dur / 0.22), ease: 'sine.out' }, a);
    // arrives: glow embraces the kid, stars burst
    tl.to('#b2kw', { scale: 1.15, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, a + dur);
    tl.to('#b2g', { scale: 1.3, duration: 0.5 }, a + dur);
    for (let i = 0; i < 5; i++) tl.fromTo(`#b2s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, a + dur + 0.1 + i * 0.15);
  };

  // ---------- 3: Brahma Karma Samadhina: seeing God in every work ----------
  const panel = (i, x, inner, label) => `<g id="b3p${i}">${P('', x, 285, 1, `<rect x="-150" y="-180" width="300" height="330" rx="26" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${inner}${tx(label, 0, 135, 34, '#7A2E0B', 0)}`)}</g>`;
  const plant = (x) => `<g id="b3pl${x}"><path d="M${x} 60 V20" stroke="#2E7D32" stroke-width="6"/><path d="M${x} 30 q-22 -20 -30 -46 M${x} 30 q22 -20 30 -46 M${x} 24 V-20" stroke="#4CAF50" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFF4D6', '#FFD9A0')}
    ${panel(0, 175, `<rect x="-140" y="40" width="280" height="40" fill="#8D6E63"/><rect x="-140" y="30" width="280" height="14" fill="#7FD0FF"/>${plant(-70)}${plant(-10)}${plant(50)}${fig({ id: 'b3f', x: 95, y: -95, s: 0.32, skin: '#C98A5A', cloth: '#FFFFFF', top: '#FFFFFF', crown: 'bald' })}`, 'పొలం పని')}
    ${panel(1, 500, `${P('', 0, 60, 0.55, flameIn)}<g id="b3pot">${P('', 0, 20, 1, `<path d="M-60 -30 Q-66 40 0 44 Q66 40 60 -30Z" fill="#A0522D" stroke="${O}" stroke-width="5"/><rect x="-66" y="-40" width="132" height="14" rx="6" fill="#8B4513" stroke="${O}" stroke-width="4"/>`)}</g>${[0, 1, 2].map(k => `<path id="b3sm${k}" d="M${-30 + k * 30} -50 q12 -16 0 -32 q-12 -16 0 -32" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}${fig({ id: 'b3m', x: -95, y: -95, s: 0.3, female: true, skin: '#E0A878', cloth: '#E74C8B', drape: '#FFC93C', crown: 'kid' })}`, 'వంట')}
    ${panel(2, 825, `${KID('b3k', -50, -90, 0.3, {})}<g id="b3bird">${P('', 75, 30, 1.3, ST.birdIn('#6EC1FF'))}</g><g id="b3gr">${[0, 1, 2].map(k => `<circle cx="${40 + k * 14}" cy="70" r="5" fill="#FFE066" stroke="${O}" stroke-width="2"/>`).join('')}</g>`, 'పంచుకోవడం')}
    ${omTag('b3o0', 175, 95, 1.3)}${omTag('b3o1', 500, 95, 1.3)}${omTag('b3o2', 825, 95, 1.3)}
    <g id="b3link" opacity="0"><path d="M175 95 Q340 15 500 95 Q660 15 825 95" stroke="#FFD23F" stroke-width="12" fill="none" stroke-dasharray="4 18" stroke-linecap="round"/></g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    tl.set('#sc3', { opacity: 1 }, a);
    ['#b3o0', '#b3o1', '#b3o2', '#b3link'].forEach(i => tl.set(i, { opacity: 0 }, a));
    // everyone is busy at work
    [-70, -10, 50].forEach((x, k) => tl.fromTo(`#b3pl${x}`, { scaleY: 0.3 }, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(2)' }, a + 0.3 + k * 0.3));
    tl.fromTo('#b3f', { rotation: -8 }, { rotation: 8, transformOrigin: '50% 100%', duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.5)), ease: 'sine.inOut' }, a);
    tl.fromTo('#b3pot', { y: 0 }, { y: -4, duration: 0.15, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.15)) }, a);
    [0, 1, 2].forEach(k => { for (let t = a + k * 0.4; t < b - 0.8; t += 1.4) tl.fromTo(`#b3sm${k}`, { opacity: 0, y: 0 }, { opacity: 0.9, y: -30, duration: 0.7, yoyo: true, repeat: 1 }, t); });
    tl.fromTo('#b3m', { rotation: -6 }, { rotation: 6, transformOrigin: '50% 100%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.6)), ease: 'sine.inOut' }, a);
    tl.fromTo('#b3gr', { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, a + 0.8);
    tl.fromTo('#b3bird', { x: 120, y: -60 }, { x: 0, y: 0, duration: 0.8, ease: 'power2.out' }, a + 1.1);
    // God seen in each work: Om lights over every panel, then they join
    [0, 1, 2].forEach(k => { glowTo(tl, `#b3o${k}`, m + k * 0.5); tl.fromTo(`#b3p${k}`, { scale: 1 }, { scale: 1.05, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1 }, m + k * 0.5); });
    tl.fromTo('#b3link', { opacity: 0 }, { opacity: 1, duration: 0.6 }, m + 1.6);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
