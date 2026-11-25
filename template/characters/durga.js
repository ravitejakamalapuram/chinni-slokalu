// Durga / Gauri: smiling Devi on a lotus with a lotus flower and a lion cub friend.
const HERO = {
  headOrigin: '300 420',
  motion(tl, T, rep) {
    tl.fromTo('#lotus', { rotation: -6 }, { rotation: 6, svgOrigin: '150 404', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0);
    tl.fromTo('#armLotus', { rotation: 2 }, { rotation: -4, svgOrigin: '216 470', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    tl.fromTo('#armBless', { rotation: 3 }, { rotation: -5, svgOrigin: '386 470', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0.3);
    tl.fromTo('#lionHead', { rotation: -6 }, { rotation: 6, svgOrigin: '510 620', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
    tl.fromTo('#lionTail', { rotation: -10 }, { rotation: 14, svgOrigin: '570 620', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: rep(0.6) }, 0);
    tl.fromTo('#crown circle', { opacity: 0.7 }, { opacity: 1, duration: 0.8, stagger: { each: 0.25, yoyo: true, repeat: rep(0.8) } }, 0);
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
    tl.to('#lionHead', { y: -12, duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#lionHead', { y: -12, duration: 0.3, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#lionHead', { y: -18, duration: 0.2, yoyo: true, repeat: 7 }, t0 + 0.3);
    tl.to('#armBless', { scale: 1.1, svgOrigin: '386 470', duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
