// Lakshmi: smiling Devi on a big pink lotus, lotus in one hand, gold coins pouring from the blessing hand into a pot.
const HERO = {
  headOrigin: '300 420',
  motion(tl, T, rep) {
    tl.fromTo('#lotus', { rotation: -6 }, { rotation: 6, svgOrigin: '150 404', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0);
    tl.fromTo('#armLotus', { rotation: 2 }, { rotation: -4, svgOrigin: '216 470', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    tl.fromTo('#armBless', { rotation: 2 }, { rotation: -3, svgOrigin: '386 470', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0.3);
    tl.fromTo('#crown circle', { opacity: 0.7 }, { opacity: 1, duration: 0.8, stagger: { each: 0.25, yoyo: true, repeat: rep(0.8) } }, 0);
    // coins drip from the palm into the pot, forever
    for (let k = 0; k < 6; k++) {
      tl.fromTo('#coin' + k, { x: 0, y: 0, opacity: 0 }, { x: 44, y: 104, opacity: 1, duration: 1.1, ease: 'power1.in', repeat: rep(1.8), repeatDelay: 0.7 }, 0.3 + k * 0.3);
    }
    tl.fromTo('#potCoins', { y: 0 }, { y: -6, duration: 0.3, yoyo: true, repeat: rep(0.3), ease: 'sine.inOut' }, 0);
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: 6, y: 2, duration: 0.25 }, k);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 1.4);
    }
  },
  meaning(tl, t) {
    tl.to('#lotus', { scale: 1.25, svgOrigin: '150 404', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 364', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#pot', { scale: 1.12, svgOrigin: '510 640', duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#pot', { scale: 1.12, svgOrigin: '510 640', duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#pot', { y: -14, duration: 0.2, yoyo: true, repeat: 7 }, t0 + 0.3);
    tl.to('#armBless', { scale: 1.1, svgOrigin: '386 470', duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
