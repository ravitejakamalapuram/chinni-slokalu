const { chromium } = require('playwright');
(async () => {
  const [out, ...ts] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 0.25 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(800);
  await p.evaluate(() => document.fonts.ready); if (errs.length) console.log('ERR', errs.slice(0,5).join('\n'));
  for (const t of ts) { await p.evaluate(t => { window.__timelines.sup.seek(+t); }, t); await p.waitForTimeout(30); await p.screenshot({ path: `${out}_${String(t).padStart(6, '0')}.png` }); }
  console.log('errors:', errs.slice(0, 10).join('\n')); await b.close();
})();
