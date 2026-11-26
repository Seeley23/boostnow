# System „Widoczny w AI” dla klientów BoostNow

**Cel:** zbudować dla klienta BoostNow (lokalnej firmy usługowej) system, który robi to samo co case elektroden.pl, i sprzedawać go jako produkt.

System ma dawać 3 rzeczy:
1. więcej telefonów z Google, Map i AI (ChatGPT, Gemini, Perplexity, Claude);
2. żaden lead nie ginie, każdy ma notatkę;
3. jeden panel, w którym klient i BoostNow widzą wszystkie wyniki.

**Różnica względem elektroden.pl:** dodajemy moduł, którego tam nie opisano: **cotygodniowy pomiar widoczności w AI**. To jest serce oferty BoostNow i dowód w każdym raporcie.

---

## 0. Uwaga do samego case’u

Liczby z posta (13 → 51 telefonów, 45 → 304 wejścia, „#1 w ChatGPT”) to deklaracje autora. Nie da się ich sprawdzić. Mechanizm jest jednak spójny i znany: strona per usługa, mocna wizytówka, szybka obsługa leadów, pomiar. BoostNow ma już większość narzędzi do pierwszego punktu.

Czego **nie** obiecujemy klientowi:
- miejsca #1 w ChatGPT (odpowiedzi AI zmieniają się z dnia na dzień);
- konkretnej liczby telefonów.

Obiecujemy zakres pracy, pomiar i raport.

---

## 1. Moduły systemu

| # | Moduł | Co robi | Z czego budujemy |
|---|---|---|---|
| 1 | **Strona per usługa** | Osobna podstrona dla każdej z 8–12 usług, napisana frazami klientów | Stack boostnow.pl: React + prerender, schema LocalBusiness i Service, llms.txt, skille seo-geo |
| 2 | **Wizytówka Google** | Pełna lista usług (20–30), kategorie, pytania i odpowiedzi, regularne posty | Panel Google + API wizytówki (posty, statystyki) |
| 3 | **Zdjęcie → realizacja** | Właściciel wysyła zdjęcie z pracy botowi na telefonie. AI pisze realizację na stronę i post na wizytówkę. Właściciel zatwierdza jednym kliknięciem | Bot Telegram (lub WhatsApp) → n8n → Claude (rozpoznanie zdjęcia + tekst) → strona i wizytówka |
| 4 | **Jedna baza leadów** | Telefon, czat i formularz trafiają do jednej tabeli. AI pisze notatkę: kto, czego potrzebuje, kiedy | NocoDB (lub Airtable na start), n8n, operator VoIP z webhookami (np. Zadarma) |
| 5 | **Rozpoznanie klienta przy telefonie** | Dzwoni ktoś, kto już był. Telefon właściciela pokazuje imię i ostatnią sprawę | Zapis kontaktu do Kontaktów Google z opisem w nazwie (synchronizuje się z iPhone’em i Androidem) |
| 6 | **Panel na żywo** | Telefony, czat, formularze, frazy z Google, telefony i trasy z wizytówki, opinie, wizyty z kalendarza | Search Console API, API statystyk wizytówki, GA4, baza leadów, Google Calendar |
| 7 | **Monitor AI (nowy, BoostNow)** | Co tydzień te same 10–20 pytań klientów do ChatGPT, Gemini, Perplexity i Claude. Zapis: czy firma jest polecana, na którym miejscu, kto zamiast niej, z jakiego źródła | n8n + API modeli z wyszukiwaniem w sieci; wynik do bazy i panelu |

Moduł 7 odpowiada na pytanie, które pada w każdej rozmowie: „skąd wiesz, że klienci przychodzą z ChatGPT?”. To także materiał do postów i case studies BoostNow.

---

## 2. Architektura

```
Klient dzwoni / pisze / wypełnia formularz      Właściciel robi zdjęcie
          │                                            │
   VoIP · czat · formularz                       Bot na telefonie
          │                                            │
          └──────────────►  n8n (automatyzacje)  ◄─────┘
                                  │
            Claude: notatka z rozmowy / opis realizacji
                                  │
        ┌─────────────────────────┼──────────────────────────┐
   Baza leadów             Strona (realizacje)        Wizytówka (posty)
   (NocoDB)                       │                          │
        │                 Search Console            Statystyki wizytówki
        │                         │                          │
        └────────────►   PANEL KLIENTA   ◄─────── Monitor AI (co tydzień)
```

**Gdzie to stoi:**
- Strona klienta: tani hosting statyczny (jak boostnow.pl na Smarthost) albo ten sam VPS.
- n8n, NocoDB, panel i kopie zapasowe: **jeden VPS BoostNow** dla wielu klientów, osobna baza na każdego klienta. Hosting współdzielony (Smarthost) nie uruchomi n8n ani NocoDB.
- Kopia zapasowa co noc poza serwerem.

**Koszt miesięczny na klienta:** do policzenia po wyborze dostawców (VPS, numer VoIP, minuty, API modeli). Autor case’u podaje około 120 zł. Policzymy to na pilocie z rachunków, a nie z cenników.

---

## 3. Prawo i bezpieczeństwo (przed startem)

1. **Nagrywanie i transkrypcja rozmów:** dzwoniący musi usłyszeć informację na początku rozmowy (RODO, obowiązek informacyjny). Komunikat w zapowiedzi.
2. **Głos AI w telefonie:** rozmówca musi wiedzieć, że rozmawia z AI (AI Act, art. 50, obowiązki przejrzystości stosowane od 2 sierpnia 2026).
3. **Umowa powierzenia danych** między klientem a BoostNow (BoostNow przetwarza dane klientów klienta).
4. **Dane w UE:** VPS w UE. Sprawdzić, gdzie przetwarzają dane dostawcy API (VoIP, głos, modele).

Punkty 1–3 potwierdzić z prawnikiem. To wymóg przed pierwszym wdrożeniem.

---

## 4. Plan wdrożenia na pilocie (8 tygodni)

| Tydzień | Etap | Wynik |
|---|---|---|
| 1 | **Pilot i pomiar startowy** | Wybrany klient. Dostępy: wizytówka, Search Console, GA4. Zapis stanu „przed”: telefony z wizytówki (ostatnie 3 miesiące), wejścia z Google, wynik 10 pytań w 4 narzędziach AI ze zrzutami. **Bez tego nie będzie case’u.** |
| 1–3 | Strona per usługa | 8–12 podstron, frazy z Search Console i badania SERP, schema, llms.txt, prerender |
| 2–3 | Wizytówka | Usługi, kategorie, pytania i odpowiedzi, zdjęcia. Bot „zdjęcie → realizacja” z zatwierdzaniem |
| 3–5 | Leady | Formularz i czat do bazy. Telefon przez VoIP z webhookiem. Notatka AI. Kontakty w telefonie |
| 4–6 | Panel | Wszystkie źródła w jednym widoku, dostęp dla klienta |
| 2–8 | Monitor AI | Co tydzień, od pierwszego tygodnia (żeby mieć linię bazową) |
| 12 | **Case study** | Liczby „przed i po” z tych samych źródeł, za zgodą klienta |

**Kolejność ma znaczenie:** pomiar startowy i monitor AI zaczynają się w tygodniu 1. Wszystko inne da się dobudować później, a danych „przed” nie da się odtworzyć.

---

## 5. Kto na pilota

Kryteria:
- lokalna firma usługowa, w której jeden klient jest wart dużo pieniędzy (warsztat, gabinet, instalator, serwis);
- właściciel odbiera telefony sam i ma smartfon;
- ma wizytówkę Google;
- zgoda na publikację wyników z nazwą.

Kandydaci z obecnej bazy:
- **Kwiaciarnia Rose:** lokalna, z wizytówką, ma zepsuty GA4 (już do naprawy). Ruch sezonowy, ale klient jest pod ręką.
- **Nowa firma z Lejka 1** (lista z Map Google, Olsztyn): pierwszy klient kupuje „pilota” po obniżonej cenie w zamian za zgodę na case.

---

## 6. Jak to sprzedawać

**Nazwa robocza:** „System Widoczny w AI” (strona + wizytówka + leady + panel + monitor AI).

**Model:** opłata za wdrożenie + abonament. Abonament pokrywa hosting, automatyzacje, monitor AI, posty i raport. Ceny do ustalenia po pilocie, gdy znamy realny koszt i czas pracy.

**Dlaczego to lepsze niż samo SEO:** klient widzi efekt w telefonach i w panelu, a nie w pozycjach. Trudno z tego zrezygnować, bo baza leadów i panel pracują codziennie.

**Treść do sprzedaży:** post w formacie case’u elektroden (liczby przed i po, lista modułów, koszt). Publikujemy dopiero po 90 dniach pilota, z danymi z panelu.

---

## 7. Decyzje dla Ciebie

1. Kto jest pilotem?
2. VPS: kupujemy (UE) i stawiamy n8n + NocoDB, czy na start baza w Airtable (już masz) i automatyzacje w n8n w chmurze?
3. Telefon: czy klient przenosi numer do operatora VoIP, czy dodajemy nowy numer do wizytówki? Przeniesienie numeru to największa zmiana dla klienta.
4. Głos AI odbierający telefony: w pilocie czy później? Proponuję później. Na start: nagranie, transkrypcja i notatka AI po rozmowie.
5. Klucze API do monitora AI: OpenAI, Google Gemini, Perplexity, Anthropic.

## 8. Co Claude może zrobić od razu

- Szablon strony per usługa na bazie stacku boostnow.pl (generator podstron z jednego pliku danych).
- Monitor AI jako skrypt: lista pytań → odpowiedzi z 4 modeli → tabela w Airtable. Potrzebne klucze API.
- Schemat bazy leadów (tabele, pola, statusy) i przepływy n8n jako pliki JSON do importu.
- Formularz pomiaru startowego dla pilota.
