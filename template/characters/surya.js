// Surya (the Sun, Savitr of the Gayatri mantra): character-specific motion. Shared motion lives in template.html.
const HERO = {
  headOrigin: '300 430',
  motion(tl, T, rep) {
    tl.fromTo('#flames', { rotation: 0 }, { rotation: 360, svgOrigin: '300 260', duration: T * 1.5, ease: 'none' }, 0);
    tl.fromTo('#flames', { scale: 0.96 }, { scale: 1.05, svgOrigin: '300 260', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    tl.fromTo('#armL', { rotation: 4 }, { rotation: -6, svgOrigin: '200 370', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0);
    tl.fromTo('#armR', { rotation: -4 }, { rotation: 6, svgOrigin: '400 370', duration: 1.3, ease: 'sine.inOut', yoyo: true, repeat: rep(1.3) }, 0.65);
    tl.fromTo('#lotusL', { rotation: -10 }, { rotation: 10, svgOrigin: '96 256', duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: rep(0.8) }, 0);
    tl.fromTo('#lotusR', { rotation: 10 }, { rotation: -10, svgOrigin: '504 256', duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: rep(0.8) }, 0);
    tl.fromTo('#cloudA', { x: -30 }, { x: 40, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: rep(4) }, 0);
    tl.fromTo('#cloudB', { x: 30 }, { x: -40, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: rep(3.4) }, 0);
    tl.fromTo('#seat', { y: 0 }, { y: 8, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    for (let k = 3; k < T; k += 7) {
      tl.to('#pupils', { x: -6, y: -3, duration: 0.25 }, k);
      tl.to('#pupils', { x: 6, y: -3, duration: 0.35 }, k + 1.1);
      tl.to('#pupils', { x: 0, y: 0, duration: 0.25 }, k + 2.2);
    }
    // little birds flying across the morning sky
    const g = document.getElementById('birds');
    for (let i = 0; i < 3; i++) {
      g.insertAdjacentHTML('beforeend', '<g><path d="M-22 0 Q-11 -14 0 0 Q11 -14 22 0" fill="none"/></g>');
      const b = g.lastElementChild, wing = b.firstElementChild; gsap.set(b, { x: -60 });
      tl.fromTo(wing, { scaleY: 1 }, { scaleY: -0.6, svgOrigin: '0 0', duration: 0.22, yoyo: true, repeat: rep(0.22) }, i * 0.1);
      for (let k = i * 2.3; k < T; k += 7) {
        tl.fromTo(b, { x: -60, y: 120 - i * 50 }, { x: 660, y: 40 - i * 40, duration: 6, ease: 'none', immediateRender: false }, k);
      }
    }
  },
  meaning(tl, t) {
    tl.to(['#lotusL', '#lotusR'], { y: -18, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 312', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  chant(tl, t0, span) {
    tl.to('#flames', { scale: 1.15, svgOrigin: '300 260', duration: 0.4, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#flames', { scale: 1.15, svgOrigin: '300 260', duration: 0.4, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.5);
  },
  outro(tl, t0) {
    tl.to(['#armL', '#armR'], { y: -30, duration: 0.25, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0 + 0.3);
  }
};
