---
name: artykul-ux
description: Reader-experience standard for every BoostNow article and landing copy (Polish). Use together with seo-geo-aeo-master whenever writing, rewriting or reviewing a blog article, guide or page text for boostnow.pl. Covers hook and SCQA intro, slippery-slide structure, plain language, classic style, syntax for working memory, 4Cs edit and the article-lint script.
---

# Standard artykułu BoostNow: SEO + GEO + doświadczenie czytelnika

Każdy artykuł ma trzy zadania naraz:
1. rankować w Google (SEO);
2. dawać fragmenty do cytowania przez AI (GEO/AEO);
3. prowadzić czytelnika od pierwszego do ostatniego zdania (UX).

Żadne z nich nie jest opcjonalne. Ten skill opisuje punkt 3. Punkty 1 i 2 opisuje `seo-geo-aeo-master`.

---

## 1. Kolejność pracy

1. **Głos klienta przed pisaniem.** Zbierz słowa, których używa klient: zapytania z Search Console, pytania z forów i grup, notatki z rozmów. Nagłówki i haki budujesz z tych słów, a nie z żargonu branży.
2. **Napisz szkic** według sekcji 2–5.
3. **Uruchom lint:** `node scripts/article-lint.mjs drafts/<slug>.md`. Błędy muszą zniknąć. Uwagi poprawiasz albo uzasadniasz.
4. **Edycja 4C** (sekcja 6): skróć tekst o 20–40% bez utraty treści.
5. **Lista kontrolna** (sekcja 8) przed publikacją.

---

## 2. Otwarcie: hak + SCQA, bez streszczania

**Pierwsze zdanie** ma jedno zadanie: sprawić, że czytelnik przeczyta drugie.
- Maksymalnie 15 słów.
- Luka informacyjna: pokaż, że istnieje odpowiedź albo zjawisko, którego czytelnik jeszcze nie zna.
- Hak to obietnica oparta na prawdzie. Artykuł musi ją spełnić w całości. Przesada lub kłamstwo to clickbait i jest zakazane.

**Akapit otwierający** w układzie SCQA, 3–5 krótkich zdań:
- **Sytuacja:** co czytelnik robi lub widzi dziś.
- **Komplikacja:** co mu przeszkadza albo co traci.
- **Pytanie:** jedno pytanie, które z tego wynika.
- **Odpowiedź:** krótka zapowiedź odpowiedzi.

Zamiast SCQA możesz użyć przełamania wzorca (teza → antyteza → synteza). Zacznij od popularnego przekonania, obal je dowodem, podaj nowy punkt widzenia. Dowód musi być prawdziwy i mieć źródło.

**Konflikt z GEO i jak go rozwiązać:** AI potrzebuje odpowiedzi od razu, a hak buduje ciekawość. Rozwiązanie:
- ramka „Krótka odpowiedź” daje pełną odpowiedź (40–70 słów, maksymalnie 5 zdań) dla AI i dla czytelnika, który się spieszy;
- ciekawość budujesz wokół **szczegółu, przykładu albo pułapki**, a nie wokół samej odpowiedzi. Przykład: „Jedna przeszkoda nie jest widoczna w żadnym panelu. Znaleźliśmy ją na własnej stronie.”

---

## 3. Efekt ślizgawki: czytelnik nie ma gdzie wypaść

- **Akapity: 1–3 zdania.** Ściana tekstu to sygnał „to będzie trudne”.
- **Nagłówki H2 w formie pytań** z języka klienta. Każda sekcja zaczyna się zdaniem, które samo odpowiada na pytanie z nagłówka (to wymóg GEO i UX jednocześnie).
- **Mosty uwagi:** krótka linijka na końcu akapitu, która ciągnie w dół. Maksymalnie 1 na sekcję. Nigdy wewnątrz ramki odpowiedzi ani odpowiedzi FAQ, bo te fragmenty muszą być samodzielne dla AI. Przykłady:
  - „Tu zaczyna się problem.”
  - „Dlaczego to ważne?”
  - „Jest jeden wyjątek.”
  - „Sprawdziliśmy to na sobie.”
- **Rama narracyjna dla całego tekstu** (wybierz jedną):
  - **PAS** (problem → skutki → rozwiązanie) dla artykułów o błędach i przyczynach;
  - **BAB** (przed → po → most) dla artykułów o zmianie i wynikach;
  - **4P** (obietnica → obraz korzyści → dowód → wezwanie) dla stron usług.
- **Formatowanie pomaga oku:** pogrubienie 1 kluczowej frazy w sekcji, listy dla kroków, tabela dla porównań.

---

## 4. Prosty język i klątwa wiedzy

Prostota nie spłyca tematu. Tekst, który czyta się łatwo, wydaje się czytelnikowi bardziej wiarygodny.

- **Jedna myśl w zdaniu.** Instrukcje: maksymalnie 20 słów. Proza: maksymalnie 10% zdań dłuższych niż 20 słów.
- **Strona czynna:** „Hosting blokuje robota”, a nie „Robot jest blokowany przez hosting”. Strona bierna tylko wtedy, gdy obiekt jest bohaterem wątku.
- **Proste, popularne słowa.** Każdy termin branżowy wyjaśnij przy pierwszym użyciu albo go usuń.
- **Rozpakuj skróty myślowe eksperta.** Zamiast „optymalizacja encji” napisz, co dokładnie robisz: „dopisz nazwę firmy, adres i telefon do kodu strony”.
- **Bez języka wewnętrznego.** Nazywaj rzeczy tak, jak widzi je klient. Pisz „ile osób weszło na stronę z ChatGPT”, a nie „ruch z kanału AI referral”.
- **Metapojęcia zamień na rzeczy.** „Proces”, „mechanizm”, „podejście”, „aspekt”, „kwestia” zastąp konkretnym obiektem albo działaniem.

---

## 5. Styl klasyczny i składnia dla pamięci roboczej

- **Proza jak szyba:** czytelnik ma widzieć rzecz, a nie autora. Bez popisów, bez pokazywania drogi dojścia.
- **Bez metadyskursu:** nie pisz „w tym artykule pokażę”, „poniżej znajdziesz”, „w następnej sekcji”. Zadaj pytanie albo od razu podaj treść. Spis treści podpisuj „Spis treści”.
- **Bez asekuracji:** usuń „stosunkowo”, „do pewnego stopnia”, „można by”, „wydaje się”. Gdy coś jest niepewne, powiedz dokładnie, czego nie wiesz i dlaczego.
- **Żywe czasowniki zamiast rzeczowników:** „sprawdź” zamiast „dokonaj weryfikacji”, „zablokuj” zamiast „wprowadź blokadę”.
- **Bez stosów określeń:** zamiast „techniczny audyt widoczności sklepu w AI” napisz „audyt: czy AI widzi Twój sklep”.
- **Bez zagnieżdżeń:** nie wkładaj długiego wtrącenia w środek zdania.
- **Znane → nowe:** zaczynaj zdanie od tego, co czytelnik zna z poprzedniego zdania. Nową, najważniejszą informację dawaj na koniec zdania.
- **Ktoś robi coś:** wykonawca + czynność. „Google czyta stronę”, a nie „Następuje odczyt strony”.
- **Najpierw szeroki kadr, potem szczegół.**

---

## 6. Edycja 4C (przed publikacją)

1. **Jasny:** brak luk w rozumowaniu. Każdy krok wynika z poprzedniego.
2. **Zwięzły:** usuń przymiotniki bez treści, powtórzenia i dygresje. Cel: minus 20–40% słów przy tej samej treści. Nie tnij danych, kroków ani przykładów.
3. **Trafiający w czytelnika:** słowa i przykłady z głosu klienta (sekcja 1).
4. **Wiarygodny:** każda liczba ma źródło. Dane własne (GA4, Search Console, testy) mają datę i opis metody. Bez źródła liczba nie trafia do tekstu.

**Uwaga do teorii copywritingu:** popularne materiały podają liczby typu „95% interakcji to System 1”. Nie cytuj ich w artykułach bez pierwotnego źródła. Zasady stosujemy, liczby z takich materiałów nie są dowodem.

---

## 7. Zakończenie

- Jedno wezwanie do działania, związane z problemem z artykułu (np. audyt, kontakt).
- Bez sztucznej presji i fałszywych terminów.
- Linki do 2–3 powiązanych artykułów z serii.

---

## 8. Lista kontrolna przed publikacją

- [ ] Lint bez błędów: `node scripts/article-lint.mjs drafts/<slug>.md`
- [ ] Hak do 15 słów, prawdziwy, z luką informacyjną.
- [ ] Wstęp w SCQA albo teza → antyteza → synteza.
- [ ] Ramka „Krótka odpowiedź”: 40–70 słów, samodzielna.
- [ ] Każda sekcja H2 zaczyna się zdaniem, które odpowiada na nagłówek.
- [ ] Akapity 1–3 zdania. Maksymalnie 1 most uwagi na sekcję.
- [ ] Brak metadyskursu i asekuracji.
- [ ] Brak martwych czasowników i metapojęć bez konkretu.
- [ ] Znane → nowe w kolejnych zdaniach.
- [ ] Każda liczba ma źródło i datę.
- [ ] Jedno wezwanie do działania.
- [ ] FAQ w treści = FAQ w JSON-LD.
