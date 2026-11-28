// Sitaram 108: the whole Ramayana in 20 quick scenes (5 counts each) and a finale (8 counts), one chorus kirtan.
// Drawn full screen (1080x1920); action sits between y 620 and 1540. Scenes are keyed by number; ORDER at the end sets
// the story order. SC.act[i](tl, a, m, b): a = scene start, m = the meaning moment (middle), b = scene end.
// Story: birth, Rama guards the sages' fire, Shiva's bow breaks, wedding, off to the forest, Bharata takes the sandals,
// golden deer, Lakshmana's line, Ravana takes Sita, Jatayu fights, Shabari's berries, Hanuman meets Rama, Rama's ring,
// ocean leap, ring for Sita, Lanka on fire, Rama bridge, Sanjeevani mountain, victory, crowning; finale: Hanuman opens
// his chest, Sita and Rama shine in his heart and the camera flies into it.
const SC = (() => {
  const { P, sky, stars, cloud, ground, hills, tree, lotus, palace, flame, diya, rock, ringIn, tx, heartP, wavesP, SH, fig, RAMA, SITA, LAKS, MONKEY, O, GD, RD } = ST;
  const HAN = (id, x, y, s, o = {}) => MONKEY(id, x, y, s, '#D9662B', Object.assign({ crown: 'crown', cloth: '#E63946', hold: 'mace' }, o));
  const RAV = (id, x, y, s, o = {}) => { const heads = [-1, 1, -2, 2, -3, 3, -4, 4, -5].map(k => { const hx = k * 52, hy = -60 - Math.abs(k) * 6;
      return `<g transform="translate(${hx} ${hy}) scale(.62)"><circle cx="0" cy="-60" r="58" fill="#5B4A8B" stroke="${O}" stroke-width="7"/><path d="M-36 -110 L36 -110 L28 -136 L0 -150 L-28 -136Z" fill="${GD}" stroke="${O}" stroke-width="5"/><path d="M-24 -70 L-10 -64 M24 -70 L10 -64" stroke="${O}" stroke-width="7"/><path d="M-16 -36 Q0 -46 16 -36" stroke="${O}" stroke-width="6" fill="none"/></g>`; }).join('');
    return fig(Object.assign({ id, x, y, s, skin: '#5B4A8B', cloth: '#2F2F4F', top: '#7A1F3D', crown: 'crown', mood: 'sd', hold: 'mace', extra: `<g>${heads}</g>` }, o)); };
  const night = (id) => sky(id, '#0B1030', '#1F2A66', '#3B3F7A') + stars([[90, 640], [260, 700], [820, 650], [980, 760], [600, 600], [430, 760]], 12);
  const moon = (x, y) => `<circle cx="${x}" cy="${y}" r="58" fill="#FFF6D8" opacity=".95"/><circle cx="${x}" cy="${y}" r="100" fill="#FFF6D8" opacity=".12"/>`;
  const lake = (y) => `<rect x="-60" y="${y}" width="1200" height="${1920 - y}" fill="#1B2A5C"/>${wavesP(y + 20, '#24396F')}`;
  const forest = (y, c = '#1F5130') => [80, 250, 830, 1000].map((x, i) => tree(x, y + (i % 2) * 20, 0.9 + (i % 2) * 0.15, c)).join('');
  const mandap = `<g><rect x="250" y="900" width="26" height="520" fill="#C2410C" stroke="${O}" stroke-width="5"/><rect x="804" y="900" width="26" height="520" fill="#C2410C" stroke="${O}" stroke-width="5"/><path d="M220 910 Q540 760 860 910Z" fill="#E63946" stroke="${O}" stroke-width="6"/>${[...Array(9)].map((_, i) => `<circle cx="${290 + i * 62}" cy="925" r="13" fill="#FFB31A" stroke="${O}" stroke-width="3"/>`).join('')}</g>`;
  const garland = `<path d="M-60 0 Q0 90 60 0" fill="none" stroke="#2B1407" stroke-width="22" stroke-linecap="round"/><path d="M-60 0 Q0 90 60 0" fill="none" stroke="#FF8C1A" stroke-width="14" stroke-dasharray="6 10" stroke-linecap="round"/><path d="M-60 0 Q0 90 60 0" fill="none" stroke="#FFD23F" stroke-width="6" stroke-dasharray="4 12" stroke-dashoffset="8"/>`;
  const deer = `<g><path d="M-90 -10 Q-80 -60 0 -60 Q70 -62 90 -20 Q96 10 70 16 L-70 16 Q-100 10 -90 -10Z" fill="#F2B33D" stroke="${O}" stroke-width="6"/>${[[-50, 0], [-12, 6], [30, -2], [56, 8], [-30, -34], [14, -38]].map(([a, b]) => `<circle cx="${a}" cy="${b - 14}" r="8" fill="#FFF3C4"/>`).join('')}
    <path d="M-60 14 L-66 90 M-30 14 L-26 90 M40 14 L36 90 M66 10 L72 90" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M-60 14 L-66 86 M-30 14 L-26 86 M40 14 L36 86 M66 10 L72 86" stroke="#F2B33D" stroke-width="8" stroke-linecap="round"/>
    <path d="M70 -40 Q100 -110 130 -110 Q160 -100 150 -76 Q130 -60 104 -40Z" fill="#F2B33D" stroke="${O}" stroke-width="6"/><circle cx="136" cy="-92" r="6" fill="${O}"/><path d="M118 -112 L100 -160 L92 -140 M126 -112 L140 -166 L150 -146" stroke="#8A5A2B" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  const chariot = `<g><path d="M-170 0 Q0 90 170 0 L150 -40 L-150 -40Z" fill="${GD}" stroke="${O}" stroke-width="7"/><path d="M-170 -10 Q-260 -90 -320 -40 Q-260 -30 -190 20Z M170 -10 Q260 -90 320 -40 Q260 -30 190 20Z" fill="#FFF3C4" stroke="${O}" stroke-width="6"/><path d="M-120 -40 L-120 -150 Q0 -230 120 -150 L120 -40" fill="none" stroke="#C2410C" stroke-width="12"/></g>`;
  const cradle = `<g><path d="M-140 0 Q0 110 140 0Z" fill="#C2410C" stroke="${O}" stroke-width="7"/><path d="M-140 0 L-150 -260 M140 0 L150 -260 M-150 -260 L150 -260" stroke="${GD}" stroke-width="12" fill="none"/></g>`;
  const ashoka = `<g class="sway"><rect x="-26" y="-330" width="52" height="340" fill="#6B4423" stroke="${O}" stroke-width="6"/>${[[-110, -380], [0, -440], [110, -380], [-60, -300], [70, -300]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="110" fill="#2E6B3A" stroke="${O}" stroke-width="6"/>`).join('')}${[[-120, -380], [20, -460], [100, -360], [-40, -300]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="14" fill="#FF6B35"/>`).join('')}</g>`;
  const lanka = (x, y, s) => P('', x, y, s, `${palace(-120, 0, 0.9, '#E8B04A')}${palace(60, -40, 1.2, '#F2C75C')}${palace(220, 10, 0.8, '#E8B04A')}`);
  const stone = (i) => `<g id="st${i}"><ellipse rx="70" ry="34" fill="#9AA5B1" stroke="${O}" stroke-width="6"/>${tx('రామ', 0, 14, 40, RD, 0)}</g>`;
  const throne = `<g><rect x="-260" y="-60" width="520" height="300" rx="30" fill="#C2410C" stroke="${O}" stroke-width="8"/><path d="M-260 -60 Q0 -380 260 -60Z" fill="${GD}" stroke="${O}" stroke-width="8"/><circle cx="0" cy="-200" r="40" fill="#E63946" stroke="${O}" stroke-width="6"/></g>`;
  const arm = (id) => `#${id}-aR`, armL = (id) => `#${id}-aL`;
  const walk = (tl, id, a, d, n) => tl.fromTo(`#${id}`, { y: 0 }, { y: -10, duration: d / (n * 2), yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, a);
  const breathe = (tl, ids, a, b) => ids.forEach((id, i) => tl.fromTo(`#${id}`, { scaleY: 1 }, { scaleY: 1.025, transformOrigin: '50% 100%', duration: 1.1 + i * 0.15, yoyo: true, repeat: Math.max(1, Math.floor((b - a) / 1.1)), ease: 'sine.inOut' }, a));
  const blink = (tl, id, t) => { tl.to(`#${id}-eo`, { opacity: 0, duration: 0.05 }, t); tl.to(`#${id}-eo`, { opacity: 1, duration: 0.05 }, t + 0.15); };
  const smile = (tl, id, t) => { tl.set(`#${id}-sm`, { opacity: 1 }, t); tl.set(`#${id}-sd`, { opacity: 0 }, t); };
  const sad = (tl, id, t) => { tl.set(`#${id}-sm`, { opacity: 0 }, t); tl.set(`#${id}-sd`, { opacity: 1 }, t); };
  const rot = (tl, sel, from, to, t, d = 0.5, ease = 'back.out(2)') => tl.fromTo(sel, { rotation: from }, { rotation: to, transformOrigin: '50% 8%', duration: d, ease }, t);
  const pop = (tl, sel, t, d = 0.5) => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: d, ease: 'back.out(2.5)' }, t);
  const rise = (tl, ids, t) => ids.forEach((s, i) => tl.fromTo(s, { opacity: 0, y: 0, scale: 0.4 }, { opacity: 1, y: -260, scale: 1, transformOrigin: '50% 50%', duration: 1.6, ease: 'power1.out' }, t + i * 0.25));
  const keys = [];
  const sc = (i, body) => (keys.push(i), `<g id="sc${i}" opacity="0">${body}</g>`);
  const hearts = (pre, x, y, n = 4) => [...Array(n)].map((_, k) => `<g id="${pre}${k}" opacity="0">${P('', x + (k - n / 2) * 70, y - (k % 2) * 40, 0.4, heartP(1, '#FF5C8A'))}</g>`).join('');

  const svg = [], act = [], cap = [];
  // ---------- 0 birth ----------
  cap.push(['శ్రీరామ జననం', 'Rama is born']);
  svg.push(sc(0, `${sky('g0', '#1A0F3A', '#3B2A6B', '#5A3A6B')}<g class="far">${stars([[120, 660], [940, 700], [520, 620]], 12)}${palace(180, 1240, 1.4, '#7A5A9A')}${palace(900, 1240, 1.4, '#7A5A9A')}</g>
    <rect x="-40" y="1380" width="1160" height="560" fill="#5A3A2A"/><circle id="g0glow" cx="540" cy="1250" r="380" fill="url(#glw)" opacity="0"/>
    <g class="near">${fig({ id: 'dsr', x: 230, y: 1130, s: 0.8, skin: '#F0B98A', cloth: '#E8A23A', crown: 'crown', beard: '#EDEDED' })}${fig({ id: 'ksl', x: 860, y: 1130, s: 0.8, skin: '#F3C08B', cloth: '#2FA36B', female: true, crown: 'mukut', drape: '#FFC93C', flip: true })}</g>
    <g transform="translate(540 1400) scale(1.3)"><g id="crad">${cradle}<g transform="translate(0 -20)">${fig({ id: 'bab', x: 0, y: -80, s: 0.36, skin: '#4A7BD8', cloth: '#FFC93C', crown: 'kid', eyes: 'open' })}</g></g></g>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#crad', { rotation: -5 }, { rotation: 5, transformOrigin: '50% 0%', duration: 0.9, yoyo: true, repeat: Math.floor((b - a) / 0.9), ease: 'sine.inOut' }, a);
    tl.fromTo('#g0glow', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 1.2 }, m - 1);
    rot(tl, arm('dsr'), 0, -110, m, 0.6); rot(tl, armL('ksl'), 0, 110, m, 0.6);
    breathe(tl, ['dsr', 'ksl'], a, b); blink(tl, 'dsr', a + 2); blink(tl, 'ksl', a + 3.2);
    rain(m - 0.3, b - m, 18);
  });
  // ---------- 1 bow ----------
  cap.push(['శివ ధనుర్భంగం', "Rama breaks Shiva's bow"]);
  svg.push(sc(1, `${sky('g1', '#2A1B4A', '#6B3A6B', '#C26B4A')}<g class="far">${palace(540, 1180, 2.2, '#8A5A7A')}</g><rect x="-40" y="1400" width="1160" height="560" fill="#7A4A2A"/>
    <g class="near">${SITA('st1', 800, 1150, 0.75, { flip: true, mood: 'sd', hold: '', holdL: '' })}</g>
    ${RAMA('ra1', 400, 1120, 0.9, { hold: '' })}
    <g id="bow1"><g id="bwL"><path d="M560 1000 Q700 1010 760 1180" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round"/><path d="M560 1000 Q700 1010 760 1180" fill="none" stroke="#A0622D" stroke-width="18" stroke-linecap="round"/></g>
    <g id="bwR"><path d="M560 1000 Q420 1010 360 1180" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round" opacity="0"/><path d="M760 1180 Q700 1380 560 1380" fill="none" stroke="${O}" stroke-width="30" stroke-linecap="round"/><path d="M760 1180 Q700 1380 560 1380" fill="none" stroke="#A0622D" stroke-width="18" stroke-linecap="round"/></g>
    <line x1="560" y1="1000" x2="560" y2="1380" stroke="#fff" stroke-width="4" id="bstr"/></g>
    <g id="bk1" opacity="0">${P('', 760, 1180, 1.4, SH.bolt || SH.spark)}</g>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#bow1', { y: 140, rotation: 20 }, { y: 0, rotation: 0, transformOrigin: '50% 100%', duration: 1.4, ease: 'power2.out' }, a + 0.4);
    rot(tl, arm('ra1'), 30, -40, a + 0.4, 1.4, 'power2.out');
    tl.to('#bstr', { opacity: 0, duration: 0.05 }, m);
    tl.to('#bwL', { rotation: -35, x: -60, y: -40, transformOrigin: '100% 100%', duration: 0.5, ease: 'power3.out' }, m);
    tl.to('#bwR', { rotation: 35, x: 60, y: 60, transformOrigin: '0% 0%', duration: 0.5, ease: 'power3.out' }, m);
    pop(tl, '#bk1', m, 0.3); tl.to('#bk1', { opacity: 0, duration: 0.4 }, m + 0.5);
    tl.fromTo('#flash', { opacity: 0.7 }, { opacity: 0, duration: 0.5 }, m);
    smile(tl, 'st1', m + 0.6); rot(tl, armL('st1'), 0, 100, m + 0.6);
    breathe(tl, ['st1'], a, b); blink(tl, 'ra1', a + 1);
  });
  // ---------- 2 wedding ----------
  cap.push(['సీతారామ కళ్యాణం', 'Sita and Rama marry']);
  svg.push(sc(2, `${sky('g2', '#3A1B3A', '#8A3A5A', '#E07A5A')}<rect x="-40" y="1400" width="1160" height="560" fill="#8A4A2A"/><g class="far">${mandap}</g>
    ${RAMA('ra2', 380, 1120, 0.85, { hold: '' })}<g id="si2w">${SITA('si2', 860, 1130, 0.8, { flip: true, hold: '', holdL: '' })}</g>
    <g id="gar2" opacity="1">${P('', 700, 1140, 1.1, garland)}</g>${hearts('h2', 540, 960, 5)}`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#si2w', { x: 0 }, { x: -280, duration: m - a - 0.6, ease: 'sine.inOut' }, a + 0.3); walk(tl, 'si2', a + 0.3, m - a - 0.6, 3);
    tl.fromTo('#gar2', { x: 0, y: 0 }, { x: -320, y: -100, duration: m - a - 0.6, ease: 'sine.inOut' }, a + 0.3);
    rot(tl, armL('si2'), 0, 130, m - 0.8, 0.6); tl.to('#gar2', { y: -30, duration: 0.4, ease: 'back.out(2)' }, m);
    rise(tl, [0, 1, 2, 3, 4].map(k => `#h2${k}`), m + 0.2); rain(m, b - m, 16);
    breathe(tl, ['ra2'], a, b); blink(tl, 'ra2', a + 2.5); blink(tl, 'si2', m + 1.5);
  });
  // ---------- 3 forest ----------
  cap.push(['వనవాసం', 'Off to the forest']);
  svg.push(sc(3, `${sky('g3', '#16244A', '#2F4F6B', '#4F7A5A')}<g id="ayo">${palace(900, 1300, 1.6, '#C79A4A')}</g><g class="far">${hills(1330, '#2F5A3A')}</g><g id="fr3" class="near">${forest(1420, '#2E6B3A')}${tree(-200, 1440, 1.1, '#2E6B3A')}${tree(1300, 1440, 1.1, '#2E6B3A')}</g>
    <rect x="-40" y="1420" width="1160" height="560" fill="#4A6B2A"/>
    <g id="walk3">${LAKS('lk3', 680, 1150, 0.75, { cloth: '#C49A6C', crown: 'jata' })}${SITA('si3', 520, 1160, 0.72, { cloth: '#E8A23A', hold: '', holdL: '' })}${RAMA('ra3', 360, 1140, 0.8, { cloth: '#C49A6C', crown: 'jata' })}</g>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#walk3', { x: 380 }, { x: -260, duration: b - a, ease: 'none' }, a);
    tl.fromTo('#ayo', { x: 0, opacity: 1 }, { x: 500, opacity: 0.2, duration: b - a, ease: 'none' }, a);
    ['ra3', 'si3', 'lk3'].forEach((id, i) => walk(tl, id, a + i * 0.15, b - a - 0.5, 8));
    blink(tl, 'si3', m);
  });
  // ---------- 4 golden deer ----------
  cap.push(['బంగారు జింక', 'The golden deer']);
  svg.push(sc(4, `${night('g4')}${moon(850, 700)}<g class="far">${hills(1340, '#22472E')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#2E4A22"/><g class="near">${forest(1430, '#1F5130')}</g>
    ${SITA('si4', 250, 1150, 0.72, { cloth: '#E8A23A', hold: '', holdL: '' })}<g id="rw4">${RAMA('ra4', 420, 1130, 0.8, { cloth: '#C49A6C', crown: 'jata' })}</g>
    <g transform="translate(780 1330)"><g id="dr4">${deer}</g></g>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#dr4', { y: 0 }, { y: -70, duration: 0.35, yoyo: true, repeat: Math.floor((b - a) / 0.35), ease: 'sine.out' }, a);
    tl.fromTo('#dr4', { x: -120 }, { x: 60, duration: m - a, ease: 'sine.inOut' }, a);
    rot(tl, armL('si4'), 0, -100, a + 1.2, 0.5); smile(tl, 'si4', a + 1.2);
    tl.to('#dr4', { x: 520, duration: b - m, ease: 'power1.in' }, m);
    tl.to('#rw4', { x: 700, duration: b - m, ease: 'power1.in' }, m + 0.3); walk(tl, 'ra4', m + 0.3, b - m - 0.3, 6); rot(tl, arm('ra4'), 0, -50, m, 0.4);
    blink(tl, 'ra4', a + 1.5);
  });
  // ---------- 5 Ravana takes Sita ----------
  cap.push(['సీతాపహరణం', 'Ravana takes Sita away']);
  svg.push(sc(5, `${sky('g5', '#1A0A1A', '#4A1A2A', '#6B2A2A')}<g class="far">${hills(1340, '#2A2A3A')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#2A2A22"/><g class="near">${forest(1430, '#1A3A22')}</g>
    <g id="cha5"><g transform="translate(0 0)">${RAV('rv5', 0, -150, 0.6)}${chariot}</g></g>
    <g id="si5g">${SITA('si5', 540, 1150, 0.72, { cloth: '#E8A23A', hold: '', holdL: '' })}</g>
    ${[0, 1, 2, 3].map(k => `<g id="jw5${k}" opacity="0"><circle r="12" fill="${GD}" stroke="${O}" stroke-width="4"/></g>`).join('')}`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#cha5', { x: -300, y: 700 }, { x: 540, y: 1180, duration: m - a - 0.3, ease: 'power2.out' }, a + 0.2);
    sad(tl, 'si5', m - 1.2); rot(tl, arm('si5'), 0, -130, m - 1.2, 0.4); rot(tl, armL('si5'), 0, 130, m - 1.2, 0.4);
    tl.to('#si5g', { y: -110, duration: 0.4 }, m);
    tl.to(['#cha5', '#si5g'], { x: '+=700', y: '-=600', duration: b - m - 0.3, ease: 'power2.in' }, m + 0.4);
    [0, 1, 2, 3].forEach(k => tl.fromTo(`#jw5${k}`, { x: 640 + k * 90, y: 1000 - k * 120, opacity: 1 }, { y: 1420, opacity: 1, duration: 1, ease: 'power2.in' }, m + 0.8 + k * 0.3));
  });
  // ---------- 6 Hanuman meets Rama ----------
  cap.push(['హనుమంతుడు రాముని కలిశాడు', 'Hanuman meets Rama']);
  svg.push(sc(6, `${sky('g6', '#2A3A6B', '#5A7AAA', '#E0A86B')}<g class="far">${hills(1340, '#3E7A4A')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#4A7A2A"/><g class="near">${forest(1430, '#2E6B3A')}</g>
    ${LAKS('lk6', 210, 1150, 0.72, { cloth: '#C49A6C', crown: 'jata' })}${RAMA('ra6', 430, 1130, 0.8, { cloth: '#C49A6C', crown: 'jata', hold: '' })}
    <g id="hw6">${HAN('hn6', 820, 1160, 0.72, { flip: true, hold: '' })}</g>${hearts('h6', 600, 1000, 4)}`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#hw6', { x: 400 }, { x: 0, duration: 1.6, ease: 'power2.out' }, a + 0.3); walk(tl, 'hn6', a + 0.3, 1.6, 3);
    tl.to('#hw6', { x: -110, y: 110, rotation: -0, duration: 0.6, ease: 'power2.inOut' }, m - 1.4);
    rot(tl, arm('hn6'), 0, -100, m - 1.4, 0.5); rot(tl, armL('hn6'), 0, 100, m - 1.4, 0.5);
    tl.to('#hn6', { scaleY: 0.82, transformOrigin: '50% 100%', duration: 0.5 }, m - 1.4);
    rot(tl, arm('ra6'), 0, -120, m, 0.6); rise(tl, [0, 1, 2, 3].map(k => `#h6${k}`), m + 0.4);
    breathe(tl, ['ra6', 'lk6'], a, b); blink(tl, 'ra6', a + 1); blink(tl, 'lk6', m + 2);
  });
  // ---------- 7 ocean leap ----------
  cap.push(['సముద్ర లంఘనం', 'Hanuman leaps the ocean']);
  svg.push(sc(7, `${sky('g7', '#1A3A7A', '#4A8AD0', '#9AD0F0')}<g class="far">${cloud(250, 700, 1, '#fff')}${cloud(800, 820, 0.8, '#fff')}${lanka(900, 1330, 0.7)}</g>
    ${lake(1350)}<g class="near"><path d="M-40 1350 Q120 1300 260 1350 L260 1960 L-40 1960Z" fill="#4A7A2A" stroke="${O}" stroke-width="6"/></g>
    <g id="hl7">${HAN('hn7', 0, 0, 0.6, { hold: 'mace' })}</g>
    <path id="tr7" d="M140 1180 Q540 520 900 1150" fill="none" stroke="#FFF3C4" stroke-width="14" stroke-dasharray="20 22" opacity="0"/>`));
  act.push((tl, a, m, b) => {
    tl.set('#hl7', { x: 140, y: 1150 }, a);
    tl.to('#hn7', { scaleY: 0.85, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: 1 }, a + 0.8);
    tl.to('#tr7', { opacity: 0.8, duration: 0.3 }, a + 1.6);
    tl.fromTo('#tr7', { strokeDashoffset: 0 }, { strokeDashoffset: -400, duration: b - a, ease: 'none' }, a);
    const P1 = [[140, 1150], [300, 860], [540, 700], [760, 860], [880, 1120]];
    P1.forEach(([x, y], k) => { if (k) tl.to('#hl7', { x, y, duration: (b - a - 2.6) / 4, ease: 'none' }, a + 1.6 + (k - 1) * (b - a - 2.6) / 4); });
    tl.fromTo('#hl7', { rotation: -20 }, { rotation: 20, transformOrigin: '50% 50%', duration: b - a - 2.6, ease: 'none' }, a + 1.6);
    rot(tl, arm('hn7'), 0, -150, a + 1.6, 0.5);
  });
  // ---------- 8 ring for Sita ----------
  cap.push(['సీతకు రాముని ఉంగరం', "Rama's ring for Sita"]);
  svg.push(sc(8, `${night('g8')}${moon(180, 700)}<rect x="-40" y="1420" width="1160" height="560" fill="#2A3A22"/>${P('', 360, 1430, 1.2, ashoka)}
    ${SITA('si8', 330, 1180, 0.72, { sit: true, mood: 'sd', hold: '', holdL: '' })}<g id="hw8">${HAN('hn8', 780, 1180, 0.6, { flip: true, hold: '' })}</g>
    <g id="rg8" opacity="0">${P('', 640, 1080, 1.3, ringIn)}</g><circle id="rg8g" cx="640" cy="1080" r="140" fill="url(#glw)" opacity="0"/>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#hw8', { x: 300, y: -500 }, { x: 0, y: 0, duration: 1.4, ease: 'bounce.out' }, a + 0.4);
    rot(tl, arm('hn8'), 0, -90, m - 1, 0.5); pop(tl, '#rg8', m - 0.8);
    tl.fromTo('#rg8g', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.3, transformOrigin: '50% 50%', duration: 0.7, yoyo: true, repeat: 3 }, m - 0.6);
    smile(tl, 'si8', m + 0.3); rot(tl, armL('si8'), 0, 90, m + 0.3, 0.5);
    breathe(tl, ['si8'], a, b); blink(tl, 'si8', a + 2); blink(tl, 'hn8', m + 1.5);
  });
  // ---------- 9 Rama bridge ----------
  cap.push(['రామసేతు', 'The Rama bridge']);
  svg.push(sc(9, `${sky('g9', '#2A4A8A', '#6A9AD0', '#F0C08A')}<g class="far">${lanka(940, 1300, 0.55)}</g>${lake(1320)}
    <g class="near"><path d="M-40 1330 Q100 1290 220 1330 L220 1960 L-40 1960Z" fill="#C2A06B" stroke="${O}" stroke-width="6"/></g>
    ${RAMA('ra9', 190, 1110, 0.7, { cloth: '#C49A6C', crown: 'jata' })}${HAN('hn9', 350, 1150, 0.55, { hold: '' })}
    ${[0, 1, 2, 3, 4, 5].map(i => stone(i)).join('')}`));
  act.push((tl, a, m, b) => {
    [0, 1, 2, 3, 4, 5].forEach(i => { const x = 460 + i * 95, y = 1390 + (i % 2) * 6, t = a + 0.8 + i * (m - a) / 6;
      tl.fromTo(`#st${i}`, { x: 300, y: 1080, opacity: 0, scale: 0.6 }, { x, y, opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.7, ease: 'power2.out' }, t);
      tl.fromTo(`#st${i}`, { rotation: -3 }, { rotation: 3, transformOrigin: '50% 50%', duration: 0.8, yoyo: true, repeat: Math.floor((b - t) / 0.8), ease: 'sine.inOut' }, t + 0.7); });
    for (let i = 0; i < 6; i++) { tl.to('#hn9-aR', { rotation: -70, transformOrigin: '50% 8%', duration: 0.25 }, a + 0.6 + i * (m - a) / 6); tl.to('#hn9-aR', { rotation: 0, duration: 0.3 }, a + 0.9 + i * (m - a) / 6); }
    rot(tl, arm('ra9'), 0, -40, m + 0.5, 0.6); blink(tl, 'ra9', a + 2);
  });
  // ---------- 10 victory ----------
  cap.push(['రావణ సంహారం', 'Good wins over evil']);
  svg.push(sc(10, `${sky('g10', '#1A0A2A', '#4A1A3A', '#8A3A2A')}<g class="far">${lanka(540, 1330, 0.9)}</g><rect x="-40" y="1420" width="1160" height="560" fill="#3A2A22"/>
    ${RAMA('ra10', 280, 1130, 0.85)}<g id="rv10g">${RAV('rv10', 760, 1130, 0.72, { flip: true })}</g>
    <g id="ar10" opacity="0"><line x1="0" y1="0" x2="160" y2="0" stroke="${O}" stroke-width="16" stroke-linecap="round"/><line x1="0" y1="0" x2="160" y2="0" stroke="#FFE08A" stroke-width="8"/><path d="M170 0 L140 -20 L140 20Z" fill="#FFE08A" stroke="${O}" stroke-width="4"/></g>
    <circle id="lt10" cx="820" cy="1100" r="260" fill="url(#glw)" opacity="0"/>${[0, 1, 2, 3, 4].map(k => `<g id="sm10${k}" opacity="0">${P('', 820 + (k - 2) * 80, 1100 - (k % 2) * 60, 1.6, SH.smoke || '<circle r="40" fill="#9AA5B1"/>')}</g>`).join('')}`));
  act.push((tl, a, m, b) => {
    rot(tl, arm('ra10'), 0, -70, a + 0.5, 0.6);
    tl.fromTo('#rv10g', { x: 0 }, { x: -40, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, a + 0.3);
    tl.set('#ar10', { opacity: 1 }, m - 0.6); tl.fromTo('#ar10', { x: 330, y: 1100 }, { x: 760, y: 1090, duration: 0.6, ease: 'power2.in' }, m - 0.6);
    tl.set('#ar10', { opacity: 0 }, m);
    tl.fromTo('#lt10', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 2.2, transformOrigin: '50% 50%', duration: 0.8 }, m); tl.to('#lt10', { opacity: 0, duration: 1.2 }, m + 0.8);
    tl.to('#rv10g', { x: 500, y: -300, rotation: 60, opacity: 0, transformOrigin: '50% 50%', duration: 1.2, ease: 'power2.in' }, m + 0.1);
    [0, 1, 2, 3, 4].forEach(k => { tl.fromTo(`#sm10${k}`, { opacity: 0.8, y: 0 }, { opacity: 0, y: -200, duration: 1.8 }, m + 0.2 + k * 0.1); });
    tl.fromTo('#flash', { opacity: 0.8 }, { opacity: 0, duration: 0.6 }, m); burst(m + 0.3, 820, 1100, 16);
    breathe(tl, ['ra10'], a, b);
  });
  // ---------- 11 crowning ----------
  cap.push(['అయోధ్యలో పట్టాభిషేకం', 'Home to Ayodhya, Rama is crowned']);
  svg.push(sc(11, `${sky('g11', '#3A1B3A', '#8A4A3A', '#F0B86B')}<rect x="-40" y="1420" width="1160" height="560" fill="#8A4A2A"/><circle cx="540" cy="1100" r="520" fill="url(#glw)" opacity=".7" id="hl11"/>
    <g class="far">${palace(120, 1300, 1.3, '#E8B04A')}${palace(960, 1300, 1.3, '#E8B04A')}</g>${P('', 540, 1200, 1, throne)}
    ${RAMA('ra11', 450, 1090, 0.78, { hold: '' })}${SITA('si11', 640, 1100, 0.72, { hold: '', holdL: 'lotus' })}
    ${LAKS('lk11', 180, 1180, 0.65)}${HAN('hn11', 900, 1210, 0.6, { flip: true, hold: '' })}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<g id="dy11${k}" opacity="0">${diya(120 + k * 120, 1480, 1.2)}</g>`).join('')}`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#hl11', { scale: 0.9 }, { scale: 1.1, transformOrigin: '50% 50%', duration: 1, yoyo: true, repeat: Math.floor((b - a) / 1), ease: 'sine.inOut' }, a);
    rot(tl, arm('hn11'), 0, -100, a + 0.6, 0.5); rot(tl, armL('hn11'), 0, 100, a + 0.6, 0.5); rot(tl, armL('lk11'), 0, 100, a + 0.8, 0.5);
    [0, 1, 2, 3, 4, 5, 6, 7].forEach(k => pop(tl, `#dy11${k}`, a + 0.6 + k * 0.8, 0.4));
    rot(tl, arm('ra11'), 0, -120, m, 0.6); rain(a + 0.5, b - a - 1, 20);
    breathe(tl, ['ra11', 'si11'], a, b); blink(tl, 'ra11', a + 2); blink(tl, 'si11', a + 3);
  });

  // ---------- 12 yagna: a demon swoops at the sages' fire, Rama's arrow drives it away ----------
  cap.push(['యాగ రక్షణ', "Rama guards the sages' fire"]);
  svg.push(sc(12, `${sky('g12', '#1A2A4A', '#4A5A7A', '#C08A5A')}<g class="far">${hills(1340, '#3E6A3A')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#5A7A2A"/><g class="near">${forest(1430, '#2E6B3A')}</g>
    ${fig({ id: 'vsm', x: 200, y: 1170, s: 0.7, skin: '#E5AD7C', cloth: '#FF9F43', crown: 'jataW', beard: '#F0F0F0', sit: true })}${flame(400, 1420, 1.1)}
    ${RAMA('ra12', 640, 1120, 0.8)}<g id="dm12w">${fig({ id: 'dm12', x: 0, y: 0, s: 0.6, skin: '#6B3FA0', cloth: '#2F2F4F', crown: 'horns', mood: 'sd', flip: true })}</g>
    <g id="ar12" opacity="0"><line x1="0" y1="0" x2="150" y2="0" stroke="${O}" stroke-width="14" stroke-linecap="round"/><line x1="0" y1="0" x2="150" y2="0" stroke="#FFE08A" stroke-width="7"/><path d="M160 0 L132 -18 L132 18Z" fill="#FFE08A" stroke="${O}" stroke-width="4"/></g>`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#dm12w', { x: 1100, y: 600 }, { x: 860, y: 860, duration: m - a - 0.3, ease: 'power2.out' }, a);
    rot(tl, arm('ra12'), 0, -80, a + 0.5, 0.4);
    tl.set('#ar12', { opacity: 1 }, m - 0.4); tl.fromTo('#ar12', { x: 700, y: 1060, rotation: -25 }, { x: 860, y: 900, rotation: -25, duration: 0.35, ease: 'power2.in' }, m - 0.4); tl.set('#ar12', { opacity: 0 }, m);
    tl.to('#dm12w', { x: 1400, y: 300, rotation: 90, duration: 0.9, ease: 'power2.in' }, m); burst(m, 860, 860, 10);
    smile(tl, 'vsm', m + 0.3); rot(tl, arm('vsm'), 0, -120, m + 0.3, 0.4);
  });
  // ---------- 13 sandals: Bharata kneels, takes Rama's sandals and raises them over his head ----------
  cap.push(['భరతుని భక్తి', "Bharata carries Rama's sandals"]);
  const sandals = `<g><ellipse cx="-34" cy="0" rx="26" ry="60" fill="#C2410C" stroke="${O}" stroke-width="5"/><ellipse cx="34" cy="0" rx="26" ry="60" fill="#C2410C" stroke="${O}" stroke-width="5"/><circle cx="-34" cy="-30" r="8" fill="${GD}"/><circle cx="34" cy="-30" r="8" fill="${GD}"/></g>`;
  svg.push(sc(13, `${sky('g13', '#2A3A6B', '#6A8AB0', '#F0C08A')}<g class="far">${hills(1340, '#3E7A4A')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#4A7A2A"/><g class="near">${forest(1430, '#2E6B3A')}</g>
    ${RAMA('ra13', 330, 1120, 0.82, { cloth: '#C49A6C', crown: 'jata', hold: '' })}<g id="bh13w">${fig({ id: 'bh13', x: 760, y: 1170, s: 0.72, skin: '#5B86D6', cloth: '#E8A23A', crown: 'crown', flip: true })}</g>
    <g id="sd13">${P('', 0, 0, 0.9, sandals)}</g>`));
  act.push((tl, a, m, b) => {
    tl.to('#bh13w', { y: 90, duration: 0.4 }, a + 0.4); tl.to('#bh13', { scaleY: 0.8, transformOrigin: '50% 100%', duration: 0.4 }, a + 0.4);
    tl.fromTo('#sd13', { x: 420, y: 1290 }, { x: 640, y: 1230, duration: m - a - 0.4, ease: 'sine.inOut' }, a + 0.3);
    rot(tl, arm('ra13'), 0, -60, a + 0.3, 0.5);
    tl.to('#sd13', { x: 760, y: 980, duration: 0.7, ease: 'back.out(2)' }, m); rot(tl, arm('bh13'), 0, -160, m, 0.6); rot(tl, armL('bh13'), 0, 160, m, 0.6);
    tl.fromTo('#sd13', { scale: 1 }, { scale: 1.15, transformOrigin: '50% 50%', duration: 0.4, yoyo: true, repeat: 3 }, m + 0.7); burst(m + 0.6, 760, 980, 8);
  });
  // ---------- 14 Lakshmana rekha: Lakshmana draws a glowing line around the hut where Sita stays ----------
  cap.push(['లక్ష్మణ రేఖ', 'Lakshmana draws a line to keep Sita safe']);
  const hut = `<g><path d="M-170 0 L-170 -170 L170 -170 L170 0Z" fill="#C49A6C" stroke="${O}" stroke-width="6"/><path d="M-220 -160 L0 -330 L220 -160Z" fill="#E8B04A" stroke="${O}" stroke-width="6"/><rect x="-50" y="-120" width="100" height="120" fill="#5A3A1E" stroke="${O}" stroke-width="5"/></g>`;
  svg.push(sc(14, `${night('g14')}${moon(880, 700)}<g class="far">${hills(1340, '#22472E')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#2E4A22"/>${P('', 540, 1400, 1.2, hut)}
    ${SITA('si14', 540, 1160, 0.6, { cloth: '#E8A23A', hold: '', holdL: '' })}<path id="lr14" d="M200 1480 Q540 1620 880 1480" fill="none" stroke="#FFD23F" stroke-width="14" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>
    <g id="lk14w">${LAKS('lk14', 0, 0, 0.75, { cloth: '#C49A6C', crown: 'jata' })}</g>`));
  act.push((tl, a, m, b) => {
    const d = m - a + 0.6;
    tl.fromTo('#lk14w', { x: 180, y: 1180 }, { x: 880, y: 1180, duration: d, ease: 'none' }, a + 0.2); walk(tl, 'lk14', a + 0.2, d, 4); rot(tl, arm('lk14'), 0, 40, a + 0.2, 0.3);
    tl.to('#lr14', { strokeDashoffset: 0, duration: d, ease: 'none' }, a + 0.2);
    tl.fromTo('#lr14', { opacity: 1 }, { opacity: 0.55, duration: 0.3, yoyo: true, repeat: 5 }, m + 0.8);
    blink(tl, 'si14', m);
  });
  // ---------- 15 Jatayu: the brave eagle flies at Ravana's chariot; feathers fly ----------
  cap.push(['జటాయువు పోరాటం', 'Brave Jatayu fights for Sita']);
  const eagle = `<g><path d="M0 0 Q-160 -120 -300 -40 Q-170 -30 -60 40Z M0 0 Q160 -120 300 -40 Q170 -30 60 40Z" fill="#8A5A2B" stroke="${O}" stroke-width="6" id="jw"/><ellipse cx="0" cy="20" rx="60" ry="80" fill="#A0622D" stroke="${O}" stroke-width="6"/><circle cx="0" cy="-60" r="40" fill="#F4F4F4" stroke="${O}" stroke-width="6"/><path d="M-10 -50 L-50 -40 L-10 -30Z" fill="${GD}" stroke="${O}" stroke-width="4"/><circle cx="-12" cy="-68" r="6" fill="${O}"/></g>`;
  svg.push(sc(15, `${sky('g15', '#1A0A1A', '#5A2A3A', '#C06A4A')}<g class="far">${cloud(250, 760, 1, '#E0B0B0')}${cloud(820, 900, 0.8, '#E0B0B0')}${hills(1360, '#3A2A3A')}</g>
    <g id="ch15">${RAV('rv15', 0, -150, 0.55)}${SITA('si15', 120, -130, 0.45, { mood: 'sd', hold: '', holdL: '' })}${chariot}</g>
    <g id="jt15">${P('', 0, 0, 0.9, `<g id="jtb">${eagle}</g>`)}</g>
    ${[0, 1, 2, 3, 4].map(k => `<g id="fe15${k}" opacity="0"><path d="M0 -20 Q14 0 0 20 Q-14 0 0 -20Z" fill="#A0622D" stroke="${O}" stroke-width="3"/></g>`).join('')}`));
  act.push((tl, a, m, b) => {
    tl.fromTo('#ch15', { x: 300, y: 1050 }, { x: 760, y: 950, duration: b - a, ease: 'none' }, a);
    tl.fromTo('#jt15', { x: -200, y: 650 }, { x: 420, y: 880, duration: m - a, ease: 'power2.out' }, a);
    tl.fromTo('#jtb', { scaleY: 1 }, { scaleY: 0.6, transformOrigin: '50% 50%', duration: 0.18, yoyo: true, repeat: Math.floor((b - a) / 0.18), ease: 'sine.inOut' }, a);
    tl.to('#jt15', { x: 560, y: 820, duration: 0.25, yoyo: true, repeat: 3, ease: 'power2.inOut' }, m);
    tl.fromTo('#ch15', { rotation: 0 }, { rotation: -8, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 3 }, m);
    [0, 1, 2, 3, 4].forEach(k => tl.fromTo(`#fe15${k}`, { x: 560 + k * 30, y: 900, opacity: 1, rotation: 0 }, { x: 500 + k * 60, y: 1500, opacity: 0, rotation: 300, duration: 1.6 }, m + 0.2 + k * 0.15));
  });
  // ---------- 16 Shabari: an old devotee offers berries; Rama eats one and smiles ----------
  cap.push(['శబరి ప్రేమ', "Shabari's berries for Rama"]);
  const basket = `<g><path d="M-70 0 Q0 60 70 0Z" fill="#A0622D" stroke="${O}" stroke-width="5"/>${[[-40, -6], [-14, -14], [14, -8], [40, -14], [0, -24]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#C2185B" stroke="${O}" stroke-width="3"/>`).join('')}</g>`;
  svg.push(sc(16, `${sky('g16', '#2A3A6B', '#7A9AC0', '#F0D08A')}<g class="far">${hills(1340, '#4E8A4A')}${palace(900, 1340, 0.8, '#C49A6C')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#5A8A2A"/><g class="near">${forest(1430, '#2E6B3A')}</g>
    ${RAMA('ra16', 360, 1120, 0.82, { cloth: '#C49A6C', crown: 'jata', hold: '' })}${fig({ id: 'sb16', x: 760, y: 1190, s: 0.68, skin: '#D9A070', cloth: '#F4F4F4', female: true, crown: 'veil', drape: '#E0E0E0', hair: '#DDDDDD', flip: true })}
    <g id="bk16">${P('', 640, 1260, 1, basket)}</g><g id="br16" opacity="0"><circle r="14" fill="#C2185B" stroke="${O}" stroke-width="3"/></g>${hearts('h16', 540, 1000, 4)}`));
  act.push((tl, a, m, b) => {
    rot(tl, armL('sb16'), 0, 70, a + 0.3, 0.4); tl.fromTo('#bk16', { x: 0, y: 0 }, { x: -60, y: -30, duration: 0.6 }, a + 0.3);
    rot(tl, arm('ra16'), 0, -70, m - 0.8, 0.4);
    tl.set('#br16', { opacity: 1 }, m - 0.4); tl.fromTo('#br16', { x: 580, y: 1220 }, { x: 420, y: 970, duration: 0.5, ease: 'power2.out' }, m - 0.4); tl.set('#br16', { opacity: 0 }, m + 0.15);
    tl.fromTo('#ra16-head', { y: 0 }, { y: 6, duration: 0.15, yoyo: true, repeat: 3 }, m + 0.15);
    rise(tl, [0, 1, 2, 3].map(k => `#h16${k}`), m + 0.4); blink(tl, 'sb16', a + 1); breathe(tl, ['sb16'], a, b);
  });
  // ---------- 17 ring: Rama gives Hanuman his ring for Sita ----------
  cap.push(['రాముని ఉంగరం', 'Rama gives Hanuman his ring']);
  svg.push(sc(17, `${sky('g17', '#1A2A5A', '#5A7AB0', '#F0B080')}<g class="far">${hills(1340, '#3E7A4A')}</g><rect x="-40" y="1420" width="1160" height="560" fill="#4A7A2A"/><g class="near">${forest(1430, '#2E6B3A')}</g>
    ${RAMA('ra17', 360, 1120, 0.85, { cloth: '#C49A6C', crown: 'jata', hold: '' })}${HAN('hn17', 760, 1170, 0.72, { flip: true, hold: '' })}
    <g id="rg17" opacity="0">${P('', 0, 0, 1, ringIn)}</g><circle id="rg17g" cx="0" cy="0" r="120" fill="url(#glw)" opacity="0"/>`));
  act.push((tl, a, m, b) => {
    rot(tl, arm('ra17'), 0, -70, a + 0.3, 0.4); pop(tl, '#rg17', a + 0.5); tl.set('#rg17', { x: 480, y: 1050 }, a + 0.5);
    tl.to('#rg17', { x: 640, y: 1060, duration: m - a - 0.8, ease: 'sine.inOut' }, a + 0.9);
    rot(tl, arm('hn17'), 0, -70, m - 0.6, 0.4);
    tl.set('#rg17g', { x: 640, y: 1060 }, m); tl.fromTo('#rg17g', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.4, transformOrigin: '50% 50%', duration: 0.5, yoyo: true, repeat: 3 }, m);
    tl.to('#hn17', { scaleY: 0.85, transformOrigin: '50% 100%', duration: 0.4 }, m + 0.6); smile(tl, 'hn17', m);
  });
  // ---------- 18 Lanka on fire: Hanuman leaps across the roofs with his burning tail; fires catch ----------
  cap.push(['లంకా దహనం', "Hanuman's burning tail lights up Lanka"]);
  svg.push(sc(18, `${sky('g18', '#1A0A0A', '#5A1A1A', '#C04A1A')}<g class="far">${lanka(540, 1260, 1.1)}</g><rect x="-40" y="1400" width="1160" height="560" fill="#3A1A12"/>
    <g id="hn18w">${HAN('hn18', 0, 0, 0.55, { hold: 'mace' })}<g id="tf18">${flame(80, 120, 0.7)}</g></g>
    ${[0, 1, 2, 3, 4, 5].map(k => `<g id="fl18${k}" opacity="0">${flame(150 + k * 150, 1120 - (k % 2) * 120, 1.3)}</g>`).join('')}`));
  act.push((tl, a, m, b) => {
    const pts = [[120, 1000], [330, 880], [540, 960], [740, 860], [940, 980]], d = (b - a - 0.5) / 4;
    tl.set('#hn18w', { x: pts[0][0], y: pts[0][1] }, a);
    pts.slice(1).forEach(([x, y], k) => { tl.to('#hn18w', { x, duration: d, ease: 'none' }, a + 0.3 + k * d); tl.to('#hn18w', { y: y - 200, duration: d / 2, ease: 'power1.out' }, a + 0.3 + k * d); tl.to('#hn18w', { y, duration: d / 2, ease: 'power1.in' }, a + 0.3 + k * d + d / 2); });
    [0, 1, 2, 3, 4, 5].forEach(k => pop(tl, `#fl18${k}`, a + 0.6 + k * (b - a - 1) / 6, 0.4));
    rot(tl, arm('hn18'), 0, -150, a + 0.3, 0.4);
  });
  // ---------- 19 Sanjeevani: Lakshmana lies hurt, Hanuman flies in with the mountain, Lakshmana sits up ----------
  cap.push(['సంజీవని', 'Hanuman brings the healing mountain']);
  svg.push(sc(19, `${night('g19')}${moon(880, 680)}<rect x="-40" y="1420" width="1160" height="560" fill="#2A3A22"/>
    ${RAMA('ra19', 230, 1120, 0.8, { mood: 'sd', hold: '' })}<g transform="translate(560 1420)"><g id="lk19r">${LAKS('lk19', 0, -260, 0.7, { eyes: 'closed' })}</g></g>
    <g id="hn19w">${HAN('hn19', 0, 0, 0.5, { hold: '' })}${P('', 0, -200, 0.9, ST.mountain)}</g><circle id="hg19" cx="560" cy="1250" r="260" fill="url(#glw)" opacity="0"/>`));
  act.push((tl, a, m, b) => {
    tl.set('#lk19r', { rotation: -90, transformOrigin: '50% 100%' }, a);
    tl.fromTo('#hn19w', { x: 1200, y: 700 }, { x: 800, y: 1000, duration: m - a - 0.2, ease: 'power2.out' }, a);
    rot(tl, arm('hn19'), -150, -150, a, 0.01); rot(tl, armL('hn19'), 150, 150, a, 0.01);
    tl.fromTo('#hg19', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.2, transformOrigin: '50% 50%', duration: 0.6 }, m);
    tl.to('#lk19r', { rotation: 0, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(1.5)' }, m + 0.3);
    tl.set('#lk19-eo', { opacity: 1 }, m + 0.6); tl.set('#lk19-ec', { opacity: 0 }, m + 0.6);
    smile(tl, 'ra19', m + 0.8); rot(tl, arm('ra19'), 0, -120, m + 0.8, 0.5);
  });
  // ---------- 20 finale: Hanuman opens his heart and Sita Rama are inside; the camera flies into it ----------
  cap.push(['హనుమ హృదయంలో సీతారామ', "Sita and Rama live in Hanuman's heart"]);
  const flap = (side) => `<path d="M0 0 L${side * 70} 0 L${side * 66} 130 L0 140Z" fill="#D9662B" stroke="${O}" stroke-width="6"/><path d="M${side * 20} 30 Q${side * 40} 60 ${side * 20} 100" stroke="${O}" stroke-width="4" fill="none" opacity=".4"/>`;
  svg.push(sc(20, `${sky('g20', '#1A0F3A', '#5A2A6B', '#F0A06B')}${ST.rays(540, 1230, 18, '#FFE08A', 0.18, 1400, 60, 'ry20')}<rect x="-40" y="1440" width="1160" height="560" fill="#7A3A2A"/>
    ${HAN('hn20', 540, 1090, 1.2, { hold: '', eyes: 'closed' })}
    <g transform="translate(540 1215)"><circle r="120" fill="url(#glw)" id="hg20" opacity="0"/>
      <g id="ht20" opacity="0"><g transform="translate(0 -10)">${heartP(1.25, '#E63946')}</g>
      ${RAMA('ra20', -24, -30, 0.13, { hold: '' })}${SITA('si20', 24, -26, 0.12, { hold: '', holdL: '' })}</g>
      <g id="fpL" transform="translate(0 -70)">${flap(-1)}</g><g id="fpR" transform="translate(0 -70)">${flap(1)}</g></g>`));
  act.push((tl, a, m, b) => {
    const tOpen = a + 1.2, tZoom = tOpen + 1.6, tEnd = C[107];
    tl.fromTo('#ry20', { rotation: 0 }, { rotation: 40, transformOrigin: '50% 50%', duration: b - a, ease: 'none' }, a);
    rot(tl, arm('hn20'), 0, -30, a + 0.2, 0.5); rot(tl, armL('hn20'), 0, 30, a + 0.2, 0.5);
    tl.set('#ht20', { opacity: 1 }, tOpen); tl.to('#hg20', { opacity: 1, scale: 2.5, transformOrigin: '50% 50%', duration: 1 }, tOpen);
    tl.to('#fpL', { scaleX: 0, transformOrigin: '0% 50%', x: -70, duration: 0.7, ease: 'power2.out' }, tOpen);
    tl.to('#fpR', { scaleX: 0, transformOrigin: '100% 50%', x: 70, duration: 0.7, ease: 'power2.out' }, tOpen);
    rot(tl, arm('hn20'), -30, -70, tOpen, 0.6); rot(tl, armL('hn20'), 30, 70, tOpen, 0.6);
    tl.fromTo('#ht20', { scale: 1 }, { scale: 1.08, transformOrigin: '50% 50%', duration: 0.5, yoyo: true, repeat: Math.floor((b - tOpen) / 0.5), ease: 'sine.inOut' }, tOpen + 0.7);
    tl.fromTo('#scn', { scale: 1.1, x: 0 }, { scale: 4.6, x: 0, y: 0, transformOrigin: `50% ${(1205 / 1920 * 100).toFixed(2)}%`, duration: tEnd - tZoom, ease: 'power2.inOut' }, tZoom);
    rot(tl, arm('ra20'), 0, -120, tEnd - 1.2, 0.6); smile(tl, 'si20', tEnd - 1);
    tl.fromTo('#hg20', { opacity: 1 }, { opacity: 0.6, duration: 0.6, yoyo: true, repeat: 8 }, tZoom);
    rain(tOpen, b - tOpen, 24);
  });
  const ORDER = [0, 12, 1, 2, 3, 13, 4, 14, 5, 15, 16, 6, 17, 7, 8, 18, 9, 19, 10, 11, 20], ix = k => keys.indexOf(k);
  return { svg: svg.join(''), act: ORDER.map(k => act[ix(k)]), cap: ORDER.map(k => cap[ix(k)]), ids: ORDER, len: ORDER.map(k => (k === 20 ? 8 : 5)) };
})();
