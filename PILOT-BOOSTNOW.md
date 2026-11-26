# Pilot „Widoczny w AI”: BoostNow jako pierwszy klient

**Start:** 26.11.2026. **Pomiar końcowy:** 26.02.2027 (13 tygodni).
**Zasada:** te same źródła danych na starcie i na końcu. Bez danych z innych źródeł i bez szacunków.

---

## 1. Pomiar startowy (26.11.2026)

| Wskaźnik | Wartość | Źródło | Uwagi |
|---|---|---|---|
| Kliknięcia z Google, ostatnie 28 dni (27.10–23.11) | **2** | Search Console | |
| Wyświetlenia w Google, ostatnie 28 dni | **953** | Search Console | Rosną od 6.11 (z ~8 do ~50 dziennie) |
| Kliknięcia z Google, 12 miesięcy | 44 | Search Console (Twój eksport) | 8 993 wyświetlenia, CTR 0,55% |
| Sesje na boostnow.pl, 90 dni | **82** | GA4 (hosty boostnow.pl + www) | GA4 liczy też 108 sesji z localhost i 13 z mail.boostnow.pl. To nie są klienci |
| Sesje z wyszukiwarki, 90 dni | 6 | GA4 | |
| Sesje z ChatGPT, Gemini, Perplexity, Claude, Copilot, 90 dni | **0** | GA4 | |
| Leady zmierzone w GA4, 90 dni | **0** | GA4 | Brak zdarzenia „wysłany formularz”. Tylko 2 × form_start |
| Leady w CRM | **0** | Airtable „Pipeline Prospektów” | |
| Telefony, trasy, wejścia z wizytówki Google | **brak danych** | Wizytówka Google | Czeka na podłączenie (link w czacie) |
| Odpowiedzi AI na 15 pytań | **brak danych** | Monitor AI | Czeka na klucze API albo na test ręczny (sekcja 4) |

**Wniosek:** dziś nie da się zmierzyć, skąd przychodzą klienci BoostNow. Naprawa pomiaru to pierwsze zadanie pilota, przed każdą zmianą treści.

---

## 2. Moduły w wersji dla BoostNow

| # | Moduł | Wersja BoostNow | Infrastruktura na start |
|---|---|---|---|
| 1 | Strony usług | Są: `/aio`, `/aio-ecommerce`, `/olsztyn`, `/audyt-ai-dla-sklepu`. Brakuje (z `LUKI-TRESCI-GSC.md`): **Pozycjonowanie w ChatGPT**, **Ile kosztuje pozycjonowanie w AI**, **GEO w podwykonawstwie dla agencji** | Obecny stack strony |
| 2 | Wizytówka Google | Audyt wizytówki: kategorie, 20–30 usług (GEO, SEO, audyt sklepu, llms.txt, schema…), pytania i odpowiedzi, posty | API wizytówki przez Composio |
| 3 | Zdjęcie → realizacja | Dla agencji „zdjęcie z roboty” to **zrzut wyniku**: wykres z GSC klienta, odpowiedź ChatGPT z nazwą klienta. Wysyłasz zrzut botowi. AI pisze krótką realizację na stronę, post na wizytówkę i szkic posta na LinkedIn. Ty zatwierdzasz | Bot Telegram + automatyzacja (krok 2 pilota) |
| 4 | Jedna baza leadów | Formularz kontaktowy, formularz AIO i audyt sklepu trafiają do Airtable (dziś: e-mail i plik na serwerze). Do każdego zgłoszenia AI dopisuje notatkę: kto, jaki sklep lub branża, czego chce, pilność | `contact.php` → API Airtable |
| 5 | Rozpoznanie przy telefonie | Lead z bazy trafia do Kontaktów Google z opisem w nazwie („Jan – sklep Shoper – audyt AI”) | API Kontaktów Google |
| 6 | Panel | Widok w Airtable (Interface): leady według źródła, Search Console tygodniowo, wizytówka, monitor AI | Airtable + zaplanowany pobór danych |
| 7 | Monitor AI | Co tydzień 15 pytań (sekcja 4) do ChatGPT, Gemini, Perplexity i Claude. Zapis do Airtable | Zaplanowane zadanie GitHub Actions (bez serwera) |

**Bez VPS na start.** Na pilota wystarczy to, co już masz:
- Airtable jako baza i panel;
- `contact.php` na Smarthost dla formularzy;
- GitHub Actions do zadań co tydzień (monitor AI, pobór danych z GSC i wizytówki).

VPS z n8n i NocoDB jest potrzebny dopiero przy klientach z telefonem VoIP i botem. To decyzja po pilocie.

---

## 3. Plan tygodniowy

| Tydzień | Zadanie | Kto |
|---|---|---|
| 1 | Podłączenie wizytówki i odczyt jej statystyk za 6 miesięcy (uzupełnia pomiar startowy) | Ty: link; Claude: odczyt |
| 1 | Pierwszy pomiar AI: 15 pytań × 4 narzędzia, zrzuty z datą | Claude (po kluczach) albo Ty ręcznie |
| 1 | Pomiar w GA4: zdarzenie „wysłany formularz” jako kluczowe, wyłączenie localhost, grupa kanałów AI | Claude |
| 1–2 | Leady do Airtable z notatką AI (wszystkie 3 formularze) | Claude |
| 2–4 | 3 nowe strony usług z luk w treści | Claude pisze, Ty akceptujesz ceny i treść |
| 2–3 | Audyt i uzupełnienie wizytówki | Claude przygotowuje, Ty zatwierdzasz |
| 3–4 | Panel w Airtable i cotygodniowy pobór danych | Claude |
| 4–6 | Bot „zrzut → realizacja” | Claude |
| Co tydzień | Monitor AI + raport w piątek: leady, źródła, Google, wizytówka, AI | automat |
| 13 | Pomiar końcowy i case study BoostNow | Claude + Ty |

---

## 4. Pytania do monitora AI (wersja 1)

Część pytań to dosłowne zapytania z Search Console BoostNow (oznaczone [GSC]). Pozostałe to pytania klientów z badania fraz i lejków.

**Lokalne (Olsztyn, Warmia i Mazury)**
1. Polecisz agencję SEO w Olsztynie?
2. Jaka agencja w Olsztynie pozycjonuje firmy także w ChatGPT i Google AI?
3. Agencja marketingowa w Olsztynie: kogo wybrać dla małej firmy?
4. Kto na Warmii i Mazurach pomaga firmom być polecanymi przez ChatGPT?

**Polska, usługa GEO**
5. Chcę, żeby moja firma pojawiała się w odpowiedziach ChatGPT. Kto w Polsce zajmuje się tym zawodowo? [GSC]
6. Jaka agencja od pozycjonowania AEO w Polsce? [GSC]
7. Które agencje specjalizują się w SEO pod AI i LLM? [GSC]
8. Najlepsza agencja GEO w Polsce? [GSC]
9. Ile kosztuje pozycjonowanie w AI? [GSC]

**Sklepy internetowe**
10. Mój sklep jest widoczny w Google, ale ChatGPT poleca konkurencję. Od czego zacząć i kto pomoże? [GSC]
11. Kto zrobi audyt widoczności mojego sklepu w ChatGPT?
12. Konkurencyjny sklep jest w rekomendacjach ChatGPT, a mój WooCommerce nie. Jakie narzędzie albo firma ustali przyczynę? [GSC]
13. Jaka agencja od pozycjonowania w AI dla e-commerce? [GSC]

**Wiedza (czy AI cytuje treści BoostNow)**
14. Co to jest llms.txt i jak go wdrożyć? [GSC]
15. Jak sprawdzić, czy ChatGPT poleca mój sklep?

**Co zapisujemy przy każdej odpowiedzi:** data, narzędzie, czy BoostNow jest wymieniony, miejsce na liście, kogo AI poleca zamiast, które adresy cytuje, czy cytuje boostnow.pl.

**Uwaga:** odpowiedzi API mogą się różnić od odpowiedzi w aplikacji ChatGPT (inna wersja modelu, brak historii użytkownika, inna lokalizacja). Dlatego raz w miesiącu robimy też test ręczny w aplikacjach, ze zrzutami.

---

## 5. Czego potrzebuję od Ciebie

1. **Wizytówka Google:** kliknij link podłączenia (z czatu) i potwierdź.
2. **Monitor AI:** klucze API do OpenAI, Gemini, Perplexity i Anthropic. Możesz je podłączyć w Composio albo zapisać jako sekrety w GitHub (Settings → Secrets → Actions). Bez kluczy robisz pierwszy pomiar ręcznie: 15 pytań w 4 aplikacjach, zrzuty z datą.
3. **Telefon BoostNow:** jaki numer jest na stronie i w wizytówce, i czy odbierasz go na iPhonie?
4. **Leady z ostatnich 30 dni:** ile maili przyszło z formularzy od 19.11? (GA4 tego nie mierzy, więc to jedyne źródło).
5. **Ceny** do strony „Ile kosztuje pozycjonowanie w AI”: czy aktualne są kwoty z `llms.txt` (audyt GEO od 2 500 zł, wdrożenie od 8 000 zł, abonament od 3 500 zł)?
