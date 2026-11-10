# Raport audytu GEO: BoostNow

**Data:** 2026-11-10 | **URL:** https://boostnow.pl | **Typ biznesu:** Agencja / B2B services (+ elementy Publisher/blog) | **Przeanalizowane strony:** 50 URL-i z sitemapy (crawl UA Googlebot) + 3 strony × 6 UA (test dostępu) + 5 stron renderowanych w Chromium | **Tryb:** analityczny (GSC + GA4 przez Composio)

**Sygnały klasyfikacji typu:** formularz kontaktu i strony `/kontakt`, `/o-nas`, case studies (Caruma, SU-2, RudStudio) w treści, schema `Organization`/`LocalBusiness`/`Service` na stronie głównej i artykułach miejskich, ponad 50 artykułów blogowych z `Article`+`Person`. Brak koszyka, cennika SaaS i logowania. Sygnał dodatkowy: blog (Publisher).

**Zakres i ograniczenia (czytaj przed wnioskami):**
- Crawl wykonany bezpośrednio z `curl` (odstęp 1 s, limit 50 URL). Nie odpytano asystentów AI (ChatGPT, Perplexity, Gemini, Copilot, Claude), więc **cała kategoria Brand Authority jest `N/A`** i została pominięta z renormalizacją wag. Nie mierzono Core Web Vitals (brak CrUX/Lighthouse w sesji): sub-kryterium `N/A`.
- Przeglądarka w sandboxie nie mogła załadować `googletagmanager.com` (`ERR_TUNNEL_CONNECTION_FAILED`). To ograniczenie sandboxa, nie dowód awarii tagu.
- Artykuły oceniano głębiej na próbie n=1 (`/blog/pozycjonowanie-geo`). Wyniki Citability i Content mają niską pewność.
- Dane GSC (wyświetlenia, kliknięcia, inspekcja URL) pochodzą z Waszego opisu zadania i nie zostały ponownie pobrane. Zweryfikowałem: sitemapy w GSC, strumień danych GA4 i sesje GA4 miesiąc po miesiącu.

---

## Podsumowanie

**Całkowity wynik GEO: 50/100 (Poor, 40-59)** po renormalizacji (bez Brand Authority i bez CWV).

Strona nie blokuje żadnego bota AI: wszystkie testowane UA dostają `200` i pełny dokument. Największą słabością jest renderowanie. Cała treść to SPA (CSR): surowy HTML ma 5,6 KB i zero `<h1>`. Dla botów serwer dokleja tylko `title`, `description`, `canonical` i JSON-LD, ale **nie doklejając, tylko dopisując do tagów z shella**. Powstają dwa `<title>` i dwa `<link rel="canonical">`, z których pierwszy zawsze wskazuje stronę główną. To najprawdopodobniejsze techniczne wyjaśnienie statusów „Crawled - currently not indexed”. To hipoteza do weryfikacji w GSC, nie udowodniony fakt.

**Co to kosztuje dziś:** Googlebot i boty AI widzą dla każdej podstrony konkurujące sygnały (canonical na `/` oraz na właściwy URL) i brak treści w HTML, a wskazany w GSC nowy slug artykułu o Krakowie zwraca `200` z canonicalem strony głównej zamiast `404`.

### Tabela wyników

| Kategoria | Wynik | Waga (tryb analityczny) | Ważony |
|---|---|---|---|
| AI Citability | 58 | 22% | 1276 |
| Brand Authority | N/A | 18% (pominięta) | - |
| Content & Semantic Architecture | 43 | 18% | 774 |
| Technical GEO | 61 | 14% | 854 |
| Schema & Structured Data | 67 | 9% | 603 |
| Platform Optimization | 37 | 9% | 333 |
| Analytics & Measurement | 27 | 10% | 270 |
| **Razem** | **50** | 82% (po renormalizacji) | 4110 / 82 |

---

## Phase 0: interpretacja historii ruchu

Zgłoszony wzorzec: **nagły całkowity spadek** → najpierw triggery techniczne.

Sprawdzone triggery techniczne:

| Trigger | Wynik | Dowód |
|---|---|---|
| Boty AI zablokowane w robots.txt | Nie | `https://boostnow.pl/robots.txt`: jawne `Allow: /` dla GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, anthropic-ai, cohere-ai, CCBot i innych |
| Boty zablokowane na krawędzi (403/429) | Nie | Tabela poniżej: 200 dla wszystkich UA |
| Domain-level `noindex` | Nie | `<meta name="robots" content="index, follow">` na wszystkich 50 URL-ach |
| Klucz URL zwraca 4xx/5xx | Nie | Wszystkie 50 URL-i z sitemapy: 200 |
| Treść poza surowym HTML (CSR) | **TAK** | Patrz Critical #1 |
| Soft-404 | **TAK** | Nieistniejące slugi zwracają 200 (Critical #2 poniżej) |

Hipoteza o tagu GA4 (wasze podejrzenie) **nie potwierdza się w tej formie**:
- Tag w HTML: `gtag/js?id=G-80LEXHXKTK` (`https://boostnow.pl/`).
- Strumień GA4 `properties/518185642/dataStreams/13231969419` ma `measurementId: G-80LEXHXKTK`, czyli ID się zgadza.
- GA4 nadal rejestruje sesje (lis 11, paź 7, wrz 6, sie 1), więc tag działa przynajmniej sporadycznie. Zero sesji zaangażowanych od sierpnia jest zgodne z ruchem botowym lub z prawie zerowym ruchem. Nie dowodzi to awarii pomiaru.
- Niezależny dowód spadku widoczności to GSC (wyświetlenia 3392 → 58), czyli nie artefakt pomiaru.

Potencjalna przyczyna częściowej utraty danych (niezweryfikowana): CSP w `<meta http-equiv>` ma `connect-src` tylko dla `region1.google-analytics.com`, bez `analytics.google.com` i bez `stats.g.doubleclick.net`. Wymaga testu w prawdziwej przeglądarce z włączoną siecią.

Spadek w GSC jest schodkowy (szczyt ok. 28.06-2.07, potem 1365 > 531 > 216 > 125 tygodniowo), co lepiej pasuje do utraty indeksacji niż do jednorazowej awarii.

Oś czasu z repo i Airtable (fakty):
- Rekordy w Airtable `Articles 2` mają `createdTime` od 2026-05-26 do 2026-07-03: 52 artykuły w około 5 tygodni, w tym kilkanaście hiperlokalnych (Dywity, Stawiguda, Barczewo, Olsztynek, Dobre Miasto).
- Commit `bc31e0f` („Fix bot meta injection using wrong path on all non-home pages”) i `c57e80f` (schema + FAQ dla botów) pochodzą z 2026-06-07.
- Korelacja czasowa nie dowodzi przyczyny.

---

## Test dostępu botów AI na żywo (1.4)

Zapytania `curl` z odstępem 1 s. „Body” = rozmiar odpowiedzi w bajtach.

| UA | `/` | `/aio` | `/blog/pozycjonowanie-geo` |
|---|---|---|---|
| GPTBot | 200, 5641 | 200, 5979 | 200, 8560 |
| ClaudeBot | 200, 5641 | 200, 5979 | 200, 8560 |
| PerplexityBot | 200, 5641 | 200, 5979 | 200, 8560 |
| Google-Extended (UA string) | 200, 5641 | 200, 5979 | 200, 8560 |
| Bingbot | 200, 5641 | 200, 5979 | 200, 8560 |
| Googlebot | 200, 5641 | 200, 5979 | 200, 8560 |
| Przeglądarka (kontrola) | 200, 5641 | 200, 5641 | 200, 5641 |

Wnioski:
- Brak blokady na krawędzi i brak rozbieżności robots.txt vs edge.
- Każdy UA dostaje dokument bez `<h1>` i bez treści artykułu: 8560 B to shell + doklejone meta/JSON-LD. „200 + treść” jest spełnione tylko dla głowy dokumentu.
- Wariant dla botów (UA-sniffing) różni się od wariantu dla przeglądarki. Dla `/aio` bot dostaje `title` „AIO – AI Optimization dla E-commerce | BoostNow”, a po renderowaniu w przeglądarce tytuł to „AIO – Pozycjonowanie w AI | BoostNow”. Rozbieżność treści head między botem a użytkownikiem to ryzyko polityki cloakingu (patrz Technical).

---

## Critical

### C1. Treść główna nie występuje w surowym HTML (CSR)
- **Trigger:** „Main content absent from raw HTML (pure CSR, no prerender)”.
- **Dowód:** `https://boostnow.pl/` surowy HTML = 5641 B, `<div id="root"></div>`, `<h1>` w surowym HTML: 0 na wszystkich 50 sprawdzonych URL-ach. Po renderowaniu w Chromium: strona główna 977 słów, `/blog/pozycjonowanie-geo` 2082 słów, `<h1>` obecne.
- **Wpływ:** boty AI, które nie wykonują JS, nie widzą treści artykułów. Wstrzyknięte JSON-LD (Article, FAQPage) to jedyne, co dostają.
- **Naprawa:** prerender/SSR całej treści (nie tylko head) dla każdej trasy, albo statyczne generowanie artykułów z Airtable przy buildzie.

### C2. Soft-404: SPA zwraca `200` dla każdego nieznanego sluga
- **Trigger:** zbliżony do „Key pages returning 4xx or 5xx” (odwrotność: błędne strony zwracają 200). Klasyfikacja własna, nie z katalogu.
- **Dowód (UA Googlebot i GPTBot, identyczny wynik):**
  - `/blog/pozycjonowanie-krakow-twoj-klient-szuka-czy-trafia-do-ciebie` → 200, 5641 B, canonical `https://boostnow.pl/`
  - `/blog/recnNGq78PxWCACHM` → 200, 5641 B, canonical `/`
  - `/blog/totalnie-nieistniejacy-slug-xyz` → 200, canonical `/`
  - `/nieistniejaca` → 200, canonical `/`
  - `/sitemap_index.xml` → 200 `text/html` (powinno być 404)
  - W Chromium nowy slug Krakowa renderuje `<h1>Artykuł nie znaleziony</h1>` przy statusie 200.
- **Naprawa:** zwracać prawdziwe `404` dla nieznanych tras (sprawdzenie w serwerze przed wysłaniem shella) oraz `<meta name="robots" content="noindex">` na ekranie „Artykuł nie znaleziony”.

---

## Poza katalogiem triggerów, ale najwyższy priorytet techniczny

### X1. Podwójne `<title>` i podwójny `<link rel="canonical">` z canonicalem strony głównej na pierwszym miejscu
- **Uwaga:** nie jest to trigger z katalogu Phase 4. Klasyfikacja własna. Kandydat na główną przyczynę braku indeksacji (hipoteza).
- **Dowód (HTML dla Googlebota, 50 URL-i):** np. `/blog/pozycjonowanie-geo` ma `titles=2`, canonical: `https://boostnow.pl/` oraz `https://boostnow.pl/blog/pozycjonowanie-geo`. Taki sam wzór na wszystkich 45 URL-ach z doklejoną meta (np. `/aio`: `/` i `/aio`). Również w DOM po renderowaniu: `/blog/pozycjonowanie-geo` i `/o-nas` mają po 2 canonicale, a `meta description` pozostaje opisem strony głównej („BoostNow pomaga firmom rosnąć…”) mimo innego `title`.
- **Wpływ:** według dokumentacji Google przy wielu sprzecznych `rel=canonical` sygnał może zostać zignorowany. Połączone z brakiem treści w HTML daje stronę wyglądającą jak duplikat strony głównej.
- **Naprawa:** wstrzykiwanie ma **zastępować** tagi shella (`<title>`, `meta description`, `canonical`), nie dopisywać po nich.

### X2. Cztery strony lokalne w sitemapie nie dostają żadnej doklejonej meta
- `/barczewo`, `/stawiguda`, `/dywity`, `/olsztynek`: 200, 5641 B, jeden `<title>`, canonical `/`. Strony są w `sitemap.xml`, ale dla bota wyglądają jak strona główna.

---

## High

### H1. Schema `Service` nie występuje na stronach ofertowych
- **Trigger:** „Required schema type for the business type missing” (Agency/B2B: `Organization`, `Service`).
- **Dowód:** strona główna zawiera `WebSite`, `Organization`, `LocalBusiness`, `FAQPage` (Chromium, `https://boostnow.pl/`). `Service` wykryto tylko w JSON-LD doklejanym botom dla artykułów miejskich (np. `/blog/pozycjonowanie-wroclaw-niedoinwestowany-rynek-seo`). Nie sprawdziłem typów na `/aio`, `/aio-ecommerce`, `/olsztyn` (render Chromium: `/aio` ma 2 bloki ld+json, ich typów nie odczytałem).

### H2. Brak atrybucji autora w schema artykułów miejskich/branżowych
- **Trigger:** „No author attribution on knowledge content”, częściowo.
- **Dowód:** artykuły typu `Article` mają `Person` (Mateusz Nowotka, LinkedIn). Artykuły o typach `Answer, City, FAQPage, Organization, Question, Service` (np. `/blog/pozycjonowanie-warszawa-jak-firma-z-warszawy-trafia-do-top-google`, `/blog/seo-dla-kliniki-pacjenci-szukaja-specjalistow-w-google`) nie mają `Article` ani `Person`.

---

## Medium

- **M1. Rozbieżność head bot vs użytkownik** (`/aio`: dwa różne tytuły, patrz wyżej). Dynamic rendering jest dopuszczalny, gdy treść jest równoważna; różne tytuły nie są.
- **M2. Sitemapa: identyczne `lastmod` dla wszystkich 71 URL-i** (`2026-10-28`), podczas gdy `dateModified` w schema artykułów to czerwiec/lipiec (np. `/blog/seo`: 2026-06-26, `/blog/tanie-pozycjonowanie-stron`: 2026-07-02). Sygnał świeżości jest niewiarygodny.
- **M3. `/blog/pozycjonowanie-geo`: `datePublished` = `dateModified` = 2026-06-12.**

## Low

- **L1. Wyciek składni markdown w nagłówkach:** w DOM `/blog/pozycjonowanie-geo` nagłówki H2 zawierają `{#czym-jest}`, `{#okno-okazji}`, `{#metodyka}`, `{#case-studies}` (tekst widoczny dla użytkownika i botów).
- **L2. Artykuł bez obrazów:** `/blog/pozycjonowanie-geo` ma 0 `<img>` (brak dowodów doświadczenia).
- **L3. Konsola:** „X-Frame-Options may only be set via an HTTP header” (meta nie działa).
- **L4. Brak WebMCP/agentic endpoints** (zgodnie z regułami: tylko future-readiness).

---

## Ryzyko niezgodności slugów (osobna sekcja)

### Stan faktyczny

| Obserwacja | Dowód |
|---|---|
| Sitemapa live ma 52 URL-e `/blog/*` | `https://boostnow.pl/sitemap.xml` (71 `<loc>` ogółem) |
| `client/src/data/blog/articles-metadata.json` w repo (HEAD `c57e80f` i dalej) ma 25 slugów | odczyt pliku |
| Slugi w sitemapie, których **nie ma** w repo: 36 | np. `pozycjonowanie-krakow-niedoinwestowany-rynek-seo-w-polsce`, `pozycjonowanie-wroclaw-niedoinwestowany-rynek-seo` |
| Slugi w repo, których **nie ma** w sitemapie: 11 | np. `pozycjonowanie-krakow-twoj-klient-szuka-czy-trafia-do-ciebie`, `pozycjonowanie-katowice-2-miliony-klientow-twoj-rynek-czeka`, `seo-dla-hoteli-kazda-rezerwacja-przez-booking-kosztuje-cie-20-google-zero` |
| Nowy slug Krakowa na żywo | 200 + canonical `/` + „Artykuł nie znaleziony” (soft-404); GSC: „URL is unknown to Google” |
| Stary slug Krakowa na żywo | 200 + injekcja meta (działa), ale GSC: „Crawled - currently not indexed” |
| Airtable `Articles 2` → pole `Slug` | w odpowiedzi API **żaden z 52 rekordów nie ma wartości `Slug`** (pole zwrócone puste przy zapytaniu o nie) |
| Airtable `Status` | 51 rekordów `Draft`, 1 `published` (`llms.txt`), a wszystkie 52 są publiczne w sitemapie → `Status` nie bramkuje publikacji |
| Tytuł w repo vs Airtable vs live (`pozycjonowanie-geo`) | repo `seoTitle`: „Pozycjonowanie GEO: Jak Być Cytowanym przez ChatGPT i Gemini [2026]”; Airtable `SEO Title` = live `<title>`: „Pozycjonowanie GEO — Strategia dla Firm B2B w Polsce 2026” |

Wniosek: repo (branch `claude/bold-albattani-0C2SL`) jest przed wdrożeniem **albo** używa innych danych niż produkcja. Wdrożenie obecnego `articles-metadata.json` zmieni zaindeksowane URL-e artykułów i tytuły. Nie wiem, z jakiego pliku/źródła korzysta serwer produkcyjny.

### Rekomendacja

1. **Jedno źródło prawdy dla sluga:** wypełnić kolumnę `Slug` w Airtable (dziś pusta) wartościami **zgodnymi z obecnie zaindeksowanymi URL-ami** (czyli dokładnie tymi 52 z sitemapy). Nie generować sluga z tytułu/`seoTitle`.
2. Jeśli zmiana sluga jest mimo to potrzebna, wdrożyć **301** ze starego na nowy slug i zaktualizować sitemapę oraz canonical w tym samym wdrożeniu.
3. Przed wdrożeniem obecnego brancha porównać listę slugów repo z sitemapą (11 nowych, 36 brakujących), żeby nie osierocić zaindeksowanych adresów.
4. Naprawić C2 (prawdziwy 404), inaczej każdy błędny slug (jak `recnNGq78PxWCACHM`, ID rekordu Airtable) nadal generuje soft-404.
5. Po wdrożeniu: ponownie zgłosić sitemapę w GSC (ostatnie pobranie 2026-07-07; zgłoszone 26 URL-i, zaindeksowane wg raportu GSC: 0).

---

## Zgodność Airtable ↔ strona na żywo

| Element | Wynik | Dowód |
|---|---|---|
| `SEO Title` → `<title>` dla botów | zgodne 5/5 próbek | `llms-txt`, `pozycjonowanie-wroclaw-niedoinwestowany-rynek-seo`, `tanie-pozycjonowanie`, `seo-dla-kliniki-pacjenci-szukaja-specjalistow-w-google`, `jak-pojawic-sie-w-chatgpt`, `pozycjonowanie-geo`: tytuł = Airtable `SEO Title` |
| `Meta Description` → `meta description` | zgodne 6/6 próbek | j.w. |
| `Title` (H1/headline w Article) | drobna różnica | Airtable: „…Strategia dla Firm B2B w Polsce [2026]”; schema headline: „…Praktyczna Strategia dla Firm B2B w Polsce 2026” (brak nawiasów) |
| `Schema JSON` / FAQ | **nie porównano** | pola `Schema JSON` i `FAQ` nie zostały pobrane z Airtable w tej sesji |
| Powielone tagi (title/canonical) | niezgodność strukturalna | patrz X1 |
| Klientowa meta description w DOM | niezgodność | w DOM `/blog/pozycjonowanie-geo` opis nadal z shella, nie z Airtable |

---

## Głębsze analizy kategorii

### AI Citability (58/100, pewność niska: n=1 artykuł)

| Sub-kryterium | Waga | Wynik | Dowód |
|---|---|---|---|
| Lead-first answer blocks | 30% | 60 | `/blog/pozycjonowanie-geo`: pod pierwszym H2 definicja w pierwszym zdaniu („Pozycjonowanie GEO to polska nazwa dyscypliny Generative Engine Optimization…”). Nie sprawdzono pozostałych 44 artykułów |
| Passage self-containment | 20% | 55 | akapity zależne od kontekstu sekcji case studies |
| Fact density | 20% | 65 | daty i nazwy (Princeton University, listopad 2024; Caruma; SU-2), liczby w meta (151k wyświetleń, 90 dni) |
| Format-to-intent | 15% | 50 | 8 H2, 1 tabela, FAQ w schema |
| Query fan-out | 15% | N/A | brak próby |

Ważne: ocena dotyczy treści po renderowaniu JS. Boty bez JS jej nie zobaczą (C1).

Cytat z `/blog/pozycjonowanie-geo`, H2 „Dlaczego pozycjonowanie GEO w Polsce ma teraz okno okazji?”: „Polski rynek pozycjonowania GEO ma trzy charakterystyki które tworzą okno okazji niewidziane od dekady. Pierwsza: większość polskich agencji SEO nie oferuje jeszcze GEO…”. Ocena: 50. Teza o rynku bez liczby i źródła. Propozycja: otworzyć sekcję zdaniem z mierzalnym faktem i źródłem, następnie wymienić trzy charakterystyki jako listę numerowaną.

### Brand Authority: N/A
Nie wykonano sondy encji (2.1) ani wyszukiwania wzmianek. Wynik nie jest oceniany. Zalecane jako osobny krok: te same 3 pytania do 5 asystentów + sprawdzenie Wikidata/LinkedIn/Reddit.

### Content & Semantic Architecture (43/100)

| Sub-kryterium | Waga | Wynik | Dowód |
|---|---|---|---|
| Topical coverage & Central Entity | 25% | 40 | Drift: obok GEO/SEO są artykuły o 5 gminach pod Olsztynem, branżowe (klinika, hotel, prawnik), „Jak założyć sklep internetowy”, „Ile kosztuje strona internetowa”; kilkanaście o identycznym szablonie tytułu „… [2026]” |
| Information Gain | 25% | 45 | liczby case studies deklarowane, nie zweryfikowane; artykuły miejskie wyglądają szablonowo (identyczny zestaw typów schema) |
| Author identity | 20% | 65 | `Person` + LinkedIn w `Article`; strona `/mateusz-nowotka`; brak w typach Service/City |
| Core/Outdoor split | 15% | N/A | linkowania wewnętrznego nie zmierzono |
| Experience evidence | 15% | 15 | 0 obrazów na próbkowanym artykule |

### Technical GEO (61/100)

| Sub-kryterium | Waga | Wynik | Dowód |
|---|---|---|---|
| Dostęp botów (live) | 30% | 100 | tabela wyżej |
| Rendering | 20% | 15 | CSR; treść poza HTML; podwójne tagi head |
| Core Web Vitals | 15% | N/A | niezmierzone |
| Pliki kontrolne | 10% | 70 | `/llms.txt` 200 (3930 B), `/llms-full.txt` 200 (130 746 B), `/rss.xml` 200, sitemapa wskazana w robots.txt; `sitemap_index.xml` zwraca HTML 200; klucz IndexNow w robots jako niestandardowa linia |
| Policy compliance | 15% | 55 | brak dowodu parasite content; ryzyko cloakingu: różny `title` bot vs użytkownik (`/aio`) |
| Agentic readiness | 10% | 40 | `llms.txt` jest; brak danych ofertowych/cenowych w strukturze (cennik tylko w treści artykułów) |

`llms.txt` podaje adres „ul. Marii Konopnickiej 11, 11-040 Dobre Miasto”, zgodnie ze schema `Organization` na stronie głównej (`PostalAddress`: ta sama ulica, kod, miejscowość).

### Schema & Structured Data (67/100)

| Sub-kryterium | Waga | Wynik | Dowód |
|---|---|---|---|
| Wymagane typy | 50% | 70 | `Organization` ✓; `Service` tylko na artykułach miejskich (dla botów) |
| Walidacja | 30% | 70 | parsowanie JSON-LD bez błędów w Chromium dla strony głównej (4 bloki); nie użyto walidatora Google |
| Kompletność pól | 20% | 55 | `dateModified` = `datePublished` (`/blog/pozycjonowanie-geo`); brak `Person` w typach Service |

FAQ w treści a `FAQPage`: `FAQPage` jest obecne na stronie głównej i artykułach, więc trigger „FAQ bez FAQPage” nie zachodzi.

### Platform Optimization (37/100, pewność niska)

| Silnik | Waga | Wynik | Uzasadnienie |
|---|---|---|---|
| Google AI Overviews | 30% | 20 | wg GSC (dane z zadania): strona główna zaindeksowana, kluczowe artykuły „Crawled - currently not indexed”; wyświetlenia paź 338 |
| ChatGPT | 20% | 45 | GPTBot 200; treść w CSR; brak sondy encji |
| Perplexity | 20% | 40 | PerplexityBot 200; jednakowe `lastmod` psuje sygnał świeżości |
| Gemini | 15% | 40 | tylko token robots Google-Extended; brak sondy encji |
| Bing Copilot | 15% | 50 | Bingbot 200; plik klucza IndexNow zwraca 200 `text/plain`; obecność w indeksie Bing nie sprawdzona |

Fakty zewnętrzne (spójność cen/oferty): nie porównywano profili zewnętrznych. Wewnętrznie adres w `llms.txt` i schema jest zgodny.

### Analytics & Measurement (27/100)

| Sub-kryterium | Waga | Wynik | Dowód |
|---|---|---|---|
| Brand/non-brand | 30% | N/A | nie pobrano zapytań |
| Atrybucja AI | 30% | 35 | według zadania: `manus.im` 49 sesji; nie zweryfikowano konfiguracji kanału AI w GA4 |
| Paid/organic | 25% | N/A | brak danych Ads |
| Opóźnienie indeksacji | 15% | 10 | sitemapa `https://boostnow.pl/sitemap.xml` w GSC: zgłoszone 26, zaindeksowane 0, `lastDownloaded` 2026-07-07T09:50:15Z; `rss.xml`: pobrany 2026-01-14. Aktualna sitemapa ma 71 URL-i i `lastmod` 2026-10-28 |

Zweryfikowane GA4 (`properties/518185642`, strefa Europe/Warsaw), sesje / sesje zaangażowane: maj 655/154, cze 380/81, lip 18/10, sie 1/0, wrz 6/0, paź 7/0, lis 11/0. Zgodne z danymi z zadania.

---

## Quick wins (ten tydzień)

1. Zastępować, nie dopisywać: wstrzykiwany `<title>`/`description`/`canonical` ma nadpisywać tagi shella (X1). Skutek: jeden spójny canonical na stronę.
2. Prawdziwy 404 dla nieznanych slugów (C2), w tym `/sitemap_index.xml`. Skutek: koniec soft-404.
3. Wypełnić `Slug` w Airtable dotychczasowymi URL-ami z sitemapy i nie wdrażać nowych slugów bez 301. Skutek: brak osierocenia indeksu.
4. Ponownie zgłosić `sitemap.xml` w GSC i poprosić o indeksację: `/`, `/blog/pozycjonowanie-geo`, `/blog/pozycjonowanie-krakow-niedoinwestowany-rynek-seo-w-polsce`. Skutek: nowy odczyt po 4 miesiącach.
5. Usunąć `{#…}` z nagłówków H2 (L1).

## Plan 30 dni

### Tydzień 1: infrastruktura i dostęp
- Prerender/SSR pełnej treści (C1), zamiana dopisywania meta na nadpisywanie (X1), prawdziwe 404 (C2).
- Meta dla `/barczewo`, `/stawiguda`, `/dywity`, `/olsztynek` (X2).
- Ujednolicić `lastmod` z `dateModified` (M2).

### Tydzień 2: schema i struktura odpowiedzi
- `Service` na `/aio`, `/aio-ecommerce`, `/olsztyn` (H1); `Person` jako autor w artykułach Service/City (H2).
- Rozróżnić `dateModified` od `datePublished`.

### Tydzień 3: treść, E-E-A-T, architektura
- Przegląd artykułów hiperlokalnych pod kątem duplikacji i dryfu; rozważyć scalenie lub noindex dla najsłabszych (decyzja po danych GSC, nie z tego audytu).
- Dodać obrazy własne (zrzuty case studies) do artykułów flagowych.

### Tydzień 4: platformy, spójność, pomiar
- Wykonać sondę encji w 5 asystentach i uzupełnić Brand Authority.
- Zmierzyć CWV (CrUX/PageSpeed).
- Skonfigurować kanał AI w GA4 i segment brand/non-brand w GSC.
- Zweryfikować w przeglądarce z siecią, czy GA4/GTM ładuje się bez błędów CSP.

---

## Appendix A: Strony przeanalizowane (UA Googlebot, 50 URL-i)

| Grupa URL | Status | Rendering | Typy schema w HTML bota | Problemy |
|---|---|---|---|---|
| `/` | 200 | CSR | (ld w shellu: WebSite) | brak h1 w HTML |
| `/aio`, `/aio-ecommerce`, `/blog`, `/glossary`, `/calculator`, `/oblicz-straty`, `/o-nas`, `/kontakt`, `/slownik`, `/mateusz-nowotka`, `/olsztyn`, `/regulamin`, `/polityka-prywatnosci`, `/polityka-cookies` | 200 | CSR | brak | podwójny title i canonical (X1) |
| `/barczewo`, `/stawiguda`, `/dywity`, `/olsztynek` | 200 | CSR | brak | brak doklejonej meta (X2) |
| `/blog/*` typu Article (np. `/blog/llms-txt`, `/blog/pozycjonowanie-geo`, `/blog/seo`) | 200 | CSR | Article, Person, Organization, FAQPage, WebPage, Question, Answer | X1, treść poza HTML |
| `/blog/*` typu Service/City (np. `/blog/pozycjonowanie-warszawa-jak-firma-z-warszawy-trafia-do-top-google`) | 200 | CSR | Service, City/AdministrativeArea, Organization, FAQPage | X1, brak Article/Person |

Pełny wynik crawla (50 wierszy: status, bajty, liczba `<title>`, canonicale, typy ld+json, `<h1>`) był analizowany lokalnie; wzór jest identyczny w całej grupie.

## Appendix B: Błędy pobrań
Brak błędów HTTP w 50 URL-ach. Pozostałe 21 URL-i z sitemapy (71 łącznie, limit 50) nie były crawlowane. Przeglądarka sandboxa nie załadowała GTM/GA/Clarity/manus-analytics (`ERR_TUNNEL_CONNECTION_FAILED`), więc nie weryfikowano ładowania tagów.

## Appendix C: Źródła
- Dane na żywo: `curl` na `https://boostnow.pl` (robots.txt, sitemap.xml, llms.txt, 50 stron, test UA), Playwright/Chromium (5 stron).
- GA4 `properties/518185642` i GSC `sc-domain:boostnow.pl` przez Composio (strumień danych, sesje miesięczne, lista sitemap).
- Airtable „BoostNow CMS” (`appB0MrrpweuNvlQd`), tabela `Articles 2` (52 rekordy: Title, SEO Title, Meta Description, Slug, Status).
- Repo: `server/page-meta.ts`, `client/src/data/blog/articles-metadata.json`, historia git.
- Dane GSC z wyświetleniami/kliknięciami i inspekcją URL: z opisu zadania, nieodtwarzane.
- Benchmarki branżowe: nie cytowano żadnych.
