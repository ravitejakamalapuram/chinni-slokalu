// Vishnu (Anantashayana): sleeping on Adisesha's coils in the milk ocean; lotus with Brahma from his navel, Lakshmi at his feet.
const HERO = {
  headOrigin: '450 430',
  motion(tl, T, rep) {
    tl.fromTo('#chakra', { rotation: 0 }, { rotation: 360, svgOrigin: '210 320', duration: 3, ease: 'none', repeat: rep(3) }, 0);
    tl.fromTo('#hoods', { rotation: -2 }, { rotation: 2, svgOrigin: '520 560', duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: rep(2.2) }, 0);
    tl.fromTo('#hoodHeads', { y: 0 }, { y: -6, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0.4);
    tl.fromTo('#chest', { scaleY: 1 }, { scaleY: 1.05, svgOrigin: '330 540', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: rep(2) }, 0);
    tl.fromTo('#navelLotus', { rotation: -3 }, { rotation: 3, svgOrigin: '300 500', duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: rep(2.4) }, 0);
    tl.fromTo('#brahma', { y: 0 }, { y: -5, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0.2);
    tl.fromTo('#waves', { x: 0 }, { x: -80, duration: 4, ease: 'none', repeat: rep(4) }, 0);
    tl.fromTo('#lakHand', { y: 0 }, { y: 10, duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7) }, 0);
    tl.fromTo('#lakshmi', { rotation: -2 }, { rotation: 2, svgOrigin: '65 540', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0);
    ['#z1', '#z2', '#z3'].forEach((z, i) => {
      tl.fromTo(z, { opacity: 0, y: 20 }, { opacity: 1, y: -10, duration: 1.2, ease: 'sine.out', repeat: rep(2.4), repeatDelay: 1.2 }, i * 0.4);
    });
  },
  meaning(tl, t) {
    tl.to('#lotusTop', { scale: 1.15, svgOrigin: '296 170', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '450 430', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#hoodHeads', { y: -14, duration: 0.2, yoyo: true, repeat: 3 }, t0 + 0.2);
    tl.to('#chakra', { scale: 1.15, svgOrigin: '210 320', duration: 0.2, yoyo: true, repeat: 3 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#lotusTop', { scale: 1.2, svgOrigin: '296 170', duration: 0.15, yoyo: true, repeat: 9 }, t0 + 0.3);
    tl.to('#hoodHeads', { y: -16, duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
