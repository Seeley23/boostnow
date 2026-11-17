# Badanie: jak AI i Google odpowiadają na pytania klientów BoostNow

**Data:** 2026-11-17. **Źródło:** wyniki Google dla Polski (`gl=pl`, `hl=pl`, desktop) pobrane przez API Serply, razem z blokiem AI Overview. 14 zapytań: 6 pytań w języku klienta i 8 fraz głównych z `KEYWORD-MAP.md`.

**Ograniczenia:**
- Jeden pomiar z jednego dnia. Odpowiedzi AI zmieniają się między zapytaniami, więc to obraz stanu, nie trend.
- Serply nie zwraca listy źródeł cytowanych w AI Overview (pole `sources` jest puste). Źródła poniżej to marki wymienione w samym tekście odpowiedzi.
- Serply nie zwrócił „Podobnych wyszukiwań” ani „Innych pytań” (puste pola), a podpowiedzi Google są zablokowane w tym środowisku.
- Nie badano ChatGPT ani Perplexity: brak połączenia z tymi usługami w tej sesji.

---

## Najważniejsze wnioski

1. **boostnow.pl nie występuje w top 10 żadnego z 14 zapytań ani w żadnej z 6 odpowiedzi AI Overview.** Dotyczy to też fraz, na które GSC pokazywał średnią pozycję 8–13 (np. „pozycjonowanie stron poznań”). Średnia z 16 miesięcy maskuje obecny spadek.
2. **AI Overview wymienia z nazwy te same firmy, które są w top 3 organicznie.** Dla „agencja seo ai” odpowiedź poleca SAMOSEO i Sembility, czyli wyniki #2 i #1. Bez pozycji w Google nie ma co liczyć na wzmiankę w AI.
3. **Na pytanie „najlepsza agencja GEO w Polsce” Google pokazuje prawie same rankingi agencji** (Whites, searchmeets.ai, Coders Pilot, Gazeta Prawna, piotrpawlos.pl, Sembility, aboutmarketing.pl). Asystenci AI budują odpowiedzi „kogo polecić” z takich zestawień. Obecność BoostNow w tych rankingach to najkrótsza droga do bycia polecanym przez AI. To działanie PR, a nie zmiana na stronie.
4. **Dla „agencja seo olsztyn” AI Overview wymienia 7 agencji z adresem w Olsztynie** (Adcube, SEOforge, Solveit, Artimo, Empressia, Sunrise System, Semcore) i podaje widełki cenowe. BoostNow ma w schemie i `llms.txt` adres w Dobrym Mieście, więc dla AI nie jest firmą z Olsztyna. Fraza lokalna wymaga albo adresu w Olsztynie, albo celowania w „Dobre Miasto / Warmia”.
5. **Na „ile kosztuje pozycjonowanie” AI Overview odpowiada konkretnymi widełkami** (od 500 do 15 000 zł netto miesięcznie, rozbicie na typy firm i usługi). Artykuł BoostNow o cenach musi podać własne, konkretne liczby, żeby był materiałem do cytowania.
6. **Widoczni.com jest w top 10 w 8 z 14 zapytań** i jest wymieniany w odpowiedziach AI. To główny konkurent w niszy „SEO AI / GEO”. Sembility pojawia się 3 razy.

---

## Pytania klienta: kto wygrywa

| Pytanie | AI Overview | Top 3 organicznie |
|---|---|---|
| która agencja w Polsce pomoże mi pojawić się w ChatGPT? | brak | widoczni.com, youtube.com, sembility.com |
| jak sprawić żeby ChatGPT polecał moją firmę | brak | agencjacontentowa.pl, youtube.com, winline360.pl |
| najlepsza agencja GEO w Polsce | brak | agencjawhites.pl (ranking), widoczni.com, searchmeets.ai (ranking) |
| ile kosztuje pozycjonowanie w AI | brak | investnet.pl, smartbuzz.pl, studioa7.pl |
| co to jest GEO w marketingu | tak, wymienia widoczni i marketingonline.pl | widoczni.com, agencjakuznia.pl, marketingonline.pl |
| jak pojawić się w AI Overviews | brak | widoczni.com, wenet.pl, double-digital.pl |

Na 3 z 6 pytań w top 10 są filmy z YouTube. Krótki film „Jak sprawić, żeby ChatGPT polecał Twoją firmę” to realny kanał do tych zapytań.

## Frazy główne

| Fraza | AI Overview | Top 3 organicznie |
|---|---|---|
| agencja seo ai | tak, poleca SAMOSEO i Sembility | sembility.com, samoseo.pl, widoczni.com |
| pozycjonowanie w ai | tak, definicja + filary | studioa7.pl, jellinek.pl, widoczni.com |
| pozycjonowanie w chatgpt | tak, definicja + filary | sembility.com, widoczni.com, youtube.com |
| agencja geo | brak | adsfox.pl, widoczni.com, gazetaprawna.pl (ranking) |
| pozycjonowanie aio | brak | widoczni.com, byblossom.pl, grupavist.pl |
| ile kosztuje pozycjonowanie | tak, widełki cenowe | sempire.pl, traffictrends.pl, ks.pl |
| agencja seo olsztyn | tak, 7 agencji z adresami + ceny | empressia.pl, sunrisesystem.pl, pikseo.pl |
| pozycjonowanie stron poznań | brak | evolve-poznan.pl, widoczni.com, zgred.pl |

## Czego AI oczekuje od treści

Odpowiedzi AI Overview na „pozycjonowanie w ai” i „pozycjonowanie w chatgpt” powtarzają te same elementy, które same nagradzają:
- definicja w pierwszym zdaniu,
- struktura pytanie–odpowiedź i FAQ,
- tabele i listy zamiast długiej prozy,
- dane strukturalne (Schema.org, JSON-LD),
- unikalne dane i liczby,
- wzmianki o marce w zewnętrznych serwisach branżowych.

Odpowiedź na „pozycjonowanie w ai” zawiera twierdzenie, że AI „w ok. 60–70% bazuje na fundamentach klasycznego SEO”, bez źródła. Nie cytować tej liczby.

---

## Co zrobić

1. **Rankingi agencji (największy wpływ na AI):** zgłosić BoostNow do zestawień z top 10 dla „najlepsza agencja GEO w Polsce” (agencjawhites.pl, searchmeets.ai, coderspilot.com, gazetaprawna.pl, piotrpawlos.pl, aboutmarketing.pl). Część z nich to rankingi autorstwa samych agencji, więc wpis może nie być możliwy. Sprawdzić każdy osobno.
2. **Cennik z liczbami:** `/blog/ile-kosztuje-pozycjonowanie` z widełkami BoostNow w pierwszym akapicie i tabelą w HTML.
3. **Lokalizacja:** zdecydować, czy BoostNow celuje w Olsztyn (wtedy potrzebny adres i wizytówka Google w Olsztynie) czy w Dobre Miasto / Warmię.
4. **YouTube:** jeden film na pytanie „jak sprawić, żeby ChatGPT polecał moją firmę”.
5. **Powtórzyć pomiar** po wdrożeniu zmian na stronie (po przepięciu DNS na Smarthost), tymi samymi 14 zapytaniami.

---

# Badanie 2: odpowiedź asystenta AI na prompt badawczy (17.11.2026)

Źródło: raport wklejony przez właściciela, wygenerowany przez asystenta AI z wyszukiwaniem (prompt z `PROMPTY-AI-RESEARCH.md`, wersja zbiorcza). Format cytowań wskazuje na ChatGPT, ale narzędzie nie zostało podane. Jedna odpowiedź, jeden dzień.

## Gdzie BoostNow się pojawił

| Scenariusz | BoostNow | Kto wygrał i dlaczego |
|---|---|---|
| A. sklep meblowy | nie (ocena w sekcji o marce: „tak, do rozmowy”) | Semtactic, Matsu, neseo, PROPSEO: każdy ma **nazwane case study sklepu meblowego** |
| B. software house B2B | nie | Agencja SEO AI (Up&More), Whites (case Netguru) |
| C. firma z Olsztyna | **tak, #2 z 4** | #1 Sebastian Baryś: **osobna podstrona „Pozycjonowanie w AI Olsztyn”** |
| D. cena | nie | eMedia, Afterweb, Nexivio, Nowatorscy: **publiczne cenniki z kwotami** |
| E. spadek ruchu | nie | Whites, Semtactic, Matsu: case studies migracji i odbudowy ruchu |

Afterweb pojawił się w 4 z 5 scenariuszy, Agencja SEO AI (Up&More) w 3. To realna konkurencja BoostNow w odpowiedziach AI, inna niż w Google (tam: widoczni.com, Sembility).

## Co AI wyczytało o BoostNow i co mu przeszkadzało

- Cytuje liczby ze strony głównej jako deklaracje: +150% ROAS, 90 dni, 7+ lat, +42,5% konwersji, case „sklep meblowy” (1,2% → 3,1%, +340% ROI). Zaznacza: „nie znalazłem niezależnego potwierdzenia wyników ani informacji umożliwiających identyfikację klienta”.
- Znalazło w GoWork datę rozpoczęcia działalności: 5 stycznia 2024. Strona mówi „7+ lat doświadczenia”, strona autora „ponad 5 lat”. AI zestawia takie dane; sprzeczność obniża wiarygodność.
- Liczba „+42,5% Konwersja” pochodzi z dekoracyjnej karty w hero (`HeroSection.tsx`), a AI traktuje ją jako deklarację wyniku.
- Brakowało mu: publicznego cennika, case study GEO z nazwą klienta i pomiarem przed/po, raportu widoczności w AI, referencji, opisu metodologii.
- Nie znalazło case studies Caruma, SU-2 ani RudStudio, które są tylko w artykułach blogowych.

## Zapytania, które asystent wysłał do wyszukiwarki

Wzorce: „case study” + branża, „cennik 2026”, nazwa miasta + „GEO” / „widoczność ChatGPT”. Przykłady dosłowne:
- `Olsztyn agencja SEO GEO widoczność ChatGPT lokalna`
- `pozycjonowanie AI Olsztyn widoczność w ChatGPT`
- `ile kosztuje pozycjonowanie AI GEO w Polsce cennik 2026`
- `agencja SEO e-commerce case study sklep internetowy meble SEO agencja`
- `agencja SEO B2B software house case study leadów SEO`

Wniosek: strony z „case study” i „cennik 2026” w tytule oraz strony „pozycjonowanie w AI + miasto” są tym, czego AI szuka, kiedy dobiera agencje.

## 30 fraz „języka klienta”: weryfikacja w GSC

Porównane z 439 zapytaniami z GSC (16 miesięcy). Pokrycie znalazły tylko 4:
- „ile kosztuje pozycjonowanie strony w google miesięcznie” ≈ „ile miesięcznie kosztuje pozycjonowanie” (13 wyśw., poz. 32,1)
- „czym się różni GEO od SEO” ≈ „czym różni się geo od seo” (4 wyśw., poz. 13,5)
- „szukam specjalisty od SEO i GEO” ≈ długie zapytanie o agencję GEO/AIO (1 wyśw., poz. 2)
- „szukam firmy która poprawi widoczność mojej firmy w AI” ≈ „szukam agencji seo ai, która zwiększy widoczność mojej firmy w modelach językowych” (1 wyśw., poz. 6)

Pozostałe 26 to niezweryfikowane pomysły. Frazy problemowe („ruch spadł o połowę”, „konkurencja jest w chatgpt a ja nie”) nadają się na nagłówki i FAQ, ale nie wiadomo, czy ktoś je wpisuje.
