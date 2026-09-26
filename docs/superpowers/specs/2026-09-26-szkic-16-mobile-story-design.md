# Szkic 16 „Teatr atramentu”: spec opowieści mobilnej

## Kontekst
- Użytkownik: „jest coraz lepiej, ale pracuj dalej, wymyślaj kreatywne rzeczy, żeby to była opowieść, skup się maksymalnie na mobile, sprawdź w necie patenty mobile, żeby podczas scrollowania robiła potworne wrażenie”.
- **Decyzje:**
  - mechanika: **przypięta scena**, bo scroll zostaje swobodny;
  - patenty i podejście zostawił mnie: **wszystkie cztery patenty spięte w jedną fabułę, wariant „Teatr atramentu”**;
  - Higgsfield: „jak trzeba, korzystaj”.
- **Research (2026):**
  - Scrollowane, liniowe narracje wygrywają (Awwwards: średnio o 1,8 pkt więcej).
  - Gesty typu hold/drag dają zaangażowanie; przykład: Notturno, ilustracja tuszem, przytrzymanie zamiast scrolla.
  - Na telefonie działa przypięta grafika z krokami tekstu (The Pudding).
  - Wsparcie: animacje scrollowe CSS ok. 84%, w tym Safari 18+; View Transitions w Safari 18+.
  - Żyroskop na iOS wymaga stuknięcia z prośbą o zgodę.
  - Wibracje: Android przez `vibrate`, iOS przez obejście z przełącznikiem, które działa do iOS 26.4.
- **Stan obecny na telefonie (zrzuty m15):**
  - Ilustracja pojawia się raz, potem są 3–4 ekrany tekstu.
  - Rozdział I jest talią kart z pustą plamą na starcie.
  - Po akordeonach PDP jest pusta przestrzeń.
- **Higgsfield:** 6 szerokich panoram kamieni jest wygenerowanych, ale ich pobranie blokuje polityka sieci (`d8j0ntlcm91z4.cloudfront.net`). Wersje pionowe 9:16 na telefon wygeneruję i podepnę dopiero po odblokowaniu tego hosta przez użytkownika. Wszystko inne działa bez nich (proceduralny atrament).

---

## Projekt (spec)

### 1. Scena i kroki: przypięta ilustracja na telefonie (≤ 900 px)
Każda sekcja opowieści (prolog, rozdziały I–VI, zamknięcie) na telefonie ma dwie części:
- **scenę** `.stage-m`: `position:sticky; top: var(--hdr-now) + var(--sb)`, wysokość `46svh`, tło w kolorze papieru, pełna szerokość ekranu, ilustracja + atrament od lewej (istniejące okno `.spill`);
- **kroki** `.steps`: tekst rozdziału dzielony na krótkie kroki (`min-height: 58svh`, jeden akapit albo blok na krok), które przewijają się pod sceną.

Scroll maluje scenę: postęp w obrębie sekcji steruje `t` ilustracji (istniejący tryb `scroll`), a kolejne kroki zmieniają stan sceny. Po zakończeniu sekcji scena odpina się i odjeżdża. Na desktopie układ zostaje jak w szkicu 15.

Mapowanie kroków do scen:
- **Prolog:** dłonie z bransoletką; kroki: zdanie „150 000 lat” (słowo po słowie), akapit, spis rozdziałów.
- **Rozdział I:** zamiast talii kart na telefonie działa ten sam mechanizm epok co na desktopie. Każdy krok (beat) podmienia rysunek na scenie: nowy wpływa od lewej, a duża liczba roku maluje się na scenie. Ten sam kod `scrolly` z linią wyboru kroku liczoną od dolnej krawędzi sceny zamiast `vh*0.62`. Kod talii (IIFE „chapter I on phones”) zostaje tylko jako fallback bez sticky.
- **II–IV (kamienie):** kroki: tytuł i cytat → „Pochodzenie” (mocne zdanie + tekst) → fakty → oś „Początek wierzeń” (każdy moment osobnym krokiem) → **gest kamienia** (pkt 4) → „Karta kamienia” i „Na co dzień” (zwijane wiersze, jak teraz) → oferta solo.
- **V (trzy w jednym):** scena z trzema koralikami (`b_obs`, `b_tig`, `b_hem`) w rzędzie. Scroll nawleka je na nić (istniejący `trio` painter, ścieżka liczona dla układu poziomego na scenie).
- **VI (jak nosić):** scena z dłońmi; kroki: dla kogo → **maluj intencję palcem** (pkt 5) → **przytrzymaj: trzy oddechy** (pkt 6) → która ręka → pielęgnacja.
- **Zamknięcie:** sakiewka.

### 2. Kurtyna atramentu między rozdziałami (wow)
Przed rozdziałami II, III, IV i VI jest sekcja `.curtain` o wysokości `130svh`, a w środku `sticky` warstwa `100svh` z płytą `fsSpill`:
- Scroll wlewa granatowy atrament od lewej, aż zaleje cały ekran.
- Na atramencie pojawia się papierowym kolorem cyfra i nazwa rozdziału („II · Obsydian”).
- Dalszy scroll cofa atrament w lewo i odsłania papier rozdziału.

Shader `fsSpill` dostaje `uniform float uFull`: pas zajmuje pełną wysokość i sięga za prawą krawędź (`reach` 1.25). Jest to jeden płaski element z tekstem, bez ramek. Na desktopie działa tak samo, ale ma `110vh`. Przy ograniczonym ruchu kurtyny są wyłączone (`display:none`).

### 3. Nić: kręgosłup opowieści
- **Telefon:** stała nić z atramentu przy lewej krawędzi ekranu (`position:fixed; left:8px`, SVG pionowa lekko falująca linia od paska rozdziału do paska zakupu). Nić maluje się wraz z postępem opowieści (istniejący `threadInk`, w pionie). Lewy margines treści na telefonie rośnie z 16 do 24 px, żeby nić nie wchodziła na tekst.
- Trzy supełki odpowiadają rozdziałom II, III, IV (pozycje liczone jak dziś w `layKnots`, w pionie).
- Po zdobyciu kamienia (pkt 4) koralik leci ze sceny na supełek (istniejący `beadFly`) z „tyknięciem” (pkt 7).
- W pasku zakupu obok nazwy są trzy małe gniazda na koraliki, które się zapełniają; po trzech pojawia się napis „Nawleczone”.
- **Desktop:** zostaje obecna pozioma nić w pasku czytania; te same supełki i koraliki.

### 4. Gest kamienia: trzy znaki zdobywane telefonem
Ukryte przyciski znaków zamieniam na jawne, fizyczne gesty. Stan i nagrody pozostają te same (`signs`, `found()`, finał „Nawleczone”, karta z intencją):
- **Obsydian, lustro:** przechylenie telefonu przesuwa po czarnej tafli błysk lustra (istniejący `.glint`, pozycja z orientacji). Gdy błysk przejdzie przez środek kamienia, znak jest zdobyty.
- **Tygrysie oko, oko:** przechylenie przesuwa jedwabisty pas światła po kamieniu, jak prawdziwy efekt kociego oka (istniejący `.sheen`, dziś sterowany scrollem, teraz żyroskopem). Pełne przejście pasa zdobywa znak. Znak „oko” przenosi się z Egiptu do rozdziału III; oko w Egipcie zostaje ozdobą bez nagrody.
- **Hematyt, pieczęć:** przytrzymanie kciuka na kamieniu przez 1,2 s. Kamień „ciąży” (lekko opada, skala 0,98), potem odbija się pieczęć (istniejący `putSeal`).
- **Moduł `Tilt`:** `DeviceOrientationEvent`. Na iOS małe przyciski „Włącz ruch” na scenie wywołują `requestPermission()` z gestu. Bez zgody albo bez czujnika działa przeciąganie palcem po scenie (poziomo = przechylenie). Na desktopie działa ruch myszy.
- **Dostępność:** każdy gest ma przycisk „Pokaż” (np. „Pokaż błysk lustra”), który odgrywa efekt i przyznaje znak.

### 5. Maluj intencję palcem („Jak nosić”)
- Pasek papieru o wysokości 240 px z podpisem „Przeciągnij palcem, żeby wybrać intencję”. Trzy intencje (obs, tig, hem) leżą ukryte pod papierem.
- Pociągnięcie palcem maluje granatowy atrament (canvas 2D, miękkie krople z rozmyciem, lekkie rozlewanie po puszczeniu).
- Intencja, nad którą powstało najwięcej atramentu, „wywołuje się” z tuszu. Zapis idzie tam, gdzie dziś (`intencja-int`), a finał używa go bez zmian.
- Na canvasie jest `touch-action:none`, ale tylko na 240 px wysokości, więc scroll poza nim działa normalnie. Pigułki intencji zostają jako alternatywa.

### 6. Przytrzymaj: trzy oddechy
- Przycisk koła oddechu działa jako przytrzymanie: wdech 4 s (atrament rośnie w kole), wydech 4 s (cofa się), trzy cykle.
- Puszczenie wstrzymuje ćwiczenie. Przejścia sygnalizuje delikatne tyknięcie.
- Istniejący kod `breath` przerabiam z kliknięcia na przytrzymanie; kliknięcie dalej uruchamia wersję automatyczną.

### 7. Dotyk i tekst
- **`haptic(pattern)`:** zamienia `buzz()`. Na Androidzie `navigator.vibrate`. Na iOS ukryty `<input type="checkbox" switch>` + `label.click()`; działa do iOS 26.4, nowsze iOS nie dają efektu, bez błędów. Używany przy: koralik na nici, znak, kurtyna w pełni, zmiana epoki, kroki epilogu, oddech.
- **Tekst nasiąka atramentem:** kluczowe zdania (pull, cytaty rozdziałów, zdanie prologu) dzielę na słowa. Każde słowo przechodzi z bladego (`opacity .18`) do pełnego koloru w miarę przewijania. Działa przez CSS `animation-timeline: view()` z `@supports`, a bez wsparcia przez istniejący loop `painters`.
- **Epilog:** bez zmian w mechanice, ale z tyknięciem na każdym kroku 75 → 7+5 → 12 → 1+2 → 3.

### 8. Higgsfield (warunkowo)
- **Po odblokowaniu hosta:**
  - wpiąć 3 gotowe panoramy (desktop);
  - wygenerować pionowe 9:16 wersje scen dla telefonu (obsydian, tygrysie oko, hematyt, dłonie, prolog), `gpt_image_2_5`, ok. 0,25 kr./szt. (saldo ok. 7,3 kr.);
  - pionowe wersje podpiąć przez `ART.<k>.illusMobile` (wybór w `R.prepare` przy `mobile()`).
- **Bez odblokowania:** obecne ilustracje z `zoomMobile` dostrojonym do sceny `46svh`.

### Ograniczenia i ryzyka
- **Wydajność:** tylko płyty w pobliżu ekranu są liczone (istniejący `nearIO`). Scena mobilna ma DPR ≤ 1,5, kurtyna ≤ 1.
- **Ograniczony ruch:** brak kurtyn, scena nie jest przypięta (zwykły stos), ilustracje od razu namalowane. Gesty działają przez przyciski.
- **iOS:** `svh` dla stabilnej wysokości, brak `100vh`. Żyroskop tylko po zgodzie, zgoda tylko z gestu.
- **Rozmiar pliku:** bez nowych assetów (o ile nie przyjdą z Higgsfield) plik rośnie tylko o kod.

---

