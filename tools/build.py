"""Build a page from a source draft: every {{a:ID}} token becomes an asset.

  python3 tools/build.py SRC ASSETS OUT.html          one self-contained file (base64 data URIs)
  python3 tools/build.py SRC ASSETS OUT.html --web    OUT.html plus OUT_DIR/a/<hash>.<ext>, for a web server

In --web mode the files are named by a hash of their content (not by the asset ID, which may outlive an edit
of the file), so they can be cached for good; OUT_DIR/a is emptied first, so no stale file is left behind.
"""
import re, sys, json, base64, hashlib, os, shutil
src, assets, out = sys.argv[1:4]
web = '--web' in sys.argv[4:]
man = json.load(open(f'{assets}/manifest.json'))
EXT = {'image/jpeg': 'jpg', 'image/png': 'png', 'font/woff2': 'woff2', 'image/webp': 'webp'}
if web:
    adir = os.path.join(os.path.dirname(os.path.abspath(out)), 'a')
    shutil.rmtree(adir, ignore_errors=True); os.makedirs(adir)
    names = {}
def rep(m):
    aid = m.group(1); mime = man[aid]
    data = open(f'{assets}/{aid}.{EXT[mime]}', 'rb').read()
    if not web:
        return f'data:{mime};base64,' + base64.b64encode(data).decode()
    if aid not in names:
        names[aid] = f'{hashlib.sha1(data).hexdigest()[:12]}.{EXT[mime]}'
        open(os.path.join(adir, names[aid]), 'wb').write(data)
    return 'a/' + names[aid]
html = re.sub(r'\{\{a:([A-Za-z0-9_]+)\}\}', rep, open(src, encoding='utf-8').read())
open(out, 'w', encoding='utf-8').write(html)
print(out, len(html) // 1024, 'KB' + (f' + {len(names)} files in {os.path.relpath(adir)}' if web else ''))
