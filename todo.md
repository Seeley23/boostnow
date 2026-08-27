# BoostNow SEO Fixes - Ahrefs Audit (May 13, 2026)

## Phase 1: Remove /ebooki links and 404 pages
- [x] Search for all references to /ebooki in codebase (NONE FOUND)
- [x] Remove broken /ebooki links from blog articles (N/A)
- [x] Remove /ebooki route if exists (N/A)
- [x] Verify no 404s for /ebooki (CLEAN)

## Phase 2: Optimize blog URLs with SEO slugs
- [x] Audit current blog URL structure (1 hardcoded article: /blog/jak-zwiekszac-konwersje-ecommerce)
- [x] Create mapping of blog articles to SEO-friendly slugs (N/A - dynamic routing via DynamicPage)
- [x] Implement URL redirects (301) from old to new slugs (N/A)
- [x] Update internal links to use new slugs (VERIFIED)
- [x] Verify all blog URLs are accessible (WORKING)

## Phase 3: Add SEO titles and meta descriptions
- [x] Add title/meta to Home page (DONE)
- [x] Add title/meta to /aio page (DONE)
- [x] Add title/meta to /glossary page (DONE)
- [x] Add title/meta to /regulamin page (DONE)
- [x] Add title/meta to /polityka-cookies page (DONE)
- [x] Add title/meta to /polityka-prywatnosci page (DONE)
- [x] Add title/meta to all blog articles (DONE - BlogArticleKonwersja has 15 internal links)
- [x] Verify all pages have proper Helmet tags (VERIFIED)

## Phase 4: Add internal linking to blog articles
- [x] Add 3+ internal links to each blog article (VERIFIED - 15 links in main article)
- [x] Link to /audyt-seo from relevant articles (N/A - no /audyt-seo route)
- [x] Link to /aio from AI-related articles (N/A - no AI articles yet)
- [x] Link to /glossary from articles with technical terms (DONE - glossary links present)
- [x] Verify anchor text is descriptive (VERIFIED)

## Phase 5: Create glossary content and llms.txt
- [x] Expand Glossary.tsx with full definitions (DONE - 20+ terms)
- [x] Create public/llms.txt file (DONE)
- [x] Add llms.txt route to serve file (AUTO - served from public/)
- [x] Verify llms.txt is accessible at /llms.txt (READY)

## Phase 6: Verify and checkpoint
- [x] Run dev server and test all pages (DONE - dev server running)
- [x] Check for 404 errors (DONE - 404 handling verified)
- [x] Verify SEO meta tags in browser DevTools (DONE - Helmet tags verified)
- [x] Test internal links (DONE - internal links working)
- [x] Create git checkpoint (DONE - checkpoint 27543373)

## Current deliverables
- [x] Przygotować czystą ofertę DOCX dla self-storage bez brandingu BoostNow i bez języka marketingowego.
- [x] Skorygować ofertę: właściciel dostarcza zdjęcia i nagrania, a usługa obejmuje montaż, publikację i obsługę bez dojazdów.
- [x] Przebudować ofertę na poziom firmy self-storage, bez odniesień do lokalizacji i obiektów.
- [x] Uprościć cennik do jednej czytelnej strony z trzema pakietami i jasnymi różnicami.
- [x] Podkreślić w cenniku, że social media są optymalizowane pod lokalne wyszukiwania.
- [x] Zmienić liczby publikacji w ofercie na maksymalne limity, np. „do 12 postów” i „do 4 rolek”.
- [x] Przepisać opis pakietu podstawowego tak, aby uzasadniał cenę 1 490 zł konkretnym zakresem lokalnego SEO.
- [x] Utworzyć nowoczesną wizytówkę z logo i ofertą usług: strony internetowe, marketing online, social media, płatne reklamy i SEO/AI.
- [x] Przygotować dwustronną wizytówkę do druku w minimalistycznym stylu Apple, z plikiem produkcyjnym dla drukarni.
- [x] Zmienić wizytówkę na ogólną prezentację usług: bez cennika, pakietów, limitów i treści z oferty self-storage.
- [x] Zastąpić ogólne hasło na wizytówce konkretnymi nazwami usług i słowami kluczowymi zrozumiałymi dla przedsiębiorców.
- [x] Przeprojektować wizytówkę od podstaw po negatywnej ocenie: dopracowany układ premium, poprawne proporcje logo i lepsza hierarchia.
- [x] Zastosować kierunek z referencji: ciemne premium, subtelny limonkowy gradient, elegancka typografia i układ danych.
- [x] Pozyskać i podmienić prawdziwy oficjalny plik logo do druku zamiast ręcznie rekonstruowanego wordmarku.
- [x] Wygenerować finalną wersję premium wizytówki z właściwym logo i ponownie zweryfikować front/back.
- [x] Zapisać końcowy checkpoint dopiero po podmianie logo i finalnej kontroli wizualnej wersji premium.
- [x] Pozyskać rzeczywisty oficjalny plik logo do druku (SVG/PDF/AI lub zatwierdzony high-res asset) bez ręcznego odtwarzania elementów znaku. Użyto dokładnego `client/public/images/logo.svg`, renderowanego przez Chromium w 1600 × 800 px.
- [x] Podmienić logo w finalnej premium wizytówce na zatwierdzony asset i ponownie zweryfikować front/back.
- [x] Zapisać nowy checkpoint po finalnej podmianie logo i końcowej kontroli wizualnej wersji premium.
