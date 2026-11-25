// Krishna: little blue Krishna with peacock feather and flute, standing on a lotus meadow.
const HERO = {
  headOrigin: '300 300',
  motion(tl, T, rep) {
    tl.fromTo('#feather', { rotation: 12 }, { rotation: 24, transformOrigin: '50% 100%', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    for (let k = 0.5; k < T - 2; k += 2.4) [0, 1, 2].forEach(i => {
      tl.fromTo('#note' + i, { opacity: 0, y: 0 }, { opacity: 1, y: -60, duration: 1.2, ease: 'sine.out' }, k + i * 0.35);
      tl.to('#note' + i, { opacity: 0, duration: 0.3 }, k + i * 0.35 + 1.2);
    });
  },
  meaning(tl, t) {
    tl.to('#kh-sm', { scaleY: 1.5, transformOrigin: '50% 50%', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#flute', { rotation: 22, transformOrigin: '0% 50%', duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t0 + 0.2);
  },
  outro(tl, t0) {
    tl.to('#feather', { rotation: 40, transformOrigin: '50% 100%', duration: 0.2, yoyo: true, repeat: 7 }, t0 + 0.3);
  }
};
