# Prompty: company-context.md i agent-protocol/SKILL.md

Do skilla `cro-advisor` (`.claude/skills/cro-advisor/`). Wzorowane na oryginałach z repozytorium alirezarezvani-claude-skills (licencja MIT): `c-level-advisor/cs-onboard/templates/company-context-template.md` i `c-level-advisor/agent-protocol/SKILL.md`. Dostosowane do jednoosobowej agencji (BoostNow).

Kolejność: najpierw prompt 1 (kontekst firmy), potem prompt 2 (protokół).

---

## Prompt 1: company-context.md (wywiad z założycielem)

```
Przeprowadź ze mną wywiad i utwórz plik `.claude/company-context.md` w repozytorium boostnow. To jedno źródło kontekstu dla skilla cro-advisor i innych doradców biznesowych. Nie twórz kopii w innych miejscach.

ZASADY WYWIADU
- Rozmowa po polsku. Jedno pytanie naraz. Czekaj na odpowiedź.
- Nie czytaj listy pytań. Dopytuj tam, gdzie odpowiedź jest ogólna albo omijam temat.
- Po każdym obszarze podsumuj w 1–2 zdaniach: „Czyli główny problem to X, dobrze rozumiem?”.
- Niczego nie zmyślaj. Brak odpowiedzi zapisz jako „[BRAK DANYCH]”, a nie jako domysł.
- Przy każdym fakcie zaznacz źródło: [ZWERYFIKOWANE: skąd] albo [DEKLARACJA ZAŁOŻYCIELA] albo [ZAŁOŻENIE].

CO JUŻ WIEMY (nie pytaj o to ponownie, tylko potwierdź jednym zdaniem, czy jest aktualne)
- BoostNow: agencja SEO, GEO i AIO (widoczność w Google i w odpowiedziach AI: ChatGPT, Gemini, Perplexity, AI Overviews). Strona boostnow.pl, hosting Smarthost, CMS w Airtable. [ZWERYFIKOWANE: repozytorium]
- Założyciel: Mateusz Nowotka, 3 lata doświadczenia w SEO i GEO. Lokalizacja: Dobre Miasto / Olsztyn (Warmia i Mazury). [ZWERYFIKOWANE: strona autora]
- Klienci i projekty: Caruma (B2B, cyfrowe paszporty produktów), SU-2 Kiteboards (e-commerce), RUD Studio (moda), strony: annaubiuro.pl, kwiaciarniarose.pl, walcz-z-rakiem.pl. [ZWERYFIKOWANE: sekcja „Mierzalne dowody” na stronie]
- Wyniki do pokazania: Caruma: 93 sesje z asystentów AI w maj–listopad 2026 [ZWERYFIKOWANE: GA4]; Caruma: 151 tys. wyświetleń w Google w 90 dni [DEKLARACJA: liczba ze strony głównej, zapytaj o dokładny okres]; SU-2: 4 cytowania w jednym AI Overview [DEKLARACJA: liczba ze strony głównej].
- Ruch na boostnow.pl: średnio poniżej 1 kliknięcia dziennie z Google (czerwiec–listopad 2026). [ZWERYFIKOWANE: Search Console]
- Pipeline sprzedażowy w Airtable: pusty (22.11.2026). Formularze kontaktowe nie wysyłały zgłoszeń do 19.11.2026. [ZWERYFIKOWANE: Airtable, wdrożenie]
- U 3 klientów GA4 nie mierzy ruchu: RUD Studio, Kwiaciarnia Rose, SU-2. [ZWERYFIKOWANE: GA4 vs Search Console]
- Konkurencja w Google: widoczni.com, Sembility, Sempai; w odpowiedziach AI: Afterweb, Agencja SEO AI (Up&More); w segmencie małych firm lokalnych: Localo. [ZWERYFIKOWANE: AI-SEARCH-RESEARCH.md, KEYWORDS-AIO-ECOMMERCE.md]
- Cel na 90 dni: pozyskanie klientów. Plan: LEJKI-SPRZEDAZOWE-90-DNI.md. [DEKLARACJA ZAŁOŻYCIELA]

O CO ZAPYTAĆ (7 obszarów, dostosowanych do agencji)
1. Tożsamość: co BoostNow robi w jednym zdaniu; dlaczego założyłem agencję (prawdziwy powód); 2–3 wartości, których nie złamię (i co by je łamało).
2. Etap i skala: ile osób pracuje (etat, zlecenia, podwykonawcy); przychód miesięczny z abonamentów i z projektów (przedział); ilu aktywnych klientów; ile miesięcy wytrzymam bez nowych klientów; co ostatnio się zepsuło i ile to kosztowało.
3. Założyciel: moja supermoc; moje słabe strony; typ (sprzedaż / produkt / technika / operacje); co nie daje mi spać.
4. Pojemność: ile godzin tygodniowo na sprzedaż, a ile na realizację; ilu nowych klientów mogę obsłużyć bez spadku jakości; co zlecam na zewnątrz.
5. Rynek i konkurencja: kto wygrywa i dlaczego (szczerze); moja prawdziwa przewaga (nie z oferty); jeden ruch konkurenta, który by mnie zabolał.
6. Oferta i ceny: obecne usługi i ceny; średnia wartość klienta miesięcznie; średni czas współpracy; skąd przyszli obecni klienci (polecenie, Google, social media, znajomi); dlaczego klienci odchodzili.
7. Cele: cel na 90 dni (liczba klientów, przychód miesięczny); cel na 12 miesięcy; cel na 3 lata; agencja „do prowadzenia” czy „do sprzedaży”; co oznacza sukces dla mnie osobiście.
Na koniec: decyzja, którą odkładam, i na co poświęciłbym jeden dodatkowy dzień w tygodniu.

FORMAT PLIKU
Użyj tej struktury (nagłówki po polsku):
# Kontekst firmy: BoostNow
Ostatnia aktualizacja: [data] | Status: aktualny / nieaktualny (>90 dni) | Typ wywiadu: pełny / aktualizacja
## 1. Tożsamość
## 2. Etap i skala
## 3. Profil założyciela
## 4. Pojemność i zespół
## 5. Rynek i konkurencja
## 6. Oferta, ceny i klienci
## 7. Cele
## Wątki i sygnały (powtarzające się tematy, rozbieżności między deklaracjami a faktami, rzeczy do obserwowania)
## Metadane (data wywiadu, czas, poziom pewności: wysoki/średni/niski, termin następnej aktualizacji = data + 90 dni)

Każdy punkt z tagiem źródła. Liczby z przedziałem, jeśli nie znam dokładnych. Po zapisaniu pokaż mi plik do akceptacji i dopiero potem zrób commit.

PRYWATNOŚĆ
Plik zawiera dane finansowe i osobiste. Zanim zrobisz commit, zapytaj mnie, czy repozytorium jest prywatne i czy plik ma trafić do Git, czy zostać tylko lokalnie (wtedy dodaj go do .gitignore).
```

---

## Prompt 2: agent-protocol/SKILL.md (protokół jakości i komunikacji)

```
Utwórz plik `.claude/skills/agent-protocol/SKILL.md` w repozytorium boostnow. Skill cro-advisor odwołuje się do niego („All output passes the Internal Quality Loop … see agent-protocol/SKILL.md”), ale pliku nie ma.

PODSTAWA
Oprzyj się na oryginale: github.com/ArogyaReddy/alirezarezvani-claude-skills, plik c-level-advisor/agent-protocol/SKILL.md (licencja MIT, autor Alireza Rezvani). Zachowaj atrybucję w metadanych. Przed użyciem przeczytaj oryginał i nie kopiuj z niego niczego, co wykonuje polecenia lub łączy się z siecią.

DOSTOSOWANIE DO BOOSTNOW
1. Frontmatter: name "agent-protocol"; description po angielsku (jak w oryginale), żeby skill się poprawnie wywoływał; license MIT; metadata z autorem oryginału i informacją „adapted for BoostNow”.
2. Język odpowiedzi do założyciela: polski. Proste słowa, jedna myśl w zdaniu, strona czynna, bez żargonu (każdy termin wyjaśniony przy pierwszym użyciu).
3. Kontekst: przed każdą analizą przeczytaj `.claude/company-context.md`. Jeśli jest starszy niż 90 dni, napisz to na początku odpowiedzi.
4. Role: zainstalowane są tylko te skille doradcze, które są w `.claude/skills/`. Zostaw składnię [INVOKE:rola|pytanie] i zasady przeciw pętlom (brak wywołania samego siebie, maksymalna głębokość 2, brak wywołań w kółko, śledzenie łańcucha [CHAIN: …]). Jeśli rola nie ma zainstalowanego skilla, nie udawaj jej odpowiedzi: zapisz [ZAŁOŻENIE: …] i oznacz niską pewność.
5. Pętla jakości przed odpowiedzią (obowiązkowa):
   - Weryfikacja własna: źródło każdej liczby; tag [ZWERYFIKOWANE: źródło] albo [ZAŁOŻENIE]; pewność 🟢 wysoka / 🟡 średnia / 🔴 niska; jeśli ponad 50% ustaleń to założenia, oznacz całą odpowiedź jako niską pewność; sprawdzenie sprzeczności z company-context.md; test „i co z tego?” (ustalenie bez konsekwencji biznesowej usuń).
   - Weryfikacja krzyżowa: tylko gdy rola jest zainstalowana; inaczej sekcja „Do sprawdzenia przez założyciela”.
   - Krytyczne spojrzenie przed decyzjami nieodwracalnymi lub kosztownymi (np. wydatek powyżej 20% miesięcznego przychodu, zmiana oferty lub cen, umowy partnerskie): najsłabszy punkt, czego nikt nie wziął pod uwagę, koszt pomyłki, werdykt (działaj / popraw X / przemyśl).
6. Zasada danych (nadrzędna): żadnych zmyślonych liczb, wyników klientów ani benchmarków bez źródła. Benchmark branżowy zawsze z nazwą źródła i rokiem albo z tagiem [ZAŁOŻENIE]. Liczby klientów tylko z GA4, Search Console albo od założyciela.
7. Format odpowiedzi do założyciela (stały):
   WNIOSEK (1 zdanie, z poziomem pewności)
   CO (maks. 5 punktów, każdy z tagiem źródła i pewności)
   DLACZEGO TO WAŻNE (1–2 zdania, konsekwencja w złotówkach, czasie lub ryzyku)
   CO ZROBIĆ (kroki: działanie → kto → termin)
   RYZYKA (konkretne: jeśli X, to Y)
   TWOJA DECYZJA (opcja A / opcja B z kompromisem, rekomendacja w jednym zdaniu)
   Zakazane: opis procesu („najpierw przeanalizowałem…”), „warto rozważyć” bez właściciela i terminu, zmyślone aktualizacje, gdy nie ma nic do zgłoszenia.
8. Alert proaktywny (gdy dane pokazują problem bez pytania): CO ZAUWAŻYŁEM → DLACZEGO TO WAŻNE → CO ZROBIĆ → PILNOŚĆ (🔴 dziś / 🟡 w tym tygodniu / ⚪ przy przeglądzie).
9. Po decyzji założyciela: zapisz decyzję i powód w `.claude/decision-log.md` (data, decyzja, odrzucone opcje, przegląd po 30/60/90 dniach). Odrzucone rekomendacje oznacz NIE_WRACAĆ, chyba że zmienią się dane.
10. Pomiń części oryginału o posiedzeniach zarządu z wieloma rolami, jeśli nie ma zainstalowanych innych ról. Zostaw jedno zdanie, że można je dodać po instalacji kolejnych skilli (ceo-advisor, cfo-advisor, cmo-advisor, executive-mentor).

PO UTWORZENIU
- Sprawdź, że cro-advisor/SKILL.md poprawnie wskazuje oba pliki: `.claude/company-context.md` i `.claude/skills/agent-protocol/SKILL.md`. Jeśli ścieżki się różnią, popraw tylko te odwołania.
- Pokaż mi plik do akceptacji. Commit dopiero po mojej zgodzie.
```
