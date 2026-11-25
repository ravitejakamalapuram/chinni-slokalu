// Guru: a kind teacher-sage. Character-specific motion; shared motion lives in template.html.
const HERO = {
  headOrigin: '300 330',
  motion(tl, T, rep) {
    tl.fromTo('#armTeach', { rotation: -3 }, { rotation: 5, svgOrigin: '222 390', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0);
    tl.fromTo('#armBook', { rotation: 2 }, { rotation: -3, svgOrigin: '378 390', duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: rep(1.5) }, 0);
    tl.fromTo('#beard', { rotation: -2 }, { rotation: 2, svgOrigin: '300 290', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    tl.fromTo('#branch', { rotation: -1.5 }, { rotation: 1.5, svgOrigin: '-40 40', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: rep(2) }, 0);
    tl.fromTo('#parrot', { rotation: -4 }, { rotation: 4, svgOrigin: '46 40', duration: 1, ease: 'sine.inOut', yoyo: true, repeat: rep(1) }, 0);
    // page turns every few seconds
    for (let k = 2; k < T; k += 4.5) {
      tl.to('#page', { scaleX: -1, svgOrigin: '432 500', duration: 0.5, ease: 'power1.inOut' }, k);
      tl.set('#page', { scaleX: 1, svgOrigin: '432 500' }, k + 0.55);
    }
    // parrot flaps and bobs now and then
    for (let k = 1; k < T; k += 3.7) {
      tl.to('#parrotWing', { rotation: -40, svgOrigin: '50 4', duration: 0.12, yoyo: true, repeat: 5 }, k);
      tl.to('#parrot', { y: -10, duration: 0.18, yoyo: true, repeat: 1 }, k + 0.1);
    }
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: -6, duration: 0.25 }, k);
      tl.to('#pupils', { x: 6, duration: 0.35 }, k + 1.1);
      tl.to('#pupils', { x: 0, duration: 0.25 }, k + 2.2);
    }
  },
  meaning(tl, t) {
    tl.to('#armBookG', { y: -24, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t);
    tl.to('#smile', { scaleY: 1.6, svgOrigin: '300 298', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#armTeachG', { rotation: 14, svgOrigin: '222 390', duration: 0.45, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#armTeachG', { rotation: 14, svgOrigin: '222 390', duration: 0.45, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#armTeachG', { rotation: 20, svgOrigin: '222 390', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0 + 0.3);
    tl.to('#parrotWing', { rotation: -40, svgOrigin: '50 4', duration: 0.1, yoyo: true, repeat: 13 }, t0 + 0.3);
  }
};
