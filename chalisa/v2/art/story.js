// Per-verse storyboard scenes. Each: H = hero placement [x, y, scale, pose, eyesClosed], bg/fg svg, act(t0, half2, end, wordStarts).
ST.S = (() => {
  const { P, sky, cloud, bigCloud, stars, rays, ground, hills, tree, lotus, palace, palaceIn, flame, flameIn, diya, rock, mango, ringIn, bubble, thought, tx, heartP, book, bulb, muscle, check, gem, chest, ghostIn, germIn, demonIn, wolfIn, birdIn, fishIn, wavesP, sunFace, worlds, globe, fig, RAMA, SITA, LAKS, KID, SAGE, TULSI, SHIVA, MONKEY, O, GD, RD, SK, BL, SF, G } = ST;
  const S = {};
  const gy = (s) => G - 310 * s; // y to stand a fig of scale s on the ground
  const court = (k) => `${sky(k, '#FFF0C9', '#FFC98A')}${rays(540, 700, 20, '#fff', 0.25)}${[150, 930].map(x => `<rect x="${x - 40}" y="380" width="80" height="860" fill="#F2B33D" stroke="${O}" stroke-width="6"/><rect x="${x - 60}" y="360" width="120" height="40" fill="${RD}" stroke="${O}" stroke-width="6"/>`).join('')}<path d="M110 400 Q540 200 970 400" fill="none" stroke="#E8A23A" stroke-width="36"/><path d="M110 400 Q540 200 970 400" fill="none" stroke="${O}" stroke-width="6"/>${ground(G, '#E6B98A')}`;
  const night = (k) => `${sky(k, '#1B1446', '#5B2D74')}${stars([[100, 330], [300, 300], [700, 360], [960, 420], [520, 450], [880, 300], [200, 520], [620, 560]], 14)}`;
  const heaven = (k) => `${sky(k, '#FFE3F1', '#FFD38A')}${rays(540, 780, 24, '#fff', 0.3)}${bigCloud(200, 1170, 1.1)}${bigCloud(880, 1190, 1)}${bigCloud(540, 1260, 1.4)}`;

  // ================= INTRO =================
  S.intro = { H: [0, -40, 0.78, 'hero'],
    bg: `${sky('gIn', '#FFB36B', '#FFE3A3')}${P('inSun', 540, 1000, 1.2, sunFace)}${hills(1150, '#7CC26B')}${ground(G, '#4E9F4A')}${cloud(160, 700, 0.8)}${cloud(900, 760, 0.7)}${P('inBirds', 0, 0, 1, [[200, 820], [260, 860], [320, 830]].map(([a, b]) => P('', a, b, 1, birdIn())).join(''))}`,
    act(t, h, e) { gsap.set('#inSun', { y: 260 }); A('#inSun', { y: -200, duration: 2.5, ease: 'power1.out' }, 0); go('inBirds', 700, -260, 0.2, 4, 'none');
      hm(0, { y: -900 }, 0.01); pose('fly', 0, 0.01); hm(0.5, { y: 0 }, 0.8, 'power2.in'); pose('hero', 1.25, 0.3); shake(1.3, 6, 12); burst(540, 1230, 1.3, 10, 'dust', 200); pose('roar', 1.6); rings(540, 760, 1.7); pose('hero', 3.0); burst(540, 700, 3.2, 10); } };

  // ================= D1 Guru's feet, mirror cleaned, sing Rama's glory, 4 fruits =================
  S.D1 = { H: [0, 0, 0.6, 'stand'], hide: true,
    bg: `${sky('gD1', '#FFE7B5', '#FFB36B')}${rays(800, 900, 20, '#FFF3C4', 0.35)}${ground(G, '#E6B98A', '#D9A066')}
      ${P('', 800, 1140, 1, `<ellipse rx="210" ry="40" fill="#F2B33D" stroke="${O}" stroke-width="6"/><rect x="-200" y="0" width="400" height="80" fill="#E8A23A" stroke="${O}" stroke-width="6"/>`)}
      ${SAGE('d1guru', 800, 1140 - 310 * 0.95, 0.95, { eyes: 'closed', cloth: '#FF9F43', hold: 'mala' })}
      <g id="d1feet" opacity="0">${P('', 800, 1120, 1, `<circle r="120" fill="#FFF3B0" opacity=".7"/>`)}${lotus(800, 1150, 1.1)}</g>
      ${TULSI('d1tul', 300, gy(0.9), 0.9, { mood: 'sm', eyes: 'closed' })}
      ${P('d1mir', 540, 620, 1, `<rect x="-14" y="150" width="28" height="140" rx="10" fill="#A0622D" stroke="${O}" stroke-width="6"/><ellipse rx="150" ry="180" fill="${GD}" stroke="${O}" stroke-width="8"/><ellipse rx="122" ry="152" fill="#CFEFFF" stroke="${O}" stroke-width="5"/><g id="d1rama" opacity="0">${RAMA('d1r', 0, -60, 0.42)}</g><g id="d1fog"><ellipse rx="122" ry="152" fill="#8C8577"/>${[[-50, -60], [30, 20], [-20, 80], [60, -90]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="38" fill="#6E675C"/>`).join('')}</g><path id="d1shine" opacity="0" d="M-80 -100 L-40 -140 M-90 -40 L10 -140" stroke="#fff" stroke-width="16" stroke-linecap="round"/>`)}
      ${P('d1cloth', 380, 560, 1, `<path d="M-50 -30 Q0 -50 50 -30 L40 40 Q0 20 -44 40Z" fill="#FF5C7A" stroke="${O}" stroke-width="6"/>`, 0)}
      ${['#FFB31A', '#E63946', '#FFD23F', '#7BC043'].map((c, i) => P('d1f' + i, 540, 620, 1, i === 0 ? `<g transform="scale(.6)">${mango}</g>` : i === 1 ? `<circle r="34" fill="${c}" stroke="${O}" stroke-width="6"/><path d="M0 -34 q6 -16 16 -18" stroke="${O}" stroke-width="5" fill="none"/>` : i === 2 ? `<path d="M-40 -10 Q0 50 40 -30 Q10 20 -40 -10Z" fill="${c}" stroke="${O}" stroke-width="6"/>` : `<circle r="30" fill="${c}" stroke="${O}" stroke-width="6"/><circle cx="-8" cy="-8" r="8" fill="#fff" opacity=".6"/>`, 0)).join('')}`,
    act(t, h, e, w) { gsap.set('#d1tul', { rotation: 0 });
      A('#d1tul', { rotation: 28, transformOrigin: '50% 100%', duration: 0.6, ease: 'power2.inOut' }, w[1]); fin('#d1feet', w[2], 0.5); pulse('#d1feet', w[2] + 0.4, 1.06, 3, 0.3);
      stream('gold', 820, 1120, 360, 900, w[3], 1.0, 10); A('#d1tul', { rotation: 0, duration: 0.5 }, w[5] - 0.2); arm('d1tul', 'R', -110, w[5] - 0.1);
      fin('#d1cloth', w[5], 0.2); F('#d1cloth', { x: -140, y: 0 }, { x: 110, y: 40, duration: 0.35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, w[5]); fout('#d1cloth', w[8] + 0.2, 0.3);
      A('#d1fog', { opacity: 0, duration: 1.4, ease: 'power1.in' }, w[6]); fin('#d1shine', w[8], 0.3); burst(540, 620, w[8] + 0.2, 10, 'spark', 230); arm('d1tul', 'R', 0, w[8] + 0.4);
      fin('#d1rama', h - 0.2, 0.6); pulse('#d1mir', h, 1.06, 2, 0.35); mood('d1tul', 'op', h + 0.3); stream('note', 330, 740, 520, 380, h + 0.3, 2.4, 9, { d: 1.3 });
      [0, 1, 2, 3].forEach(i => { pop('#d1f' + i, w[13] + i * 0.35, 0.4); go('d1f' + i, -270 + i * 180, 360, w[13] + i * 0.35, 0.7, 'back.out(1.4)'); });
      A('#d1guru-aR', { rotation: -110, svgOrigin: '56 60', duration: 0.5 }, w[14]); burst(540, 980, e - 0.4, 8, 'gold'); } };

  // ================= D2 weak devotee remembers Hanuman: strength, wisdom, learning; troubles go =================
  S.D2 = { H: [230, -40, 0.62, 'stand'], hide: true,
    bg: `${sky('gD2', '#B8C6DB', '#F5D7A1')}${ground(G, '#CFA46E', '#B98A55')}${tree(940, G - 20, 0.8, '#4E8F45')}
      ${TULSI('d2tul', 290, gy(0.85), 0.85, { mood: 'sd' })}
      ${P('d2storm', 290, 620, 1, `${bigCloud(0, 0, 0.6, '#7A7F8C')}${tx('?', -60, 10, 90, '#fff', 8)}${tx('?', 60, 0, 70, '#fff', 8)}`)}
      ${P('d2sun', 290, 560, 1, `<circle r="80" fill="#FFD23F" stroke="${O}" stroke-width="7"/>${[...Array(10)].map((_, i) => `<path d="M0 -96 L12 -130 L-12 -130Z" fill="#FFB703" stroke="${O}" stroke-width="4" transform="rotate(${i * 36})"/>`).join('')}`, 0)}
      ${P('d2i0', 700, 760, 1, muscle, 0)}${P('d2i1', 700, 760, 1, bulb, 0)}${P('d2i2', 700, 760, 1, `<g transform="scale(.8)">${book('#2E86DE')}</g>`, 0)}`,
    act(t, h, e, w) { wig('#d2tul-head', t, 6, 3, 0.3, '50% 100%'); bob('#d2storm', t, 0.4, 14, 4); rain('drop', t, 1.6, 8, 160, 420, 1000);
      eyes(false, t); A('#d2tul-eo', { opacity: 0, duration: 0.2 }, w[3]); A('#d2tul-ec', { opacity: 1, duration: 0.2 }, w[3]); arm('d2tul', 'R', -40, w[3]); arm('d2tul', 'L', 40, w[3]);
      A('#hero', { opacity: 1, duration: 0.2 }, w[4] - 0.2); hm(w[4] - 0.2, { x: 500, y: -700, rotation: -30 }, 0.01); pose('fly', w[4] - 0.2, 0.01); hm(w[4], { x: 0, y: 0, rotation: 0 }, 0.8, 'power2.out'); pose('stand', w[4] + 0.7, 0.4);
      speed(w[4] - 0.2, 0.8, -1, 8); rise('wind', 760, 1100, w[4] + 0.6, 1, 4, 200, 300);
      [6, 7, 8].forEach((k, i) => { const at = w[k]; pop('#d2i' + i, at - 0.1, 0.3); go('d2i' + i, -420, -80 + i * 10, at + 0.25, 0.5, 'power2.in'); A('#d2i' + i, { opacity: 0, duration: 0.15 }, at + 0.75); burst(290, 760, at + 0.75, 6, 'gold', 120, 0.6); });
      A('#d2tul-eo', { opacity: 1, duration: 0.2 }, w[11]); A('#d2tul-ec', { opacity: 0, duration: 0.2 }, w[11]); mood('d2tul', 'sm', w[11]);
      A('#d2storm', { scale: 1.4, opacity: 0, transformOrigin: '50% 50%', duration: 0.5 }, w[11]); burst(290, 620, w[11], 10, 'spark', 220); fin('#d2sun', w[12], 0.5); spin('#d2sun', w[12], 3, 60);
      arm('d2tul', 'R', -120, w[12]); arm('d2tul', 'L', 120, w[12]); bob('#d2tul', w[12], 0.25, -20, 3); } };

  // ================= 1 ocean of wisdom & virtue; lights up three worlds =================
  S[1] = { H: [0, -60, 0.6, 'hero'],
    bg: `<g id="v1sea">${sky('g1', '#FFB36B', '#CFF0FF')}${P('', 540, 700, 1, sunFace)}${wavesP(1000, '#2E9BD6')}${wavesP(1080, '#1F7FC0')}${rock(540, 1240, 1.5, '#8A7A6A')}</g>
      <g id="v1w" opacity="0">${worlds('v1wd')}</g>`,
    fg: `${wavesP(1170, '#176AA6', 'wave')}`,
    act(t, h, e, w) { gsap.set('#v1w', { opacity: 0 }); burst(540, 640, w[0], 10); rings(540, 700, w[0] + 0.1, 2);
      rise(`<g transform="scale(.45)">${book('#2E86DE')}</g>`, 330, 1120, w[2], 1.2, 4, 160, 600); rise(`<g transform="scale(.45)">${book(RD)}</g>`, 760, 1120, w[2] + 0.2, 1.2, 3, 160, 600);
      rise(gem('#2EC4B6'), 220, 1150, w[3], 1.3, 4, 200, 700); rise(gem('#FF5C7A'), 860, 1150, w[3] + 0.1, 1.3, 4, 200, 700); rise('heart', 540, 1150, w[4], 1.2, 5, 500, 600);
      fin('#v1w', h - 0.35, 0.5); hm(h - 0.35, { y: -380, scale: 0.75 }, 0.6); pose('open', h - 0.3); A('#aura', { opacity: 1, duration: 0.4 }, h);
      burst(540, 720, w[5], 8); ['d1', 'd2', 'd3'].forEach((d, i) => { A('#v1wd-' + d, { opacity: 0, duration: 0.4 }, w[7] + i * 0.3); burst(200 + i * 320, 450 + i * 330, w[7] + i * 0.3, 6, 'gold', 160); });
      pulse('#aura', w[8], 1.1, 2, 0.3); } };

  // ================= 2 Rama's messenger, mighty; son of Anjani and Wind =================
  S[2] = { H: [180, -40, 0.62, 'stand'],
    bg: `${sky('g2', '#9EE0FF', '#E8F7FF')}${cloud(200, 380, 0.8)}${cloud(860, 470, 0.7)}${hills(1150, '#7CC26B')}${ground(G, '#4E9F4A')}
      ${RAMA('v2r', 230, gy(1.0), 1.0)}
      ${P('v2scroll', 330, 820, 1, `<rect x="-50" y="-30" width="100" height="60" rx="8" fill="#FFF1C1" stroke="${O}" stroke-width="6"/><circle cx="-50" cy="0" r="16" fill="#E8A23A" stroke="${O}" stroke-width="5"/><circle cx="50" cy="0" r="16" fill="#E8A23A" stroke="${O}" stroke-width="5"/><circle r="12" fill="${RD}" stroke="${O}" stroke-width="3"/>`, 0)}
      ${MONKEY('v2anj', 200, gy(0.85), 0.85, '#C9773B', { female: true, cloth: '#2FA36B', drape: '#FFC93C', op: 0 })}
      ${P('v2vayu', 860, 470, 1, `${bigCloud(0, 80, 0.55)}${fig({ id: 'v2vy', x: 0, y: -40, s: 0.5, skin: '#9ED8F5', cloth: '#fff', crown: 'mukut', mood: 'op' })}`, 0)}`,
    act(t, h, e, w) { arm('v2r', 'R', -60, t - 0.2); pop('#v2scroll', t, 0.4); go('v2scroll', 300, 20, t + 0.5, 0.6); fout('#v2scroll', t + 1.2, 0.2); pose('point', t + 1.1, 0.3); burst(720, 830, t + 1.2, 6, 'gold', 100);
      A('#rockWrap', { opacity: 1, duration: 0.1 }, w[1] - 0.1); pose('lift', w[1] - 0.1, 0.4); shake(w[1] + 0.3, 6, 10); burst(720, 1230, w[1] + 0.3, 8, 'dust', 180); bob('#hmv', w[1] + 0.4, 0.3, -20, 2);
      A('#v2r', { opacity: 0, duration: 0.3 }, h - 0.4); fout('#rockWrap', h - 0.3, 0.2); pose('namaste', h - 0.2);
      pop('#v2anj', w[3] - 0.1, 0.5); arm('v2anj', 'R', -70, w[3] + 0.3); rise('heart', 260, 900, w[3] + 0.3, 1, 5, 120, 300);
      pop('#v2vayu', w[5] - 0.1, 0.5); bob('#v2vayu', w[5], 0.5, -14, 2); stream('wind', 800, 470, 560, 900, w[5] + 0.3, 1.3, 8, { d: 0.7 }); stream('leaf', 900, 500, 300, 1000, w[5] + 0.3, 1.4, 10, { d: 0.9 }); pulse('#aura', w[6], 1.05, 1); A('#aura', { opacity: 0.8, duration: 0.3 }, w[5] + 0.4); } };

  // ================= 3 thunder-bodied hero; removes bad thoughts, gives good ones =================
  S[3] = { H: [170, -40, 0.66, 'hero'],
    bg: `${sky('g3', '#4B3F72', '#A889C9')}${bigCloud(260, 380, 0.7, '#6A6390')}${bigCloud(850, 420, 0.6, '#6A6390')}<g id="v3sky" opacity="0">${sky('g3b', '#9EE0FF', '#FFE3A3')}${cloud(220, 420, 0.8)}</g>${hills(1160, '#6E8B5A')}${ground(G, '#8A7A6A')}
      ${[[560, 520], [930, 600], [410, 680]].map(([a, b], i) => P('v3b' + i, a, b, 2.4, ST.SH.bolt, 0)).join('')}
      ${KID('v3kid', 250, gy(0.72), 0.72, { mood: 'sd' })}
      ${P('v3bad', 250, 640, 1, `${bigCloud(0, 0, 0.45, '#3A3346')}<path d="M-60 -10 l20 -20 l20 20 l20 -20 l20 20 l20 -20" stroke="${RD}" stroke-width="7" fill="none"/>`, 0)}
      ${P('v3good', 250, 610, 1, bulb, 0)}`,
    act(t, h, e, w) { gsap.set('#v3sky', { opacity: 0 }); [0, 1, 2].forEach(i => { const at = t + 0.2 + i * 0.6; A('#v3b' + i, { opacity: 1, duration: 0.05 }, at); A('#v3b' + i, { opacity: 0, duration: 0.2 }, at + 0.3); flash(at, 0.5); });
      A('#aura', { opacity: 1, duration: 0.2 }, t + 0.3); pose('roar', t + 0.3); shake(t + 0.4, 8, 12); burst(690, 900, t + 0.8, 10, 'bolt', 260); pose('hero', w[2]);
      fin('#v3sky', h - 0.4, 0.6); fout('#aura', h - 0.3); pop('#v3bad', h - 0.3, 0.4); bob('#v3bad', h, 0.3, -10, 2); wig('#v3kid-head', h, 5, 3, 0.2);
      pose('roar', w[4] - 0.1, 0.25); hm(w[4] - 0.1, { x: -150 }, 0.3); A('#v3bad', { x: -600, y: -500, rotation: -360, transformOrigin: '50% 50%', duration: 0.8, ease: 'power2.in' }, w[4] + 0.1); burst(260, 640, w[4] + 0.1, 8, 'spark', 200);
      pop('#v3good', w[5], 0.5); burst(250, 610, w[5] + 0.2, 8, 'gold', 160); mood('v3kid', 'sm', w[5]); pose('stand', w[6]); hm(w[6], { x: -110 }, 0.4); rise('heart', 380, 900, w[6] + 0.2, 1, 5, 200, 300); } };

  // ================= 4 golden body, fine clothes, earrings, curly hair =================
  S[4] = { H: [0, -40, 0.85, 'hero'],
    bg: `${sky('g4', '#FFE9A8', '#FF9E3D')}${rays(540, 700, 28, '#FFF6D0', 0.45)}<path d="M0 1200 H1080 V1920 H0Z" fill="#C2410C" stroke="${O}" stroke-width="6"/><path d="M60 1200 Q540 1150 1020 1200" stroke="${GD}" stroke-width="10" fill="none"/>
      <rect id="v4gold" x="0" y="0" width="1080" height="1300" fill="#FFD23F" opacity="0"/>`,
    act(t, h, e, w) { A('#aura', { opacity: 1, duration: 0.5 }, t); A('#v4gold', { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 1 }, w[0]); rain('gold', t, 2.2, 18, 200, 880, 1250);
      burst(540, 600, w[1], 10, 'gold', 260); burst(540, 1050, w[2], 8, 'spark', 220); burst(540, 380, w[3], 8, 'spark', 180);
      const [hx, hy] = hp(300, 262); zoomTo(h - 0.4, hx, hy, 1.9, 0.9);
      wig('#earL', w[4], 14, 3, 0.15, '50% 0%'); wig('#earR', w[4], 14, 3, 0.15, '50% 0%'); const [ex1, ey] = hp(186, 322), [ex2] = hp(414, 322); burst(ex1, ey, w[5], 6, 'gold', 90); burst(ex2, ey, w[5], 6, 'gold', 90);
      pulse('#curls', w[6], 1.15, 3, 0.18); const [cx1, cy] = hp(206, 200), [cx2] = hp(394, 200); burst(cx1, cy, w[7], 5, 'spark', 80); burst(cx2, cy, w[7], 5, 'spark', 80); cam(e - 0.3, 1, 0, 0, 0.5); } };

  // ================= 5 mace (vajra) and flag in hands, sacred thread on shoulder =================
  S[5] = { H: [0, -40, 0.82, 'hero'],
    bg: `${sky('g5', '#7FD0FF', '#FFE3A3')}${cloud(180, 420, 0.9)}${cloud(900, 520, 0.7)}${hills(1170, '#7CC26B')}${ground(G, '#4E9F4A')}${P('', 180, 1200, 1, `<rect x="-40" y="-100" width="80" height="100" fill="#9C8B7A" stroke="${O}" stroke-width="6"/>`)}`,
    act(t, h, e, w) { const [gx, gy2] = hp(330, 330); A('#gada', { scale: 1.12, svgOrigin: '420 640', duration: 0.3, yoyo: true, repeat: 3 }, w[0]); burst(gx, gy2, w[1], 8, 'bolt', 170); burst(gx, gy2, w[1] + 0.3, 6, 'gold', 140); flash(w[1], 0.35);
      F('#flagCloth', { skewY: 0 }, { skewY: 14, svgOrigin: '180 305', duration: 0.3, yoyo: true, repeat: 9, ease: 'sine.inOut' }, w[3] - 0.2); speed(w[3] - 0.2, 1.5, -1, 8); stream('leaf', 1100, 500, -100, 700, w[3], 1.6, 8, { d: 1 });
      const [tx1, ty1] = hp(300, 510); zoomTo(h - 0.3, tx1, ty1, 1.6, 0.8); fin('#threadGlow', w[6], 0.3); A('#threadGlow', { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 5 }, w[6] + 0.3);
      stream('gold', ...hp(238, 418), ...hp(352, 600), w[6], 1.3, 9, { d: 0.5 }); cam(e - 0.3, 1, 0, 0, 0.5); } };

  // ================= 6 form of Shiva, son of Kesari; radiant, the world bows =================
  S[6] = { H: [0, -60, 0.6, 'stand'],
    bg: `${sky('g6', '#BFD7FF', '#FFF3E0')}<path d="M-50 900 L180 520 L320 760 L470 480 L640 780 L800 560 L1130 940 V1300 H-50Z" fill="#DCE8F5" stroke="${O}" stroke-width="6"/><path d="M180 520 L220 590 L150 600Z M470 480 L520 560 L420 570Z M800 560 L850 630 L760 640Z" fill="#fff" stroke="${O}" stroke-width="4"/>${ground(G, '#7CC26B', '#4E9F4A')}
      <g id="v6shiva" opacity="0">${P('', 230, 560, 1, `<circle r="230" fill="#E7F1FF" opacity=".8"/>`)}${SHIVA('v6sh', 230, 520, 0.95, { eyes: 'closed' })}</g>
      ${MONKEY('v6kes', 870, gy(0.95), 0.95, '#B8732E', { crown: 'crown', cloth: '#7A2E0B', hold: 'mace', op: 0 })}
      <g id="v6rays" opacity="0">${rays(540, 900, 24, '#FFE9A8', 0.6, 900, 40)}</g>
      <g id="v6crowd">${[...Array(9)].map((_, i) => fig({ id: 'v6p' + i, x: 70 + i * 117, y: 1180 - (i % 2) * 20, s: 0.32, skin: ['#E9B68A', '#C68B59', '#8D5A3B', '#F3C08B'][i % 4], cloth: ['#2E86DE', '#E63946', '#2FA36B', '#FF8C1A', '#9B59B6'][i % 5], top: ['#FFC93C', '#fff', '#FF8FB1'][i % 3], crown: i % 3 ? 'kid' : 'none', female: i % 3 === 1, drape: '#FFC93C' })).join('')}</g>`,
    fg: '',
    act(t, h, e, w) { gsap.set('#v6crowd', { opacity: 0 }); fin('#v6shiva', t, 0.6); pulse('#v6shiva', t + 0.5, 1.04, 2, 0.4); stream('spark', 300, 380, 540, 750, t + 0.6, 1.0, 10, { d: 0.6 }); A('#aura', { opacity: 1, duration: 0.4 }, t + 1.2);
      pop('#v6kes', w[2] - 0.1, 0.5); arm('v6kes', 'L', 90, w[3]); rise('heart', 780, 900, w[3], 1, 5, 120, 300); fout('#v6shiva', h - 0.3, 0.4); go('v6kes', 60, 0, h - 0.3, 0.6);
      fin('#v6rays', w[4], 0.5); pose('open', w[4]); burst(540, 700, w[4], 10, 'gold', 260); fin('#v6crowd', w[5] - 0.4, 0.3);
      for (let i = 0; i < 9; i++) A('#v6p' + i, { rotation: i < 4.5 ? 40 : -40, transformOrigin: '50% 100%', duration: 0.4, ease: 'power2.out' }, w[6] + Math.abs(i - 4) * 0.08); rain('petal', w[6], 1.6, 10); } };

  // ================= 7 learned, wise, clever; eager to do Rama's work =================
  S[7] = { H: [120, -40, 0.62, 'sitnam'],
    bg: `${sky('g7', '#FFF3D6', '#F7C98B')}<rect x="0" y="300" width="1080" height="940" fill="#F6D7A7"/><path d="M60 360 H1020" stroke="#C47A3A" stroke-width="10"/>${[120, 300, 780, 960].map(x => `<rect x="${x - 70}" y="400" width="140" height="260" fill="#A0622D" stroke="${O}" stroke-width="6"/>${[0, 1, 2].map(r => `<rect x="${x - 60}" y="${420 + r * 80}" width="120" height="60" fill="${['#E63946', '#2E86DE', '#2FA36B'][r]}" stroke="${O}" stroke-width="4"/>`).join('')}`).join('')}${ground(G, '#C98E55')}
      <g id="v7orb">${[0, 1, 2, 3, 4].map(i => P('v7b' + i, 660 + Math.cos(i * 1.256) * 300, 830 + Math.sin(i * 1.256) * 200, 0.55, book(['#E63946', '#2E86DE', '#2FA36B', '#9B59B6', '#FF8C1A'][i]), 0)).join('')}</g>
      ${P('v7bulb', 660, 450, 1, bulb, 0)}
      ${RAMA('v7r', 200, gy(1.0), 1.0, { op: 0 })}
      ${P('v7ex', 760, 420, 1, tx('!', 0, 40, 150, '#E63946', 10, 'Luckiest Guy'), 0)}`,
    act(t, h, e, w) { [0, 1, 2, 3, 4].forEach(i => { pop('#v7b' + i, t + i * 0.18, 0.4); bob('#v7b' + i, t + 0.5 + i * 0.1, 0.4, -18, 3); }); eyes(false, t);
      F('#v7orb', { rotation: 0 }, { rotation: 25, svgOrigin: '660 830', duration: 2.4, ease: 'sine.inOut' }, t);
      pop('#v7bulb', w[2], 0.5); burst(660, 450, w[3], 10, 'gold', 180); [0, 1, 2, 3, 4].forEach(i => fout('#v7b' + i, h - 0.3, 0.3)); fout('#v7bulb', h - 0.2);
      pop('#v7r', h - 0.2, 0.5); arm('v7r', 'R', -95, h + 0.2); pose('stand', w[5], 0.25); pose('leap', w[6], 0.3); bob('#hmv', w[6], 0.22, -90, 4, 'power1.out');
      pop('#v7ex', w[6], 0.3); burst(660, 1220, w[6] + 0.2, 6, 'dust', 160); burst(660, 1220, w[7] + 0.1, 6, 'dust', 160); speed(w[7], 1.2, 1, 10, '#C2410C'); } };

  // ================= 8 loves Rama's stories; Rama-Lakshmana-Sita in his heart =================
  S[8] = { H: [170, 30, 0.6, 'sitnam'],
    bg: `${night('g8')}<circle cx="900" cy="420" r="70" fill="#FFF3C4" stroke="${O}" stroke-width="6"/>${tree(140, G, 1.0, '#2F6B3A')}${ground(G, '#3F5D3A')}
      ${SAGE('v8sage', 260, gy(0.85), 0.85, { cloth: '#FF9F43', hold: 'book', sit: true })}
      ${diya(470, 1230, 1.2)}
      ${[['v8s0', `<g transform="scale(.9)"><path d="M-60 -60 Q20 0 -60 60" fill="none" stroke="#A0622D" stroke-width="12"/><line x1="-60" y1="-60" x2="-60" y2="60" stroke="#fff" stroke-width="3"/><line x1="-90" y1="0" x2="50" y2="0" stroke="${O}" stroke-width="6"/><path d="M50 0 l-16 -10 v20z" fill="${O}"/></g>`], ['v8s1', `<path d="M-50 20 Q-40 -30 10 -20 Q40 -40 50 0 Q60 30 20 34 L-40 34Z" fill="#C68B59" stroke="${O}" stroke-width="5"/><path d="M30 -24 l10 -30 l6 30 M40 -20 l20 -24" stroke="${O}" stroke-width="5" fill="none"/>`], ['v8s2', `<path d="M-50 30 L50 30 L40 -20 L20 0 L0 -40 L-20 0 L-40 -20Z" fill="${GD}" stroke="${O}" stroke-width="6"/>`]].map(([id, g], i) => P(id, 300 + i * 120, 600, 1, thought(70, g), 0)).join('')}
      <g id="v8heart" opacity="0">${P('v8hs', 710, 820, 1, `<circle r="250" fill="#FFE9A8" opacity=".6"/>${heartP(3.4, '#FF5C7A')}`)}${RAMA('v8r', 710, 700, 0.42)}${LAKS('v8l', 620, 735, 0.36)}${SITA('v8s', 800, 730, 0.36)}</g>`,
    act(t, h, e, w) { arm('v8sage', 'R', -100, t); wig('#v8sage-head', t, 5, 4, 0.3); ['v8s0', 'v8s1', 'v8s2'].forEach((id, i) => { pop('#' + id, t + 0.2 + i * 0.6, 0.4); bob('#' + id, t + 0.6 + i * 0.6, 0.5, -16, 2); });
      eyes(true, t + 0.3); wig('#hmv', t + 0.4, 4, 4, 0.35); stream('note', 420, 760, 700, 500, t + 0.3, 2.2, 8, { d: 1.2 });
      ['v8s0', 'v8s1', 'v8s2'].forEach(id => fout('#' + id, h - 0.3)); fin('#v8heart', h - 0.2, 0.2); popB('#v8hs', h - 0.2, 0.6); gsap.set(['#v8r', '#v8l', '#v8s'], { opacity: 0 });
      pop('#v8r', w[5], 0.4); pop('#v8l', w[6], 0.4); pop('#v8s', w[7], 0.4); pulse('#v8hs', w[8], 1.06, 3, 0.25); rise('heart', 710, 1000, w[7], 1.4, 7, 300, 500); } };

  // ================= 9 tiny form before Sita; giant form burns Lanka =================
  S[9] = { H: [-60, -470, 0.2, 'stand'],
    bg: `${night('g9')}<circle cx="880" cy="420" r="60" fill="#FFF3C4" stroke="${O}" stroke-width="6"/><rect id="v9org" x="0" y="0" width="1080" height="1300" fill="#FF7A1A" opacity="0"/>
      <g id="v9city" opacity="0">${palace(620, 1130, 1.1)}${palace(860, 1150, 0.9, '#E8A23A')}${palace(380, 1150, 0.85, '#E8A23A')}${palace(1010, 1180, 0.7)}${palace(150, 1180, 0.8)}</g>
      <g id="v9grove">${P('', 470, G, 1, `<rect x="-30" y="-560" width="60" height="560" fill="#7A4A26" stroke="${O}" stroke-width="6"/><path d="M0 -440 Q100 -470 220 -440" stroke="#7A4A26" stroke-width="30" fill="none"/><path d="M0 -440 Q100 -470 220 -440" stroke="${O}" stroke-width="5" fill="none" opacity=".4"/>`)}${P('', 470, 0, 1, `<circle cx="0" cy="620" r="240" fill="#3E8E41" stroke="${O}" stroke-width="7"/><circle cx="-180" cy="720" r="130" fill="#3E8E41" stroke="${O}" stroke-width="6"/><circle cx="200" cy="700" r="150" fill="#3E8E41" stroke="${O}" stroke-width="6"/>${[[-100, 560], [60, 520], [140, 640], [-200, 690], [10, 700], [230, 740]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="16" fill="#FF6B6B" stroke="${O}" stroke-width="3"/>`).join('')}`)}
      ${SITA('v9sita', 300, gy(0.85), 0.85, { mood: 'sd', sit: true, cloth: '#E8A23A', drape: '#FF8FB1' })}</g>
      ${P('v9ring', 700, 820, 1, ringIn, 0)}
      <g id="v9fires" opacity="0">${[[620, 950], [860, 990], [380, 1000], [1010, 1050], [150, 1040], [500, 1150], [760, 1150]].map(([a, b], i) => flame(a, b, 1 + (i % 3) * 0.3, 'v9f' + i, 0)).join('')}</g>`,
    act(t, h, e, w) { gsap.set(['#v9city'], { opacity: 0 }); pulse('#hmv', t, 1.2, 1, 0.2); burst(...hp(300, 500), t, 6, 'spark', 60, 0.5);
      pop('#v9ring', w[2], 0.4); pulse('#v9ring', w[2] + 0.4, 1.3, 2, 0.2); burst(700, 820, w[2] + 0.4, 6, 'gold', 80); go('v9ring', -330, 260, w[3], 0.7, 'power1.inOut'); mood('v9sita', 'sm', w[3] + 0.6); fout('#v9ring', w[3] + 0.9, 0.2);
      rise('heart', 300, 1000, w[3] + 0.6, 0.8, 5, 120, 260);
      fout('#v9grove', h - 0.3, 0.3); fin('#v9city', h - 0.3, 0.4); hm(h - 0.2, { x: 60 / 0.2, y: 470 / 0.2, scale: 5.2 }, 0.6, 'back.out(1.3)'); pose('roar', h); shake(h + 0.3, 10, 16); flash(h + 0.3, 0.4);
      fin('#tailFire', w[6] - 0.3, 0.2); F('#tfIn', { scaleY: 0.85 }, { scaleY: 1.15, svgOrigin: '185 530', duration: 0.15, yoyo: true, repeat: 16 }, w[6] - 0.3); fin('#v9fires', w[6] - 0.3, 0.1);
      [0, 1, 2, 3, 4, 5, 6].forEach(i => popB('#v9f' + i, w[6] + i * 0.15, 0.4)); A('#v9org', { opacity: 0.35, duration: 0.8 }, w[6]); rise('ember', 540, 1150, w[6], 2, 18, 900, 700); rise('smoke', 600, 1000, w[6] + 0.3, 2, 8, 800, 600);
      hm(w[6] + 0.2, { x: -100 / 0.2 }, 0.5); hm(w[7], { x: 260 / 0.2 }, 0.6); } };

  // ================= 10 fearsome form destroys demons; finishes Rama's work =================
  S[10] = { H: [0, -40, 0.85, 'roar'],
    bg: `${sky('g10', '#5B2D74', '#E8875B')}${P('', 540, 1000, 1, palaceIn('#8E5A3B'))}${ground(G, '#8A5A3B')}
      ${[[-150, 1080, 1.2], [-150, 960, 1.0], [1230, 1080, 1.2], [1230, 960, 1.0], [-150, 1180, 0.9]].map(([a, b, s], i) => P('v10d' + i, a, b, s, demonIn(i % 2 ? '#6B3FA0' : '#3A7D5C'))).join('')}
      <g id="v10b" opacity="0">${RAMA('v10r', 840, gy(1.05), 1.05)}${P('v10list', 260, 700, 1, `<rect x="-150" y="-180" width="300" height="360" rx="20" fill="#FFF8E6" stroke="${O}" stroke-width="7"/>${[0, 1, 2].map(i => `<rect x="-110" y="${-120 + i * 110}" width="70" height="70" rx="10" fill="#fff" stroke="${O}" stroke-width="5"/><path d="M-20 ${-86 + i * 110} H110" stroke="#B9A27A" stroke-width="10" stroke-linecap="round"/>`).join('')}${[0, 1, 2].map(i => `<g id="v10c${i}" opacity="0"><path d="M-104 ${-90 + i * 110} L-80 ${-62 + i * 110} L-40 ${-130 + i * 110}" stroke="#2FA36B" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`).join('')}`)}</g>`,
    act(t, h, e, w) { gsap.set('#v10b', { opacity: 0 }); A('#aura', { opacity: 0.8, duration: 0.3 }, t); rings(540, 700, t, 2, '#FFB3B3');
      [0, 1, 2, 3, 4].forEach(i => { const L = i < 2 || i === 4; go('v10d' + i, L ? 400 - (i === 4 ? 50 : 0) : -420, 0, t + 0.2 + i * 0.15, 0.9, 'power1.in'); bob('#v10d' + i, t + 0.2, 0.15, -20, 4); });
      hm(w[3] - 0.2, { x: -40, rotation: -8 }, 0.15); hm(w[3] - 0.05, { x: 40, rotation: 8 }, 0.15); hm(w[3] + 0.2, { x: 0, rotation: 0 }, 0.3); shake(w[3], 8, 16); flash(w[3], 0.5);
      [0, 1, 2, 3, 4].forEach(i => { const L = i < 2 || i === 4; tl.to('#v10d' + i, { x: (L ? -700 : 700) / 1.1, y: -900, rotation: L ? -540 : 540, transformOrigin: '50% 50%', duration: 1.0, ease: 'power2.in' }, w[3] + 0.05 + i * 0.06); }); burst(540, 1000, w[3], 12, 'star5', 380);
      fout('#aura', h - 0.3); hm(h - 0.3, { x: -250, scale: 0.75 }, 0.5); pose('kneel', h - 0.2); fin('#v10b', h - 0.3, 0.4);
      [0, 1, 2].forEach(i => { pop('#v10c' + i, w[5] + i * 0.4, 0.3); burst(180, 590 + i * 110, w[5] + i * 0.4, 5, 'gold', 80); }); arm('v10r', 'R', -120, w[7]); rain('petal', w[7], 1.2, 8); } };

  // ================= 11 Sanjeevani revives Lakshmana; Rama hugs Hanuman =================
  S[11] = { H: [170, -40, 0.62, 'lift'],
    bg: `${night('g11')}<rect id="v11dawn" x="0" y="0" width="1080" height="1300" fill="#FFB36B" opacity="0"/><circle cx="160" cy="400" r="60" fill="#FFF3C4" stroke="${O}" stroke-width="6"/>${hills(1150, '#3F5D3A')}${ground(G, '#5C4A3A')}
      ${LAKS('v11l', 330, 1170, 0.7, { eyes: 'closed', mood: 'sd' })}
      ${RAMA('v11r', 150, gy(0.85), 0.85, { mood: 'sd' })}`,
    act(t, h, e, w) { gsap.set('#v11l', { rotation: -90, transformOrigin: '50% 100%' }); gsap.set('#v11dawn', { opacity: 0 });
      gsap.set('#mtnRot', { rotation: 195, scale: 1.6, svgOrigin: '0 0' }); fin('#mtnWrap', t - 0.3, 0.1); hm(t - 0.3, { x: 400, y: -800 }, 0.01); hm(t - 0.25, { x: 0, y: 0 }, 1.2, 'power2.out'); speed(t - 0.3, 1.2, -1, 10); rain('drop', t - 0.3, 1.2, 6, 60, 300, 1100);
      F('#mtn .herb', { scale: 0.7 }, { scale: 1.4, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 15, stagger: 0.04 }, w[1]);
      stream('green', 640, 620, 340, 1080, w[1], 1.4, 16, { d: 0.6 }); A('#v11l', { rotation: 0, duration: 0.7, ease: 'back.out(1.5)' }, w[3]); A('#v11l-eo', { opacity: 1, duration: 0.1 }, w[3]); A('#v11l-ec', { opacity: 0, duration: 0.1 }, w[3]); mood('v11l', 'sm', w[3]); burst(340, 900, w[3] + 0.3, 10, 'green', 200);
      A('#v11dawn', { opacity: 0.35, duration: 1.2 }, w[3]); fout('#mtnWrap', h - 0.2); pose('open', h - 0.2);
      mood('v11r', 'sm', w[4]); go('v11r', 330, 0, w[5], 0.6); arm('v11r', 'R', -70, w[5] + 0.4); arm('v11r', 'L', 70, w[5] + 0.4); burst(640, 900, w[6], 10, 'heart', 260); rise('heart', 600, 1000, w[7], 1.2, 8, 300, 500); } };

  // ================= 12 Rama praises: as dear to me as brother Bharata =================
  S[12] = { H: [260, -40, 0.58, 'kneel'],
    bg: `${court('g12')}${RAMA('v12r', 560, gy(1.05), 1.05)}
      ${fig({ id: 'v12b', x: 230, y: gy(0.95), s: 0.95, skin: '#5B8DEF', cloth: '#2FA36B', crown: 'mukut', op: 0, extra: `<g transform="translate(0 -200)"><path d="M-50 0 Q-30 -30 -10 0 Z M10 0 Q30 -30 50 0Z" fill="#A0622D" stroke="${O}" stroke-width="5"/></g>` })}
      <g id="v12eq" opacity="0">${P('v12h1', 230, 470, 1, heartP(0.9))}${P('v12h2', 820, 470, 1, heartP(0.9))}${P('v12sign', 525, 470, 1, `<rect x="-50" y="-30" width="100" height="22" rx="8" fill="#fff" stroke="${O}" stroke-width="6"/><rect x="-50" y="12" width="100" height="22" rx="8" fill="#fff" stroke="${O}" stroke-width="6"/>`)}</g>`,
    act(t, h, e, w) { gsap.set('#v12eq', { opacity: 0 }); arm('v12r', 'R', -120, t); arm('v12r', 'L', 40, t); rain('marigold', t + 0.2, 2, 14, 600, 1050); burst(800, 900, w[2], 10, 'star5', 220); burst(800, 900, w[3], 8, 'gold', 200);
      pop('#v12b', h - 0.2, 0.5); arm('v12r', 'R', -70, h); arm('v12r', 'L', 70, h); hm(h - 0.2, { x: 0 }, 0.3);
      fin('#v12eq', w[6] - 0.1, 0.1); pop('#v12h1', w[6], 0.4); pop('#v12h2', w[7], 0.4); pop('#v12sign', w[8], 0.4); pulse('#v12eq', w[9], 1.08, 2, 0.25); stream('heart', 560, 700, 230, 520, w[6], 1, 5); stream('heart', 560, 700, 820, 520, w[7], 1, 5); } };

  // ================= 13 thousand-headed Shesha sings your fame; Rama embraces you =================
  S[13] = { H: [340, -40, 0.6, 'namaste'],
    bg: `${sky('g13', '#2B1E6B', '#4FB0E6')}${wavesP(1100, '#2E9BD6')}
      <g id="v13sesh"><path d="M120 1260 Q460 1120 330 950 Q230 840 330 760" fill="none" stroke="${O}" stroke-width="124" stroke-linecap="round"/><path d="M120 1260 Q460 1120 330 950 Q230 840 330 760" fill="none" stroke="#3FA34D" stroke-width="104" stroke-linecap="round"/><path d="M120 1260 Q460 1120 330 950 Q230 840 330 760" fill="none" stroke="#B5E08A" stroke-width="36" stroke-linecap="round" stroke-dasharray="30 26"/>${[...Array(7)].map((_, i) => { const a = (i - 3) * 0.42, x = 330 + Math.sin(a) * 250, y = 800 - Math.cos(a) * 200; return P('v13h' + i, x, y, 0.9, `<path d="M-50 60 Q-70 -60 0 -70 Q70 -60 50 60Z" fill="#5BBF5A" stroke="${O}" stroke-width="6"/><path d="M-26 20 Q0 -40 26 20Z" fill="#FFE066" stroke="${O}" stroke-width="4"/><circle cx="-18" cy="-20" r="7" fill="${O}"/><circle cx="18" cy="-20" r="7" fill="${O}"/><ellipse id="v13m${i}" cx="0" cy="10" rx="12" ry="5" fill="#7A2E0B"/>`, 0); }).join('')}</g>
      ${RAMA('v13r', 1250, gy(1.0), 1.0)}`,
    fg: `${wavesP(1200, '#1F7FC0')}`,
    act(t, h, e, w) { for (let i = 0; i < 7; i++) { pop('#v13h' + i, t + Math.abs(i - 3) * 0.22, 0.4); F('#v13m' + i, { scaleY: 0.4 }, { scaleY: 2, transformOrigin: '50% 50%', duration: 0.18, yoyo: true, repeat: 9 }, t + 0.6 + i * 0.03); }
      wig('#v13sesh', t + 0.5, 2, 4, 0.35); stream('note', 330, 640, 640, 380, t + 0.6, 2.2, 10, { d: 1.2 }); stream('note', 200, 700, 80, 380, t + 0.8, 2, 6, { d: 1.2 }); burst(760, 640, w[3], 8, 'gold', 180);
      go('v13r', -640, 0, h, 0.6); arm('v13r', 'R', -70, w[7]); arm('v13r', 'L', 70, w[7]); pose('open', w[7]); burst(640, 760, w[8], 10, 'heart', 260); rise('heart', 640, 1000, w[8], 1.2, 7, 300, 500); } };

  // ================= 14 Sanaka sages, Brahma, munis, Narada, Saraswati, Shesha praise =================
  S[14] = { H: [0, -150, 0.5, 'namaste'],
    bg: `${heaven('g14')}${P('', 540, 1120, 1.4, `<ellipse rx="160" ry="30" fill="#fff" stroke="${O}" stroke-width="5"/>`)}
      ${[0, 1, 2, 3].map(i => KID('v14k' + i, 70 + i * 95, 560 + (i % 2) * 30, 0.38, { top: '#FFE08A', cloth: '#FF9F43', crown: 'jata', op: 0 })).join('')}
      ${fig({ id: 'v14br', x: 860, y: 440, s: 0.55, skin: '#F28C5B', cloth: '#FFF1C1', top: '#E63946', crown: 'crown', heads4: true, beard: '#fff', hold: 'book', op: 0 })}
      ${SAGE('v14n', 170, gy(0.62) - 40, 0.62, { cloth: '#FFB703', crown: 'jata', beard: null, hold: 'mala', op: 0, extra: `<g transform="translate(-70 120) rotate(-20)"><rect x="-8" y="-200" width="16" height="260" fill="#A0622D" stroke="${O}" stroke-width="5"/><circle cx="0" cy="70" r="46" fill="#C47A3A" stroke="${O}" stroke-width="6"/></g>` })}
      ${SITA('v14sa', 910, gy(0.62) - 40, 0.62, { cloth: '#fff', drape: '#FFC93C', crown: 'mukut', op: 0, extra: `<g transform="translate(0 150) rotate(-25)"><rect x="-150" y="-8" width="300" height="16" fill="#A0622D" stroke="${O}" stroke-width="5"/><circle cx="-150" cy="10" r="40" fill="#C47A3A" stroke="${O}" stroke-width="6"/><circle cx="150" cy="10" r="34" fill="#C47A3A" stroke="${O}" stroke-width="6"/></g>` })}
      ${P('v14sesh', 540, 1260, 1, `<path d="M-300 0 Q-150 -90 0 -20 Q150 50 300 -40" fill="none" stroke="${O}" stroke-width="44" stroke-linecap="round"/><path d="M-300 0 Q-150 -90 0 -20 Q150 50 300 -40" fill="none" stroke="#5BBF5A" stroke-width="30" stroke-linecap="round"/>${[-1, 0, 1].map(d => `<g transform="translate(${300 + d * 50} ${-80 - Math.abs(d) * -10})"><path d="M-36 40 Q-50 -40 0 -46 Q50 -40 36 40Z" fill="#5BBF5A" stroke="${O}" stroke-width="5"/><circle cx="-12" cy="-10" r="5" fill="${O}"/><circle cx="12" cy="-10" r="5" fill="${O}"/></g>`).join('')}`, 0)}`,
    act(t, h, e, w) { A('#aura', { opacity: 0.8, duration: 0.4 }, t); [0, 1, 2, 3].forEach(i => { pop('#v14k' + i, w[0] + i * 0.12, 0.4); arm('v14k' + i, 'R', -40, w[0] + 0.5); arm('v14k' + i, 'L', 40, w[0] + 0.5); }); stream('petal', 250, 600, 520, 760, w[0] + 0.4, 1, 5);
      pop('#v14br', w[1], 0.5); arm('v14br', 'L', 110, w[1] + 0.4); stream('gold', 860, 500, 560, 760, w[1] + 0.4, 0.9, 6); burst(540, 640, w[2], 10, 'spark', 260);
      [0, 1, 2, 3].forEach(i => fout('#v14k' + i, h - 0.3, 0.3)); fout('#v14br', h - 0.3, 0.3);
      pop('#v14n', w[3], 0.5); go('v14n', 0, -30, w[3], 0.6); stream('note', 170, 900, 500, 500, w[3] + 0.3, 1.8, 8, { d: 1 }); pop('#v14sa', w[4], 0.5); stream('note', 910, 900, 600, 500, w[4] + 0.3, 1.6, 8, { d: 1 });
      pop('#v14sesh', w[6], 0.5); bob('#v14sesh', w[6] + 0.3, 0.3, -12, 2); rain('petal', w[5], 1.6, 10); } };

  // ================= 15 Yama, Kubera, guardians, poets cannot describe your glory =================
  S[15] = { H: [0, -60, 0.5, 'stand'],
    bg: `${sky('g15', '#3A2A6B', '#C06C9E')}${stars([[90, 320], [980, 360], [300, 420], [760, 330]], 14)}${ground(G, '#6B4E8A')}
      ${fig({ id: 'v15y', x: 180, y: gy(0.8), s: 0.8, skin: '#3F6B5C', cloth: '#E63946', crown: 'horns', hold: 'noose', mood: 'sm', op: 0 })}
      ${fig({ id: 'v15k', x: 900, y: gy(0.8), s: 0.8, skin: '#F2C27A', cloth: '#2E86DE', top: '#FFC93C', crown: 'crown', belly: true, hold: 'pot', op: 0 })}
      <g id="v15dik" opacity="0">${P('v15ring', 540, 600, 1, `<circle r="250" fill="none" stroke="#FFE9A8" stroke-width="8" stroke-dasharray="20 18"/>${[...Array(8)].map((_, i) => `<g transform="rotate(${i * 45}) translate(0 -250) rotate(${-i * 45})"><circle r="40" fill="#F3C08B" stroke="${O}" stroke-width="5"/><path d="M-30 -30 L30 -30 L24 -56 L12 -44 L0 -66 L-12 -44 L-24 -56Z" fill="${GD}" stroke="${O}" stroke-width="4"/><circle cx="-12" cy="-4" r="5" fill="${O}"/><circle cx="12" cy="-4" r="5" fill="${O}"/><path d="M-10 14 q10 8 20 0" stroke="${O}" stroke-width="4" fill="none"/></g>`).join('')}`)}</g>
      <g id="v15poet" opacity="0">${SAGE('v15p', 250, gy(0.75), 0.75, { cloth: '#fff', top: '#2E86DE', hold: 'quill', sit: true, crown: 'jata', beard: '#ddd' })}${P('v15scroll', 360, 1150, 1, `<rect x="0" y="-40" width="700" height="80" fill="#FFF1C1" stroke="${O}" stroke-width="6"/>${[...Array(12)].map((_, i) => `<path d="M${20 + i * 56} -14 h40 M${20 + i * 56} 10 h30" stroke="#7A2E0B" stroke-width="5"/>`).join('')}`)}${P('v15q', 220, 700, 1, tx('?', 0, 0, 110, '#FFD23F', 9, 'Luckiest Guy'), 0)}</g>`,
    act(t, h, e, w) { gsap.set('#v15scroll', { scaleX: 0, transformOrigin: '0% 50%' }); gsap.set(['#v15poet', '#v15dik'], { opacity: 0 }); A('#aura', { opacity: 1, duration: 0.4 }, t);
      pop('#v15y', w[0], 0.5); arm('v15y', 'L', 60, w[0] + 0.4); pop('#v15k', w[1], 0.5); rise('coin', 900, 900, w[1] + 0.3, 1, 6, 120, 300); fin('#v15dik', w[2], 0.4); spin('#v15ring', w[2], 2.5, 90);
      ['v15y', 'v15k'].forEach(id => fout('#' + id, h - 0.3)); fout('#v15dik', h - 0.3); hm(h - 0.3, { x: 160, y: -260, scale: 0.8 }, 0.5);
      fin('#v15poet', h - 0.2, 0.3); A('#v15scroll', { scaleX: 1, duration: 1.5, ease: 'power1.inOut' }, w[5]); F('#v15p-aR', { rotation: -20 }, { rotation: 10, svgOrigin: '56 60', duration: 0.12, yoyo: true, repeat: 11 }, w[5]);
      A('#v15scroll', { x: -500, duration: 1, ease: 'none' }, w[7]); pop('#v15q', w[8], 0.4); wig('#v15p-head', w[8], 8, 3, 0.15); mood('v15p', 'sd', w[8]); part('drop', w[9], 0.7, 300, 780, 300, 860); } };

  // ================= 16 helped Sugriva meet Rama and become king =================
  S[16] = { H: [-330, -40, 0.55, 'stand'],
    bg: `${sky('g16', '#A8E6CF', '#FFF6D8')}<path d="M620 1240 Q760 760 980 700 Q1100 720 1120 1240Z" fill="#9C8B7A" stroke="${O}" stroke-width="6"/>${ground(G, '#88C070')}${tree(120, G, 0.7)}
      <g id="v16th" opacity="0">${P('', 760, 1150, 1, `<rect x="-110" y="-160" width="220" height="230" rx="30" fill="${RD}" stroke="${O}" stroke-width="7"/><rect x="-140" y="40" width="280" height="40" rx="14" fill="${GD}" stroke="${O}" stroke-width="7"/>`)}${[560, 960].map(x => P('', x, 1240, 1, `<line x1="0" y1="0" x2="0" y2="-280" stroke="${O}" stroke-width="10"/><path d="M0 -280 L90 -250 L0 -210Z" fill="${SF}" stroke="${O}" stroke-width="5"/>`)).join('')}</g>
      ${MONKEY('v16s', 880, 1240 - 310 * 0.75 - 280, 0.75, '#8E8A86', { cloth: '#2E86DE', mood: 'sd' })}
      ${P('v16rock', 820, 960, 1.4, `<path d="M-120 0 Q-130 -80 -60 -110 Q0 -150 70 -100 Q130 -70 120 0Z" fill="#7E6E5E" stroke="${O}" stroke-width="6"/>`)}
      ${RAMA('v16r', -150, gy(0.85), 0.85)}
      ${P('v16cr', 300, 400, 1, `<path d="M-60 30 L60 30 L52 -20 L28 0 L0 -44 L-28 0 L-52 -20Z" fill="${GD}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="-6" r="10" fill="${RD}" stroke="${O}" stroke-width="3"/>`, 0)}`,
    act(t, h, e, w) { wig('#v16s', t, 3, 5, 0.12); hm(t, { x: 220 }, 1.2); arm('v16s', 'L', 60, w[2]); pose('point', w[2]); hm(w[3], { x: 0 }, 0.5);
      fout('#v16rock', h - 0.3, 0.4); go('v16r', 550, 0, h - 0.3, 1.0); go('v16s', -120, 280, h - 0.2, 0.8); mood('v16s', 'sm', h + 0.4); arm('v16r', 'R', -60, w[5]); arm('v16s', 'L', 60, w[5]); burst(480, 950, w[5] + 0.2, 8, 'heart', 150);
      fin('#v16th', w[6] - 0.2, 0.4); pop('#v16cr', w[6], 0.3); go('v16cr', 460, 520, w[6] + 0.2, 0.7, 'power2.inOut'); burst(760, 1000, w[7], 12, 'gold', 220); pulse('#v16th', w[7] + 0.2, 1.04, 2, 0.2); rain('conf', w[7], 1, 8, 600, 1060); rain('conf2', w[7], 1, 8, 600, 1060); } };

  // ================= 17 Vibhishana heeded your advice, became king of Lanka =================
  S[17] = { H: [180, -40, 0.6, 'stand'],
    bg: `${night('g17')}<g id="v17glow" opacity="0">${rays(540, 700, 20, '#FFE9A8', 0.4)}</g>${P('v17pal', 540, 1000, 1.3, palaceIn('#8E5A3B'))}${ground(G, '#3F5D3A')}
      ${fig({ id: 'v17v', x: 260, y: gy(0.95), s: 0.95, skin: '#7B5EA7', cloth: '#FFF1C1', top: '#E8A23A', crown: 'none', hold: 'mala' })}
      ${P('v17bub', 560, 640, 1, bubble(220, 120, `${tx('రామ', 0, 22, 70, RD, 6)}`, 'bl'), 0)}
      ${P('v17cr', 700, 420, 1, `<path d="M-60 30 L60 30 L52 -20 L28 0 L0 -44 L-28 0 L-52 -20Z" fill="${GD}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><circle cx="0" cy="-6" r="10" fill="#2EC4B6" stroke="${O}" stroke-width="3"/>`, 0)}
      <g id="v17birds">${[...Array(8)].map((_, i) => P('v17bd' + i, 540, 600, 1, birdIn(), 0)).join('')}</g>`,
    act(t, h, e, w) { gsap.set('#v17glow', { opacity: 0 }); pose('point', t); pop('#v17bub', w[0], 0.4); stream('ram', 640, 760, 330, 680, w[1], 1.2, 5, { d: 0.6, s0: 0.6, s1: 0.8 });
      fout('#v17bub', w[3]); A('#v17v-head', { rotation: 8, transformOrigin: '50% 100%', duration: 0.2, yoyo: true, repeat: 3 }, w[3]); arm('v17v', 'R', -40, w[3]); arm('v17v', 'L', 40, w[3]); pose('stand', w[3]);
      fin('#v17glow', h - 0.2, 0.5); pop('#v17cr', h - 0.2, 0.3); go('v17cr', -440, 320, h + 0.1, 0.7); burst(260, 740, w[5], 10, 'gold', 200); pulse('#v17pal', w[5], 1.05, 2);
      [...Array(8)].forEach((_, i) => { const a = i / 8 * 6.283; A('#v17bd' + i, { opacity: 1, duration: 0.1 }, w[6] + i * 0.05); go('v17bd' + i, Math.cos(a) * 700, Math.sin(a) * 500 - 200, w[6] + i * 0.05, 1.4, 'power1.in'); });
      rain('conf', w[7], 1, 8); rain('conf2', w[7], 1, 8); } };

  // ================= 18 baby Hanuman thought the far sun was a sweet fruit and swallowed it =================
  S[18] = { H: [-330, -40, 0.32, 'stand'],
    bg: `${sky('g18', '#FF9E3D', '#FFE2A8')}<rect id="v18dark" x="0" y="0" width="1080" height="1300" fill="#120B33" opacity="0"/><g id="v18stars" opacity="0">${stars([[120, 400], [300, 520], [700, 380], [960, 500], [520, 300], [860, 700], [200, 760]], 16)}</g>${cloud(220, 900, 0.8)}${cloud(860, 1000, 0.7)}${ground(G, '#7CC26B')}${P('', 120, 1180, 0.7, `<path d="M-80 0 V-80 L0 -140 L80 -80 V0Z" fill="#F2B33D" stroke="${O}" stroke-width="7"/>`)}
      ${P('v18sun', 830, 440, 0.8, sunFace)}${P('v18mango', 830, 440, 2.2, mango, 0)}
      <path id="v18dots" d="M240 1060 Q400 500 760 470" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="4 26" stroke-linecap="round" opacity="0"/>
      ${P('v18th', 360, 760, 1, thought(80, `<g transform="scale(.8)">${mango}</g>`), 0)}`,
    act(t, h, e, w) { gsap.set(['#v18dark', '#v18stars'], { opacity: 0 }); fin('#v18dots', t, 0.4); F('#v18dots', { attr: { 'stroke-dashoffset': 0 } }, { attr: { 'stroke-dashoffset': -300 }, duration: 2.5, ease: 'none' }, t);
      wig('#hmv', t, 4, 3, 0.3); pulse('#v18sun', w[2], 1.08, 3, 0.3);
      pop('#v18th', w[4] - 0.2, 0.4); fout('#v18dots', h - 0.3); fout('#v18sun', w[5], 0.3); fin('#v18mango', w[5], 0.3); pulse('#v18mango', w[5] + 0.3, 1.1, 2, 0.2); fout('#v18th', w[6]);
      pose('leap', w[6] - 0.1, 0.3); hm(w[6], { x: 1900, y: -1450, scale: 1.8 }, 1.1, 'power1.inOut'); speed(w[6], 1.2, -1, 10);
      A('#v18mango', { scale: 0.05, x: -40, y: 60, duration: 0.5, ease: 'power2.in' }, w[8] + 0.1); fin('#cheeks', w[8] + 0.55, 0.1); A('#v18mango', { opacity: 0, duration: 0.1 }, w[8] + 0.55);
      pose('stand', w[8] + 0.5, 0.3); A('#v18dark', { opacity: 0.75, duration: 0.6 }, w[8] + 0.5); fin('#v18stars', w[8] + 0.6, 0.5); burst(...hp(300, 330), w[9], 6, 'gold', 120); } };

  // ================= 19 Rama's ring in mouth, crossed the ocean =================
  S[19] = { H: [80, -150, 0.5, 'stand'],
    bg: `${sky('g19', '#7ED6FF', '#E2F6FF')}${cloud(200, 400, 0.8)}${cloud(860, 460, 0.7)}<g id="v19isl" opacity="0">${P('', 980, 1050, 1, `<path d="M-160 40 Q-80 -90 0 -60 Q80 -100 160 40Z" fill="#7CC26B" stroke="${O}" stroke-width="6"/>${palaceIn('#E8A23A')}`)}</g>
      ${P('', 180, 1150, 1, `<path d="M-260 100 Q-120 -40 120 -20 Q260 0 300 100Z" fill="#F2D49B" stroke="${O}" stroke-width="6"/>`)}
      ${RAMA('v19r', 180, 1110 - 310 * 0.8, 0.8)}
      ${P('v19ring', 260, 900, 1, ringIn, 0)}
      ${wavesP(1100, '#2E9BD6')}${[...Array(4)].map((_, i) => P('v19f' + i, 300 + i * 180, 1200, 1, fishIn(['#FF8C42', '#FFD23F', '#FF5C7A', '#2EC4B6'][i]), 0)).join('')}`,
    fg: `${wavesP(1180, '#1F7FC0')}${wavesP(1250, '#176AA6')}`,
    act(t, h, e, w) { gsap.set('#v19isl', { opacity: 0 }); arm('v19r', 'R', -80, w[0]); pop('#v19ring', w[1], 0.4); pulse('#v19ring', w[1] + 0.3, 1.25, 2, 0.15); const [mx, my] = hp(300, 330); go('v19ring', mx - 260, my - 900, w[3] - 0.2, 0.6, 'power2.inOut'); A('#v19ring', { scale: 0.3, duration: 0.6 }, w[3] - 0.2); fout('#v19ring', w[3] + 0.4, 0.1); fin('#ring', w[3] + 0.4, 0.1);
      fin('#v19isl', h - 0.4, 0.4); pose('leap', h - 0.3, 0.3); hm(h - 0.2, { x: 700, y: -300 }, 0.9, 'power1.out'); hm(h + 0.7, { x: 1000, y: -40 }, 0.8, 'power1.in'); cam(h - 0.2, 1.15, -80, 0, 1.6); speed(h - 0.2, 1.5, -1, 12);
      [0, 1, 2, 3].forEach(i => F('#v19f' + i, { opacity: 1, y: 0, rotation: -30 }, { y: -160, rotation: 30, transformOrigin: '50% 50%', duration: 0.35, yoyo: true, repeat: 1, ease: 'power1.out' }, h + i * 0.35));
      burst(...[1000, 1000], w[8], 10, 'star5', 220); pose('hero', w[8], 0.4); } };

  // ================= 20 every hard task becomes easy with your grace =================
  S[20] = { H: [330, -700, 0.35, 'stand'], hide: true,
    bg: `${sky('g20', '#9EE0FF', '#FFF3D6')}<g id="v20slope"><path d="M-40 1240 L1120 640 V1300 H-40Z" fill="#9C8B7A" stroke="${O}" stroke-width="7"/>${[...Array(6)].map((_, i) => `<path d="M${120 + i * 160} ${1180 - i * 82} l20 -30 l14 30 l20 -30" stroke="${O}" stroke-width="5" fill="none"/>`).join('')}</g>
      <g id="v20stairs" opacity="0"><path d="M-40 1240 ${[...Array(8)].map((_, i) => `H${100 + i * 130} V${1240 - (i + 1) * 75}`).join(' ')} H1120 V1300 H-40Z" fill="#F2D49B" stroke="${O}" stroke-width="7"/></g>
      ${P('v20gate', 960, 700, 1, `<rect x="-90" y="-180" width="180" height="200" fill="#7A2E0B" stroke="${O}" stroke-width="7"/><rect x="-24" y="-90" width="48" height="50" rx="8" fill="${GD}" stroke="${O}" stroke-width="5"/><path d="M-14 -90 V-110 Q0 -130 14 -110 V-90" stroke="${O}" stroke-width="7" fill="none"/>`)}
      <g id="v20pair">${P('v20rock', 430, 1000, 1.3, boulderS())}${KID('v20k', 270, 1050 - 310 * 0.6 + 40, 0.6, { mood: 'sd' })}</g>`,
    act(t, h, e, w) { gsap.set('#v20stairs', { opacity: 0 }); gsap.set('#v20k', { rotation: 25, transformOrigin: '50% 100%' });
      arm('v20k', 'R', -70, t); arm('v20k', 'L', -50, t); F('#v20pair', { x: 0, y: 0 }, { x: 30, y: -15, duration: 0.35, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t); rise('drop', 270, 820, t + 0.5, 1.6, 6, 60, 80);
      A('#hero', { opacity: 1, duration: 0.3 }, h - 0.3); A('#aura', { opacity: 1, duration: 0.3 }, h - 0.2); stream('gold', 900, 380, 430, 960, h, 0.9, 10);
      A('#v20rock', { scale: 0.25, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.in(1.5)' }, w[6]); burst(430, 960, w[6] + 0.4, 8, 'spark', 160); fout('#v20slope', w[6] + 0.2, 0.4); fin('#v20stairs', w[6] + 0.2, 0.4);
      A('#v20k', { rotation: 0, duration: 0.3 }, w[7]); mood('v20k', 'sm', w[7]); go('v20pair', 520, -320, w[7], 1.3, 'power1.inOut'); A('#v20gate', { scaleX: 0.1, transformOrigin: '0% 50%', duration: 0.4 }, w[8]); burst(960, 620, w[8] + 0.3, 8, 'gold', 180); } };

  // ================= 21 you guard Rama's door; no entry without permission =================
  S[21] = { H: [-280, -40, 0.62, 'guard'],
    bg: `${sky('g21', '#FFD9A0', '#F7A65A')}${P('', 640, 1240, 1, `<rect x="-300" y="-880" width="600" height="880" fill="#E8A23A" stroke="${O}" stroke-width="8"/><path d="M-330 -870 L330 -870 L300 -950 L-300 -950Z" fill="${RD}" stroke="${O}" stroke-width="7"/>${tx('శ్రీరామ', 0, -780, 80, RD, 4)}<path d="M-190 0 V-480 Q0 -680 190 -480 V0Z" fill="#FFF3B0" stroke="${O}" stroke-width="7"/>`)}
      <g id="v21in">${RAMA('v21r', 640, 1240 - 310 * 0.7, 0.7)}${rays(640, 1000, 16, '#fff', 0.5, 300, 30)}</g>
      ${P('v21dl', 455, 1240, 1, `<path d="M0 0 V-560 Q90 -640 185 -650 V0Z" fill="#7A2E0B" stroke="${O}" stroke-width="6"/><circle cx="150" cy="-300" r="14" fill="${GD}" stroke="${O}" stroke-width="4"/>`)}${P('v21dr', 825, 1240, 1, `<path d="M0 0 V-560 Q-90 -640 -185 -650 V0Z" fill="#7A2E0B" stroke="${O}" stroke-width="6"/><circle cx="-150" cy="-300" r="14" fill="${GD}" stroke="${O}" stroke-width="4"/>`)}
      ${[[290, 700], [990, 700]].map(([a, b], i) => P('', a, b, 1, `<rect x="-14" y="0" width="28" height="140" fill="#7A4A26" stroke="${O}" stroke-width="5"/>`) + flame(a, b, 0.6)).join('')}
      ${KID('v21k', 1200, gy(0.6), 0.6, { top: '#2E86DE' })}
      ${P('v21stop', 300, 560, 1, `<circle r="70" fill="${RD}" stroke="${O}" stroke-width="7"/><path d="M-26 30 V-24 M-10 30 V-40 M6 30 V-40 M22 30 V-28 M-30 30 Q0 50 30 30" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"/>`, 0)}
      ${P('v21ok', 300, 560, 1, check, 0)}`,
    act(t, h, e, w) { burst(...hp(420, 380), w[0], 6, 'gold', 100); A('#gada', { rotation: 10, svgOrigin: '420 640', duration: 0.3, yoyo: true, repeat: 3 }, w[2]); rings(640, 800, w[3], 2, '#FFF3B0', 400);
      go('v21k', -350, 0, h - 0.6, 1, 'power1.out'); pose('point', w[4]); pop('#v21stop', w[4], 0.4); go('v21k', -350, 0, w[4], 0.1); wig('#v21k-head', w[5], 6, 2, 0.15);
      fout('#v21stop', w[6]); pop('#v21ok', w[6], 0.4); A('#head', { rotation: 6, svgOrigin: '300 385', duration: 0.2, yoyo: true, repeat: 1 }, w[6]);
      A('#v21dl', { scaleX: 0.1, transformOrigin: '0% 50%', duration: 0.5 }, w[7]); A('#v21dr', { scaleX: 0.1, transformOrigin: '100% 50%', duration: 0.5 }, w[7]); burst(640, 900, w[7] + 0.3, 10, 'gold', 250); go('v21k', -540, 0, w[8], 0.8); fout('#v21ok', w[8]); } };

  // ================= 22 joy in your refuge; with you protecting, no fear =================
  S[22] = { H: [-120, -40, 0.6, 'open'],
    bg: `${sky('g22', '#BDE8FF', '#FFF3D6')}<g id="v22storm" opacity="0">${sky('g22b', '#4B4F6B', '#8A8FA8')}</g>${hills(1160, '#7CC26B')}${ground(G, '#4E9F4A')}
      <g id="v22dome" opacity="0">${P('', 380, 1240, 1, `<path d="M-330 0 Q-330 -560 0 -560 Q330 -560 330 0Z" fill="#FFF3B0" opacity=".35" stroke="#FFD23F" stroke-width="10"/>`)}</g>
      ${KID('v22a', 170, gy(0.5), 0.5, { top: '#E63946' })}${KID('v22b', 600, gy(0.5), 0.5, { top: '#2FA36B', female: true, cloth: '#9B59B6', drape: '#FFC93C', crown: 'none' })}${KID('v22c', 300, gy(0.42), 0.42, { top: '#2E86DE' })}
      ${P('v22wolf', 1300, 1150, 1, wolfIn)}`,
    act(t, h, e, w) { gsap.set('#v22storm', { opacity: 0 }); fin('#v22dome', t, 0.5); ['v22a', 'v22b', 'v22c'].forEach((k, i) => { arm(k, 'R', -130, t + 0.3 + i * 0.15); arm(k, 'L', 130, t + 0.3 + i * 0.15); bob('#' + k, t + 0.3 + i * 0.1, 0.25, -24, 4); }); rise('heart', 380, 1100, t + 0.4, 2, 8, 500, 400); rain('petal', t, 2, 8, 80, 700);
      fin('#v22storm', h - 0.3, 0.4); flash(h, 0.3); go('v22wolf', -460, 0, h, 0.7, 'power1.in'); ['v22a', 'v22b', 'v22c'].forEach(k => { mood(k, 'op', h + 0.3); arm(k, 'R', 0, h + 0.3); arm(k, 'L', 0, h + 0.3); });
      pose('roar', w[6]); hm(w[6], { x: 120 }, 0.3); A('#aura', { opacity: 1, duration: 0.2 }, w[6]); rings(...hp(300, 500), w[6] + 0.1, 3); go('v22wolf', 200, -60, w[7], 0.7, 'power2.in'); A('#v22wolf', { rotation: 25, transformOrigin: '50% 50%', duration: 0.3 }, w[7]);
      fout('#v22storm', w[8], 0.5); ['v22a', 'v22b', 'v22c'].forEach(k => mood(k, 'sm', w[8])); pose('stand', w[9]); burst(380, 800, w[9], 8, 'star5', 200); } };

  // ================= 23 only you can hold your power; your roar shakes three worlds =================
  S[23] = { H: [0, -80, 0.55, 'sitnam', true],
    bg: `<g id="v23a">${sky('g23', '#2B1E6B', '#7A3E8E')}${stars([[100, 350], [980, 420], [250, 600], [820, 640]], 14)}${ground(G, '#4B3A6B')}</g><g id="v23w" opacity="0">${worlds('v23wd')}</g>`,
    fg: `${P('v23ball', 540, 1000, 1, `<circle r="70" fill="#FFF36B" stroke="#FF8C1A" stroke-width="10"/><circle r="40" fill="#fff"/>`, 0)}`,
    act(t, h, e, w) { gsap.set('#v23w', { opacity: 0 }); A('#aura', { opacity: 1, duration: 0.4 }, t); pulse('#aura', t + 0.4, 1.25, 3, 0.25); stream('gold', 540, 600, 540, 1000, t + 0.4, 1.6, 14, { d: 0.5 }); rise('bolt', 540, 1200, t, 1.4, 6, 700, 600);
      pop('#v23ball', w[2], 0.5); pulse('#v23ball', w[2] + 0.4, 1.15, 3, 0.18); A('#v23ball', { scale: 0.4, duration: 0.4 }, w[3] + 0.2); A('#aura', { opacity: 0.4, duration: 0.4 }, w[3] + 0.2);
      fout('#v23ball', h - 0.3, 0.2); fin('#v23w', h - 0.3, 0.4); ['d1', 'd2', 'd3'].forEach(d => tl.set('#v23wd-' + d, { opacity: 0.2 }, h - 0.3)); eyes(false, h - 0.2); pose('roar', h - 0.2); hm(h - 0.2, { y: -60, scale: 1.1 }, 0.4);
      rings(540, 760, w[5], 4, '#FFF3B0', 900); shake(w[5], 30, 18); ['top', 'mid', 'bot'].forEach((k, i) => F('#v23wd-' + k, { x: -14 }, { x: 14, duration: 0.07, yoyo: true, repeat: 15, ease: 'none' }, w[5] + i * 0.1)); rain('dust', w[6], 1, 8, 60, 1020); flash(w[5], 0.4); } };

  // ================= 24 ghosts stay away when Mahavira's name is said =================
  S[24] = { H: [200, -40, 0.6, 'roar'], hide: true,
    bg: `${night('g24')}<circle id="v24moon" cx="880" cy="420" r="70" fill="#D9D6C8" stroke="${O}" stroke-width="6"/>${tree(110, G, 0.8, '#26402C')}${tree(980, G, 0.7, '#26402C')}${ground(G, '#2F3B2A')}
      ${KID('v24k', 330, gy(0.6), 0.6, { top: '#2E86DE', mood: 'sd', hold: 'lamp' })}
      ${[[900, 700, 1], [1000, 900, 0.85], [760, 560, 0.75]].map(([a, b, s], i) => P('v24g' + i, a, b, s, ghostIn)).join('')}
      ${P('v24bub', 520, 640, 1, bubble(330, 120, tx('హనుమాన్!', 0, 24, 66, SF, 6), 'bl'), 0)}`,
    act(t, h, e, w) { wig('#v24k', t, 3, 6, 0.12); [0, 1, 2].forEach(i => { go('v24g' + i, -300, 60, t + i * 0.2, 2.2, 'sine.inOut'); bob('#v24g' + i, t, 0.4, -24, 3); }); F('#v24moon', { opacity: 1 }, { opacity: 0.4, duration: 1 }, t);
      pop('#v24bub', w[5] - 0.1, 0.4); mood('v24k', 'op', w[5] - 0.1); A('#hero', { opacity: 1, duration: 0.1 }, w[6]); flash(w[6], 0.6); rings(...hp(300, 500), w[6], 3); hm(w[6], { y: -200 }, 0.01); hm(w[6] + 0.01, { y: 0 }, 0.4, 'bounce.out');
      [0, 1, 2].forEach(i => { tl.to('#v24g' + i, { x: 900, y: -700, rotation: 120, transformOrigin: '50% 50%', duration: 0.8, ease: 'power2.in' }, w[6] + 0.3 + i * 0.1); }); fout('#v24bub', w[8]); mood('v24k', 'sm', w[8]); A('#v24moon', { opacity: 1, fill: '#FFF3C4', duration: 0.4 }, w[7]); burst(700, 800, w[8], 8, 'star5', 220); } };

  // ================= 25 disease and pain vanish by constant chanting =================
  S[25] = { H: [260, -40, 0.58, 'stand'],
    bg: `${sky('g25', '#E9F2FF', '#CFE3F7')}<rect x="0" y="300" width="1080" height="940" fill="#DCE8F5"/><rect x="560" y="380" width="200" height="200" fill="#9ED8F5" stroke="${O}" stroke-width="8"/><path d="M660 380 V580 M560 480 H760" stroke="${O}" stroke-width="6"/>${ground(G, '#C9A27A')}
      ${P('', 300, 1150, 1, `<rect x="-250" y="-60" width="500" height="90" rx="20" fill="#A0622D" stroke="${O}" stroke-width="7"/><rect x="-250" y="-210" width="40" height="240" rx="10" fill="#A0622D" stroke="${O}" stroke-width="6"/><rect x="-230" y="-120" width="460" height="70" rx="20" fill="#fff" stroke="${O}" stroke-width="6"/>`)}
      <g id="v25sick">${KID('v25k', 300, 1080 - 310 * 0.6, 0.6, { mood: 'sd', eyes: 'closed', skin: '#C9D88A' })}${KID('v25k2', 300, 1080 - 310 * 0.6, 0.6, { mood: 'sm', op: 0 })}${P('', 300, 1080, 1, `<path d="M-230 -110 Q0 -170 230 -110 L230 -30 L-230 -30Z" fill="#7FD0FF" stroke="${O}" stroke-width="6"/>`)}${P('v25th', 360, 860, 1, `<rect x="-6" y="-40" width="12" height="60" rx="6" fill="#fff" stroke="${O}" stroke-width="4"/><circle cy="24" r="10" fill="${RD}" stroke="${O}" stroke-width="4"/>`)}</g>
      ${[[150, 700], [420, 640], [260, 560], [500, 790], [120, 880]].map(([a, b], i) => P('v25g' + i, a, b, 0.8, germIn(['#7BC043', '#9B59B6', '#7BC043', '#E67E22', '#9B59B6'][i]))).join('')}
      ${P('v25mala', 300, 900, 1, `${[...Array(16)].map((_, i) => `<circle cx="${Math.sin(i / 16 * 6.283) * 50}" cy="${Math.cos(i / 16 * 6.283) * 70}" r="9" fill="#8B4513" stroke="${O}" stroke-width="3"/>`).join('')}`, 0)}`,
    act(t, h, e, w) { gsap.set('#v25k', { y: 0 }); [0, 1, 2, 3, 4].forEach(i => bob('#v25g' + i, t + i * 0.1, 0.3, -20, 3)); wig('#v25th', t, 8, 3, 0.2, '50% 100%');
      pose('point', w[0]); A('#aura', { opacity: 0.8, duration: 0.3 }, w[0]); [0, 1, 2, 3, 4].forEach(i => { const [x, y] = [[150, 700], [420, 640], [260, 560], [500, 790], [120, 880]][i]; stream('gold', ...hp(440, 380), x, y, w[1] + i * 0.25 - 0.3, 0.3, 3, { d: 0.3 }); A('#v25g' + i, { scale: 1.6, opacity: 0, transformOrigin: '50% 50%', duration: 0.25 }, w[1] + i * 0.25); burst(x, y, w[1] + i * 0.25, 5, 'spark', 80, 0.5); });
      fout('#v25k', w[4], 0.3); fin('#v25k2', w[4], 0.3); burst(300, 900, w[4], 8, 'spark', 140); fout('#v25th', w[4]);
      go('v25k2', 0, -120, h - 0.3, 0.5, 'back.out(1.5)'); pose('stand', h - 0.2); pop('#v25mala', h, 0.4); F('#v25mala', { rotation: 0 }, { rotation: 180, transformOrigin: '50% 50%', duration: 2.2, ease: 'none' }, h); mood('v25k2', 'op', h);
      for (let i = 0; i < 5; i++) part(tx('హనుమ', 0, 0, 54, SF, 6), h + i * 0.45, 1.4, 380, 760, 420 + (i % 2) * 120, 380, { s0: 0.5, s1: 1, ease: 'sine.out' }); } };

  // ================= 26 freed from trouble: mind, deed, word =================
  S[26] = { H: [260, -40, 0.6, 'stand'],
    bg: `${sky('g26', '#3B3355', '#8A6FA8')}<g id="v26bright" opacity="0">${sky('g26b', '#BDE8FF', '#FFF3D6')}</g>${ground(G, '#6B5A7A')}
      ${fig({ id: 'v26m', x: 280, y: gy(0.75), s: 0.75, skin: '#C68B59', cloth: '#2E86DE', top: '#FFC93C', crown: 'kid', mood: 'sd' })}
      ${P('v26cage', 280, 1240, 1, `<path d="M-170 0 V-480 Q0 -600 170 -480 V0Z" fill="none" stroke="${O}" stroke-width="16"/>${[...Array(7)].map((_, i) => `<g class="bar"><line x1="${-150 + i * 50}" y1="0" x2="${-150 + i * 50}" y2="-520" stroke="${O}" stroke-width="16"/><line x1="${-150 + i * 50}" y1="0" x2="${-150 + i * 50}" y2="-520" stroke="#8A8FA8" stroke-width="8"/></g>`).join('')}`)}
      ${[['v26i0', heartP(0.8)], ['v26i1', `<path d="M-40 30 Q-50 -20 -20 -30 L-20 -60 Q-10 -70 0 -60 L0 -30 L10 -60 Q20 -70 30 -60 L30 -20 Q50 0 30 30Z" fill="#E9B68A" stroke="${O}" stroke-width="6"/>`], ['v26i2', bubble(120, 80, `<path d="M-30 -4 Q0 20 30 -4" stroke="${RD}" stroke-width="8" fill="none" stroke-linecap="round"/>`, 'bl')]].map(([id, g], i) => P(id, 120 + i * 170, 560, 1, `<circle r="70" fill="#FFF3B0" stroke="${O}" stroke-width="5"/>${g}`, 0)).join('')}`,
    act(t, h, e, w) { gsap.set('#v26bright', { opacity: 0 }); wig('#v26m', t, 3, 4, 0.15); arm('v26m', 'R', -150, t); arm('v26m', 'L', 150, t);
      hm(w[1] - 0.2, { x: -120 }, 0.4); pose('roar', w[2]); shake(w[2] + 0.1, 6, 12); const bars = document.querySelectorAll('#v26cage .bar, #v26cage > path'); bars.forEach((b, i) => tl.to(b, { x: (i - 3) * 160, y: -300 - i * 30, rotation: (i - 3) * 50, transformOrigin: '50% 50%', opacity: 0, duration: 0.8, ease: 'power2.out' }, w[2] + 0.1));
      burst(280, 900, w[2] + 0.1, 10, 'star5', 280); fin('#v26bright', w[3], 0.6); mood('v26m', 'sm', w[3]); arm('v26m', 'R', 0, w[3]); arm('v26m', 'L', 0, w[3]); hm(w[3], { x: 0 }, 0.4); pose('stand', w[3]);
      [0, 1, 2].forEach(i => pop('#v26i' + i, w[4 + i], 0.4)); A('#v26m-eo', { opacity: 0, duration: 0.2 }, w[7]); A('#v26m-ec', { opacity: 1, duration: 0.2 }, w[7]); arm('v26m', 'R', -40, w[7]); arm('v26m', 'L', 40, w[7]);
      [0, 1, 2].forEach(i => stream('gold', 120 + i * 170, 560, ...hp(300, 450), w[8] + i * 0.1, 0.6, 4, { d: 0.5 })); A('#aura', { opacity: 1, duration: 0.3 }, w[8] + 0.3); } };

  // ================= 27 Rama the supreme king; you did all his work =================
  S[27] = { H: [-330, -40, 0.42, 'hero'],
    bg: `${sky('g27', '#FFF0C9', '#FFC98A')}${rays(540, 560, 24, '#fff', 0.35)}${P('', 540, 1240, 1, `${[0, 1, 2, 3].map(i => `<rect x="${-420 + i * 60}" y="${-80 - i * 80}" width="${840 - i * 120}" height="80" fill="${['#E8A23A', '#F2B33D', '#F7C35A', '#FFD27A'][i]}" stroke="${O}" stroke-width="6"/>`).join('')}<rect x="-130" y="-560" width="260" height="240" rx="30" fill="${RD}" stroke="${O}" stroke-width="7"/>`)}
      ${RAMA('v27r', 540, 1240 - 320 - 310 * 0.8 + 40, 0.8, { hold: 'mala', sit: true })}
      ${[[150, gy(0.4)], [300, gy(0.38)], [790, gy(0.38)], [940, gy(0.4)]].map(([a, b], i) => fig({ id: 'v27k' + i, x: a, y: b, s: 0.38, skin: ['#E9B68A', '#C68B59'][i % 2], cloth: ['#2E86DE', '#2FA36B'][i % 2], crown: 'mukut' })).join('')}
      ${[['v27a', `<g transform="scale(.55)">${ST.mountain}</g>`], ['v27b', ringIn], ['v27c', `<rect x="-70" y="-30" width="140" height="60" rx="16" fill="#9C8B7A" stroke="${O}" stroke-width="6"/>${tx('రామ', 0, 16, 40, '#FFD23F', 5)}`], ['v27d', `<rect x="-50" y="-30" width="100" height="60" rx="8" fill="#FFF1C1" stroke="${O}" stroke-width="6"/><circle r="12" fill="${RD}"/>`]].map(([id, g], i) => P(id, 200 + i * 230, 420, 1, `<circle r="80" fill="#FFF8E6" stroke="${O}" stroke-width="6"/>${g}<g transform="translate(55 55) scale(.6)">${check}</g>`, 0)).join('')}`,
    act(t, h, e, w) { for (let i = 0; i < 4; i++) A('#v27k' + i, { rotation: i < 2 ? 30 : -30, transformOrigin: '50% 100%', duration: 0.4 }, w[1] + i * 0.1); burst(540, 640, w[2], 10, 'gold', 260); pulse('#v27r', w[3], 1.05, 2, 0.3);
      for (let i = 0; i < 4; i++) A('#v27k' + i, { rotation: 0, duration: 0.3 }, h - 0.4); pose('fly', h - 0.3, 0.3);
      [0, 1, 2, 3].forEach(i => { const at = h + i * 0.55; hm(at - 0.1, { x: (90 + i * 230) / 0.42, y: (-480 + (i % 2) * 40) / 0.42 }, 0.45, 'power2.inOut'); pop(`#v27${'abcd'[i]}`, at + 0.25, 0.4); burst(200 + i * 230, 420, at + 0.35, 5, 'gold', 110, 0.5); });
      pose('hero', e - 0.3, 0.3); } };

  // ================= 28 any wish brought to you is fulfilled =================
  S[28] = { H: [0, -40, 0.55, 'stand'],
    bg: `${sky('g28', '#C9F0FF', '#FFF3D6')}${hills(1160, '#9ED36A')}${ground(G, '#7CC26B')}
      ${P('v28tree', 540, G, 1, `<rect x="-30" y="-560" width="60" height="560" fill="#7A4A26" stroke="${O}" stroke-width="6"/><circle cx="0" cy="-600" r="210" fill="#3E8E41" stroke="${O}" stroke-width="7"/><circle cx="-190" cy="-520" r="120" fill="#3E8E41" stroke="${O}" stroke-width="6"/><circle cx="190" cy="-520" r="120" fill="#3E8E41" stroke="${O}" stroke-width="6"/>`, 0)}
      ${[[-150, -640], [60, -720], [180, -560], [-60, -520], [-220, -480], [120, -470]].map(([a, b], i) => P('v28f' + i, 540 + a, G + b, 1, `<circle r="26" fill="#FFD23F" stroke="${O}" stroke-width="5"/><circle cx="-8" cy="-8" r="7" fill="#fff" opacity=".7"/>`, 0)).join('')}
      ${KID('v28a', 130, gy(0.5), 0.5, { top: '#E63946' })}${SITA('v28b', 300, gy(0.55), 0.55, { cloth: '#9B59B6', drape: '#2EC4B6', crown: 'none' })}${SAGE('v28c', 880, gy(0.55), 0.55, { cloth: '#fff', top: '#2E86DE', crown: 'kid', beard: '#ddd', hold: '' })}
      ${[['v28t0', 130, `<path d="M-40 30 V-10 L0 -44 L40 -10 V30Z" fill="#F2B33D" stroke="${O}" stroke-width="6"/><rect x="-12" y="4" width="24" height="26" fill="#7A2E0B"/>`], ['v28t1', 300, `<g transform="scale(.55)">${book('#2E86DE')}</g>`], ['v28t2', 880, heartP(0.6, '#FF5C7A')]].map(([id, x, g]) => P(id, x, 700, 1, thought(64, g), 0)).join('')}`,
    act(t, h, e, w) { gsap.set(['#v28a', '#v28b', '#v28c'], { x: 0 }); go('v28a', 60, 0, t, 1.2, 'none'); go('v28c', -60, 0, t, 1.2, 'none'); bob('#v28a', t, 0.2, -10, 3); ['v28t0', 'v28t1', 'v28t2'].forEach((id, i) => pop('#' + id, w[1] + i * 0.35, 0.4));
      arm('v28a', 'R', -40, w[4]); arm('v28b', 'R', -40, w[4]); arm('v28c', 'L', 40, w[4]);
      pose('open', h - 0.3); A('#aura', { opacity: 1, duration: 0.3 }, h - 0.3); hm(h - 0.3, { y: -60 }, 0.4); fin('#v28tree', h - 0.2, 0.1); popB('#v28tree', h - 0.2, 0.7);
      [0, 1, 2, 3, 4, 5].forEach(i => pop('#v28f' + i, h + 0.4 + i * 0.1, 0.3)); [0, 1, 2].forEach(i => { const at = w[7] + i * 0.25; const id = ['v28f0', 'v28f2', 'v28f4'][i]; const tx0 = [[-150, -640], [180, -560], [-220, -480]][i]; go(id, [130, 300, 880][i] - 540 - tx0[0], 1100 - G - tx0[1] - 60, at, 0.6, 'bounce.out'); A(`#v28t${i}`, { scale: 1.3, opacity: 0, transformOrigin: '50% 50%', duration: 0.3 }, at + 0.4); burst([130, 300, 880][i], 1000, at + 0.6, 6, 'gold', 120, 0.5); });
      ['v28a', 'v28b', 'v28c'].forEach(k => mood(k, 'op', w[9])); } };

  // ================= 29 glory through all four ages; light of the world =================
  S[29] = { H: [0, -40, 0.52, 'hero'],
    bg: `${sky('g29', '#2B1E6B', '#6A4FA8')}${stars([[100, 340], [980, 380], [200, 560], [900, 620]], 14)}${ground(G, '#3A2A6B')}
      <g id="v29wheel">${P('v29wh', 540, 760, 1, `${[['#FFD23F', 'సత్య'], ['#D9D9E6', 'త్రేతా'], ['#E08A4F', 'ద్వాపర'], ['#8A8FA8', 'కలి']].map(([c, l], i) => `<path d="M0 0 L${Math.cos((i * 90 - 90) * Math.PI / 180) * 380} ${Math.sin((i * 90 - 90) * Math.PI / 180) * 380} A380 380 0 0 1 ${Math.cos((i * 90) * Math.PI / 180) * 380} ${Math.sin((i * 90) * Math.PI / 180) * 380}Z" fill="${c}" stroke="${O}" stroke-width="7" opacity=".55" id="v29s${i}"/>`).join('')}<circle r="120" fill="#3A2A6B" stroke="${O}" stroke-width="7"/>`)}</g>
      <g id="v29g" opacity="0">${P('v29gl', 540, 1150, 1.4, globe('v29glb'))}<path id="v29night" d="M540 870 A280 280 0 0 1 540 1430 Z" fill="#120B33" opacity=".7"/></g>`,
    act(t, h, e, w) { gsap.set('#v29g', { opacity: 0 }); spin('#v29wh', t, 3, 180); [0, 1, 2, 3].forEach(i => { A('#v29s' + i, { opacity: 1, duration: 0.2 }, w[i]); burst(540 + [1, 1, -1, -1][i] * 200, 760 + [-1, 1, 1, -1][i] * 200, w[i], 6, 'gold', 120, 0.5); }); A('#aura', { opacity: 1, duration: 0.4 }, t);
      fout('#v29wheel', h - 0.3); fin('#v29g', h - 0.3, 0.4); hm(h - 0.3, { y: -420, scale: 0.85 }, 0.5); pose('open', h - 0.2); spin('#v29gl', h, 2.5, 40);
      fout('#v29night', w[6], 0.8); rays && burst(540, 1150, w[6], 10, 'gold', 300); for (let i = 0; i < 6; i++) part('star5', w[6] + i * 0.15, 0.8, 540, 1150, 540 + Math.cos(i) * 260, 1150 + Math.sin(i) * 200, { s0: 0.2, s1: 1 }); } };

  // ================= 30 protector of saints, destroyer of demons, Rama's dear one =================
  S[30] = { H: [120, -40, 0.6, 'guard'],
    bg: `${sky('g30', '#BFE3C0', '#FFF3D6')}${tree(150, G, 0.9, '#3E8E41')}${ground(G, '#88C070')}
      ${SAGE('v30a', 150, gy(0.55) + 50, 0.55, { sit: true, eyes: 'closed' })}${SAGE('v30b', 330, gy(0.5) + 45, 0.5, { sit: true, eyes: 'closed', cloth: '#FFB703' })}
      <g id="v30dome" opacity="0">${P('', 240, 1240, 1, `<path d="M-230 0 Q-230 -420 0 -420 Q230 -420 230 0Z" fill="#FFF3B0" opacity=".35" stroke="#FFD23F" stroke-width="10"/>`)}</g>
      ${[[1250, 1100, 1], [1250, 960, 0.85], [1300, 1180, 0.8]].map(([a, b, s], i) => P('v30d' + i, a, b, s, demonIn())).join('')}
      ${RAMA('v30r', -200, gy(0.95), 0.95)}`,
    act(t, h, e, w) { [0, 1, 2].forEach(i => go('v30d' + i, -420, 0, t + i * 0.2, 1.6, 'power1.inOut')); fin('#v30dome', w[2], 0.4); pulse('#v30dome', w[3], 1.04, 2); hm(w[3], { x: -100 }, 0.4); stream('note', 240, 900, 240, 600, t, 2, 5, { d: 1 });
      pose('roar', w[5] - 0.1); hm(w[5], { x: 100 }, 0.2); shake(w[5], 6, 12); [0, 1, 2].forEach(i => tl.to('#v30d' + i, { x: 700, y: -900, rotation: 540, transformOrigin: '50% 50%', duration: 0.9, ease: 'power2.in' }, w[5] + 0.1 + i * 0.07)); burst(800, 1000, w[5] + 0.1, 10, 'star5', 260);
      go('v30r', 470, 0, w[6], 0.7); pose('namaste', w[7]); hm(w[7], { x: 0 }, 0.4); arm('v30r', 'L', 120, w[7] + 0.2); rise('heart', 500, 900, w[7] + 0.4, 1, 7, 300, 400); } };

  // ================= 31 giver of 8 powers and 9 treasures, as blessed by Mother Sita =================
  S[31] = { H: [0, -40, 0.55, 'stand'],
    bg: `${sky('g31', '#2B1E6B', '#C06C9E')}${stars([[90, 330], [990, 360], [200, 600], [880, 640]], 16)}${ground(G, '#6B4E8A')}
      ${[...Array(8)].map((_, i) => { const a = i / 8 * 6.283 - 1.57; return P('v31o' + i, 540 + Math.cos(a) * 330, 760 + Math.sin(a) * 300, 1, `<circle r="46" fill="#FFF36B" stroke="#FF8C1A" stroke-width="7"/>${tx(String(i + 1), 0, 18, 50, '#C2410C', 0, 'Luckiest Guy')}`, 0); }).join('')}
      ${[...Array(9)].map((_, i) => P('v31t' + i, 90 + i * 112, 1180 - (i % 2) * 40, i % 3 === 0 ? 0.7 : 1, i % 3 === 0 ? chest : gem(['#2EC4B6', '#FF5C7A', '#9B59B6', '#FFD23F'][i % 4]), 0)).join('')}
      <g id="v31sita" opacity="0">${P('', 540, 470, 1, `<circle r="200" fill="#FFE9A8" opacity=".6"/>`)}${lotus(540, 600, 1.6)}${SITA('v31s', 540, 600 - 310 * 0.6, 0.6, { cloth: '#E63946', drape: '#FFC93C' })}</g>`,
    act(t, h, e, w) { [...Array(8)].forEach((_, i) => pop('#v31o' + i, w[0] + i * 0.1, 0.35)); spin('#hmv', w[1] + 0.5, 0.01, 0); [...Array(9)].forEach((_, i) => pop('#v31t' + i, w[2] + i * 0.08, 0.35)); burst(540, 1100, w[3], 10, 'gold', 400); A('#aura', { opacity: 1, duration: 0.3 }, w[0]);
      [...Array(8)].forEach((_, i) => fout('#v31o' + i, h - 0.3)); fin('#v31sita', h - 0.2, 0.5); hm(h - 0.2, { y: 60 }, 0.4); pose('kneel', h - 0.2); arm('v31s', 'R', -120, w[7] - 0.2);
      stream('gold', 600, 420, ...hp(300, 300), w[7], 1.0, 12, { d: 0.5 }); burst(...hp(300, 300), w[8], 10, 'spark', 200); rain('petal', w[8], 1, 8); } };

  // ================= 32 you hold the nectar of Rama's name; forever Rama's servant =================
  S[32] = { H: [0, -40, 0.62, 'namaste'],
    bg: `${sky('g32', '#FFF0C9', '#F7B267')}${rays(540, 820, 20, '#fff', 0.35)}${ground(G, '#E6B98A')}
      <g id="v32b" opacity="0">${RAMA('v32r', 760, gy(0.75) - 30, 0.75, { sit: true })}${P('', 760, 1150, 1, `<rect x="-160" y="-30" width="320" height="80" rx="16" fill="${GD}" stroke="${O}" stroke-width="6"/>`)}</g>`,
    fg: `${P('v32pot', 540, 990, 1, `<path d="M-70 -40 Q-110 60 0 90 Q110 60 70 -40Z" fill="${GD}" stroke="${O}" stroke-width="7"/><rect x="-56" y="-62" width="112" height="28" rx="10" fill="${GD}" stroke="${O}" stroke-width="6"/>${tx('రామ', 0, 40, 52, RD, 5)}<g class="flick"><path d="M-40 -66 Q-20 -110 0 -80 Q20 -120 40 -66Z" fill="#FFF36B" stroke="#FF8C1A" stroke-width="4"/></g>`, 0)}`,
    act(t, h, e, w) { gsap.set('#v32b', { opacity: 0 }); popB('#v32pot', t, 0.5); pulse('#v32pot', t + 0.6, 1.05, 3, 0.3); A('#aura', { opacity: 1, duration: 0.3 }, t);
      for (let i = 0; i < 6; i++) part('ram', t + 0.4 + i * 0.35, 1.3, 540 + (rnd() - 0.5) * 60, 910, 540 + (rnd() - 0.5) * 500, 380, { s0: 0.4, s1: 1, ease: 'sine.out' }); rise('gold', 540, 920, t + 0.5, 2, 10, 120, 300);
      fout('#v32pot', h - 0.3); fout('#aura', h - 0.3); fin('#v32b', h - 0.3, 0.4); hm(h - 0.3, { x: -230 }, 0.5); pose('kneel', h - 0.2); arm('v32r', 'R', -110, w[6]);
      A('#armR', { rotation: -60, svgOrigin: '378 425', duration: 0.3, yoyo: true, repeat: 5 }, w[5]); rise('heart', 540, 1000, w[6], 1.4, 6, 300, 400); rain('petal', w[7], 1.2, 8); } };

  // ================= 33 singing to you leads to Rama; sorrows of lifetimes forgotten =================
  S[33] = { H: [330, -40, 0.42, 'stand'],
    bg: `${sky('g33', '#4B5A7A', '#C9B0D9')}<g id="v33br" opacity="0">${sky('g33b', '#BDE8FF', '#FFF3D6')}</g>${ground(G, '#9C7A5A')}
      <path id="v33path" d="M300 1100 Q500 800 780 520" fill="none" stroke="#FFF36B" stroke-width="40" stroke-linecap="round" opacity="0"/>
      ${P('v33rama', 820, 470, 1, `${bigCloud(0, 140, 0.55)}${RAMA('v33r', 0, -60, 0.55)}`, 0)}
      ${[0, 1, 2].map(i => P('v33c' + i, 180 + i * 200, 470 - i * 30, 1, `${bigCloud(0, 0, 0.42, '#7A7F8C')}<path d="M-30 20 q30 -20 60 0" stroke="${O}" stroke-width="6" fill="none"/><circle cx="-24" cy="-6" r="6" fill="${O}"/><circle cx="24" cy="-6" r="6" fill="${O}"/>`)).join('')}
      ${KID('v33a', 140, gy(0.5), 0.5, { mood: 'op', hold: 'cymbal', holdL: 'cymbal' })}${SITA('v33b', 320, gy(0.52), 0.52, { mood: 'op', crown: 'none', cloth: '#2FA36B', drape: '#FF8FB1' })}${SAGE('v33c', 500, gy(0.5), 0.5, { mood: 'op', crown: 'kid', beard: '#ddd', hold: 'cymbal', holdL: 'cymbal' })}`,
    act(t, h, e, w) { gsap.set(['#v33br'], { opacity: 0 }); ['v33a', 'v33c'].forEach(k => { F(`#${k}-aR`, { rotation: -60 }, { rotation: -20, svgOrigin: '56 60', duration: 0.2, yoyo: true, repeat: 11 }, t); F(`#${k}-aL`, { rotation: 60 }, { rotation: 20, svgOrigin: '-56 60', duration: 0.2, yoyo: true, repeat: 11 }, t); }); bob('#v33b', t, 0.3, -10, 4);
      stream('note', 300, 900, 600, 600, t, 2.4, 12, { d: 1.2 }); fin('#v33path', w[2], 0.4); pop('#v33rama', w[3], 0.5); burst(820, 470, w[4], 8, 'gold', 200);
      [0, 1, 2].forEach(i => bob('#v33c' + i, t, 0.5, 10, 2)); [0, 1, 2].forEach(i => { A('#v33c' + i, { x: -900 + i * 100, y: -200, opacity: 0, duration: 0.9, ease: 'power2.in' }, w[6] + i * 0.25); }); stream('wind', 1100, 500, 100, 450, w[6], 1, 6);
      fin('#v33br', w[7], 0.6); rain('petal', w[7], 1.5, 12); ['v33a', 'v33b', 'v33c'].forEach(k => mood(k, 'sm', w[8])); } };

  // ================= 34 at the end, reach Rama's home; called God's devotee =================
  S[34] = { H: [-220, -200, 0.4, 'stand'],
    bg: `${heaven('g34')}${P('', 820, 520, 1, `${bigCloud(0, 150, 0.9)}${palaceIn('#FFD23F')}`)}${[...Array(6)].map((_, i) => P('', 180 + i * 120, 1180 - i * 110, 1, `<ellipse rx="90" ry="26" fill="#fff" stroke="${O}" stroke-width="5"/>`)).join('')}
      ${SAGE('v34o', 180, 1180 - 310 * 0.5, 0.5, { crown: 'kid', hair: '#fff', beard: '#fff', cloth: '#fff', top: '#FF9F43', hold: '' })}
      ${[0, 1].map(i => KID('v34w' + i, 640 + i * 300, 690 - 310 * 0.4, 0.4, { top: ['#E63946', '#2E86DE'][i], op: 0 })).join('')}
      ${P('v34gar', 800, 300, 1, `<path d="M-70 -40 Q0 120 70 -40" fill="none" stroke="#FF9F1C" stroke-width="24" stroke-dasharray="2 22" stroke-linecap="round"/><path d="M-70 -40 Q0 120 70 -40" fill="none" stroke="#E85D04" stroke-width="8" opacity=".5"/>`, 0)}
      ${P('v34halo', 800, 500, 1, `<ellipse rx="70" ry="20" fill="none" stroke="#FFF36B" stroke-width="12"/>`, 0)}`,
    act(t, h, e, w) { [0, 1, 2, 3, 4].forEach(i => { go('v34o', 120 * (i + 1), -110 * (i + 1), t + i * 0.5, 0.45, 'power1.inOut'); }); hm(t, { x: 0 }, 0.01); pose('point', t);
      [0, 1, 2].forEach(i => hm(t + i * 0.5, { x: 120 * (i + 1) / 0.4, y: -110 * (i + 1) / 0.4 }, 0.45)); rise('gold', 500, 1100, t, 2.5, 10, 700, 500);
      [0, 1].forEach(i => pop('#v34w' + i, h - 0.2 + i * 0.2, 0.4)); ['v34w0', 'v34w1'].forEach(k => { arm(k, 'R', -130, h + 0.2); arm(k, 'L', 130, h + 0.2); });
      pop('#v34gar', w[6], 0.3); go('v34gar', 0, 230, w[6], 0.6, 'bounce.out'); pop('#v34halo', w[7], 0.4); burst(800, 560, w[7], 10, 'gold', 200); rain('marigold', w[7], 1.2, 10, 500, 1060); } };

  // ================= 35 serving Hanuman brings all happiness =================
  S[35] = { H: [220, -40, 0.62, 'stand'],
    bg: `${sky('g35', '#FFE7D6', '#FFC98A')}${ground(G, '#E6B98A')}
      ${KID('v35k', 170, gy(0.5), 0.5, { top: '#2FA36B' })}${SITA('v35m', 330, gy(0.62), 0.62, { crown: 'none', cloth: '#E63946', drape: '#FFC93C', hold: 'lamp' })}
      ${P('v35th', 300, 600, 1, thought(80, `${tx('జై', 0, 10, 60, SF, 5)}<g transform="translate(0 40) scale(.4)">${heartP(1)}</g>`), 0)}
      <g id="v35rb" opacity="0">${P('', 540, 1240, 1, ['#E63946', '#FF8C1A', '#FFD23F', '#2FA36B', '#2E86DE', '#9B59B6'].map((c, i) => `<path d="M${-560 + i * 22} 0 A${560 - i * 22} ${560 - i * 22} 0 0 1 ${560 - i * 22} 0" fill="none" stroke="${c}" stroke-width="22"/>`).join(''))}</g>
      ${[...Array(5)].map((_, i) => P('v35fl' + i, 100 + i * 220, 1240, 1, `<line x1="0" y1="0" x2="0" y2="-70" stroke="#2FA36B" stroke-width="8"/><g transform="translate(0 -80) scale(1.4)">${ST.SH.petal}</g>`, 0)).join('')}`,
    act(t, h, e, w) { gsap.set('#v35rb', { opacity: 0 }); F('#v35m-aR', { rotation: 0 }, { rotation: -360, svgOrigin: '56 60', duration: 1.2, ease: 'none', repeat: 1 }, t); arm('v35k', 'R', -40, t); arm('v35k', 'L', 40, t);
      pop('#v35th', w[2], 0.4); burst(...hp(300, 500), w[3], 6, 'gold', 140); fout('#v35th', h - 0.3);
      fin('#v35rb', h - 0.2, 0.2); F('#v35rb', { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, h - 0.2); [...Array(5)].forEach((_, i) => popB('#v35fl' + i, w[6] + i * 0.12, 0.4));
      ['v35k', 'v35m'].forEach(k => { mood(k, 'op', w[7]); bob('#' + k, w[7], 0.22, -24, 3); }); for (let i = 0; i < 5; i++) part(birdIn(), w[7] + i * 0.15, 1.6, -60, 500 + i * 60, 1150, 350 + i * 40, { s0: 1, s1: 1, ease: 'none' }); burst(540, 700, w[8], 10, 'heart', 300); } };

  // ================= 36 troubles cut, pain gone for those who remember mighty Hanuman =================
  S[36] = { H: [270, -40, 0.62, 'hero'], hide: true,
    bg: `${sky('g36', '#3B3355', '#7A6A8E')}<g id="v36br" opacity="0">${sky('g36b', '#BDE8FF', '#FFF3D6')}</g>${ground(G, '#6B5A7A')}
      ${fig({ id: 'v36m', x: 270, y: gy(0.72), s: 0.72, skin: '#E5AD7C', cloth: '#FFF1C1', top: '#9B59B6', crown: 'kid', mood: 'sd' })}
      <g id="v36ch">${[0, 1, 2].map(i => P('v36c' + i, 270, 900 + i * 90, 1, `<path d="M-120 0 Q0 30 120 0" fill="none" stroke="${O}" stroke-width="26"/><path d="M-120 0 Q0 30 120 0" fill="none" stroke="#8A8FA8" stroke-width="16" stroke-dasharray="26 8"/>`)).join('')}</g>
      ${P('v36th', 420, 560, 1, thought(90, `<circle r="50" fill="${SK}" stroke="${O}" stroke-width="5"/><path d="M-34 -6 Q0 -30 34 -6 Q36 30 0 40 Q-36 30 -34 -6Z" fill="#F9D9A8" stroke="${O}" stroke-width="4"/><path d="M-36 -40 L36 -40 L30 -64 L0 -80 L-30 -64Z" fill="${GD}" stroke="${O}" stroke-width="4"/>`), 0)}`,
    act(t, h, e, w) { gsap.set('#v36br', { opacity: 0 }); wig('#v36m', t, 3, 4, 0.12); rise('bolt', 270, 800, t, 1, 4, 300, 200);
      [0, 1, 2].forEach(i => { tl.to('#v36c' + i, { x: (i % 2 ? 1 : -1) * 500, y: -200, rotation: (i % 2 ? 1 : -1) * 200, transformOrigin: '50% 50%', opacity: 0, duration: 0.7, ease: 'power2.out' }, w[1] + i * 0.12); burst(270, 900 + i * 90, w[1] + i * 0.12, 5, 'spark', 120, 0.5); });
      fin('#v36br', w[3], 0.6); mood('v36m', 'sm', w[3]); arm('v36m', 'R', -130, w[3]); arm('v36m', 'L', 130, w[3]);
      go('v36m', -150, 0, h - 0.3, 0.5); arm('v36m', 'R', -40, h - 0.2); arm('v36m', 'L', 40, h - 0.2); A('#v36m-eo', { opacity: 0, duration: 0.2 }, h); A('#v36m-ec', { opacity: 1, duration: 0.2 }, h); pop('#v36th', h, 0.4);
      A('#hero', { opacity: 1, duration: 0.2 }, w[7] - 0.1); hm(w[7] - 0.1, { y: 120, scale: 0.4 }, 0.01); hm(w[7], { y: 0, scale: 1 }, 0.5, 'back.out(1.6)'); A('#aura', { opacity: 1, duration: 0.2 }, w[7]); pose('roar', w[8]); rings(...hp(300, 500), w[8], 3); } };

  // ================= 37 Jai Jai Jai Hanuman; bless us like a loving Guru =================
  S[37] = { H: [0, -40, 0.62, 'hero'],
    bg: `${sky('g37', '#2B1E6B', '#C06C9E')}${ground(G, '#5B3E8A')}
      ${[0, 1, 2].map(i => P('v37j' + i, 220 + i * 320, 470, 1, tx('జై', 0, 40, 150, ['#FFD23F', '#FF8C1A', '#FF5C7A'][i], 12), 0)).join('')}
      <g id="v37crowd">${[...Array(6)].map((_, i) => KID('v37p' + i, 90 + i * 180 + (i > 2 ? 0 : 0), gy(0.4), 0.4, { top: ['#E63946', '#2E86DE', '#2FA36B', '#FF8C1A', '#9B59B6', '#FFC93C'][i], hold: i % 2 ? 'flag' : '', mood: 'op' })).join('')}</g>
      ${KID('v37k', 330, gy(0.5) + 50, 0.5, { sit: true, top: '#FF8C1A', eyes: 'closed', op: 0 })}`,
    act(t, h, e, w) { [0, 1, 2].forEach(i => { pop('#v37j' + i, w[i], 0.35); burst(220 + i * 320, 470, w[i] + 0.1, 12, ['spark', 'gold', 'star5'][i], 220); }); for (let i = 0; i < 6; i++) { arm('v37p' + i, 'R', -150, w[0] + i * 0.05); bob('#v37p' + i, w[0] + i * 0.05, 0.25, -30, 4); } pose('roar', w[2]); rings(540, 700, w[3], 2);
      [0, 1, 2].forEach(i => fout('#v37j' + i, h - 0.3)); fout('#v37crowd', h - 0.3); pose('stand', h - 0.2); hm(h - 0.2, { x: 140 }, 0.5); pop('#v37k', h - 0.1, 0.5); arm('v37k', 'R', -40, h); arm('v37k', 'L', 40, h);
      pose('point', w[7]); A('#armR', { rotation: -125, svgOrigin: '378 425', duration: 0.5 }, w[7] + 0.05); stream('gold', ...hp(470, 420), 330, 850, w[8], 1, 10, { d: 0.5 }); A('#aura', { opacity: 0.8, duration: 0.4 }, w[8]); burst(330, 1000, w[9], 10, 'spark', 200); } };

  // ================= 38 reading a hundred times frees us; great joy =================
  S[38] = { H: [300, -40, 0.5, 'stand'],
    bg: `${sky('g38', '#FFF3D6', '#F7C98B')}${ground(G, '#C98E55')}
      ${KID('v38k', 330, gy(0.65), 0.65, { top: '#2E86DE', hold: 'book' })}
      ${P('v38cnt', 330, 560, 1, `<circle r="110" fill="#fff" stroke="${O}" stroke-width="8"/><text id="v38n" y="34" font-size="100" font-family="Luckiest Guy" text-anchor="middle" fill="${RD}">1</text>`, 0)}
      ${P('v38chain', 330, 1180, 1, `<path d="M-120 0 Q0 26 120 0" fill="none" stroke="${O}" stroke-width="24"/><path d="M-120 0 Q0 26 120 0" fill="none" stroke="#8A8FA8" stroke-width="14" stroke-dasharray="24 8"/>`)}
      ${P('v38cage', 820, 640, 1, `<path id="v38door" d="M-90 120 V-60 Q0 -150 90 -60 V120" fill="none" stroke="${O}" stroke-width="10"/>${[-60, -20, 20, 60].map(x => `<line x1="${x}" y1="120" x2="${x}" y2="-80" stroke="${O}" stroke-width="7" class="cb"/>`).join('')}<rect x="-100" y="110" width="200" height="20" fill="${GD}" stroke="${O}" stroke-width="5"/>`)}
      ${[0, 1, 2].map(i => P('v38b' + i, 800 + (i - 1) * 40, 680 - i * 20, 1, birdIn('#FFD23F'))).join('')}`,
    act(t, h, e, w) { pop('#v38cnt', t, 0.4); const N = $('#v38n'); for (let i = 1; i <= 100; i += 3) tl.set(N, { innerHTML: String(i) }, t + (i / 100) * (h - t - 0.4)); tl.set(N, { innerHTML: '100' }, h - 0.35); burst(330, 560, h - 0.3, 10, 'gold', 180);
      F('#v38k-aR', { rotation: 0 }, { rotation: -15, svgOrigin: '56 60', duration: 0.2, yoyo: true, repeat: 9 }, t); rise(`<g transform="scale(.3)">${book('#2E86DE')}</g>`, 330, 900, t + 0.3, 2, 6, 200, 300);
      fout('#v38cnt', w[6] - 0.2); tl.to('#v38chain', { scaleX: 1.8, opacity: 0, transformOrigin: '50% 50%', duration: 0.4 }, w[6]); burst(330, 1180, w[6], 8, 'spark', 160); document.querySelectorAll('#v38cage .cb').forEach((b, i) => tl.to(b, { y: -300, x: (i - 1.5) * 120, rotation: (i - 1.5) * 60, opacity: 0, transformOrigin: '50% 50%', duration: 0.6 }, w[7] + i * 0.05));
      [0, 1, 2].forEach(i => go('v38b' + i, 300 + i * 80, -500 - i * 60, w[7] + 0.2 + i * 0.1, 1.2, 'power1.in')); mood('v38k', 'op', w[8]); bob('#v38k', w[8], 0.2, -50, 3, 'power1.out'); rain('conf', w[8], 1.2, 10); rain('conf2', w[8], 1.2, 10); pose('open', w[8]); } };

  // ================= 39 whoever reads the Chalisa succeeds; Shiva is witness =================
  S[39] = { H: [300, -40, 0.5, 'stand'],
    bg: `${sky('g39', '#BFD7FF', '#FFF3E0')}${ground(G, '#9ED36A')}
      ${KID('v39k', 250, gy(0.65), 0.65, { top: '#FF8C1A', hold: 'book' })}
      ${P('v39bk', 330, 760, 1, `<g transform="scale(1.4)">${book(SF)}</g>${tx('చాలీసా', 0, 12, 34, RD, 0)}`, 0)}
      ${P('v39tr', 300, 640, 1, `<path d="M-60 -70 H60 Q60 20 0 40 Q-60 20 -60 -70Z" fill="${GD}" stroke="${O}" stroke-width="7"/><path d="M-60 -50 Q-110 -50 -90 0 Q-80 20 -40 14 M60 -50 Q110 -50 90 0 Q80 20 40 14" fill="none" stroke="${O}" stroke-width="8"/><rect x="-14" y="40" width="28" height="40" fill="${GD}" stroke="${O}" stroke-width="6"/><rect x="-50" y="80" width="100" height="26" rx="6" fill="#A0622D" stroke="${O}" stroke-width="6"/>${tx('★', 0, -6, 60, '#fff', 0)}`, 0)}
      <g id="v39sh" opacity="0">${P('', 760, 620, 1, `${bigCloud(0, 160, 0.8)}<path d="M-260 160 L-120 -60 L-20 60 L80 -120 L240 160Z" fill="#EAF2FF" stroke="${O}" stroke-width="6"/>`)}${SHIVA('v39shv', 690, 620 - 210, 0.7)}${SITA('v39par', 870, 620 - 190, 0.6, { cloth: '#2FA36B', drape: '#E63946', crown: 'mukut' })}</g>`,
    act(t, h, e, w) { gsap.set('#v39sh', { opacity: 0 }); F('#v39k-aR', { rotation: 0 }, { rotation: -15, svgOrigin: '56 60', duration: 0.25, yoyo: true, repeat: 5 }, t); pop('#v39bk', w[3], 0.5); burst(330, 760, w[4], 10, 'gold', 200); rays && pulse('#v39bk', w[4] + 0.3, 1.1, 2);
      fout('#v39bk', h - 0.3); pop('#v39tr', w[5] - 0.1, 0.5); rise('star5', 300, 740, w[5], 1.4, 8, 300, 300); mood('v39k', 'op', w[6]); arm('v39k', 'L', 140, w[6]);
      fin('#v39sh', w[6], 0.6); arm('v39shv', 'R', -120, w[7]); A('#v39shv-head', { rotation: 8, transformOrigin: '50% 100%', duration: 0.25, yoyo: true, repeat: 3 }, w[7] + 0.3); stream('gold', 690, 500, 300, 800, w[8], 1, 10, { d: 0.6 }); pose('namaste', w[7]); } };

  // ================= 40 Tulsidas, God's servant, prays: Lord, live in my heart =================
  S[40] = { H: [200, -40, 0.6, 'stand'],
    bg: `${sky('g40', '#3B2A55', '#B07A6B')}<rect x="0" y="300" width="1080" height="940" fill="#7A5A4A" opacity=".5"/>${ground(G, '#8A5A3B')}
      ${P('', 330, 1180, 1, `<rect x="-200" y="-40" width="400" height="50" rx="10" fill="#A0622D" stroke="${O}" stroke-width="6"/><rect x="-140" y="-60" width="280" height="30" fill="#F2D49B" stroke="${O}" stroke-width="5"/>${[...Array(5)].map((_, i) => `<path d="M${-120 + i * 50} -46 h36" stroke="#7A2E0B" stroke-width="4"/>`).join('')}`)}${diya(520, 1140, 1)}
      ${TULSI('v40t', 300, gy(0.8) + 40, 0.8, { sit: true, hold: 'quill', mood: 'sm' })}
      <g id="v40hrt" opacity="0">${P('v40hs', 300, 940, 1, `<circle r="150" fill="#FFE9A8" opacity=".6"/>${heartP(1.6, '#FF5C7A')}`)}</g>`,
    act(t, h, e, w) { F('#v40t-aR', { rotation: -30 }, { rotation: 0, svgOrigin: '56 60', duration: 0.15, yoyo: true, repeat: 9 }, t); stream('note', 300, 800, 500, 500, t + 0.3, 2, 5, { d: 1 }); A('#v40t', { rotation: 18, transformOrigin: '50% 100%', duration: 0.4, yoyo: true, repeat: 1 }, w[2]); pose('stand', t);
      arm('v40t', 'R', -40, h - 0.3); arm('v40t', 'L', 40, h - 0.3); A('#v40t-eo', { opacity: 0, duration: 0.2 }, h - 0.3); A('#v40t-ec', { opacity: 1, duration: 0.2 }, h - 0.3);
      fin('#v40hrt', w[5] - 0.2, 0.2); pop('#v40hs', w[5] - 0.2, 0.5); A('#aura', { opacity: 1, duration: 0.3 }, w[5]);
      hm(w[6] - 0.1, { x: (300 - 740) / 0.6, y: (1000 - 1240) / 0.6, scale: 0.28 }, 0.8, 'power2.inOut'); pulse('#v40hs', w[7] + 0.4, 1.08, 3, 0.25); rise('heart', 300, 1000, w[7], 1.4, 7, 300, 400); } };

  // ================= D3 son of Wind, remover of troubles; live in my heart with Rama, Lakshmana, Sita =================
  S.D3 = { H: [0, -40, 0.55, 'hero'],
    bg: `${sky('gD3', '#FFE3F1', '#FFD38A')}${rays(540, 700, 28, '#fff', 0.4)}${ground(G, '#F7B7C8')}${lotus(140, 1250, 0.8)}${lotus(940, 1250, 0.9)}
      ${[0, 1, 2].map(i => P('vd3c' + i, 200 + i * 340, 420 + (i % 2) * 60, 1, bigCloud(0, 0, 0.4, '#7A7F8C'))).join('')}
      ${P('vd3tor', 540, 330, 1, `<path d="M-540 0 Q0 80 540 0" fill="none" stroke="#2FA36B" stroke-width="10"/>${[...Array(13)].map((_, i) => `<path d="M${-480 + i * 80} ${18 + Math.sin(i / 12 * 3.14) * 38} q-14 40 0 70 q14 -30 0 -70Z" fill="#4CAF50" stroke="${O}" stroke-width="4"/><circle cx="${-440 + i * 80}" cy="${24 + Math.sin((i + 0.5) / 12 * 3.14) * 38}" r="14" fill="#FF9F1C" stroke="${O}" stroke-width="3"/>`).join('')}`, 0)}
      ${diya(120, 1180, 1.2)}${diya(960, 1180, 1.2)}
      <g transform="translate(0 130)"><g id="vd3fam" opacity="0">${P('', 540, 560, 1, bigCloud(0, 120, 1.1))}${LAKS('vd3l', 300, 380, 0.55)}${RAMA('vd3r', 540, 330, 0.65)}${SITA('vd3s', 770, 380, 0.55)}</g></g>
      ${P('vd3h', 540, 820, 1, `<path d="M0 420 C-620 0 -540 -480 -220 -440 Q-40 -420 0 -220 Q40 -420 220 -440 C540 -480 620 0 0 420Z" fill="none" stroke="${RD}" stroke-width="26"/><path d="M0 420 C-620 0 -540 -480 -220 -440 Q-40 -420 0 -220 Q40 -420 220 -440 C540 -480 620 0 0 420Z" fill="none" stroke="#FF8FB1" stroke-width="10"/>`, 0)}`,
    act(t, h, e, w) { gsap.set('#vd3fam', { opacity: 0 }); rise('wind', 540, 1200, t, 1.5, 6, 500, 500); stream('leaf', 1100, 700, -50, 900, t, 1.6, 10, { d: 1 }); A('#aura', { opacity: 1, duration: 0.3 }, t + 0.3);
      pose('roar', w[2]); [0, 1, 2].forEach(i => { tl.to('#vd3c' + i, { scale: 1.6, opacity: 0, transformOrigin: '50% 50%', duration: 0.4 }, w[3] + i * 0.15); burst(200 + i * 340, 420 + (i % 2) * 60, w[3] + i * 0.15, 6, 'spark', 140, 0.5); }); pose('stand', w[4]);
      pop('#vd3tor', w[4], 0.6); rain('marigold', w[5], 1.5, 10); burst(540, 700, w[6], 10, 'gold', 260);
      pose('namaste', h - 0.3); hm(h - 0.3, { y: 40 }, 0.4); fin('#vd3fam', w[7] - 0.2, 0.2); ['vd3r', 'vd3l', 'vd3s'].forEach((k, i) => pop('#' + k, w[7 + i] - 0.1, 0.45));
      pop('#vd3h', w[10], 0.7); pulse('#vd3h', w[11] + 0.2, 1.04, 4, 0.3); rise('heart', 540, 1150, w[11], 2, 10, 700, 600); burst(540, 300, w[13], 10, 'star5', 260); } };

  // ================= OUTRO =================
  S.outro = { H: [0, -260, 0.6, 'roar'],
    bg: `${sky('gOu', '#2B1E6B', '#FF9E5E')}${rays(540, 760, 24, '#FFE9A8', 0.35)}${bigCloud(540, 1000, 1.6)}${LAKS('ouL', 230, 640, 0.5)}${RAMA('ouR', 540, 560, 0.6, { op: 0 })}${SITA('ouS', 850, 640, 0.5)}`,
    act(t) {} };
  function boulderS() { return ST.boulder; }
  return S;
})();
