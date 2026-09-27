# Talizman Ochronny · intencja

Strona produktu i opowieść o bransoletce z obsydianu, tygrysiego oka i hematytu (szkic 16).

## Co jest gdzie

| Ścieżka | Co to jest |
|---|---|
| `src/szkic-16.src.html` | źródło strony: tu się edytuje |
| `src/assets/` | obrazy i fonty (`manifest.json`), w źródle jako `{{a:ID}}` |
| `public/` | **to idzie na Vercel**: `index.html`, pliki `a/` i `og.jpg` (obrazek podglądu linku) |
| `szkic-16-talizman.html` | ta sama strona w jednym pliku (podgląd bez serwera, audyty) |
| `tools/` | build i testy |
| `docs/s16/` | storyboard, pomysły, decyzje |
| `szkic-14-*.html`, `szkic-15-*.html` | starsze szkice, nie są publikowane |

## Build

Po każdej zmianie w `src/` zbuduj obie wersje i zacommituj wynik:

```sh
python3 tools/build.py src/szkic-16.src.html src/assets public/index.html --web   # na serwer
python3 tools/build.py src/szkic-16.src.html src/assets szkic-16-talizman.html    # jeden plik
```

W wersji `--web` pliki w `public/a/` mają w nazwie hash treści, dlatego serwer może je trzymać w cache przez rok.

Obrazek podglądu linku (`og:image`, 1200×630) powstaje z `tools/og.html`. Po zmianie ceny, nazwy albo zdjęcia wygeneruj go ponownie: `node tools/og.js`.

## Testy

```sh
node tools/audit.js szkic-16-talizman.html        # układ, kontrast, szwy, kurtyna, spokój, długość, rozmiar
python3 -m http.server 8123 -d public &           # lokalny serwer z wersją web
node tools/webcheck.js http://localhost:8123/     # wszystkie pliki dochodzą, WebGL, kurtyna
node tools/mobile.js http://localhost:8123/       # telefon: rozmiary, zwinięte punkty, obrazy, kurtyna, sakiewka
```

## Vercel

1. Vercel → **Add New… → Project** → zaimportuj to repozytorium.
2. **Framework Preset: Other**. Root Directory zostaw `./`, a Build Command i Output Directory puste. Wszystko jest ustawione w `vercel.json`: serwowany jest katalog `public/`, bez budowania.
3. **Deploy**. Produkcja idzie z gałęzi `main`, a każda inna gałąź dostaje własny adres podglądu.

`vercel.json` ustawia też nagłówki:
- roczny cache dla `/a/*`;
- `X-Robots-Tag: noindex, nofollow`, czyli strona na razie nie trafia do wyszukiwarek. Żeby to zmienić, usuń ten jeden nagłówek z `vercel.json` i zrób push.
