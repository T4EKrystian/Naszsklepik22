// The page as a web server delivers it (the --web build): every file arrives, no JS errors, the ink is painted with
// WebGL and the stain curtain washes away to the end. Reports what a reader downloads.
// Usage: node tools/webcheck.js <http(s)://url>   (exit code = number of failed checks)
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const url = process.argv[2];
let fails = 0;
const check = (ok, name, info = '') => { if(!ok) fails++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${info ? '  ' + info : ''}`); };

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const [name, w, h, m] of [['phone', 390, 844, true], ['desktop', 1440, 900, false]]) {
    console.log(`\n=== ${name} ${w}x${h} ===`);
    const page = await (await browser.newContext({ viewport: { width: w, height: h }, isMobile: m, hasTouch: m })).newPage();
    const bad = [], errs = [], bodies = [];
    page.on('requestfailed', r => bad.push(`${r.url()} (${r.failure() && r.failure().errorText})`));
    page.on('response', r => { if(r.url().startsWith('data:')) return; if(r.status() >= 400) bad.push(`${r.url()} ${r.status()}`); else bodies.push(r); });
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', c => { if(c.type() === 'error' || /WebGL|shader/i.test(c.text())) errs.push(c.text()); });
    await page.goto(url, { waitUntil: 'load', timeout: 180000 });
    await page.waitForTimeout(2500);
    // read the whole page like a reader, so every lazy picture is asked for
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for(let y = 0; y < H; y += h*0.8){ await page.evaluate(y => scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(1500);
    const gl = await page.evaluate(() => ({ noGl: document.documentElement.classList.contains('no-gl') || document.body.classList.contains('no-gl'), ink: !!window.__ink,
      painted: window.__ink ? window.__ink.plates.filter(p => p.t > 0.5).length : 0, plates: window.__ink ? window.__ink.plates.length : 0 }));
    // the stain: the drop lands once the sheet is pinned, then the reader's scroll washes it away
    const go = f => page.evaluate(f => { const c = document.querySelector('.curtain'); scrollTo(0, c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight)*f); }, f);
    const st = () => page.evaluate(() => { const el = document.querySelector('.curtain .spillink'); const q = window.__ink && window.__ink.plates.find(x => x.el === el); return q ? { t: q.t, L: q.lift } : { t: 0, L: 0 }; });
    await go(0.05); for(const t0 = Date.now(); (await st()).t < 0.99 && Date.now() - t0 < 30000;) await page.waitForTimeout(50);   // a software renderer is slow
    const spread = (await st()).t;
    for (const f of [0.5, 0.6, 0.7, 0.8, 0.9, 0.97]) { await go(f); await page.waitForTimeout(400); }
    for(const t0 = Date.now(); (await st()).L < 0.99 && Date.now() - t0 < 30000;) await page.waitForTimeout(50);
    const lift = (await st()).L;
    let total = 0, html = 0;
    for (const r of bodies) { try { const n = (await r.body()).length; total += n; if(r.request().resourceType() === 'document') html = n; } catch(e){} }
    check(bad.length === 0, 'every request answered', bad.length ? bad.slice(0, 5).join(', ') : `${bodies.length} files`);
    check(errs.length === 0, 'no JS errors', errs.slice(0, 3).join(' | '));
    check(!gl.noGl && gl.ink && gl.painted > 0, 'WebGL paints the plates', `${gl.painted}/${gl.plates} painted`);
    check(spread > 0.98 && lift > 0.98, 'the stain spreads and washes away', `t ${spread.toFixed(2)} lift ${lift.toFixed(2)}`);
    console.log(`     html ${(html/1024).toFixed(0)} KB, all files ${(total/1024/1024).toFixed(2)} MB`);
    await page.close();
  }
  await browser.close();
  console.log(fails ? `\nWEBCHECK FAILED (${fails})` : '\nWEBCHECK PASSED');
  process.exit(fails);
})();
