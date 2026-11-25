// ---------- infra: hero, scenes, camera, particles ----------
$('#hmv').innerHTML = HM.svg();
$('#foreR').insertAdjacentHTML('beforeend', `<g id="carry"><g id="mtnWrap" opacity="0"><g id="mtnRot">${ST.mountain}</g></g><g id="rockWrap" opacity="0"><g id="rockRot">${ST.boulder}</g></g></g>`);
gsap.set(['#mtnWrap', '#rockWrap'], { x: 420, y: 760 });
gsap.set(['#mtnRot', '#rockRot'], { rotation: 195, svgOrigin: '0 0' });
const pose = (n, at, d) => HM.pose(tl, n, at, d);
function eyes(closed, at) { tl.to('#calm', { opacity: closed ? 1 : 0, duration: 0.2 }, at); tl.to('#pupils', { opacity: closed ? 0 : 1, duration: 0.2 }, at); tl.to('#eyes > ellipse', { opacity: closed ? 0 : 1, duration: 0.2 }, at); }
const A = (s, v, at) => tl.to(s, v, at);
const F = (s, a, b, at) => tl.fromTo(s, a, b, at);
const S_ = (s, v, at) => tl.set(s, v, at);
const pop = (s, at, d = 0.5, from = 0) => tl.fromTo(s, { opacity: 1, scale: from, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: d, ease: 'back.out(2)' }, at);
const popB = (s, at, d = 0.5) => tl.fromTo(s, { opacity: 1, scale: 0, transformOrigin: '50% 100%' }, { opacity: 1, scale: 1, duration: d, ease: 'back.out(1.8)' }, at);
const fin = (s, at, d = 0.4) => tl.to(s, { opacity: 1, duration: d }, at);
const fout = (s, at, d = 0.4) => tl.to(s, { opacity: 0, duration: d }, at);
const bob = (s, at, dur, amp, n, ease = 'sine.inOut') => tl.fromTo(s, { y: 0 }, { y: amp, duration: dur, yoyo: true, repeat: n * 2 - 1, ease }, at);
const wig = (s, at, ang, n, dur = 0.15, o = '50% 100%') => tl.fromTo(s, { rotation: -ang }, { rotation: ang, transformOrigin: o, duration: dur, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, at);
const pulse = (s, at, sc = 1.15, n = 2, dur = 0.25) => tl.fromTo(s, { scale: 1 }, { scale: sc, transformOrigin: '50% 50%', duration: dur, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut' }, at);
const spin = (s, at, dur, deg = 360) => tl.fromTo(s, { rotation: 0 }, { rotation: deg, transformOrigin: '50% 50%', duration: dur, ease: 'none' }, at);
// figure move: dx,dy in screen px relative to its start
const go = (id, dx, dy, at, d = 0.6, ease = 'power2.inOut') => { const s = ST.FS[id] || 1; tl.to('#' + id, { x: dx / s, y: dy / s, duration: d, ease }, at); };
const arm = (id, side, deg, at, d = 0.4, ease = 'back.out(1.6)') => tl.to(`#${id}-a${side}`, { rotation: deg, svgOrigin: side === 'L' ? '-56 60' : '56 60', duration: d, ease }, at);
const mood = (id, m, at) => { ['sm', 'sd', 'op'].forEach(k => tl.to(`#${id}-${k}`, { opacity: k === m ? 1 : 0, duration: 0.15 }, at)); };
const hm = (at, v, d = 0.6, ease = 'power2.inOut') => tl.to('#hmv', Object.assign({ duration: d, ease, transformOrigin: '50% 100%' }, v), at);
const cam = (at, s, x, y, d = 0.8, ease = 'power2.inOut') => tl.to('#world', { scale: s, x, y, transformOrigin: '540px 800px', duration: d, ease }, at);
const zoomTo = (at, px, py, s, d = 0.8) => cam(at, s, -(px - 540) * s, -40 - (py - 800) * s, d);
const shake = (at, n = 8, a = 14) => { tl.fromTo('#shake', { x: -a, y: a / 2 }, { x: a, y: -a / 2, duration: 0.05, yoyo: true, repeat: n, ease: 'none' }, at); tl.set('#shake', { x: 0, y: 0 }, at + 0.05 * (n + 1) + 0.01); };
const flash = (at, o = 0.8) => { tl.fromTo('#flash', { opacity: o }, { opacity: 0, duration: 0.45, ease: 'power2.out' }, at); };
// ---- particles ----
const FX = $('#fxsvg');
const SH = ST.SH;
function part(shape, at, dur, x0, y0, x1, y1, o = {}) {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('opacity', '0'); g.innerHTML = SH[shape] || shape; FX.appendChild(g);
  tl.fromTo(g, { x: x0, y: y0, scale: o.s0 ?? 0.3, rotation: o.r0 || 0, opacity: 1 }, { x: x1, y: y1, scale: o.s1 ?? 1, rotation: o.rot ?? 0, duration: dur, ease: o.ease || 'power2.out' }, at);
  tl.to(g, { opacity: 0, duration: Math.min(0.35, dur / 2) }, at + dur - Math.min(0.35, dur / 2));
  return g;
}
function burst(x, y, at, n = 8, shape = 'spark', r = 170, dur = 0.8) { for (let i = 0; i < n; i++) { const a = i / n * 6.283 + rnd() * 0.3, rr = r * (0.7 + rnd() * 0.5); part(shape, at + rnd() * 0.08, dur, x, y, x + Math.cos(a) * rr, y + Math.sin(a) * rr, { rot: 200 * (rnd() - 0.5), s1: 0.9 + rnd() * 0.4 }); } }
function rain(shape, at, dur, n, x0 = 40, x1 = 1040, y1 = 1260) { for (let i = 0; i < n; i++) { const x = x0 + rnd() * (x1 - x0), d = dur * (0.6 + rnd() * 0.4); part(shape, at + rnd() * dur * 0.5, d, x, 200 + rnd() * 120, x + (rnd() - 0.5) * 160, y1, { s0: 0.8, s1: 0.9, rot: 360 * (rnd() - 0.5), ease: 'none' }); } }
function rise(shape, x, y, at, dur, n, spread = 120, h = 500) { for (let i = 0; i < n; i++) { const xx = x + (rnd() - 0.5) * spread; part(shape, at + i * dur / n * 0.8, dur * 0.7, xx, y, xx + (rnd() - 0.5) * spread, y - h * (0.7 + rnd() * 0.5), { s0: 0.5, s1: 1, rot: 60 * (rnd() - 0.5), ease: 'sine.out' }); } }
function stream(shape, x0, y0, x1, y1, at, dur, n, o = {}) { for (let i = 0; i < n; i++) part(shape, at + i * dur / n, o.d || 0.7, x0 + (rnd() - 0.5) * 30, y0 + (rnd() - 0.5) * 30, x1 + (rnd() - 0.5) * 40, y1 + (rnd() - 0.5) * 40, { s0: o.s0 ?? 0.5, s1: o.s1 ?? 0.9, ease: 'power1.inOut' }); }
function rings(x, y, at, n = 3, col = '#FFF3B0', R = 700) { for (let i = 0; i < n; i++) { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 60); c.setAttribute('fill', 'none'); c.setAttribute('stroke', col); c.setAttribute('stroke-width', 16); c.setAttribute('opacity', 0); FX.appendChild(c); tl.fromTo(c, { attr: { r: 60 }, opacity: 0.95 }, { attr: { r: R }, opacity: 0, duration: 1.1, ease: 'power1.out' }, at + i * 0.28); } }
function speed(at, dur, dir = 1, n = 12, col = '#fff') { for (let i = 0; i < n; i++) { const y = 300 + rnd() * 950, L = 160 + rnd() * 220; const g = part(`<line x1="0" y1="0" x2="${L}" y2="0" stroke="${col}" stroke-width="${6 + rnd() * 6}" stroke-linecap="round" opacity=".85"/>`, at + rnd() * dur * 0.7, 0.45, dir > 0 ? 1200 : -300, y, dir > 0 ? -400 : 1300, y, { s0: 1, s1: 1, ease: 'none' }); } }
// ---- hero helpers ----
let HC = [0, 0, 1];
const hp = (sx, sy) => [540 + HC[0] + (sx - 300) * HC[2], 1280 + HC[1] - (900 - sy) * HC[2]];
// ---- scenes ----
const LAY = {}; let cur = null;
function mk(k) { const sc = ST.S[k]; const b = el('div', 'bg abs', `<svg viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">${sc.bg}</svg>`, $('#bgs')); const f = sc.fg ? el('div', 'bg abs', `<svg viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">${sc.fg}</svg>`, $('#fgs')) : null; LAY[k] = [b, f].filter(Boolean); }
Object.keys(ST.S).forEach(mk);
function show(k, at) {
  const sc = ST.S[k], H = sc.H; const fd = at <= 0 ? 0.001 : 0.45; at = Math.max(at, 0);
  if (cur) tl.to(LAY[cur], { opacity: 0, duration: fd }, at);
  tl.to(LAY[k], { opacity: 1, duration: fd }, at);
  cam(at, 1, 0, 0, fd);
  tl.to('#hero', { opacity: 0, duration: fd < 0.1 ? 0.001 : 0.2 }, at);
  const t = at + (fd < 0.1 ? 0.002 : 0.21);
  tl.set('#hero', { x: H[0], y: H[1], scale: H[2], transformOrigin: '50% 100%' }, t);
  tl.set('#hmv', { x: 0, y: 0, rotation: 0, scale: 1 }, t);
  pose(H[3] || 'stand', t, 0.01); eyes(!!H[4], t);
  tl.set(['#aura', '#tailFire', '#ring', '#heartGlow', '#mtnWrap', '#rockWrap', '#threadGlow', '#cheeks'], { opacity: 0 }, t);
  tl.to('#hero', { opacity: sc.hide ? 0 : 1, duration: fd < 0.1 ? 0.001 : 0.25 }, t + 0.001);
  HC = H; cur = k;
}
// ambient scene loops (spinning rays, drifting clouds, twinkles) run whole duration cheaply
const amb = () => {
  document.querySelectorAll('.spinR').forEach(r => tl.fromTo(r, { rotation: 0 }, { rotation: 60, transformOrigin: '50% 50%', duration: 20, ease: 'none', repeat: Math.ceil(T / 20) }, 0));
  document.querySelectorAll('.twk').forEach((s, i) => tl.fromTo(s, { opacity: 0.3 }, { opacity: 1, duration: 0.7, yoyo: true, repeat: Math.floor(T / 0.7) - 2, ease: 'sine.inOut' }, (i % 5) * 0.15));
  document.querySelectorAll('.drift').forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: -60, duration: 6 + (i % 3), yoyo: true, repeat: Math.ceil(T / 6), ease: 'sine.inOut' }, 0));
  document.querySelectorAll('.flick').forEach((c, i) => tl.fromTo(c, { scaleY: 0.85, scaleX: 1.05 }, { scaleY: 1.12, scaleX: 0.95, transformOrigin: '50% 100%', duration: 0.18 + (i % 3) * 0.04, yoyo: true, repeat: Math.ceil(T / 0.2), ease: 'sine.inOut' }, (i % 4) * 0.05));
  document.querySelectorAll('.sway').forEach((c, i) => tl.fromTo(c, { rotation: -3 }, { rotation: 3, transformOrigin: '50% 100%', duration: 1.6 + (i % 3) * 0.3, yoyo: true, repeat: Math.ceil(T / 1.6), ease: 'sine.inOut' }, 0));
  document.querySelectorAll('.wave').forEach((c, i) => tl.fromTo(c, { x: 0 }, { x: -180, duration: 1.6 + i % 3 * 0.4, repeat: Math.ceil(T / 1.6), ease: 'none' }, 0));
};
// ---------- intro ----------
const I = D.intro;
const intro = $('#intro');
intro.innerHTML = `<div class="big abs" style="top:250px;font-size:96px">LET'S CHANT</div><div class="big abs" style="top:360px;font-size:120px;color:#FF7A1A">HANUMAN<br>CHALISA</div>`;
show('intro', -0.3);
tl.set(['#topbar', '#panel'], { opacity: 0 }, 0);
tl.fromTo(intro.children, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)', stagger: 0.3 }, 0.2);
ST.S.intro.act(0.4, 2.5, I.end);
tl.to(intro, { opacity: 0, duration: 0.4 }, I.end - 0.4);
tl.to(['#topbar', '#panel'], { opacity: 1, duration: 0.4 }, I.end - 0.2);
