"""Split a single-file draft into a light source (with {{a:ID}} tokens) and an asset folder."""
import re, sys, json, hashlib, base64, os
src, out_html, out_dir = sys.argv[1:4]
s = open(src, encoding='utf-8').read()
os.makedirs(out_dir, exist_ok=True)
EXT = {'image/jpeg': 'jpg', 'image/png': 'png', 'font/woff2': 'woff2'}
man = {}
def rep(m):
    mime, b64 = m.group(1), m.group(2)
    aid = hashlib.sha1(b64.encode()).hexdigest()[:12]
    if aid not in man:
        man[aid] = mime
        open(f'{out_dir}/{aid}.{EXT[mime]}', 'wb').write(base64.b64decode(b64))
    return '{{a:%s}}' % aid
t = re.sub(r'data:(image/jpeg|image/png|font/woff2);base64,([A-Za-z0-9+/=]+)', rep, s)
open(out_html, 'w', encoding='utf-8').write(t)
json.dump(man, open(f'{out_dir}/manifest.json', 'w'), indent=0, sort_keys=True)
print(len(man), 'assets;', len(t), 'bytes source')
