// Phone interactions of the story: tilt, hold, finger painting, breath, the three signs and the finale.
// Usage: node tools/mobile.js <file.html>   (exit code = number of failed checks)
const path = require('path');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const file = path.resolve(process.argv[2]);
const results = [];
const check = (name, ok, info = '') => { results.push({ name, ok }); console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? '  ' + info : ''}`); };

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + file, { waitUntil: 'load', timeout: 180000 });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const signs = () => page.evaluate(() => JSON.parse(localStorage.getItem('intencja-znaki') || '[]'));
  const scrollToEl = async (sel, frac = 0.5) => { await page.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight*f); }, [sel, frac]); await page.waitForTimeout(900); };
  const tilt = g => page.evaluate(g => window.dispatchEvent(new DeviceOrientationEvent('deviceorientation', { alpha: 0, beta: 40, gamma: g })), g);
  const closeSheets = () => page.evaluate(() => window.__ui && window.__ui.Layers.any() && window.__ui.Layers.close());

  // the phone thread runs down the left edge inside the story
  await scrollToEl('#rozdzial-3', 0.2);
  const th = await page.evaluate(() => { const t = document.getElementById('threadM'); const q = t.getBoundingClientRect(); return { left: q.left, h: q.height, op: getComputedStyle(t).opacity }; });
  check('thread on the left edge', th.left <= 16 && th.h > 200 && +th.op > 0.5, JSON.stringify(th));

  // obsidian: tilt from one side to the other
  await scrollToEl('#rozdzial-2 .gesture', 0.7);
  for (const g of [-5, -18, -24, 0, 18, 26]) { await tilt(g); await page.waitForTimeout(80); }
  await page.waitForTimeout(2500);
  check('tilt finds the mirror (obsidian)', (await signs()).includes('lustro'));
  await closeSheets(); await page.waitForTimeout(500);

  // tiger's eye: the same sweep
  await scrollToEl('#rozdzial-3 .gesture', 0.7);
  for (const g of [20, 26, 0, -20, -26]) { await tilt(g); await page.waitForTimeout(80); }
  await page.waitForTimeout(2500);
  check('tilt finds the eye (tiger\'s eye)', (await signs()).includes('oko'));
  await closeSheets(); await page.waitForTimeout(500);

  // hematite: a held thumb; a short tap does nothing
  await scrollToEl('#rozdzial-4 .gesture', 0.7);
  const box = await page.evaluate(() => { const r = document.querySelector('#rozdzial-4 .arch').getBoundingClientRect(); return { x: r.left + r.width*0.45, y: r.top + r.height*0.45 }; });
  await page.mouse.move(box.x, box.y); await page.mouse.down(); await page.waitForTimeout(150); await page.mouse.up();
  await page.waitForTimeout(600);
  check('a short tap on hematite does not give the seal', !(await signs()).includes('pieczec'));
  await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForTimeout(3000);
  check('holding hematite gives the seal', (await signs()).includes('pieczec'));
  const fin = await page.evaluate(() => document.getElementById('finaleSheet').classList.contains('on'));
  check('three signs open the finale', fin);
  const beads = await page.evaluate(() => document.querySelectorAll('#barBeads i.on').length);
  check('bead slots in the buy bar are full', beads === 3, `${beads}/3`);
  await closeSheets(); await page.waitForTimeout(600);

  // gesture buttons exist for every gesture
  const alts = await page.evaluate(() => ['tilt-obs', 'tilt-tig', 'hold-hem'].every(g => !!document.querySelector(`[data-gesture="${g}"] [data-gesture-alt]`)));
  check('every gesture has a button alternative', alts);

  // the intention is painted with a finger: paint the right third
  await scrollToEl('.inkpad', 0.5);
  const pad = await page.evaluate(() => { const r = document.querySelector('.inkpad').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  await page.mouse.move(pad.x + pad.w*0.72, pad.y + pad.h*0.3); await page.mouse.down();
  for (let i = 0; i < 30; i++) { await page.mouse.move(pad.x + pad.w*(0.7 + 0.25*Math.sin(i/3)), pad.y + pad.h*(0.25 + i/60)); await page.waitForTimeout(12); }
  await page.mouse.up(); await page.waitForTimeout(900);
  const intent = await page.evaluate(() => ({ sel: (document.querySelector('.pills [aria-selected="true"]') || {}).dataset?.int, stored: localStorage.getItem('intencja-int') }));
  check('painting over "powrót do siebie" picks hematite', intent.sel === 'hem' && intent.stored === 'hem', JSON.stringify(intent));

  // breath: holding starts it, letting go pauses it
  await scrollToEl('#breath', 0.5);
  const br = await page.evaluate(() => { const r = document.getElementById('breath').getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; });
  await page.mouse.move(br.x, br.y); await page.mouse.down(); await page.waitForTimeout(700);
  const during = await page.evaluate(() => document.getElementById('breathTxt').textContent);
  await page.mouse.up(); await page.waitForTimeout(200);
  const after = await page.evaluate(() => document.getElementById('breathTxt').textContent);
  check('holding the circle breathes, letting go pauses', /wdech/.test(during) && /przytrzymaj/.test(after), `${during} / ${after}`);

  // curtains flood the screen at the start of their pinned run
  const n = await page.evaluate(() => document.querySelectorAll('.curtain').length);
  let full = 0;
  for (let i = 0; i < n; i++) {
    await page.evaluate(k => { const c = document.querySelectorAll('.curtain')[k]; scrollTo(0, c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight)*0.2); }, i);
    await page.waitForTimeout(2000);
    const t = await page.evaluate(k => { const el = document.querySelectorAll('.curtain .spillink')[k]; const p = window.__ink.plates.find(x => x.el === el); return p ? p.t : -1; }, i);
    if (t >= 0.9) full++;
  }
  check('curtains cover the screen', n >= 3 && full === n, `${full}/${n}`);

  check('no JS errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  await browser.close();
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${failed ? `MOBILE FAILED: ${failed}` : 'MOBILE PASSED'}`);
  process.exit(failed);
})();
