// Renders tools/og.html (the link-preview picture, 1200x630) to public/og.jpg.
// Usage: node tools/og.js
const path = require('path');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  await p.goto('file://' + path.join(__dirname, 'og.html'), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const out = path.join(__dirname, '..', 'public', 'og.jpg');
  await p.screenshot({ path: out, type: 'jpeg', quality: 86 });
  console.log(out);
  await b.close();
})();
