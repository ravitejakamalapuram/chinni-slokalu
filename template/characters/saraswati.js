// Saraswati: veena playing, swaying back arms, swinging earrings, swan, floating lotus, music notes.
const HERO = {
  headOrigin: '300 340',
  motion(tl, T, rep, rnd) {
    // strumming hand (quick) and fretting hand sliding along the neck
    tl.fromTo('#armStrum', { rotation: -3 }, { rotation: 5, svgOrigin: '380 400', duration: 0.28, ease: 'sine.inOut', yoyo: true, repeat: rep(0.28) }, 0);
    tl.fromTo('#armFret', { x: 0, y: 0 }, { x: 22, y: 14, duration: 0.95, ease: 'sine.inOut', yoyo: true, repeat: rep(0.95) }, 0);
    tl.fromTo('#strings', { y: 0 }, { y: 1.5, duration: 0.07, ease: 'none', yoyo: true, repeat: rep(0.07) }, 0);
    tl.fromTo('#veena', { rotation: -1.5 }, { rotation: 1.5, svgOrigin: '300 520', duration: 1.9, ease: 'sine.inOut', yoyo: true, repeat: rep(1.9) }, 0);
    // back arms sway, mala turns
    tl.fromTo('#armBL', { rotation: -6 }, { rotation: 6, svgOrigin: '222 380', duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: rep(1.5) }, 0);
    tl.fromTo('#armBR', { rotation: 6 }, { rotation: -6, svgOrigin: '378 380', duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: rep(1.5) }, 0.3);
    tl.fromTo('#mala', { rotation: 0 }, { rotation: 360, svgOrigin: '112 236', duration: 6, ease: 'none', repeat: rep(6) }, 0);
    // earrings swing
    tl.fromTo('#earL', { rotation: -12 }, { rotation: 12, svgOrigin: '194 252', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7) }, 0);
    tl.fromTo('#earR', { rotation: -12 }, { rotation: 12, svgOrigin: '406 252', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: rep(0.7) }, 0.2);
    // swan: glide, neck bob, wing flap
    tl.fromTo('#swan', { x: -10 }, { x: 14, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: rep(2.4) }, 0);
    tl.fromTo('#swanNeck', { rotation: -6 }, { rotation: 8, svgOrigin: '494 650', duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: rep(0.9) }, 0);
    for (let h = 1.2; h < T; h += 3.1) {
      tl.to('#swanWing', { rotation: -28, svgOrigin: '512 668', duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 3 }, h);
    }
    // floating lotus bobs
    tl.fromTo('#lotusF', { y: 0, rotation: -5 }, { y: -16, rotation: 5, svgOrigin: '80 690', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: rep(1.6) }, 0);
    // music notes rising from the veena
    const g = document.getElementById('notes');
    const glyph = (c) => `<g><path d="M0 0 L0 -34 L22 -40 L22 -6" fill="none" stroke="#2B1407" stroke-width="6"/><ellipse cx="-6" cy="2" rx="11" ry="8" fill="${c}"/><ellipse cx="16" cy="-4" rx="11" ry="8" fill="${c}"/></g>`;
    const cols = ['#E63946', '#2EC4B6', '#7B2CBF', '#FF9F1C'];
    for (let i = 0; i < 6; i++) {
      g.insertAdjacentHTML('beforeend', glyph(cols[i % 4]));
      const n = g.lastElementChild;
      gsap.set(n, { opacity: 0 });
      for (let k = i * 0.55; k < T; k += 3.3) {
        const x0 = 440 + rnd() * 50, dx = 40 + rnd() * 90;
        tl.fromTo(n, { x: x0, y: 560, opacity: 0, scale: 0.5, rotation: -10 },
          { x: x0 + dx, y: 330 - rnd() * 80, opacity: 1, scale: 1.1, rotation: 15, duration: 1.8, ease: 'sine.out', immediateRender: false }, k);
        tl.to(n, { opacity: 0, duration: 0.4 }, k + 1.5);
      }
    }
  },
  // meaning card appears: lift the palm-leaf book and smile wider
  meaning(tl, t) {
    tl.to('#book', { y: -24, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t);
    tl.to('#smile', { scaleY: 1.5, svgOrigin: '300 284', duration: 0.25, yoyo: true, repeat: 1 }, t);
  },
  // chanting: back hand raises in blessing on each line
  chant(tl, t0, span, words) {
    tl.to('#armBLg', { rotation: -22, svgOrigin: '222 380', duration: 0.5, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + 0.2);
    tl.to('#armBRg', { rotation: 22, svgOrigin: '378 380', duration: 0.5, ease: 'back.out(2)', yoyo: true, repeat: 1 }, t0 + span * 0.45);
  },
  outro(tl, t0) {
    tl.to('#armBLg', { rotation: -26, svgOrigin: '222 380', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t0 + 0.3);
    tl.to('#swanWing', { rotation: -30, svgOrigin: '512 668', duration: 0.15, yoyo: true, repeat: 9 }, t0 + 0.3);
  }
};
