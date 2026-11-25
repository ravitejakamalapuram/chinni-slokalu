// Krishna (Vasudeva sutam devam): one picture-story per line, drawn in a 1000x540 window (#vis).
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
const SC = (() => {
  const { P, cloud, stars, lotus, tree, tx, SH, KID, fig, globe, book, wavesP, O, GD, RD } = ST;
  const W = 1000, H = 540, BLUE = '#3E6FD0';
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const feather = `<g transform="translate(26 -150) rotate(18)"><path d="M0 40 Q-4 -10 0 -60" stroke="${O}" stroke-width="6" fill="none"/><ellipse cy="-58" rx="22" ry="38" fill="#2FA36B" stroke="${O}" stroke-width="5"/><ellipse cy="-52" rx="13" ry="22" fill="#2E86DE"/><ellipse cy="-50" rx="7" ry="11" fill="#1B2A6B"/></g>`;
  const flute = `<g transform="translate(14 -6) rotate(16)"><rect x="0" y="-9" width="200" height="18" rx="9" fill="#A0622D" stroke="${O}" stroke-width="5"/>${[60, 95, 130, 165].map(x => `<circle cx="${x}" r="4" fill="${O}"/>`).join('')}<rect x="40" y="-11" width="10" height="22" fill="${GD}"/></g>`;
  const KRISHNA = (id, x, y, s, o = {}) => { const g = fig(Object.assign({ id, x, y, s, skin: BLUE, cloth: '#FFC93C', top: BLUE, crown: 'mukut', extra: feather + (o.flute ? flute : '') }, o));
    return o.flute ? g.replace(`<g id="${id}-aR">`, `<g id="${id}-aR" transform="rotate(-99 56 60)">`).replace(`<g id="${id}-aL">`, `<g id="${id}-aL" transform="rotate(-128 -56 60)">`) : g; };
  const VASU = (id, x, y, s, o = {}) => fig(Object.assign({ id, x, y, s, skin: '#E0A875', cloth: '#FFFFFF', top: '#F4A259', crown: 'kid', beard: '#2B1407' }, o));
  const DEVAKI = (id, x, y, s, o = {}) => fig(Object.assign({ id, x, y, s, skin: '#F3C08B', cloth: '#E8A23A', drape: '#C0392B', female: true, crown: 'none' }, o));
  // baby Krishna swaddled (centre 0,0, ~120 wide)
  const baby = (id) => `<g id="${id}"><ellipse cx="0" cy="30" rx="62" ry="34" fill="#FFC93C" stroke="${O}" stroke-width="5"/><path d="M-50 22 Q0 52 50 22" stroke="#E8A23A" stroke-width="6" fill="none"/><circle cx="0" cy="-10" r="36" fill="${BLUE}" stroke="${O}" stroke-width="5"/><path d="M-30 -26 Q0 -56 30 -26 Q10 -38 0 -36 Q-12 -38 -30 -26Z" fill="#1B1B3A"/><path d="M-14 -12 q5 5 10 0 M4 -12 q5 5 10 0" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-9 2 Q0 10 9 2" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="-20" cy="-2" r="5" fill="#FF8FB1" opacity=".7"/><circle cx="20" cy="-2" r="5" fill="#FF8FB1" opacity=".7"/><path d="M0 -40 V-30" stroke="${RD}" stroke-width="4" stroke-linecap="round"/><g transform="translate(14 -44) rotate(20) scale(.5)"><ellipse cy="-30" rx="18" ry="30" fill="#2FA36B" stroke="${O}" stroke-width="5"/><ellipse cy="-26" rx="9" ry="15" fill="#2E86DE"/></g></g>`;
  const basket = `<path d="M-90 -10 Q-80 60 0 64 Q80 60 90 -10Z" fill="#C99A5B" stroke="${O}" stroke-width="6"/><path d="M-80 10 H80 M-70 32 H70" stroke="#8B5E34" stroke-width="5"/>`;
  const hood = `${[-2, -1, 0, 1, 2].map(k => `<g transform="translate(${k * 44} ${Math.abs(k) * 22}) rotate(${k * 14})"><ellipse rx="30" ry="44" fill="#4A7C59" stroke="${O}" stroke-width="5"/><circle cx="-9" cy="-14" r="5" fill="#FFE066"/><circle cx="9" cy="-14" r="5" fill="#FFE066"/><path d="M0 0 L-8 22 M0 0 L8 22" stroke="${RD}" stroke-width="3"/></g>`).join('')}<path d="M-30 50 Q0 30 30 50 L20 240 Q0 260 -20 240Z" fill="#6FA37F" stroke="${O}" stroke-width="5"/>`;
  const label = (id, t, x, y, fs = 40) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFF4D6', 9)}</g>`;
  const rain = [...Array(22)].map((_, i) => `<line id="k0r${i}" x1="${(i * 47) % 1000}" y1="0" x2="${(i * 47) % 1000 - 14}" y2="34" stroke="#BFD4FF" stroke-width="5" stroke-linecap="round" opacity=".8"/>`).join('');

  // ---------- 0: Vasudeva sutam devam: Vasudeva carries baby Krishna across the stormy Yamuna ----------
  const s0 = `<g id="sc0" opacity="0">${bg('k0', '#1E2752', '#3B4C8C')}${stars([[90, 60], [260, 40], [720, 50], [930, 90]], 9)}
    <g id="k0cl">${cloud(160, 90, 1.1, '#5B6290')}${cloud(820, 70, 1.2, '#5B6290')}</g>
    <path id="k0bolt" opacity="0" d="M610 0 L570 90 L600 90 L560 170 L640 70 L608 70 L640 0Z" fill="#FFF36B" stroke="${O}" stroke-width="4"/>
    <g id="k0walk"><g transform="translate(0 70)"><g id="k0v">${VASU('k0f', 0, 255, 0.5)}
      <g id="k0snake">${P('', 0, 40, 0.75, hood)}</g>
      <g id="k0glow" opacity="0"><circle cx="0" cy="150" r="90" fill="#FFF3B0" opacity=".7"/></g>
      ${P('', 0, 150, 0.7, basket)}<g transform="translate(0 132) scale(.7)">${baby('k0b')}</g></g></g></g>
    <g id="k0w1">${wavesP(430, '#2E86DE')}</g><g id="k0w2">${wavesP(470, '#1F6FB8')}</g>
    <g id="k0rain">${rain}</g>
    <g id="k0sp">${[[-80, 90], [80, 100], [-60, 190], [70, 200]].map(([x, y], i) => `<g id="k0s${i}" opacity="0">${P('', x, y, 0.9, SH.spark)}</g>`).join('')}</g>
    ${label('k0l', 'వసుదేవుడు', 500, 520, 40)}
  </g>`;
  const a0 = (tl, a, m, b) => {
    tl.set('#sc0', { opacity: 1 }, a); tl.set(['#k0glow', '#k0l'], { opacity: 0 }, a);
    tl.fromTo('#k0walk', { x: 170 }, { x: 640, duration: b - a, ease: 'none' }, a);
    tl.fromTo('#k0v', { y: 0 }, { y: -10, duration: 0.35, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.35)), ease: 'sine.inOut' }, a);
    tl.fromTo('#k0w1', { x: 0 }, { x: -180, duration: 2, repeat: Math.ceil((b - a) / 2), ease: 'none' }, a);
    tl.fromTo('#k0w2', { x: -90 }, { x: 90, duration: 2.4, repeat: Math.ceil((b - a) / 2.4), ease: 'none' }, a);
    for (let i = 0; i < 22; i++) tl.fromTo(`#k0r${i}`, { y: -40 - (i % 5) * 80 }, { y: 560, duration: 0.8, repeat: Math.ceil((b - a) / 0.8), ease: 'none' }, a + (i % 7) * 0.1);
    tl.fromTo('#k0snake', { rotation: -4 }, { rotation: 4, transformOrigin: '50% 100%', duration: 0.7, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.7)), ease: 'sine.inOut' }, a);
    tl.fromTo('#k0bolt', { opacity: 0 }, { opacity: 1, duration: 0.08, yoyo: true, repeat: 3 }, a + 0.6);
    tl.fromTo('#k0glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, m);
    for (let i = 0; i < 4; i++) tl.fromTo(`#k0s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: 3, ease: 'back.out(3)' }, m + 0.2 + i * 0.15);
    tl.fromTo('#k0l', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, m + 0.3);
  };

  // ---------- 1: Kamsa Chanura mardanam: little Krishna topples the big wrestler, Kamsa's crown falls ----------
  const crowd = [...Array(9)].map((_, i) => `<g id="k1c${i}"><circle cx="${60 + i * 110}" cy="200" r="26" fill="${['#E9B68A', '#C68B59', '#F3C08B'][i % 3]}" stroke="${O}" stroke-width="4"/><rect x="${36 + i * 110}" y="222" width="48" height="40" rx="14" fill="${['#FF8C1A', '#2EC4B6', '#E63946', '#9B5DE5'][i % 4]}" stroke="${O}" stroke-width="4"/></g>`).join('');
  const s1 = `<g id="sc1" opacity="0">${bg('k1', '#FFE3A8', '#F7B267')}
    <rect x="-10" y="150" width="1020" height="120" fill="#C97B4A" stroke="${O}" stroke-width="6"/>${crowd}
    <path d="M-20 330 Q500 300 1020 330 V560 H-20Z" fill="#E8C07A" stroke="${O}" stroke-width="6"/>
    <g id="k1throne">${P('', 840, 230, 1, `<rect x="-70" y="-110" width="140" height="190" rx="20" fill="#7B2CBF" stroke="${O}" stroke-width="6"/><rect x="-80" y="40" width="160" height="40" rx="10" fill="${GD}" stroke="${O}" stroke-width="5"/>`)}</g>
    <g id="k1kamsa">${fig({ id: 'k1k', x: 840, y: 170, s: 0.38, skin: '#C68B59', cloth: '#5A189A', top: '#9B5DE5', crown: 'none', beard: '#2B1407', mood: 'op', sit: true })}</g>
    <g id="k1crown">${P('', 840, 112, 0.42, `<path d="M-50 -10 L50 -10 L42 -50 L24 -32 L0 -74 L-24 -32 L-42 -50Z" fill="${GD}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/><circle cx="0" cy="-34" r="7" fill="${RD}"/>`)}</g>
    <g id="k1chan"><g id="k1ch">${fig({ id: 'k1cw', x: 0, y: 0, s: 0.62, skin: '#B5764A', cloth: '#C0392B', top: '#B5764A', crown: 'none', belly: true, beard: '#2B1407', mood: 'sd' })}</g></g>
    <g id="k1kr">${KRISHNA('k1kf', 0, 0, 0.42)}</g>
    <g id="k1bonk" opacity="0">${P('', 0, 0, 1.6, SH.star5)}</g>
    <g id="k1dz">${[0, 1, 2].map(i => `<g id="k1z${i}" opacity="0">${P('', 0, 0, 0.7, SH.star5)}</g>`).join('')}</g>
    <g id="k1cf">${[...Array(10)].map((_, i) => `<g id="k1f${i}" opacity="0">${P('', 0, 0, 1, i % 2 ? SH.conf : SH.conf2)}</g>`).join('')}</g>
    ${label('k1l1', 'చాణూరుడు', 520, 120, 34)}${label('k1l2', 'కంసుడు', 840, 60, 34)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set('#k1chan', { x: 560, y: 150, rotation: 0 }, a); tl.set('#k1kr', { x: 220, y: 230, rotation: 0 }, a);
    tl.set('#k1crown', { x: 0, y: 0, rotation: 0, opacity: 1 }, a); tl.set('#k1kamsa', { x: 0, y: 0, rotation: 0 }, a);
    tl.set(['#k1l1', '#k1l2'], { opacity: 0 }, a);
    tl.to(['#k1l1', '#k1l2'], { opacity: 1, duration: 0.4 }, a + 0.4);
    const pre = Math.max(0.6, m - a - 0.2);
    tl.fromTo('#k1ch', { y: 0 }, { y: -16, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor(pre / 0.3)), ease: 'power1.out' }, a);
    tl.fromTo('#k1kamsa', { rotation: -3 }, { rotation: 3, transformOrigin: '50% 100%', duration: 0.25, yoyo: true, repeat: Math.max(1, Math.floor(pre / 0.25)), ease: 'sine.inOut' }, a);
    for (let i = 0; i < 9; i++) tl.fromTo(`#k1c${i}`, { y: 0 }, { y: -8, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.3)), ease: 'sine.inOut' }, a + i * 0.07);
    // Krishna leaps to the wrestler
    tl.to('#k1kr', { x: 420, y: 150, duration: 0.35, ease: 'power2.out' }, m - 0.1);
    tl.to('#k1kr', { x: 470, y: 230, duration: 0.25, ease: 'power2.in' }, m + 0.25);
    tl.fromTo('#k1bonk', { x: 520, y: 170, opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1.2, transformOrigin: '50% 50%', duration: 0.25, ease: 'back.out(3)' }, m + 0.2);
    tl.to('#k1bonk', { opacity: 0, duration: 0.25 }, m + 0.6);
    tl.to('#k1chan', { x: 650, y: 270, rotation: 84, transformOrigin: '50% 100%', duration: 0.7, ease: 'bounce.out' }, m + 0.3);
    tl.to('#k1l1', { opacity: 0, duration: 0.3 }, m + 0.3);
    for (let i = 0; i < 3; i++) tl.fromTo(`#k1z${i}`, { x: 690 + i * 40, y: 250, opacity: 0 }, { opacity: 1, y: 230, rotation: 360, transformOrigin: '50% 50%', duration: 0.6, repeat: 3, ease: 'none' }, m + 1.0 + i * 0.1);
    // Kamsa's crown pops off, Kamsa tumbles behind the throne
    tl.to('#k1crown', { x: -160, y: 230, rotation: -200, transformOrigin: '50% 50%', duration: 0.9, ease: 'bounce.out' }, m + 0.8);
    tl.to('#k1kamsa', { y: 120, rotation: 30, transformOrigin: '50% 100%', opacity: 0, duration: 0.6, ease: 'power2.in' }, m + 1.0);
    tl.to('#k1l2', { opacity: 0, duration: 0.3 }, m + 1.0);
    // Krishna cheers
    tl.to('#k1kr', { x: 380, duration: 0.4 }, m + 0.8);
    tl.to('#k1kr', { y: 200, duration: 0.25, yoyo: true, repeat: 5, ease: 'power1.out' }, m + 1.2);
    for (let i = 0; i < 10; i++) tl.fromTo(`#k1f${i}`, { x: 60 + i * 95, y: -20, opacity: 1, rotation: 0 }, { y: 560, rotation: 540, duration: 2.2, ease: 'none' }, m + 1.1 + (i % 4) * 0.2);
  };

  // ---------- 2: Devaki paramanandam: Devaki in prison, bars vanish, baby Krishna in her arms, overjoyed ----------
  const bars = [...Array(9)].map((_, i) => `<rect x="${80 + i * 105}" y="-10" width="22" height="560" rx="8" fill="#6C757D" stroke="${O}" stroke-width="5"/>`).join('');
  const s2 = `<g id="sc2" opacity="0">${bg('k2a', '#3D3552', '#5B5470')}<g id="k2sun" opacity="0">${bg('k2b', '#FFF1C9', '#FFC1D6')}${P('', 500, 210, 1, `<circle r="170" fill="#FFF3B0" opacity=".8"/>`)}</g>
    ${grass(470, '#8C7FA8')}<g id="k2gr" opacity="0">${grass(470, '#7CC26B')}</g>
    ${DEVAKI('k2d', 500, 210, 0.62, { mood: 'sd', eyes: 'closed' })}
    <g id="k2baby" opacity="0"><g transform="translate(500 330) scale(.85)">${baby('k2b')}</g></g>
    <g id="k2bars">${bars}<rect x="40" y="40" width="940" height="22" rx="8" fill="#6C757D" stroke="${O}" stroke-width="5"/></g>
    <g id="k2tear" opacity="0">${P('', 470, 180, 0.6, SH.drop)}</g>
    <g id="k2hearts">${[...Array(7)].map((_, i) => `<g id="k2h${i}" opacity="0">${P('', 0, 0, 1 + (i % 3) * 0.3, SH.heart)}</g>`).join('')}</g>
    ${label('k2l', 'దేవకీ అమ్మ', 500, 515, 40)}
  </g>`;
  const a2 = (tl, a, m, b) => {
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#k2sun', '#k2gr', '#k2baby', '#k2l'], { opacity: 0 }, a); tl.set('#k2bars', { y: 0, opacity: 1 }, a);
    tl.set('#k2d-sd', { opacity: 1 }, a); tl.set('#k2d-sm', { opacity: 0 }, a); tl.set('#k2d-ec', { opacity: 1 }, a); tl.set('#k2d-eo', { opacity: 0 }, a);
    tl.fromTo('#k2tear', { y: 0, opacity: 0 }, { y: 50, opacity: 1, duration: 0.8, repeat: Math.max(1, Math.floor((m - a) / 0.8) - 1), ease: 'power1.in' }, a + 0.3);
    tl.set('#k2tear', { opacity: 0 }, m);
    tl.to('#k2bars', { y: -600, duration: 0.8, ease: 'power2.in' }, m);
    tl.to(['#k2sun', '#k2gr'], { opacity: 1, duration: 0.8 }, m + 0.2);
    tl.fromTo('#k2baby', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.6, ease: 'back.out(2)' }, m + 0.5);
    tl.set('#k2d-sd', { opacity: 0 }, m + 0.7); tl.set('#k2d-sm', { opacity: 1 }, m + 0.7); tl.set('#k2d-ec', { opacity: 0 }, m + 0.7); tl.set('#k2d-eo', { opacity: 1 }, m + 0.7);
    tl.fromTo('#k2baby', { rotation: -6 }, { rotation: 6, transformOrigin: '50% 80%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - m - 1.2) / 0.6)), ease: 'sine.inOut' }, m + 1.1);
    for (let i = 0; i < 7; i++) tl.fromTo(`#k2h${i}`, { x: 330 + i * 55, y: 360, opacity: 0, scale: 0.4 }, { y: 60, opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 1.8, ease: 'sine.out' }, m + 0.9 + i * 0.2).to(`#k2h${i}`, { opacity: 0, duration: 0.3 }, m + 2.7 + i * 0.2);
    tl.fromTo('#k2l', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, m + 0.6);
  };

  // ---------- 3: Krishnam vande jagadgurum: Krishna plays the flute over the world, teaches the Gita, everyone bows ----------
  const s3 = `<g id="sc3" opacity="0">${bg('k3', '#CFE8FF', '#FFE3F1')}
    <g id="k3rays">${[...Array(12)].map((_, i) => `<path d="M500 250 L${500 + Math.cos(i * 0.5236) * 700 - Math.sin(i * 0.5236) * 60} ${250 + Math.sin(i * 0.5236) * 700 + Math.cos(i * 0.5236) * 60} L${500 + Math.cos(i * 0.5236) * 700 + Math.sin(i * 0.5236) * 60} ${250 + Math.sin(i * 0.5236) * 700 - Math.cos(i * 0.5236) * 60}Z" fill="#FFF3B0" opacity=".6"/>`).join('')}</g>
    ${P('', 500, 620, 1.25, globe('k3g'))}
    ${KRISHNA('k3k', 500, 230, 0.55, { flute: true })}
    <g id="k3book" opacity="0">${P('', 150, 130, 0.7, book('#E63946'))}</g>${label('k3bl', 'గీత', 190, 80, 40)}
    <g id="k3notes">${[0, 1, 2, 3, 4].map(i => `<g id="k3n${i}" opacity="0">${P('', 0, 0, 0.9, SH.note)}</g>`).join('')}</g>
    <g id="k3kids">${KID('k3a', 140, 330, 0.42, { hold: 'lotus' })}${KID('k3b', 860, 330, 0.42, { flip: true })}
      ${fig({ id: 'k3c', x: 270, y: 360, s: 0.36, skin: '#F3C08B', cloth: '#FF5C7A', drape: '#FFC93C', female: true, crown: 'none' })}
      ${fig({ id: 'k3d', x: 730, y: 360, s: 0.36, skin: '#C68B59', cloth: '#2EC4B6', top: '#2EC4B6', crown: 'kid', flip: true })}</g>
    <g id="k3fl">${[...Array(6)].map((_, i) => `<g id="k3f${i}" opacity="0">${P('', 0, 0, 1, SH.marigold)}</g>`).join('')}</g>
    ${label('k3l', 'జగద్గురు', 500, 520, 44)}
  </g>`;
  const a3 = (tl, a, m, b) => {
    tl.set('#sc3', { opacity: 1 }, a); tl.set(['#k3book', '#k3bl', '#k3l'], { opacity: 0 }, a);
    tl.fromTo('#k3rays', { rotation: 0 }, { rotation: 40, svgOrigin: '500 250', duration: b - a, ease: 'none' }, a);
    tl.fromTo('#k3k', { rotation: -3 }, { rotation: 3, transformOrigin: '50% 100%', duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 0.6)), ease: 'sine.inOut' }, a);
    for (let i = 0; i < 5; i++) for (let k = a + 0.3 + i * 0.45; k < b - 1; k += 2.25)
      tl.fromTo(`#k3n${i}`, { x: 600 + i * 10, y: 230, opacity: 0, rotation: 0 }, { x: 680 + i * 40, y: 40, opacity: 1, rotation: 20, duration: 1.6, ease: 'sine.out' }, k).to(`#k3n${i}`, { opacity: 0, duration: 0.3 }, k + 1.6);
    ['#k3a', '#k3c'].forEach(k => tl.fromTo(k, { rotation: 0 }, { rotation: 22, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 3 }, m));
    ['#k3b', '#k3d'].forEach(k => tl.fromTo(k, { rotation: 0 }, { rotation: -22, transformOrigin: '50% 100%', duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 3 }, m));
    tl.fromTo('#k3book', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, m + 0.4);
    tl.fromTo('#k3bl', { opacity: 0 }, { opacity: 1, duration: 0.3 }, m + 0.7);
    tl.fromTo('#k3l', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, m + 0.2);
    for (let i = 0; i < 6; i++) tl.fromTo(`#k3f${i}`, { x: i % 2 ? 860 : 140, y: 300, opacity: 0, scale: 0.8 }, { x: 410 + i * 36, y: 420, opacity: 1, scale: 1.1, duration: 1.1, ease: 'power1.out' }, m + 0.5 + i * 0.18);
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
