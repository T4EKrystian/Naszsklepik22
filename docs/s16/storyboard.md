# Szkic 16: storyboard

Wynik workflow `s16-ideas`: 5 generatorów pomysłów, sędzia, krytyk, redaktor. Pełne dane: `docs/s16/ideas-raw.json`, katalog: `docs/s16/pomysly.md`.

## Język wizualny

1. Jeden tusz: granat #1f2d52 prowadzi wszystko; ochra (tygrysie oko), rdza (hematyt) i szałwia (epilog) występują tylko jako pigmenty plam i lawet. Brąz #7f5a36 służy wyłącznie tekstowi, przyciskom i pieczęciom. Ochra nigdy nie jest tekstem ani cyfrą niosącą treść (w razie potrzeby przyciemniona #7a5520).
2. Jeden pędzel: każde pociągnięcie korzysta z presetów B-01 (włos, średni, szeroki). Zaczyna się mokro z lewej i kończy suchym, rozszczepionym ogonem w prawo. Odblaski też maluje się pędzlem (jasny gwasz), nigdy gradientem.
3. Kierunek zawsze od lewej. Ilustracje, rozlania, zakreślenia i fronty wchodzą zza lewej krawędzi. Jedyny wyjątek to kurtyna IV, bo żelazo opada.
4. Jedna kartka i jeden brzeg: ciągła faktura papieru na body, sekcje zmieniają tylko kolor. Każda zmiana papieru i każde zdjęcie mają ten sam podpis tide() z granulacją, więc nie ma twardych progów, pasów e_band, zaokrągleń ani ramek.
5. Na ekranie zawsze jest jedna nić. Gdy sekcja potrzebuje osi (spis, epoki, oś wierzeń II, nawlekanie V), #threadM odgina się od krawędzi i sama staje się tą osią, potem wraca na x=8.
6. Ensō ma tylko dwie role: numer rozdziału oraz klamrę ceny (otwarte w PDP, domknięte wokół 3 w epilogu). Tarcze, rozmiary, oddech i wyróżnienia to łuki, nici, linie przypływu i podkreślenia, nigdy koncentryczne koła.
7. Cyjanotypia tylko w trzech miejscach: pierwsze zdjęcie PDP (raz na sesję), album jako ciemnia i stopka zatrzymana w granacie. Wszystkie inne zdjęcia produktu stoją w wiernym kolorze.
8. Kropla występuje dwa razy, jako klamra: pierwsza pod PDP (A-16), ostatnia w znaku stopki (B-59). Na osiach zamiast kropli są koraliki kamienia.
9. Każda plama ma kotwicę: leży pod cyfrą, koralikiem, ceną albo zdjęciem. Samotne kleksy i końcowe krople jęzorów __spill znikają.
10. Rytm szwów: po L zawsze Q, nigdy ten sam wariant na sąsiednich granicach, w oknie 10 ekranów najwyżej dwa pełnoekranowe tusze. Najwyżej 2 przypięte sceny pod rząd.
11. Na sekcję jeden żywy moment malowania. Reszta znaków pędzla maluje się raz przy wejściu i zostaje jako ostatnia klatka (createImageBitmap, nigdy toDataURL).
12. Na oczach pisze się tylko: tytuł rozdziału (raz), rok epoki, liczby epilogu i znak stopki. Wsiąkanie słowo po słowie tylko w 3 zdaniach-kluczach. Reszta tekstu stoi od razu.
13. Na telefonie żaden ekran bez grafiki; ciąg samego tekstu najwyżej 0,5 ekranu, akapit najwyżej ok. 45 słów, tekst nigdy poniżej 13 px, a kontrast na tuszu co najmniej 4,5:1.
14. Każdy gest (przechył, przytrzymanie, przeciągnięcie, tyknięcie) ma przycisk zastępczy, stan końcowy i widoczny odpowiednik w tuszu, bo iOS nie wibruje.
15. Ograniczony ruch i brak WebGL: ilustracje jako własne tekstury z maską --wet-edge, szwy jako odbitki WebP do 30 KB, kurtyny jako statyczne karty tytułowe w CSS, bez przypinania.

## Sekcje po kolei

### produkt · cicha

- **Rola:** Sklep, który już jest rysunkiem
- **Wejście:** Brak; tytuł i cena widoczne od razu (bez kropli B-11)
- **Moment malowania:** Pierwsze zdjęcie wywołuje się z cyjanotypii raz na sesję (E-03); to jedyny żywy moment PDP
- **Grafiki:** nić z trzema koralikami (początek jednej nici); otwarte ensō ceny, malowane raz; równanie na plamie szałwii, pędzlem tylko 3; znaki zaufania z alfabetu pędzla; 4 akordeony na włosie pędzla: Specyfikacja z linijką, Rozmiar z nicią obwodu, W paczce z marginaliami, FAQ 3 pytania
- **Tekst:** Opis 1 zdanie, kamienie po ok. 8 słów, pielęgnacja i dostawa jako jedna linijka pod znakami zaufania; ciąg tekstu maks. 0,5 ekranu
- **Telefon:** Wybór rozmiaru zamalowuje pigułkę plamą brązu (ensō zostaje otwarte do epilogu); pasek zakupu na papierze
- **Pomysły:** E-03, E-67, D-61, C-01, E-41, D-60

### opowiesc · oddech

- **Rola:** Otwarcie opowieści
- **Wejście:** Linia akordeonu gęstnieje w pociągnięcie, jedna kropla spada marginesem i rozlewa prolog (A-16, M)
- **Moment malowania:** Istniejący spill z dłońmi hero
- **Grafiki:** spis jako odgięta #threadM z supełkami i miniaturami; jedna marginalia przy dłoniach
- **Tekst:** Ok. 90 słów, spis zamiast akapitu; wsiąkanie słowo po słowie w jednym zdaniu-kluczu prologu
- **Telefon:** Nić spisu to ta sama #threadM, po spisie wraca na x=8
- **Pomysły:** A-16, D-10, D-60

### rozdzial-1 · cicha

- **Rola:** Historia talizmanów
- **Wejście:** Ostatni supełek spisu wyciąga się w nić siedmiu epok, bez nowej kropli (C-21, Q)
- **Moment malowania:** Jeden tusz przepływa przez siedem przedmiotów (A-24)
- **Grafiki:** rok zmywany i pisany pędzlem; siedem koralików postępu na nici; czerwona nić w trójkąt kamieni; pass z dwoma echami pokoleń
- **Tekst:** Krok epoki maks. 35 słów; trzy kamienie jako trójkąt plus trzy linijki
- **Telefon:** Scena 46svh (42svh poniżej 700 px), pasek zakupu zwinięty do wstęgi 36 px; trójkąt ok. 200 px jako ostatni stan sceny; koniec rozdziału bez jęzora z kleksem
- **Pomysły:** C-21, A-24, B-22, C-22

### rozdzial-2 · glosna

- **Rola:** Obsydian: tarcza
- **Wejście:** Kurtyna szkła z rezerwą II i sylwetką kamienia, odblask malowany raz i zostaje (A-28, L)
- **Moment malowania:** Pociągnięcie stygnie z lawy w szkło (B-32)
- **Grafiki:** cyfra z kurtyny w ensō; fakty jako gesty; oś wierzeń jako odgięta nić z koralikami obsydianu; odcisk pieczęci i trzy hasła; oferta w kolorze na plamie granatu; gest lustra po faktach
- **Tekst:** Pochodzenie 2 zdania, Karta kamienia ok. 25 słów, pielęgnacja jedna linijka skreśleń
- **Telefon:** Tusz kurtyny cofa się w g_obs; lustro z przechyłu albo przycisk; zgoda iOS jednym stuknięciem
- **Pomysły:** A-28, B-32, B-37, D-30, C-35, C-60

### rozdzial-3 · cicha

- **Rola:** Tygrysie oko: odwaga
- **Wejście:** Złoty papier podnosi się od dołu, cyfra III maluje się w trakcie; w scenie obsydian rozsypuje się w tygrysie oko (A-37, Q)
- **Moment malowania:** Warstwy skały narastają scrollem i niosą daty wierzeń (B-34)
- **Grafiki:** przekadrowany kamień bez trzmiela; fakty gestami; oś wierzeń jako warstwy; odcisk pieczęci; oferta na plamie ochry; jedwabny pas malowany gwaszem
- **Tekst:** Jak II, bez powtórzeń liczb; ochra nigdy jako tekst
- **Telefon:** Bez kurtyny i bez przypięcia szwu; pas z przechyłu albo przycisk
- **Pomysły:** A-37, B-34, B-37, D-30, C-35, C-60

### rozdzial-4 · glosna

- **Rola:** Hematyt: kotwica
- **Wejście:** Tusz opada z góry, brzeg rdzewieje (A-38, L)
- **Moment malowania:** Rdzawa rysa koralikiem, zakończona pieczęcią (B-35)
- **Grafiki:** rysa i pieczęć; fakty gestami; oś wierzeń z miniaturami ochry, pieczęci i bulli z rozdziału I; odcisk pieczęci karty; oferta na plamie rdzy
- **Tekst:** Jak II
- **Telefon:** touch-action:pan-y, start gestu po 12 px w poziomie, rysa sama po 4 s, przycisk „Pokaż ślad”
- **Pomysły:** A-38, B-35, B-37, D-30, C-35, C-60

### rozdzial-5 · cicha

- **Rola:** Trzy w jednym
- **Wejście:** Trzy papiery spływają w jeden, fronty zbiegają się w nić (A-41, Q)
- **Moment malowania:** Nić nawleka koraliki, potem trzy przesunięte łuki tarczy (D-38)
- **Grafiki:** tarcza z trzech otwartych łuków z podpisami; skala trzech temp wychodząca poza ekran; zdanie Ogień, czas i żelazo
- **Tekst:** Opisy trio po 1 zdaniu, tempa bez objaśnień
- **Telefon:** #threadM ukośnie przez scenę; trzecie pociągnięcie płynie nicią w dół
- **Pomysły:** A-41, D-38, D-40

### rozdzial-6 · glosna

- **Rola:** Jak nosić: rytuał
- **Wejście:** Tusz zbiera się w dłoniach i odpływa w dół, zostawiając rysunek (A-46, L)
- **Moment malowania:** Trzy oddechy zostawiają trzy linie przypływu na jednej plamie (B-49)
- **Grafiki:** scena dłoni z tłem intencji; namalowana palcem intencja; nici od sytuacji do kamieni; linia doby z pielęgnacją; dłonie rozchylają się w broken
- **Tekst:** Pierwsze założenie w 3 krokach, maks. 0,5 ekranu tekstu; wsiąkanie tylko w zdaniu intencji i zdaniu o pęknięciu
- **Telefon:** Przytrzymanie kciukiem z przyciskiem „Zakończ”, faza widoczna w tuszu; jedna z dwóch przypiętych scen
- **Pomysły:** A-46, A-49, B-49, D-42

### epilog · cicha

- **Rola:** Cena opowiada
- **Wejście:** Szałwia rozchodzi się kołem z plamy ceny (A-53, Q)
- **Moment malowania:** Liczby myte wodą, klamra ensō z PDP domyka się wokół 3 (B-51)
- **Grafiki:** liczby jednym granatem; cztery zamrożone stany trójkąta
- **Tekst:** Podpisy kroków maks. 12 słów, powody maks. 25 słów
- **Telefon:** Przypięta tylko scena 75 > 3; powody w zwykłym przepływie
- **Pomysły:** A-53, B-51, D-52

### album · glosna

- **Rola:** Nastrój, prawdziwe kamienie
- **Wejście:** Zmierzch: papier pije ciemny brąz szerokim frontem (A-56, L)
- **Moment malowania:** Jedno kremowe pociągnięcie wywołuje nachodzące na siebie zdjęcia (A-58)
- **Grafiki:** cztery zdjęcia z mokrym lewym brzegiem; ochrowa laweta światła; podpisy kamieni na zdjęciu surowców; nić w kremie
- **Tekst:** 15 słów
- **Telefon:** Zwykły pion bez przypinania, najwyżej 2 płyty paint
- **Pomysły:** A-56, A-58, D-60

### real · cicha

- **Rola:** Zaufanie, fakty
- **Wejście:** Trzy jasne suche pociągnięcia w górę otwierają ciemny pokój (A-60, Q)
- **Moment malowania:** Koralik 8 mm i nici rozmiarów malowane raz (D-55)
- **Grafiki:** zdjęcia w pełnym kolorze na nici; koralik 8 mm z klamrą; trzy nici 16, 18, 20 cm
- **Tekst:** Jedno zdanie plus podpisy pod zdjęciami, 14 px
- **Telefon:** Karuzela na nici, podpisy pod zdjęciem
- **Pomysły:** A-60, D-55, E-67

### closing · cicha

- **Rola:** Decyzja
- **Wejście:** Nitka ze specyfikacji schodzi w sznurek sakiewki, bez jęzora i kleksa (Q)
- **Moment malowania:** Pakowanie do sakiewki raz, 1,6 s (E-31)
- **Grafiki:** sakiewka; koraliki; karta; cena
- **Tekst:** Tytuł 3 linie, 1 zdanie
- **Telefon:** Bez przypinania, tyknięcie i zgrubienie tuszu na koralik
- **Pomysły:** E-31

### kolekcja · oddech

- **Rola:** Inne kompozycje
- **Wejście:** Piaskowy papier wsiąka od dołu, plamy pigmentów rozkwitają na linii przypływu (E-34, M)
- **Moment malowania:** Plamy pod kartami na froncie wsiąkania
- **Grafiki:** plamy pigmentów pod kartami; podkreślenie „Oglądasz teraz”
- **Tekst:** Maks. 60 słów, eyebrow 13 px
- **Telefon:** Karuzela, plamy zamrożone
- **Pomysły:** E-34

### footer · oddech

- **Rola:** Podpis
- **Wejście:** Ogon znaku jako horyzont, ciemny papier wchodzi pod pociągnięciem (B-59, M)
- **Moment malowania:** Znak intencja pisany, ostatnia kropla jako kropka znaku
- **Grafiki:** odbitka koralików w cyjanotypii; nić z trzema koralikami i supłem
- **Tekst:** Linki i stopka prawna, min. 13 px
- **Telefon:** Linki na spokojnym tle, kontrast min. 4,5:1
- **Pomysły:** B-59

## Wybrane pomysły i wdrożenie

| id | pomysł | sekcja | priorytet | wdrożenie |
|---|---|---|---|---|
| A-01 | Partytura szwów i nawigacja przez szwy | global | 1 | .seam data-seam i data-vol L/M/Q według storyboardu. audit.js: bez dwóch L obok siebie, bez tego samego wariantu na sąsiednich granicach, najwyżej 2 pełnoekranowe tusze w oknie 10 ekranów, najwyżej 2 przypięte sceny pod rząd, 1 widoczna .thread, font-size >= 13, liczba aktywnych płyt mierzona w każdej klatce przewijania. Kotwice rozdziałów celują tuż za szew; przy skoku programowym szwy i sceny po drodze dostają t=1; „Dalej” odgrywa szew w 0,8 s. Usunąć plamy deco bez kotwicy oraz __spill z końca I, z VI przed „Gdy bransoletka się zerwie” i z closing. |
| A-02 | Jedna kartka, jedna linia przypływu | global | 1 | tide() w fsSpill, fsWash i pędzlu, uDry po t=1. Ten sam brzeg jako maska --wet-edge dla zdjęć, dołu przypiętej sceny i szuflady. Faktura --paper-tex na body (multiply), sekcje tylko kolor; usunąć border-top .prolog. |
| A-04 | Stan bez ruchu, bez WebGL i na słabym telefonie | global | 1 | Ilustracje jako własne tekstury z maską --wet-edge (bez nowych plików); odbitki tylko dla szwów, WebP alfa do 30 KB każda; kurtyny jako karty tytułowe CSS 40svh. Kurtyny i fsWash przy DPR <= 1,25; przy pełnym zalaniu płyty pod spodem pauzują i liczą się jako 0. #threadM jako SVG poza budżetem WebGL. Budżet pliku 14 MB sprawdzany w audit.js. |
| A-16 | Pierwsza kropla | produkt>opowiesc | 1 | Ostatnia linia akordeonów gęstnieje w pociągnięcie; jedna kropla spada lewym marginesem (scrub) i uruchamia spill prologu. Przy ograniczonym ruchu kropla leży jako mała plama przy strzałce. |
| A-24 | Jeden tusz, siedem kształtów | rozdzial-1 | 1 | Tryb story: slot a rozsypuje się (uT 1 do 0, dryf), slot b skupia się ze źródła dryfu; grounds mokro w mokre ze wspólnym tide(). Przy szybkim przewijaniu 400 ms. |
| A-28 | Kurtyna II: szkło z lawy | rozdzial-1>rozdzial-2 | 1 | fsSpill uFull i uMask (rezerwa cyfry II i sylwetki kamienia). W chwili pełni jedno suche jasne pociągnięcie maluje się raz po tafli i zostaje jako ślad (bez gradientu). Cofanie w g_obs; desktop asymetrycznie uReach .62. Haptyka 2 impulsy plus zgrubienie tuszu. Ten sam szkielet dla IV i VI; III nie ma kurtyny. |
| A-37 | Złoty przypływ zamiast kurtyny III | rozdzial-2>rozdzial-3 | 1 | fsWash od dołu z tintą #f5e6cf i brzegiem tide() z zaciekami ochry, cyfra III maluje się w trakcie, bez przypinania (telefon 35svh, desktop 50vh). Wewnątrz przypiętej sceny obsydian rozsypuje się i skleja w tygrysie oko; na desktopie to samo w sticky kolumnie, ilustracja II blednie przed końcem rozdziału. |
| A-38 | Kurtyna IV: opadające żelazo | rozdzial-3>rozdzial-4 | 1 | fsSpill vUv.yx z ciężkim easingiem, brzeg rdzy; wcześniej tig traci ciepło filtrem. Tytuł jako rezerwa w tuszu. Zapas przy słabym telefonie: rdzawa kreska A-39. |
| A-46 | Kurtyna VI: tusz w dłonie | rozdzial-5>rozdzial-6 | 1 | Maska frontu z rozmytej alfy hands; tytuł jako rezerwa; odpływ w dół zostawia rysunek dłoni w przypiętej scenie; koraliki zjeżdżają po nici do dłoni. |
| A-56 | Zmierzch | epilog>album | 1 | fsWash tinta #2f231c szerokim frontem zamiast e_band; ciemny papier z granulacją zostaje jako ostatnia klatka. Jedyny duży fsWash w końcówce strony. |
| B-01 | Jeden pędzel domu | global | 1 | kind brush z BRUSH_PRESETS (włos, średni, szeroki), stemple proceduralne, tokeny --pig-obs/tig/hem/tri. Po t=1 ostatnia klatka zostaje na canvasie 2D (createImageBitmap + drawImage), płyta wychodzi z pętli. Audyt: każde wywołanie pędzla z presetem. |
| B-32 | Obsydian: stygnięcie w pociągnięciu | rozdzial-2 | 1 | Pędzel z gradientem pigmentu ochra do granatu wzdłuż długości, ostry szklisty koniec; w przypiętej scenie w kroku Pochodzenie, sterowany scrollem. |
| B-34 | Tygrysie oko: warstwy skały niosą daty | rozdzial-3 | 1 | 5 ścieżek szerokiego suchego pędzla scroll; daty osi wierzeń leżą na warstwach. Ziemia g_tig prowadzona ochrą, granat tylko jako linia przypływu. Przekadrowanie ART.tig, by koralik nie tworzył trzmiela. Po warstwach gest jedwabnego pasa (C-60). |
| B-35 | Hematyt: próba rysy kończy się pieczęcią | rozdzial-4 | 1 | Pasek 120 px z touch-action:pan-y, gest startuje po ruchu poziomym powyżej 12 px. Po 4 s w kadrze bez interakcji rysa rysuje się sama, cienko; „Pokaż ślad” to też przycisk klawiaturowy. Rysa kończy się odciskiem pieczęci hematytu (bez osobnego przytrzymania). Ziemia g_hem prowadzona rdzą. Ograniczony ruch: rysa i pieczęć statyczne. |
| B-51 | Liczby myte wodą, klamra ceny się domyka | epilog | 1 | Stara liczba rozmywa się w dół, nową pisze D-61 jednym granatem. Ensō, które w PDP od początku stoi otwarte przy cenie, domyka się cicho wokół 3. Podpisy do 12 słów z dystansem („W numerologii dodaje się cyfry.”). Jedna z dwóch przypiętych scen w tej części strony. |
| C-22 | Czerwona nić do trójkąta kamieni i echo pokoleń | rozdzial-1 | 1 | Jedna ścieżka brush scroll od wstążki do trójkąta, rdza przygaszona. Desktop: trójkąt 520 px, słowa na bokach. Telefon: trójkąt ok. 200 px jako ostatni stan przypiętej sceny, na bokach tylko „ochrona, jasne widzenie, siła” 15 px kursywą; trzy linijki opisów przewijają się pod sceną, każda z koralikiem na plamie. Koniec rozdziału zamiast jęzora z kleksem: pass z dwoma zamrożonymi echami (alfa .3 i .14). |
| C-60 | Gesty kamieni z miejscem, zgodą i stanem końcowym | global | 1 | Miejsca: II po faktach (lustro), III po warstwach (jedwabny pas), IV razem z rysą (pieczęć). Zgoda iOS na DeviceOrientation prośbą jednym stuknięciem przy pierwszym geście; po odmowie przycisk z tym samym wynikiem. Odblaski jako jedno suche pociągnięcie jasnym gwaszem przesuwane maską, bez gradientu. Każde tyknięcie ma mikro-zgrubienie tuszu w miejscu akcji. Arkusze znaków i finał „Nawleczone” malowane tym samym pędzlem: finał to nić zawiązana w pętlę bransoletki z supłem, nie ensō. |
| D-10 | Spis rozdziałów na nici | opowiesc | 1 | #threadM odgina się i staje osią spisu z siedmioma supełkami i zamrożonymi miniaturami; przeczytane supełki zalane tuszem. Klik: cyfra leci FLIP i ląduje nad tytułem dopiero po zakończonym szwie. |
| D-30 | Karta kamienia jako odcisk pieczęci i trzy hasła | rozdzial-2 | 1 | Symbol jako brązowy odcisk pieczęci cylindrycznej (kształt z babilońskiej seal, faktura niedobicia) z dwoma słowami, sama typografia. Pod nim trzy zakreślone hasła, ok. 25 słów. Pełne akapity pod „Przeczytaj całą kartę” na obu szerokościach; lista Dla kogo usunięta (przeniesiona do VI). Wzór w II, III, IV. |
| D-38 | Nawlekanie i tarcza z trzech łuków | rozdzial-5 | 1 | Telefon: #threadM przechodzi ukośnie przez scenę, koraliki nawlekają się scrollem, ciemny pierścień przy otworach. Potem trzy otwarte łuki różnej grubości, przesunięte względem siebie, z przerwami po jednej stronie (nie współśrodkowe), z podpisami odbija, czuwa, stabilizuje. |
| D-40 | Trzy tempa w jednej skali | rozdzial-5 | 1 | Kropka, kreska i pociągnięcie wychodzące poza ekran (telefon: płynie w dół nicią do „Ogień, czas i żelazo”); jedno zdanie o 150 m, bez objaśnień. |
| D-61 | Alfabet cyfr pędzla | global | 1 | Słownik ścieżek 0-9, +, =, I, V, X z aria-label. Używany w cyfrach rozdziałów, roku epoki, tempie V i epilogu. W PDP równanie zwykłym krojem na plamie szałwii, pędzlem tylko końcowe 3. |
| E-03 | Galeria: jedno wywołanie, potem wierny kolor | produkt | 1 | Pierwsze zdjęcie wywołuje się z cyjanotypii raz na sesję. Kolejne slajdy są w kolorze, przy przesunięciu przechodzi przez nie tylko mokry front tide() przez 300 ms. Kropki galerii jako koraliki na nici pod zdjęciem, na papierze. H1 renderowany od razu, bez maski pisania. |
| E-31 | Pakowanie do sakiewki | closing | 1 | Nitka ze specyfikacji schodzi w sznurek. Scena pouch w trybie once (1,6 s po wejściu, bez przypinania): wpadają koraliki, karta, sznurek zaciąga się. Potem cena i przycisk; bez powtarzania rachunku. |
| E-41 | Warstwa handlowa na papierze | global | 1 | backdrop-filter usunięty z .top, .sbar, .thumbs, .mact, .gdots, .bar; papier sekcji nieprzezroczysty, na kurtynie odwrócony. .sbar scalony z nagłówkiem w jedną linię chowaną przy przewijaniu w dół. W przypiętych scenach pasek zwija się do wstęgi 36 px (gniazda koralików i cena), rozwija przy przewijaniu w górę i na końcu rozdziału. Szuflada i arkusze z mokrym brzegiem zamiast promienia 18 px i cienia, pusty stan z rysunkiem pouch, przyciemnienie jako granatowa laweta od dołu, komunikaty jako paski papieru nad paskiem (desktop w lewym dolnym rogu). Wszystkie promienie 4 px albo pigułka; stan dodania pieczęcią. |
| E-67 | Jedna nić od produktu do stopki | global | 1 | Jedna ścieżka w DOM: w PDP nić z trzema koralikami (tekst ok. 25 słów, FAQ 3 pytania), w opowieści #threadM przy x=8 z animowanym punktem odgięcia, który zamienia ją w oś spisu, epok, wierzeń II i nawlekania V; w albumie kremowa, w real trzyma odbitki, w closing przechodzi w sznurek, w stopce supeł. Audyt: jedna widoczna nić. |
| A-41 | Trzy papiery w jeden | rozdzial-4>rozdzial-5 | 2 | fsWash z trzema tintami i trzema frontami tide() zbiegającymi się w punkt, w którym #threadM odgina się w nić V; supełki zsuwają się w węzeł. Zapas: mokro w mokre A-43. |
| A-49 | Scena dłoni prowadzi cały rozdział | rozdzial-6 | 2 | g_st_s z tintą intencji, lustro przy wyborze ręki, namalowana palcem intencja zostaje jako tło. Przed „Gdy bransoletka się zerwie” dłonie rozchylają się (story), koraliki spadają, a ta sama płyta przechodzi w broken; bez drugiego jęzora. |
| A-53 | Szałwia z plamy ceny | rozdzial-6>epilog | 2 | pw1 manual plus fsWash z maską radialną; jedyny szew w kształcie koła. Zapas: wsiąkanie od dołu. |
| A-58 | Album jako ciemnia w zwykłym pionie | album | 2 | Zdjęcia bez rynien i zaokrągleń, nachodzą na siebie z mokrym lewym brzegiem, pierwsze wychodzi zza lewej krawędzi. Jedno kremowe pociągnięcie-wywoływacz przechodzi przez nie ciągłym frontem (data-ink kremowy). Pod dużym zdjęciem ochrowa laweta światła w trybie screen. Bez przypinania. |
| A-60 | To samo pociągnięcie, w górę | album>real | 2 | Trzy jasne suche pociągnięcia kremu od dołu w górę, lustro wejścia; zamiast fsWash. Na froncie nic się nie wywołuje: zdjęcia real stoją w kolorze. |
| B-22 | Rok zmywany i pisany | rozdzial-1 | 2 | #stYear jako canvas: stary rok rozmywa się w dół, nowy pisze alfabet D-61 w dolnym pasie sceny, zawsze poza sylwetką. 164 000 w rdzy #8a4a2e (ok. 6:1). Scena 42svh na ekranach poniżej 700 px wysokości. |
| B-37 | Fakty gestami, oś wierzeń w trzech kształtach | rozdzial-2 | 2 | Jeden canvas na .chapter__facts (gesty flash, hair, strata, rub, sag), bez ensō i bez powtórzeń liczb. Oś wierzeń zmienia kształt: II pionowa (to #threadM z koralikami obsydianu), III poziome warstwy w B-34, IV nić z miniaturami ochry, pieczęci i bulli z rozdziału I. |
| B-49 | Trzy oddechy, trzy linie przypływu | rozdzial-6 | 2 | Pierwsze założenie w 3 krokach z cyframi pędzla. Oddech na jednej plamie: każdy wydech zostawia na niej linię przypływu (nie koło). Przycisk „Zakończ”, po przerwaniu zostają narysowane dotąd linie. Na iOS faza oddechu widoczna jako zgrubienie brzegu. |
| B-59 | Podpis: znak pisany, ogon jako horyzont | kolekcja>footer | 2 | Bez washu: szeroki suchy ogon znaku jest jedynym horyzontem, a ciemny papier stopki wchodzi twardo pod pociągnięciem. Na ogonie trzy koraliki i supeł nici; ostatnia kropla ląduje jako kropka znaku. foot__bg zatrzymany w cyjanotypii. Zamiast „Szkic 15 do akceptacji” stopka prawna © 2026 intencja z danymi firmy. |
| C-01 | Alfabet znaków i linii pędzla | global | 2 | Sprite ok. 18 znaków (paczka, zwrot, woreczek, plus, dłoń, ściereczka, supeł) jako mask-image; linie 1 px zastąpione włosem pędzla na jednym canvasie 2D na grupę (spec, toc, faq, akordeony); linki podkreślane pędzlem; wybrany rozmiar i pigułki zamalowane plamą brązu. Wszystko malowane raz przy pierwszym renderze. |
| C-21 | Z supełka spisu w nić epok | opowiesc>rozdzial-1 | 2 | Cichy szew bez nowej kropli: ostatni supełek spisu wyciąga się w nić z siedmioma koralikami zamiast storyprog i pigułek; bieżący nasiąka tuszem, przyszłe są konturem. |
| C-35 | Oferta solo i Na co dzień bez pudełek | rozdzial-2 | 2 | Zdjęcie w pełnym kolorze z mokrym lewym brzegiem na plamie pigmentu, bez box-shadow i bez ensō przy cenie. „Jak dbać” jako jedna linijka skreśleń pędzlem plus link do rytmu dnia w VI. Wzór w II, III, IV. |
| D-42 | Dla kogo i rytm dnia: dwa obrazy zamiast list | rozdzial-6 | 2 | Wersja statyczna: sytuacje w pierwszej osobie połączone nićmi z koralikiem kamienia (zastępuje listy Dla kogo z trzech kart i .who). Pielęgnacja raz: linia doby z czterema supełkami, „woda” i „chlor” przekreślone pędzlem; szablon także w akordeonie PDP. |
| D-52 | Cztery powody w czterech stanach trójkąta | epilog | 2 | Telefon bez przypięcia: cztery małe zamrożone stany trójkąta w zwykłym przepływie, każdy przy podpisie do 25 słów, bez kart. Desktop: 4 kolumny ze statycznymi stanami, bez ramek. Eyebrow 13 px. |
| D-55 | 8 mm i trzy nici rozmiarów | real | 2 | Koralik 8 mm z klamrą pędzla, rozmiary jako trzy poziome nici 16, 18 i 20 cm w jednej skali (ta sama nić pod rozmiarami w PDP), sznurek falisty. dl dla czytników. Zdjęcia real zawsze w pełnym kolorze, na nici z odbitkami. |
| D-60 | Marginalia | global | 2 | Komponent .note: kursywa 15 px (telefon 14 px) i włos pędzla do jednego punktu ilustracji, start przy t>0,9, jedna notatka na obraz, zawsze poza sylwetką. Zastępuje figcaption 12 px. |
| E-34 | Kolekcja wsiąka na plamach pigmentów | closing>kolekcja | 2 | Piaskowy papier wsiąka od dołu z tide(), na linii przypływu rozkwitają plamy pigmentów pod kartami; zdjęcia kart w pełnym kolorze. „Oglądasz teraz” jako krótkie podkreślenie pędzlem. |

## Higgsfield (seria)

- **brush_stamps** (1:1, 2048): Stemple włosia dla silnika pędzla. Użycie: B-01 stemple presetów, odblaski C-60. Zapas: Stemple proceduralne: elipsa z szumem i progiem włosia.
  - prompt: sheet of 12 isolated sumi-e brush stroke tips and dry-brush strokes, black ink on white, wet start to dry split bristles, nothing else, no text
- **spill_maps** (2:1 x3): Trzy rozlania tuszu do kurtyn II, IV, VI. Użycie: A-28, A-38, A-46 mapa uMap. Zapas: Szum simplex z osobnym uSeed na kurtynę.
  - prompt: indigo-navy ink poured on warm washi paper, top view, irregular bays and granulation, flat light, no text + styl C-62
- **tig_slab** (16:9 i 9:16): Nowe tygrysie oko. Użycie: B-34, rozdział III. Zapas: Przekadrowanie ART.tig (focus, zoomMobile).
  - prompt: a flat polished slab of tiger's eye stone with one wide silky band of light, no round bead, enters from left edge + styl C-62, a touch of ochre
- **strata** (16:9 i 9:16): Przekrój skały wstęgowej. Użycie: B-34 tło warstw z datami. Zapas: Pięć ścieżek szerokiego suchego pędzla.
  - prompt: cross-section of ancient banded rock, wavy layers of navy and golden ochre, fibrous gold bands, broken right edge + styl C-62
- **hands_chain** (16:9 i 9:16): Łańcuch rąk pokoleń. Użycie: C-22 koniec rozdziału I. Zapas: Dwa zamrożone echa ART.pass.
  - prompt: line of hands receding to the left edge, each passing the same small bead bracelet, farthest dissolving into paper + styl C-62, ref: pass
- **flatlay_pouch** (4:5 i 1:1): Woreczek, bransoletka i karta. Użycie: E-31 zamknięcie, pusty stan szuflady E-41. Zapas: ART.pouch i karta rysowana pędzlem 2D.
  - prompt: flat lay from above: linen drawstring pouch, bead bracelet half spilling out, folded paper card, loose twine, diagonal from left edge + styl C-62, touch of ochre

## Krytyka i co zmieniono

Ocena krytyka: Język wizualny jest dobry i spójny (jeden tusz, jeden pędzel, tide(), jedna kartka), ale storyboard przesadza z tymi samymi znakami. Ensō występuje w ok. 8 rolach, cyjanotypia w ok. 20 wywołaniach, nić bywa widoczna 2 do 3 razy naraz, kropla pojawia się 3 razy na pierwszych 5 ekranach, a przypiętych scen jest 5 pod rząd. Reguła rytmu jest spełniona tylko formalnie. Na telefonie II, III i IV to w praktyce trzy kurtyny w ok. 9 ekranach. W końcówce trzy fsWash w ok. 6 ekranach, a A-56 i A-65 to ten sam gest ciemności od dołu. Największe ryzyka na telefonie: szczelina ok. 150 do 190 px na tekst pod sceną 46svh, 7 płyt w chwili kurtyny II, toDataURL przy zamrażaniu i brak zachowania szwów przy skokach z nawigacji. Warstwa handlowa (szuflada, arkusze, 6 miejsc ze szkłem, promienie 10 do 18 px, 14 fontów poniżej 13 px, „Szkic 15” w stopce) nadal jest innym sklepem. Zatwierdzone gesty kamieni, oddech i gra ze znakami nie mają w storyboardzie miejsca ani stanu końcowego. Na iOS haptyka nie działa i potrzebuje wizualnego odpowiednika. Kierunek jest do przyjęcia pod warunkiem wycięcia powtórzeń: ensō w 2 rolach, cyjanotypia w 3 miejscach, jedna nić na ekranie, maks. 2 przypięte sceny pod rząd, cichy wariant wejścia III na telefonie i nowa stopka bez washu. Trzeba też przywrócić E-43, D-30, B-39 oraz komplet E-51, C-61, E-52 dla sakiewki. Pliki: /home/user/Naszsklepik22/src/szkic-16.src.html (linie 101, 105, 188, 198, 529, 572, 784, 919 i 543 do 555: szkło i promienie; stopka: „Szkic 15 do akceptacji”), /home/user/Naszsklepik22/docs/s16/inventory.json.

- [wysoka] rozdzial-2 > rozdzial-3 > rozdzial-4 (telefon): Formalnie nie ma dwóch L obok siebie, ale A-35 (smuga, M) to ten sam szkielet fsSpill co A-28 i A-38: pełna szerokość, tytuł wpisany w tusz, przypięcie 110svh. Na telefonie rozdziały mają po ok. 3 ekrany, więc czytelnik dostaje trzy kurtyny w ok. 9 ekranach (L, pseudo-L, L). To łamie regułę sędziego „po głośnym zawsze cichy”. Do tego storyboard sam oznacza opowiesc i rozdzial-1 jako „głośna” jedna po drugiej. → Telefon: wejście III jako cichy przypływ A-37 (złoty papier podnosi się od dołu, cyfra III maluje się w trakcie, bez przypinania), a A-36 (obsydian rozsypuje się w tygrysie oko) robi się wewnątrz przypiętej sceny 46svh. Smugę A-35 zostawić tylko na desktopie, na 60% wysokości i bez przypinania. rozdzial-1 przemianować na „oddech”: jego wejście C-21 jest ciche, a mocny jest tylko środek. W audit.js sprawdzać też sekwencję L, M(fsSpill), L w oknie 10 ekranów, nie tylko sąsiadów.
- [wysoka] epilog > album oraz kolekcja > footer: A-56 (zmierzch: papier ciemnieje od dołu, fsWash) i A-65 (tuszowy horyzont: ciemność podnosi się od dołu, fsWash) to ten sam gest dwa razy w ostatnich 7 ekranach. Na dodatek A-59 (krem zmywa brąz, fsWash z malejącym t) sprawia, że w końcówce są trzy pełnoekranowe washe w ok. 6 ekranach, przedzielone tylko E-34. Koniec strony zamienia się w pętlę „ściemnij, rozjaśnij, ściemnij”. → Stopka bez washu: ogon B-59 jest jedynym horyzontem, a ciemny papier stopki wchodzi twardo pod pociągnięciem, jak podkład pod podpisem (albo E-37, strużki spływające w dół, jedyny szew grawitacyjny). A-59 zamienić na A-60 (trzy jasne suche pociągnięcia w górę, lustro wejścia) albo na zwykły bleed CSS z maską tide(). Jedyny duży fsWash w końcówce to wtedy A-56.
- [wysoka] rozdzial-6 > epilog > album > closing (telefon): Pięć przypiętych scen jedna po drugiej: dłonie w VI (sticky 46svh plus oddech), epilog 75 > 3 (przypięty), epilog D-52 (przypięte 50svh), album E-24 (sticky 70svh), closing E-31 (scena 46svh). W połowie strony czytelnik traci poczucie, że sam przewija. Te sceny zjadają też budżet płyt i wydłużają stronę o ok. 3 ekrany samego scrubowania. → Przypięte zostają tylko VI (dłonie) i epilog 75 > 3. D-52 na telefonie: cztery małe, zamrożone stany trójkąta w zwykłym przepływie, każdy przy swoim podpisie do 25 słów, bez przypinania. Album: zwykły pion, jedno pociągnięcie wywołujące przechodzi przez zdjęcia (A-58). Closing: E-31 w trybie once (pakowanie 1,6 s po wejściu), bez przypinania. W audycie: maks. 2 przypięte sceny pod rząd.
- [wysoka] przypięta scena 46svh (telefon, rozdziały I do VI): Na 390x844, przy pasku Safari (ok. 110 px), nagłówku 44 px, pasku czytania .sbar 46 px, scenie 46svh (ok. 390 px) i pasku zakupu ok. 64 px, na przewijany tekst zostaje ok. 150 do 190 px. To 5 do 6 linii. Kroki epok (35 słów) i Pochodzenie (2 zdania) nie mieszczą się naraz, więc czytanie odbywa się przez szczelinę. → Przywrócić E-43: w przypiętych scenach pasek zakupu zwija się do wstęgi 36 px (trzy gniazda koralików i cena), a rozwija przy przewijaniu w górę albo na końcu rozdziału. Połączyć .sbar z nagłówkiem w jedną linię, która chowa się przy przewijaniu w dół. Scena 42svh na ekranach poniżej 700 px wysokości.
- [wysoka] global, efekt paint (cyjanotypia > kolor): Wywołanie z cyjanotypii jest zaplanowane przy każdym przesunięciu galerii PDP (E-03), przy 3 ofertach solo (C-35), w albumie (E-24), przy pierwszym zdjęciu real (A-59), w zdjęciach real (D-55, once 900 ms), w 4 kartach kolekcji (E-34) i w tle stopki. To ok. 20 wywołań tym samym gestem. Tuż przed kliknięciem w „Dodaj” produkt jest też na chwilę niebieski, a kupujący potrzebuje wiernego koloru. → Cyjanotypia tylko w trzech miejscach, które mają sens: pierwsze zdjęcie PDP (raz na sesję), album jako ciemnia i stopka zatrzymana w granacie. Zdjęcia w galerii PDP po pierwszym są od razu w kolorze, a przy przesunięciu przez 300 ms przechodzi przez nie tylko mokry front tide() (E-03 skrócone). Oferty solo, zdjęcia real i kolekcja zawsze w pełnym kolorze; ruch dają im tylko plama pigmentu pod zdjęciem i mokry lewy brzeg.
- [wysoka] global: ensō i koncentryczne okręgi: Ensō zjada się jako znak. Pojawia się przy cenie PDP (E-08), wokół cyfry rozdziału (A-28, A-11), jako tarcza z trzech ensō (D-38), wokół 3 w epilogu (B-51), wokół „Oglądasz teraz” (E-34), jako kręgi S M L (D-55), w pierścieniach oddechu (B-49) i w finale „Nawleczone”. Do tego trzy razy koncentryczne pierścienie (D-38, D-55, B-49), które przy nieregularnym pędzlu czytają się jak tarcza strzelnicza, czakry albo logo sklepu ezoterycznego. → Ensō tylko w dwóch rolach: numer rozdziału i klamra ceny (otwarte w PDP, domknięte wokół 3). D-38: trzy otwarte, przesunięte względem siebie łuki różnej grubości, nie współśrodkowe, z przerwami po jednej stronie, jak odbicia jednego gestu. D-55: rozmiary jako trzy poziome nici o długościach 16, 18 i 20 cm w jednej skali (bez kręgów). B-49: ślady oddechu jako trzy linie przypływu na jednej plamie, nie trzy koła. E-34: „Oglądasz teraz” jako krótkie podkreślenie pędzlem (B-58).
- [wysoka] global: nić (E-67, #threadM, D-10, C-21, B-37/C-32, D-38, A-46): Na telefonie w kilku miejscach stoją naraz dwie albo trzy pionowe nici: #threadM przy x=8, nić spisu D-10, nić epok C-21, oś wierzeń w II do IV, nić ukośna w V i nić schodząca do dłoni w VI. Równoległe pionowe linie przy lewej krawędzi dają efekt szyn i szablonu osi czasu, a motyw przestaje znaczyć „jedna nić”. → Zasada: na ekranie jest zawsze jedna nić. Gdy sekcja ma własną oś (spis, epoki, oś wierzeń, V), #threadM wygina się z krawędzi i to ona staje się tą osią (ta sama ścieżka, animowany punkt odgięcia), a po osi wraca do x=8. Nić w PDP, w albumie i w real to jedna i ta sama ścieżka w DOM, bez osobnych dekoracji. audit.js: liczba widocznych elementów .thread w viewporcie ≤ 1.
- [srednia] produkt > opowiesc > rozdzial-1 (kropla): Kropla jest nadużyta na starcie. B-11 (kropla przed tytułem), potem A-16 (kropla spada marginesem i rozlewa prolog), a po ok. 2 ekranach C-21 (kropla wyciąga się w oś epok). Trzy krople na pierwszych 5 ekranach, dwie niemal pod rząd. Dochodzą krople na osi wierzeń ×3 rozdziały i kropla w stopce. B-11 w dodatku opóźnia pojawienie się H1 produktu, co psuje LCP i SEO. → B-11 usunąć albo sprowadzić do plamki pod już widocznym tytułem (tytuł renderowany od razu, bez maski pisania). C-21 zaczyna się od ostatniego supełka nici spisu D-10, bez nowej kropli. Kropla zostaje tylko dwa razy jako klamra: A-16 (pierwsza) i B-59/A-67 (ostatnia). Na osi wierzeń zamiast kropli koraliki kamienia (C-32).
- [srednia] rozdzial-2, rozdzial-3, rozdzial-4 (szablon rozdziału kamienia): Trzy rozdziały mają identyczną sekwencję: tytuł z cytatem, Pochodzenie, 3 fakty-gesty, oś wierzeń pędzlem z kroplami, Karta kamienia, Na co dzień, oferta na plamie, Dalej. B-37 i C-35 wprost mówią „wzór w II, III, IV”. Przy trzecim rozdziale czytelnik przewiduje każdy ruch. Na zrzutach ziemie g_tig i g_hem to także ten sam granatowy jęzor z lewej (s19, s22), więc rozdziały różnią się tylko kamieniem na środku. → Wspólny szkielet, ale jedno pole zmienia kształt w każdym rozdziale. II: oś wierzeń pionowa (nić). III: oś jako poziome warstwy (połączyć z B-34, daty leżą na warstwach). IV: oś z miniaturami z rozdziału I (D-28: ochra, pieczęć, bulla). Ziemie: g_tig prowadzi ochra, a granat zostaje tylko jako linia przypływu; g_hem prowadzi rdza. „Jak dbać” w II do IV skrócić do jednej linijki skreśleń (D-31), pełna pielęgnacja raz, w VI (D-08).
- [srednia] rozdzial-2 do rozdzial-4, Karta kamienia (desktop): Na desktopie Karta kamienia jest rozwinięta (zrzuty d/s21, s22): symbol, dwa akapity Właściwości, listy Dla kogo z punktorami, Jak pracować i Jak dbać. To ok. 1,5 ekranu gęstego tekstu w prawej kolumnie obok statycznej ilustracji, czyli dokładnie ta ściana tekstu, której użytkownik nie chce. Storyboard pisze „zwinięta”, ale to dotyczy telefonu, a po rozwinięciu i tak zostaje ściana. → Przywrócić D-30: symbol jako odcisk pieczęci (brązowe ensō i dwa słowa, sama typografia), pod nim trzy zakreślone hasła (ok. 25 słów). Pełne akapity pod „Przeczytaj całą kartę” na obu szerokościach. Listę Dla kogo z trzech kart przenieść do jednego obrazu w VI (D-42, wersja statyczna: nici od sytuacji do koralika, bez stukania).
- [srednia] rozdzial-2 kurtyna A-28, gesty kamieni (przechył): „Po tafli raz przesuwa się szeroki, matowy odblask” oraz planowany połysk lustra obsydianu i jedwabny pas tygrysiego oka przy przechyle to dziś gładkie gradienty CSS. To typowy efekt „shine sweep” z szablonów, czyli zakazany stockowy błysk, i gryzie się z jednym pędzlem. → Przywrócić B-39 (razem z C-37): każdy odblask to jedno suche pociągnięcie jasnym gwaszem z presetu B-01 (szeroki, z przerwami włosia), przesuwane maską, bez gradientu i bez rozmycia. W kurtynie odblask rysuje się raz i zostaje jako ślad na tafli, zamiast przejeżdżać.
- [srednia] rozdzial-4 (B-35 próba rysy i pieczęć hematytu): W jednym rozdziale są dwie interakcje: przeciąganie koralika po pasku (B-35) i planowane przytrzymanie z pieczęcią. Pasek 120 px z touch-action:none na telefonie łapie przewijanie: kciuk, który trafi w pasek w drodze w dół, zatrzymuje stronę. Nie ma stanu końcowego dla kogoś, kto nic nie przeciągnie, ani wersji z klawiatury. → touch-action:pan-y; gest startuje dopiero po ruchu poziomym powyżej 12 px. Po 4 s w kadrze bez interakcji rysa rysuje się sama, cienko, a przycisk „Pokaż ślad” jest też przyciskiem klawiaturowym. Pieczęć hematytu wynika z rysy (rysa kończy się odciskiem pieczęci), bez osobnego przytrzymania w tym rozdziale; przytrzymanie zostaje jako alternatywa dostępna z przycisku. Przy ograniczonym ruchu: rysa i pieczęć namalowane statycznie.
- [srednia] gesty kamieni, oddech, haptyka (global): Storyboard nie umieszcza zatwierdzonych gestów kamieni ani arkuszy znaków (Oko, Lustro, Pieczęć) i finału „Nawleczone” w żadnej sekcji. Nie wiadomo, kiedy iOS pyta o zgodę na DeviceOrientation, co się dzieje przy odmowie i jak wygląda stan końcowy gry. navigator.vibrate nie działa w iOS Safari, więc „tyknięcia” (A-09, E-08, E-31) na iPhonie znikają bez śladu. Oddech „Spróbuj teraz: 24 sekundy” nie ma przycisku przerwania. → Dopisać do storyboardu: II moment gestu po faktach (lustro), III po warstwach (smuga), IV razem z rysą (pieczęć). Zgoda iOS proszona jednym stuknięciem przy pierwszym geście, a po odmowie zostaje przycisk z tym samym wynikiem. Każde tyknięcie ma wizualny odpowiednik (mikro-zgrubienie tuszu w miejscu akcji). Oddech: przycisk „Zakończ”, a po przerwaniu zostają narysowane dotąd linie. Arkusze znaków i finał malowane tym samym pędzlem (C-60).
- [srednia] wydajność telefonu: kurtyny i budżet płyt: W chwili kurtyny II na scenie żyją naraz: dwa sloty sceny w trybie story, grunt, kurtyna pełnoekranowa z uGlass i uMask, rozwijający się obs z cofania, g_obs i #threadM, czyli 7 płyt przy limicie 6. Pełnoekranowy fsSpill z granulacją przy DPR 3 to największy koszt wypełnienia na stronie. „Zamrożenie do img” przez toDataURL blokuje wątek na 50 do 150 ms na każdą grafikę, a przy B-06, D-61 i C-01 takich grafik są dziesiątki. → Kurtyny i fsWash renderować przy DPR maks. 1,25 (tusz i tak jest miękki); w chwili pełnego zalania zatrzymać wszystkie płyty pod spodem (A-12) i liczyć je jako 0. #threadM rysować jako SVG albo canvas 2D, poza budżetem WebGL. Zamrażanie przez createImageBitmap i drawImage do docelowego canvasu 2D albo zostawić ostatnią klatkę na canvasie, nigdy toDataURL. audit.js mierzy liczbę aktywnych płyt w każdej klatce przewijania, nie w sekcji.
- [srednia] rozdzial-1 > „Dlaczego akurat te trzy kamienie” (C-22 trójkąt, telefon): Trójkąt z koralikami w wierzchołkach i słowami na bokach na szerokości 358 px wymusza podpisy poniżej 13 px albo tekst nachodzący na linie. Linijki pod koralikami nie mają gdzie stać. → Telefon: trójkąt mały (ok. 200 px) w przypiętej scenie jako ostatni stan epok, słowa „ochrona, jasne widzenie, siła” tylko na bokach (15 px, kursywa). Trzy linijki opisów przewijają się pod sceną, każda z koralikiem na plamie. Desktop bez zmian.
- [srednia] epilog + produkt + closing (numerologia): Rachunek 7+5=12, 1+2=3 jest teraz w PDP (D-61, pisany pędzlem), w epilogu (B-51 plus scala C-52: trójka z trzech pigmentów z koralikami na końcach), w domknięciu ensō, a do tego „Trzy w cenie” w closing. Numerologia podana tak uroczyście, w trzech miejscach, to najkrótsza droga do stylistyki sklepu ezoterycznego. → PDP: równanie jedną linijką zwykłym krojem na plamie szałwii, z pędzla tylko ostatnie 3. Epilog: bez C-52 (trójka jednym granatem), ensō domyka się cicho, podpisy z D-53 z lekkim dystansem („W numerologii dodaje się cyfry.”). Closing: bez powtarzania rachunku.
- [srednia] warstwa handlowa: szuflada sakiewki, arkusze, komunikaty, lightbox: Storyboard obejmuje sekcje, a pomija nakładki sklepu: szuflada ma border-radius 18px 18px 0 0 i box-shadow, .sizeopt 12 px, .intopt, .scta 14 i 18 px, .sg__prize 10 px, przyciski .mact i .thumbs na szkle (backdrop-filter, 6 wystąpień, także .top i .sbar). To łamie skalę promienia 4 px i zakaz szkła, a po kliknięciu „Dodaj” klient ląduje w innym sklepie. → Przywrócić E-51 i C-61 (szuflada z mokrym brzegiem papieru, pusty stan z rysunkiem pouch) oraz E-52 (przyciemnienie jako granatowa laweta od dołu). Wszystkie promienie do 4 px albo pigułka; backdrop-filter usunąć z .top, .sbar, .thumbs, .mact, .gdots, .bar i zastąpić nieprzezroczystym papierem sekcji. Komunikaty jako paski papieru (E-60).
- [srednia] produkt (PDP), zrzuty m/s00 do s03: Sam PDP ma teraz za dużo momentów: kropla przed tytułem, pisanie tytułu, galeria wywoływana palcem, ensō ceny z tyknięciem, nić z koralikami, rachunek pędzlem, znaki zaufania rysowane kolejno, akordeony na włosie, a na końcu kropla spadająca marginesem. To kłóci się z oznaczeniem „rytm cicha”. Zostaje za to lista 6 akordeonów (s03), która nadal wygląda jak szablon Shopify. → W PDP jeden żywy moment (galeria) i jedna zapowiedź (kropla A-16 na dole). Reszta malowana raz przy pierwszym renderze i zamrożona, bez sekwencji. Akordeony: zostawić 4 (Specyfikacja z linijką E-30, Rozmiar, W paczce z podpisami na rysunku D-07, FAQ 3 pytania), a Pielęgnację oraz Dostawę i zwroty scalić w jedną linijkę pod znakami zaufania.
- [srednia] album (zrzuty m/s39 do s41, d/s36): Siatka zdjęć z ciemnymi rynnami i zaokrąglonymi rogami to ramki-okna na brązowym tle. E-24 zamienia ją na telefonie w sticky kadr 70svh, czyli jedno duże okno z podmienianymi zdjęciami. → Zdjęcia bez rynien, nachodzą na siebie z mokrym lewym brzegiem (maska --wet-edge), pierwsze wychodzi zza lewej krawędzi. Pod dużym zdjęciem ochrowa laweta światła (C-53). Podpisy kamieni na zdjęciu surowców (D-54, E-25) jako jedyne marginalia albumu.
- [srednia] closing (zrzut m/s43, d/s39): Na zrzutach zamknięcie zaczyna się od pustego ekranu z granatowym jęzorem, ochrową plamą i samotnym kleksem z koralikiem. Storyboard opisuje wejście jako cichą nitkę, ale nie mówi wprost, że stary __spill z kleksem znika. Ten sam jęzor z lewej jest też w s13, s14, s18 i s34. → Usunąć __spill z closing i z końca rozdziału I (s13) oraz z VI przed „Gdy bransoletka się zerwie” (s34). W VI zamiast drugiego jęzora A-50: dłonie w przypiętej scenie rozchylają się (tryb story), a ta sama płyta przechodzi w broken. Closing wchodzi nitką z linijki specyfikacji prosto w sznurek pouch.
- [srednia] nawigacja: spis D-10 (FLIP), „Dalej”, panel Rozdziały: Skoki przez kotwice lądują w środku przewijanych szwów. Przy trafieniu w zakres kurtyny ekran jest cały granatowy albo przypięta scena stoi w pół kroku. Plan nie opisuje zachowania szwu przy skoku. → Kotwice rozdziałów celują w punkt tuż po szwie; przy programowym skoku wszystkie szwy i sceny po drodze dostają t=1. „Dalej” odgrywa szew szybko (0,8 s) zamiast skakać (A-06, B-44). FLIP cyfry z D-10 ląduje w cyfrze nad tytułem po zakończonym szwie.
- [niska] footer (zrzut m/s46, s47): W stopce zostaje tekst „Szkic 15 do akceptacji. Zdjęcia w szkicu są robocze…” w pliku szkic-16. To nieaktualne i zdradza, że projekt nie jest gotowy. → Zastąpić rzeczywistą stopką prawną (© 2026 intencja, dane firmy); informację o roboczych zdjęciach przenieść do komentarza HTML albo do dokumentu przekazania.
- [niska] typografia: .ann, .crumbs, .toc small, figcaption, .eyebrow 10 px, .dr-up, .dr-note, .scard dt: W źródle zostaje 11 deklaracji 12 px i 3 deklaracje 10 px (.trio__grid .eyebrow, .reasons .eyebrow, .pcard .eyebrow na desktopie). To łamie minimum 13 px. Marginalia D-60 mają 15 px i są w porządku, ale figcaption 12 px zostaje równolegle. → Globalnie min. 13 px (eyebrow 13 px z letter-spacing .12em), figcaption usunąć tam, gdzie wchodzą marginalia. audit.js odrzuca każdy computed font-size < 13.
- [niska] kontrast pigmentów (D-61, B-22, C-52, B-49): Cyfry-bohaterowie i rok 164 000 w rdzy (#8a4a2e na #fbf5eb ma ok. 6:1 i jest w porządku), ale cyfry albo słowa w ochrze tygrysiego oka (ok. #c08a3e) na kremie i na #f5e6cf mają ok. 2,5 do 2,8:1. To poniżej 3:1 nawet dla dużego tekstu, a te cyfry niosą treść. → Pigment ochry tylko jako plama i laweta pod granatową albo brązową cyfrą; treściowe cyfry i słowa zawsze granat lub brąz. Ochra jako tekst tylko w wersji przyciemnionej (ok. #7a5520, 4,5:1).
- [niska] global: animacje pisania i wsiąkania: Pisze się albo wsiąka prawie wszystko: tytuły (maska bp), tytuł w pasku (A-05), słowa „soak”, rok epoki, cyfry D-61, liczby epilogu, marginalia, znak stopki. To ta sama ogólna animacja pojawiania się, której zakazują zasady, tylko w stroju pędzla. → Pisanie na oczach tylko: tytuł rozdziału (raz), rok epoki, liczby epilogu, znak stopki. Soak słowo po słowie tylko w 3 zdaniach-kluczach (prolog, intencja w VI, zdanie o pęknięciu). Reszta tekstu stoi od razu.
- [niska] reduced motion i brak WebGL: budżet pliku: A-04 zakłada odbitki PNG dla wszystkich szwów i grafik. Przy 7 epokach, 4 kurtynach, ok. 10 szwach i scenach to łatwo kilka MB ponad obecne 8 MB, blisko limitu 14 MB. → Ilustracje w trybie bez ruchu to ich własne tekstury źródłowe z maską CSS --wet-edge (bez nowych plików). Nowe odbitki tylko dla szwów, jako WebP 1-bit/alpha maks. 30 KB każda. Kurtyny jako karty tytułowe w CSS (granat i tekst papieru, brzeg z tej samej maski). Budżet sprawdzany w audit.js.

Zmiany redaktora po krytyce:

- PRZYJĘTE: trzy kurtyny w ok. 9 ekranach. A-35 wypada całkowicie. Wejście III to cichy złoty przypływ A-37 bez przypinania, a obsydian rozsypuje się w tygrysie oko wewnątrz przypiętej sceny (A-36). Na granicach II, III, IV mamy teraz L, Q, L. audit.js pilnuje okna 10 ekranów, a nie tylko sąsiadów.
- ODRZUCONE CZĘŚCIOWO: propozycja, żeby smugę A-35 zostawić na desktopie na 60% wysokości. Pas tuszu przejeżdżający przez ekran czyta się jak stockowy „shine sweep”, który krytyk sam słusznie wytyka przy odblaskach. Do tego na desktopie nadal tworzyłby pseudo-L między A-28 i A-38. Desktop dostaje ten sam cichy przypływ, a przejście obs w tig odbywa się w sticky kolumnie.
- PRZYJĘTE: rytm opisuje głośność szwu wejścia (L to głośna, M oddech, Q cicha). rozdzial-1 ma cichy szew C-21, więc jest „cicha”, a opowiesc „oddech”. Nie ma już dwóch głośnych obok siebie.
- PRZYJĘTE: koniec strony bez pętli ściemnij, rozjaśnij, ściemnij. A-65 wypada. Stopka wchodzi pod ogonem znaku B-59 (szew stroke) bez washu. A-59 zastępuje A-60, czyli trzy jasne pociągnięcia w górę. Jedynym dużym fsWash w końcówce jest A-56.
- ODRZUCONE: E-37 (strużki spływające do stopki) jako alternatywa. Byłyby trzecią i czwartą kroplą na końcu strony, wbrew przyjętej zasadzie dwóch kropli-klamer, a spływający tusz niesie ryzyko skojarzeń z horrorem. Wystarcza ogon B-59.
- PRZYJĘTE: pięć przypiętych scen pod rząd. Przypięte zostają tylko VI (dłonie) i epilog 75 > 3. D-52 na telefonie to cztery zamrożone stany w przepływie. Album idzie zwykłym pionem z jednym pociągnięciem A-58, a E-24 wypada. E-31 działa w trybie once. Audyt: maks. 2 przypięte sceny pod rząd.
- PRZYJĘTE: szczelina na tekst pod sceną 46svh. Wraca E-43 (wstęga 36 px w scenach), .sbar łączy się z nagłówkiem w jedną chowaną linię, a na ekranach niższych niż 700 px scena ma 42svh. Całość w E-41.
- PRZYJĘTE: nadużycie cyjanotypii. Zostaje w trzech miejscach: pierwsze zdjęcie PDP raz na sesję, album jako ciemnia i stopka. Kolejne zdjęcia galerii są w kolorze i przy przesunięciu przechodzi przez nie tylko front tide() przez 300 ms. Oferty solo, real i kolekcja są zawsze w pełnym kolorze. Z A-49 wypada C-46, a z C-35 wypada B-43.
- PRZYJĘTE: ensō zostaje w dwóch rolach. D-38 to przesunięte, otwarte łuki. D-55 i B-13 to trzy poziome nici 16, 18 i 20 cm. B-49 to linie przypływu na jednej plamie. E-34 i E-35 zastępuje podkreślenie B-58. Z B-37 wypada D-24 (fakty w ensō), z C-35 ensō przy cenie, z A-01 ensō „Dalej” (B-44), a finał „Nawleczone” to pętla nici z supłem.
- KOREKTA SPRZECZNOŚCI W KRYTYCE: krytyk przywraca D-30 jako „brązowe ensō i dwa słowa”, a jednocześnie ogranicza ensō do dwóch ról. Karta kamienia dostaje więc odcisk pieczęci cylindrycznej (kształt z babilońskiej seal, C-33 i B-40), który łączy się z rozdziałem I i z pieczęcią hematytu.
- KOREKTA SPRZECZNOŚCI: E-08 (ensō ceny domyka się przy wyborze rozmiaru) kłóciło się z B-12 (to samo ensō domyka się dopiero w epilogu). Zostaje B-12. W PDP ensō stoi otwarte i jest malowane raz. Wybór rozmiaru potwierdza plama brązu pod pigułką, co jednocześnie zgadza się z zasadą jednego żywego momentu w PDP.
- PRZYJĘTE: jedna nić na ekranie. #threadM odgina się i staje osią spisu (D-10), epok (C-21), wierzeń II (C-32) i nawlekania V, a potem wraca na x=8. Nić w PDP, albumie i real to ta sama ścieżka. Audyt: najwyżej 1 widoczna .thread.
- PRZYJĘTE: kropla tylko dwa razy. B-11 wypada, a H1 renderuje się od razu, co pomaga też LCP. C-21 zaczyna się od supełka spisu. Na osiach wierzeń są koraliki zamiast kropli. Klamrą są A-16 i B-59/A-67.
- PRZYJĘTE: szablon rozdziałów kamieni. Oś wierzeń zmienia kształt: II jako nić pionowa, III jako warstwy skały (B-34), IV z miniaturami z rozdziału I (D-28). g_tig prowadzi ochra, g_hem rdza. „Jak dbać” to jedna linijka skreśleń, a pełna pielęgnacja pojawia się raz, w VI (D-08 w D-42).
- PRZYJĘTE: ściana tekstu w Karcie kamienia. D-30 daje ok. 25 słów, pełny tekst jest pod „Przeczytaj całą kartę” na obu szerokościach. Listy Dla kogo przenoszę do statycznego D-42 w VI.
- PRZYJĘTE: odblaski jako gradient CSS. B-39 i C-37 trafiają do C-60. W kurtynie II odblask to jedno suche pociągnięcie gwaszem, malowane raz i zostawione jako ślad.
- PRZYJĘTE: B-35. touch-action:pan-y, start gestu po 12 px w poziomie, rysa rysuje się sama po 4 s, przycisk działa z klawiatury, a rysa kończy się pieczęcią bez osobnego przytrzymania.
- PRZYJĘTE: gesty bez miejsca. C-60 ustala: lustro w II po faktach, pas w III po warstwach, pieczęć w IV przy rysie. Zgoda iOS pojawia się przy pierwszym geście, po odmowie zostaje przycisk. Każde tyknięcie ma widoczny odpowiednik w tuszu. Oddech ma przycisk „Zakończ”.
- PRZYJĘTE: wydajność. Kurtyny i fsWash przy DPR maks. 1,25, płyty pod pełnym tuszem liczą się jako 0 (A-12 w A-04), #threadM jako SVG, zamrażanie przez createImageBitmap i ostatnią klatkę zamiast toDataURL, a audyt płyt co klatkę.
- PRZYJĘTE: trójkąt C-22 na telefonie jest mały (ok. 200 px) w scenie, słowa tylko na bokach, a linijki przewijają się pod sceną. Do C-22 wchodzi też C-23 jako echo pokoleń, bo końcowy jęzor rozdziału I znika.
- PRZYJĘTE: numerologia. W PDP równanie zwykłym krojem, pędzlem tylko 3. W epilogu bez C-52 (jeden granat) i z podpisami z dystansem. W closing rachunek się nie powtarza. Z D-61 wypadają D-04, B-17 i C-10.
- PRZYJĘTE: warstwa handlowa. E-51, C-61, E-52, E-60, E-59, E-48 i E-62 scalone w E-41: bez szkła, promienie 4 px albo pigułka, szuflada z mokrym brzegiem, laweta zamiast przyciemnienia, komunikaty jako paski papieru.
- PRZYJĘTE: PDP przeładowany. Jeden żywy moment (galeria) i jedna zapowiedź (A-16). Reszta malowana raz i zamrożona. Akordeony: 4 (Specyfikacja, Rozmiar, W paczce, FAQ), a Pielęgnacja oraz Dostawa i zwroty to jedna linijka pod znakami zaufania. Z E-67 wypada D-03 (tarcza w PDP).
- PRZYJĘTE: album bez rynien i okien. Zdjęcia nachodzą na siebie z mokrym brzegiem, jest laweta C-53 i podpisy D-54 jako jedyne marginalia albumu.
- PRZYJĘTE: jęzory __spill z kleksem usunięte w closing, na końcu I i w VI. W VI działa A-50 w tej samej scenie, a closing wchodzi nitką specyfikacji.
- PRZYJĘTE: nawigacja przez szwy. Opisuje ją A-01 (z A-06): kotwice za szwem, t=1 dla szwów po drodze, „Dalej” odgrywa szew w 0,8 s, a FLIP cyfry ze spisu ląduje po szwie.
- PRZYJĘTE: stopka. „Szkic 15 do akceptacji” zastąpiony stopką prawną, a informacja o roboczych zdjęciach trafia do dokumentu przekazania.
- PRZYJĘTE: typografia i kontrast. Minimum 13 px wszędzie (eyebrow 13 px z .12em) z kontrolą w audycie, figcaption zastąpiony marginaliami. Ochra tylko jako plama, cyfry i słowa niosące treść są w granacie lub brązie.
- PRZYJĘTE: pisanie i wsiąkanie ograniczone. Na oczach pisze się tylko tytuł rozdziału, rok epoki, liczby epilogu i znak stopki. Soak działa w 3 zdaniach-kluczach: prolog, intencja, pęknięcie.
- PRZYJĘTE: budżet trybu bez ruchu. Ilustracje z maską --wet-edge, odbitki tylko dla szwów (WebP do 30 KB), kurtyny jako karty CSS.
- LICZBA: 44 wybrane pomysły. Dla zmieszczenia się w limicie scaliłem A-03 z A-02, B-06 z C-01, A-06 z A-01, D-08 z D-42, C-23 z C-22 i E-51 z E-41. Wypadły B-11, A-35, A-59, A-65, E-24 i D-24, a doszły A-37, A-60, A-58, D-30, D-42 i C-60.

## Po przeglądzie kurtyn (27.09)

Klient zapytał, czy pełnoekranowe zalanie nie jest kiczowate. Panel pięciu ocen (malarz, art director, sceptyk, UX telefonu, klientka) ocenił pierwszą wersję na 7/10 w skali kiczu. Powody: nasycony królewski granat, „chmury z Photoshopa”, tytuł jak z tarota z rozstrzelonym podtytułem i ten sam efekt trzy razy.

Obowiązuje teraz:
- **Pełne zalanie tylko jedno (II).** Stonowane indygo `#212B42`, płaskie, z ostrym mokrym brzegiem i cienką linią przypływu.
  - Ekran najpierw się przypina, dopiero potem wchodzi tusz.
  - Rozdział pod spodem jest przykryty papierem, dopóki ekran nie jest cały zalany.
  - Tytuł to tylko cyfra i nazwa. Gaśnie, zanim tusz zacznie się cofać.
- **IV i VI to szwy `horizon`.** Nowy papier podnosi się do połowy szwu, a na jego brzegu leży cienka linia pigmentu: rdza `#8e4a30` przed hematytem, blade indygo przed „Jak nosić”.
- **Szwy `rise` zatrzymują się w połowie.** Granica między papierami jest zawsze mokrym brzegiem, nigdy krawędzią pudełka.
- **Ograniczony ruch i brak WebGL:** spokojny tytuł na papierze, bez zalania.

Druga ocena tego samego panelu: kicz 3,4/10, uroda 6,6/10. Uwagi z tej oceny są wdrożone.

## Plama zamiast zalania (27.09)

Klient: „lepsze już chyba było, że jest poplamione i plama znika i jest sekcja, niż całe pełne, i żeby robiło większe wrażenie”. Pełne zalanie II zastąpiła plama tuszu (`fsStain`, płyta `stain`).

Panel pięciu ocen porównał trzy warianty plamy (a: średni walor, b: gęsta, prawie czarna, c: od lewej krawędzi). Wygrał **b** (wrażenie 7,2/10, kicz 4,4/10). Z a przeszczepiono jaśniejsze płaty, a z c zasadę „tusz z lewej”.

Choreografia:
1. **Kropla.** Ekran się przypina, na pusty papier spada jedna kropla, okrągła, bez konturu.
2. **Rozbicie.** Plama osiąga połowę rozmiaru w pierwszej chwili. Ma krótką koronę palców i rozprysk kropel, z których kilka jest wydłużonych. Potem powoli pełznie przez wilgotny papier.
3. **Plama z tytułem.** Tytuł „II Obsydian” zostaje niepomalowany (rezerwa) i pojawia się dopiero, gdy plama obejmie go z zapasem.
   - Plama wychodzi za lewą krawędź i zostawia papier po prawej. Na telefonie jest wyższa niż szersza.
   - Rdzeń jest prawie czarny, a płaty, które najdalej wypłynęły, są jaśniejsze.
   - Ziarno papieru widać tam, gdzie pigment jest cienki.
   - Czytelnik trzyma ekran, a plama schnie: jaśnieje i dostaje nierówną linię przypływu z wąskim pasem wyczerpanego pigmentu.
   - Tytuł leży z dala od kamienia: na telefonie nad nim, na komputerze po prawej.
4. **Czarne lustro.** Kropla czystej wody spada na kamień rozdziału II. Pozycję kamienia liczy się z jego ramki w ilustracji, przez to samo kadrowanie, które robi shader. Okno obejmuje cały kamień z marginesem i ma ciemny, ziarnisty welon. Obsydian wyłania się z ciemności.
5. **Zmywanie.** Przez mniej więcej ćwierć przypięcia front biegnie przez całą plamę w kilku językach, najszybciej w prawo, przez kolumnę tekstu. Resztki cofają się w lewo, skąd tusz przyszedł.
   - Front ma zaokrąglone płatki i ostre wcięcia. Pcha przed sobą pigment w asymetryczny grzbiet.
   - Za frontem uniesiony tusz rzednie na szerokość dłoni. To zmywanie, a nie wycinana dziura.
   - Papier wokół plamy schodzi równo dopiero wtedy, gdy woda zmyła tytuł. Nie ma dwóch tytułów naraz.
6. **Na koniec** ostatni pigment wsiąka w papier ziarnko po ziarnku i zostaje sam rozdział.

Zasady:
- Plama nigdy nie wyjeżdża z ekranem, bo zmywanie kończy się przed końcem przypięcia.
- Tempo zmywania nie zależy od liczby klatek.
- Wibracja pojawia się raz, przy upadku kropli.
- Ograniczony ruch i brak WebGL dają spokojny tytuł na papierze.
