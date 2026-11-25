// Suprabhatam storyboard. Each scene: bg svg, act(v) with v = verse data (words, start, ms, me...). hide: hero rig unused.
ST.S = (() => {
  const { P, sky, cloud, bigCloud, stars, rays, ground, hills, tree, lotus, palace, birdIn, demonIn, sunFace, globe, chest, fig, RAMA, SITA, LAKS, KID, SAGE, VEN, LAKSHMI, DEVI, O, GD, RD, G } = ST;
  const S = {};
  const gy = (s) => G - 310 * s;
  // ---- props ----
  const bell = (id, x, y, s = 1) => P(id, x, y, s, `<line x1="0" y1="-160" x2="0" y2="0" stroke="${O}" stroke-width="6"/><path d="M-40 66 Q-46 4 0 -4 Q46 4 40 66Z" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-48" y="60" width="96" height="14" rx="7" fill="#E8A23A" stroke="${O}" stroke-width="5"/><circle cy="84" r="11" fill="${GD}" stroke="${O}" stroke-width="4"/>`);
  const vimana = (c = '#FFC93C') => `<rect x="-150" y="-60" width="300" height="120" fill="${c}" stroke="${O}" stroke-width="7"/>${[-110, -55, 0, 55, 110].map(x => `<rect x="${x - 14}" y="-40" width="28" height="80" rx="8" fill="#E8A23A" stroke="${O}" stroke-width="4"/>`).join('')}
    <path d="M-130 -60 L-100 -130 H100 L130 -60Z" fill="${c}" stroke="${O}" stroke-width="7"/><path d="M-96 -130 L-70 -190 H70 L96 -130Z" fill="${c}" stroke="${O}" stroke-width="7"/>
    <path d="M-80 -190 Q-84 -300 0 -310 Q84 -300 80 -190Z" fill="${c}" stroke="${O}" stroke-width="7"/><path d="M-40 -230 Q0 -270 40 -230" fill="none" stroke="#E8A23A" stroke-width="8"/>
    <path d="M-12 -310 Q-20 -350 0 -380 Q20 -350 12 -310Z" fill="${c}" stroke="${O}" stroke-width="5"/><circle cy="-386" r="9" fill="${c}" stroke="${O}" stroke-width="4"/>`;
  const seven = (y, c, c2) => `<path d="M-60 ${y} ${[...Array(7)].map((_, i) => `Q${-60 + i * 170 + 85} ${y - 150 - (i % 2) * 60 - (i === 3 ? 80 : 0)} ${-60 + (i + 1) * 170} ${y}`).join(' ')} V1920 H-60Z" fill="${c}" stroke="${O}" stroke-width="6"/>${c2 ? `<path d="M-60 ${y + 70} Q540 ${y + 10} 1140 ${y + 70} V1920 H-60Z" fill="${c2}"/>` : ''}`;
  const cow = (c = '#FFF8EE') => `<g><rect x="-70" y="10" width="18" height="60" fill="${c}" stroke="${O}" stroke-width="5"/><rect x="40" y="10" width="18" height="60" fill="${c}" stroke="${O}" stroke-width="5"/><ellipse rx="90" ry="50" fill="${c}" stroke="${O}" stroke-width="6"/><ellipse cx="-20" cy="-10" rx="26" ry="18" fill="#8B5A2B"/><ellipse cx="30" cy="14" rx="18" ry="12" fill="#8B5A2B"/>
    <path d="M-90 -10 q-30 20 -20 50" stroke="${O}" stroke-width="5" fill="none"/><g transform="translate(96 -36)"><path d="M-14 -30 q-20 -24 -6 -38 M24 -30 q20 -24 6 -38" stroke="${O}" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse rx="38" ry="44" fill="${c}" stroke="${O}" stroke-width="6"/><ellipse cy="26" rx="28" ry="18" fill="#FFB3C1" stroke="${O}" stroke-width="4"/><circle cx="-14" cy="-6" r="6" fill="${O}"/><circle cx="14" cy="-6" r="6" fill="${O}"/><path d="M-60 -20 L-38 -12 M60 -20 L38 -12" stroke="${O}" stroke-width="10" stroke-linecap="round"/></g></g>`;
  const tiger = `<g><path d="M-58 -46 L-40 -80 L-20 -56Z M58 -46 L40 -80 L20 -56Z" fill="#FF8C1A" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><circle r="70" fill="#FF8C1A" stroke="${O}" stroke-width="7"/>
    <path d="M-66 -10 L-40 -6 M-64 14 L-40 8 M66 -10 L40 -6 M64 14 L40 8 M-12 -68 L-8 -44 M12 -68 L8 -44 M0 -70 V-46" stroke="${O}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cy="26" rx="40" ry="30" fill="#FFF8EE" stroke="${O}" stroke-width="5"/><circle cx="-24" cy="-14" r="9" fill="${O}"/><circle cx="24" cy="-14" r="9" fill="${O}"/><path d="M-10 12 L10 12 L0 22Z" fill="${O}"/><path d="M-16 34 Q0 46 16 34" stroke="${O}" stroke-width="5" fill="none"/></g>`;
  const baby = `<g><ellipse rx="44" ry="26" fill="#FFF1C1" stroke="${O}" stroke-width="5"/><circle cx="-34" cy="-8" r="24" fill="#4A7BD8" stroke="${O}" stroke-width="5"/><path d="M-42 -10 q4 4 8 0 M-30 -10 q4 4 8 0" stroke="${O}" stroke-width="3" fill="none"/></g>`;
  const flagG = `<line x1="0" y1="0" x2="0" y2="-560" stroke="${O}" stroke-width="18" stroke-linecap="round"/><line x1="0" y1="0" x2="0" y2="-560" stroke="${GD}" stroke-width="8"/><g id="v2fl"><path d="M0 -550 Q90 -580 170 -540 Q120 -500 170 -450 Q90 -480 0 -450Z" fill="#FF8C1A" stroke="${O}" stroke-width="6"/>
    <g transform="translate(78 -500) scale(.9)"><path d="M-40 0 Q-20 -30 0 -6 Q20 -30 40 0 Q20 -10 0 10 Q-20 -10 -40 0Z" fill="#C2410C" stroke="${O}" stroke-width="4"/><circle cy="-12" r="9" fill="#C2410C" stroke="${O}" stroke-width="3"/><path d="M6 -12 L16 -8 L6 -6Z" fill="${GD}"/></g></g>`;
  const moonDisc = `<circle r="200" fill="#FFF7D6" stroke="#FFE066" stroke-width="14" opacity=".95"/><circle r="240" fill="none" stroke="#FFF3B0" stroke-width="10" opacity=".6"/>`;
  const shubho = (id, x, y) => P(id, x, y, 1, `<rect x="-200" y="-56" width="400" height="100" rx="50" fill="#FFF8E6" stroke="${O}" stroke-width="7"/><text y="26" text-anchor="middle" font-family="Baloo Tammudu 2" font-weight="800" font-size="62" fill="#C2410C">శుభోదయం!</text>`, 0);
  // ---- helpers bound at run time (infra functions are globals) ----
  const eyesOpen = (id, at) => { tl.to(`#${id}-eo`, { opacity: 1, duration: 0.15 }, at); tl.to(`#${id}-ec`, { opacity: 0, duration: 0.15 }, at); };
  const ring = (id, at, n = 3) => wig('#' + id, at, 14, n, 0.18, '50% 0%');
  const W = v => v.words.map(x => x[0]);
  const beats = (v, fr) => fr.map(f => v.ms + (v.me - v.ms) * f);

  // ================= INTRO: dawn over the seven hills of Tirumala =================
  S.intro = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('gIn', '#FFB36B', '#FFE3A3')}<rect id="inDark" width="1080" height="1920" fill="#1B1446" opacity=".85"/>${stars([[120, 300], [320, 420], [760, 330], [960, 450], [560, 260]], 14)}
      ${P('inSun', 540, 1080, 1.1, sunFace)}${seven(1260, '#4E8F45')}${P('inTem', 540, 1090, 0.7, vimana())}${rays(540, 830, 18, '#FFF3C4', 0.0, 900, 40, 'inRays')}
      ${seven(1460, '#3E7F3A', '#2F6B2D')}${cloud(170, 640, 0.8)}${cloud(900, 700, 0.7)}${P('inBirds', 0, 0, 1, [[150, 760], [210, 800], [270, 770]].map(([a, b]) => P('', a, b, 1, birdIn())).join(''))}`,
    act(I) { gsap.set('#inSun', { y: 300 }); A('#inDark', { opacity: 0, duration: 3, ease: 'power1.inOut' }, 0.3); A('#inSun', { y: -120, duration: 4, ease: 'power1.out' }, 0.3);
      A('#inRays', { opacity: 1, duration: 1 }, 2.5); go('inBirds', 760, -200, 1, 6, 'none'); pulse('#inTem', 4, 1.06, 3, 0.3); burst(540, 800, 4.2, 10, 'gold', 220); rain('petal', 6, 4, 10); } };

  // ================= 1. Rama woken at dawn by sage Vishvamitra =================
  const rs = 0.62, ls = 0.56;
  S['1'] = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('g1', '#FFC98A', '#FFF0C9')}<rect id="r1dark" width="1080" height="1300" fill="#2A2160" opacity=".7"/>${P('r1sun', 170, 1080, 0.55, sunFace)}
      ${hills(1150, '#7CC26B')}${ground(G, '#8FC46A', '#6FAE50')}${tree(980, G - 10, 0.7, '#3E8E41')}${tree(80, G - 30, 0.55, '#4E9F4A')}
      ${P('', 900, 1000, 1, `<path d="M-120 0 L0 -110 L120 0Z" fill="#C49A6C" stroke="${O}" stroke-width="6"/><rect x="-100" y="0" width="200" height="120" fill="#E6B98A" stroke="${O}" stroke-width="6"/><rect x="-30" y="40" width="60" height="80" fill="#7A4A26" stroke="${O}" stroke-width="5"/>`)}
      ${P('', 240, 1172, 1, `<ellipse rx="230" ry="26" fill="#6BBF59" stroke="${O}" stroke-width="5"/>`)}${P('', 430, 1246, 1, `<ellipse rx="210" ry="24" fill="#5BAA4A" stroke="${O}" stroke-width="5"/>`)}
      ${P('r1lw', 580, 1240, 1, LAKS('r1l', 0, -310 * ls, ls, { eyes: 'closed', hold: '' }))}
      ${P('r1rw', 400, 1166, 1, RAMA('r1r', 0, -310 * rs, rs, { eyes: 'closed', hold: '' }))}
      ${SAGE('r1s', 760, gy(0.72), 0.72, { mood: 'op' })}
      ${P('r1tig', 250, 860, 0.8, tiger, 0)}
      ${P('r1bub', 640, 560, 1, `<ellipse rx="250" ry="190" fill="#FFF8EE" stroke="${O}" stroke-width="7"/>${SITA('r1kau', -70, -150, 0.42, { cloth: '#FF8C1A', drape: '#E63946' })}${P('r1baby', 60, 10, 1.1, baby)}<text x="0" y="168" text-anchor="middle" font-family="Baloo Tammudu 2" font-weight="800" font-size="44" fill="#C2410C">కౌసల్య</text>`, 0)}
      ${P('r1east', 170, 760, 1, `<rect x="-90" y="-40" width="180" height="70" rx="35" fill="#FFF8E6" stroke="${O}" stroke-width="5"/><text y="12" text-anchor="middle" font-family="Baloo Tammudu 2" font-weight="800" font-size="44" fill="#C2410C">తూర్పు</text>`, 0)}`,
    act(v) { const w = W(v), b = beats(v, [0.03, 0.3, 0.52, 0.78]);
      gsap.set('#r1rw', { rotation: -90, svgOrigin: '0 0' }); gsap.set('#r1lw', { rotation: -90, svgOrigin: '0 0' }); gsap.set('#r1sun', { y: 260 });
      // కౌసల్యా సుప్రజా రామ
      pop('#r1bub', w[0], 0.5); burst(640, 560, w[1], 8, 'heart', 200); stream('spark', 560, 720, 230, 1080, w[2], 0.6, 6); fout('#r1bub', w[3] - 0.1, 0.3);
      // పూర్వా సంధ్యా ప్రవర్తతే: sun rises in the east
      A('#r1sun', { y: -40, duration: 2.6, ease: 'power1.out' }, w[3]); A('#r1dark', { opacity: 0, duration: 2.6 }, w[3]); pop('#r1east', w[4], 0.4); fout('#r1east', w[6], 0.3);
      // ఉత్తిష్ఠ: sage calls, Rama gets up
      arm('r1s', 'R', -120, w[5]); wig('#r1s-aR', w[6], 10, 2, 0.15); A('#r1rw', { rotation: 0, duration: 0.7, ease: 'back.out(1.4)' }, w[6]); eyesOpen('r1r', w[6] + 0.3); burst(400, 980, w[6] + 0.5, 8, 'spark', 160);
      // నరశార్దూల: brave like a tiger
      pop('#r1tig', w[7], 0.5); pulse('#r1tig', w[7] + 0.5, 1.15, 2, 0.2); fout('#r1tig', w[8] + 0.2, 0.3);
      // కర్తవ్యం దైవమాహ్నికమ్: morning prayer, water offered to the sun
      A('#r1lw', { rotation: 0, duration: 0.7, ease: 'back.out(1.4)' }, w[8]); eyesOpen('r1l', w[8] + 0.3); arm('r1r', 'R', -150, w[8]); arm('r1r', 'L', 150, w[8]);
      stream('drop', 430, 900, 200, 860, w[8] + 0.3, 1.6, 10, { d: 0.8 }); burst(170, 1040, w[9] + 0.4, 10, 'gold', 220); mood('r1s', 'sm', w[9]);
      // meaning recap
      pop('#r1bub', b[0], 0.5); burst(640, 560, b[0] + 0.6, 6, 'heart', 180); fout('#r1bub', b[1] - 0.3, 0.3);
      pulse('#r1sun', b[1], 1.1, 2, 0.3); rings(170, 1040, b[1], 2);
      pop('#r1tig', b[2], 0.4); pulse('#r1tig', b[2] + 0.4, 1.15, 2, 0.2); fout('#r1tig', b[3] - 0.2, 0.3);
      stream('drop', 430, 900, 200, 860, b[3], 1.6, 10, { d: 0.8 }); burst(170, 1040, b[3] + 1.4, 8, 'spark', 200); } };

  // ================= 2. Waking Govinda in the Tirumala sanctum =================
  S['2'] = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('g2', '#FFE1A8', '#FFB36B')}${rays(540, 820, 20, '#FFF3C4', 0.35)}${[110, 970].map(x => `<rect x="${x - 40}" y="360" width="80" height="900" fill="#F2B33D" stroke="${O}" stroke-width="6"/><rect x="${x - 60}" y="340" width="120" height="40" fill="${RD}" stroke="${O}" stroke-width="6"/>`).join('')}
      <path d="M260 1240 V640 Q260 470 540 450 Q820 470 820 640 V1240" fill="#B8432F" stroke="${O}" stroke-width="8"/><path d="M300 1240 V650 Q300 510 540 495 Q780 510 780 650 V1240" fill="#5A1E14" stroke="${O}" stroke-width="5"/>
      ${ground(G, '#E6B98A', '#D9A066')}<rect id="v2dark" width="1080" height="1300" fill="#1B1030" opacity=".62"/>
      ${bell('v2b1', 330, 520, 0.9)}${bell('v2b2', 750, 520, 0.9)}
      ${P('v2w', 0, 0, 1, `${P('v2w1', 200, 420, 0.42, `${bigCloud(0, 40, 0.9)}${palace(0, -30, 0.8, '#FFD23F')}`)}${P('v2w2', 540, 380, 0.42, globe('v2g'))}${P('v2w3', 880, 420, 0.42, `<circle r="200" fill="#3B2A55" stroke="${O}" stroke-width="8"/>${stars([[-80, -60], [60, -90], [0, 40], [90, 60]], 20)}`)}`, 0)}
      ${P('v2flag', 980, 1240, 1, flagG, 0)}
      ${P('v2cow', -260, 1160, 0.75, cow(), 1)}
      ${P('v2lotus', 270, 1240, 1, `${lotus(0, -10, 1.3)}${LAKSHMI('v2lak', 0, -310 * 0.55 - 40, 0.55)}`, 0)}
      ${VEN('v2ven', 540, gy(0.95), 0.95, { eyes: 'closed', mood: 'sm' })}
      ${KID('v2k1', 120, gy(0.5) + 40, 0.5, { hold: 'lamp', mood: 'op' })}${KID('v2k2', 850, gy(0.5) + 40, 0.5, { hold: 'cymbal', holdL: 'cymbal', mood: 'op', cloth: '#E8F6FF', top: '#2EC4B6' })}`,
    act(v) { const w = W(v), b = beats(v, [0.02, 0.3, 0.55, 0.8]);
      // three ఉత్తిష్ఠ calls: bells ring, darkness lifts step by step
      [w[0], w[2], w[4]].forEach((t, i) => { ring('v2b1', t, 3); ring('v2b2', t + 0.1, 3); rings(540, 800, t, 1); A('#v2dark', { opacity: [0.4, 0.2, 0][i], duration: 0.8 }, t); wig('#v2k2-aR', t, 20, 2, 0.12, '50% 0%'); });
      stream('note', 150, 1050, 330, 700, w[0], 3, 6, { d: 1.2 });
      // గోవింద: the cows' protector, a cow walks in
      go('v2cow', 470, 0, w[1] - 0.3, 1.2, 'power1.out'); bob('#v2cow', w[1] - 0.3, 0.2, -10, 3); burst(300, 1040, w[1] + 0.9, 6, 'heart', 120); A('#v2cow', { opacity: 0, duration: 0.4 }, w[3] - 0.2);
      // గరుడధ్వజ: Garuda flag rises
      popB('#v2flag', w[3], 0.6); wig('#v2fl', w[3] + 0.6, 6, 4, 0.3, '0% 50%');
      // కమలాకాంత: Lakshmi appears on a lotus
      popB('#v2lotus', w[5], 0.6); burst(270, 1000, w[5] + 0.4, 8, 'petal', 180); stream('heart', 330, 960, 470, 900, w[5] + 0.6, 0.8, 5);
      // త్రైలోక్యం మంగళం కురు: three worlds, Lord opens eyes and blesses
      pop('#v2w', w[6], 0.5); eyesOpen('v2ven', w[7] - 0.2); arm('v2ven', 'R', -130, w[7]); arm('v2ven', 'L', 130, w[7]); rings(540, 800, w[7], 3, '#FFE066');
      [200, 540, 880].forEach((x, i) => stream('gold', 540, 780, x, 420, w[7] + 0.3 + i * 0.15, 0.6, 4)); pulse('#v2w', w[8] + 0.2, 1.06, 2, 0.25); rain('petal', w[8], 3, 14); mood('v2k1', 'sm', w[8]); mood('v2k2', 'sm', w[8]);
      // meaning recap
      ring('v2b1', b[0], 3); ring('v2b2', b[0] + 0.1, 3); pulse('#v2ven', b[0] + 0.3, 1.04, 2, 0.25);
      wig('#v2fl', b[1], 8, 4, 0.25, '0% 50%'); burst(1060, 760, b[1], 6, 'spark', 120);
      pulse('#v2lotus', b[2], 1.08, 2, 0.25); stream('heart', 330, 960, 470, 900, b[2], 1, 6);
      pulse('#v2w', b[3], 1.08, 2, 0.25); [200, 540, 880].forEach((x, i) => stream('gold', 540, 780, x, 420, b[3] + i * 0.15, 0.6, 4)); } };

  // ================= 3. Mother Lakshmi, who lives in Vishnu's heart =================
  S['3'] = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('g3', '#FFE3F1', '#FFD38A')}${rays(420, 820, 24, '#fff', 0.3)}${P('v3sun', 640, 1100, 0.6, sunFace)}${bigCloud(200, 1170, 1.1)}${bigCloud(900, 1190, 1)}${bigCloud(540, 1270, 1.4)}
      ${P('v3glb', 380, 470, 0.5, globe('v3g'), 0)}
      ${P('v3dem', 0, 0, 1, `${P('v3d1', 960, 470, 0.7, demonIn('#6B3FA0'))}${P('v3d2', 1010, 640, 0.6, demonIn('#3F6BA0'))}`, 0)}
      ${lotus(380, 1215, 1.7)}${LAKSHMI('v3lak', 380, gy(1.0) - 20, 1.0)}
      ${VEN('v3ven', 830, gy(0.78) - 10, 0.78)}
      ${P('v3hrt', 830, 1005, 1, `<circle r="40" fill="#FFF3B0" opacity=".8"/><path d="M0 22 C-34 0 -30 -26 -12 -24 Q-2 -22 0 -12 Q2 -22 12 -24 C30 -26 34 0 0 22Z" fill="#FF5C7A" stroke="${O}" stroke-width="4"/>`, 0)}
      ${P('v3kids', -300, 0, 1, `${KID('v3k1', 110, gy(0.48) + 40, 0.48, { mood: 'op' })}${KID('v3k2', 230, gy(0.42) + 50, 0.42, { mood: 'op', top: '#E63946' })}`)}
      ${shubho('v3sb', 540, 380)}`,
    act(v) { const w = W(v), b = beats(v, [0.02, 0.15, 0.3, 0.45, 0.62, 0.8, 0.93]);
      gsap.set('#v3sun', { y: 200 }); gsap.set('#v3ven-aR', { rotation: -130, svgOrigin: '56 60' }); gsap.set('#v3ven-aL', { rotation: 130, svgOrigin: '-56 60' });
      // మాతస్సమస్త జగతాం: mother of all worlds
      arm('v3lak', 'R', -140, w[0]); arm('v3lak', 'L', 140, w[0]); pop('#v3glb', w[0] + 0.1, 0.5); stream('heart', 380, 760, 380, 520, w[1], 1, 6); arm('v3lak', 'R', 0, w[2] - 0.2); arm('v3lak', 'L', 0, w[2] - 0.2); fout('#v3glb', w[3], 0.3);
      // మధుకైటభారేః: Vishnu who defeated the demons Madhu and Kaitabha
      pop('#v3dem', w[2], 0.4); wig('#v3dem', w[2] + 0.4, 3, 3, 0.1, '50% 50%'); stream('<g class="spinR">' + ST.SH.spark + '</g>', 930, 860, 980, 560, w[2] + 0.5, 0.3, 3, { d: 0.5 });
      A('#v3d1', { x: 500, y: -500, rotation: 200, duration: 0.8, ease: 'power2.in' }, w[2] + 1.0); A('#v3d2', { x: 500, y: -300, rotation: -200, duration: 0.8, ease: 'power2.in' }, w[2] + 1.1); fout('#v3dem', w[3] + 0.3, 0.2);
      // వక్షోవిహారిణి: she lives in his heart
      stream('heart', 420, 860, 830, 1000, w[3], 0.8, 6); pop('#v3hrt', w[3] + 0.6, 0.5); pulse('#v3hrt', w[4], 1.2, 3, 0.25);
      // మనోహర దివ్యమూర్తే: beautiful divine form
      burst(380, 820, w[4] + 0.2, 10, 'spark', 230); rings(380, 820, w[5], 2, '#FFD6E8');
      // శ్రీస్వామిని: the queen
      burst(380, 700, w[6], 8, 'gold', 140); pulse('#v3lak', w[6] + 0.2, 1.04, 2, 0.25);
      // శ్రితజనప్రియ: loves those who come to her
      go('v3kids', 300, 0, w[7] - 0.2, 1.0, 'power2.out'); bob('#v3kids', w[7] - 0.2, 0.18, -8, 3); stream('heart', 330, 900, 180, 1000, w[7] + 0.8, 0.8, 5); mood('v3k1', 'sm', w[8]); mood('v3k2', 'sm', w[8]);
      // దానశీలే: always giving
      arm('v3lak', 'L', 40, w[8] - 0.1); stream('coin', 290, 1050, 170, 1150, w[8], 1.4, 12, { d: 0.7 });
      // శ్రీవేంకటేశ దయితే: beloved of Venkatesa
      rise('heart', 600, 940, w[9], 1.2, 8, 140, 360); mood('v3ven', 'op', w[9]); mood('v3ven', 'sm', w[10] + 0.4);
      // తవ సుప్రభాతమ్: good morning to you
      A('#v3sun', { y: -600, duration: 1.4, ease: 'power2.out' }, w[11]); pop('#v3sb', w[12], 0.5); fout('#v3sb', v.ms + 0.5, 0.3); rain('petal', w[12], 2.5, 10);
      // meaning recap
      pop('#v3glb', b[0], 0.4); fout('#v3glb', b[1], 0.3); pulse('#v3ven-aR', b[1], 1.15, 2, 0.2); pulse('#v3hrt', b[2], 1.25, 3, 0.25);
      burst(380, 820, b[3], 10, 'spark', 230); stream('coin', 290, 1050, 170, 1150, b[4], 1.4, 10, { d: 0.7 }); rise('heart', 600, 940, b[5], 1.2, 7, 140, 360); pop('#v3sb', b[6], 0.4); } };

  // ================= 4. Lotus-eyed, moon-faced mother, worshipped by goddesses =================
  S['4'] = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('g4', '#FFD9A0', '#FFF3DC')}${P('v4sun', 200, 1100, 0.6, sunFace)}${seven(1180, '#7CC26B', '#5BAA4A')}${ground(G, '#8FC46A', '#6FAE50')}
      ${P('v4moon', 540, 812, 1, moonDisc, 0)}
      ${P('v4hill', 870, 560, 0.55, `<path d="M-230 120 Q-120 -80 0 -60 Q120 -80 230 120Z" fill="#4E8F45" stroke="${O}" stroke-width="8"/>${P('', 0, -30, 0.45, vimana())}${VEN('v4ven', 0, -60 - 310 * 0.42, 0.42)}`, 0)}
      ${P('v4lot', 0, 0, 1, `${lotus(395, 760, 0.55)}${lotus(685, 760, 0.55)}`, 0)}
      ${LAKSHMI('v4lak', 540, gy(1.15), 1.15, { eyes: 'closed' })}
      ${P('v4d1w', -300, 0, 1, DEVI('v4d1', 120, gy(0.55), 0.55, '#FFFFFF', '#F2B33D'))}${P('v4d2w', -300, 0, 1, DEVI('v4d2', 270, gy(0.48) + 30, 0.48, '#4FB0E6', '#FFC93C'))}${P('v4d3w', 300, 0, 1, DEVI('v4d3', 950, gy(0.55), 0.55, '#3FA34D', '#E63946', { flip: true }))}
      ${P('v4chest', 540, 1215, 1.1, chest, 0)}`,
    act(v) { const w = W(v), b = beats(v, [0.02, 0.22, 0.35, 0.52, 0.75, 0.9]);
      gsap.set('#v4sun', { y: 260 });
      // తవ సుప్రభాతం: the sun rises for her
      A('#v4sun', { y: -560, duration: 2.2, ease: 'power1.out' }, w[0]);
      // అరవింద లోచనే: lotus eyes open
      pop('#v4lot', w[2], 0.5); eyesOpen('v4lak', w[3]); burst(540, 780, w[3] + 0.1, 8, 'spark', 150); fout('#v4lot', w[5], 0.3);
      // భవతు ప్రసన్న: smiling face
      mood('v4lak', 'op', w[4]); mood('v4lak', 'sm', w[5] + 0.3);
      // ముఖచంద్ర మండలే: face like the full moon
      fin('#v4moon', w[6], 0.6); rings(540, 812, w[7], 2, '#FFF7D6');
      // విధి శంకరేంద్ర వనితాభి రర్చితే: wives of Brahma, Shiva, Indra worship her
      go('v4d1w', 300, 0, w[8], 0.9, 'power2.out'); go('v4d2w', 300, 0, w[9], 0.9, 'power2.out'); go('v4d3w', -300, 0, w[9] + 0.2, 0.9, 'power2.out');
      ['v4d1', 'v4d2', 'v4d3'].forEach((id, i) => { wig(`#${id}-aR`, w[10] + i * 0.1, 18, 3, 0.25, '50% 0%'); A('#' + id, { rotation: i === 2 ? -10 : 10, transformOrigin: '50% 100%', duration: 0.4 }, w[11]); A('#' + id, { rotation: 0, duration: 0.4 }, w[11] + 0.7); });
      rain('petal', w[10], 2.5, 12, 300, 780, 1150);
      // వృషశైల నాథ దయితే: beloved of the Lord of Tirumala hill
      popB('#v4hill', w[12], 0.6); stream('heart', 830, 520, 640, 720, w[14] - 0.2, 0.8, 6);
      // దయానిధే: treasure of kindness
      popB('#v4chest', w[15], 0.5); rise('heart', 540, 1180, w[15] + 0.3, 1.6, 12, 260, 520);
      // meaning recap
      pulse('#v4lot', b[0], 1, 1, 0.01); pop('#v4lot', b[0], 0.4); fout('#v4lot', b[1], 0.3); pulse('#v4sun', b[1], 1.08, 2, 0.3); rings(540, 812, b[2], 2, '#FFF7D6');
      rain('petal', b[3], 2, 10, 300, 780, 1150); ['v4d1', 'v4d2', 'v4d3'].forEach((id, i) => { A('#' + id, { rotation: i === 2 ? -10 : 10, transformOrigin: '50% 100%', duration: 0.4 }, b[3]); A('#' + id, { rotation: 0, duration: 0.4 }, b[3] + 0.8); });
      pulse('#v4hill', b[4], 1.08, 2, 0.25); rise('heart', 540, 1180, b[5], 1.6, 10, 260, 520); } };

  // ================= Finale: sing along at the Tirumala temple =================
  S.fin = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('gF', '#FFB36B', '#FFE9B0')}${rays(540, 780, 24, '#FFF3C4', 0.4)}${P('', 540, 1030, 1.35, vimana())}${seven(1230, '#4E8F45')}${ground(G, '#E6B98A', '#D9A066')}
      ${bell('fb1', 120, 420, 0.9)}${bell('fb2', 960, 420, 0.9)}
      ${LAKSHMI('flak', 190, gy(0.62), 0.62)}${VEN('fven', 540, gy(1.0), 1.0)}
      ${KID('fk1', 850, gy(0.48) + 40, 0.48, { hold: 'lamp', mood: 'op' })}${KID('fk2', 980, gy(0.42) + 50, 0.42, { mood: 'op', top: '#E63946', hold: 'cymbal', holdL: 'cymbal' })}`,
    act(G2, SG) { gsap.set('#fven-aR', { rotation: -130, svgOrigin: '56 60' }); gsap.set('#fven-aL', { rotation: 130, svgOrigin: '-56 60' });
      rings(540, 800, G2.start, 2, '#FFE066'); rain('petal', G2.start, 2, 10);
      for (let t = G2.start; t < SG.end - 1; t += 3.2) { ring('fb1', t, 2); ring('fb2', t + 0.15, 2); wig('#fk2-aR', t + 0.6, 20, 2, 0.12, '50% 0%'); }
      for (let t = SG.start; t < SG.end - 2; t += 4) { stream('note', 880, 1050, 760, 650, t, 2.5, 4, { d: 1.4 }); pulse('#fven', t + 2, 1.03, 1, 0.4); }
      SG.verses.forEach((v, i) => { rings(540, 780, v.start, 2, '#FFF3B0'); rain(i % 2 ? 'marigold' : 'petal', v.start, 3, 12); burst(540, 760, v.start + 0.2, 8, 'gold', 200); });
      stream('heart', 260, 900, 470, 900, SG.verses[2].start + 2, 1, 6); stream('heart', 260, 900, 470, 900, SG.verses[3].start + 2, 1, 6); },
    outro(t) { rings(540, 780, t, 3, '#FFE066'); burst(540, 760, t + 0.2, 14, 'gold', 260); rain('marigold', t, 2.5, 16); rain('conf', t + 0.3, 2.5, 10); rain('conf2', t + 0.5, 2.5, 10); mood('fk1', 'sm', t); mood('fk2', 'sm', t); } };
  return S;
})();
