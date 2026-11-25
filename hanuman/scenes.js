// Ramam Skandam (bedtime sloka): one picture-story per line, drawn in a 1000x540 window (#vis). Each scene SHOWS what the line says:
// 0 Rama, Skanda and Hanuman: three empty glowing lotus seats at dusk, then Rama (bow), Skanda (vel and peacock) and Hanuman (gada) appear on them one by one, each named.
// 1 Garuda and mighty Bhima: an empty sky over a field, then Garuda the great eagle swoops in and flaps his wings, and Bhima strides in and lifts his mace so the ground shakes.
// 2 whoever remembers them every night at bedtime: a child sits up in bed at night, then folds hands, closes eyes, and all five heroes appear one by one in the child's thought cloud.
// 3 bad dreams go away, they sleep peacefully: the sleeping child frowns at a bad dream (a ghost and a wolf); Hanuman's light shines in, the bad dream bursts, a happy dream of stars and a rainbow takes its place and the child smiles, Zzz.
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment (the change happens here), b = scene end.
// GRAW is the hero drawing (template/characters/hanuman.svg), injected by build_han.sh.
const SC = (() => {
  const { P, cloud, stars, lotus, tx, SH, KID, RAMA, fig, ghostIn, wolfIn, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const glow = (id, c) => `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="1"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs>`;
  // Hanuman from the hero drawing, ids prefixed so they never clash with the hero; his rock seat sits at (x, y). Moon and stars hidden.
  const HAN = (p, x, y, s, halo = true) => P('', x, y, s, `<g transform="translate(-300 -700)" stroke="${O}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">${GRAW.replace(/id="/g, `id="${p}`).replace(/url\(#/g, `url(#${p}`).replace(`id="${p}moon"`, `id="${p}moon" display="none"`).replace(`id="${p}halo"`, `id="${p}halo"${halo ? '' : ' display="none"'}`)}</g>`);
  // Skanda (Kumaraswamy): a young god with a crown and his vel (leaf-tipped spear), his peacock fanned out behind him
  const vel = `<line x1="100" y1="330" x2="100" y2="-110" stroke="${O}" stroke-width="16" stroke-linecap="round"/><line x1="100" y1="330" x2="100" y2="-110" stroke="#C47A3A" stroke-width="7" stroke-linecap="round"/><path d="M100 -220 Q140 -160 100 -100 Q60 -160 100 -220Z" fill="${GD}" stroke="${O}" stroke-width="6"/>`;
  const fan = `${[...Array(9)].map((_, k) => { const ang = -80 + k * 20; return `<g transform="rotate(${ang})"><path d="M0 0 Q-26 -150 0 -260 Q26 -150 0 0Z" fill="#1FA67A" stroke="${O}" stroke-width="5"/><circle cy="-220" r="20" fill="#2E86DE" stroke="${O}" stroke-width="4"/><circle cy="-220" r="8" fill="#FFD23F"/></g>`; }).join('')}`;
  const SKANDA = (id, x, y, s) => `${P('', x, y + 40 * s, s, fan)}${fig({ id, x, y, s, skin: '#F2B880', cloth: RD, top: '#FF8C1A', crown: 'crown', extra: `<g>${vel}</g>` })}`;
  const BHIMA = (id, x, y, s) => fig({ id, x, y, s, skin: '#C98A5B', cloth: '#2E7D32', crown: 'crown', hold: 'mace', belly: true });
  // Garuda: a great golden eagle with a little crown, wings in their own groups so they can flap
  const wing = (side) => `<path d="M0 0 Q${side * 120} -150 ${side * 300} -110 Q${side * 250} -70 ${side * 280} -40 Q${side * 200} -30 ${side * 230} 10 Q${side * 140} 10 ${side * 150} 50 Q${side * 70} 40 0 40Z" fill="#F2A33A" stroke="${O}" stroke-width="7" stroke-linejoin="round"/><path d="M${side * 60} 10 Q${side * 150} -60 ${side * 250} -80" stroke="${RD}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  const GARUDA = (p, x, y, s) => P('', x, y, s, `<g id="${p}wl">${wing(-1)}</g><g id="${p}wr">${wing(1)}</g>
    <ellipse cx="0" cy="40" rx="60" ry="90" fill="${RD}" stroke="${O}" stroke-width="7"/><path d="M-40 110 L-60 160 M0 120 L0 170 M40 110 L60 160" stroke="${O}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="0" cy="-50" r="56" fill="#FFF6E0" stroke="${O}" stroke-width="7"/><path d="M-34 -96 L34 -96 L28 -126 L12 -112 L0 -138 L-12 -112 L-28 -126Z" fill="${GD}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="-20" cy="-58" r="8" fill="${O}"/><circle cx="20" cy="-58" r="8" fill="${O}"/><path d="M-18 -34 Q0 -44 18 -34 Q10 6 0 14 Q-10 6 -18 -34Z" fill="#FF9F1C" stroke="${O}" stroke-width="5"/>`);
  const label = (t, x, y, id, fs = 44) => `<g id="${id}" opacity="0">${tx(t, x, y, fs, '#FFD23F', 8)}</g>`;
  const seat = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="110" ry="26" fill="#FFE08A" stroke="${O}" stroke-width="6"/>`;
  const face = (tl, id, mood, t) => ['sm', 'sd', 'op'].forEach(k => tl.set(`#${id}-${k}`, { opacity: k === mood ? 1 : 0 }, t));
  const eyes = (tl, id, open, t) => { tl.set(`#${id}-eo`, { opacity: open ? 1 : 0 }, t); tl.set(`#${id}-ec`, { opacity: open ? 0 : 1 }, t); };
  // the change must happen inside the scene even when it is short (sung finale ~4 s) or long (line ~9 s)
  const when = (a, m, b) => Math.min(Math.max(m, a + 0.9), b - 1.4);
  const swing = (tl, sel, org, a, d, deg = 8, per = 0.6) => tl.fromTo(sel, { rotation: -deg }, { rotation: deg, smoothOrigin: false, transformOrigin: org, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)), ease: 'sine.inOut' }, a);
  const pop = (tl, sel, t, d = 0.4) => tl.fromTo(sel, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 100%', duration: d, ease: 'back.out(2.5)' }, t);
  // Hanuman's head nods and his tail sways, so he is never still
  const alive = (tl, p, a, d) => {
    swing(tl, `#${p}headNod`, '50% 90%', a, d, 3, 0.9);
    swing(tl, `#${p}tail`, '100% 100%', a, d, 5, 0.8);
  };
  // folded hands (namaste), drawn in the figure's own coordinates; shown instead of the arms
  const KSKIN = '#E9B68A';
  const nmArms = `<path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M-56 60 L-62 140 L-10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 60 L62 140 L10 118" fill="none" stroke="${O}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M56 60 L62 140 L10 118" fill="none" stroke="${KSKIN}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-16 126 Q-18 80 0 52 Q18 80 16 126Z" fill="${KSKIN}" stroke="${O}" stroke-width="5"/><path d="M0 56 V124" stroke="${O}" stroke-width="3"/>`;
  const night = (id) => `${bg(id, '#1E1B4B', '#4338CA')}${stars([[80, 60], [210, 120], [400, 50], [620, 90], [880, 60], [760, 150]], 12)}`;
  const bedroom = (id) => `${night(id)}
    <rect x="0" y="0" width="${W}" height="${H}" fill="#3B2F6B" opacity=".55"/>
    <g transform="translate(150 70)"><rect width="200" height="170" rx="10" fill="#1E1B4B" stroke="${O}" stroke-width="8"/>${stars([[40, 40], [150, 120], [120, 30]], 9)}<path d="M150 50 A30 30 0 1 0 170 100 A24 24 0 1 1 150 50Z" fill="#FFF1A8" stroke="${O}" stroke-width="4"/><path d="M100 0 V170 M0 85 H200" stroke="${O}" stroke-width="7"/></g>
    <rect x="-10" y="440" width="1020" height="120" fill="#6D4C8F" stroke="${O}" stroke-width="6"/>`;

  // ---------- 0: Ramam Skandam Hanumantam: Rama, Skanda and Hanuman ----------
  const xs0 = [190, 500, 810];
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#FFB86B', '#FFE8B0')}${glow('gl0', '#FFF3B0')}
    ${cloud(140, 70, 0.45)}${cloud(860, 60, 0.4)}
    <path d="M-20 430 Q300 400 620 425 Q860 405 1020 420 V560 H-20Z" fill="#9ED37F" stroke="${O}" stroke-width="6"/>
    ${xs0.map((x, i) => `<g id="z0g${i}" opacity=".5"><circle cx="${x}" cy="300" r="150" fill="url(#gl0)"/></g>${seat(x, 440)}`).join('')}
    <g id="z0h0" opacity="0">${RAMA('z0r', 190, 290, 0.5)}</g>
    <g id="z0h1" opacity="0">${SKANDA('z0s', 500, 290, 0.5)}</g>
    <g id="z0h2" opacity="0">${HAN('z0n', 810, 452, 0.42, false)}</g>
    ${label('రామ', 190, 520, 'z0t0')}${label('స్కంద', 500, 520, 'z0t1')}${label('హనుమ', 810, 520, 'z0t2')}
  </g>`;
  const a0 = (tl, a, m, b) => {
    const r = when(a, m, b), step = Math.max(0.3, Math.min(0.8, (b - 0.6 - r) / 3));
    tl.set('#sc0', { opacity: 1 }, a);
    tl.set(['#z0h0', '#z0h1', '#z0h2', '#z0t0', '#z0t1', '#z0t2'], { opacity: 0 }, a);
    // before: three empty glowing seats, softly pulsing
    xs0.forEach((_, i) => tl.fromTo(`#z0g${i}`, { opacity: 0.35 }, { opacity: 0.7, duration: 0.5, yoyo: true, repeat: 1 }, a + 0.1 + i * 0.15));
    // meaning: the three heroes appear on their seats one by one, each named
    for (let i = 0; i < 3; i++) {
      const t = r + i * step;
      pop(tl, `#z0h${i}`, t, 0.45);
      tl.to(`#z0g${i}`, { opacity: 1, duration: 0.3 }, t);
      tl.fromTo(`#z0t${i}`, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, t + 0.15);
    }
    // each one moves: Rama raises his bow, Skanda lifts his vel, Hanuman nods and blesses
    const e = r + 3 * step;
    swing(tl, '#z0r-aR', '0% 0%', r + 0.4, Math.max(0.6, b - r - 0.4), 6, 0.5);
    tl.fromTo('#z0s', { y: 0 }, { y: -14, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((b - e) / 0.3)), ease: 'power1.out' }, Math.min(e, b - 0.6));
    alive(tl, 'z0n', a, b - a);
  };

  // ---------- 1: Vainateyam Vrikodaram: Garuda and mighty Bhima ----------
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#8FD3FF', '#E6F7FF')}
    ${cloud(160, 80, 0.5)}${cloud(480, 50, 0.4)}
    <path d="M-50 400 Q150 300 380 380 Q600 290 820 370 Q980 320 1130 380 V560 H-50Z" fill="#7CB46B" stroke="${O}" stroke-width="6"/>
    <path d="M-20 440 Q300 420 620 440 Q860 425 1020 435 V560 H-20Z" fill="#B8D86B" stroke="${O}" stroke-width="6"/>
    <g id="z1gw">${GARUDA('z1g', 0, 0, 0.62)}</g>
    <g id="z1bw"><g id="z1bj">${BHIMA('z1b', 290, 250, 0.62)}</g></g>
    ${[0, 1, 2, 3, 4].map(i => `<g id="z1d${i}" opacity="0">${P('', 210 + i * 45, 455, 1, SH.dust)}</g>`).join('')}
    ${label('గరుడ', 720, 520, 'z1t0', 48)}${label('భీమ', 290, 520, 'z1t1', 48)}
  </g>`;
  const a1 = (tl, a, m, b) => {
    const r = when(a, m, b), r2 = Math.min(r + 1.1, b - 0.9);
    tl.set('#sc1', { opacity: 1 }, a);
    tl.set(['#z1t0', '#z1t1'], { opacity: 0 }, a);
    // before: Garuda is far away in the sky, Bhima is not here yet
    tl.set('#z1gw', { x: 1150, y: 40, scale: 0.4, opacity: 1 }, a);
    tl.set('#z1bw', { x: -420 }, a);
    // Garuda swoops in and hovers over the field, flapping
    tl.to('#z1gw', { x: 720, y: 230, scale: 1, duration: Math.min(0.9, r - a), ease: 'power2.out' }, Math.max(a, r - 0.9));
    swing(tl, '#z1gwl', '100% 70%', a, b - a, 14, 0.3);
    swing(tl, '#z1gwr', '0% 70%', a, b - a, -14, 0.3);
    tl.fromTo('#z1t0', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r + 0.1);
    // meaning: Bhima strides in, lifts his mace high and stamps, the ground shakes
    tl.to('#z1bw', { x: 0, duration: 0.6, ease: 'power2.out' }, r2 - 0.6);
    tl.fromTo('#z1b-aR', { rotation: 0 }, { rotation: -28, svgOrigin: '56 60', duration: 0.4, ease: 'back.out(2)' }, r2);
    tl.to('#z1bj', { y: -40, duration: 0.25, yoyo: true, repeat: 1, ease: 'power1.out' }, r2 + 0.3);
    for (let i = 0; i < 5; i++) tl.fromTo(`#z1d${i}`, { opacity: 0.9, scale: 0.4 }, { opacity: 0, scale: 1.6, x: (i - 2) * 30, y: -30, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.6 }, r2 + 0.8);
    tl.fromTo('#sc1', { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 5 }, r2 + 0.8);
    tl.fromTo('#z1t1', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r2 + 0.2);
  };

  // ---------- 2: Shayane Yah Smarennityam: whoever remembers them every night at bedtime ----------
  // the thought cloud holds tiny versions of all five heroes
  const minis = [
    RAMA('z2m0', 0, 0, 0.22),
    SKANDA('z2m1', 0, 0, 0.22),
    HAN('z2m2', 0, 72, 0.19, false),
    GARUDA('z2m3', 0, 20, 0.22),
    BHIMA('z2m4', 0, 0, 0.22),
  ];
  const s2 = `<g id="sc2" opacity="0">${bedroom('g2')}
    <rect x="560" y="330" width="380" height="120" rx="16" fill="#8B5E34" stroke="${O}" stroke-width="7"/>
    <g id="z2kw"><g id="z2kb">${KID('z2k', 750, 285, 0.42, { mood: 'op', sit: true, extra: `<g id="z2k-nm" opacity="0">${nmArms}</g>` })}</g></g>
    <path d="M570 360 Q750 330 930 360 L930 440 L570 440Z" fill="#4FA3E0" stroke="${O}" stroke-width="7"/><path d="M600 390 h300 M600 415 h300" stroke="#fff" stroke-width="4" opacity=".6"/>
    <g id="z2th" opacity="0"><path d="M60 300 Q20 230 80 200 Q70 120 170 120 Q220 60 320 100 Q400 60 460 130 Q540 140 520 220 Q560 290 470 310 Q380 350 280 320 Q170 350 60 300Z" fill="#fff" stroke="${O}" stroke-width="7"/><circle cx="540" cy="300" r="16" fill="#fff" stroke="${O}" stroke-width="5"/><circle cx="600" cy="250" r="10" fill="#fff" stroke="${O}" stroke-width="5"/></g>
    ${minis.map((s, i) => `<g id="z2m${i}w" opacity="0"><g transform="translate(${120 + i * 85} ${[175, 175, 215, 205, 175][i]})">${s}</g></g>`).join('')}
    <g id="z2t" opacity="0">${tx('రోజూ రాత్రి', 750, 120, 50, '#FFD23F', 8)}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    const r = when(a, m, b), step = Math.max(0.2, Math.min(0.55, (b - 0.8 - r) / 5));
    tl.set('#sc2', { opacity: 1 }, a);
    tl.set(['#z2th', '#z2k-nm', '#z2t', ...minis.map((_, i) => `#z2m${i}w`)], { opacity: 0 }, a);
    tl.set(['#z2k-aL', '#z2k-aR'], { opacity: 1 }, a);
    face(tl, 'z2k', 'op', a); eyes(tl, 'z2k', true, a);
    // before: the child sits up in bed at night, wide awake, looking around
    swing(tl, '#z2kb', '50% 100%', a, Math.max(0.6, r - a), 4, 0.5);
    tl.fromTo('#z2t', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, a + 0.3);
    // meaning: hands fold, eyes close, and the heroes fill the child's thoughts one by one
    tl.set(['#z2k-aL', '#z2k-aR'], { opacity: 0 }, r); tl.set('#z2k-nm', { opacity: 1 }, r);
    eyes(tl, 'z2k', false, r + 0.1); face(tl, 'z2k', 'sm', r + 0.1);
    tl.fromTo('#z2th', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '90% 100%', duration: 0.4, ease: 'back.out(2)' }, r + 0.2);
    for (let i = 0; i < 5; i++) pop(tl, `#z2m${i}w`, r + 0.5 + i * step, 0.35);
  };

  // ---------- 3: Duhswapnam Tasya Nashyati: bad dreams go away, they sleep peacefully ----------
  const s3 = `<g id="sc3" opacity="0">${bedroom('g3')}${glow('gl3', '#FFE58A')}
    <g id="z3gl" opacity="0"><circle cx="830" cy="200" r="260" fill="url(#gl3)"/></g>
    <g id="z3h" opacity="0">${HAN('z3n', 860, 300, 0.3)}</g>
    <rect x="120" y="360" width="560" height="90" rx="16" fill="#8B5E34" stroke="${O}" stroke-width="7"/>
    <ellipse cx="200" cy="350" rx="80" ry="34" fill="#fff" stroke="${O}" stroke-width="6"/>
    <g transform="translate(210 336) rotate(-90) scale(.42)"><g id="z3kh">${KID('z3k', 0, 0, 1, { mood: 'sd', eyes: 'closed' })}</g></g>
    <path d="M250 330 Q460 290 680 340 L680 420 L250 420Z" fill="#F28AB2" stroke="${O}" stroke-width="7"/><path d="M290 360 q30 -16 60 0 M420 350 q30 -16 60 0 M550 360 q30 -16 60 0" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>
    <g id="z3bad"><path d="M120 240 Q80 180 140 150 Q150 80 240 90 Q300 40 380 90 Q460 90 450 170 Q480 240 400 250 Q300 280 220 255 Q150 270 120 240Z" fill="#5B4B7A" stroke="${O}" stroke-width="7"/>
      <g id="z3gh">${P('', 230, 170, 0.75, ghostIn)}</g><g id="z3wf">${P('', 360, 185, 0.45, wolfIn)}</g></g>
    <g id="z3good" opacity="0"><path d="M120 240 Q80 180 140 150 Q150 80 240 90 Q300 40 380 90 Q460 90 450 170 Q480 240 400 250 Q300 280 220 255 Q150 270 120 240Z" fill="#E8F6FF" stroke="${O}" stroke-width="7"/>
      ${['#E63946', '#FF9F1C', '#FFD23F', '#2FA36B', '#2E86DE'].map((c, k) => `<path d="M${170 + k * 14} 235 A${120 - k * 14} ${110 - k * 14} 0 0 1 ${410 - k * 14} 235" fill="none" stroke="${c}" stroke-width="13"/>`).join('')}
      ${[[180, 140], [300, 120], [400, 150]].map(([x, y]) => P('', x, y, 0.8, SH.star5)).join('')}</g>
    ${[0, 1, 2, 3, 4, 5].map(i => `<g id="z3p${i}" opacity="0">${P('', 230 + (i % 3) * 90, 150 + Math.floor(i / 3) * 70, 1.2, SH.smoke)}</g>`).join('')}
    ${['z', 'z', 'Z'].map((z, i) => `<g id="z3z${i}" opacity="0">${tx(z, 260 + i * 34, 300 - i * 30, 40 + i * 10, '#FFFFFF', 6, 'sans-serif')}</g>`).join('')}
    <g id="z3t" opacity="0">${tx('హాయిగా నిద్ర', 470, 510, 50, '#FFD23F', 8)}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    const r = when(a, m, b);
    tl.set('#sc3', { opacity: 1 }, a);
    tl.set(['#z3h', '#z3gl', '#z3good', '#z3t', '#z3z0', '#z3z1', '#z3z2'], { opacity: 0 }, a);
    tl.set('#z3bad', { opacity: 1, scale: 1 }, a);
    face(tl, 'z3k', 'sd', a);
    // before: a bad dream, the ghost and the wolf loom and the child tosses
    tl.fromTo('#z3gh', { y: 0 }, { y: -14, duration: 0.4, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.4)), ease: 'sine.inOut' }, a);
    tl.fromTo('#z3wf', { x: 0 }, { x: -12, duration: 0.3, yoyo: true, repeat: Math.max(1, Math.floor((r - a) / 0.3)), ease: 'sine.inOut' }, a);
    swing(tl, '#z3kh', '50% 30%', a, Math.max(0.6, r - a), 4, 0.3);
    // meaning: Hanuman's light shines in, the bad dream bursts into smoke and a happy dream takes its place
    tl.fromTo('#z3h', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(2)' }, r - 0.5);
    tl.to('#z3gl', { opacity: 1, duration: 0.4 }, r - 0.4);
    alive(tl, 'z3n', r - 0.5, Math.max(0.6, b - r + 0.5));
    tl.to('#z3bad', { opacity: 0, duration: 0.25 }, r);
    for (let i = 0; i < 6; i++) tl.fromTo(`#z3p${i}`, { opacity: 0.8, scale: 0.5 }, { opacity: 0, scale: 1.8, smoothOrigin: false, transformOrigin: '50% 50%', duration: 0.7 }, r);
    tl.fromTo('#z3good', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, smoothOrigin: false, transformOrigin: '50% 80%', duration: 0.5, ease: 'back.out(2)' }, r + 0.4);
    face(tl, 'z3k', 'sm', r + 0.4);
    for (let i = 0; i < 3; i++) tl.fromTo(`#z3z${i}`, { opacity: 0, y: 10 }, { opacity: 1, y: -10, duration: 0.5 }, r + 0.7 + i * 0.25);
    tl.fromTo('#z3t', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(2)' }, r + 0.6);
  };

  // small idle life (clouds drift) so no frame is ever still
  const idle = (tl, i, a, b) => {
    const d = Math.max(0.5, b - a), sc = document.getElementById('sc' + i);
    if (!sc) return;
    sc.querySelectorAll('.drift').forEach(c => tl.fromTo(c, { x: 0 }, { x: 40, duration: d, ease: 'none' }, a));
  };
  const acts = [a0, a1, a2, a3];
  return { svg: s0 + s1 + s2 + s3, act: acts.map((f, i) => (tl, a, m, b) => { f(tl, a, m, b); idle(tl, i, a, b); }) };
})();
