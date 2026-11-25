// Ulooka: a wise little owl carrying a lantern (light out of darkness). Shared motion lives in template.html.
const HERO = {
  headOrigin: '300 430',
  motion(tl, T, rep) {
    tl.fromTo('#lantern', { rotation: -7 }, { rotation: 7, svgOrigin: '512 498', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
    tl.fromTo('#lanFlame', { scaleY: 0.88, skewX: -5 }, { scaleY: 1.12, skewX: 5, svgOrigin: '512 598', duration: 0.36, ease: 'sine.inOut', yoyo: true, repeat: rep(0.36) }, 0);
    tl.fromTo('#wingL', { rotation: 4 }, { rotation: -14, svgOrigin: '168 430', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    tl.fromTo('#wingR', { rotation: -2 }, { rotation: 3, svgOrigin: '432 440', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
    tl.fromTo('#body', { scaleY: 1 }, { scaleY: 1.025, svgOrigin: '300 618', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    tl.fromTo('#flies circle', { opacity: 0.2 }, { opacity: 1, y: -10, duration: 0.8, ease: 'sine.inOut', stagger: { each: 0.3, yoyo: true, repeat: rep(0.8) } }, 0);
    // owl head tilt, the classic curious owl move
    for (let k = 2.5; k < T; k += 7) {
      tl.to('#head', { rotation: -10, svgOrigin: '300 430', duration: 0.35, ease: 'back.out(2)' }, k);
      tl.to('#head', { rotation: 0, svgOrigin: '300 430', duration: 0.35 }, k + 1.2);
      tl.to('#pupils', { x: 7, y: -3, duration: 0.25 }, k + 3);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 4.2);
    }
  },
  meaning(tl, t) {
    tl.to('#lantern', { scale: 1.2, svgOrigin: '512 520', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.6, svgOrigin: '300 398', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#wingL', { rotation: -40, svgOrigin: '168 430', duration: 0.35, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#wingL', { rotation: -40, svgOrigin: '168 430', duration: 0.35, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#wingL', { rotation: -45, svgOrigin: '168 430', duration: 0.2, yoyo: true, repeat: 7 }, t0 + 0.3);
    tl.to('#lantern', { scale: 1.25, svgOrigin: '512 520', duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
