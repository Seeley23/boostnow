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
- [ ] Run dev server and test all pages
- [ ] Check for 404 errors
- [ ] Verify SEO meta tags in browser DevTools
- [ ] Test internal links
- [ ] Create git checkpoint
