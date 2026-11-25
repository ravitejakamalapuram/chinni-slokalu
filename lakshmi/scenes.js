// Mahalakshmi Ashtakam v1: one picture-story per line in the 1000x540 #vis window.
// SC.act[i](tl, a, m, b, ws): a = scene start, m = meaning moment, b = end, ws = absolute start time of each chanted word.
const SC = (() => {
  const { P, stars, lotus, tx, SH, KID, LAKSHMI, DEVI, fig, rays, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const floor = (y, c) => `<path d="M-20 ${y} Q250 ${y - 18} 500 ${y} Q750 ${y + 16} 1020 ${y - 6} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const pill = (id, x, y, w, t, fs = 46) => `<g id="${id}" opacity="0">${P('', x, y, 1, `<rect x="${-w / 2}" y="-38" width="${w}" height="76" rx="38" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${tx(t, 0, 16, fs, '#C2185B', 0)}`)}</g>`;
  // folded hands (namaste): swing both kid arms in to the chest
  const namaste = (tl, k, t, d = 0.35) => { tl.to(`#${k}-aR`, { rotation: 56, svgOrigin: '56 60', duration: d, ease: 'back.out(2)' }, t); tl.to(`#${k}-aL`, { rotation: -56, svgOrigin: '-56 60', duration: d, ease: 'back.out(2)' }, t); };
  const bow = (tl, k, t, n = 2) => tl.fromTo(`#${k}`, { rotation: 0 }, { rotation: 12, transformOrigin: '50% 100%', duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: n * 2 - 1 }, t);
  const shower = (id, n, shape, x0, x1) => `<g id="${id}">${[...Array(n)].map((_, i) => `<g id="${id}${i}" opacity="0">${P('', 0, 0, 0.9, SH[shape])}</g>`).join('')}</g>`;
  const rain = (tl, id, n, t, x0, x1, y1 = 520) => { for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * ((i * 37) % n) / n; tl.fromTo(`#${id}${i}`, { x, y: -40, opacity: 1, rotation: 0 }, { y: y1 - (i % 3) * 30, rotation: 200 + i * 20, duration: 1.6 + (i % 4) * 0.2, ease: 'power1.in' }, t + i * 0.12); } };
  const conchP = `<g transform="rotate(-20)"><path d="M-26 30 Q-40 -10 -10 -40 Q20 -56 30 -26 Q36 6 10 30 Q-6 40 -26 30Z" fill="#FFF8EE" stroke="${O}" stroke-width="6"/><path d="M-14 -20 Q4 -30 18 -16 M-16 0 Q4 -10 20 2" stroke="${O}" stroke-width="4" fill="none"/></g>`;
  const chakraP = `<g class="spinR"><circle r="40" fill="#FFE066" stroke="${O}" stroke-width="6"/>${[0, 45, 90, 135].map(a => `<line x1="-40" y1="0" x2="40" y2="0" stroke="${O}" stroke-width="4" transform="rotate(${a})"/>`).join('')}<circle r="12" fill="${RD}" stroke="${O}" stroke-width="4"/></g>`;
  const maceP = `<line x1="0" y1="90" x2="0" y2="-40" stroke="${O}" stroke-width="18" stroke-linecap="round"/><line x1="0" y1="90" x2="0" y2="-40" stroke="${GD}" stroke-width="8"/><circle cy="-62" r="36" fill="${GD}" stroke="${O}" stroke-width="6"/><circle cy="-62" r="12" fill="#E8A23A"/>`;
  const elephant = (id, x, y, s, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g id="${id}">
    <ellipse cx="-40" cy="40" rx="120" ry="80" fill="#B8C2CC" stroke="${O}" stroke-width="7"/>
    ${[-120, -70, 0, 40].map(lx => `<rect x="${lx - 4}" y="80" width="42" height="70" rx="14" fill="#B8C2CC" stroke="${O}" stroke-width="7"/>`).join('')}
    <path d="M-110 -30 Q-40 -60 30 -30 L20 30 Q-40 50 -100 30Z" fill="${RD}" stroke="${O}" stroke-width="6"/><path d="M-100 30 Q-40 50 20 30" stroke="${GD}" stroke-width="10" fill="none"/>
    <circle cx="70" cy="-10" r="66" fill="#B8C2CC" stroke="${O}" stroke-width="7"/>
    <path d="M40 -40 Q-10 -60 -6 10 Q10 50 50 30Z" fill="#9AA5B1" stroke="${O}" stroke-width="6"/>
    <g id="${id}-tr"><path d="M120 10 Q170 -40 170 -120 Q170 -160 150 -170" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round"/><path d="M120 10 Q170 -40 170 -120 Q170 -160 150 -170" fill="none" stroke="#B8C2CC" stroke-width="27" stroke-linecap="round"/>
      <g transform="translate(150 -190)">${P('', 0, 0, 0.7, `<path d="M-40 30 Q-60 -10 0 -16 Q60 -10 40 30 Z" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-30" y="-30" width="60" height="16" rx="6" fill="${GD}" stroke="${O}" stroke-width="5"/>`)}</g></g>
    <circle cx="90" cy="-26" r="7" fill="${O}"/><path d="M104 30 q14 10 24 0" stroke="${O}" stroke-width="5" fill="none"/>
    <path d="M110 40 L150 56" stroke="#FFF8EE" stroke-width="12" stroke-linecap="round"/>
  </g></g>`;

  // ---------- 0: Namaste'stu Mahamaaye: Salutations, Mother of wondrous power ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#3B2A6B', '#B05C9E')}${stars([[70, 60], [210, 120], [780, 60], [930, 140], [620, 40], [360, 70]], 12)}
    ${floor(450, '#7E4A8C')}
    <g id="l0rays" opacity="0">${rays(500, 260, 14, '#FFE6A8', 0.45, 700, 50)}</g>
    <circle id="l0glow" cx="500" cy="270" r="170" fill="#FFF3B0" opacity="0"/>
    <g id="l0sw">${[...Array(10)].map((_, i) => `<g id="l0s${i}" opacity="0">${P('', 0, 0, 0.7, SH.spark)}</g>`).join('')}</g>
    <g id="l0lak" opacity="0">${lotus(500, 465, 1.25)}${LAKSHMI('l0l', 500, 230, 0.62, { hold: 'abhaya' })}</g>
    ${KID('l0k1', 150, 320, 0.5)}${KID('l0k2', 850, 320, 0.5, { flip: true, top: '#2EC4B6' })}
    ${pill('l0p', 500, 58, 360, 'నమస్తే అమ్మా!')}
    ${shower('l0f', 10, 'marigold')}
  </g>`;
  const a0 = (tl, a, m, b, ws) => {
    tl.set('#sc0', { opacity: 1 }, a);
    for (let i = 0; i < 10; i++) { const r0 = 260, ang = i * 36; tl.fromTo(`#l0s${i}`, { x: 500 + Math.cos(ang) * r0, y: 270 + Math.sin(ang) * r0 * 0.7, opacity: 0, scale: 0.3 }, { x: 500, y: 270, opacity: 1, scale: 1, duration: 1.1, ease: 'power2.in' }, a + 0.2 + i * 0.06); tl.to(`#l0s${i}`, { opacity: 0, duration: 0.2 }, a + 1.4 + i * 0.06); }
    const ap = (ws[1] || a + 1.6) - 0.2;
    tl.fromTo('#l0glow', { opacity: 0, scale: 0.2 }, { opacity: 0.8, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, ap);
    tl.fromTo('#l0lak', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.8)' }, ap);
    tl.to('#l0rays', { opacity: 1, duration: 0.6 }, ap + 0.2);
    tl.to('#l0glow', { opacity: 0.45, duration: 0.6 }, ap + 0.7);
    namaste(tl, 'l0k1', ws[0] || a + 0.4); namaste(tl, 'l0k2', ws[0] || a + 0.4);
    bow(tl, 'l0k1', m, 2); bow(tl, 'l0k2', m, 2);
    tl.fromTo('#l0p', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, m + 0.2);
    rain(tl, 'l0f', 10, m + 0.4, 150, 850, 470);
  };

  // ---------- 1: Shree Peethe Sura Poojite: on the holy throne, worshipped by the gods ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFF1D6', '#FFC9A8')}
    ${[120, 880].map(x => `<rect x="${x - 26}" y="60" width="52" height="420" fill="#F4D58D" stroke="${O}" stroke-width="6"/><rect x="${x - 40}" y="40" width="80" height="30" rx="8" fill="${GD}" stroke="${O}" stroke-width="6"/>`).join('')}
    <path d="M60 40 Q500 -40 940 40" fill="none" stroke="${RD}" stroke-width="14"/>${[...Array(9)].map((_, i) => `<circle cx="${140 + i * 90}" cy="${30 - Math.sin(i / 8 * Math.PI) * 30}" r="10" fill="#FF9F1C" stroke="${O}" stroke-width="3"/>`).join('')}
    ${floor(470, '#E8A87C')}
    <g id="l1rays" opacity="0">${rays(500, 300, 16, '#FFE066', 0.5, 600, 40)}</g>
    <g id="l1seat"><path d="M360 470 L380 380 L620 380 L640 470Z" fill="${GD}" stroke="${O}" stroke-width="7"/><path d="M370 380 Q370 150 500 130 Q630 150 630 380" fill="#E8A23A" stroke="${O}" stroke-width="7"/><circle cx="500" cy="170" r="16" fill="${RD}" stroke="${O}" stroke-width="4"/>
      ${tx('శ్రీ', 500, 445, 52, '#C2185B', 0)}</g>
    ${LAKSHMI('l1l', 500, 225, 0.55, { sit: true, hold: 'abhaya' })}
    <g id="l1d1">${DEVI('l1dv1', -100, 290, 0.45, '#2E86DE', '#FFC93C')}</g>
    <g id="l1d2">${fig({ id: 'l1dv2', x: 1100, y: 290, s: 0.45, skin: '#F2C27A', cloth: '#2EC4B6', crown: 'crown', hold: 'lamp', flip: true })}</g>
    <g id="l1d3">${fig({ id: 'l1dv3', x: -100, y: 330, s: 0.38, skin: '#E9B68A', cloth: '#8E44AD', crown: 'crown', hold: 'lotus' })}</g>
    ${pill('l1p', 500, 520, 420, 'దేవతల పూజ', 44)}
    ${shower('l1f', 10, 'petal')}
  </g>`;
  const a1 = (tl, a, m, b, ws) => {
    tl.set('#sc1', { opacity: 1 }, a);
    const w0 = ws[0] || a + 0.3, w1 = ws[1] || a + 1.8;
    tl.fromTo('#l1seat', { scale: 0.85 }, { scale: 1.06, transformOrigin: '50% 100%', duration: 0.35, ease: 'back.out(3)', yoyo: true, repeat: 1 }, w0);
    tl.to('#l1rays', { opacity: 1, duration: 0.5 }, w0);
    tl.fromTo('#l1d1', { x: 0 }, { x: 290, duration: 1.0, ease: 'power2.out' }, w1 - 0.3);
    tl.fromTo('#l1d2', { x: 0 }, { x: -290, duration: 1.0, ease: 'power2.out' }, w1 - 0.3);
    tl.fromTo('#l1d3', { x: 0 }, { x: 210, duration: 1.0, ease: 'power2.out' }, w1);
    // aarti: lamp arms circle
    ['#l1dv1-aR', '#l1dv2-aR'].forEach(s => tl.fromTo(s, { rotation: -25 }, { rotation: 20, svgOrigin: '56 60', duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: Math.max(3, Math.floor((b - w1 - 0.7) / 0.5)) }, w1 + 0.7));
    tl.fromTo('#l1p', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, m + 0.1);
    rain(tl, 'l1f', 10, m + 0.3, 330, 670, 470);
  };

  // ---------- 2: Shankha Chakra Gadaa Haste: holding conch, discus, mace ----------
  const upArm = (side, item, id) => `<g id="${id}"><line x1="${side * 56}" y1="60" x2="${side * 150}" y2="-30" stroke="${O}" stroke-width="40" stroke-linecap="round"/><line x1="${side * 56}" y1="60" x2="${side * 150}" y2="-30" stroke="#F3C08B" stroke-width="28" stroke-linecap="round"/><g id="${id}-it" transform="translate(${side * 150} -78)">${item}</g><circle cx="${side * 150}" cy="-30" r="18" fill="#F3C08B" stroke="${O}" stroke-width="5"/></g>`;
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#D6F0FF', '#FFE3F0')}${floor(470, '#F7B2C8')}
    ${rays(500, 250, 12, '#FFFFFF', 0.5, 600, 40)}
    ${lotus(500, 478, 1.4)}
    ${LAKSHMI('l2l', 500, 200, 0.8, { hold: 'mace', holdL: 'lotus', extra: upArm(1, conchP, 'l2uR') + upArm(-1, chakraP, 'l2uL') })}
    <g id="l2waves" opacity="0">${[0, 1, 2].map(i => `<path d="M${640 + i * 34} ${60 - i * 6} q20 30 0 60" fill="none" stroke="#2E86DE" stroke-width="7" stroke-linecap="round"/>`).join('')}</g>
    <g id="l2i0" opacity="0">${P('', 130, 135, 0.9, `<circle r="62" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${conchP}`)}${tx('శంఖం', 130, 232, 44, '#C2185B', 0)}</g>
    <g id="l2i1" opacity="0">${P('', 130, 345, 0.9, `<circle r="62" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${chakraP}`)}${tx('చక్రం', 130, 442, 44, '#C2185B', 0)}</g>
    <g id="l2i2" opacity="0">${P('', 870, 200, 0.85, `<circle cy="-10" r="80" fill="#FFF8E6" stroke="${O}" stroke-width="7"/><g transform="translate(0 10) scale(.8)">${maceP}</g>`)}${tx('గద', 870, 315, 44, '#C2185B', 0)}</g>
    <g id="l2hand" opacity="0">${P('', 870, 430, 1, `<rect x="-90" y="-36" width="180" height="72" rx="36" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${tx('చేతుల్లో', 0, 14, 40, '#C2185B', 0)}`)}</g>
  </g>`;
  const a2 = (tl, a, m, b, ws) => {
    tl.set('#sc2', { opacity: 1 }, a);
    const w = [0, 1, 2, 3].map(i => ws[i] || a + 0.3 + i * (m - a - 0.5) / 4);
    const pop = (s, t, o) => tl.fromTo(s, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(2.5)' }, t);
    // conch: raise arm and blow, sound waves
    pop('#l2i0', w[0], '130px 140px');
    tl.fromTo('#l2uR', { rotation: 0 }, { rotation: -14, svgOrigin: '56 60', duration: 0.3, yoyo: true, repeat: 1 }, w[0]);
    tl.fromTo('#l2waves', { opacity: 0, x: -20 }, { opacity: 1, x: 20, duration: 0.5, repeat: 3, ease: 'power1.out' }, w[0] + 0.1);
    tl.set('#l2waves', { opacity: 0 }, w[0] + 2.2);
    // chakra: spin fast
    pop('#l2i1', w[1], '130px 360px');
    tl.fromTo('#l2uL-it', { rotation: 0 }, { rotation: 720, transformOrigin: '50% 50%', duration: 1.2, ease: 'power2.out' }, w[1]);
    // mace: lift
    pop('#l2i2', w[2], '870px 220px');
    tl.fromTo('#l2l-aR', { rotation: 0 }, { rotation: -22, svgOrigin: '56 60', duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }, w[2]);
    // haste = hands: all hands wave
    pop('#l2hand', w[3], '870px 430px');
    ['#l2uR', '#l2l-aR'].forEach(s => tl.fromTo(s, { rotation: 0 }, { rotation: -8, svgOrigin: '56 60', duration: 0.25, yoyo: true, repeat: 3 }, w[3]));
    ['#l2uL', '#l2l-aL'].forEach(s => tl.fromTo(s, { rotation: 0 }, { rotation: 8, svgOrigin: '-56 60', duration: 0.25, yoyo: true, repeat: 3 }, w[3]));
    // meaning: the three things pulse one by one
    ['#l2i0', '#l2i1', '#l2i2'].forEach((s, i) => tl.to(s, { scale: 1.15, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, m + 0.5 + i * 0.7));
  };

  // ---------- 3: Mahalakshmi Namo'stu Te: O Mahalakshmi, we bow to you ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#BDE8FF', '#FFF1C1')}
    <path d="M-20 400 Q500 360 1020 400 V560 H-20Z" fill="#7FD0FF" stroke="${O}" stroke-width="6"/>
    ${[200, 380, 620, 800].map(x => lotus(x, 470, 0.45)).join('')}
    ${elephant('l3e1', 180, 270, 0.62, false)}${elephant('l3e2', 820, 270, 0.62, true)}
    <g id="l3wat">${[...Array(8)].map((_, i) => `<g id="l3w${i}" opacity="0">${P('', 0, 0, 0.8, SH.drop)}</g>`).join('')}</g>
    ${lotus(500, 430, 1.3)}${LAKSHMI('l3l', 500, 190, 0.55, { sit: true, hold: 'abhaya' })}
    ${KID('l3k1', 340, 400, 0.36)}${KID('l3k2', 660, 400, 0.36, { flip: true, top: '#2EC4B6' })}
    ${pill('l3p', 500, 50, 400, 'జై మహాలక్ష్మీ!')}
    ${shower('l3c', 14, 'coin')}
  </g>`;
  const a3 = (tl, a, m, b, ws) => {
    tl.set('#sc3', { opacity: 1 }, a);
    const w0 = ws[0] || a + 0.3, w1 = ws[1] || a + 1.8;
    // elephants raise trunks and pour water over Lakshmi
    ['#l3e1-tr', '#l3e2-tr'].forEach(s => tl.fromTo(s, { rotation: 10 }, { rotation: -6, svgOrigin: '120 10', duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: Math.max(3, Math.floor((b - a) / 0.8)) }, a));
    for (let i = 0; i < 8; i++) { const L = i % 2 === 0, x0 = L ? 310 : 690; tl.fromTo(`#l3w${i}`, { x: x0, y: 150, opacity: 1 }, { x: L ? 440 : 560, y: 210, opacity: 0.2, duration: 0.7, ease: 'power1.in', repeat: Math.max(2, Math.floor((b - w0) / 1.4)), repeatDelay: 0.7 }, w0 + i * 0.18); }
    tl.fromTo('#l3l', { scale: 0.9 }, { scale: 1.06, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: 1, ease: 'back.out(2)' }, w0);
    namaste(tl, 'l3k1', w1); namaste(tl, 'l3k2', w1); bow(tl, 'l3k1', w1 + 0.3, 2); bow(tl, 'l3k2', w1 + 0.3, 2);
    tl.fromTo('#l3p', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, m + 0.1);
    rain(tl, 'l3c', 14, m + 0.3, 120, 880, 460);
    bow(tl, 'l3k1', m + 0.5, 2); bow(tl, 'l3k2', m + 0.5, 2);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
