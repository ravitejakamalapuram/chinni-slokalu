// Shiva: kind blue Shiva on snowy Kailash, with trishul, damaru, moon, Ganga and a friendly snake.
const HERO = {
  headOrigin: '300 420',
  motion(tl, T, rep) {
    tl.fromTo('#ganga', { scaleY: 0.9, skewX: -4 }, { scaleY: 1.1, skewX: 4, svgOrigin: '330 100', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: rep(0.6) }, 0);
    tl.fromTo('#damaru', { rotation: -14 }, { rotation: 14, svgOrigin: '130 236', duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: rep(0.3) }, 0);
    tl.fromTo('#armTriG', { rotation: -2 }, { rotation: 2, svgOrigin: '214 468', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    tl.fromTo('#armBless', { rotation: 3 }, { rotation: -5, svgOrigin: '392 468', duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: rep(1.2) }, 0);
    tl.fromTo('#snakeHead', { rotation: -8 }, { rotation: 8, svgOrigin: '386 444', duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: rep(1.4) }, 0.3);
    tl.fromTo('#moon', { opacity: 0.85 }, { opacity: 1, scale: 1.06, svgOrigin: '240 150', duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: rep(1.5) }, 0);
    for (let k = 3; k < T; k += 6.5) {
      tl.to('#pupils', { x: 6, y: -3, duration: 0.25 }, k);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 1.4);
    }
  },
  meaning(tl, t) {
    tl.to('#armBless', { scale: 1.08, svgOrigin: '392 468', duration: 0.3, yoyo: true, repeat: 1, ease: 'back.out(2)' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 360', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#damaru', { rotation: 30, svgOrigin: '130 236', duration: 0.12, yoyo: true, repeat: 7 }, t0 + 0.2);
    tl.to('#damaru', { rotation: 30, svgOrigin: '130 236', duration: 0.12, yoyo: true, repeat: 7 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to('#damaru', { rotation: 30, svgOrigin: '130 236', duration: 0.1, yoyo: true, repeat: 13 }, t0 + 0.3);
    tl.to('#snakeHead', { y: -16, duration: 0.25, yoyo: true, repeat: 5 }, t0 + 0.3);
  }
};
