// Phone behaviour of the page after the clean-up: sizes and the buy bar, the stone rows, folded points, pictures painted
// as they arrive, the one ink curtain and the bag.
// Usage: node tools/mobile.js <file.html | http(s)://url>   (exit code = number of failed checks)
const path = require('path');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const url = /^https?:\/\//.test(process.argv[2]) ? process.argv[2] : 'file://' + path.resolve(process.argv[2]);
const results = [];
const check = (name, ok, info = '') => { results.push({ name, ok }); console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? '  ' + info : ''}`); };

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(url, { waitUntil: 'load', timeout: 180000 });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const scrollToEl = async (sel, frac = 0.5) => { await page.evaluate(([s, f]) => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - innerHeight*f); }, [sel, frac]); await page.waitForTimeout(700); };

  // a calm page: none of the games, the thread or the extra sheets
  const noisy = await page.evaluate(() => ['[data-gesture]', '.inkpad', '#breath', '.knot', '#threadM', '#finaleSheet', '#signSheet', '#barBeads', '#album'].filter(q => document.querySelector(q)));
  check('no games, thread or extra sheets', noisy.length === 0, noisy.join(', '));

  // a size chip changes the fit line and the size in the buy bar
  await page.click('.sizes label:nth-child(3)');
  const sz = await page.evaluate(() => ({ bar: document.getElementById('barSize').textContent, fit: document.getElementById('fit').textContent }));
  check('size L shows in the fit line and the buy bar', sz.bar === 'L' && /19/.test(sz.fit), JSON.stringify(sz));
  await page.click('.sizes label:nth-child(2)');

  // the stone rows under the description lead to their chapters
  await scrollToEl('.about .stones', 0.4);
  await page.click('.about .stones [data-go="rozdzial-3"]');
  await page.waitForTimeout(1600);
  const ch3 = await page.evaluate(() => Math.round(document.getElementById('rozdzial-3').getBoundingClientRect().top));
  check('tiger\'s eye row jumps to chapter III', Math.abs(ch3) < 140, `top=${ch3}`);

  // the longer points are folded on a phone and open with a tap
  const folds = await page.evaluate(() => { const d = [...document.querySelectorAll('details[data-fold]')]; return { n: d.length, open: d.filter(x => x.open).length }; });
  check('longer points are folded on a phone', folds.n >= 12 && folds.open === 0, JSON.stringify(folds));
  await scrollToEl('#rozdzial-3 details[data-fold]', 0.5);
  await page.click('#rozdzial-3 details[data-fold] summary');
  await page.waitForTimeout(300);
  check('a tap opens a folded point', await page.evaluate(() => document.querySelector('#rozdzial-3 details[data-fold]').open));

  // pictures scroll with the text and are painted by the time they are on screen
  const painted = async (sel, key) => {
    await scrollToEl(sel, 0.1);
    let t = 0; for (let k = 0; k < 40 && t < 0.95; k++) { await page.waitForTimeout(200); t = await page.evaluate(([q, key]) => { const el = [...document.querySelectorAll(q + ' .ink')].find(e => e.dataset.art === key); const p = el && window.__ink.plates.find(x => x.el === el); return p ? p.t : 0; }, [sel, key]); }
    return t;
  };
  const tHem = await painted('#rozdzial-4 .arch', 'hem'), tHands = await painted('#rozdzial-6 .wear__art', 'hands');
  check('hematite and the hands are painted on screen', tHem >= 0.95 && tHands >= 0.95, `hem=${tHem.toFixed(2)} hands=${tHands.toFixed(2)}`);

  // the one curtain waits for its screen to pin, then the stain spreads
  // the software renderer is slow, so the pinned check waits for the ink (up to 8 s) instead of a fixed time
  const curT = () => page.evaluate(() => { const el = document.querySelector('.curtain .spillink'); const p = window.__ink.plates.find(x => x.el === el); return p ? +p.t.toFixed(2) : -1; });
  const cur = async (f, want) => { await page.evaluate(f => { const c = document.querySelector('.curtain'); scrollTo(0, c.getBoundingClientRect().top + scrollY + (f < 0 ? f*innerHeight : (c.offsetHeight - innerHeight)*f)); }, f); await page.waitForTimeout(400);
    for (let k = 0; want && k < 40 && (await curT()) < want; k++) await page.waitForTimeout(200);
    return curT(); };
  const n = await page.evaluate(() => document.querySelectorAll('.curtain').length);
  const dry = n ? await cur(-0.6) : -1, wet = n ? await cur(0.3, 0.9) : -1;
  check('one curtain: dry until its sheet rises, then the stain', n === 1 && dry === 0 && wet >= 0.9, `n=${n} before=${dry} pinned=${wet}`);

  // the bag: a size was chosen above, so the add from the story goes straight to the bag (otherwise the size sheet asks first)
  await scrollToEl('#rozdzial-5 .scta', 0.5);
  await page.click('#rozdzial-5 .scta [data-add]');
  await page.waitForTimeout(700);
  const sheet = await page.evaluate(() => document.getElementById('sizeSheet').classList.contains('on'));
  if (sheet) await page.click('#ssAdd');
  await page.waitForTimeout(2200);
  const bag = await page.evaluate(() => ({ open: document.getElementById('drawer').classList.contains('on'), items: document.querySelectorAll('#drItems .dr-item').length, size: (document.querySelector('#drItems .dsz [aria-pressed="true"]') || {}).textContent }));
  check('add from the story puts the bracelet in the bag, in the chosen size', !sheet && bag.open && bag.items === 1 && bag.size === 'M', JSON.stringify({ sheet, ...bag }));

  check('no JS errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  await browser.close();
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${failed ? `MOBILE FAILED: ${failed}` : 'MOBILE PASSED'}`);
  process.exit(failed);
})();
