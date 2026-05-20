# 🚀 BoostNow Elite CMS: Instrukcja Obsługi

Witaj w systemie zarządzania treścią BoostNow. Ten system został zaprojektowany, aby osiągać wyniki **90+/100 punktów** w audytach SEO i GEO (Generative Engine Optimization).

---

## 🏗️ Struktura Systemu (Zależności)

System opiera się na trzech głównych tabelach w Airtable, które współpracują ze sobą:

1.  **`Pages` (Adresy Stron):** Tu definiujesz "byt" strony (np. Strona Główna, Kontakt, Case Studies).
2.  **`Page_Sections` (Zawartość):** Tu tworzysz konkretne bloki treści (Hero, FAQ, Tekst). Każda sekcja **musi być połączona** z rekordem w tabeli `Pages`.
3.  **`Prospects` (CRM):** Twoje narzędzie do zarządzania klientami i śledzenia ich wyników GEO.

---

## 📝 Krok 1: Tworzenie Nowej Strony

1.  Otwórz tabelę **`Pages`**.
2.  Dodaj nowy rekord:
    *   **Slug:** To końcówka adresu URL (np. `o-nas`, `oferta-geo`). *Ważne: używaj małych liter i myślników.*
    *   **PageName:** Nazwa wewnętrzna strony.
    *   **Status:** Ustaw na `Published`, aby strona była widoczna.
    *   **SEO_Title & SEO_Desc:** Wypełnij zgodnie z zasadami SEO (słowa kluczowe na początku).
    *   **Pola Elite GEO:** Wypełnij dane autora i metodologię, aby boty AI (ChatGPT) uznały Cię za autorytet.

---

## 🧱 Krok 2: Dodawanie Treści (Sekcji)

Strona bez sekcji jest pusta. Aby dodać treść:

1.  Otwórz tabelę **`Page_Sections`**.
2.  Dodaj nowy rekord:
    *   **Title:** Nagłówek sekcji.
    *   **Section_Type:** Wybierz typ (np. `Hero` dla góry strony, `FAQ` dla pytań).
    *   **Content:** Główna treść sekcji.
    *   **Page (KLUCZOWE):** Kliknij i wybierz stronę z tabeli `Pages`, na której ta sekcja ma się pojawić.
    *   **Order:** Wpisz numer (1, 2, 3...), aby ustalić kolejność od góry do dołu.

---

## 🛡️ Krok 3: Optymalizacja pod AI (GEO Elite)

Aby Twoja treść była cytowana przez AI, w tabeli `Page_Sections` wypełnij:

*   **HTML_Tag:** Wybierz `H1` dla najważniejszego tytułu, `H2` dla pozostałych.
*   **GEO_Citability_Mode:** Zaznacz (checked), aby boty AI wiedziały, że to ważny fragment.
*   **Statistical_Data:** Wpisz konkretne liczby (np. "Wzrost o 40%"). AI uwielbia fakty!
*   **Image_Alt:** Opisz, co jest na zdjęciu, używając słów kluczowych.

---

## 📈 Krok 4: Zarządzanie Klientami (Prospects)

1.  Otwórz tabelę **`Prospects`**.
2.  Wpisuj tu potencjalnych klientów.
3.  Używaj pola **`GEO_Score`**, aby ocenić ich obecną widoczność w AI (możesz to sprawdzić w ChatGPT/Perplexity).
4.  Śledź statusy od `Lead` do `Won`.

---

## 🔄 Jak odświeżyć stronę?

System synchronizuje się automatycznie co kilka minut. Jeśli chcesz wymusić zmiany natychmiast:
1.  Upewnij się, że wszystkie rekordy mają status `Published`.
2.  Odśwież stronę `boostnow.pl` w przeglądarce po ok. 2-3 minutach.

---

### 💡 Pro-Tip dla Copywritera:
Zawsze staraj się, aby każda sekcja była "samowystarczalna". Boty AI często wycinają fragmenty tekstu – jeśli fragment zawiera Twoją markę, słowo kluczowe i statystykę, masz 90% szans na cytowanie!
