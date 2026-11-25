// Deepam: a smiling clay lamp. Character-specific motion; shared motion lives in template.html.
const HERO = {
  headOrigin: '300 440',
  motion(tl, T, rep) {
    // the big flame dances and flickers
    tl.fromTo('#flame', { scaleY: 0.94, scaleX: 1.03, skewX: -4 }, { scaleY: 1.08, scaleX: 0.96, skewX: 4, svgOrigin: '300 256', duration: 0.42, ease: 'sine.inOut', yoyo: true, repeat: rep(0.42) }, 0);
    tl.fromTo('#flameL', { scaleY: 0.9, skewX: 5 }, { scaleY: 1.12, skewX: -5, svgOrigin: '90 640', duration: 0.33, ease: 'sine.inOut', yoyo: true, repeat: rep(0.33) }, 0);
    tl.fromTo('#flameR', { scaleY: 1.1, skewX: -5 }, { scaleY: 0.9, skewX: 5, svgOrigin: '510 640', duration: 0.37, ease: 'sine.inOut', yoyo: true, repeat: rep(0.37) }, 0.1);
    tl.fromTo('#armL', { rotation: 6 }, { rotation: -10, svgOrigin: '156 340', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: rep(1.1) }, 0);
    tl.fromTo('#armR', { rotation: -6 }, { rotation: 10, svgOrigin: '444 340', duration: 1.1, ease: 'sine.inOut', yoyo: true, repeat: rep(1.1) }, 0.55);
    tl.fromTo('#rangoli', { scale: 1 }, { scale: 1.03, svgOrigin: '300 664', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: rep(1.8) }, 0);
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: -6, y: -4, duration: 0.25 }, k);
      tl.to('#pupils', { x: 6, y: -4, duration: 0.35 }, k + 1.1);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 2.2);
    }
  },
  meaning(tl, t) {
    tl.to('#flame', { scale: 1.25, svgOrigin: '300 256', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.6, svgOrigin: '300 384', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to(['#armL', '#armR'], { y: -14, duration: 0.4, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to(['#armL', '#armR'], { y: -14, duration: 0.4, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#flame', { scale: 1.3, svgOrigin: '300 256', duration: 0.25, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0 + 0.3);
    tl.to(['#armL', '#armR'], { y: -24, duration: 0.2, yoyo: true, repeat: 7 }, t0 + 0.3);
  }
};
