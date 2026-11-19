# Plan treści AIO e-commerce (po artykule „ChatGPT nie widzi mojego sklepu”)

**Data:** 19.11.2026.

**Źródła decyzji:** `KEYWORDS-AIO-ECOMMERCE.md`, GA4 i Search Console (sprawdzone 19.11.2026).

---

## 0. Co pokazały dane przed planowaniem

**GA4 BoostNow (property 518185642) nie nadaje się do artykułu o październikowym spadku ruchu z ChatGPT.**

| Usługa GA4 | Sesje z AI (ChatGPT, Gemini, Perplexity, Copilot, Claude) | Okres | Uwagi |
|---|---|---|---|
| BoostNow | 0 | 1.01–18.11.2026 | Od lipca prawie brak danych (wyjaśnienie niżej) |
| Caruma | 9 (Gemini 7, ChatGPT 1, Perplexity 1) | 1.09–18.11.2026 | Za mało, żeby pokazać spadek 9–15.10 |
| SU-2 (sklep) | 0 | 1.09–18.11.2026 | **Cała usługa: 3 sesje w tym okresie.** Pomiar u klienta prawdopodobnie nie działa |
| RUD Studio | 0 | 1.09–18.11.2026 | |
| 321job.ai | 0 | 1.09–18.11.2026 | |

**GA4 BoostNow po miesiącach** (sesje na hoście boostnow.pl): kwiecień 556, maj 556, czerwiec 364, lipiec 15, sierpień 1, wrzesień 6, październik 7, listopad 31.

Jednocześnie Search Console pokazuje spadek wyświetleń z około 290 dziennie (koniec czerwca) do około 20 dziennie (połowa lipca). W lipcu spadła więc też prawdziwa widoczność. Nie da się stwierdzić, czy GA4 przestał mierzyć ruch, czy ruch zniknął naprawdę. Nie piszę tego w żadnym artykule.

**Do naprawy niezależnie od treści:**
1. **SU-2:** sprawdzić tag GA4 w sklepie, bo 3 sesje w 2,5 miesiąca to awaria pomiaru, a nie brak ruchu.
2. **GA4 BoostNow zbiera ruch z `localhost` i `127.0.0.1`:** m.in. 30 sesji w listopadzie, z testów i Lighthouse CI. Trzeba dodać filtr ruchu wewnętrznego albo filtr hosta.
3. **GA4 BoostNow:** dodać grupę kanałów „AI” (źródła chatgpt.com, gemini.google.com, perplexity.ai, copilot.microsoft.com, claude.ai). Bez niej ruch z AI ginie w „Referral” i „Direct”.

---

## 0a. Dane trzech serwisów: Search Console kontra GA4 (maj–15.11.2026)

Porównanie kliknięć z Google (Search Console) z sesjami „Organic Search” w GA4. Gdy pomiar działa, obie liczby idą razem. GA4 zwykle pokazuje trochę mniej, bo część osób nie zgadza się na cookies.

| Miesiąc | Caruma: kliknięcia GSC | Caruma: sesje organic GA4 | RUD Studio: kliknięcia GSC | RUD Studio: sesje organic GA4 | Kwiaciarnia Rose: kliknięcia GSC | Kwiaciarnia Rose: sesje GA4 (wszystkie) |
|---|---|---|---|---|---|---|
| maj | 185 | 106 | 83 | 37 | brak danych | 0 |
| czerwiec | 371 | 259 | 28 | 10 | brak danych | 0 |
| lipiec | 303 | 191 | 7 | 1 | brak danych | 0 |
| sierpień | 154 | 73 | 24 | 1 | brak danych | 0 |
| wrzesień | 138 | 77 | 31 | 0 | 3 | 0 |
| październik | 40 | 24 | 48 | 0 | 15 | 0 |
| 1–15 listopada | 13 | 9 | 40 | 0 | 5 | 0 |

**Trzy diagnozy:**
1. **Caruma: pomiar działa, ruch spadł naprawdę.** GA4 rejestruje 60–70% kliknięć z GSC przez cały okres. Spadek od sierpnia widać w obu źródłach. Wyświetlenia w GSC spadły z 91 322 (czerwiec) do 13 811 (październik).
2. **RUD Studio: ruch rośnie, pomiar nie działa.** Google przysłał 48 kliknięć w październiku i 40 w pierwszej połowie listopada. GA4 pokazuje 0 sesji z wyszukiwarki od września i 6–11 sesji miesięcznie ogółem. Pomiar przestał działać w czerwcu–lipcu.
3. **Kwiaciarnia Rose: brak pomiaru.** GSC ma 23 kliknięcia od września, a GA4 nie ma ani jednej sesji. Tag GA4 nie wysyła danych, albo nie jest zainstalowany.

**Ruch z AI w GA4 (maj–15.11.2026):**
- Caruma: 93 sesje (Gemini 47, ChatGPT 27, Perplexity 10, Claude 5, Copilot 4);
- RUD Studio: 2 sesje (ChatGPT), ale przy zepsutym pomiarze to liczba niewiarygodna;
- Kwiaciarnia Rose: brak pomiaru.

Wcześniejsza liczba „9 sesji z AI” dotyczyła tylko okresu 1.09–18.11 i nie obejmowała maja–sierpnia. Do artykułu używać danych za maj–listopad.

**Przed publikacją:** zgoda klientów (Caruma, RUD Studio) na pokazanie liczb z nazwą. Kwiaciarnia Rose to strona zbudowana przez BoostNow, więc zgoda jest prostsza, ale też trzeba ją mieć.

**Do naprawy u klientów (niezależnie od artykułu):** pomiar GA4 w RUD Studio i Kwiaciarni Rose, oraz w SU-2 (3 sesje w 2,5 miesiąca).

---

## 1. Artykuł o ruchu z ChatGPT w GA4: zmiana kąta

**Pierwotny plan:** „Ruch z ChatGPT zniknął w GA4? Co się zmieniło w październiku”, na danych GA4 BoostNow. **Nie do zrobienia uczciwie:** BoostNow nie ma ani jednej sesji z AI w 2026 roku.

**Propozycja:** „Ruch z ChatGPT w GA4: dlaczego go nie widzisz i jak go zmierzyć w 15 minut”.

- **Frazy:** „ruch z chatgpt zniknął ga4” (słaby top 10: 3 wyniki social/wideo, 0 silnych domen), „ruch z chatgpt w ga4”, „jak śledzić ruch z ChatGPT w Google Analytics 4”.
- **Własne dane (wyróżnik):** trzy serwisy z sekcji 0a jako trzy przypadki:
  - Caruma: pomiar działa, spadek jest prawdziwy;
  - RUD Studio: ruch rośnie, a GA4 pokazuje zero;
  - Kwiaciarnia Rose: GA4 nie mierzy nic.

  Do tego ruch z AI w Caruma: 93 sesje z 5 asystentów w 6,5 miesiąca, z czego 27 z ChatGPT. Nikt w top 10 nie ma takiego porównania na prawdziwych danych.
  - Konfiguracja krok po kroku: grupa kanałów AI, filtr localhost.
- **Fakt zewnętrzny:** przerwa w danych 9–15.10.2026. Część wizyt z ChatGPT trafiała wtedy do „Direct” (Delante, 2026). Sprawdzić u źródła przed publikacją.
- **Struktura:**
  1. dlaczego ruchu z ChatGPT nie widać w GA4 (brak referrera, „Direct”, przerwa październikowa, blokada tagu przez CSP lub cookies);
  2. test w 5 minut: raport Pozyskanie, filtr źródła;
  3. grupa kanałów AI krok po kroku, z regex do skopiowania;
  4. jak odróżnić spadek pomiaru od spadku ruchu: tabela GSC kontra GA4 dla 3 serwisów i prosta reguła (GA4 organic to zwykle 50–80% kliknięć z GSC; poniżej 20% oznacza problem z pomiarem);
  5. FAQ.
- **Przed pisaniem:** zrzuty ekranu z GA4 BoostNow po dodaniu grupy kanałów AI i filtra localhost (punkty 0.2 i 0.3).

---

## 2. Poradnik: feed produktowy ChatGPT Shopping dla Shopera

- **Fraza:** „feed produktowy chatgpt shoper” (słaby top 10: 3 wyniki social/wideo, 0 silnych domen, nikt nie pisze o Shoperze). Dodatkowo „chatgpt shopping shoper” i „jak dodać sklep shoper do chatgpt”.
- **Do sprawdzenia przed pisaniem (bez tego artykułu nie ma):**
  1. czy program OpenAI dla sprzedawców (chatgpt.com/merchants) przyjmuje sklepy z Polski i jakie pola feedu wymaga;
  2. czy Shoper ma eksport feedu XML lub CSV (np. pod Google Merchant Center, Ceneo) i czy da się go użyć jako źródła dla ChatGPT;
  3. czy w Shoper App Store jest aplikacja do ChatGPT Shopping;
  4. najlepiej: przejść cały proces na prawdziwym sklepie na Shoperze i zrobić zrzuty ekranu.
- **Struktura:** czy Shoper może być w ChatGPT Shopping → wymagane pola feedu (tabela: pole OpenAI, odpowiednik w Shoperze) → eksport krok po kroku → zgłoszenie w programie → częste błędy → FAQ.

## 3. Poradnik: feed produktowy ChatGPT Shopping dla WooCommerce

- **Fraza:** „woocommerce feed chatgpt” (cały top 10 po angielsku: webappick, syntropicsignal, wpbeginner, wisdmlabs). Polska wersja to luka.
- **Do sprawdzenia:**
  1. wymagania programu OpenAI (te same co w punkcie 2.1);
  2. wtyczki: CTX Feed (WebAppick), darmowa wtyczka WisdmLabs, wtyczki do Google Merchant Center z eksportem w formacie OpenAI. Każdą zainstalować i sprawdzić, nie opisywać z cudzych artykułów;
  3. prawdziwy sklep na WooCommerce do testu. Jeśli kwiaciarniarose.pl albo inny sklep klienta działa na WooCommerce, to gotowy przykład.
- **Struktura:** porównanie 3 sposobów (wtyczka, eksport z Merchant Center, ręczny plik) w tabeli → konfiguracja krok po kroku jedną wtyczką → zgłoszenie → FAQ.

Artykuły 2 i 3 to dwie osobne strony (jedna intencja na stronę), ale ze wspólną tabelą wymagań OpenAI i linkami do siebie nawzajem oraz do artykułu „ChatGPT nie widzi mojego sklepu”.

---

## 4. Strona /aio: sekcja „ChatGPT Shopping” i FAQ z forów

**Dziś na /aio:** hero, „Rynek zmienił się”, „Co robi BoostNow”, „Liczby mówią same”, „Dlaczego teraz”, „Dla kogo”, „3 kroki”, formularz, FAQ (5 pytań).

**Nowa sekcja** po „Co robi BoostNow”: „Jak trafić do rekomendacji ChatGPT Shopping”.
- Fraza: „jak trafić do rekomendacji w ChatGPT Shopping” (słaby top 10: Afterweb, Instagram, YouTube).
- Treść:
  - 3 warunki z dokumentacji OpenAI: dostęp robota OAI-SearchBot, dane produktu (cena, dostępność, opinie), feed w programie dla sprzedawców;
  - co robi BoostNow w każdym z nich;
  - link do artykułu „ChatGPT nie widzi mojego sklepu” i do poradników 2 i 3.

**FAQ: dopisać pytania z forów i wyników Google** (dosłowny język klienta):
1. Dlaczego ChatGPT poleca konkurencję, a nie mój sklep?
2. Jak sprawdzić, czy ChatGPT poleca mój sklep?
3. Czy mój sklep na Shoperze lub WooCommerce może być w ChatGPT Shopping?
4. Czy wyniki zakupowe w ChatGPT to reklamy?

Pytania muszą być widoczne na stronie i mieć schemat FAQPage z identyczną treścią.

**Do poprawy w obecnym FAQ /aio:** odpowiedź „Pierwsze cytowania … nawet w ciągu 10 dni” to niepotwierdzona obietnica. Zostawić tylko, jeśli jest przypadek z datami, który to pokazuje.

---

## 5. Kolejność

| Krok | Co | Zależy od |
|---|---|---|
| 1 | Sekcja ChatGPT Shopping + FAQ na /aio | Nic, można od razu |
| 2 | GA4 BoostNow: grupa kanałów AI + filtr localhost | Dostęp do GA4 (jest) |
| 3 | Artykuł o ruchu z ChatGPT w GA4 | Krok 2 (zrzuty ekranu) |
| 4 | Weryfikacja programu OpenAI dla sprzedawców w Polsce | Ręczne sprawdzenie (chatgpt.com/merchants) |
| 5 | Poradnik WooCommerce | Krok 4 + sklep testowy |
| 6 | Poradnik Shoper | Krok 4 + sklep na Shoperze |
| 7 | Pomiar w Search Console fraz z `KEYWORDS-AIO-ECOMMERCE.md` | 4–6 tygodni po publikacji |
