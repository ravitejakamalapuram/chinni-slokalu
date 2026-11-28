// Annapurne Sadapurne: one picture-story per line, drawn in a 1000x540 window (#vis). Annapurna (Parvati) is the same
// figure in every scene: red sari, gold drape, holding her golden pot of food.
// 0 Annapurne sadapurne: we see Annapurna by a big pot and a row of three empty plates, then she ladles rice onto plate after plate, and the pot is still full every time (it sparkles, heaped high).
// 1 Shankara pranavallabhe: we see Shiva walk in holding an empty bowl and Annapurna waiting, then she fills his bowl with rice, they both smile and a heart rises between them.
// 2 Jnana vairagya siddhyartham: we see a child eating with a closed book beside the plate and a sad hungry friend, then the book opens and a bulb lights up (wisdom), and the child hands the extra rotis to the friend, who smiles.
// 3 Bhiksham dehi cha Parvati: we see the child holding out an empty plate with folded hands, then Parvati places food on it and a little lamp glows above the child's head.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
const SC = (() => {
  const { P, tx, KID, SHIVA, DEVI, heartP, book, bulb, flameIn, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glowDef = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".5" stop-color="${c}" stop-opacity=".6"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.6);
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const floor = (y, c) => `<rect x="-10" y="${y}" width="1020" height="${H - y + 10}" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const kitchen = (id) => `${bg(id, '#FFE7B8', '#F7C98B')}${floor(430, '#C98F5A')}${[120, 880].map(x => `<g transform="translate(${x} 110)"><rect x="-60" y="-50" width="120" height="100" rx="8" fill="#8B5E34" stroke="${O}" stroke-width="5"/><rect x="-48" y="-38" width="96" height="76" fill="#BDE3FF"/></g>`).join('')}`;
  const ANNA = (id, x, y, s) => DEVI(id, x, y, s, RD, GD, { hold: 'pot' });

  // food art, drawn around (0,0)
  const plate = `<ellipse cx="0" cy="0" rx="62" ry="20" fill="#E8EEF2" stroke="${O}" stroke-width="5"/><ellipse cx="0" cy="-2" rx="44" ry="12" fill="#F7FAFC"/>`;
  const rice = (s = 1) => `<g transform="scale(${s})"><path d="M-38 0 Q-32 -40 0 -42 Q32 -40 38 0Z" fill="#FFFDF5" stroke="${O}" stroke-width="5"/>${[[-14, -20], [6, -30], [18, -14], [-4, -10]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="2.5" fill="#E2D9C2"/>`).join('')}</g>`;
  const roti = (x, y, id) => `<g id="${id}">${P('', x, y, 1, `<ellipse rx="34" ry="12" fill="#E8B067" stroke="${O}" stroke-width="4"/><circle cx="-10" cy="-2" r="3" fill="#B87A3A"/><circle cx="12" cy="2" r="3" fill="#B87A3A"/>`)}</g>`;
  const bigPot = (id) => `<path d="M-90 -40 Q-110 70 0 80 Q110 70 90 -40Z" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-100" y="-56" width="200" height="24" rx="10" fill="#E0A800" stroke="${O}" stroke-width="5"/><g id="${id}">${P('', 0, -50, 1.9, rice())}</g>`;
  const ladle = (fill) => `<g><line x1="0" y1="0" x2="-110" y2="-70" stroke="${O}" stroke-width="14" stroke-linecap="round"/><line x1="0" y1="0" x2="-110" y2="-70" stroke="#A0622D" stroke-width="7" stroke-linecap="round"/><path d="M-24 -6 Q0 30 24 -6Z" fill="#C0C7D1" stroke="${O}" stroke-width="4"/>${fill ? `<g id="${fill}">${P('', 0, -4, 0.45, rice())}</g>` : ''}</g>`;
  const sparkle = (x, y, id) => `<path id="${id}" opacity="0" d="M${x} ${y - 18} L${x + 5} ${y - 5} L${x + 18} ${y} L${x + 5} ${y + 5} L${x} ${y + 18} L${x - 5} ${y + 5} L${x - 18} ${y} L${x - 5} ${y - 5}Z" fill="#FFF36B" stroke="${O}" stroke-width="3"/>`;
  const bowl = `<path d="M-46 -10 Q-44 34 0 36 Q44 34 46 -10Z" fill="#8B5E34" stroke="${O}" stroke-width="5"/><ellipse cx="0" cy="-10" rx="46" ry="12" fill="#5A3A1E" stroke="${O}" stroke-width="5"/>`;
  const namaste = (x, y, s = 1) => P('', x, y, s, `<path d="M-14 30 Q-20 -10 0 -44 Q20 -10 14 30Z" fill="#E9B68A" stroke="${O}" stroke-width="5"/><line x1="0" y1="-40" x2="0" y2="28" stroke="${O}" stroke-width="3"/>`);

  // ---------- 0: Annapurne sadapurne ----------
  const px = [460, 640, 820];
  const s0 = `<g id="sc0" opacity="0">${kitchen('g0')}
    ${ANNA('n0a', 150, 285, 0.62)}
    <g transform="translate(320 400)">${bigPot('n0heap')}</g>
    ${px.map((x, i) => `<g transform="translate(${x} 400)">${plate}<g id="n0r${i}" opacity="0">${P('', 0, -6, 1, rice(0.9))}</g></g>`).join('')}
    <g id="n0lad" opacity="0"><g transform="translate(330 330)"><g id="n0ladin">${ladle('n0scoop')}</g></g></g>
    ${[[250, 300], [390, 290], [320, 250]].map(([x, y], i) => sparkle(x, y, 'n0s' + i)).join('')}
    <g id="n0full" opacity="0">${tx('నిండుగా!', 320, 215, 44, '#FFD23F', 7)}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b), step = Math.max(0.55, Math.min(0.9, (b - r - 0.8) / 3));
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#n0r0', '#n0r1', '#n0r2', '#n0lad', '#n0full', '#n0s0', '#n0s1', '#n0s2'], { opacity: 0 }, a);
    face(tl, 'n0a', 'sm', a);
    tl.fromTo('#n0heap', { y: 0 }, { y: -4, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.5)), ease: 'sine.inOut' }, a);
    tl.to('#n0lad', { opacity: 1, duration: 0.2 }, r - 0.3);
    px.forEach((x, i) => {
      const t = r + i * step;
      // the ladle dips into the pot, carries rice to the plate, and the plate fills
      tl.set('#n0scoop', { opacity: 1 }, t);
      tl.fromTo('#n0ladin', { x: 0, y: 0 }, { x: x - 330 + 20, y: 30, duration: step * 0.55, ease: 'power1.inOut' }, t);
      tl.set('#n0scoop', { opacity: 0 }, t + step * 0.55);
      tl.fromTo(`#n0r${i}`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.25, ease: 'back.out(3)' }, t + step * 0.55);
      tl.to('#n0ladin', { x: 0, y: 0, duration: step * 0.4, ease: 'power1.inOut' }, t + step * 0.6);
      // the pot is still heaped full: it pops and sparkles
      tl.fromTo('#n0heap', { scale: 0.85 }, { scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.3, ease: 'back.out(3)' }, t + step * 0.62);
      tl.fromTo(`#n0s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, t + step * 0.62);
    });
    tl.fromTo('#n0full', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + step * 3);
  };

  // ---------- 1: Shankara pranavallabhe ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#CFE8FF', '#FFE3B0')}
    <path d="M-20 300 Q200 180 420 280 Q640 160 1020 260 V560 H-20Z" fill="#B9D7A0" stroke="${O}" stroke-width="6"/>${floor(440, '#9CC27F')}
    ${ANNA('n1a', 250, 285, 0.62)}
    <g id="n1sh"><g id="n1shin">${SHIVA('n1s', 750, 285, 0.62, { hold: '' })}<g transform="translate(670 360)">${bowl}<g id="n1rice" opacity="0">${P('', 0, -10, 1, rice(0.9))}</g></g></g></g>
    <g id="n1lad" opacity="0"><g transform="translate(400 300)"><g id="n1ladin">${ladle('n1scoop')}</g></g></g>
    <g id="n1heart" opacity="0">${P('', 490, 170, 1.4, heartP(1))}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#n1rice', '#n1lad', '#n1heart'], { opacity: 0 }, a);
    face(tl, 'n1a', 'op', a); face(tl, 'n1s', 'op', a);
    // Shiva walks in from the right with his empty bowl
    tl.fromTo('#n1sh', { x: 380 }, { x: 0, duration: Math.max(0.8, Math.min(1.8, r - a - 0.2)), ease: 'power1.out' }, a);
    tl.fromTo('#n1shin', { y: 0 }, { y: -8, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor(Math.min(1.8, r - a) / 0.25)) }, a);
    face(tl, 'n1a', 'sm', r - 0.4);
    // she ladles rice into his bowl
    tl.to('#n1lad', { opacity: 1, duration: 0.2 }, r - 0.2);
    tl.set('#n1scoop', { opacity: 1 }, r - 0.2);
    tl.fromTo('#n1ladin', { x: 0, y: 0 }, { x: 270, y: 50, duration: 0.6, ease: 'power1.inOut' }, r);
    tl.set('#n1scoop', { opacity: 0 }, r + 0.6);
    tl.fromTo('#n1rice', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.3, ease: 'back.out(3)' }, r + 0.6);
    tl.to('#n1lad', { opacity: 0, duration: 0.3 }, r + 1.0);
    face(tl, 'n1s', 'sm', r + 0.8);
    tl.fromTo('#n1heart', { opacity: 0, y: 40, scale: 0.4 }, { opacity: 1, y: 0, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, r + 1.0);
    tl.to('#n1heart', { scale: 1.15, transformOrigin: '50% 50%', duration: 0.35, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 1.5) / 0.35)) }, r + 1.5);
  };

  // ---------- 2: Jnana vairagya siddhyartham ----------
  const s2 = `<g id="sc2" opacity="0">${glowDef('gBk', '#FFF36B')}${kitchen('g2')}
    ${KID('n2k', 380, 285, 0.52, { sit: true })}
    <g transform="translate(380 420)">${plate}${P('', -16, -6, 1, rice(0.7))}</g>
    <g id="n2ro">${roti(440, 408, 'n2r1')}${roti(450, 396, 'n2r2')}</g>
    <g transform="translate(220 400)"><g id="n2bkc">${P('', 0, 0, 0.5, book('#3B6FD8'))}</g></g>
    <g id="n2glow" opacity="0"><circle cx="220" cy="300" r="120" fill="url(#gBk)"/>${P('', 220, 290, 0.9, bulb)}</g>
    <g id="n2f">${KID('n2fr', 770, 285, 0.52, { sit: true, top: '#2FA36B', mood: 'sd' })}<g transform="translate(770 420)">${plate}</g></g>
    <g id="n2give" opacity="0">${roti(0, 0, 'n2g1')}${roti(8, -12, 'n2g2')}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b), g = Math.min(b - 1.2, r + 1.3);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#n2glow', '#n2give'], { opacity: 0 }, a); tl.set('#n2ro', { opacity: 1 }, a);
    face(tl, 'n2k', 'sm', a); face(tl, 'n2fr', 'sd', a);
    tl.fromTo('#n2k-head', { y: 0 }, { y: 6, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.3)) }, a);
    // wisdom: the book glows and a bulb lights up
    tl.fromTo('#n2glow', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '220px 300px', smoothOrigin: false, duration: 0.5, ease: 'back.out(2)' }, r);
    face(tl, 'n2k', 'op', r + 0.2);
    // no greed: the child gives the extra rotis to the hungry friend
    tl.set('#n2ro', { opacity: 0 }, g);
    tl.set('#n2give', { opacity: 1 }, g);
    tl.fromTo('#n2give', { x: 445, y: 400 }, { x: 760, y: 405, duration: 0.8, ease: 'power1.inOut' }, g);
    face(tl, 'n2k', 'sm', g + 0.3);
    face(tl, 'n2fr', 'sm', g + 0.8);
    tl.fromTo('#n2f', { y: 0 }, { y: -14, duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor((b - g - 0.9) / 0.25)) }, g + 0.9);
  };

  // ---------- 3: Bhiksham dehi cha Parvati ----------
  const s3 = `<g id="sc3" opacity="0">${glowDef('gLamp', '#FFE066')}${bg('g3', '#FFE9C7', '#FBC6A4')}${floor(440, '#D9A066')}
    <g transform="translate(500 120)">${[...Array(12)].map((_, i) => `<path d="M0 0 L-14 -400 L14 -400Z" fill="#FFF3B0" opacity=".35" transform="rotate(${i * 30 + 15})"/>`).join('')}</g>
    <g id="n3pv" opacity="0">${ANNA('n3a', 300, 285, 0.62)}</g>
    ${KID('n3k', 650, 270, 0.56)}${namaste(650, 320, 1.2)}
    <g transform="translate(650 400)">${plate}<g id="n3food" opacity="0">${P('', -12, -6, 1, rice(0.9))}${roti(28, -8, 'n3ro')}</g></g>
    <g id="n3hand" opacity="0"><g transform="translate(400 330)"><g id="n3handin">${ladle('n3scoop')}</g></g></g>
    <g id="n3lamp" opacity="0"><circle cx="650" cy="110" r="70" fill="url(#gLamp)"/>${P('', 650, 140, 0.3, `<g class="flick">${flameIn}</g>`)}<path d="M612 142 Q650 176 688 142Z" fill="#C2410C" stroke="${O}" stroke-width="4"/></g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#n3food', '#n3hand', '#n3lamp'], { opacity: 0 }, a);
    face(tl, 'n3k', 'op', a);
    // Parvati appears, then puts food on the child's plate
    tl.fromTo('#n3pv', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }, Math.max(a + 0.2, r - 0.8));
    tl.to('#n3hand', { opacity: 1, duration: 0.2 }, r);
    tl.set('#n3scoop', { opacity: 1 }, r);
    tl.fromTo('#n3handin', { x: 0, y: 0 }, { x: 255, y: 60, duration: 0.6, ease: 'power1.inOut' }, r);
    tl.set('#n3scoop', { opacity: 0 }, r + 0.6);
    tl.fromTo('#n3food', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.3, ease: 'back.out(3)' }, r + 0.6);
    tl.to('#n3hand', { opacity: 0, duration: 0.3 }, r + 1.0);
    face(tl, 'n3k', 'sm', r + 0.7);
    tl.fromTo('#n3lamp', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, r + 1.0);
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
