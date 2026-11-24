# Prompt: maksymalna optymalizacja `/audyt-ai-dla-sklepu` pod Google i AI

Wklej poniższy blok do Claude Code w repozytorium boostnow (gałąź `main`).

---

## Jakie skille wybrałem i dlaczego

Przejrzałem 33 skille SEO i GEO. Prompt używa 12 z nich w tej kolejności:

| Krok | Skill | Do czego |
|---|---|---|
| 1 | `geo-technical`, `geo-crawlers` | Czy Googlebot, Bingbot, GPTBot, OAI-SearchBot, PerplexityBot i Google-Extended widzą stronę (robots.txt, nagłówki, prerender) |
| 2 | `on-page-seo-auditor` | Stan wyjściowy: title, H1–H3, linki, obrazy, wynik punktowy |
| 3 | `ahrefs-automation`, `search-console` | Wolumeny i trudność fraz, dane z GSC, jeśli są dostępne |
| 4 | `seo-powerful-title`, `meta-description` | Title i meta description |
| 5 | `geo-citability` | Bloki odpowiedzi, które AI może zacytować |
| 6 | `geo-content` | E-E-A-T: autor, doświadczenie, dowody |
| 7 | `geo-schema` | JSON-LD (Service, FAQPage, BreadcrumbList, Person, Organization) |
| 8 | `geo-platform-optimizer` | Osobne wymagania Google AI Overviews, ChatGPT (indeks Bing), Perplexity, Gemini |
| 9 | `geo-llmstxt` | Wpis strony w `llms.txt` i `llms-full.txt` |

Pominąłem:
- `geo-audit`, `geo-audit-2` i `seo-audit-2`, bo audytują cały serwis, a tu chodzi o jedną stronę;
- `geo-report`, `geo-report-pdf` i `geo-proposal`, bo tworzą raporty dla klienta;
- `geo-brand-mentions`: przydatny, ale dotyczy całej marki, nie tej strony;
- `seo-geo-321job` (rynek USA, inna marka) i `gbp-optimization` (wizytówka Google, nie strona).

## Skąd są frazy

Frazy pochodzą z `KEYWORDS-AIO-ECOMMERCE.md` (badanie z 19.11.2026: wyniki Google dla Polski, 54 frazy plus fora). W tamtym badaniu **nie było wolumenów**, bo Ahrefs miał 0 jednostek. Krok 3 promptu każe je sprawdzić, zanim cokolwiek zmienisz.

---

## Prompt

```
Zoptymalizuj podstronę https://boostnow.pl/audyt-ai-dla-sklepu (repozytorium boostnow) pod Google oraz odpowiedzi AI: ChatGPT, Gemini, Perplexity i Google AI Overviews. Wdróż zmiany w kodzie, nie opisuj planu.

KONTEKST
- To landing page z formularzem. Cel strony: zgłoszenie sklepu do bezpłatnego audytu, potem rozmowa o płatnym wdrożeniu. SEO i GEO nie mogą osłabić konwersji.
- Pliki: client/src/pages/AiCommerceAuditPage.tsx, client/src/components/audit/* (cały tekst w auditCopy.ts), server/page-meta.ts (title, description, JSON-LD do prerenderu), scripts/prerender-site.ts, scripts/generate-sitemap.cjs, client/public/llms.txt, scripts/generate-llms-full.*.
- Strona jest prerenderowana do statycznego HTML (roboty bez JavaScriptu widzą treść). Hosting: Smarthost (Apache), za Cloudflare.
- Wcześniejsze badanie fraz: KEYWORDS-AIO-ECOMMERCE.md. Przeczytaj je przed startem.

ZASADY NADRZĘDNE (nie łam ich)
1. Żadnych zmyślonych liczb, statystyk, klientów ani wyników. Każda liczba musi mieć źródło w repozytorium (GA4, GSC, badanie) albo nie trafia na stronę. Wynik w karcie raportu zostaje oznaczony jako przykładowy.
2. Żadnych gwarancji („zagwarantujemy polecenia”, „AI wybierze Twój sklep”, „cytowania w 10 dni”). Używaj trybu warunkowego: „może”, „zwiększyć szansę”.
3. Jeden H1. Wariant A/B może zmienić tekst H1, ale nie dodaje drugiego.
4. Formularz zostaje w obecnym miejscu. Nowa treść nie może przesunąć pierwszego przycisku poza pierwszy ekran na 360 px.
5. Język prosty: jedna myśl w zdaniu, strona czynna, zwykłe słowa. Każdy termin (GEO, schema, feed) wyjaśnij przy pierwszym użyciu albo go nie używaj. Piszemy do właściciela sklepu, nie do marketera.
6. Nie dodawaj strony do głównej nawigacji.

KROK 1. STAN WYJŚCIOWY (skille: geo-technical, geo-crawlers, on-page-seo-auditor)
- Pobierz https://boostnow.pl/audyt-ai-dla-sklepu jako robot (bez JS) i jako przeglądarka. Porównaj treść.
- Sprawdź robots.txt i nagłówki dla: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot. Sprawdź też, czy Cloudflare nie blokuje botów AI (Bot Fight Mode, „Block AI bots”). Jeśli blokuje, opisz, gdzie to wyłączyć. Nie zmieniaj ustawień Cloudflare sam.
- Zapisz wynik on-page-seo-auditor jako punkt odniesienia (title, description, H1–H3, canonical, linki wewnętrzne, obrazy, liczba słów).

KROK 2. FRAZY (skille: ahrefs-automation, search-console)
Kandydaci z KEYWORDS-AIO-ECOMMERCE.md (język właściciela sklepu):
- Główna (intencja usługi): „audyt widoczności sklepu w odpowiedziach AI” / „audyt sklepu pod ChatGPT” / „darmowy audyt AI sklepu internetowego”.
- Problemowe (słaby top 10, do wzięcia): „jak sprawdzić czy ChatGPT poleca mój sklep”, „jak sprawdzić czy ChatGPT widzi mój sklep internetowy”, „ChatGPT nie widzi mojego sklepu”, „dlaczego ChatGPT nie poleca moich produktów”, „ChatGPT poleca konkurencję”.
- Uzupełniające: „optymalizacja kart produktów pod ChatGPT”, „sklep w ChatGPT”, „ChatGPT Shopping sklep”, warianty platform: „Shoper ChatGPT”, „WooCommerce ChatGPT”, „PrestaShop ChatGPT”, „IdoSell ChatGPT”.
Zadania:
- Jeśli Ahrefs ma jednostki: pobierz wolumen, KD i SERP dla Polski dla każdej frazy. Jeśli nie ma: zapisz „brak wolumenu” i oceniaj po SERP (Serply przez Composio, gl=pl, hl=pl).
- Jeśli GSC ma dane dla tej strony: pobierz zapytania i pozycje.
- Wybierz 1 frazę główną i 4–6 pobocznych. Uzasadnij wybór jednym zdaniem na frazę. Odrzuć frazy z silnym top 10 (lista „Nie warto teraz” w badaniu), chyba że dane mówią inaczej.
- Przypisz każdą frazę do miejsca: title, H1, H2, blok odpowiedzi, FAQ, alt, anchor linku. Zero upychania fraz: każda fraza naturalnie, najwyżej 1–2 razy.

KROK 3. TITLE I META (skille: seo-powerful-title, meta-description)
- Title do 60 znaków, fraza główna na początku, marka na końcu. Daj 3 warianty z oceną, wybierz 1.
- Meta description 140–155 znaków: problem, co dostaje właściciel, wezwanie do działania. Bez gwarancji.
- Zaktualizuj SEO w auditCopy.ts i wpis w server/page-meta.ts (muszą być identyczne). Dodaj og:image, jeśli istnieje pasująca grafika; nie twórz grafiki z fałszywymi danymi.

KROK 4. BLOKI DO CYTOWANIA PRZEZ AI (skille: geo-citability, geo-content)
Dodaj pod formularzem (nie nad nim) sekcję z 2–3 samodzielnymi blokami odpowiedzi. Każdy blok:
- zaczyna się bezpośrednią odpowiedzią w 1–2 zdaniach (wzór „X to…”, „Żeby sprawdzić X, …”);
- ma 130–170 słów i jest zrozumiały bez reszty strony (nazwa tematu w pierwszym zdaniu);
- zawiera konkret: kroki, nazwy narzędzi, nazwy platform; liczby tylko ze źródłem.
Proponowane bloki (dopasuj do fraz z kroku 2):
1. „Jak sprawdzić, czy ChatGPT poleca Twój sklep (test w 10 minut)”: 3–5 kroków z przykładowym pytaniem do ChatGPT, Gemini i Perplexity. To realny test, który właściciel zrobi sam. Na końcu: audyt robi to systematycznie i wskazuje przyczyny.
2. „Dlaczego AI może pomijać sklep”: przyczyny z sekcji zakresu (niekompletne dane produktów, brak informacji o dostawie i zwrotach, brak sygnałów zaufania, strona nieczytelna dla robotów). Link do artykułu /blog/chatgpt-nie-widzi-sklepu.
3. „Czym jest audyt gotowości sklepu na AI”: definicja, co obejmuje, czego nie obejmuje (nie gwarantuje polecenia).
E-E-A-T: podpis autora z linkiem do /mateusz-nowotka, data aktualizacji strony widoczna na stronie i w schema (dateModified). Jeden prawdziwy fakt doświadczenia tylko, jeśli jest zgoda klienta na nazwę; inaczej opis bez nazwy i bez liczb.

KROK 5. FAQ
- Zostaw 4 obecne pytania. Dodaj najwyżej 3 pytania z języka klienta z KEYWORDS-AIO-ECOMMERCE.md (sekcja „Język klienta z forów”), np. „Skąd wiem, czy ChatGPT poleca konkurencję zamiast mnie?”, „Czy audyt działa dla sklepu na Shoperze / WooCommerce?”.
- Odpowiedź: pierwsze zdanie samodzielnie odpowiada na pytanie, całość do 60 słów.
- FAQ w HTML musi być widoczne bez JS (prerender) i identyczne z FAQPage w JSON-LD.

KROK 6. DANE STRUKTURALNE (skill: geo-schema)
W server/page-meta.ts dla /audyt-ai-dla-sklepu zbuduj jeden @graph:
- Service (name, description, serviceType, provider → Organization BoostNow, areaServed: PL, offers: Offer z price 0 i priceCurrency PLN, bo audyt jest bezpłatny);
- FAQPage (z treści FAQ, generowane z auditCopy.ts, nie kopiowane ręcznie);
- WebPage (name, description, inLanguage pl-PL, datePublished, dateModified, author → Person Mateusz Nowotka, isPartOf → WebSite);
- BreadcrumbList (BoostNow → AIO dla e-commerce (/aio) → Audyt AI dla sklepu).
Zwaliduj JSON-LD (poprawny JSON, wymagane pola, brak sprzeczności z treścią). Nie dodawaj AggregateRating ani Review bez prawdziwych opinii.

KROK 7. PLATFORMY AI (skill: geo-platform-optimizer)
- Google AI Overviews i Gemini: bloki z kroku 4, schema, spójność z wizytówką Google i Knowledge Graph (nazwa, adres, strona).
- ChatGPT: korzysta z indeksu Bing. Sprawdź `site:boostnow.pl/audyt-ai-dla-sklepu` w Bing. Przygotuj zgłoszenie URL przez IndexNow (jeśli projekt ma klucz) albo instrukcję zgłoszenia w Bing Webmaster Tools dla właściciela.
- Perplexity: lubi źródła pierwotne. Dodaj na stronie jedną rzecz własną: opis metody audytu (co i jak sprawdzamy, ile pytań testowych, jakie narzędzia). To jest treść pierwotna bez zmyślonych liczb.
Dla każdej platformy wypisz wynik przed i po (skala skilla) i co jeszcze blokuje.

KROK 8. LINKOWANIE WEWNĘTRZNE
- Dodaj link do /audyt-ai-dla-sklepu z: /aio (sekcja z CTA), /aio-ecommerce, artykułu /blog/chatgpt-nie-widzi-sklepu i innych artykułów o ChatGPT i sklepach (znajdź je w client/src/data/blog). Anchory opisowe z fraz z kroku 2, różne w każdym miejscu.
- Artykuły pochodzą z Airtable. Jeśli link wymaga zmiany treści w Airtable, przygotuj zmianę i pokaż ją do akceptacji, zanim zapiszesz.
- Z landing page linkuj tylko pod formularzem (autor, artykuł, /aio). Nie dodawaj linków nad formularzem.

KROK 9. LLMS.TXT (skill: geo-llmstxt)
- Dodaj /audyt-ai-dla-sklepu do client/public/llms.txt z jednym zdaniem opisu (co dostaje właściciel sklepu, że audyt jest bezpłatny).
- Upewnij się, że generator llms-full.txt obejmuje tę stronę.

KROK 10. TECHNIKA I WYDAJNOŚĆ
- Sitemap: priorytet 0.8, lastmod = data zmiany treści.
- Core Web Vitals strony: LCP < 2,5 s, CLS < 0,1, INP < 200 ms na mobile (Lighthouse). Napraw tylko to, co dotyczy tej strony.
- Czcionki nagłówków muszą mieć fallback (font-heading), bez przeskoku układu.

KROK 11. WERYFIKACJA I ODDANIE
- Uruchom: npx tsc --noEmit, npx vitest run server/audit-landing.test.ts, pnpm build. Rozszerz testy: jeden H1, FAQ w HTML = FAQ w JSON-LD, title ≤ 60 znaków, description 140–155 znaków, brak słów „gwarant”, strona w llms.txt.
- Sprawdź prerender: dist/public/audyt-ai-dla-sklepu/index.html zawiera nowe bloki, FAQ i JSON-LD.
- Zrzuty ekranu 360 px i 1280 px. Pierwszy przycisk musi być na pierwszym ekranie telefonu.
- Commit na nowej gałęzi, push, PR do main. Nie scalaj bez mojej zgody.
- Raport dla mnie (po polsku, krótko):
  1. Wybrane frazy z uzasadnieniem i danymi (albo „brak wolumenu”).
  2. Tabela przed i po: wynik on-page, citability, schema, wynik platform AI.
  3. Lista zmian z plikami.
  4. Co muszę zrobić sam: Bing Webmaster Tools, Cloudflare, zgody klientów, Airtable.
  5. Jak mierzyć efekt: zapytania w GSC dla tej strony, ruch z AI w GA4 (grupa kanałów AI), ręczny test tych samych pytań w ChatGPT, Gemini i Perplexity co 2 tygodnie (zrzuty ekranu z datą).
```
