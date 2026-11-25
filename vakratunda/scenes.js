// Vakratunda Mahakaya: one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 curved trunk, mighty body: we see a tiny Ganesha far away on the hill, then he strides up and stands huge over the child, his curved trunk swinging.
// 1 bright as a crore suns: we see a dusky sky with one small sun, then suns pop up everywhere and Ganesha shines brighter than all of them.
// 2 remove my obstacles: we see the child stopped on the road to school by a big boulder, then Ganesha's light rolls it away and the child walks on.
// 3 in all my work, always: we see a closed book, a bare sprout and a blank page, then with Ganesha's blessing each one gets done (ticked) while the sun and moon go round.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
const SC = (() => {
  const { P, cloud, stars, tree, tx, SH, KID, O, GD, RD, check, boulder, book, sunFace } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  // Ganesha from the hero drawing, ids prefixed so it never clashes with the hero; his feet sit at (x, y). The mouse stays with the hero only.
  const GAN = (p, x, y, s, halo = true) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}mouse"`, `id="${p}mouse" display="none"`).replace(`id="${p}halo"`, `id="${p}halo"${halo ? '' : ' display="none"'}`)}</g>`);
  const walk = (tl, sel, x0, x1, t, dur) => {
    tl.fromTo(sel, { x: x0 }, { x: x1, duration: dur, ease: 'none' }, t);
    const n = Math.max(2, Math.round(dur / 0.32));
    tl.fromTo(sel, { y: 0 }, { y: -10, duration: dur / n / 2, ease: 'sine.out', yoyo: true, repeat: n * 2 - 1 }, t);
  };
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  // the change must happen inside the scene even when it is short (sung finale ~4 s) or long (line ~9 s)
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);

  // ---------- 0: Vakratunda Mahakaya: curved trunk, big mighty body ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#BFE6FF', '#FFF1C9')}
    ${cloud(160, 90, 0.55)}${cloud(830, 70, 0.45)}
    <path d="M-20 330 Q200 250 420 320 Q640 240 860 310 Q950 280 1020 300 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>${grass(450, '#6BBF59')}
    ${tree(70, 440, 0.36)}${tree(940, 440, 0.3)}
    <g id="v0far">${GAN('v0f', 640, 300, 0.09, false)}</g>
    <g id="v0big" opacity="0">${GAN('v0b', 560, 520, 0.6)}</g>
    <g id="v0kw">${KID('v0k', 200, 300, 0.5, { mood: 'sm' })}</g>
    <g id="v0lt" opacity="0"><path d="M820 250 Q760 330 625 330" fill="none" stroke="${RD}" stroke-width="8" stroke-dasharray="14 10" stroke-linecap="round"/><path d="M625 330 l24 -16 M625 330 l22 18" stroke="${RD}" stroke-width="8" stroke-linecap="round"/>${tx('వక్రతుండ', 760, 235, 44, '#FFD23F', 8)}</g>
    <g id="v0lb" opacity="0"><path d="M350 505 V70" stroke="${O}" stroke-width="7" stroke-dasharray="12 10"/><path d="M350 70 l-16 22 M350 70 l16 22 M350 505 l-16 -22 M350 505 l16 -22" stroke="${O}" stroke-width="7" stroke-linecap="round"/>${tx('మహాకాయ', 370, 110, 44, '#FFD23F', 8)}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set('#v0far', { opacity: 1, scale: 1 }, a); tl.set(['#v0big', '#v0lt', '#v0lb'], { opacity: 0 }, a);
    face(tl, 'v0k', 'sm', a);
    // far away, small Ganesha waves; the child points at him
    swing(tl, '#v0farmR', '0% 100%', a, r - a, 10, 0.4);
    tl.fromTo('#v0kw', { y: 0 }, { y: -8, duration: 0.3, yoyo: true, repeat: 3 }, a + 0.3);
    // meaning: he strides up and stands huge, the child looks up amazed
    tl.to('#v0far', { opacity: 0, scale: 2.5, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.5, ease: 'power2.in' }, r - 0.4);
    tl.fromTo('#v0big', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.8, ease: 'back.out(1.6)' }, r);
    face(tl, 'v0k', 'op', r + 0.2);
    tl.fromTo('#v0kw', { rotation: 0 }, { rotation: -6, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.4 }, r + 0.2);
    // the curved trunk swings, the body is measured
    tl.fromTo('#v0lt', { opacity: 0 }, { opacity: 1, duration: 0.3 }, r + 0.7);
    tl.fromTo('#v0lb', { opacity: 0 }, { opacity: 1, duration: 0.3 }, r + 1.0);
    swing(tl, '#v0btrunk', '50% 0%', r + 0.5, Math.max(0.6, b - r - 0.5), 12, 0.45);
    swing(tl, '#v0barmR', '0% 100%', r + 0.5, Math.max(0.6, b - r - 0.5), 8, 0.7);
    face(tl, 'v0k', 'sm', r + 1.2);
  };

  // ---------- 1: Suryakoti Samaprabha: shining like a crore suns ----------
  const SUNS = [[90, 80], [200, 160], [320, 60], [430, 130], [570, 70], [690, 150], [800, 60], [910, 140], [130, 260], [870, 270], [60, 400], [940, 400], [250, 330], [760, 340], [380, 230], [620, 230]];
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#3D4E8A', '#F4A261')}${glow('gl1', '#FFF3B0')}
    <rect id="v1day" width="${W}" height="${H}" fill="#FFF6D5" opacity="0"/>
    <g id="v1one">${P('', 170, 120, 0.32, sunFace)}</g>
    ${SUNS.map(([x, y], i) => `<g id="v1s${i}" opacity="0">${P('', x, y, 0.16, sunFace)}</g>`).join('')}
    <g id="v1n1">${tx('1', 250, 130, 70, '#fff', 8)}</g>
    <g id="v1n2" opacity="0">${tx('కోటి సూర్యులు', 190, 515, 46, '#FFD23F', 8)}</g>
    <g id="v1halo" opacity="0"><circle cx="500" cy="330" r="260" fill="url(#gl1)"/></g>
    <g id="v1g" opacity="0.55">${GAN('v1', 500, 470, 0.5)}</g>
    ${[0, 1, 2, 3, 4, 5].map(i => `<g id="v1k${i}" opacity="0">${P('', 300 + (i % 3) * 200, 220 + Math.floor(i / 3) * 170, 1, SH.spark)}</g>`).join('')}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#v1day', '#v1n2', '#v1halo'], { opacity: 0 }, a); tl.set('#v1g', { opacity: 0.55 }, a); tl.set(['#v1one', '#v1n1'], { opacity: 1 }, a);
    SUNS.forEach((_, i) => tl.set(`#v1s${i}`, { opacity: 0 }, a));
    // one small sun, counted
    tl.fromTo('#v1one', { y: 120 }, { y: 0, duration: 0.8, ease: 'power2.out' }, a);
    tl.fromTo('#v1n1', { scale: 0.4 }, { scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, a + 0.4);
    // meaning: suns pop up everywhere, the sky turns to day, Ganesha shines brighter than all
    tl.to('#v1n1', { opacity: 0, duration: 0.2 }, r - 0.2);
    SUNS.forEach(([x, y], i) => tl.fromTo(`#v1s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, r - 0.3 + i * 0.04));
    tl.to('#v1day', { opacity: 0.85, duration: 0.8 }, r);
    tl.fromTo('#v1n2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r + 0.5);
    tl.to('#v1g', { opacity: 1, duration: 0.5 }, r + 0.2);
    tl.fromTo('#v1halo', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.25, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.8, ease: 'power2.out' }, r + 0.3);
    tl.fromTo('#v1halo', { scale: 1.25 }, { scale: 1.1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 1.1) / 0.5)), ease: 'sine.inOut' }, r + 1.1);
    for (let i = 0; i < 6; i++) tl.fromTo(`#v1k${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, yoyo: true, repeat: 1 }, r + 0.6 + i * 0.12);
    swing(tl, '#v1trunk', '50% 0%', a, b - a, 7, 0.8);
  };

  // ---------- 2: Nirvighnam kuru me deva: remove every obstacle for me ----------
  const school = `<rect x="-90" y="-110" width="180" height="120" fill="#F2B33D" stroke="${O}" stroke-width="6"/><path d="M-110 -110 L0 -180 L110 -110Z" fill="${RD}" stroke="${O}" stroke-width="6"/><rect x="-24" y="-60" width="48" height="70" fill="#8B5E34" stroke="${O}" stroke-width="5"/><rect x="-70" y="-90" width="32" height="28" fill="#BFE6FF" stroke="${O}" stroke-width="4"/><rect x="38" y="-90" width="32" height="28" fill="#BFE6FF" stroke="${O}" stroke-width="4"/><path d="M0 -180 V-230" stroke="${O}" stroke-width="5"/><path d="M0 -230 L36 -218 L0 -206Z" fill="#FF8C1A" stroke="${O}" stroke-width="4"/>`;
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#BFE6FF', '#FFF1C9')}
    ${cloud(420, 70, 0.4)}
    <path d="M-20 320 Q300 270 620 310 Q840 330 1020 300 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    <path d="M-20 470 Q300 430 560 446 Q800 460 1020 410" fill="none" stroke="#E8C98A" stroke-width="56" stroke-linecap="round"/>
    ${P('', 880, 400, 0.75, school)}
    <g id="v2gw" opacity="0">${glow('gl2', '#FFF3B0')}<circle cx="150" cy="170" r="140" fill="url(#gl2)"/>${GAN('v2', 150, 290, 0.3)}</g>
    <g id="v2beam" opacity="0"><path d="M210 170 L560 360" stroke="#FFE27A" stroke-width="26" stroke-linecap="round" opacity=".8"/>${P('', 560, 360, 1.4, SH.spark)}</g>
    <g id="v2rock"><g id="v2rk">${P('', 560, 450, 0.85, boulder)}</g></g>
    <g id="v2kw">${KID('v2k', 0, 300, 0.42, { mood: 'sd' })}</g>
    <g id="v2stop" opacity="0">${P('', 420, 230, 0.9, `<circle r="40" fill="#fff" stroke="${O}" stroke-width="6"/>${tx('!', -10, 22, 64, RD, 6)}`)}</g>
    <g id="v2ok" opacity="0">${P('', 880, 160, 1.1, check)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#v2gw', '#v2beam', '#v2ok', '#v2stop'], { opacity: 0 }, a); tl.set('#v2rock', { opacity: 1, x: 0, y: 0, rotation: 0 }, a);
    face(tl, 'v2k', 'sm', a);
    // the child walks to school and is stopped by the boulder
    const stopX = 330, walkIn = Math.min(1.2, Math.max(0.5, r - a - 0.6));
    walk(tl, '#v2kw', 60, stopX, a, walkIn);
    face(tl, 'v2k', 'sd', a + walkIn);
    tl.fromTo('#v2stop', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, a + walkIn);
    // meaning: Ganesha appears, his light rolls the boulder away
    tl.fromTo('#v2gw', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'back.out(2)' }, r - 0.4);
    tl.fromTo('#v2armR', { rotation: 0 }, { rotation: -25, smoothOrigin: false, transformOrigin: '0% 100%', duration: 0.3 }, r - 0.1);
    tl.fromTo('#v2beam', { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 }, r);
    tl.to('#v2stop', { opacity: 0, duration: 0.2 }, r + 0.1);
    tl.to('#v2rock', { x: 520, y: 200, duration: 0.9, ease: 'power2.in' }, r + 0.2);
    tl.to('#v2rk', { rotation: 300, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.9, ease: 'power2.in' }, r + 0.2);
    tl.set('#v2rk', { rotation: 0 }, b);
    face(tl, 'v2k', 'sm', r + 0.4);
    // the road is clear: the child walks on to school
    walk(tl, '#v2kw', stopX, 760, r + 0.6, Math.max(0.6, b - r - 1.0));
    tl.fromTo('#v2ok', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(3)' }, Math.max(r + 0.8, b - 0.7));
  };

  // ---------- 3: Sarvakaryeshu sarvada: in all my work, always ----------
  const sprout = `<path d="M0 0 V-40" stroke="#3E8E41" stroke-width="8" stroke-linecap="round"/><path d="M0 -30 Q-26 -44 -30 -24 Q-14 -18 0 -30Z M0 -36 Q24 -52 30 -30 Q14 -24 0 -36Z" fill="#6BBF59" stroke="${O}" stroke-width="4"/>`;
  const pot = `<path d="M-46 0 L46 0 L36 70 L-36 70Z" fill="#C47A3A" stroke="${O}" stroke-width="6"/><rect x="-52" y="-12" width="104" height="18" rx="6" fill="#C47A3A" stroke="${O}" stroke-width="6"/>`;
  const page = `<rect x="-80" y="-60" width="160" height="120" rx="8" fill="#fff" stroke="${O}" stroke-width="6"/>`;
  const rainbow = ['#E63946', '#FF8C1A', '#FFD23F', '#6BBF59', '#4A7BD8'].map((c, i) => `<path d="M${-60 + i * 9} 30 A${60 - i * 9} ${60 - i * 9} 0 0 1 ${60 - i * 9} 30" fill="none" stroke="${c}" stroke-width="9"/>`).join('');
  const closedBook = `<rect x="-60" y="-44" width="120" height="88" rx="8" fill="${RD}" stroke="${O}" stroke-width="6"/><rect x="-44" y="-30" width="88" height="20" rx="4" fill="#FFD23F" stroke="${O}" stroke-width="4"/>`;
  const sunSmall = `<circle r="34" fill="#FFD23F" stroke="${O}" stroke-width="5"/>`;
  const moon = `<path d="M10 -36 A36 36 0 1 0 10 36 A28 28 0 1 1 10 -36Z" fill="#FFF3B0" stroke="${O}" stroke-width="5"/>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFE3B3', '#FFF6E0')}
    <rect id="v3nt" width="${W}" height="${H}" fill="#1E2A55" opacity="0"/>
    <g transform="translate(500 470)"><g id="v3sun"><g transform="translate(-440 0)">${sunSmall}</g><g transform="translate(440 0)" opacity=".95">${moon}</g></g></g>
    <rect x="-10" y="380" width="1020" height="180" fill="#E9C38B" stroke="${O}" stroke-width="6"/>
    <g id="v3gw">${glow('gl3', '#FFF3B0')}<circle cx="500" cy="120" r="110" fill="url(#gl3)"/>${GAN('v3', 500, 195, 0.2)}</g>
    <g id="v3t0">${P('', 190, 380, 1, `<g id="v3b0">${closedBook}</g><g id="v3b1" opacity="0">${book()}</g>`)}</g>
    <g id="v3t1">${P('', 500, 330, 0.9, `${pot}<g transform="translate(0 -12)"><g id="v3p0">${sprout}</g><g id="v3p1" opacity="0"><path d="M0 0 V-74" stroke="#3E8E41" stroke-width="8"/><g transform="translate(0 -80) scale(1.4)">${SH.marigold}</g></g></g>`)}</g>
    <g id="v3t2">${P('', 810, 370, 1, `${page}<g id="v3d1" opacity="0">${rainbow}</g>`)}</g>
    ${[190, 500, 810].map((x, i) => `<g id="v3c${i}" opacity="0">${P('', x + 70, 300, 0.7, check)}</g>`).join('')}
    <g id="v3kw">${KID('v3k', 340, 330, 0.38, { mood: 'sm' })}</g>
    ${[0, 1, 2].map(i => `<g id="v3sp${i}" opacity="0">${P('', 500, 140, 0.8, SH.spark)}</g>`).join('')}
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b), d = b - a;
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#v3b1', '#v3p1', '#v3d1', '#v3c0', '#v3c1', '#v3c2'], { opacity: 0 }, a); tl.set(['#v3b0', '#v3p0'], { opacity: 1 }, a);
    // "always": the sun goes over and the moon follows, day and night, round and round
    tl.fromTo('#v3sun', { rotation: 42 }, { rotation: 318, smoothOrigin: false, transformOrigin: '50% 50%', duration: d, ease: 'none' }, a);
    tl.fromTo('#v3nt', { opacity: 0 }, { opacity: 0.35, duration: d / 2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, a);
    swing(tl, '#v3trunk', '50% 0%', a, d, 7, 0.8);
    // meaning: each task is done with Ganesha's blessing, one after another
    const step = Math.max(0.5, Math.min(1.4, (b - r - 0.6) / 3));
    [['#v3b0', '#v3b1', 190], ['#v3p0', '#v3p1', 500], [null, '#v3d1', 810]].forEach(([from, to, x], i) => {
      const t = r + i * step;
      tl.fromTo(`#v3sp${i}`, { opacity: 1, x: 0, y: 0 }, { x: x - 500, y: 170, duration: 0.35, ease: 'power1.in' }, t - 0.35);
      tl.set(`#v3sp${i}`, { opacity: 0 }, t);
      if (from) tl.to(from, { opacity: 0, duration: 0.15 }, t);
      tl.fromTo(to, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.35, ease: 'back.out(2.5)' }, t);
      tl.fromTo(`#v3c${i}`, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, t + 0.15);
    });
    tl.fromTo('#v3kw', { y: 0 }, { y: -18, duration: 0.25, yoyo: true, repeat: 3, ease: 'power1.out' }, r + 2 * step + 0.4);
  };

  // small idle life (sun turns, clouds drift, trees sway) so no frame is ever still
  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.spinR').forEach(c => tl.fromTo(c, { rotation: 0 }, { rotation: 25, smoothOrigin: false, transformOrigin: '50% 50%', duration: d, ease: 'none' }, a));
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
    sc.querySelectorAll('.sway').forEach(c => tl.fromTo(c, { rotation: -2 }, { rotation: 2, smoothOrigin: false, transformOrigin: '50% 100%', duration: 1, yoyo: true, repeat: Math.floor(d) }, a));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
