// Ganesha: character-specific motion. Shared motion (float, halo, blink, sparkles, word nods) lives in template.html.
const HERO = {
  headOrigin: '300 360',
  motion(tl, T, rep) {
    tl.fromTo('#earL', { scaleX: 1 }, { scaleX: 0.86, svgOrigin: '250 235', duration: 0.55, ease: 'sine.inOut', yoyo: true, repeat: rep(0.55) }, 0);
    tl.fromTo('#earR', { scaleX: 1 }, { scaleX: 0.86, svgOrigin: '350 235', duration: 0.55, ease: 'sine.inOut', yoyo: true, repeat: rep(0.55) }, 0.1);
    tl.fromTo('#trunk', { rotation: -7 }, { rotation: 7, svgOrigin: '300 270', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
    tl.fromTo('#armR', { rotation: -6 }, { rotation: 8, svgOrigin: '422 410', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    tl.fromTo('#armL', { rotation: 3 }, { rotation: -4, svgOrigin: '178 410', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0);
    for (let h = 0.5; h < T; h += 1.6) {
      tl.to('#mouse', { y: -34, duration: 0.22, ease: 'power2.out' }, h);
      tl.to('#mouse', { y: 0, duration: 0.24, ease: 'bounce.out' }, h + 0.22);
    }
  },
  meaning(tl, t) { tl.to('#modak', { y: -20, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t); },
  chant(tl, t0, span) {},
  outro(tl, t0) {}
};
