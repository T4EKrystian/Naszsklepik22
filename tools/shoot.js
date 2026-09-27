// Scroll through a draft like a reader and save one screenshot per step.
// Usage: node tools/shoot.js <file.html | http(s)://url> <outdir> <width> <height> <mobile 0|1> [waitMs]
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const [, , file, outdir, w, h, mobileFlag, waitArg] = process.argv;
const wait = +(waitArg || 1800);
(async () => {
  fs.mkdirSync(outdir, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const mobile = mobileFlag === '1';
  const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(/^https?:\/\//.test(file) ? file : 'file://' + path.resolve(file), { waitUntil: 'load', timeout: 180000 });
  await page.waitForTimeout(2500);
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  let y = 0, i = 0;
  while (y < H) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(wait);
    await page.screenshot({ path: `${outdir}/s${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 60 });
    i++; y += Math.round(+h * 0.85);
  }
  console.log(`${i} shots, scrollHeight ${H}${errs.length ? '\nERRORS:\n' + errs.join('\n') : ''}`);
  await browser.close();
})();
