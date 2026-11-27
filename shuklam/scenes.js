// Shuklambaradharam: one picture-story per line, drawn in a 1000x540 window (#vis). The deity is Vinayaka, as Telugu homes say it
// before starting any work.
// 0 Shuklambaradharam Vishnum: we see Vinayaka small in a dim sky in plain clothes, then a white silk cloth floats down and wraps him and his glow spreads until it fills the whole sky (he is everywhere).
// 1 Shashivarnam Chaturbhujam: we see Vinayaka at night with two arms, then the full moon rises behind him, he shines moon-bright and two more arms swing out holding a noose and a goad.
// 2 Prasannavadanam Dhyayet: we see a child sitting with open eyes, then the child closes eyes, Vinayaka appears in her thought with a plain face, and Vinayaka's face opens into a big smile with sparkles.
// 3 Sarvavighnopashantaye: we see a child walking to school stopped by a big rock on the road, then Vinayaka's light rolls the rock away and the child walks on to school.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
const SC = (() => {
  const { P, cloud, stars, tx, SH, KID, O, RD, check, boulder, thought } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  const grass = (y, c) => `<path d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const eyes = (tl, id, open, t) => { tl.set(`#${id}-eo`, { opacity: open ? 1 : 0 }, t); tl.set(`#${id}-ec`, { opacity: open ? 0 : 1 }, t); };
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const walk = (tl, sel, x0, x1, t, dur) => {
    tl.fromTo(sel, { x: x0 }, { x: x1, duration: dur, ease: 'none' }, t);
    const n = Math.max(2, Math.round(dur / 0.32));
    tl.fromTo(sel, { y: 0 }, { y: -10, duration: dur / n / 2, ease: 'sine.out', yoyo: true, repeat: n * 2 - 1 }, t);
  };

  // Vinayaka from the hero drawing (feet at x, y), ids prefixed with p. Extras, all hidden until animated:
  // p+white = white silk over his body, p+arm3/p+arm4 = the extra two arms (noose, goad), p+m0/p+m1 = plain mouth / big smile.
  const SKIN = '#FDB9A0';
  const arm = (id, d, hx, hy, held) => `<g id="${id}" opacity="0"><path d="${d}" fill="none" stroke="${O}" stroke-width="58"/><path d="${d}" fill="none" stroke="${SKIN}" stroke-width="46"/><circle cx="${hx}" cy="${hy}" r="30" fill="${SKIN}"/>${held}</g>`;
  const noose = (x, y) => `<ellipse cx="${x}" cy="${y - 70}" rx="34" ry="44" fill="none" stroke="${O}" stroke-width="16"/><ellipse cx="${x}" cy="${y - 70}" rx="34" ry="44" fill="none" stroke="#E8A23A" stroke-width="9"/><path d="M${x} ${y - 26} V${y}" stroke="#E8A23A" stroke-width="9"/>`;
  const goad = (x, y) => `<path d="M${x} ${y + 30} V${y - 120}" stroke="${O}" stroke-width="18" stroke-linecap="round"/><path d="M${x} ${y + 30} V${y - 120}" stroke="#C9CED6" stroke-width="9" stroke-linecap="round"/><path d="M${x} ${y - 120} Q${x + 50} ${y - 130} ${x + 40} ${y - 80}" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M${x} ${y - 120} Q${x + 50} ${y - 130} ${x + 40} ${y - 80}" fill="none" stroke="#C9CED6" stroke-width="8" stroke-linecap="round"/>`;
  const GAN = (p, x, y, s, o = {}) => {
    let g = GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}mouse"`, `id="${p}mouse" display="none"`);
    if (o.halo === false) g = g.replace(`id="${p}halo"`, `id="${p}halo" display="none"`);
    if (o.four) g = g.replace(`<g id="${p}bodyG"`, arm(p + 'arm3', 'M190 450 Q80 480 50 390', 50, 386, noose(50, 386)) + arm(p + 'arm4', 'M410 450 Q520 480 550 390', 550, 386, goad(550, 386)) + `<g id="${p}bodyG"`);
    if (o.white) g = g.replace(`<g id="${p}armL"`, `<g id="${p}white" opacity="0"><path d="M150 540 Q300 610 450 540 L452 585 Q300 650 148 585 Z" fill="#FFFFFF"/><path d="M180 560 Q300 610 420 560" fill="none" stroke="#DDE4EE" stroke-width="6"/><path d="M210 400 Q300 470 410 560" fill="none" stroke="#2B1407" stroke-width="52"/><path d="M210 400 Q300 470 410 560" fill="none" stroke="#FFFFFF" stroke-width="40"/></g><g id="${p}armL"`);
    if (o.smile) g = g.replace('<path d="M328 300 Q350 320 374 300" fill="none" stroke-width="6"/>', `<g id="${p}m0"><path d="M332 306 L372 306" fill="none" stroke-width="6"/></g><g id="${p}m1" opacity="0"><path d="M300 288 Q352 380 410 288 Z" fill="#B23A48" stroke-width="7"/><path d="M330 300 Q352 318 378 300" fill="none" stroke="#fff" stroke-width="7"/></g>`);
    return P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${g}</g>`);
  };

  // ---------- 0: Shuklambaradharam Vishnum: dressed in white, he is everywhere ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#5B6FA8', '#B8C6E8')}${glow('gl0', '#FFFFFF')}
    <circle id="u0glow" cx="500" cy="300" r="170" fill="url(#gl0)" opacity=".5"/>
    ${grass(470, '#8FBF7A')}
    <g id="u0g">${GAN('u0', 500, 500, 0.56, { white: true, halo: false })}</g>
    <g id="u0cloth"><path d="M380 -10 Q500 30 620 -10 Q640 60 600 110 Q500 80 400 110 Q360 60 380 -10Z" fill="#FFFFFF" stroke="${O}" stroke-width="6"/><path d="M420 30 Q500 56 580 30" fill="none" stroke="#E3E8F0" stroke-width="7"/></g>
    <g id="u0sky" opacity="0">${stars([[90, 80], [210, 150], [330, 60], [680, 70], [800, 150], [920, 80], [140, 300], [870, 300]], 18)}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set('#u0white', { opacity: 0 }, a); tl.set('#u0sky', { opacity: 0 }, a); tl.set('#u0glow', { opacity: 0.5, scale: 1 }, a);
    // the white silk floats down from the sky, swaying
    tl.fromTo('#u0cloth', { opacity: 1, y: -120, x: 0 }, { y: 250, duration: Math.max(0.6, r - a), ease: 'sine.inOut' }, a);
    tl.fromTo('#u0cloth', { rotation: -8 }, { rotation: 8, smoothOrigin: false, transformOrigin: '50% 0%', duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.5)), ease: 'sine.inOut' }, a);
    // meaning: the cloth wraps him (his clothes turn white), then his glow spreads until it fills the whole sky
    tl.to('#u0cloth', { opacity: 0, scale: 0.6, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3 }, r);
    tl.to('#u0white', { opacity: 1, duration: 0.4 }, r);
    tl.to('#u0glow', { opacity: 1, scale: 4, smoothOrigin: false, transformOrigin: '50% 50%', duration: Math.max(0.8, Math.min(2, b - r - 0.3)), ease: 'power1.out' }, r + 0.3);
    tl.to('#u0sky', { opacity: 1, duration: 0.6 }, r + 0.6);
    tl.fromTo('#u0g', { y: 0 }, { y: -12, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.4) / 0.6)), ease: 'sine.inOut' }, r + 0.4);
  };

  // ---------- 1: Shashivarnam Chaturbhujam: bright as the moon, four arms ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#0F1A40', '#2B3F8F')}${glow('gl1', '#FFF8DC')}
    ${stars([[80, 70], [180, 160], [300, 50], [720, 60], [860, 150], [940, 60], [120, 330], [900, 320]], 14)}
    <g id="u1moon"><circle cx="500" cy="210" r="210" fill="url(#gl1)" opacity=".8"/><circle cx="500" cy="210" r="120" fill="#FFF8DC" stroke="${O}" stroke-width="6"/><circle cx="460" cy="180" r="16" fill="#EDE3BF"/><circle cx="540" cy="240" r="22" fill="#EDE3BF"/><circle cx="520" cy="160" r="10" fill="#EDE3BF"/></g>
    ${grass(470, '#2E5E4E')}
    <g id="u1g">${GAN('u1', 500, 490, 0.44, { four: true, halo: false })}</g>
    <circle id="u1shine" cx="500" cy="330" r="150" fill="url(#gl1)" opacity="0"/>
    <g id="u1n" opacity="0">${tx('4', 860, 300, 120, '#FFE066', 8)}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#u1arm3', '#u1arm4', '#u1shine', '#u1n'], { opacity: 0 }, a);
    // the full moon rises behind him
    tl.fromTo('#u1moon', { y: 300 }, { y: 0, duration: Math.max(0.6, r - a), ease: 'power1.out' }, a);
    // meaning: he shines moon-bright and two more arms swing out, holding a noose and a goad
    tl.fromTo('#u1shine', { opacity: 0 }, { opacity: 0.9, duration: 0.5 }, r - 0.2);
    tl.fromTo('#u1arm3', { opacity: 0, rotation: 70 }, { opacity: 1, rotation: 0, smoothOrigin: false, transformOrigin: '100% 100%', duration: 0.5, ease: 'back.out(2)' }, r + 0.1);
    tl.fromTo('#u1arm4', { opacity: 0, rotation: -70 }, { opacity: 1, rotation: 0, smoothOrigin: false, transformOrigin: '0% 100%', duration: 0.5, ease: 'back.out(2)' }, r + 0.3);
    tl.fromTo('#u1n', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, r + 0.8);
    tl.to('#u1shine', { opacity: 0.55, duration: 0.5, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.5) / 0.5)) }, r + 0.4);
  };

  // ---------- 2: Prasannavadanam Dhyayet: think of his smiling face ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2', '#FFE9C7', '#F7C98B')}
    <rect y="430" width="${W}" height="110" fill="#C98F5A" stroke="${O}" stroke-width="6"/>
    <rect x="130" y="440" width="260" height="40" rx="12" fill="#E63946" stroke="${O}" stroke-width="6"/>
    <g id="u2kw">${KID('u2k', 260, 330, 0.42, { sit: true, mood: 'sm' })}</g>
    <g id="u2th" opacity="0">${P('', 690, 240, 1, thought(210, ''))}</g>
    <g id="u2gw" opacity="0">${GAN('u2', 690, 448, 0.42, { smile: true, halo: false })}</g>
    <g id="u2sp" opacity="0">${P('', 540, 110, 0.9, SH.spark)}${P('', 850, 90, 1.1, SH.spark)}${P('', 880, 330, 0.8, SH.spark)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#u2th', '#u2gw', '#u2sp', '#u2m1'], { opacity: 0 }, a); tl.set('#u2m0', { opacity: 1 }, a);
    eyes(tl, 'u2k', true, a); face(tl, 'u2k', 'sm', a);
    // the child sits down, closes eyes and folds hands; Vinayaka appears in the thought bubble with a plain face
    const fold = Math.min(r - 0.6, a + 0.5);
    eyes(tl, 'u2k', false, fold); face(tl, 'u2k', 'sd', fold);
    tl.fromTo('#u2th', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(2)' }, fold + 0.2);
    tl.to('#u2gw', { opacity: 1, duration: 0.3 }, fold + 0.4);
    // meaning: his face opens into a big warm smile, sparkles pop and the child smiles too
    tl.set('#u2m0', { opacity: 0 }, r); tl.fromTo('#u2m1', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 0%', duration: 0.4, ease: 'back.out(3)' }, r);
    tl.fromTo('#u2gw', { y: 0 }, { y: -14, duration: 0.25, yoyo: true, repeat: 3 }, r);
    tl.fromTo('#u2sp', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)' }, r + 0.2);
    face(tl, 'u2k', 'sm', r + 0.4);
    tl.to('#u2sp', { opacity: 0.4, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((b - r - 0.6) / 0.4)) }, r + 0.6);
  };

  // ---------- 3: Sarvavighnopashantaye: so that every obstacle goes away ----------
  const school = `<rect x="-90" y="-110" width="180" height="120" fill="#F2B33D" stroke="${O}" stroke-width="6"/><path d="M-110 -110 L0 -180 L110 -110Z" fill="${RD}" stroke="${O}" stroke-width="6"/><rect x="-24" y="-60" width="48" height="70" fill="#8B5E34" stroke="${O}" stroke-width="5"/>`;
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#BFE6FF', '#FFF1C9')}
    ${cloud(420, 70, 0.4)}
    <path d="M-20 320 Q300 270 620 310 Q840 330 1020 300 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    <path d="M-20 470 Q300 430 560 446 Q800 460 1020 410" fill="none" stroke="#E8C98A" stroke-width="56" stroke-linecap="round"/>
    ${P('', 880, 400, 0.75, school)}
    <g id="u3gw" opacity="0">${glow('gl3', '#FFF3B0')}<circle cx="150" cy="170" r="140" fill="url(#gl3)"/>${GAN('u3', 150, 290, 0.3, { halo: false })}</g>
    <g id="u3beam" opacity="0"><path d="M210 170 L560 360" stroke="#FFE27A" stroke-width="26" stroke-linecap="round" opacity=".8"/>${P('', 560, 360, 1.4, SH.spark)}</g>
    <g id="u3rock"><g id="u3rk">${P('', 560, 450, 0.85, boulder)}</g></g>
    <g id="u3kw">${KID('u3k', 0, 300, 0.42, { mood: 'sd' })}</g>
    <g id="u3stop" opacity="0">${P('', 420, 230, 0.9, `<circle r="40" fill="#fff" stroke="${O}" stroke-width="6"/>${tx('!', -10, 22, 64, RD, 6)}`)}</g>
    <g id="u3ok" opacity="0">${P('', 880, 160, 1.1, check)}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#u3gw', '#u3beam', '#u3ok', '#u3stop'], { opacity: 0 }, a); tl.set('#u3rock', { opacity: 1, x: 0, y: 0 }, a);
    face(tl, 'u3k', 'sm', a);
    // the child walks to school and is stopped by the rock
    const stopX = 330, walkIn = Math.min(1.2, Math.max(0.5, r - a - 0.6));
    walk(tl, '#u3kw', 60, stopX, a, walkIn);
    face(tl, 'u3k', 'sd', a + walkIn);
    tl.fromTo('#u3stop', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' }, a + walkIn);
    // meaning: Vinayaka appears and his light rolls the rock away
    tl.fromTo('#u3gw', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: 0.5, ease: 'back.out(2)' }, r - 0.4);
    tl.fromTo('#u3beam', { opacity: 0 }, { opacity: 1, duration: 0.2, yoyo: true, repeat: 1 }, r);
    tl.to('#u3stop', { opacity: 0, duration: 0.2 }, r + 0.1);
    tl.to('#u3rock', { x: 520, y: 200, duration: 0.9, ease: 'power2.in' }, r + 0.2);
    tl.fromTo('#u3rk', { rotation: 0 }, { rotation: 300, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.9, ease: 'power2.in' }, r + 0.2);
    tl.set('#u3rk', { rotation: 0 }, b);
    face(tl, 'u3k', 'sm', r + 0.4);
    // the road is clear: the child walks on to school
    walk(tl, '#u3kw', stopX, 760, r + 0.6, Math.max(0.6, b - r - 1.0));
    tl.fromTo('#u3ok', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(3)' }, Math.max(r + 0.8, b - 0.7));
  };

  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.twk').forEach((c, k) => tl.fromTo(c, { opacity: 0.4 }, { opacity: 1, duration: 0.5, yoyo: true, repeat: Math.floor(d / 0.5) }, a + k * 0.1));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
