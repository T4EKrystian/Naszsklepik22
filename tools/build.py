"""Inline every {{a:ID}} token of a source draft back into base64 data URIs."""
import re, sys, json, base64
src, assets, out = sys.argv[1:4]
man = json.load(open(f'{assets}/manifest.json'))
EXT = {'image/jpeg': 'jpg', 'image/png': 'png', 'font/woff2': 'woff2', 'image/webp': 'webp'}
def rep(m):
    aid = m.group(1); mime = man[aid]
    return f'data:{mime};base64,' + base64.b64encode(open(f'{assets}/{aid}.{EXT[mime]}', 'rb').read()).decode()
html = re.sub(r'\{\{a:([A-Za-z0-9_]+)\}\}', rep, open(src, encoding='utf-8').read())
open(out, 'w', encoding='utf-8').write(html)
print(out, len(html) // 1024, 'KB')
