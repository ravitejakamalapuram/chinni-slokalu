// Hanuman: character-specific motion. Shared motion (float, halo, blink, sparkles, word nods) lives in template.html.
const HERO = {
  headOrigin: '300 320',
  motion(tl, T, rep, rnd) {
    tl.fromTo('#tail', { rotation: -6 }, { rotation: 8, svgOrigin: '200 640', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: rep(1.1) }, 0);
    tl.fromTo('#armGada', { rotation: -3 }, { rotation: 4, svgOrigin: '378 386', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0);
    tl.fromTo('#armBless', { rotation: 2 }, { rotation: -5, svgOrigin: '222 386', duration: 1.25, ease: 'sine.inOut', yoyo: true, repeat: rep(1.25) }, 0);
    tl.fromTo('#earL', { scale: 1 }, { scale: 1.08, svgOrigin: '188 222', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7) }, 0);
    tl.fromTo('#earR', { scale: 1 }, { scale: 1.08, svgOrigin: '412 222', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7) }, 0.2);
    tl.fromTo('#moon', { rotation: -8, y: 0 }, { rotation: 8, y: 10, svgOrigin: '80 0', duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: rep(2.2) }, 0);
    // eyes glance left/right now and then
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: -6, duration: 0.25 }, k);
      tl.to('#pupils', { x: 6, duration: 0.35 }, k + 1.1);
      tl.to('#pupils', { x: 0, duration: 0.25 }, k + 2.2);
    }
    // little twinkling stars in the night sky
    const g = document.getElementById('stars');
    const pts = [[30, 120], [150, -40], [470, -40], [575, 60], [20, 300], [585, 330]];
    pts.forEach(([x, y], i) => {
      g.insertAdjacentHTML('beforeend', `<path d="M${x} ${y - 16} L${x + 5} ${y - 5} L${x + 16} ${y} L${x + 5} ${y + 5} L${x} ${y + 16} L${x - 5} ${y + 5} L${x - 16} ${y} L${x - 5} ${y - 5} Z" fill="#FFF1A8"/>`);
      const s = g.lastElementChild;
      tl.fromTo(s, { scale: 0.4, opacity: 0.4 }, { scale: 1.2, opacity: 1, svgOrigin: `${x} ${y}`, duration: 0.8 + (i % 3) * 0.3, ease: 'sine.inOut', yoyo: true, repeat: rep(0.8 + (i % 3) * 0.3) }, i * 0.3);
    });
  },
  // meaning card appears: lift the mace and smile wider
  meaning(tl, t) {
    tl.to('#armGadaG', { rotation: -12, svgOrigin: '378 386', duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 288', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  // chanting: blessing hand pushes forward on each line
  chant(tl, t0, span) {
    tl.to('#armBlessG', { rotation: 10, svgOrigin: '222 386', duration: 0.45, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#armBlessG', { rotation: 10, svgOrigin: '222 386', duration: 0.45, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#armGadaG', { rotation: -20, svgOrigin: '378 386', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0 + 0.3);
    tl.to('#tail', { rotation: 18, svgOrigin: '200 640', duration: 0.15, yoyo: true, repeat: 9 }, t0 + 0.3);
  }
};
