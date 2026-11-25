// Sri Rama Rama Rameti: one picture-story per line, drawn in a 1000x540 window (#vis).
// SC.svg = all four scenes; SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
const SC = (() => {
  const { P, stars, cloud, lotus, tx, SH, KID, SHIVA, RAMA, VEN, DEVI, heartP, book, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const kailasa = `<path d="M-20 420 L140 230 L260 330 L430 110 L590 300 L720 190 L880 340 L1020 250 V560 H-20Z" fill="#F4F8FF" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><path d="M140 230 L180 275 L150 270 L120 282Z M430 110 L480 170 L440 162 L405 180Z M720 190 L760 240 L730 234 L690 246Z" fill="#DCE6FF"/>`;
  const rock = (x, y, w) => P('', x, y, 1, `<ellipse rx="${w}" ry="28" fill="#9AA5B1" stroke="${O}" stroke-width="6"/>`);
  const nm = (id, x, y, s = 1, op = 0) => `<g id="${id}" opacity="${op}">${P('', x, y, s, `<rect x="-62" y="-30" width="124" height="62" rx="31" fill="#FFF3C4" stroke="${O}" stroke-width="5"/>${tx('రామ', 0, 16, 44, RD, 0)}`)}</g>`;
  const rep = (a, b, d) => Math.max(1, Math.floor((b - a) / d));

  // ---------- 0: Sri Rama Rama Rameti: Shiva chants "Sri Rama, Rama, Rama" on his mala ----------
  const s0 = `<g id="sc0" opacity="0">${bg('r0', '#CFE0FF', '#93A9EA')}${stars([[80, 60], [250, 100], [770, 60], [930, 120]], 10)}
    ${kailasa}${grass(455, '#BFD4F2')}
    <circle id="r0halo" cx="400" cy="250" r="140" fill="#FFF3B0" opacity=".55"/>
    ${rock(400, 455, 140)}
    ${SHIVA('r0s', 400, 285, 0.72, { sit: true, hold: 'mala', eyes: 'closed', crown: 'none' })}
    <g id="r0words">${nm('r0n0', 680, 300, 0.9)}${nm('r0n1', 760, 210, 1)}${nm('r0n2', 840, 120, 1.1)}</g>
    <g id="r0sri" opacity="0">${P('', 572, 316, 1, tx('శ్రీ', 0, 0, 56, GD, 8))}</g>
    <g id="r0fl">${[0, 1, 2, 3, 4, 5].map(i => `<g id="r0f${i}" opacity="0">${P('', 0, 0, 1, SH.marigold)}</g>`).join('')}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    tl.set('#sc0', { opacity: 1 }, a);
    tl.fromTo('#r0halo', { scale: 0.9 }, { scale: 1.08, transformOrigin: '50% 50%', duration: 0.9, yoyo: true, repeat: rep(a, b, 0.9), ease: 'sine.inOut' }, a);
    tl.fromTo('#r0sri', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, a + 0.3);
    const step = Math.max(0.5, Math.min(1.1, (m - a - 0.8) / 3));
    for (let i = 0; i < 3; i++) {
      tl.fromTo(`#r0n${i}`, { opacity: 0, x: -200 + i * 40, y: 120 + i * 40, scale: 0.3 }, { opacity: 1, x: 0, y: 0, scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(1.6)' }, a + 0.6 + i * step);
    }
    // the words bounce together at the meaning moment
    for (let i = 0; i < 3; i++) tl.to(`#r0n${i}`, { y: -24, duration: 0.25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, m + i * 0.12);
    for (let i = 0; i < 6; i++) tl.fromTo(`#r0f${i}`, { x: 180 + i * 90, y: -30, opacity: 0, rotation: 0 }, { y: 470, opacity: 1, rotation: 240, duration: 2.2, ease: 'none' }, m + 0.2 + i * 0.25);
  };

  // ---------- 1: Rame Rame Manorame: Shiva rejoices in Rama, the joy of the heart ----------
  const s1 = `<g id="sc1" opacity="0">${bg('r1', '#FFF1D6', '#FFC9A8')}
    <g id="r1rays" opacity="0">${P('', 640, 250, 1, `<g class="spinR">${[...Array(12)].map((_, i) => `<path d="M0 0 L-30 -420 L30 -420Z" fill="#FFF3B0" opacity=".7" transform="rotate(${i * 30})"/>`).join('')}</g>`)}</g>
    ${grass(460, '#8CCB6E')}
    ${SHIVA('r1s', 240, 270, 0.62, { sit: true, mood: 'sm' })}${rock(240, 455, 120)}
    <g id="r1heart">${P('', 640, 260, 1.9, heartP(1, '#FF5C7A'))}</g>
    <g id="r1rama" opacity="0">${RAMA('r1r', 640, 215, 0.38)}</g>
    <g id="r1hs">${[0, 1, 2, 3, 4, 5].map(i => `<g id="r1h${i}" opacity="0">${P('', 0, 0, 1, SH.heart)}</g>`).join('')}</g>
    <g id="r1lbl" opacity="0">${tx('మనోరమ', 640, 520, 44, '#FFF4D6', 8)}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    tl.set('#sc1', { opacity: 1 }, a);
    ['#r1rays', '#r1rama', '#r1lbl'].forEach(s => tl.set(s, { opacity: 0 }, a));
    tl.fromTo('#r1heart', { scale: 0.5 }, { scale: 0.62, transformOrigin: '50% 50%', duration: 0.45, yoyo: true, repeat: rep(a, m, 0.45), ease: 'sine.inOut' }, a);
    tl.to('#r1heart', { scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, m - 0.3);
    tl.fromTo('#r1rama', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 60%', duration: 0.7, ease: 'back.out(2)' }, m);
    tl.to('#r1rays', { opacity: 1, duration: 0.6 }, m);
    tl.to('#r1lbl', { opacity: 1, duration: 0.4 }, m + 0.6);
    tl.fromTo('#r1s', { rotation: -5 }, { rotation: 5, transformOrigin: '50% 90%', duration: 0.5, yoyo: true, repeat: rep(m, b, 0.5), ease: 'sine.inOut' }, m);
    for (let i = 0; i < 6; i++) tl.fromTo(`#r1h${i}`, { x: 240 + (i % 3 - 1) * 50, y: 260, opacity: 0, scale: 0.5 }, { x: 260 + (i % 3 - 1) * 90, y: 40, opacity: 1, scale: 1.2, duration: 1.4, ease: 'sine.out' }, m + 0.3 + i * 0.35)
      .to(`#r1h${i}`, { opacity: 0, duration: 0.3 }, m + 1.7 + i * 0.35);
  };

  // ---------- 2: Sahasranama Tattulyam: one "Rama" weighs the same as a thousand names ----------
  const pan = (x, inner, id) => `<g id="${id}"><g transform="translate(${x} 0)"><path d="M-70 0 L0 -150 L70 0" fill="none" stroke="${O}" stroke-width="4"/><path d="M-90 0 Q0 46 90 0Z" fill="${GD}" stroke="${O}" stroke-width="6"/>${inner}</g></g>`;
  const books = [...Array(8)].map((_, i) => `<g id="r2b${i}" opacity="0">${P('', (i % 2 ? 10 : -10), -22 - i * 26, 0.55, book(['#2E86DE', RD, '#2FA36B', '#8E44AD'][i % 4]))}</g>`).join('');
  const s2 = `<g id="sc2" opacity="0">${bg('r2', '#E9F6FF', '#BFE3F7')}
    ${cloud(120, 80, 0.7)}${cloud(880, 70, 0.6)}
    <g id="r2ven">${VEN('r2v', 500, 90, 0.22)}</g>
    <rect x="488" y="150" width="24" height="330" fill="#A0622D" stroke="${O}" stroke-width="6"/><rect x="400" y="470" width="200" height="30" rx="12" fill="#A0622D" stroke="${O}" stroke-width="6"/>
    <g id="r2beam" transform="translate(500 170)"><g id="r2bi"><rect x="-290" y="-10" width="580" height="20" rx="10" fill="${GD}" stroke="${O}" stroke-width="6"/>
      <g id="r2L" transform="translate(-280 0)"><g transform="translate(0 150)">${pan(0, books, 'r2pl')}</g></g>
      <g id="r2R" transform="translate(280 0)"><g transform="translate(0 150)">${pan(0, `<g id="r2one" opacity="0">${P('', 0, -34, 0.95, `<rect x="-62" y="-30" width="124" height="62" rx="31" fill="#FFF3C4" stroke="${O}" stroke-width="5"/>${tx('రామ', 0, 16, 44, RD, 0)}`)}</g>`, 'r2pr')}</g></g>
    </g></g>
    <circle cx="500" cy="170" r="16" fill="${RD}" stroke="${O}" stroke-width="5"/>
    <g id="r2l1000" opacity="0">${P('', 220, 520, 1, tx('1000 నామాలు', 0, 0, 40, '#FFF4D6', 8))}</g>
    <g id="r2eq" opacity="0">${P('', 500, 300, 1, `<circle r="44" fill="#fff" stroke="${O}" stroke-width="6"/><path d="M-22 -10 H22 M-22 12 H22" stroke="${RD}" stroke-width="10" stroke-linecap="round"/>`)}</g>
    <g id="r2st">${[[160, 200], [840, 210], [300, 90], [700, 100]].map(([x, y], i) => `<g id="r2s${i}" opacity="0">${P('', x, y, 1.3, SH.star5)}</g>`).join('')}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    tl.set('#sc2', { opacity: 1 }, a);
    ['#r2one', '#r2eq', '#r2l1000'].forEach(s => tl.set(s, { opacity: 0 }, a));
    // books pile up on the left; the beam tips down to the left
    const st = Math.max(0.15, Math.min(0.35, (m - a - 1.2) / 8));
    for (let i = 0; i < 8; i++) tl.fromTo(`#r2b${i}`, { opacity: 0, y: -80 }, { opacity: 1, y: 0, duration: 0.25, ease: 'bounce.out' }, a + 0.2 + i * st);
    tl.to('#r2l1000', { opacity: 1, duration: 0.3 }, a + 0.4);
    const tip = (deg, t, d) => { tl.to('#r2bi', { rotation: deg, svgOrigin: '0 0', duration: d, ease: 'power2.inOut' }, t);
      tl.to('#r2L > g', { rotation: -deg, duration: d, ease: 'power2.inOut' }, t); tl.to('#r2R > g', { rotation: -deg, duration: d, ease: 'power2.inOut' }, t); };
    tl.set('#r2bi', { rotation: 0, svgOrigin: '0 0' }, a); tl.set(['#r2L > g', '#r2R > g'], { rotation: 0 }, a);
    tip(-14, a + 0.4, 8 * st + 0.4);
    // one golden "Rama" drops on the right: the beam levels out, equal!
    tl.fromTo('#r2one', { opacity: 0, y: -160 }, { opacity: 1, y: 0, duration: 0.45, ease: 'bounce.out' }, m - 0.2);
    tip(0, m + 0.2, 0.9);
    tl.fromTo('#r2eq', { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(3)' }, m + 1.0);
    tl.fromTo('#r2one', { scale: 1 }, { scale: 1.15, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: rep(m + 1.1, b, 0.4), ease: 'sine.inOut' }, m + 1.1);
    for (let i = 0; i < 4; i++) tl.fromTo(`#r2s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, m + 1.1 + i * 0.15);
  };

  // ---------- 3: Rama Nama Varanane: Shiva tells Parvati: say just "Rama"! ----------
  const s3 = `<g id="sc3" opacity="0">${bg('r3', '#D6E4FF', '#A9C2F2')}${stars([[90, 70], [900, 90], [520, 40]], 10)}
    ${kailasa}${grass(460, '#BFD4F2')}
    <circle cx="380" cy="250" r="190" fill="#FFF3B0" opacity=".45"/>
    ${rock(380, 458, 220)}
    ${SHIVA('r3s', 290, 280, 0.6, { sit: true, hold: 'abhaya' })}
    ${DEVI('r3p', 480, 300, 0.55, '#2FA36B', RD, { sit: true, hold: 'lotus', mood: 'op' })}
    <g id="r3bub" opacity="0">${P('', 160, 125, 1, `<path d="M-90 -40 Q-90 -70 -60 -70 H60 Q90 -70 90 -40 V20 Q90 50 60 50 H10 L40 90 L-20 50 H-60 Q-90 50 -90 20Z" fill="#fff" stroke="${O}" stroke-width="6"/>${tx('రామ', 0, 0, 52, RD, 0)}`)}</g>
    <g id="r3kids" opacity="0">${KID('r3k1', 720, 330, 0.42, { hold: 'lamp' })}${KID('r3k2', 880, 330, 0.42, { flip: true, hold: 'lotus' })}</g>
    <g id="r3ns">${[0, 1, 2, 3].map(i => nm('r3n' + i, 0, 0, 0.7)).join('')}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    tl.set('#sc3', { opacity: 1 }, a);
    ['#r3bub', '#r3kids'].forEach(s => tl.set(s, { opacity: 0 }, a));
    tl.set('#r3p-op', { opacity: 1 }, a); tl.set('#r3p-sm', { opacity: 0 }, a);
    tl.fromTo('#r3s-head', { rotation: 0 }, { rotation: 8, svgOrigin: '0 0', duration: 0.6, yoyo: true, repeat: rep(a, m, 0.6), ease: 'sine.inOut' }, a);
    tl.fromTo('#r3bub', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, svgOrigin: '160 215', duration: 0.5, ease: 'back.out(2.5)' }, a + 0.5);
    tl.set('#r3p-op', { opacity: 0 }, m); tl.set('#r3p-sm', { opacity: 1 }, m);
    tl.fromTo('#r3p', { y: 0 }, { y: -14, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, m);
    tl.fromTo('#r3kids', { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.6, ease: 'back.out(1.6)' }, m + 0.3);
    for (let i = 0; i < 4; i++) tl.fromTo(`#r3n${i}`, { x: 760 + (i % 2) * 140, y: 230, opacity: 0, scale: 0.4 }, { x: 640 + i * 90, y: 60 + (i % 2) * 50, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.6)' }, m + 0.8 + i * 0.35);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
