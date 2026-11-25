// Vishnu: calm blue Vishnu with chakra, conch, lotus and blessing hand, under Adisesha's five hoods.
const HERO = {
  headOrigin: '300 420',
  motion(tl, T, rep) {
    tl.fromTo('#chakra', { rotation: 0 }, { rotation: 360, svgOrigin: '140 262', duration: 3, ease: 'none', repeat: rep(3) }, 0);
    tl.fromTo('#hoodHeads', { y: 0 }, { y: -6, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: rep(1.8) }, 0);
    tl.fromTo('#armConch', { rotation: -2 }, { rotation: 2, svgOrigin: '386 456', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    tl.fromTo('#armBless', { rotation: 3 }, { rotation: -5, svgOrigin: '392 468', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0);
    tl.fromTo('#lotusH', { scale: 0.95 }, { scale: 1.08, svgOrigin: '198 548', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0.3);
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: 6, y: -3, duration: 0.25 }, k);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 1.4);
    }
  },
  meaning(tl, t) {
    tl.to('#armBless', { scale: 1.08, svgOrigin: '392 468', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 362', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#conch', { scale: 1.15, svgOrigin: '462 270', duration: 0.2, yoyo: true, repeat: 3 }, t0 + 0.2);
    tl.to('#chakra', { scale: 1.12, svgOrigin: '140 262', duration: 0.2, yoyo: true, repeat: 3 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#conch', { scale: 1.2, svgOrigin: '462 270', duration: 0.15, yoyo: true, repeat: 9 }, t0 + 0.3);
    tl.to('#hoodHeads', { y: -16, duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
