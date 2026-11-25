// Surya (Japakusuma): one picture-story per line, drawn in a 1000x540 window (#vis).
// SC.act[i](tl, a, m, b): a = scene start, m = the "meaning" moment, b = scene end.
const SC = (() => {
  const { P, stars, tree, lotus, tx, SH, KID, SAGE, DEVI, ghostIn, demonIn, birdIn, sunFace, O, GD, RD } = ST;
  const W = 1000, H = 540;
  const bg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const grass = (y, c, id = '') => `<path${id ? ` id="${id}"` : ''} d="M-20 ${y} Q250 ${y - 24} 500 ${y} Q750 ${y + 20} 1020 ${y - 8} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const hills = (y, c) => `<path d="M-20 ${y} Q120 ${y - 90} 260 ${y - 20} Q420 ${y - 120} 600 ${y - 30} Q760 ${y - 110} 1020 ${y - 20} V560 H-20Z" fill="${c}" stroke="${O}" stroke-width="6"/>`;
  const rep = (d, len) => Math.max(1, Math.floor(len / d));
  // a sun: s = size; id goes on an unscaled wrapper so x/y tweens are in window px
  const sun = (id, x, y, s, red) => P(id, x, y, 1, P('', 0, 0, s, red ? sunFace.replace(/#FFD23F/g, '#F0452E').replace(/#FFB703/g, '#FF7A1A') : sunFace));
  const hibiscus = (c = '#E8322E') => `${[0, 72, 144, 216, 288].map(r => `<path d="M0 0 C-58 -26 -70 -118 0 -128 C70 -118 58 -26 0 0Z" fill="${c}" stroke="${O}" stroke-width="6" transform="rotate(${r})"/>`).join('')}
    <circle r="26" fill="#8E1B1B" stroke="${O}" stroke-width="5"/><path d="M0 0 Q30 -40 46 -96" stroke="${O}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M0 0 Q30 -40 46 -96" stroke="#FFE066" stroke-width="5" fill="none" stroke-linecap="round"/>${[[46, -96], [36, -104], [56, -100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#FFD23F" stroke="${O}" stroke-width="3"/>`).join('')}`;
  const leaf = (x, y, r) => `<path d="M0 0 Q40 -40 90 0 Q40 40 0 0Z" fill="#3E8E41" stroke="${O}" stroke-width="5" transform="translate(${x} ${y}) rotate(${r})"/>`;
  const namaste = (id) => `<g id="${id}-nm" opacity="0"><path d="M-24 160 Q-30 84 0 50 Q30 84 24 160Z" fill="#E9B68A" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><path d="M0 56 V160" stroke="${O}" stroke-width="4"/></g>`;
  const mood = (tl, id, happy, t) => {
    tl.set(`#${id}-sd`, { opacity: happy ? 0 : 1 }, t); tl.set(`#${id}-sm`, { opacity: happy ? 1 : 0 }, t);
    tl.set(`#${id}-ec`, { opacity: happy ? 0 : 1 }, t); tl.set(`#${id}-eo`, { opacity: happy ? 1 : 0 }, t);
  };

  // ---------- 0: Japakusuma sankasham: shining red like the hibiscus flower ----------
  const s0 = `<g id="sc0" opacity="0">${bg('g0', '#FFE9BF', '#FFB08A')}
    <g id="s0sunW">${sun('s0sun', 790, 470, 0.42, true)}</g>
    ${hills(420, '#E9A35C')}${grass(470, '#7CC46A')}
    <circle id="s0glowF" cx="200" cy="270" r="120" fill="#FF6B5A" opacity="0"/>
    ${P('', 200, 470, 1, `<path d="M-120 0 Q-150 -120 -60 -170 Q0 -230 70 -170 Q150 -110 120 0Z" fill="#4FA34F" stroke="${O}" stroke-width="6"/>${leaf(-90, -90, -150)}${leaf(60, -120, -30)}${leaf(-20, -170, -100)}`)}
    ${P('s0hib', 200, 270, 0.9, hibiscus())}
    ${KID('s0k', 500, 318, 0.5, { flip: true })}
    <g id="s0eq" opacity="0">${[0, 44].map(dy => `<rect x="440" y="${112 + dy}" width="120" height="26" rx="13" fill="#FFF3B0" stroke="${O}" stroke-width="7"/>`).join('')}</g>
    <g id="s0buds">${[0, 1, 2].map(i => P(`s0b${i}`, 90 + i * 70, 420 - (i % 2) * 40, 0.3, hibiscus())).join('')}</g>
  </g>`;
  const a0 = (tl, a, m, b) => {
    tl.set('#sc0', { opacity: 1 }, a);
    tl.fromTo('#s0hib', { scale: 0.05, rotation: -120 }, { scale: 1, rotation: 0, transformOrigin: '50% 50%', duration: 1.1, ease: 'back.out(1.6)' }, a + 0.2);
    tl.fromTo('#s0sun', { y: 0 }, { y: -300, duration: Math.max(1.2, m - a), ease: 'sine.out' }, a);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s0b${i}`, { scale: 0 }, { scale: 1, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(2)' }, a + 0.8 + i * 0.25);
    // the kid looks from flower to sun
    tl.fromTo('#s0k', { rotation: -8 }, { rotation: 8, transformOrigin: '50% 100%', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7, b - a) }, a);
    // meaning: both glow the same red, "=" pops between them
    tl.fromTo('#s0eq', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, transformOrigin: '50% 50%', duration: 0.45, ease: 'back.out(3)' }, m);
    tl.fromTo('#s0glowF', { opacity: 0 }, { opacity: 0.55, duration: 0.4 }, m);
    tl.fromTo(['#s0hib', '#s0sun'], { scale: 1 }, { scale: 1.12, transformOrigin: '50% 50%', duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: rep(0.45, b - m) }, m + 0.1);
    tl.fromTo('#s0k', { y: 0 }, { y: -26, duration: 0.3, yoyo: true, repeat: 3, ease: 'power1.out' }, m + 0.2);
  };

  // ---------- 1: Kashyapeyam Mahadyutim: son of sage Kashyapa, of great brilliance ----------
  const hut = `<path d="M-90 0 V-90 H90 V0Z" fill="#D9A066" stroke="${O}" stroke-width="6"/><path d="M-120 -80 L0 -170 L120 -80Z" fill="#C8963E" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><rect x="-26" y="-60" width="52" height="60" fill="#6B3A1E" stroke="${O}" stroke-width="5"/>`;
  const s1 = `<g id="sc1" opacity="0">${bg('g1', '#DDF3FF', '#FFF1C9')}
    <g id="s1rays" opacity="0">${P('', 500, 210, 1, `<g id="s1spin">${[...Array(16)].map((_, i) => `<path d="M0 0 L-40 -700 L40 -700Z" fill="#FFE066" opacity=".7" transform="rotate(${i * 22.5})"/>`).join('')}</g>`)}</g>
    ${P('', 860, 470, 0.8, hut)}${tree(80, 470, 0.45)}
    ${grass(460, '#9ED37F')}
    ${tx('కశ్యప మహర్షి', 210, 70, 50, '#FFF3B0', 8)}${tx('అదితి మాత', 790, 70, 50, '#FFF3B0', 8)}
    ${SAGE('s1sg', 210, 252, 0.52, { sit: true })}
    ${DEVI('s1dv', 790, 252, 0.52, '#FF6FA0', '#FFC93C', { sit: true, hold: 'abhaya' })}
    ${P('', 500, 470, 1, `<ellipse rx="110" ry="24" fill="#FF8FB1" stroke="${O}" stroke-width="6"/>${[-60, -30, 0, 30, 60].map(r => `<path d="M0 0 Q-24 -46 0 -86 Q24 -46 0 0Z" fill="#FFB3C8" stroke="${O}" stroke-width="5" transform="rotate(${r})"/>`).join('')}`)}
    <g id="s1sunW">${sun('s1sun', 500, 420, 0.22)}</g>
    <g id="s1flash" opacity="0"><rect width="${W}" height="${H}" fill="#FFF8D0"/></g>
    <g id="s1sp">${[...Array(8)].map((_, i) => P(`s1s${i}`, 500 + Math.cos(i * 0.785) * 300, 300 + Math.sin(i * 0.785) * 130, 1, SH.spark, 0)).join('')}</g>
  </g>`;
  const a1 = (tl, a, m, b) => {
    tl.set('#sc1', { opacity: 1 }, a);
    tl.fromTo('#s1sun', { scale: 0, y: 0 }, { scale: 1, y: -130, transformOrigin: '50% 50%', duration: 1.2, ease: 'back.out(1.6)' }, a + 0.2);
    tl.fromTo('#s1sun', { rotation: -6 }, { rotation: 6, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: rep(0.6, m - a), ease: 'sine.inOut' }, a + 1.2);
    ['#s1sg', '#s1dv'].forEach((k, i) => tl.fromTo(k, { rotation: 0 }, { rotation: i ? -6 : 6, transformOrigin: '50% 100%', duration: 0.8, yoyo: true, repeat: rep(0.8, b - a), ease: 'sine.inOut' }, a));
    // meaning: great light bursts out
    tl.fromTo('#s1flash', { opacity: 0 }, { opacity: 0.85, duration: 0.25 }, m);
    tl.to('#s1flash', { opacity: 0, duration: 0.9 }, m + 0.3);
    tl.fromTo('#s1rays', { opacity: 0 }, { opacity: 1, duration: 0.4 }, m);
    tl.fromTo('#s1spin', { rotation: 0 }, { rotation: 90 * Math.max(1, (b - m) / 2), svgOrigin: '0 0', duration: Math.max(0.5, b - m), ease: 'none' }, m);
    tl.to('#s1sun', { scale: 1.9, y: -190, duration: 0.7, ease: 'back.out(2)' }, m);
    for (let i = 0; i < 8; i++) tl.fromTo(`#s1s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.2, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, m + 0.3 + i * 0.08);
  };

  // ---------- 2: Tamorim Sarvapapaghnam: enemy of darkness, removes all bad ----------
  const s2 = `<g id="sc2" opacity="0">${bg('g2n', '#14123A', '#3A2F6B')}
    <g id="s2day" opacity="0">${bg('g2d', '#BFE9FF', '#FFE8B0')}</g>
    <g id="s2st">${stars([[80, 60], [230, 120], [380, 50], [640, 90], [930, 60], [860, 170]], 12)}</g>
    <g id="s2sunW">${sun('s2sun', 820, 640, 0.4)}</g>
    ${hills(430, '#5E7F55')}${grass(475, '#4E8A45')}
    <g id="s2dk" opacity=".55"><rect width="${W}" height="${H}" fill="#0B0A26"/></g>
    ${[[150, 230, 'g'], [300, 140, 'g'], [700, 150, 'd'], [860, 300, 'g']].map(([x, y, k], i) => P(`s2gh${i}`, x, y, 0.75, k === 'g' ? ghostIn : demonIn())).join('')}
    ${[[380, 330], [640, 320], [500, 120]].map(([x, y], i) => P(`s2c${i}`, x, y, 0.55, `<path d="M-90 20 Q-100 -20 -60 -26 Q-50 -70 0 -60 Q40 -90 70 -50 Q110 -50 104 -10 Q130 10 100 30 Z" fill="#55506A" stroke="${O}" stroke-width="6"/><path d="M-40 0 l20 -16 l10 20 l24 -18" stroke="#2A2638" stroke-width="6" fill="none"/>`)).join('')}
    ${KID('s2k', 500, 318, 0.5, { mood: 'sd', eyes: 'closed' })}
    <g id="s2beam" opacity="0">${[...Array(6)].map((_, i) => `<path d="M820 160 L${120 + i * 120} 540 L${170 + i * 120} 540Z" fill="#FFF3B0" opacity=".45"/>`).join('')}</g>
    <g id="s2sp">${[...Array(6)].map((_, i) => P(`s2s${i}`, 180 + i * 130, 160 + (i % 2) * 140, 1, SH.gold, 0)).join('')}</g>
  </g>`;
  const a2 = (tl, a, m, b) => {
    tl.set('#sc2', { opacity: 1 }, a);
    mood(tl, 's2k', false, a);
    tl.set('#s2dk', { opacity: 0.55 }, a); tl.set('#s2day', { opacity: 0 }, a); tl.set('#s2st', { opacity: 1 }, a);
    for (let i = 0; i < 4; i++) tl.fromTo(`#s2gh${i}`, { x: 0, y: 0, opacity: 1 }, { x: i % 2 ? -18 : 18, y: -14, duration: 0.7, yoyo: true, repeat: rep(0.7, m - a), ease: 'sine.inOut' }, a);
    for (let i = 0; i < 3; i++) tl.fromTo(`#s2c${i}`, { scale: 1, opacity: 1 }, { scale: 1.08, transformOrigin: '50% 50%', duration: 0.6, yoyo: true, repeat: rep(0.6, m - a), ease: 'sine.inOut' }, a);
    tl.fromTo('#s2k', { x: 0 }, { x: 5, duration: 0.12, yoyo: true, repeat: rep(0.12, m - a), ease: 'none' }, a);
    // meaning: the sun rises, darkness and all the bad things run away
    tl.fromTo('#s2sun', { y: 0 }, { y: -500, duration: 0.9, ease: 'power2.out' }, m - 0.3);
    tl.to('#s2dk', { opacity: 0, duration: 0.8 }, m); tl.to('#s2day', { opacity: 1, duration: 0.8 }, m); tl.to('#s2st', { opacity: 0, duration: 0.5 }, m);
    tl.fromTo('#s2beam', { opacity: 0 }, { opacity: 1, duration: 0.3 }, m + 0.2);
    tl.to('#s2beam', { opacity: 0.3, duration: 0.8 }, m + 1.2);
    for (let i = 0; i < 4; i++) tl.to(`#s2gh${i}`, { x: i < 2 ? -700 : 700, y: -80, opacity: 0, duration: 0.9, ease: 'power2.in' }, m + 0.3 + i * 0.1);
    for (let i = 0; i < 3; i++) tl.to(`#s2c${i}`, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.in(2)' }, m + 0.4 + i * 0.12);
    for (let i = 0; i < 6; i++) tl.fromTo(`#s2s${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, rotation: 90, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)' }, m + 0.6 + i * 0.1);
    mood(tl, 's2k', true, m + 0.6);
    tl.fromTo('#s2k', { y: 0 }, { y: -36, duration: 0.3, yoyo: true, repeat: 5, ease: 'power1.out' }, m + 0.8);
  };

  // ---------- 3: Pranatosmi Divakaram: I bow to the Sun, the maker of the day ----------
  const kids3 = [[230, '#FF8C1A'], [500, '#2E86DE'], [770, '#E74C8B']];
  const s3 = `<g id="sc3" opacity="0">${bg('g3', '#FFD9A0', '#FFF4D6')}
    <g id="s3day" opacity="0">${bg('g3d', '#8FD3FF', '#E8F8FF')}</g>
    <g id="s3rays" opacity=".6">${P('', 500, 130, 1, `<g id="s3spin">${[...Array(12)].map((_, i) => `<path d="M0 0 L-30 -600 L30 -600Z" fill="#FFF3B0" transform="rotate(${i * 30})"/>`).join('')}</g>`)}</g>
    <g id="s3sunW">${sun('s3sun', 500, 130, 0.36)}</g>
    ${hills(420, '#8CCB6E')}${grass(470, '#6BBF59')}
    <g id="s3birds">${[0, 1, 2].map(i => P(`s3bd${i}`, -60, 90 + i * 50, 0.9, birdIn('#fff'))).join('')}</g>
    ${kids3.map(([x, c], i) => KID(`s3k${i}`, x, 318, 0.5, { top: c, eyes: 'closed', extra: namaste(`s3k${i}`) })).join('')}
    <g id="s3fl">${[110, 370, 630, 890].map((x, i) => P(`s3f${i}`, x, 500, 0.5, `<g transform="translate(0 0)">${[-50, -25, 0, 25, 50].map(r => `<path d="M0 0 Q-26 -50 0 -96 Q26 -50 0 0Z" fill="#FF8FB1" stroke="${O}" stroke-width="7" transform="rotate(${r})"/>`).join('')}<circle cy="-10" r="12" fill="${GD}" stroke="${O}" stroke-width="4"/></g>`)).join('')}</g>
  </g>`;
  const a3 = (tl, a, m, b) => {
    tl.set('#sc3', { opacity: 1 }, a); tl.set('#s3day', { opacity: 0 }, a);
    tl.fromTo('#s3spin', { rotation: 0 }, { rotation: 60, svgOrigin: '0 0', duration: Math.max(1, b - a), ease: 'none' }, a);
    tl.fromTo('#s3sun', { scale: 1 }, { scale: 1.08, transformOrigin: '50% 50%', duration: 0.7, yoyo: true, repeat: rep(0.7, b - a), ease: 'sine.inOut' }, a);
    for (let i = 0; i < 3; i++) {
      const k = `#s3k${i}`;
      mood(tl, `s3k${i}`, false, a); tl.set(`#s3k${i}-sd`, { opacity: 0 }, a); tl.set(`#s3k${i}-sm`, { opacity: 1 }, a);
      tl.set([`${k}-aL`, `${k}-aR`], { opacity: 0 }, a);
      tl.fromTo(`${k}-nm`, { opacity: 0 }, { opacity: 1, duration: 0.3 }, a + 0.1);
      // bow: dip and lean forward, again and again
      tl.fromTo(k, { y: 0, scaleY: 1 }, { y: 26, scaleY: 0.9, transformOrigin: '50% 100%', duration: 0.6, yoyo: true, repeat: rep(0.6, m - a) | 1, ease: 'sine.inOut' }, a + 0.3 + i * 0.12);
      tl.fromTo(`${k}-head`, { y: 0 }, { y: 16, duration: 0.6, yoyo: true, repeat: rep(0.6, m - a) | 1, ease: 'sine.inOut' }, a + 0.3 + i * 0.12);
    }
    for (let i = 0; i < 4; i++) tl.fromTo(`#s3f${i}`, { scale: 0.2 }, { scale: 0.2, duration: 0.01 }, a);
    // meaning: the Sun makes the day: sky turns bright, flowers open, birds fly
    tl.to('#s3day', { opacity: 1, duration: 0.9 }, m);
    for (let i = 0; i < 4; i++) tl.to(`#s3f${i}`, { scale: 1, transformOrigin: '50% 100%', duration: 0.6, ease: 'back.out(2.5)' }, m + 0.2 + i * 0.15);
    for (let i = 0; i < 3; i++) {
      tl.fromTo(`#s3bd${i}`, { x: 0, y: 0 }, { x: 1150, y: -40 + i * 20, duration: Math.max(1.5, b - m), ease: 'none' }, m + i * 0.3);
      tl.fromTo(`#s3bd${i}`, { scaleY: 1 }, { scaleY: -0.5, transformOrigin: '50% 50%', duration: 0.2, yoyo: true, repeat: rep(0.2, b - m) }, m);
      mood(tl, `s3k${i}`, true, m + 0.3);
      tl.fromTo(`#s3k${i}`, { y: 0 }, { y: -30, duration: 0.3, yoyo: true, repeat: 3, ease: 'power1.out', immediateRender: false }, m + 0.5 + i * 0.1);
    }
  };
  return { svg: s0 + s1 + s2 + s3, act: [a0, a1, a2, a3] };
})();
