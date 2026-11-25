// ---------- outro ----------
const Ou = D.outro;
show('outro', Ou.start - 0.5);
tl.to(['#panel', '#topbar'], { opacity: 0, duration: 0.3 }, Ou.start - 0.3);
const oc = el('div', 'big abs', 'JAI SHRI RAM!<br><span style="font-size:110px;color:#FF7A1A">JAI HANUMAN!</span>', $('#stage')); oc.style.cssText += ';top:1380px;font-size:96px;opacity:0';
tl.fromTo(oc, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, Ou.start);
pop('#ouR', Ou.start + 0.1, 0.5); A('#aura', { opacity: 1, duration: 0.4 }, Ou.start); rings(540, 700, Ou.start + 0.3, 3);
burst(540, 800, Ou.start + 0.4, 12); pose('hero', Ou.start + 1.6); burst(540, 700, Ou.start + 2, 10, 'gold'); rain('petal', Ou.start + 0.5, 3, 16); rain('marigold', Ou.start + 1, 3, 12);
// ---------- ambient ----------
amb();
tl.fromTo('#tail', { rotation: -6 }, { rotation: 6, svgOrigin: '262 640', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0);
tl.fromTo('#head', { rotation: -3 }, { rotation: 3, svgOrigin: '300 385', duration: 1.7, ease: 'sine.inOut', yoyo: true, repeat: rep(1.7) }, 0);
tl.fromTo('#torso', { scaleY: 1 }, { scaleY: 1.015, svgOrigin: '300 610', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
const lids = document.getElementById('lids');
for (let b = 2.2; b < T; b += 3.1 + (b % 1.7)) { tl.to(lids, { scaleY: 1, svgOrigin: '300 252', duration: 0.07, ease: 'none' }, b); tl.to(lids, { scaleY: 0.001, svgOrigin: '300 252', duration: 0.09, ease: 'none' }, b + 0.11); }
