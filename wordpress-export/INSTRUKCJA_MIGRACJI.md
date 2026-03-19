# Instrukcja Migracji BoostNow na WordPress

## Krok 1: Zainstaluj WordPress na Home.pl

1. Zaloguj się do panelu Home.pl
2. Przejdź do "Aplikacje" → "Zainstaluj WordPress"
3. Wybierz domenę: **boostnow.pl**
4. Kliknij "Zainstaluj"
5. Czekaj 5-10 minut na instalację

## Krok 2: Zainstaluj Pluginy

1. Zaloguj się do WordPress Dashboard (admin)
2. Przejdź do "Wtyczki" → "Dodaj nową"
3. Szukaj i zainstaluj:
   - **All-in-One WP Migration** (free)
   - **Neve** lub **Astra** theme (free)

## Krok 3: Importuj Artykuły

1. W WordPress: "Narzędzia" → "Importuj"
2. Zainstaluj "WordPress Importer"
3. Wgraj plik: `articles.csv`
4. Mapuj autorów i kategorie
5. Kliknij "Importuj"

## Krok 4: Importuj Stronę Główną

1. Zainstaluj **Elementor** (free)
2. Otwórz `homepage.html` w edytorze tekstu
3. Skopiuj HTML
4. W WordPress: "Strony" → "Dodaj nową"
5. Przejdź do Elementora → "Kod HTML"
6. Wklej HTML i opublikuj

## Krok 5: Zmień DNS

1. W Home.pl: "Domeny" → "boostnow.pl"
2. Zmień DNS na serwer Home.pl
3. Czekaj 24-48h na propagację

## Krok 6: Edytuj Blog

- Otwórz WordPress Dashboard
- "Posty" → Edytuj artykuł
- Używaj Gutenberga lub Elementora
- Publikuj - gotowe!

---

**Pliki w tym folderze:**
- `homepage.html` - Strona główna (HTML)
- `blog-articles/` - 50 artykułów (Markdown)
- `articles.csv` - Artykuły do importu (CSV)

**Potrzebujesz pomocy?** Skontaktuj się z supportem Home.pl
