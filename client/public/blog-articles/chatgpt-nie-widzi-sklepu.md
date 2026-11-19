Twój klient pyta ChatGPT o produkt. ChatGPT poleca sklep konkurencji.

**W tym artykule:**
- [Dlaczego ChatGPT nie widzi mojego sklepu?](#dlaczego)
- [Jak ChatGPT wybiera sklepy, które poleca?](#jak-wybiera)
- [Jak sprawdzić w 10 minut, czy ChatGPT poleca mój sklep?](#test)
- [Która przyczyna dotyczy mojego sklepu?](#przyczyny)
- [Co zrobić, gdy ChatGPT poleca konkurencję?](#co-zrobic)
- [Najczęściej zadawane pytania](#faq)
- [Źródła](#zrodla)

---

> **BEZPOŚREDNIA ODPOWIEDŹ**
> ChatGPT nie widzi sklepu, gdy jego robot nie wchodzi na stronę. Druga możliwość: robot wchodzi, ale nie znajduje danych produktu. Robot wyszukiwarki ChatGPT nazywa się OAI-SearchBot. Blokada w pliku robots.txt lub w zaporze zatrzymuje go przed sklepem. Częsta przyczyna to treść, która ładuje się tylko przez JavaScript. Wtedy robot widzi pustą stronę bez nazwy, ceny i opisu.
> *Zaktualizowano: listopad 2026*

---

ChatGPT wybiera produkty na podstawie danych: ceny, opisu, opinii i dostępności (OpenAI Help Center, 2026). Te dane musi najpierw odczytać robot OAI-SearchBot. Robot czyta stronę bez uruchamiania aplikacji w przeglądarce. **Dlatego sklep, który wygląda dobrze dla klienta, może być pusty dla ChatGPT.** BoostNow miał ten problem na własnej stronie. Do 18 listopada 2026 roku roboty bez JavaScriptu widziały jeden pusty szablon. Ten szablon był na wszystkich 71 adresach z mapy strony. Ahrefs pokazał wtedy 70 stron bez żadnego linku. Po zmianie każdy adres ma własną treść w kodzie HTML.

## Dlaczego ChatGPT nie widzi mojego sklepu? {#dlaczego}

ChatGPT nie widzi sklepu z jednego z dwóch powodów: robot nie wchodzi albo nic nie odczytuje. OpenAI używa kilku robotów. Każdy ma inne zadanie (OpenAI, dokumentacja robotów).

- **OAI-SearchBot** szuka stron do odpowiedzi w ChatGPT. Ten robot decyduje o widoczności sklepu.
- **GPTBot** zbiera teksty do uczenia modeli. Blokada GPTBota nie usuwa sklepu z wyszukiwania w ChatGPT.
- **ChatGPT-User** otwiera stronę, gdy użytkownik o to poprosi w rozmowie.

Wiele sklepów blokuje roboty AI bez wiedzy właściciela. Blokadę ustawia wtyczka, firma hostingowa albo zapora sieciowa. Na przykład zapory takie jak Cloudflare mają przełącznik do blokowania botów AI. Ponadto część sklepów ładuje opis i cenę dopiero po uruchomieniu JavaScriptu. Robot dostaje wtedy szablon bez produktu.

Sklep, który wpuszcza OAI-SearchBot, może trafić do odpowiedzi. Sklep, który go blokuje, nie trafi tam wcale.

## Jak ChatGPT wybiera sklepy, które poleca? {#jak-wybiera}

ChatGPT wybiera sklepy na podstawie dopasowania produktu do pytania i danych o ofercie. OpenAI opisuje to w centrum pomocy (OpenAI Help Center, 2026). Wyniki zakupowe nie są reklamami. OpenAI pokazuje reklamy osobno i je oznacza.

ChatGPT ocenia produkt w trzech krokach:

1. **Dopasowanie.** ChatGPT sprawdza, czy produkt odpowiada na pytanie klienta.
2. **Dane produktu.** ChatGPT czyta cenę, opis, opinie i parametry. Te dane pochodzą od sklepów i z innych serwisów.
3. **Wybór sprzedawcy.** Gdy klient otworzy produkt, ChatGPT układa sklepy według dostępności, ceny i jakości. Wyżej stoi też producent lub główny sprzedawca.

W efekcie wygrywa sklep z pełnymi danymi, a nie sklep z najładniejszą stroną. Konkurent z ceną i dostępnością w kodzie strony ma przewagę nad sklepem z samymi zdjęciami. Prosty przykład: ChatGPT działa jak sprzedawca w hurtowni z listą towarów. Produktu bez ceny i stanu magazynowego na tej liście nie poleci, nawet jeśli leży na półce.

## Jak sprawdzić w 10 minut, czy ChatGPT poleca mój sklep? {#test}

Test widoczności sklepu w ChatGPT ma pięć kroków. Każdy krok zajmuje około dwóch minut.

1. **Zadaj pytanie jak klient.** Otwórz nowy, tymczasowy czat z włączonym wyszukiwaniem. Wpisz: „Polecasz sklep z [Twoja kategoria] w Polsce?”. Nie pytaj o nazwę sklepu. Klient też jej nie zna.
2. **Sprawdź robots.txt.** Wpisz w przeglądarce: twojadomena.pl/robots.txt. Szukaj linii „OAI-SearchBot” z „Disallow”. Szukaj też „User-agent: *” z „Disallow: /”.
3. **Zobacz stronę oczami robota.** Otwórz kartę produktu. Naciśnij Ctrl+U, żeby zobaczyć kod źródłowy. Wyszukaj w nim nazwę i cenę produktu. Brak nazwy i ceny oznacza treść ładowaną przez JavaScript.
4. **Sprawdź dane produktu.** Wklej adres karty produktu do testu wyników z elementami rozszerzonymi Google. Test powinien pokazać typ „Product” z ceną i dostępnością.
5. **Sprawdź ruch w GA4.** W raporcie pozyskania wpisz w filtrze źródła „chatgpt”. Pamiętaj o przerwie w danych z 9–15 października 2026 roku. W tym czasie GA4 liczył część wizyt z ChatGPT jako ruch bezpośredni (Delante, 2026).

Wynik testu wskazuje przyczynę. Tabela w następnej sekcji łączy objaw z naprawą.

## Która przyczyna dotyczy mojego sklepu? {#przyczyny}

Przyczyna braku sklepu w ChatGPT wynika z objawu w teście. Tabela łączy sześć przyczyn z kontrolą i naprawą.

| Przyczyna | Jak ją rozpoznać | Co zrobić |
|---|---|---|
| Blokada OAI-SearchBot w robots.txt | Linia „Disallow” dla OAI-SearchBot lub dla wszystkich robotów | Dodaj „User-agent: OAI-SearchBot” i „Allow: /” |
| Blokada w zaporze lub u hostingu | robots.txt jest poprawny, a sklepu nadal nie ma w odpowiedziach | Wyłącz blokadę botów AI dla OAI-SearchBot w panelu zapory |
| Treść ładowana przez JavaScript | Brak nazwy i ceny w kodzie źródłowym (Ctrl+U) | Włącz renderowanie po stronie serwera lub prerender kart produktów |
| Brak danych strukturalnych Product | Test Google nie pokazuje typu „Product” | Dodaj cenę, dostępność, markę i opinie w schemacie Product |
| Brak pliku z danymi produktów dla ChatGPT | Sklep nie ma zgłoszenia w programie OpenAI dla sprzedawców | Zgłoś sklep na chatgpt.com/merchants i udostępnij plik produktów |
| Brak wzmianek poza własną stroną | ChatGPT poleca sklepy z rankingów i porównań | Zbieraj opinie i zdobywaj miejsca w rankingach branżowych |

Najczęściej działa kolejność: najpierw dostęp robota, potem dane produktu, na końcu wzmianki.

## Co zrobić, gdy ChatGPT poleca konkurencję? {#co-zrobic}

ChatGPT poleca konkurencję, gdy konkurencja ma lepsze dane albo więcej wzmianek. Naprawa ma trzy kroki.

1. **Otwórz drogę robotowi.** Wpuść OAI-SearchBot w robots.txt i w zaporze. Sprawdź, czy kod karty produktu zawiera nazwę, cenę i opis.
2. **Uzupełnij dane produktu.** Dodaj schemat Product z ceną, dostępnością i opiniami. Opisz zastosowanie produktu zwykłymi słowami klienta.
3. **Zbuduj wzmianki.** Zbieraj opinie w serwisach zewnętrznych. Zgłoś sklep do rankingów i porównań w swojej branży.

BoostNow robi ten audyt dla sklepów internetowych. Sprawdzamy dostęp robotów, dane produktów i odpowiedzi ChatGPT w Twojej kategorii.

→ [Zamów bezpłatny audyt widoczności sklepu w AI](https://boostnow.pl/aio)

## Najczęściej zadawane pytania {#faq}

**Dlaczego ChatGPT nie widzi mojej strony?**
ChatGPT nie widzi strony, gdy blokujesz robota OAI-SearchBot albo strona nie ma treści w kodzie HTML. Sprawdź robots.txt i kod źródłowy strony (Ctrl+U). → [Jak pojawić się w ChatGPT](https://boostnow.pl/blog/jak-pojawic-sie-w-chatgpt)

**Dlaczego ChatGPT nie poleca moich produktów?**
ChatGPT nie poleca produktów, gdy nie zna ich ceny, dostępności i opinii. Dodaj schemat Product i zgłoś sklep w programie OpenAI dla sprzedawców. → [SEO dla sklepu internetowego](https://boostnow.pl/blog/seo-dla-sklepu-internetowego)

**Jak sprawdzić, czy ChatGPT poleca mój sklep?**
Zadaj w tymczasowym czacie pytanie klienta: „Polecasz sklep z [kategoria] w Polsce?”. Powtórz pytanie kilka razy, bo odpowiedzi ChatGPT się zmieniają. → [Pozycjonowanie w AI](https://boostnow.pl/blog/pozycjonowanie-w-ai)

**Czy blokada GPTBota usuwa sklep z ChatGPT?**
Nie. GPTBot zbiera dane do uczenia modeli, a wyszukiwanie w ChatGPT obsługuje OAI-SearchBot. Możesz zablokować GPTBota i nadal być widoczny w ChatGPT. → [llms.txt: co to jest](https://boostnow.pl/blog/llms-txt)

**Czy wyniki zakupowe w ChatGPT to reklamy?**
Nie. OpenAI wybiera wyniki zakupowe niezależnie od reklam. Reklamy w ChatGPT są osobne i oznaczone. → [Bezpłatny audyt sklepu](https://boostnow.pl/aio)

## Źródła {#zrodla}

1. OpenAI (2026). *Overview of OpenAI Crawlers.* https://developers.openai.com/api/docs/bots
2. OpenAI Help Center (2026). *Shopping with ChatGPT Search.* https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search
3. OpenAI Help Center (2026). *Searching the web with ChatGPT.* https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt
4. ChatGPT (2026). *Lepsze znajdowanie produktów w ChatGPT* (program dla sprzedawców). https://chatgpt.com/pl-PL/merchants/
5. Delante (2026). *Zmiany w ChatGPT powodują spadek ruchu z AI rejestrowanego przez GA4.* https://delante.pl/zmiany-w-chatgpt-powoduja-spadek-ruchu-z-ai-rejestrowanego-przez-ga4/
6. Google Search Central. *Dane strukturalne produktu (Product).* https://developers.google.com/search/docs/appearance/structured-data/product

---

## Sprawdź sklep, zanim klient wybierze konkurencję

**Każde pytanie klienta w ChatGPT bez Twojego sklepu w odpowiedzi to sprzedaż u konkurenta.**

W bezpłatnym audycie BoostNow sprawdzi:
- ✓ czy roboty ChatGPT wchodzą do Twojego sklepu,
- ✓ czy karty produktów pokazują robotom cenę, opis i dostępność,
- ✓ które sklepy ChatGPT poleca w Twojej kategorii i dlaczego.

**[ZAMÓW BEZPŁATNY AUDYT SKLEPU →](https://boostnow.pl/aio)**
Jedna rozmowa. Lista konkretnych poprawek. Bez zobowiązań.

---

*Powiązane artykuły:*
*[Jak pojawić się w ChatGPT: praktyczny test dla firmy →](https://boostnow.pl/blog/jak-pojawic-sie-w-chatgpt)*
*[SEO dla sklepu internetowego →](https://boostnow.pl/blog/seo-dla-sklepu-internetowego)*
*[Pozycjonowanie w AI: co musi wiedzieć Twoja firma →](https://boostnow.pl/blog/pozycjonowanie-w-ai)*