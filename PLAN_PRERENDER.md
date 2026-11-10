# Plan: treść w surowym HTML (naprawa C1 z GEO-AUDIT-REPORT.md)

Problem: `GET /blog/<slug>` zwraca shell (~5,6 KB, bez `<h1>`); treść pojawia się dopiero po JS. Boty bez JS dostają tylko head (title, description, canonical, JSON-LD) wstrzyknięty w `server/_core/vite.ts`.

## Opcja A (rekomendowana, najmniejsza zmiana): prerender przy buildzie
1. Po `vite build` uruchomić skrypt Playwright/Puppeteer, który dla każdego URL z `sitemap.xml` zapisuje wyrenderowany HTML do `dist/public/<path>/index.html`.
2. `serveStatic` serwuje ten plik zamiast shella (dla wszystkich UA, nie tylko botów, co usuwa ryzyko cloakingu).
3. Wstrzykiwanie meta zostaje jako zabezpieczenie dla tras bez prerenderu.
4. Trasy nieznane: prawdziwy 404 (dziś zrobione tylko dla `/blog/*` u botów).
Koszt: czas buildu rośnie z liczbą artykułów (52 stron); dane Airtable muszą być zsynchronizowane przed buildem.

## Opcja B: SSR (`react-dom/server`) dla `/blog/:slug`
Dokładniejsze, ale wymaga uporządkowania kodu klienta pod SSR (brak `window`/`document` przy renderze, dane artykułów dostępne na serwerze).

## Opcja C: serwerowe renderowanie treści artykułu dla botów
Wstawić `<h1>` + sekcje z `articles.json` do `<div id="root">` w `injectPageMeta`. Szybkie, ale zachowuje różnicę bot vs użytkownik (ryzyko cloakingu).

## Kroki wspólne
- Przed wdrożeniem: dane produkcyjne (52 artykuły) muszą być w repo, inaczej 404 dla botów trafi działające artykuły.
- Po wdrożeniu: sprawdzić `curl -A Googlebot` na 3 artykułach (liczba `<h1>`, jeden `<title>`, jeden canonical), zgłosić sitemapę w GSC, poprosić o indeksację 3 kluczowych URL-i.
