// builds characters/krishna.svg from lib.js figures (run: node mkhero.js)
const fs = require('fs'); eval(fs.readFileSync(__dirname + '/lib.js', 'utf8') + ';global.ST=ST;');
const { fig, O, GD, P, lotus } = ST, BLUE = '#3E6FD0';
const feather = `<g id="feather" transform="translate(26 -150) rotate(18)"><path d="M0 40 Q-4 -10 0 -60" stroke="${O}" stroke-width="6" fill="none"/><ellipse cy="-58" rx="22" ry="38" fill="#2FA36B" stroke="${O}" stroke-width="5"/><ellipse cy="-52" rx="13" ry="22" fill="#2E86DE"/><ellipse cy="-50" rx="7" ry="11" fill="#1B2A6B"/></g>`;
const flute = `<g id="flute" transform="translate(14 -6) rotate(16)"><rect x="0" y="-9" width="200" height="18" rx="9" fill="#A0622D" stroke="${O}" stroke-width="5"/>${[60, 95, 130, 165].map(x => `<circle cx="${x}" r="4" fill="${O}"/>`).join('')}<rect x="40" y="-11" width="10" height="22" fill="${GD}"/></g>`;
let f = fig({ id: 'kh', x: 0, y: 0, s: 1, skin: BLUE, cloth: '#FFC93C', top: BLUE, crown: 'mukut', extra: flute });
f = f.replace('<g id="kh-head">', '<g id="headNod"><g id="head">' + feather).replace('<g id="kh-aR">', '<g id="kh-aR" transform="rotate(-99 56 60)">').replace('<g id="kh-aL">', '<g id="kh-aL" transform="rotate(-128 -56 60)">').replace('</g><g id="flute"', '</g></g><g id="flute"');
const ok = f.includes('id="headNod"');
const svg = `<svg viewBox="0 -60 600 770" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="haloG"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#FFF6D8"/><stop offset="1" stop-color="#FFE08A"/></radialGradient></defs>
<g id="halo"><g id="rays" data-c="300 250" stroke="none" fill="#FFF3C4"></g><circle cx="300" cy="250" r="215" fill="url(#haloG)"/></g>
<g id="seat"><ellipse cx="300" cy="706" rx="250" ry="34" fill="#7CC26B" stroke="${O}" stroke-width="6"/>${lotus(120, 700, 0.9)}${lotus(480, 700, 0.9)}</g>
<g id="notes">${[0, 1, 2].map(i => `<g id="note${i}" opacity="0" transform="translate(${470 + i * 30} ${200 - i * 40})">${ST.SH.note}</g>`).join('')}</g>
<g transform="translate(300 276) scale(1.32)">${f}</g></svg>`;
fs.writeFileSync(__dirname + '/characters/krishna.svg', svg); console.log('headNod', ok, svg.length);
