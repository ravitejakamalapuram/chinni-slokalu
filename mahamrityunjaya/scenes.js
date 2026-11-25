// Mahamrityunjaya: one picture-story per line, drawn in a 1000x540 window (#vis).
// SC.svg = all four scenes; SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
const SC = (() => {
  const { P, sky, cloud, stars, lotus, tree, diya, tx, SH, KID, SHIVA, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const eyeIcon = (x, id, third, y = 0) => `<g transform="translate(${x} ${y})${third ? ' rotate(90) scale(.8)' : ''}"><g id="${id}"><path d="M-34 0 Q0 -30 34 0 Q0 30 -34 0Z" fill="#fff" stroke="${O}" stroke-width="5"/><circle r="12" fill="${third ? RD : O}"/><circle cx="4" cy="-4" r="4" fill="#fff"/></g></g>`;
  // ---------- 0: Om Tryambakam Yajamahe: we worship the three-eyed Lord ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#C9D8FF', '#8C9FE6')}${stars([[80, 60], [230, 110], [760, 70], [930, 130], [610, 40]], 10)}
    <path d="M920 40 a46 46 0 1 0 30 80 a36 36 0 1 1 -30 -80Z" fill="#FFF3C4" stroke="${O}" stroke-width="5"/>
    <path d="M-20 400 L150 210 L250 300 L420 120 L560 290 L690 170 L850 330 L1020 230 V560 H-20Z" fill="#F4F8FF" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M150 210 L190 255 L160 250 L130 262Z M420 120 L470 180 L430 172 L395 190Z M690 170 L730 220 L700 214 L660 226Z" fill="#DCE6FF"/>
    ${grass(450, '#BFD4F2')}
    <circle id="m0halo" cx="500" cy="250" r="150" fill="#FFF3B0" opacity=".55"/>
    ${P('', 500, 460, 1, `<ellipse rx="150" ry="26" fill="#9AA5B1" stroke="${O}" stroke-width="6"/>`)}
    ${SHIVA('m0s', 500, 285, 0.75, { sit: true })}
    <g opacity="1">${P('', 500, 222, 0.6, `<g id="m0eye3" opacity="0"><g class="spinR">${[...Array(12)].map((_, i) => `<path d="M0 0 L-8 -70 L8 -70Z" fill="#FFE066" opacity=".8" transform="rotate(${i * 30})"/>`).join('')}</g><g transform="rotate(90)"><path d="M-22 0 Q0 -16 22 0 Q0 16 -22 0Z" fill="#fff" stroke="${O}" stroke-width="4"/><circle r="7" fill="${RD}"/></g></g>`)}</g>
    ${KID('m0k1', 150, 300, 0.5, { hold: 'lamp' })}${KID('m0k2', 850, 300, 0.5, { flip: true, hold: 'lotus' })}
    <g id="m0pill" opacity="0">${P('', 500, 80, 1, `<rect x="-110" y="-38" width="220" height="118" rx="40" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${eyeIcon(-46, 'm0e1', 0, 44)}${eyeIcon(46, 'm0e2', 0, 44)}${eyeIcon(0, 'm0e3', 1, -2)}`)}</g>
    <g id="m0fl">${[0, 1, 2, 3, 4, 5].map(i => `<g id="m0f${i}" opacity="0">${P('', 0, 0, 1, SH.marigold)}</g>`).join('')}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    tl.set('#sc0', { opacity: 1 }, a);
    tl.fromTo('#m0halo', { scale: 0.9 }, { scale: 1.08, transformOrigin: '50% 50%', duration: 0.9, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.9)), ease: 'sine.inOut' }, a);
    tl.fromTo('#m0pill', { opacity: 0 }, { opacity: 1, duration: 0.4 }, a + 0.3);
    ['#m0e1', '#m0e2', '#m0e3'].forEach((e, i) => tl.fromTo(e, { opacity: 0 }, { opacity: 1, duration: 0.35 }, a + 0.5 + i * 0.45));
    tl.fromTo('#m0eye3', { opacity: 0 }, { opacity: 1, duration: 0.6 }, a + 1.9);
    ['#m0k1', '#m0k2'].forEach(k => { tl.fromTo(k, { rotation: 0 }, { rotation: k === '#m0k1' ? 14 : -14, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 3 }, m); });
    for (let i = 0; i < 6; i++) {
      const sx = i % 2 ? 820 : 180, f = `#m0f${i}`;
      tl.fromTo(f, { x: sx, y: 380, opacity: 0, scale: 0.8 }, { x: 430 + i * 28, y: 430, opacity: 1, scale: 1.1, duration: 1.1, ease: 'power1.out' }, m + 0.2 + i * 0.18);
    }
  };
  // ---------- 1: Sugandhim Pushtivardhanam: fragrant, nourishes, makes us strong ----------
  const swirl = (i) => `<path id="m1w${i}" d="M0 0 q24 -26 0 -52 q-24 -26 0 -52 q24 -26 0 -52" fill="none" stroke="#FF8FB1" stroke-width="7" stroke-linecap="round" opacity="0"/>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#FFF4D6', '#CDEFB0')}
    <path d="M-20 360 Q180 250 380 340 Q600 230 820 330 Q930 270 1020 300 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>${grass(440, '#6BBF59')}
    <g id="m1rays" opacity="0">${[...Array(5)].map((_, i) => `<path d="M800 150 L${380 + i * 60} 440 L${420 + i * 60} 440Z" fill="#FFF3B0" opacity=".55"/>`).join('')}</g>
    <g id="m1tree">${tree(500, 450, 0.62, '#3E8E41')}</g>
    <g id="m1fruit">${[[440, 230], [560, 230], [500, 200], [420, 290], [585, 290], [500, 265]].map(([x, y], i) => `<g id="m1f${i}">${P('', x, y, 0.32, ST.mango)}</g>`).join('')}</g>
    ${SHIVA('m1s', 820, 140, 0.45)}${ST.bigCloud(820, 265, 0.7)}
    ${lotus(130, 470, 0.7)}${lotus(330, 485, 0.55)}${P('', 900, 470, 1.6, SH.marigold)}${P('', 980, 490, 1.2, SH.marigold)}
    <g transform="translate(130 400)">${swirl(0)}</g><g transform="translate(330 420)">${swirl(1)}</g><g transform="translate(900 430)">${swirl(2)}</g>
    <g id="m1kidw">${KID('m1k', 260, 280, 0.5, { hold: 'lotus', eyes: 'closed' })}</g>
    <g id="m1mus" opacity="0">${P('', 370, 175, 0.8, ST.muscle)}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    tl.set('#sc1', { opacity: 1 }, a);
    [0, 1, 2].forEach(i => { for (let k = a + i * 0.5; k < b - 0.5; k += 1.6) {
      tl.fromTo(`#m1w${i}`, { opacity: 0, y: 0 }, { opacity: 0.9, y: -40, duration: 0.6, ease: 'sine.out' }, k);
      tl.to(`#m1w${i}`, { opacity: 0, y: -90, duration: 0.7, ease: 'sine.in' }, k + 0.6); } });
    tl.fromTo('#m1tree', { scale: 0.25 }, { scale: 0.25, transformOrigin: '50% 100%', duration: 0.01 }, a);
    tl.fromTo('#m1fruit', { opacity: 0 }, { opacity: 0, duration: 0.01 }, a);
    tl.fromTo('#m1rays', { opacity: 0 }, { opacity: 1, duration: 0.5 }, m - 0.4);
    tl.to('#m1tree', { scale: 1, transformOrigin: '50% 100%', duration: 1.4, ease: 'back.out(1.4)' }, m - 0.2);
    tl.set('#m1fruit', { opacity: 1 }, m + 1.1);
    for (let i = 0; i < 6; i++) tl.fromTo(`#m1f${i}`, { scale: 0 }, { scale: 1, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(3)' }, m + 1.1 + i * 0.12);
    tl.set('#m1k-ec', { opacity: 1 }, a); tl.set('#m1k-eo', { opacity: 0 }, a);
    tl.set('#m1k-ec', { opacity: 0 }, m + 1.4); tl.set('#m1k-eo', { opacity: 1 }, m + 1.4);
    tl.fromTo('#m1kidw', { scale: 1 }, { scale: 1.22, transformOrigin: '260px 435px', duration: 0.8, ease: 'back.out(2)' }, m + 1.6);
    tl.fromTo('#m1mus', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, m + 2.0);
    tl.to('#m1mus', { rotation: 12, duration: 0.25, yoyo: true, repeat: 5 }, m + 2.5);
  };
  // ---------- 2: Urvarukamiva Bandhanan: like a ripe cucumber freed from the vine ----------
  const cuc = (id, s, face) => `<g id="${id}">${P('', 0, 0, s, `<ellipse id="${id}b" cx="0" cy="110" rx="52" ry="112" fill="#5DAA3C" stroke="${O}" stroke-width="6"/><path d="M-26 30 Q-34 110 -22 190 M0 10 V210 M26 30 Q34 110 22 190" stroke="#3E7E2A" stroke-width="5" fill="none" opacity=".6"/>${face ? `<circle cx="-18" cy="90" r="7" fill="${O}"/><circle cx="18" cy="90" r="7" fill="${O}"/><path d="M-16 116 Q0 130 16 116" stroke="${O}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-32" cy="108" r="8" fill="#FF8FB1" opacity=".7"/><circle cx="32" cy="108" r="8" fill="#FF8FB1" opacity=".7"/>` : ''}`)}</g>`;
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#E9F7FF', '#C6EBB8')}${cloud(150, 110, 0.6)}${cloud(860, 150, 0.5)}${grass(470, '#6BBF59')}
    <rect x="90" y="60" width="22" height="420" fill="#A0622D" stroke="${O}" stroke-width="5"/><rect x="888" y="60" width="22" height="420" fill="#A0622D" stroke="${O}" stroke-width="5"/>
    <rect x="70" y="56" width="860" height="22" rx="10" fill="#C47A3A" stroke="${O}" stroke-width="5"/>
    <path d="M100 74 Q180 110 260 74 T420 74 T580 74 T740 74 T900 74" fill="none" stroke="${O}" stroke-width="13"/><path d="M100 74 Q180 110 260 74 T420 74 T580 74 T740 74 T900 74" fill="none" stroke="#3FA34D" stroke-width="7"/>
    ${[150, 230, 330, 420, 610, 700, 800, 860].map((x, i) => P('', x, 96 + (i % 2) * 8, 1.5, SH.leaf)).join('')}
    ${[200, 380, 760].map(x => `<circle cx="${x}" cy="104" r="10" fill="#FFE066" stroke="${O}" stroke-width="3"/>`).join('')}
    <path d="M300 84 V140" stroke="#3FA34D" stroke-width="7"/><g transform="translate(300 140)">${cuc('m2c1', 0.45)}</g>
    <path d="M700 84 V130" stroke="#3FA34D" stroke-width="7"/><g transform="translate(700 130)">${cuc('m2c2', 0.4)}</g>
    <path id="m2stem" d="M500 84 V150" stroke="#3FA34D" stroke-width="8"/>
    <g transform="translate(500 150)"><g id="m2big">${cuc('m2c', 0.95, 1)}</g></g>
    <g id="m2snip" opacity="0">${P('', 500, 150, 1.4, SH.spark)}</g>
    ${KID('m2k', 830, 290, 0.5, { flip: true, mood: 'op' })}
  </g>`;
  const a2 = (tl, a, m, b) => {
    tl.set('#sc2', { opacity: 1 }, a);
    tl.fromTo('#m2cb', { attr: { fill: '#5DAA3C' } }, { attr: { fill: '#F2B933' }, duration: Math.max(0.8, m - a - 0.6), ease: 'none' }, a + 0.3);
    tl.fromTo('#m2big', { x: 0, y: 0, rotation: 0 }, { rotation: 4, transformOrigin: '50% 0%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((m - a) / 0.6) - 1), ease: 'sine.inOut' }, a);
    tl.fromTo('#m2snip', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1.3, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, m);
    tl.to('#m2snip', { opacity: 0, duration: 0.3 }, m + 0.4);
    tl.fromTo('#m2stem', { attr: { d: 'M500 84 V150' } }, { attr: { d: 'M500 84 V118' }, duration: 0.2 }, m + 0.1);
    tl.to('#m2big', { y: 190, rotation: -80, transformOrigin: '50% 50%', duration: 0.9, ease: 'bounce.out' }, m + 0.15);
    tl.set('#m2k-op', { opacity: 0 }, m + 0.9); tl.set('#m2k-sm', { opacity: 1 }, m + 0.9);
    tl.to('#m2k', { y: -30, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, m + 1.0);
    tl.set('#m2k-op', { opacity: 1 }, a); tl.set('#m2k-sm', { opacity: 0 }, a);
  };
  // ---------- 3: Mrityor Mukshiya Maamritat: free us from fear and death, give the nectar of joy ----------
  const pot = `<circle r="110" fill="#FFF3B0" opacity=".6"/><path d="M-60 -20 Q-90 70 0 90 Q90 70 60 -20Z" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-44" y="-38" width="88" height="22" rx="8" fill="${GD}" stroke="${O}" stroke-width="5"/><path d="M-30 -38 Q-60 -70 -40 -90 Q-20 -60 -6 -40Z M30 -38 Q60 -70 40 -90 Q20 -60 6 -40Z" fill="#4CAF50" stroke="${O}" stroke-width="4"/><circle cy="-56" r="24" fill="#A0622D" stroke="${O}" stroke-width="5"/><path d="M-50 30 Q0 50 50 30" stroke="${RD}" stroke-width="8" fill="none"/>`;
  const rope = (y, i) => `<g id="m3r${i}"><path id="m3rl${i}" d="M500 ${y} m-74 0 a74 18 0 0 0 74 18" fill="none" stroke="${O}" stroke-width="16"/><path d="M500 ${y} m-74 0 a74 18 0 0 0 74 18" fill="none" stroke="#C99A5B" stroke-width="8"/></g><g id="m3s${i}"><path d="M500 ${y + 18} a74 18 0 0 0 74 -18" fill="none" stroke="${O}" stroke-width="16"/><path d="M500 ${y + 18} a74 18 0 0 0 74 -18" fill="none" stroke="#C99A5B" stroke-width="8"/></g>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3a', '#2A2250', '#4B3A78')}<g id="m3gold" opacity="0">${bg('g3b', '#FFF3C4', '#FFC98A')}</g>
    ${grass(470, '#5E5A7A')}<g id="m3grass" opacity="0">${grass(470, '#6BBF59')}</g>
    <g id="m3beam" opacity="0"><path d="M440 0 L560 0 L700 540 L300 540Z" fill="#FFF3B0" opacity=".85"/></g>
    <g id="m3pot" opacity="0">${P('', 500, 75, 0.6, pot)}</g>
    <g id="m3drops">${[0, 1, 2, 3, 4].map(i => `<g id="m3d${i}" opacity="0">${P('', 0, 0, 1, SH.drop)}</g>`).join('')}</g>
    ${KID('m3k', 500, 250, 0.55, { mood: 'sd', eyes: 'closed' })}
    ${rope(280, 0)}${rope(322, 1)}${rope(372, 2)}
    <g id="m3cl">${[[90, 120, 1.1], [900, 110, 1], [140, 330, 0.9], [880, 340, 1], [330, 60, 0.8], [680, 70, 0.8]].map(([x, y, s], i) => `<g id="m3c${i}">${cloud(x, y, s, '#5B5470')}</g>`).join('')}</g>
    <g id="m3stars">${[[200, 200], [800, 220], [260, 420], [760, 430], [500, 40]].map(([x, y], i) => `<g id="m3st${i}" opacity="0">${P('', x, y, 1.3, SH.star5)}</g>`).join('')}</g>
    <g id="m3label" opacity="0">${tx('అమృతం', 690, 100, 48, '#FFF4D6', 9)}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    tl.set('#sc3', { opacity: 1 }, a);
    ['m3gold', 'm3grass', 'm3beam', 'm3pot', 'm3label'].forEach(i => tl.set('#' + i, { opacity: 0 }, a));
    tl.set('#m3k-sd', { opacity: 1 }, a); tl.set('#m3k-sm', { opacity: 0 }, a); tl.set('#m3k-ec', { opacity: 1 }, a); tl.set('#m3k-eo', { opacity: 0 }, a);
    for (let i = 0; i < 6; i++) tl.fromTo(`#m3c${i}`, { x: 0, opacity: 1 }, { x: i % 2 ? -20 : 20, duration: 0.8, yoyo: true, repeat: Math.max(1, Math.floor((m - a) / 0.8)), ease: 'sine.inOut' }, a);
    tl.fromTo('#m3k', { x: 0 }, { x: 6, duration: 0.12, yoyo: true, repeat: Math.max(1, Math.floor((m - a) / 0.12)), ease: 'none' }, a);
    tl.fromTo('#m3beam', { opacity: 0 }, { opacity: 1, duration: 0.25 }, m);
    tl.to('#m3beam', { opacity: 0, duration: 0.8 }, m + 1.2);
    for (let i = 0; i < 3; i++) {
      tl.fromTo(`#m3r${i}`, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: -260, y: 60 + i * 20, rotation: -50, opacity: 0, duration: 0.9, ease: 'power2.out' }, m + 0.3);
      tl.fromTo(`#m3s${i}`, { x: 0, y: 0, rotation: 0, opacity: 1 }, { x: 260, y: 60 + i * 20, rotation: 50, opacity: 0, duration: 0.9, ease: 'power2.out' }, m + 0.3);
    }
    for (let i = 0; i < 6; i++) tl.to(`#m3c${i}`, { x: i % 2 ? 700 : -700, opacity: 0, duration: 0.9, ease: 'power2.in' }, m + 0.4);
    tl.to('#m3gold', { opacity: 1, duration: 0.8 }, m + 0.4); tl.to('#m3grass', { opacity: 1, duration: 0.8 }, m + 0.4);
    tl.set('#m3k-sd', { opacity: 0 }, m + 0.6); tl.set('#m3k-sm', { opacity: 1 }, m + 0.6); tl.set('#m3k-ec', { opacity: 0 }, m + 0.6); tl.set('#m3k-eo', { opacity: 1 }, m + 0.6);
    tl.fromTo('#m3pot', { opacity: 0, scale: 0.3, y: -60 }, { opacity: 1, scale: 1, y: 0, transformOrigin: '50% 50%', duration: 0.7, ease: 'back.out(2)' }, m + 0.9);
    tl.fromTo('#m3label', { opacity: 0 }, { opacity: 1, duration: 0.4 }, m + 1.3);
    for (let i = 0; i < 5; i++) tl.fromTo(`#m3d${i}`, { x: 470 + i * 15, y: 130, opacity: 0 }, { y: 175, opacity: 1, duration: 0.45, ease: 'power1.in' }, m + 1.5 + i * 0.3).to(`#m3d${i}`, { opacity: 0, duration: 0.15 }, m + 1.95 + i * 0.3);
    tl.fromTo('#m3k', { y: 0 }, { y: -36, duration: 0.3, yoyo: true, repeat: 5, ease: 'power1.out' }, m + 1.0);
    for (let i = 0; i < 5; i++) tl.fromTo(`#m3st${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, m + 1.0 + i * 0.15);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
