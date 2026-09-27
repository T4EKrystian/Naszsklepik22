// DOM audit for a single-file draft. Exit code = number of failing categories.
// Usage: node tools/audit.js <file.html | http(s)://url>
const path = require('path');
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');

const web = /^https?:\/\//.test(process.argv[2]), file = web ? null : path.resolve(process.argv[2]), url = web ? process.argv[2] : 'file://' + file;
const fs = require('fs');
const LIMITS = { SMALL: 0, BODY: 0, CONTRAST: 0, DASH: 0, EYEBROWS: 12, GAPS: 0, HOVERBAR: 0, JSERR: 0, SEAM: 0, PAINT: 0, WALL: 0, PERF: 0, SIZE: 0, PICTURE: 0, CALM: 0, LENGTH: 0, CURTAIN: 0 };
// PICTURE, CALM, LENGTH and CURTAIN describe the phone story (szkic 16, after the clean-up) and are checked on the phone viewport only
const WALL_MAX = { desktop: 0.9, mobile: 0.75 };   // longest run of bare text, in screens (phone: the owner's full text, longer points folded)
const PERF_MAX = 6;                                // plates rendered in one frame while scrolling
const VIEWS = [{ name: 'desktop', width: 1440, height: 900, mobile: false }, { name: 'mobile', width: 390, height: 844, mobile: true }];

// walls of text: the longest vertical run of reading text (paragraphs, list items) with no picture, ink, brush, control or pinned scene beside it
const wallPage = max => {
  const VH = innerHeight, out = [];
  const shown = el => { const cs = getComputedStyle(el), q = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0 && q.width > 0 && q.height > 0 && !el.closest('[hidden],[aria-hidden="true"],.sheet,.drawer'); };
  const Y = el => { const q = el.getBoundingClientRect(); return [q.top + scrollY, q.bottom + scrollY]; };
  const cover = [], txt = [];
  document.querySelectorAll('main img, main .ink:not(.hlp):not(.ul), main .brush, main svg, main button, main input, main label, main summary, main .btn, main canvas').forEach(el => { if (shown(el) && el.getBoundingClientRect().height > 30) cover.push(Y(el)); });
  document.querySelectorAll('main .seam, main .curtain').forEach(el => { if (getComputedStyle(el).display !== 'none') cover.push(Y(el)); });
  document.querySelectorAll('main *').forEach(el => { if (getComputedStyle(el).position === 'sticky' && shown(el)) cover.push(Y(el.parentElement)); });
  document.querySelectorAll('main p, main li, main dd, main blockquote, main q').forEach(el => { if (shown(el) && !el.closest('button, summary, label, .btn, .toc') && el.innerText.trim().length > 20) txt.push(Y(el)); });
  const main = document.querySelector('main'), [m0, m1] = Y(main);
  const covered = y => cover.some(([a, b]) => y >= a && y <= b), hasText = y => txt.some(([a, b]) => y >= a && y <= b);
  let run = 0, start = 0;
  let last = m0;
  const close = y => { if (run > VH*max) out.push(`${Math.round(start)}..${Math.round(y)} (${(run/VH).toFixed(2)} screens)`); run = 0; };
  for (let y = m0; y < m1; y += 8) {
    if (covered(y)) { close(last); continue; }
    if (!hasText(y)) continue;
    if (!run) start = y; run += 8; last = y;
  }
  close(last);
  return out;
};

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
  const out = { SMALL: [], BODY: [], CONTRAST: [], DASH: [], EYEBROWS: [], GAPS: [], HOVERBAR: [], SEAM: [], PAINT: [] };
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

  // seams: wherever the paper changes colour the change is painted (one calm seam, or the one curtain); no seam on the same paper
  const all = [...document.querySelectorAll('main section:not(.sheet), main article.chapter, main .seam, main .curtain')].filter(el => getComputedStyle(el).display !== 'none');
  const seq = all.filter(b => !all.some(o => o !== b && b.contains(o)));
  const isSeam = el => el.matches('.seam, .curtain');
  const paper = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; } return 'body'; };
  seq.forEach((el, i) => {
    if (isSeam(el)) { if (el.matches('.seam') && el.dataset.seam !== 'horizon') out.SEAM.push(`${el.dataset.seam} seam after ${seq[i - 1] ? (seq[i - 1].id || seq[i - 1].className) : '?'} (one calm seam only)`); return; }
    const nx = seq[i + 1]; if (!nx || isSeam(nx)) return;
    if (paper(el) !== paper(nx)) out.SEAM.push(`${el.id || el.className} > ${nx.id || nx.className}: the paper changes without a seam`);
  });
  // painting: every block of the page carries at least one plate or brush
  seq.filter(el => !isSeam(el)).forEach(el => { if (!el.querySelector('.ink, .brush')) out.PAINT.push(`${el.id || el.className}: nothing painted`); });
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
    await page.goto(url, { waitUntil: 'load', timeout: 180000 });
    await page.waitForTimeout(1500);
    await page.evaluate(() => { window.__ink && window.__ink.snap(true); document.querySelectorAll('.fade').forEach(e => e.classList.add('in')); });
    await page.waitForTimeout(300);
    const WALL = await page.evaluate(wallPage, WALL_MAX[v.name]);
    await page.evaluate(() => document.querySelectorAll('main details').forEach(d => { d.open = true; }));
    await page.waitForTimeout(400);
    const r = await page.evaluate(inPage);
    r.WALL = WALL;
    // performance: how many plates render in one frame while the page is scrolled through
    const H0 = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.evaluate(() => { window.__ink.snap(false); if (window.__ink.stats) window.__ink.stats.max = 0; });
    for (let y = 0; y < H0; y += v.height*0.5) { await page.evaluate(y => window.scrollTo(0, y), Math.round(y)); await page.waitForTimeout(70); }
    const peak = await page.evaluate(() => window.__ink.stats ? window.__ink.stats.max : -1);
    r.PERF = peak > PERF_MAX || peak < 0 ? [`${peak} plates rendered in one frame (max ${PERF_MAX})`] : [];
    await page.evaluate(() => window.__ink.snap(true));
    r.SIZE = web ? [] : fs.statSync(file).size > 14e6 ? [`${(fs.statSync(file).size/1e6).toFixed(1)} MB (max 14)`] : [];
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
      Object.assign(r, { PICTURE: [], CALM: [], LENGTH: [], CURTAIN: [] });
      const top = sel => page.evaluate(q => { const el = document.querySelector(q); return el ? el.getBoundingClientRect().top + scrollY : null; }, sel);
      // the pictures scroll with the text: each one is painted by the time it is on screen
      for (const [art, key] of [['#rozdzial-3 .arch', 'tig'], ['#rozdzial-4 .arch', 'hem'], ['#rozdzial-6 .wear__art', 'hands']]) {
        await page.evaluate(q => { const e = document.querySelector(q); scrollTo(0, e.getBoundingClientRect().top + scrollY - 80); }, art);
        let t = 0;
        for (let k = 0; k < 40 && t < 0.95; k++) { await page.waitForTimeout(200); t = await page.evaluate(([q, key]) => { const el = [...document.querySelectorAll(q + ' .ink')].find(e => e.dataset.art === key); const p = el && window.__ink.plates.find(x => x.el === el); return p ? p.t : 0; }, [art, key]); }
        if (t < 0.95) r.PICTURE.push(`${art}: painted to ${t.toFixed(2)} after 8 s on screen`);
      }
      // a calm page: no games, no thread, no extra layers
      const noisy = await page.evaluate(() => ['[data-gesture]', '.inkpad', '#breath', '.knot', '#threadM', '#finaleSheet', '#signSheet', '.sign', '#barBeads', '#album'].filter(q => document.querySelector(q)));
      noisy.forEach(q => r.CALM.push(`${q} is still on the page`));
      const screens = await page.evaluate(() => { document.querySelectorAll('details[data-fold]').forEach(d => { d.open = false; }); return document.documentElement.scrollHeight / innerHeight; });
      if (screens > 36) r.LENGTH.push(`${screens.toFixed(1)} phone screens (max 36)`);
      // one ink curtain (II): a stain that stays off the sheet until it rises, covers its part while pinned, and is washed away before the pin lets go
      const curtains = await page.evaluate(() => document.querySelectorAll('.curtain').length);
      if (curtains !== 1) r.CURTAIN.push(`${curtains} curtains (one only)`);
      for (let i = 0; i < curtains; i++) {
        const at = async f => {
          const y = await page.evaluate(([k, f]) => { const c = document.querySelectorAll('.curtain')[k]; return c.getBoundingClientRect().top + scrollY + (f < 0 ? f * innerHeight : (c.offsetHeight - innerHeight) * f); }, [i, f]);
          await page.evaluate(y => window.scrollTo(0, y), Math.round(y));
          await page.waitForTimeout(250);
          return page.evaluate(k => { const el = document.querySelectorAll('.curtain .spillink')[k]; const p = el && window.__ink.plates.find(x => x.el === el); return p ? { t: p.t, L: p.lift || 0 } : { t: -1, L: -1 }; }, i);
        };
        const pre = await at(-0.6), hold = await at(0.3), end = await at(0.96);
        if (pre.t > 0.01) r.CURTAIN.push(`curtain ${i + 1}: ink before its sheet rises (t=${pre.t.toFixed(2)})`);
        if (hold.t < 0.9 || hold.L > 0.05) r.CURTAIN.push(`curtain ${i + 1}: t=${hold.t.toFixed(2)} lift=${hold.L.toFixed(2)} while pinned`);
        if (end.L < 0.95) r.CURTAIN.push(`curtain ${i + 1}: still ${Math.round((1 - end.L) * 100)} % of the stain when the pin lets go`);
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
