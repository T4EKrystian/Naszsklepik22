// DOM audit for a single-file draft. Exit code = number of failing categories.
// Usage: node tools/audit.js <file.html>
const path = require('path');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const file = path.resolve(process.argv[2]);
const fs = require('fs');
const LIMITS = { SMALL: 0, BODY: 0, CONTRAST: 0, DASH: 0, EYEBROWS: 12, GAPS: 0, HOVERBAR: 0, JSERR: 0, SEAM: 0, PAINT: 0, WALL: 0, PERF: 0, SIZE: 0, STAGE: 0, THREAD: 0, CURTAIN: 0, GESTURE: 0 };
// STAGE, THREAD, CURTAIN and GESTURE describe the mobile story (szkic 16) and are checked on the phone viewport only
const WALL_MAX = { desktop: 0.9, mobile: 0.5 };   // longest run of bare text, in screens
const PERF_MAX = 6;                                // plates rendered in one frame while scrolling
const VIEWS = [{ name: 'desktop', width: 1440, height: 900, mobile: false }, { name: 'mobile', width: 390, height: 844, mobile: true }];

const inPage = () => {
  const EXCLUDE = 'script,style,[hidden],[aria-hidden="true"],.sheet,.drawer,.lb,.tocp,.toast,.fly,.wbead';
  const lum = c => {
    const m = c.match(/[\d.]+/g).map(Number);
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]);
  };
  const bgOf = el => {
    for (let e = el; e; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor, m = c.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0.5)) return c;
    }
    return 'rgb(251,245,235)';
  };
  const label = el => (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : el.tagName.toLowerCase());
  const visible = el => {
    if (el.closest(EXCLUDE)) return false;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const out = { SMALL: [], BODY: [], CONTRAST: [], DASH: [], EYEBROWS: [], GAPS: [], HOVERBAR: [], SEAM: [], PAINT: [], WALL: [] };
  const W = innerWidth, VH = innerHeight;

  // text checks: every element that owns a non-empty text node
  const owners = new Set();
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (tw.nextNode()) { const t = tw.currentNode; if (t.textContent.trim()) owners.add(t.parentElement); }
  owners.forEach(el => {
    if (!visible(el)) return;
    const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    if (fs < 13) out.SMALL.push(`${label(el)} ${fs}px "${txt.slice(0, 40)}"`);
    if (el.tagName === 'P' && el.closest('main') && fs < 16) out.BODY.push(`${label(el)} ${fs}px "${txt.slice(0, 40)}"`);
    const a = lum(cs.color), b = lum(bgOf(el)), cr = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    const big = fs >= 24 || (fs >= 18.5 && +cs.fontWeight >= 600);
    if (cr < (big ? 3 : 4.5)) out.CONTRAST.push(`${label(el)} ${fs}px cr=${cr.toFixed(2)} "${txt.slice(0, 40)}"`);
    const d = (txt.match(/[–—]/g) || []).length;
    if (d) out.DASH.push(`${label(el)} x${d} "${txt.slice(0, 50)}"`);
  });
  // dashes hidden in script strings (toasts, captions, quotes shown later)
  document.querySelectorAll('script:not([type])').forEach(s => {
    const lines = s.textContent.split('\n').filter(l => /[–—]/.test(l) && !/^\s*(\/\/|\/\*)/.test(l));
    lines.forEach(l => out.DASH.push('script: ' + l.trim().slice(0, 70)));
  });

  document.querySelectorAll('main .eyebrow').forEach(e => { if (visible(e)) out.EYEBROWS.push(e.textContent.trim().slice(0, 40)); });

  // vertical gaps: document ranges no visible content covers
  const boxes = [];
  const pin = document.getElementById('pricePin');
  const pr = pin ? [pin.getBoundingClientRect().top + scrollY, pin.getBoundingClientRect().bottom + scrollY] : [0, 0];
  const push = el => { const r = el.getBoundingClientRect(); boxes.push([r.top + scrollY, r.bottom + scrollY]); };
  owners.forEach(el => { if (visible(el) && el.closest('main, footer, .ann, .top')) push(el); });
  document.querySelectorAll('main img, footer img, main .ink:not(.deco):not(.edge):not(.hlp):not(.ul), main button, main input').forEach(el => { if (visible(el)) push(el); });
  // a pinned (sticky) element is on screen across the whole block it sticks in
  document.querySelectorAll('main *').forEach(el => { if (getComputedStyle(el).position === 'sticky' && visible(el)) { const q = el.parentElement.getBoundingClientRect(); boxes.push([q.top + scrollY, q.bottom + scrollY]); } });
  // painted seams and ink curtains are content too
  document.querySelectorAll('main .seam, main .curtain').forEach(el => { if (getComputedStyle(el).display !== 'none') push(el); });
  boxes.sort((x, y) => x[0] - y[0]);
  let reach = 0;
  const main = document.querySelector('main'), mainTop = main.getBoundingClientRect().top + scrollY;
  reach = mainTop;
  boxes.forEach(([t, b]) => {
    if (t - reach > VH * 0.45 && !(t <= pr[1] && reach >= pr[0] - 1)) out.GAPS.push(`${Math.round(reach)}..${Math.round(t)} (${Math.round((t - reach) / VH * 100)}vh)`);
    reach = Math.max(reach, b);
  });

  // seams: every boundary between two blocks of the story is painted, and neighbours differ
  const all = [...document.querySelectorAll('main section:not(.sheet), main article.chapter, main .seam, main .curtain')].filter(el => getComputedStyle(el).display !== 'none');
  const seq = all.filter(b => !all.some(o => o !== b && b.contains(o)));
  const isSeam = el => el.matches('.seam, .curtain');
  const kinds = [];
  seq.forEach((el, i) => {
    if (isSeam(el)) { kinds.push({ k: el.dataset.seam, v: el.dataset.vol || 'Q', at: seq[i - 1] ? (seq[i - 1].id || seq[i - 1].className) : '?' }); return; }
    const nx = seq[i + 1];
    if (!nx) { out.SEAM.push(`${el.id || el.className} > footer: no seam`); return; }
    if (!isSeam(nx)) out.SEAM.push(`${el.id || el.className} > ${nx.id || nx.className}: no seam`);
  });
  kinds.forEach((s, i) => { const p = kinds[i - 1]; if (!p) return; if (p.k === s.k) out.SEAM.push(`same seam twice (${s.k}) after ${p.at} and ${s.at}`); if (p.v === 'L' && s.v === 'L') out.SEAM.push(`two loud seams in a row after ${p.at}`); });
  // painting: every block of the page carries at least one plate or brush
  seq.filter(el => !isSeam(el)).forEach(el => { if (!el.querySelector('.ink, .brush')) out.PAINT.push(`${el.id || el.className}: nothing painted`); });
  // walls of text: the longest vertical run holding text but no picture, ink, brush or pinned scene
  const cover = [];
  const pushC = el => { const q = el.getBoundingClientRect(); if (q.height > 40 && q.width > 40) cover.push([q.top + scrollY, q.bottom + scrollY]); };
  document.querySelectorAll('main img, main .ink:not(.hlp):not(.ul), main .brush, main svg, main .seam, main .curtain, main canvas.inkpad').forEach(el => { if (visible(el) || el.matches('.seam, .curtain')) pushC(el); });
  document.querySelectorAll('main *').forEach(el => { if (getComputedStyle(el).position === 'sticky' && visible(el)) { const q = el.parentElement.getBoundingClientRect(); cover.push([q.top + scrollY, q.bottom + scrollY]); } });
  const txt = [];
  owners.forEach(el => { if (visible(el) && el.closest('main')) { const q = el.getBoundingClientRect(); txt.push([q.top + scrollY, q.bottom + scrollY]); } });
  const covered = y => cover.some(([a, b]) => y >= a && y <= b), hasText = y => txt.some(([a, b]) => y >= a && y <= b);
  const m0 = mainTop, m1 = main.getBoundingClientRect().bottom + scrollY;
  let run = 0, start = 0;
  for (let y = m0; y < m1; y += 8) {
    if (covered(y)) { if (run > VH*window.__wallMax) out.WALL.push(`${Math.round(start)}..${Math.round(y)} (${(run/VH).toFixed(2)} screens)`); run = 0; continue; }
    if (hasText(y)) { if (!run) start = y; run += 8; }
  }
  return out;
};

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const fails = {};
  for (const v of VIEWS) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: v.mobile, hasTouch: v.mobile });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.goto('file://' + file, { waitUntil: 'load', timeout: 180000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => {
      window.__ink && window.__ink.snap(true);
      document.querySelectorAll('.fade').forEach(e => e.classList.add('in'));
      document.querySelectorAll('main details').forEach(d => { d.open = true; });
    });
    await page.waitForTimeout(400);
    await page.evaluate(m => { window.__wallMax = m; }, WALL_MAX[v.name]);
    const r = await page.evaluate(inPage);
    // performance: how many plates render in one frame while the page is scrolled through
    const H0 = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate(() => { window.__ink.snap(false); if (window.__ink.stats) window.__ink.stats.max = 0; });
    for (let y = 0; y < H0; y += v.height*0.5) { await page.evaluate(y => window.scrollTo(0, y), Math.round(y)); await page.waitForTimeout(70); }
    const peak = await page.evaluate(() => window.__ink.stats ? window.__ink.stats.max : -1);
    r.PERF = peak > PERF_MAX || peak < 0 ? [`${peak} plates rendered in one frame (max ${PERF_MAX})`] : [];
    await page.evaluate(() => window.__ink.snap(true));
    r.SIZE = fs.statSync(file).size > 14e6 ? [`${(fs.statSync(file).size/1e6).toFixed(1)} MB (max 14)`] : [];
    // buy bar: on desktop it must sit to one side, clear of centred copy
    if (!v.mobile) {
      const H = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let i = 1; i <= 12; i++) {
        await page.evaluate(y => window.scrollTo(0, y), Math.round(H * i / 13));
        await page.waitForTimeout(120);
        const b = await page.evaluate(() => { const el = document.getElementById('bar'); if (!el || !el.classList.contains('on')) return null; const q = el.getBoundingClientRect(); return { c: q.left + q.width / 2, w: innerWidth }; });
        if (b && Math.abs(b.c - b.w / 2) < b.w * 0.2) { r.HOVERBAR.push(`bar centre=${Math.round(b.c)} at y=${Math.round(H * i / 13)}`); break; }
      }
    }
    if (v.mobile) {
      Object.assign(r, { STAGE: [], THREAD: [], CURTAIN: [], GESTURE: [] });
      const top = sel => page.evaluate(q => { const el = document.querySelector(q); return el ? el.getBoundingClientRect().top + scrollY : null; }, sel);
      // the illustration stays on screen, full width, while its chapter is read
      for (const [ch, art] of [['#scrolly', '#scrolly .scrolly__frame'], ['#rozdzial-2', '#rozdzial-2 .arch'], ['#rozdzial-3', '#rozdzial-3 .arch'], ['#rozdzial-4', '#rozdzial-4 .arch'], ['#rozdzial-6', '#rozdzial-6 .wear__art']]) {
        const t0 = await top(ch), h = await page.evaluate(q => document.querySelector(q).offsetHeight, ch);
        let seen = 0, n = 0;
        for (let k = 1; k < 10; k++) {
          await page.evaluate(y => window.scrollTo(0, y), Math.round(t0 + h * k / 10 - v.height / 2));
          await page.waitForTimeout(60);
          const vis = await page.evaluate(q => { const r = document.querySelector(q).getBoundingClientRect(); return r.width < innerWidth * 0.6 ? 0 : (Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / innerHeight; }, art);
          n++; if (vis >= 0.35) seen++;
        }
        if (seen / n < 0.7) r.STAGE.push(`${ch}: illustration on screen in ${seen}/${n} samples`);
      }
      // the ink thread down the left edge of the phone
      await page.evaluate(y => window.scrollTo(0, y), (await top('#rozdzial-3')) + 200);
      await page.waitForTimeout(200);
      const th = await page.evaluate(() => { const el = document.getElementById('threadM'); if (!el) return 'missing'; const q = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.display === 'none' || cs.visibility === 'hidden' || !q.height ? 'hidden' : q.left > 16 ? 'left=' + q.left : ''; });
      if (th) r.THREAD.push('#threadM ' + th);
      // ink curtains flood the whole screen between chapters
      const curtains = await page.evaluate(() => document.querySelectorAll('.curtain').length);
      if (curtains < 3) r.CURTAIN.push(`${curtains} curtains (need 3)`);
      for (let i = 0; i < curtains; i++) {
        const y = await page.evaluate(k => { const c = document.querySelectorAll('.curtain')[k]; return c.getBoundingClientRect().top + scrollY + (c.offsetHeight - innerHeight) * 0.25; }, i);
        await page.evaluate(y => window.scrollTo(0, y), Math.round(y));
        await page.waitForTimeout(250);
        const t = await page.evaluate(k => { const el = document.querySelectorAll('.curtain .spillink')[k]; const p = el && window.__ink.plates.find(x => x.el === el); return p ? p.t : -1; }, i);
        if (t < 0.9) r.CURTAIN.push(`curtain ${i + 1}: t=${t.toFixed(2)} at its middle`);
      }
      // three stone gestures, each with a button alternative
      for (const g of ['tilt-obs', 'tilt-tig', 'hold-hem']) {
        const ok = await page.evaluate(q => { const el = document.querySelector(`[data-gesture="${q}"]`); return !!el && !!el.querySelector('[data-gesture-alt]'); }, g);
        if (!ok) r.GESTURE.push(`${g} missing or without a button alternative`);
      }
    }
    r.JSERR = errs;
    console.log(`\n=== ${v.name} ${v.width}x${v.height} ===`);
    for (const k of Object.keys(LIMITS)) {
      const list = r[k] || [], n = list.length, bad = n > LIMITS[k];
      if (bad) fails[k] = true;
      console.log(`${bad ? 'FAIL' : 'ok  '} ${k.padEnd(9)} ${n} (limit ${LIMITS[k]})`);
      if (bad) list.slice(0, 14).forEach(x => console.log('       - ' + x));
    }
    await ctx.close();
  }
  await browser.close();
  const n = Object.keys(fails).length;
  console.log(`\n${n ? 'AUDIT FAILED: ' + Object.keys(fails).join(', ') : 'AUDIT PASSED'}`);
  process.exit(n);
})();
