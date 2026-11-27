ChatGPT nie widzi Twojej strony? Zwykle winna jest jedna z pięciu przyczyn.

**Spis treści:**
- [Dlaczego ChatGPT nie widzi mojej strony?](#dlaczego)
- [5 przyczyn i jak je sprawdzić](#przyczyny)
- [Test w 10 minut](#test)
- [Co zrobić po naprawie?](#po-naprawie)
- [Najczęściej zadawane pytania](#faq)
- [Źródła](#zrodla)

---

> **Krótka odpowiedź**
> ChatGPT nie widzi strony, gdy robot OAI-SearchBot nie ma do niej dostępu albo nie znajduje na niej treści. Najczęstsze przyczyny to blokada w robots.txt i blokada na serwerze. Często winna jest też treść tylko w JavaScript, brak strony w wyszukiwarkach albo niejasny opis firmy. Każdą z nich sprawdzisz sam w kilka minut.
> *Aktualizacja: listopad 2026*

---

Strona działa. Klienci ją otwierają i dzwonią.

A ChatGPT pisze, że nie może jej otworzyć. Albo poleca konkurencję, choć robisz to samo.

Gdzie leży błąd? Zwykle w jednym z pięciu miejsc. Najtrudniejsze do znalezienia leży poza Twoją stroną: na serwerze.

Prowadzisz sklep? Przeczytaj też [wersję dla sklepów](/blog/chatgpt-nie-widzi-sklepu).

---

## Dlaczego ChatGPT nie widzi mojej strony? {#dlaczego}

ChatGPT widzi stronę dopiero wtedy, gdy może ją pobrać i przeczytać. Strony pobierają roboty OpenAI.

Za wyszukiwanie w ChatGPT odpowiada robot OAI-SearchBot. Link wklejony w rozmowie otwiera robot ChatGPT-User.

ChatGPT korzysta też z zewnętrznych wyszukiwarek. OpenAI pisze, że każda publiczna strona może pojawić się w wyszukiwaniu ChatGPT. Warunek: robot musi do niej dotrzeć i zrozumieć treść.

Błąd leży więc w jednym z trzech miejsc:
- dostęp: robot nie może wejść na stronę;
- treść: robot wchodzi, ale nie widzi tekstu;
- znaczenie: robot czyta tekst, ale nie wie, czym zajmuje się firma.

---

## 5 przyczyn i jak je sprawdzić {#przyczyny}

### 1. Plik robots.txt blokuje OAI-SearchBot

Plik robots.txt mówi robotom, gdzie mogą wejść. Otwórz `twojadomena.pl/robots.txt`.

Szukaj wpisu `User-agent: OAI-SearchBot` z `Disallow: /`. Szukaj też wpisu `User-agent: *` z `Disallow: /`, bo ten blokuje wszystkie roboty. Usuń blokadę dla OAI-SearchBot.

### 2. Serwer lub hosting blokuje roboty AI

Tej przyczyny nie widać w żadnym panelu. Plik robots.txt może wszystko dopuszczać, a serwer i tak odrzuca roboty.

**Sprawdziliśmy to na sobie.** 24 listopada 2026 serwer boostnow.pl zwracał kod 403 robotom GPTBot, PerplexityBot i ClaudeBot. Plik robots.txt je dopuszczał, a blokadę ustawił hosting.

Poproś informatyka, żeby pobrał stronę z nagłówkiem robota (narzędzie `curl` z opcją `-A`). Kod 403 oznacza blokadę.

Zapytaj też hosting i dostawcę CDN (np. Cloudflare), czy blokują boty AI.

### 3. Treść jest tylko w JavaScript

Niektóre strony pokazują tekst dopiero po uruchomieniu skryptów. Roboty AI często tych skryptów nie uruchamiają.

Naciśnij w przeglądarce Ctrl+U i poszukaj w kodzie zdania ze strony. Jeśli go nie ma, robot też go nie widzi.

### 4. Strony nie ma w wyszukiwarkach

ChatGPT korzysta z wyników zewnętrznych wyszukiwarek. Wpisz w Google i w Bing `site:twojadomena.pl`.

Nie widzisz swoich podstron? Dodaj stronę do Google Search Console i Bing Webmaster Tools. Sprawdź też, czy ważne podstrony nie mają znacznika `noindex`.

### 5. ChatGPT nie wie, czym zajmuje się firma

Strona może być dostępna, a mimo to niejasna. Brakuje jednego akapitu: kto, co, dla kogo, gdzie.

Brakuje też cen, obszaru działania i wzmianek w innych serwisach. Dopisz ten akapit na stronie głównej i w zakładce „O nas”.

---

## Test w 10 minut {#test}

Sześć kroków pokaże, w którym z trzech miejsc leży błąd.

1. Wklej w ChatGPT link do swojej strony i poproś: „Streść tę stronę w 3 zdaniach”. Brak streszczenia lub błąd to sygnał problemu z dostępem.
2. Otwórz `twojadomena.pl/robots.txt` i sprawdź wpisy z punktu 1.
3. Naciśnij Ctrl+U na stronie głównej i znajdź w kodzie opis firmy.
4. Wpisz w Bing `site:twojadomena.pl`.
5. Otwórz czat tymczasowy i zapytaj jak klient: „Polecasz firmę od [usługa] w [miasto]?”.
6. Zapisz wyniki ze zrzutami i datą.

---

## Co zrobić po naprawie? {#po-naprawie}

Po zdjęciu blokady roboty muszą wrócić na stronę. Nie przyspieszysz tego jednym kliknięciem. Pomagają trzy rzeczy:
- wyślij mapę strony w Google Search Console i Bing Webmaster Tools;
- dodaj nową treść lub zaktualizuj ważne podstrony;
- powtórz test z pytaniami klientów po 2–4 tygodniach.

ChatGPT czyta już stronę, ale dalej poleca konkurencję? Wtedy problem leży w treści i wzmiankach. Przeczytaj [jak pojawić się w ChatGPT w 6 krokach](/blog/jak-pojawic-sie-w-chatgpt).

---

## Najczęściej zadawane pytania {#faq}

**Dlaczego ChatGPT nie widzi mojej strony?**
Najczęściej robot OAI-SearchBot nie ma dostępu do strony albo nie widzi na niej treści. Sprawdź robots.txt, blokady serwera, kod strony (Ctrl+U) i obecność strony w wyszukiwarkach.

**Czy ChatGPT może otworzyć każdą stronę?**
Nie. Strona musi być publiczna, a roboty OpenAI muszą mieć do niej dostęp. Blokada w robots.txt, na serwerze lub w CDN zatrzymuje robota.

**Czy blokada GPTBota sprawia, że ChatGPT nie widzi strony?**
Nie. GPTBot zbiera dane do uczenia modeli. Wyszukiwanie w ChatGPT obsługuje OAI-SearchBot, a linki z rozmowy otwiera ChatGPT-User. Sprawdź blokady tych dwóch robotów.

**Ile czasu mija, zanim ChatGPT zobaczy stronę po naprawie?**
Nie ma stałego terminu. Wyślij mapę strony w Search Console i Bing Webmaster Tools. Powtórz test po 2–4 tygodniach.

**Czy hosting może blokować roboty AI bez mojej wiedzy?**
Tak. Niektóre serwery i usługi CDN blokują roboty AI domyślnie. Sprawdzisz to, pobierając stronę z nagłówkiem robota. Kod 403 oznacza blokadę.

---

## Źródła {#zrodla}

1. OpenAI. *Overview of OpenAI Crawlers.* https://platform.openai.com/docs/bots
2. OpenAI Help Center. *Publishers and Developers – FAQ.* https://help.openai.com/en/articles/12627856
3. OpenAI Help Center. *Searching the web with ChatGPT.* https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt
4. Bing Webmaster Tools. https://www.bing.com/webmasters

---

## Sprawdzimy, dlaczego ChatGPT nie widzi Twojej strony

Sprawdzimy dostęp robotów, treść w kodzie i to, kogo ChatGPT poleca zamiast Ciebie. Dostaniesz 3 rzeczy do poprawy.

**[Napisz do nas →](/kontakt)** · Prowadzisz sklep? **[Bezpłatny audyt sklepu pod ChatGPT i AI →](/audyt-ai-dla-sklepu)**

---

*Powiązane:*
*[Jak pojawić się w ChatGPT →](/blog/jak-pojawic-sie-w-chatgpt)*
*[ChatGPT nie widzi mojego sklepu? →](/blog/chatgpt-nie-widzi-sklepu)*
*[Jak pojawić się w Trybie AI Google →](/blog/jak-pojawic-sie-w-google-ai-mode)*
