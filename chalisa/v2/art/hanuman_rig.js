// Rigged full-body Hanuman for the Chalisa reel. HM.svg() returns an <svg> string (viewBox 0 0 600 900).
// Pivots (screen coords): neck 300 385, shoulders 222/378 425, elbows 190/410 525, hips 268/332 605, knees 262/338 725, root 300 605.
const HM = (() => {
  const O = '#2B1407', SK = '#D9662B', SK2 = '#B9501F', CR = '#F9D9A8', GD = '#FFC93C', RD = '#E63946', SF = '#FF8C1A';
  const limb = (x1, y1, x2, y2, w, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${O}" stroke-width="${w + 12}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  const band = (x, y, w, ang) => `<rect x="${x - w / 2}" y="${y - 7}" width="${w}" height="14" rx="6" fill="${GD}" stroke="${O}" stroke-width="4" transform="rotate(${ang} ${x} ${y})"/>`;
  const palm = (x, y, flip) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path d="M-20 0 Q-26 -30 -16 -50 Q-12 -58 -6 -52 L-4 -64 Q0 -72 6 -64 L8 -52 Q14 -60 18 -50 L18 -30 Q30 -40 32 -28 Q26 -6 18 8 Q0 20 -14 12 Z" fill="${CR}" stroke="${O}" stroke-width="5" stroke-linejoin="round"/><circle cx="2" cy="-18" r="6" fill="${RD}"/></g>`;
  const fist = (x, y) => `<circle cx="${x}" cy="${y}" r="26" fill="${CR}" stroke="${O}" stroke-width="5"/><path d="M${x - 16} ${y - 6} h32 M${x - 16} ${y + 6} h32" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`;
  const gada = (x, y) => `<g id="gada"><line x1="${x}" y1="${y + 40}" x2="${x}" y2="${y - 190}" stroke="${O}" stroke-width="24" stroke-linecap="round"/><line x1="${x}" y1="${y + 40}" x2="${x}" y2="${y - 190}" stroke="${GD}" stroke-width="12" stroke-linecap="round"/>
    <rect x="${x - 20}" y="${y - 196}" width="40" height="16" rx="6" fill="${RD}" stroke="${O}" stroke-width="5"/>
    <circle cx="${x}" cy="${y - 250}" r="58" fill="${GD}" stroke="${O}" stroke-width="6"/><path d="M${x - 58} ${y - 250} h116 M${x} ${y - 308} v116 M${x - 40} ${y - 292} q40 42 80 0 M${x - 40} ${y - 208} q40 -42 80 0" stroke="${O}" stroke-width="3" fill="none"/>
    <circle cx="${x}" cy="${y - 314}" r="12" fill="${RD}" stroke="${O}" stroke-width="5"/></g>`;
  const flag = (x, y) => `<g id="flag" opacity="0"><line x1="${x}" y1="${y + 30}" x2="${x}" y2="${y - 330}" stroke="${O}" stroke-width="16" stroke-linecap="round"/><line x1="${x}" y1="${y + 30}" x2="${x}" y2="${y - 330}" stroke="#A0622D" stroke-width="7" stroke-linecap="round"/>
    <path id="flagCloth" d="M${x} ${y - 325} L${x - 150} ${y - 285} L${x} ${y - 230} Z" fill="${SF}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><text x="${x - 52}" y="${y - 268}" font-size="34" font-weight="800" fill="${O}" font-family="Baloo Tammudu 2" text-anchor="middle">ఓం</text></g>`;
  function svg() {
    return `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
<defs><radialGradient id="auraG"><stop offset="0" stop-color="#FFF6B0" stop-opacity=".95"/><stop offset=".55" stop-color="#FFC93C" stop-opacity=".55"/><stop offset="1" stop-color="#FF8C1A" stop-opacity="0"/></radialGradient></defs>
<g id="aura" opacity="0"><circle cx="300" cy="470" r="420" fill="url(#auraG)"/></g>
<g id="hm">
 <g id="tailG"><path id="tail" d="M262 640 C150 690 95 600 120 520 C140 455 200 470 185 520" fill="none" stroke="${O}" stroke-width="36" stroke-linecap="round"/><path d="M262 640 C150 690 95 600 120 520 C140 455 200 470 185 520" fill="none" stroke="${SK}" stroke-width="22" stroke-linecap="round"/><circle cx="185" cy="522" r="18" fill="${SK2}" stroke="${O}" stroke-width="5"/><g id="tailFire" opacity="0"><g id="tfIn"><path d="M185 530 Q130 490 160 420 Q170 460 185 450 Q175 400 210 360 Q215 420 235 440 Q250 500 185 530Z" fill="#FF7A1A" stroke="${O}" stroke-width="5"/><path d="M188 520 Q160 490 178 455 Q192 478 200 470 Q215 495 188 520Z" fill="#FFD23F"/></g></g></g>
 <g id="legL"><g id="shinL">${limb(262, 725, 258, 835, 50, SK)}<path d="M228 828 Q258 812 290 830 Q300 852 276 858 L226 858 Q214 848 228 828Z" fill="${SK2}" stroke="${O}" stroke-width="5"/>${band(259, 812, 54, 0)}</g>${limb(268, 610, 262, 725, 66, RD)}</g>
 <g id="legR"><g id="shinR">${limb(338, 725, 342, 835, 50, SK)}<path d="M310 830 Q342 812 372 828 Q386 848 374 858 L324 858 Q300 852 310 830Z" fill="${SK2}" stroke="${O}" stroke-width="5"/>${band(341, 812, 54, 0)}</g>${limb(332, 610, 338, 725, 66, RD)}</g>
 <g id="torso">
  <path d="M212 410 Q300 380 388 410 Q402 500 362 612 L238 612 Q198 500 212 410Z" fill="${SK}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M250 470 Q275 488 298 474 M302 474 Q325 488 350 470 M270 540 q30 12 60 0" stroke="${SK2}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M238 418 L352 600" stroke="${O}" stroke-width="13" stroke-linecap="round"/><path d="M238 418 L352 600" stroke="#FFF1C1" stroke-width="6" stroke-linecap="round"/>
  <path id="threadGlow" opacity="0" d="M238 418 L352 600" stroke="#FFF36B" stroke-width="22" stroke-linecap="round"/><path d="M228 590 Q300 618 372 590 L380 640 Q300 668 220 640Z" fill="${RD}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/>
  <rect x="226" y="592" width="148" height="18" rx="8" fill="${GD}" stroke="${O}" stroke-width="5"/>
  <path d="M262 402 Q300 446 338 402" fill="none" stroke="${O}" stroke-width="16" stroke-linecap="round"/><path d="M262 402 Q300 446 338 402" fill="none" stroke="${GD}" stroke-width="8" stroke-linecap="round"/><circle cx="300" cy="428" r="13" fill="${RD}" stroke="${O}" stroke-width="5"/>
  <g id="heartGlow" opacity="0"><circle cx="300" cy="500" r="70" fill="#FFE9A8" opacity=".85"/><path d="M300 540 C240 500 250 452 282 456 Q296 458 300 474 Q304 458 318 456 C350 452 360 500 300 540Z" fill="${RD}" stroke="${O}" stroke-width="5"/></g>
 </g>
 <g id="armL">${limb(222, 425, 190, 525, 48, SK)}${band(204, 470, 52, 70)}<g id="foreL">${limb(190, 525, 180, 618, 44, SK)}${band(183, 598, 50, 85)}${flag(180, 630)}<g id="palmL">${palm(180, 640, false)}</g><g id="fistL" opacity="0">${fist(180, 640)}</g></g></g>
 <g id="armR">${limb(378, 425, 410, 525, 48, SK)}${band(396, 470, 52, -70)}<g id="foreR">${limb(410, 525, 420, 618, 44, SK)}${band(417, 598, 50, -85)}${gada(420, 640)}<g id="fistR">${fist(420, 640)}</g><g id="palmR" opacity="0">${palm(420, 640, true)}</g></g></g>
 <g id="headNod"><g id="head">
  <circle cx="186" cy="270" r="40" fill="${SK}" stroke="${O}" stroke-width="6"/><circle cx="190" cy="272" r="22" fill="#F4A7A0"/>
  <circle cx="414" cy="270" r="40" fill="${SK}" stroke="${O}" stroke-width="6"/><circle cx="410" cy="272" r="22" fill="#F4A7A0"/>
  <g id="earL"><circle cx="186" cy="322" r="11" fill="${GD}" stroke="${O}" stroke-width="4"/></g><g id="earR"><circle cx="414" cy="322" r="11" fill="${GD}" stroke="${O}" stroke-width="4"/></g>
  <circle cx="300" cy="262" r="118" fill="${SK}" stroke="${O}" stroke-width="6"/>
  <path d="M204 258 Q210 206 262 204 Q300 222 338 204 Q390 206 396 258 Q404 340 300 372 Q196 340 204 258Z" fill="${CR}" stroke="${O}" stroke-width="5"/>
  <g id="eyes"><ellipse cx="262" cy="252" rx="22" ry="26" fill="#fff" stroke="${O}" stroke-width="5"/><ellipse cx="338" cy="252" rx="22" ry="26" fill="#fff" stroke="${O}" stroke-width="5"/>
   <g id="pupils"><circle cx="264" cy="256" r="11" fill="${O}"/><circle cx="340" cy="256" r="11" fill="${O}"/><circle cx="268" cy="251" r="4" fill="#fff"/><circle cx="344" cy="251" r="4" fill="#fff"/></g>
   <g id="lids" data-o="300 252" transform="matrix(1 0 0 0.001 0 251.75)"><ellipse cx="262" cy="252" rx="24" ry="28" fill="${CR}" stroke="${O}" stroke-width="5"/><ellipse cx="338" cy="252" rx="24" ry="28" fill="${CR}" stroke="${O}" stroke-width="5"/></g>
   <g id="calm" opacity="0"><path d="M240 254 Q262 270 284 254 M316 254 Q338 270 360 254" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/></g></g>
  <path d="M240 226 Q262 214 284 226 M316 226 Q338 214 360 226" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="300" cy="296" rx="14" ry="9" fill="${O}"/>
  <path id="smile" d="M258 318 Q300 352 342 318" stroke="${O}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g id="mouthO" opacity="0"><ellipse cx="300" cy="330" rx="20" ry="16" fill="#7A2E0B" stroke="${O}" stroke-width="5"/></g>
  <circle cx="236" cy="306" r="15" fill="#F4A7A0" opacity=".8"/><circle cx="364" cy="306" r="15" fill="#F4A7A0" opacity=".8"/>
  <path d="M288 168 L300 196 L312 168" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M300 176 V202" stroke="${RD}" stroke-width="7" stroke-linecap="round"/>
  <g id="curls">${[[214,186],[198,214],[386,186],[402,214]].map(([x,y])=>`<path d="M${x} ${y} m-12 0 a12 12 0 1 1 12 12 a7 7 0 1 1 -7 -7" fill="none" stroke="#5A2A10" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>
  <g id="cheeks" opacity="0"><circle cx="232" cy="312" r="34" fill="${SK}" stroke="${O}" stroke-width="5"/><circle cx="368" cy="312" r="34" fill="${SK}" stroke="${O}" stroke-width="5"/></g>
  <g id="crown"><path d="M206 160 L394 160 L378 120 L346 136 L338 86 L312 120 L300 66 L288 120 L262 86 L254 136 L222 120Z" fill="${GD}" stroke="${O}" stroke-width="6" stroke-linejoin="round"/><rect x="200" y="152" width="200" height="22" rx="10" fill="${GD}" stroke="${O}" stroke-width="6"/><circle cx="300" cy="112" r="12" fill="#2EC4B6" stroke="${O}" stroke-width="4"/><circle cx="258" cy="163" r="5" fill="${RD}"/><circle cx="300" cy="163" r="7" fill="${RD}"/><circle cx="342" cy="163" r="5" fill="${RD}"/></g>
 </g></g>
 <g id="ring" opacity="0"><circle cx="300" cy="330" r="13" fill="none" stroke="${GD}" stroke-width="7"/><circle cx="300" cy="317" r="6" fill="#2EC4B6" stroke="${O}" stroke-width="2"/></g>
</g></svg>`;
  }
  // pose = rotations (deg) per joint + root transform. Applied with gsap svgOrigin pivots.
  const PIV = { armL: '222 425', foreL: '190 525', armR: '378 425', foreR: '410 525', legL: '268 610', shinL: '262 725', legR: '332 610', shinR: '338 725', tailG: '262 640', torso: '300 610', headNod: '300 385', hm: '300 610' };
  const POSES = {
    stand:  { armL: 50, foreL: 130, armR: -12, foreR: 0, legL: 6, shinL: 0, legR: -6, shinR: 0, tailG: 0, hm: 0, palm: 'L' },
    hero:   { armL: 10, foreL: 0, armR: -30, foreR: -10, legL: 12, shinL: 0, legR: -12, shinR: 0, tailG: 8, hm: 0, flag: 1, fist: 'L' },
    namaste:{ armL: 10, foreL: -124, armR: -10, foreR: 124, legL: 4, shinL: 0, legR: -4, shinR: 0, tailG: 0, hm: 0, palm: 'LR', gada: 0 },
    kneel:  { armL: 10, foreL: -124, armR: -10, foreR: 124, legL: -70, shinL: 90, legR: 10, shinR: 80, tailG: -10, hm: 0, y: 110, palm: 'LR', gada: 0 },
    fly:    { armL: 160, foreL: 10, armR: -150, foreR: -20, legL: 40, shinL: 30, legR: 25, shinR: 40, tailG: 30, hm: -55, palm: 'L', gada: 0 },
    lift:   { armL: 40, foreL: -10, armR: -170, foreR: -10, legL: 40, shinL: 30, legR: 25, shinR: 40, tailG: 30, hm: -15, fist: 'R', gada: 0 },
    leap:   { armL: 130, foreL: 20, armR: -130, foreR: -20, legL: 60, shinL: 20, legR: 40, shinR: 50, tailG: 40, hm: -35, palm: 'LR', gada: 0 },
    bless:  { armL: 50, foreL: 130, armR: -12, foreR: 0, legL: -70, shinL: 140, legR: 70, shinR: -140, tailG: 0, hm: 0, y: 90, palm: 'L' },
    guard:  { armL: 35, foreL: -70, armR: -8, foreR: 0, legL: 14, shinL: 0, legR: -14, shinR: 0, tailG: 12, hm: 0, fist: 'LR' },
    sitnam: { armL: 10, foreL: -124, armR: -10, foreR: 124, legL: -70, shinL: 140, legR: 70, shinR: -140, tailG: 0, hm: 0, y: 90, palm: 'LR', gada: 0 },
    point:  { armL: 10, foreL: 0, armR: -95, foreR: 0, legL: 6, shinL: 0, legR: -6, shinR: 0, tailG: 0, hm: 0, palm: 'R', gada: 0 },
    open:   { armL: 70, foreL: 0, armR: -70, foreR: 0, legL: 8, shinL: 0, legR: -8, shinR: 0, tailG: 10, hm: 0, palm: 'LR', gada: 0 },
    roar:   { armL: 70, foreL: 60, armR: -40, foreR: 0, legL: 18, shinL: 0, legR: -18, shinR: 0, tailG: 20, hm: 0, fist: 'LR', mouth: 1 },
  };
  function pose(tl, name, at, dur = 0.6, ease = 'back.out(1.4)') {
    const p = POSES[name];
    ['armL', 'foreL', 'armR', 'foreR', 'legL', 'shinL', 'legR', 'shinR', 'tailG'].forEach(k =>
      tl.to('#' + k, { rotation: p[k] || 0, svgOrigin: PIV[k], duration: dur, ease }, at));
    tl.to('#hm', { rotation: p.hm || 0, y: p.y || 0, svgOrigin: PIV.hm, duration: dur, ease }, at);
    const pal = p.palm || '', fi = p.fist || '';
    tl.to('#palmL', { opacity: pal.includes('L') ? 1 : 0, duration: 0.15 }, at);
    tl.to('#fistL', { opacity: pal.includes('L') ? 0 : 1, duration: 0.15 }, at);
    tl.to('#palmR', { opacity: pal.includes('R') ? 1 : 0, duration: 0.15 }, at);
    tl.to('#fistR', { opacity: pal.includes('R') ? 0 : 1, duration: 0.15 }, at);
    tl.to('#gada', { opacity: p.gada === 0 ? 0 : 1, duration: 0.2 }, at);
    tl.to('#flag', { opacity: p.flag ? 1 : 0, duration: 0.2 }, at);
    tl.to('#mouthO', { opacity: p.mouth ? 1 : 0, duration: 0.15 }, at);
    tl.to('#smile', { opacity: p.mouth ? 0 : 1, duration: 0.15 }, at);
  }
  return { svg, pose, POSES, PIV };
})();
