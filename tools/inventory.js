// Section inventory for design review: words, height, visuals and the longest run of bare text per section.
// Usage: node tools/inventory.js <file.html> <out.json>
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const [, , file, out] = process.argv;
const VIEWS = [{ name: 'mobile', width: 390, height: 844, mobile: true }, { name: 'desktop', width: 1440, height: 900, mobile: false }];

const inPage = () => {
  const VH = innerHeight;
  const Y = el => { const q = el.getBoundingClientRect(); return [q.top + scrollY, q.bottom + scrollY]; };
  const shown = el => { const cs = getComputedStyle(el), q = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0 && q.width > 0 && q.height > 0; };
  // leaf story blocks: chapters plus the plain sections around them
  let blocks = [...document.querySelectorAll('main [data-chapter], main section:not(.sheet)')].filter(shown);
  blocks = blocks.filter(b => !blocks.some(o => o !== b && b.contains(o)));
  const bg = el => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (!/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; } return 'page'; };
  return blocks.map(b => {
    const [top, bot] = Y(b);
    const words = (b.innerText || '').split(/\s+/).filter(Boolean).length;
    const vis = [...b.querySelectorAll('img, .ink:not(.hlp):not(.ul), svg, canvas.inkpad')].filter(shown);
    const plates = [...b.querySelectorAll('.ink')].filter(shown);
    const cover = vis.filter(v => v.getBoundingClientRect().height > 60).map(Y);
    b.querySelectorAll('*').forEach(el => { if (getComputedStyle(el).position === 'sticky' && shown(el)) cover.push(Y(el.parentElement)); });
    // text-only runs: stretches holding text but no visual at any x
    const text = [];
    const tw = document.createTreeWalker(b, NodeFilter.SHOW_TEXT);
    while (tw.nextNode()) { const n = tw.currentNode, p = n.parentElement; if (n.textContent.trim() && p && shown(p)) text.push(Y(p)); }
    cover.sort((x, y) => x[0] - y[0]);
    const covered = y => cover.some(([a, c]) => y >= a && y <= c);
    let run = 0, best = 0, bestAt = 0, runStart = 0;
    for (let y = top; y < bot; y += 8) {
      const hasText = text.some(([a, c]) => y >= a && y <= c);
      if (hasText && !covered(y)) { if (!run) runStart = y; run += 8; if (run > best) { best = run; bestAt = runStart; } }
      else if (covered(y)) run = 0;
    }
    return {
      id: b.id || null, cls: b.className, title: b.dataset.title || (b.querySelector('h2,h3') || {}).innerText || '',
      top: Math.round(top), height: Math.round(bot - top), screens: +((bot - top) / VH).toFixed(2), words,
      headings: [...b.querySelectorAll('h2,h3')].filter(shown).map(h => h.innerText.replace(/\s+/g, ' ').trim()).slice(0, 14),
      images: vis.filter(v => v.tagName === 'IMG').length, plates: plates.length, decoPlates: plates.filter(p => p.classList.contains('deco')).length,
      arts: [...new Set(plates.map(p => p.dataset.art).filter(Boolean))],
      longestTextRun: { px: best, screens: +(best / VH).toFixed(2), at: Math.round(bestAt) },
      paperTop: bg(b), edgeTop: !!b.querySelector(':scope > .ink.edge'),
    };
  });
};

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const res = {};
  for (const v of VIEWS) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.mobile, hasTouch: v.mobile });
    const page = await ctx.newPage();
    await page.goto('file://' + path.resolve(file), { waitUntil: 'load', timeout: 180000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { window.__ink && window.__ink.snap(true); document.querySelectorAll('.fade').forEach(e => e.classList.add('in')); });
    await page.waitForTimeout(300);
    res[v.name] = await page.evaluate(inPage);
    await ctx.close();
  }
  await browser.close();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(res, null, 1));
  for (const b of res.mobile) console.log(`${(b.id || b.cls).padEnd(22).slice(0, 22)} ${String(b.screens).padStart(5)} scr ${String(b.words).padStart(5)} w  img ${b.images} ink ${b.plates}  bare text ${b.longestTextRun.screens} scr`);
})();
