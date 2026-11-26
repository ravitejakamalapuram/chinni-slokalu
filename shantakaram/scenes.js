// Shantakaram: one picture-story per line, drawn in a 1000x540 window (#vis).
// SC.svg = all four scenes; SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
// The meaning of each line has four parts; each part gets its own beat between m and b.
const SC = (() => {
  const { P, cloud, stars, tree, tx, SH, KID, SAGE, VEN, LAKSHMI, DEVI, ghostIn, demonIn, globe, heartP, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const beats = (m, b) => [0, 1, 2, 3].map(k => m + (b - m) * k / 4);
  const rep = (d, len) => Math.max(1, Math.floor(len / d));
  // word tag at the top of the window (Telugu), shown during its beat
  const tag = (id, t) => `<g id="${id}" opacity="0"><g transform="translate(500 52)"><rect x="-210" y="-38" width="420" height="76" rx="38" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${tx(t, 0, 16, 44, '#2B1407', 0)}</g></g>`;
  const showTag = (tl, id, t, d) => { tl.fromTo('#' + id, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, t); tl.to('#' + id, { opacity: 0, duration: 0.25 }, t + d - 0.25); };
  const milk = (y) => `<path d="M-20 ${y} ${[...Array(12)].map(() => 'q45 -22 90 0').join(' ')} V560 H-20Z" fill="#F7FBFF" stroke="${O}" stroke-width="6"/>`;
  const hoods = (id) => `<g id="${id}">${[[-70, 40], [-36, 6], [0, -8], [36, 6], [70, 40]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="30" ry="40" fill="#4CB963" stroke="${O}" stroke-width="5"/><circle cx="${x - 9}" cy="${y - 6}" r="4" fill="${O}"/><circle cx="${x + 9}" cy="${y - 6}" r="4" fill="${O}"/>`).join('')}</g>`;
  const deva = (id, x, y, s, c) => `<g id="${id}" opacity="0">${DEVI(id + 'f', x, y, s, c, '#FFC93C', { hold: 'lotus', crown: 'crown', female: false })}${P('', x, y + 290 * s, s * 1.6, '<path d="M-90 20 Q-100 -20 -60 -26 Q-50 -70 0 -60 Q40 -90 70 -50 Q110 -50 104 -10 Q130 10 100 30 Z" fill="#fff" stroke="#2B1407" stroke-width="5"/>')}</g>`;

  // sleeping Vishnu (template/characters/vishnu.svg, injected by the build as VRAW) with prefixed ids
  const VSLEEP = (px, x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc})"><g stroke="#1B2340" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">` +
    VRAW.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/id="([^"]+)"/g, `id="${px}_$1"`).replace(/url\(#/g, `url(#${px}_`) + `</g></g>`;
  // ambient life for every scene: falling flowers and flying birds
  const amb = (id) => `<g id="${id}">${[0, 1, 2, 3, 4, 5].map(i => `<g id="${id}p${i}" opacity="0">${P('', 80 + i * 170, -30, 0.8, i % 2 ? SH.marigold : SH.petal)}</g>`).join('')}${[0, 1].map(i => `<g id="${id}b${i}">${P('', -60, 90 + i * 50, 0.7 - i * 0.15, birdIn())}</g>`).join('')}</g>`;
  const ambA = (tl, id, a, b) => {
    for (let i = 0; i < 6; i++) tl.fromTo(`#${id}p${i}`, { opacity: 1, y: 0, x: 0, rotation: 0 }, { y: 600, x: (i % 2 ? 40 : -40), rotation: 270, duration: 4 + (i % 3), ease: 'none', repeat: rep(4 + (i % 3), b - a) }, a + i * 0.7);
    for (let i = 0; i < 2; i++) tl.fromTo(`#${id}b${i}`, { x: 0, y: 0 }, { x: 1150, y: -30 + i * 20, duration: 7 + i * 2, ease: 'none', repeat: rep(7 + i * 2, b - a) }, a + 0.5 + i * 1.5);
    tl.set(`#${id}`, { opacity: 1 }, a);
  };
  const { birdIn, fishIn } = ST;

  // ---------- 0: Shantakaram Bhujagashayanam Padmanabham Suresham ----------
  // Vishnu sleeps peacefully on the serpent Adisesha in the milk ocean; lotus with Brahma from his navel; gods come and bow
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#D7EEFF', '#9CCDF2')}${stars([[90, 70], [260, 120], [780, 60], [930, 140]], 10)}
    ${cloud(140, 90, 0.5)}${cloud(860, 110, 0.45)}
    <g id="z0glow" opacity="0"><ellipse cx="500" cy="300" rx="420" ry="200" fill="#FFF3B0" opacity=".6"/></g>
    <g id="z0w">${milk(440)}</g>
    ${[0, 1, 2].map(i => `<g id="z0f${i}" opacity="0">${P('', [120, 820, 930][i], 500, 0.6, fishIn(['#FF8C42', '#FFD23F', '#FF5C8A'][i]))}</g>`).join('')}
    <g id="z0v">${VSLEEP('z0', 300, 50, 0.66)}</g>
    ${deva('z0d1', 110, 150, 0.32, '#FF8C1A')}${deva('z0d2', 830, 120, 0.3, '#2EC4B6')}${deva('z0d3', 920, 170, 0.28, '#E74C8B')}
    <g id="z0crown" opacity="0">${P('', 660, 150, 0.6, `<path d="M-50 0 L50 0 L42 -40 L24 -22 L0 -64 L-24 -22 L-42 -40Z" fill="${GD}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="-26" r="8" fill="${RD}"/>`)}</g>
    ${amb('z0am')}
    ${tag('z0t0', 'ప్రశాంతం')}${tag('z0t1', 'శేష శయనం')}${tag('z0t2', 'పద్మనాభుడు')}${tag('z0t3', 'దేవతల రాజు')}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const [b0, b1, b2, b3] = beats(m, b), d = (b - m) / 4, L = b - a;
    tl.set('#sc0', { opacity: 1 }, a);
    ['#z0glow', '#z0crown', '#z0d1', '#z0d2', '#z0d3', '#z0_navelLotus'].forEach(e => tl.set(e, { opacity: 0 }, a));
    ambA(tl, 'z0am', a, b);
    tl.fromTo('#z0w', { x: 0 }, { x: -60, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: rep(2.4, L) }, a);
    tl.fromTo('#z0_waves', { x: 0 }, { x: -80, duration: 3, ease: 'none', repeat: rep(3, L) }, a);
    tl.fromTo('#z0_chakra', { rotation: 0 }, { rotation: 360, svgOrigin: '210 320', duration: 3, ease: 'none', repeat: rep(3, L) }, a);
    tl.fromTo('#z0_chest', { scaleY: 1 }, { scaleY: 1.05, svgOrigin: '330 540', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6, L) }, a);
    tl.fromTo('#z0_lakHand', { y: 0 }, { y: 10, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: rep(0.6, L) }, a);
    tl.fromTo('#z0_hoodHeads', { y: 0 }, { y: -6, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4, L) }, a);
    ['#z0_z1', '#z0_z2', '#z0_z3'].forEach((z, i) => tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -14, duration: 1.1, ease: 'sine.out', repeat: rep(1.6, L), repeatDelay: 0.5 }, a + i * 0.35));
    for (let i = 0; i < 3; i++) tl.fromTo(`#z0f${i}`, { opacity: 1, y: 40, rotation: -30 }, { y: -90, rotation: 30, duration: 0.7, ease: 'power1.out', yoyo: true, repeat: 1, repeatDelay: 0.1 }, a + 1 + i * 1.7);
    // shanta: everything glows soft and calm, he sleeps
    showTag(tl, 'z0t0', b0, d);
    tl.fromTo('#z0glow', { opacity: 0 }, { opacity: 1, duration: 0.6 }, b0);
    tl.fromTo('#z0_zzz', { transformOrigin: '50% 100%', smoothOrigin: false, scale: 1 }, { scale: 1.4, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.5, yoyo: true, repeat: 3 }, b0 + 0.2);
    // bhujaga shayanam: Adisesha raises his hoods and shelters him
    showTag(tl, 'z0t1', b1, d);
    tl.to('#z0glow', { opacity: 0, duration: 0.4 }, b1);
    tl.fromTo('#z0_hoods', { transformOrigin: '50% 100%', smoothOrigin: false, scale: 1 }, { scale: 1.18, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.45, ease: 'back.out(3)', yoyo: true, repeat: 3 }, b1 + 0.1);
    tl.fromTo('#z0_hoods', { rotation: 0 }, { rotation: -6, svgOrigin: '520 560', duration: 0.4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, b1 + 1.9);
    // padmanabham: a lotus grows from his navel, Brahma pops up on it
    showTag(tl, 'z0t2', b2, d);
    tl.set('#z0_navelLotus', { opacity: 1 }, b2);
    tl.fromTo('#z0_stem', { strokeDasharray: 340, strokeDashoffset: 340 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power1.out' }, b2);
    tl.fromTo('#z0_lotusTop', { scale: 0, transformOrigin: '50% 100%', smoothOrigin: false }, { scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.6, ease: 'back.out(2.5)' }, b2 + 0.7);
    tl.fromTo('#z0_brahma', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, b2 + 1.2);
    tl.to('#z0_brahma', { y: -12, duration: 0.25, yoyo: true, repeat: 3 }, b2 + 1.8);
    // suresham: the gods fly in on clouds and bow; a crown shines over him
    showTag(tl, 'z0t3', b3, d);
    ['#z0d1', '#z0d2', '#z0d3'].forEach((e, i) => {
      tl.fromTo(e, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, b3 + i * 0.2);
      tl.fromTo(e, { rotation: 0 }, { rotation: i ? -10 : 10, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, b3 + 0.8 + i * 0.1);
    });
    tl.fromTo('#z0crown', { transformOrigin: '50% 50%', smoothOrigin: false, opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', smoothOrigin: false, duration: 0.5, ease: 'back.out(3)' }, b3 + 0.6);
  };

  // ---------- 1: Vishwadharam Gaganasadrisham Meghavarnam Shubhangam ----------
  // he holds up the whole world, is vast like the sky, cloud-coloured, beautiful
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#BFE3FF', '#E8F6FF')}
    <g id="y1night" opacity="0"><rect width="1000" height="540" fill="#1B2F6B"/>${stars([[80, 80], [200, 200], [320, 60], [700, 90], [860, 220], [930, 60], [620, 250], [120, 330], [880, 380]], 12)}</g>
    <path d="M-20 470 Q250 446 500 470 Q750 494 1020 462 V560 H-20Z" fill="#8FD07A" stroke="${O}" stroke-width="6"/>
    <g id="y1cloud" opacity="0">${P('', 820, 170, 1.15, `<path d="M-90 20 Q-100 -20 -60 -26 Q-50 -70 0 -60 Q40 -90 70 -50 Q110 -50 104 -10 Q130 10 100 30 Z" fill="#3456B0" stroke="${O}" stroke-width="5"/>`)}
      ${[0, 1, 2, 3, 4].map(i => `<g id="y1r${i}" opacity="0">${P('', 770 + i * 24, 230, 0.7, `<g transform="scale(2.2)">${SH.drop}</g>`)}</g>`).join('')}</g>
    <g id="y1eq" opacity="0">${tx('=', 680, 210, 80, '#FFFFFF', 8)}</g>
    <g id="y1ven">${VEN('y1v', 500, 240, 0.58, { hold: 'abhaya', holdL: 'conch' })}</g>
    <g transform="translate(500 92)"><g id="y1globe" opacity="0"><g transform="scale(.32)">${globe('y1g')}</g></g></g>
    <g id="y1k">${KID('y1kid', 150, 330, 0.42, { mood: 'op' })}</g>
    <g id="y1sp">${[0, 1, 2, 3, 4, 5].map(i => `<g id="y1s${i}" opacity="0">${P('', 330 + (i % 3) * 170, 150 + Math.floor(i / 3) * 180, 1.2, SH.spark)}</g>`).join('')}</g>
    ${[0, 1, 2, 3].map(i => `<g transform="translate(${620 + i * 90} 470)"><g id="y1fl${i}">${P('', 0, 0, 0.5, '<path d="M0 0 V-60" stroke="#3FA34D" stroke-width="8"/><g transform="translate(0 -70)">' + (i % 2 ? SH.marigold : SH.petal) + '</g>')}</g></g>`).join('')}
    ${amb('y1am')}
    ${tag('y1t0', 'విశ్వానికి ఆధారం')}${tag('y1t1', 'ఆకాశం లాంటివాడు')}${tag('y1t2', 'మేఘం రంగు')}${tag('y1t3', 'శుభ రూపం')}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const [b0, b1, b2, b3] = beats(m, b), d = (b - m) / 4;
    tl.set('#sc1', { opacity: 1 }, a);
    ['#y1night', '#y1cloud', '#y1eq', '#y1globe'].forEach(e => tl.set(e, { opacity: 0 }, a));
    tl.set('#y1ven', { scale: 1, x: 0, y: 0 }, a);
    ambA(tl, 'y1am', a, b);
    for (let i = 0; i < 4; i++) tl.set(`#y1fl${i}`, { scale: 0, transformOrigin: '50% 100%', smoothOrigin: false }, a);
    tl.fromTo('#y1k', { y: 0 }, { y: -10, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: rep(0.8, b - a) }, a);
    // vishwadharam: the earth floats down and rests on his raised hand
    showTag(tl, 'y1t0', b0, d);
    tl.fromTo('#y1globe', { opacity: 0, y: -120, rotation: 0 }, { opacity: 1, y: 0, rotation: 40, duration: 1, ease: 'bounce.out' }, b0 + 0.1);
    tl.to('#y1globe', { rotation: 360, duration: 6, ease: 'none' }, b0 + 1.1);
    // gagana sadrisham: the sky opens up with stars and he grows tall like the sky
    showTag(tl, 'y1t1', b1, d);
    tl.to('#y1night', { opacity: 1, duration: 0.6 }, b1);
    tl.to('#y1ven', { scale: 1.25, transformOrigin: '50% 100%', duration: 0.9, ease: 'power2.out' }, b1 + 0.2);
    tl.to('#y1globe', { opacity: 0, duration: 0.3 }, b1);
    // megha varnam: a blue rain cloud comes, same colour as him
    showTag(tl, 'y1t2', b2, d);
    tl.to('#y1night', { opacity: 0, duration: 0.5 }, b2);
    tl.to('#y1ven', { scale: 1, x: -120, transformOrigin: '50% 100%', duration: 0.7, ease: 'power2.inOut' }, b2);
    tl.fromTo('#y1cloud', { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, b2 + 0.2);
    for (let i = 0; i < 5; i++) tl.fromTo(`#y1r${i}`, { opacity: 0, y: 0 }, { opacity: 1, y: 120, duration: 0.6, ease: 'power1.in', repeat: 2 }, b2 + 0.9 + i * 0.12);
    for (let i = 0; i < 4; i++) tl.to(`#y1fl${i}`, { scale: 1, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.5, ease: 'back.out(3)' }, b2 + 1.4 + i * 0.2);
    tl.fromTo('#y1k', { rotation: 0 }, { rotation: 8, transformOrigin: '50% 100%', smoothOrigin: false, duration: 0.2, yoyo: true, repeat: 5 }, b2 + 1.8);
    tl.fromTo('#y1eq', { transformOrigin: '50% 50%', opacity: 0, scale: 0 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, b2 + 1.0);
    // shubhangam: beautiful, auspicious form: sparkles and the child is amazed
    showTag(tl, 'y1t3', b3, d);
    ['#y1cloud', '#y1eq'].forEach(e => tl.to(e, { opacity: 0, duration: 0.4 }, b3));
    tl.to('#y1ven', { x: 0, duration: 0.6, ease: 'power2.inOut' }, b3);
    for (let i = 0; i < 6; i++) tl.fromTo(`#y1s${i}`, { transformOrigin: '50% 50%', opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)', yoyo: true, repeat: 1 }, b3 + 0.3 + i * 0.15);
    tl.fromTo('#y1k', { transformOrigin: '50% 100%', scale: 1 }, { scale: 1.15, transformOrigin: '50% 100%', duration: 0.3, yoyo: true, repeat: 3 }, b3 + 0.4);
  };

  // ---------- 2: Lakshmikantam Kamalanayanam Yogihruddhyanagamyam ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#FFE7F0', '#FFF8E6')}
    <path d="M-20 470 Q250 446 500 470 Q750 494 1020 462 V560 H-20Z" fill="#8FD07A" stroke="${O}" stroke-width="6"/>
    ${[120, 260, 880].map(x => P('', x, 470, 0.35, [-60, -30, 0, 30, 60].map(r => `<path d="M0 0 Q-26 -50 0 -96 Q26 -50 0 0Z" fill="#FF8FB1" stroke="${O}" stroke-width="8" transform="rotate(${r})"/>`).join(''))).join('')}
    <g id="x2pair">
      <g id="x2ven">${VEN('x2v', 420, 240, 0.52, { hold: 'abhaya', holdL: 'conch' })}</g>
      <g id="x2lak" opacity="0">${LAKSHMI('x2l', 640, 250, 0.5)}</g>
      <g id="x2hearts">${[0, 1, 2].map(i => `<g id="x2h${i}" opacity="0">${P('', 530, 160, 0.35, heartP(1, '#FF5C8A'))}</g>`).join('')}</g>
    </g>
    <g id="x2eye" opacity="0"><g transform="translate(500 270)">
      <circle r="190" fill="#FFF8E6" stroke="${O}" stroke-width="8"/>
      <g id="x2petal"><path d="M-150 0 Q0 -110 150 0 Q0 110 -150 0Z" fill="#FF8FB1" stroke="${O}" stroke-width="7"/></g>
      <g id="x2iris" opacity="0"><path d="M-150 0 Q0 -110 150 0 Q0 110 -150 0Z" fill="#fff" stroke="${O}" stroke-width="7"/><circle r="44" fill="#2B1407"/><circle cx="14" cy="-14" r="13" fill="#fff"/></g>
      </g></g>
    <g id="x2yogi" opacity="0">
      ${tree(860, 470, 0.7)}
      <g transform="translate(330 330)"><circle id="x2glow" r="120" fill="#FFF3B0" opacity=".7"/></g>
      ${SAGE('x2s', 330, 280, 0.55, { eyes: 'closed', sit: true })}
      <g id="x2heart" opacity="0">${P('', 330, 330, 0.5, heartP(1, '#FF5C8A'))}</g>
      <g id="x2bub" opacity="0"><g transform="translate(640 190)"><path d="M-170 -110 h340 v220 h-340Z" fill="none"/>${ST.thought(120, `<g transform="translate(0 14)">${VEN('x2bv', 0, 0, 0.28, { hold: 'abhaya', holdL: 'conch' })}</g>`)}</g></g>
    </g>
    <g id="x2gar" opacity="0"><path d="M360 210 Q420 330 480 210" fill="none" stroke="#2B1407" stroke-width="16" stroke-linecap="round"/><path d="M360 210 Q420 330 480 210" fill="none" stroke="#FF9F1C" stroke-width="10" stroke-dasharray="4 14" stroke-linecap="round"/>${[0, 1, 2, 3, 4].map(k => `<circle cx="${370 + k * 25}" cy="${220 + [0, 40, 56, 40, 0][k]}" r="9" fill="#FF5C8A" stroke="#2B1407" stroke-width="3"/>`).join('')}</g>
    ${amb('x2am')}
    ${tag('x2t0', 'లక్ష్మీ కాంతుడు')}${tag('x2t1', 'తామర కళ్ళు')}${tag('x2t2', 'యోగుల ధ్యానం')}${tag('x2t3', 'మనసులో దర్శనం')}
  </g>`;
  const a2 = (tl, a, m, b) => {
    const [b0, b1, b2, b3] = beats(m, b), d = (b - m) / 4;
    tl.set('#sc2', { opacity: 1 }, a);
    ['#x2lak', '#x2eye', '#x2yogi', '#x2heart', '#x2bub', '#x2iris'].forEach(e => tl.set(e, { opacity: 0 }, a));
    tl.set('#x2pair', { opacity: 1 }, a); tl.set('#x2gar', { opacity: 0 }, a);
    ambA(tl, 'x2am', a, b); tl.set('#x2petal', { opacity: 1 }, a);
    tl.fromTo('#x2ven', { x: 80 }, { x: 80, duration: 0.01 }, a);
    // lakshmikantam: Lakshmi comes to his side, hearts float up
    showTag(tl, 'x2t0', b0, d);
    tl.to('#x2ven', { x: 0, duration: 0.6, ease: 'power2.inOut' }, b0);
    tl.fromTo('#x2lak', { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' }, b0 + 0.2);
    for (let i = 0; i < 3; i++) tl.fromTo(`#x2h${i}`, { opacity: 0, y: 40, x: (i - 1) * 30 }, { opacity: 1, y: -60, duration: 1, ease: 'sine.out' }, b0 + 0.8 + i * 0.3).to(`#x2h${i}`, { opacity: 0, duration: 0.3 }, b0 + 1.8 + i * 0.3);
    tl.fromTo('#x2gar', { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.6, ease: 'bounce.out' }, b0 + 1.1);
    tl.to('#x2gar', { opacity: 0, duration: 0.3 }, b1);
    // kamala nayanam: a lotus petal turns into his eye
    showTag(tl, 'x2t1', b1, d);
    tl.to('#x2pair', { opacity: 0, duration: 0.3 }, b1);
    tl.fromTo('#x2eye', { transformOrigin: '50% 50%', opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, b1 + 0.1);
    tl.fromTo('#x2iris', { opacity: 0 }, { opacity: 1, duration: 0.6 }, b1 + 1.0);
    tl.to('#x2petal', { opacity: 0, duration: 0.6 }, b1 + 1.0);
    tl.to('#x2eye', { opacity: 0, duration: 0.3 }, b2);
    // yogi hrut dhyana gamyam: a sage meditates; his heart glows
    showTag(tl, 'x2t2', b2, d);
    tl.fromTo('#x2yogi', { opacity: 0 }, { opacity: 1, duration: 0.5 }, b2 + 0.1);
    tl.fromTo('#x2glow', { transformOrigin: '50% 50%', scale: 0.8 }, { scale: 1.1, transformOrigin: '50% 50%', duration: 0.8, yoyo: true, repeat: rep(0.8, b - b2), ease: 'sine.inOut' }, b2);
    tl.fromTo('#x2heart', { transformOrigin: '50% 50%', opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, b2 + 0.8);
    tl.to('#x2heart', { scale: 1.2, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 5 }, b2 + 1.2);
    // ... and sees Vishnu inside his heart
    showTag(tl, 'x2t3', b3, d);
    tl.fromTo('#x2bub', { transformOrigin: '50% 50%', opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, b3 + 0.1);
  };

  // ---------- 3: Vande Vishnum Bhavabhayaharam Sarvalokaikanatham ----------
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFF3D6', '#FFE0A8')}
    <g id="w3dark" opacity="0"><rect width="1000" height="540" fill="#2A1F4A" opacity=".75"/></g>
    <path d="M-20 470 Q250 446 500 470 Q750 494 1020 462 V560 H-20Z" fill="#8FD07A" stroke="${O}" stroke-width="6"/>
    <g id="w3rays" opacity="0"><g transform="translate(700 230)"><g id="w3rs">${[...Array(12)].map((_, i) => `<path d="M0 0 L-24 -330 L24 -330Z" fill="#FFE066" opacity=".55" transform="rotate(${i * 30})"/>`).join('')}</g></g></g>
    <g id="w3ven">${VEN('w3v', 700, 230, 0.55, { hold: 'chakra', holdL: 'conch' })}</g>
    <g id="w3orb" opacity="0"><g transform="translate(700 250)"><g id="w3spin">${[0, 1, 2].map(i => `<g transform="rotate(${i * 120}) translate(0 -150)"><g transform="rotate(${-i * 120})">${['<circle r="34" fill="#FFD23F" stroke="#2B1407" stroke-width="5"/>', '<g transform="scale(.17)">' + globe('w3e') + '</g>', '<circle r="30" fill="#8E6FC9" stroke="#2B1407" stroke-width="5"/><path d="M-20 -6 h40" stroke="#2B1407" stroke-width="4"/>'][i]}</g></g>`).join('')}</g></g></g>
    <g id="w3kid"><g transform="translate(250 330)"><g id="w3kb">${KID('w3k', 0, 0, 0.5, { mood: 'sm' })}</g></g></g>
    ${[[120, 200], [380, 170], [170, 400], [420, 380]].map(([x, y], i) => `<g id="w3f${i}" opacity="0">${P('', x, y, 0.65, i % 2 ? ghostIn : demonIn())}</g>`).join('')}
    <g id="w3disc" opacity="0">${P('', 0, 0, 1, `<circle r="30" fill="#FFE066" stroke="${O}" stroke-width="6"/>${[0, 45, 90, 135].map(r => `<line x1="-30" y1="0" x2="30" y2="0" stroke="${O}" stroke-width="4" transform="rotate(${r})"/>`).join('')}<circle r="9" fill="#FF8C1A" stroke="${O}" stroke-width="3"/>`)}</g>
    <g id="w3kids" opacity="0">${KID('w3a', 120, 330, 0.36, { mood: 'sm' })}${KID('w3b', 390, 330, 0.36, { mood: 'sm', flip: true })}</g>
    ${amb('w3am')}
    ${tag('w3t0', 'విష్ణువుకు నమస్కారం')}${tag('w3t1', 'భయాలు పోగొట్టేవాడు')}${tag('w3t2', 'అన్ని లోకాలకు')}${tag('w3t3', 'ఒక్కడే నాథుడు')}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const [b0, b1, b2, b3] = beats(m, b), d = (b - m) / 4;
    tl.set('#sc3', { opacity: 1 }, a);
    ['#w3dark', '#w3rays', '#w3orb', '#w3disc', '#w3kids', '#w3f0', '#w3f1', '#w3f2', '#w3f3'].forEach(e => tl.set(e, { opacity: 0 }, a));
    tl.set('#w3k-sm', { opacity: 1 }, a); tl.set('#w3k-sd', { opacity: 0 }, a);
    ambA(tl, 'w3am', a, b);
    tl.fromTo('#w3ven', { y: 0 }, { y: -8, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4, b - a) }, a);
    // vande vishnum: the child bows to Vishnu
    showTag(tl, 'w3t0', b0, d);
    tl.fromTo('#w3kb', { transformOrigin: '50% 100%', rotation: 0 }, { rotation: 22, transformOrigin: '50% 100%', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 3 }, b0 + 0.2);
    // bhava bhaya haram: scary shadows come, the chakra chases them away
    showTag(tl, 'w3t1', b1, d);
    tl.to('#w3dark', { opacity: 1, duration: 0.4 }, b1);
    tl.set('#w3k-sm', { opacity: 0 }, b1); tl.set('#w3k-sd', { opacity: 1 }, b1);
    for (let i = 0; i < 4; i++) tl.fromTo(`#w3f${i}`, { transformOrigin: '50% 50%', opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, b1 + 0.1 + i * 0.12);
    tl.fromTo('#w3kb', { x: 0 }, { x: 6, duration: 0.1, yoyo: true, repeat: 7 }, b1 + 0.4);
    tl.fromTo('#w3disc', { opacity: 1, x: 750, y: 200, rotation: 0 }, { x: 250, y: 260, rotation: 900, duration: 0.9, ease: 'power1.inOut' }, b1 + 1.0);
    tl.to('#w3disc', { x: 760, y: 200, rotation: 1800, duration: 0.8, ease: 'power1.inOut' }, b1 + 1.9);
    tl.set('#w3disc', { opacity: 0 }, b1 + 2.7);
    for (let i = 0; i < 4; i++) tl.to(`#w3f${i}`, { opacity: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.3 }, b1 + 1.2 + i * 0.12);
    tl.to('#w3dark', { opacity: 0, duration: 0.5 }, b1 + 1.6);
    tl.set('#w3k-sm', { opacity: 1 }, b1 + 1.7); tl.set('#w3k-sd', { opacity: 0 }, b1 + 1.7);
    // sarva loka: all the worlds circle around him
    showTag(tl, 'w3t2', b2, d);
    tl.fromTo('#w3orb', { transformOrigin: '50% 50%', opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, b2);
    tl.fromTo('#w3spin', { svgOrigin: '0 0', rotation: 0 }, { rotation: 360, svgOrigin: '0 0', duration: 5, ease: 'none', repeat: rep(5, b - b2) }, b2);
    // eka natham: the one Lord: light shines, all children bow
    showTag(tl, 'w3t3', b3, d);
    tl.fromTo('#w3rays', { opacity: 0 }, { opacity: 1, duration: 0.6 }, b3);
    tl.fromTo('#w3rs', { svgOrigin: '0 0', rotation: 0 }, { rotation: 60, svgOrigin: '0 0', duration: Math.max(1, b - b3), ease: 'none' }, b3);
    tl.fromTo('#w3kids', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, b3 + 0.3);
    tl.fromTo('#w3kb', { transformOrigin: '50% 100%', rotation: 0 }, { rotation: 22, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 3 }, b3 + 0.6);
    tl.fromTo('#w3kids', { y: 0 }, { y: -24, duration: 0.25, ease: 'sine.out', yoyo: true, repeat: 7 }, b3 + 1.0);
  };
  // play each scene's four beats twice: once word by word while the line is chanted, then again with the meaning
  const twice = f => (tl, a, m, b) => { if (m - a > 5) { f(tl, a, a + 0.4, m - 0.1); f(tl, m - 0.1, m, b); } else f(tl, a, m, b); };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3].map(twice) };
})();
