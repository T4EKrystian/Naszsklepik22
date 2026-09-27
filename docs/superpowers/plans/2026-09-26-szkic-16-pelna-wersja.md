# Szkic 16 „Teatr atramentu”: pełna, spójna wersja

> Wykonanie: etapami, każdy kończy się buildem, audytem, zrzutami (telefon i desktop) i commitem na `claude/compassionate-franklin-ufuj0x`. Bez PR.

## Kontekst
Prośba użytkownika:
- mocno rozbudować stronę;
- malować częściej i ładniej;
- każdy element ma do siebie pasować, przejścia między sekcjami mają być piękne;
- żadnych ścian tekstu: więcej grafik i pociągnięć pędzla;
- agenci wymyślają setki pomysłów, wybieramy te sensowne, potem sprawdzamy kompletność;
- efekt: gotowy, spójny projekt;
- korzystać z Higgsfield (dołożone kredyty).

**Stan:**
- Szkic 15 gotowy.
- Szkic 16: zadanie M1 (testy mobile) jest w commicie `16cc8d5`. M2 (przypięte sceny na telefonie) jest zrobione w `src/szkic-16.src.html`, ale bez commita; zostaje 1 luka GAPS między `#rozdzial-5` a `#rozdzial-6`.
- Higgsfield: saldo **107,26 kr.** Generowanie działa. **Pobieranie obrazów blokuje polityka sieci:** `d8j0ntlcm91z4.cloudfront.net` i `d2ol7oe51mr4n9.cloudfront.net` dają 403. Innych dróg nie ma: sprawdzone S3, GitHub, hosty Higgsfield i hostingi.

**Efekt końcowy:**
- Każda sekcja ma swój moment malowania i malowane przejście do następnej.
- Tekst dzieli się na krótkie porcje przeplatane grafiką.
- Jeden język wizualny (granatowy tusz na ciepłym papierze, brąz jako akcent).
- Na telefonie opowieść prowadzona sceną i gestami (plan szkicu 16).
- Całość przechodzi automatyczny audyt i przegląd kompletności.

## Etap 0: odblokowanie Higgsfield (akcja użytkownika) i domknięcie M2
- [ ] **Użytkownik:** w ustawieniach środowiska (menu środowiska na pasku tytułu sesji → Edit → Network access) dodać `d8j0ntlcm91z4.cloudfront.net` i `d2ol7oe51mr4n9.cloudfront.net` do dozwolonych domen albo wybrać szerszy poziom dostępu.
  - Do tego czasu generuję obrazy (zostają w bibliotece Higgsfield). Strona ma gotowe miejsca na assety z proceduralnym atramentem jako zapasem.
- [ ] Luka GAPS (mobile, 28099..28762): koniec `.trio` plus górny padding `.wear .wrap.grid` (`clamp(110px,12vw,190px)`). Na telefonie skrócić ten padding; przejście `trio → wear` i tak dostaje szew (Etap 2).
- [ ] Commit `feat(s16): pinned mobile stages` (src, build, sticky-aware GAPS w `tools/audit.js`).

## Etap 1: burza pomysłów (workflow wieloagentowy, użytkownik wyraził zgodę)
**Wejście przygotowuję sam** (skrypt, bez agentów):
- `tools/inventory.js` tworzy `docs/s16/inventory.json`. Dla każdej sekcji `main > section` zapisuje: liczbę słów, wysokość w ekranach (390×844 i 1440×900), listę grafik i płyt `.ink`, najdłuższy odcinek „sam tekst” w px, kolor papieru na początku i końcu oraz rodzaj obecnego przejścia.
- Arkusze zrzutów (`sheet.py`) desktop i telefon trafiają do `docs/s16/sheets/`.

**Workflow `s16-ideas`** (7 agentów, schemat JSON na wyjściu):
1. **Pomysły** (5 równoległych, każdy ≥ 50 pomysłów, łącznie ≥ 250). Każdy pomysł ma pola: `id, obszar, sekcja, opis, desktop, telefon, zasób (proc|higgsfield|brak), koszt S/M/L, ryzyko_kiczu`.
   - a) przejścia między sekcjami;
   - b) momenty malowania pędzlem i tuszem;
   - c) grafiki i ilustracje (co narysować, seria Higgsfield w jednym stylu);
   - d) zamiana ścian tekstu na obraz (osie, liczby, cytaty pędzlem, infografiki tuszem);
   - e) telefon, gesty i spójność części sprzedażowej (PDP, album, kolekcja, stopka).
   - Każdy agent dostaje:
     - ścieżki do `src/szkic-16.src.html` i `inventory.json`;
     - arkusze zrzutów;
     - reguły (patrz „Reguły” niżej);
     - możliwości silnika (`Plate`: kinds ink/wash/paint/spill/brush, tryby);
     - informację, że Higgsfield jest warunkowy.
2. **Selekcja** (1 sędzia):
   - usuwa duplikaty;
   - ocenia 1–5 w sześciu kryteriach: spójność z tuszem na papierze, antykicz, czytelność i WCAG, wydajność na telefonie, wykonalność w silniku jednego pliku, siła „wow”;
   - wybiera 35–45 pomysłów;
   - składa **storyboard**: dla każdej sekcji jedno przejście wejścia, jeden główny moment malowania, grafiki, limit tekstu i rytm (sekcje intensywne na przemian z cichymi).
3. **Krytyk** (1, adwersarialny): sprawdza storyboard pod kątem powtórzeń, zmęczenia efektem, kiczu, spójności palety i kosztu na słabym telefonie. Zwraca poprawki, które sędzia nanosi.

**Wyjście:**
- `docs/s16/pomysly.md` (wszystkie pomysły z ocenami) i `docs/s16/storyboard.md`.
- Podgląd katalogu pomysłów i storyboardu jako Artifact dla użytkownika.
- Pracuję dalej bez czekania; użytkownik może korygować.

**Reguły dla wszystkich agentów (z design-taste i szkicu 15):**
- bez myślników em/en;
- tekst ≥ 13 px, akapity ≥ 16 px;
- kontrast WCAG;
- jedna skala promieni;
- bez „okienek” z ramkami;
- ilustracje duże i wylewające się z lewej;
- plamy i ensō zostają;
- brąz ciemniejszy;
- twarde spacje po jednoliterowych słowach;
- bez emoji i ikon clipartowych;
- pasek zakupu na desktopie nie jest wyśrodkowany.

## Etap 2: fundament spójności: pędzel, szwy, papier
Robię to przed wdrażaniem pomysłów, bo storyboard będzie z tych elementów korzystał.
- [ ] **Silnik pędzla** `kind:'brush'` w istniejącym `Plate` (canvas 2D, ta sama pętla `painters` i `nearIO`):
  - stemple włosia wzdłuż ścieżki SVG (`getPointAtLength`);
  - nacisk ze zmienną szerokością, suchy pędzel (przerwy z szumu), wilgotny brzeg;
  - odsłanianie według `t` (scroll, once, manual);
  - opcjonalna maska tekstury pędzla z Higgsfield.
  - Zastosowania: podkreślenia tytułów, ensō wokół liczb, strzałki i obwódki w infografikach, kaligraficzne cyfry rozdziałów, dzielniki.
- [ ] **Szwy między sekcjami** `.seam` w trzech wariantach; dwa takie same nigdy nie stoją obok siebie:
  - `curtain`: pełny zalew tuszem z numerem rozdziału (dawne M3, `fsSpill` + `uFull`, tryb `curtain`);
  - `bleed`: papier następnej sekcji wsiąka w poprzednią akwarelowym brzegiem z linią przypływu (`fsWash`);
  - `stroke`: szerokie pociągnięcie pędzla przez ekran zmienia kolor papieru.
- [ ] **Ciągłość papieru:** kolory sekcji z jednej palety tokenów (`--paper-*`). Granice sekcji tylko przez szew, bez prostokątnych krawędzi. Wspólna tekstura papieru `--paper-tex`.
- [ ] Audyt: nowe kategorie `SEAM`, `PAINT`, `WALL` (opis w „Weryfikacji”). Szkic 15 ma ich nie przejść.

## Etap 3: mechanika opowieści na telefonie (reszta planu szkicu 16)
Bez zmian w założeniach, dopasowane do storyboardu:
- **M4:** nić `#threadM` przy lewej krawędzi, supełki przy II–IV, gniazda koralików w pasku zakupu, „Nawleczone”.
- **M5:** gesty kamieni:
  - moduł `Tilt` z żyroskopem, zgodą iOS, zapasowym przeciąganiem i myszą;
  - przechylenie: lustro obsydianu, pas kociego oka;
  - przytrzymanie: pieczęć hematytu;
  - przyciski „Pokaż …” jako alternatywa; znak `oko` przechodzi do rozdziału III.
- **M6:** malowanie intencji palcem (`.inkpad`) i oddech przez przytrzymanie.
- **M7:** `haptic()` oraz tekst nasiąkający atramentem słowo po słowie (`.soak`, `animation-timeline: view()` z fallbackiem).

## Etap 4: wdrożenie storyboardu, sekcja po sekcji
Kolejność od góry, jeden commit na grupę sekcji:
- **PDP:** pasek zakupu i szczegóły dostają pędzel (podkreślenia, ensō ceny, malowane ikony cech). Akordeony pozostają, ale z malowanymi znacznikami.
- **Prolog i rozdział I:** sceny epok, rok malowany pędzlem, oś czasu tuszem zamiast akapitów.
- **Rozdziały II–IV (kamienie):**
  - pochodzenie jako malowana scena (wulkan, warstwy skały, ruda żelaza);
  - fakty jako liczby w ensō (twardość, gęstość);
  - „Początek wierzeń” jako oś z pociągnięciami pędzla;
  - „Karta kamienia” jako pieczęć.
- **Rozdział V:** nawlekanie jako duży malowany gest. **Rozdział VI:** malowane dłonie i kroki oddechu.
- **Epilog 75 → 3:** cyfry pisane pędzlem.
- **Album, „Prawdziwe zdjęcia”, zamknięcie, kolekcja, stopka:** przejścia `bleed`/`stroke`, karty kolekcji z wywoływaniem cyjanotypii (istniejące `fsPaint`), stopka z tuszowym horyzontem.
- **Budżet tekstu:** na telefonie żaden odcinek samego tekstu nie jest wyższy niż 1 ekran. Dłuższe treści (np. „Karta kamienia”) idą w malowane wiersze albo rozwijane szczegóły.
- Dokładną listę elementów ustala storyboard z Etapu 1. Kategorie powyżej to minimum.

## Etap 5: Higgsfield: spójna seria grafik
Generowanie ruszy równolegle z Etapami 2–4, zaraz po storyboardzie.
- [ ] Model wybiorę przez `models_explore(action:'recommend')`. Domyślnie `gpt_image_2_5`, ok. 0,25 kr./obraz; przed każdą partią `get_cost`.
- [ ] Jeden stały dopisek stylu do promptów: „sumi-e, granatowy indygo tusz na ciepłym papierze washi, luźny mokry pędzel, dużo pustego miejsca, kompozycja ciężka po lewej, bez tekstu”. Prompty i partie trzymam w `docs/s16/higgsfield.md`.
- [ ] Zestaw (ok. 40–60 obrazów z wariantami, ok. 15–25 kr., limit 40 kr.):
  - sceny sekcji w wersji szerokiej na desktop i pionowej 9:16 na telefon: prolog, 5 epok, 3 pochodzenia kamieni, trio, dłonie, sakiewka;
  - tekstury pędzla na biało jako maski: 6 pociągnięć suchym pędzlem, 3 rozpryski, 2 ensō;
  - 6 gotowych panoram z poprzedniej sesji.
- [ ] Po odblokowaniu hosta:
  - pobranie, wybór najlepszych wariantów, kompresja (JPEG/WebP ≤ 1400 px desktop, ≤ 900 px telefon, maski PNG w skali szarości);
  - `tools/split.py` i manifest;
  - podpięcie `ART.<k>.illusWide/illusMobile` oraz tekstur do silnika pędzla.
- [ ] Bez odblokowania: proceduralne pędzle i obecne ilustracje. Wymienię dokładnie, co czeka w bibliotece Higgsfield.
- **Limit pliku:** ≤ 14 MB (Artifact przyjmuje do 16 MB; dziś 8,3 MB).

## Etap 6: kompletność („gotowy projekt”)
**Workflow `s16-review`** (3 agenci, każdy dostaje zrzuty i źródło):
- a) desktop 1440;
- b) telefon 390/360/430;
- c) treść i sprzedaż: spójność nazw, cen, rozmiarów, wezwań do działania, stanów końcowych interakcji, pustych stanów, linków, stopki i dostępności.

Każdy agent zwraca listę braków z priorytetem. Poprawiam i powtarzam, aż lista będzie pusta z priorytetem wysokim i średnim (maks. 3 rundy).

**Lista kontrolna „gotowego”:**
- każda sekcja ma przejście wejścia, moment malowania i zakończenie;
- brak placeholderów i „szkicowych” napisów poza stopką wersji;
- każda interakcja ma stan końcowy i wersję bez ruchu;
- jedna paleta i jedna typografia.

Otwarte pytania treściowe (8 mm czy 6 mm, S/M/L, „ręczne, Polska”) zostają z obecnymi wartościami. Wypiszę je w podsumowaniu.

## Pliki
| Plik | Zmiana |
|---|---|
| `src/szkic-16.src.html` → `szkic-16-talizman.html` | cała praca (build `tools/build.py`) |
| `src/assets/` + `manifest.json` | nowe assety Higgsfield, jeśli pobrane |
| `tools/audit.js` | GAPS dla sticky; SEAM, PAINT, WALL, PERF; istniejące STAGE, THREAD, CURTAIN, GESTURE |
| `tools/inventory.js` (nowy) | inwentarz sekcji dla agentów |
| `tools/mobile.js` (nowy) | interakcje telefonu (przechył, przytrzymanie, malowanie, oddech, kurtyny, finał) |
| `docs/s16/` | pomysły, storyboard, prompty Higgsfield, raporty przeglądu |

Do ponownego użycia (`src/szkic-16.src.html`):
- silnik: `Plate` i jego tryby, `R.prepare/render`, `painters`, `nearIO`, `fsSpill`, `fsWash`, `fsPaint`;
- gra: `found()`, `beadFly()`, `layKnots()`, `paintThread()`, `putSeal()`, `artPoint()`;
- rozdziały: `scrolly`, `trio`, `.sheen`, `breath`, `openFinale()`, `buzz()`.

Narzędzia w scratchpadzie: `sheet.py`, `verify.js`.

## Weryfikacja
- `python3 tools/build.py src/szkic-16.src.html src/assets szkic-16-talizman.html && node tools/audit.js szkic-16-talizman.html && node tools/mobile.js szkic-16-talizman.html`.
- Nowe kategorie audytu:
  - `SEAM`: każda para sąsiednich sekcji `main > section` ma między sobą szew `.seam`/`.curtain`;
  - `PAINT`: każda sekcja ma co najmniej 1 płytę `.ink` albo pędzel;
  - `WALL`: na telefonie żaden odcinek samego tekstu nie przekracza 1,0 wysokości ekranu, na desktopie 0,9;
  - `PERF`: przy przewijaniu liczba płyt renderowanych na klatkę wynosi ≤ 6 (licznik `__ink.stats`).
- Szkic 15 nie przechodzi nowych kategorii.
- Zrzuty pełnego przewinięcia: telefon 390×844 i desktop 1440×900. Dla szwów i kurtyn sekwencje co 0,4 ekranu. Przeglądam każdą klatkę.
- Warianty:
  - ograniczony ruch (brak kurtyn i sticky, wszystko od razu namalowane);
  - brak WebGL;
  - szerokości 360/430/768;
  - rozmiar pliku ≤ 14 MB.
- Dostarczenie:
  - commit i `git push -u origin claude/compassionate-franklin-ufuj0x`;
  - Artifact z `szkic-16-talizman.html` i link githack;
  - krótkie podsumowanie po polsku: co zrobione, co czeka na odblokowanie Higgsfield, otwarte pytania treściowe.
