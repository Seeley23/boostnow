# 📊 Instrukcja Integracji Google Search Console z BoostNow

**Data:** 18 stycznia 2026  
**Status:** ✅ GOTOWY DO WDROŻENIA  
**Cel:** Monitorowanie pozycji słów kluczowych dla Warszawy, Krakowa, Gdańska, Olsztyna

---

## 🎯 Krok 1: Weryfikacja Domeny w GSC

### Jeśli domena już jest zweryfikowana:
1. Zaloguj się do [Google Search Console](https://search.google.com/search-console)
2. Kliknij na **boostnow.pl**
3. Przejdź do **Ustawienia** → **Użytkownicy i uprawnienia**
4. Upewnij się, że jesteś właścicielem domeny

### Jeśli domena NIE jest zweryfikowana:
1. Wejdź na [Google Search Console](https://search.google.com/search-console)
2. Kliknij **Dodaj właściwość**
3. Wpisz: `https://boostnow.pl`
4. Kliknij **Kontynuuj**
5. Wybierz metodę weryfikacji:
   - **DNS TXT Record** (najszybsze) - Dodaj TXT record u dostawcy domeny
   - **HTML File** - Dodaj plik HTML na serwer
   - **HTML Tag** - Dodaj meta tag do `<head>`

**Rekomendacja:** Użyj **DNS TXT Record** - najszybsze i trwałe.

---

## 🔗 Krok 2: Przesłanie Sitemapu

### Sitemap jest już dostępny:
- **URL:** `https://boostnow.pl/sitemap.xml`
- **Zawartość:** 58 URL-ów (strona główna, artykuły, miasta, glossary, polityki)

### Przesłanie sitemapu do GSC:
1. Zaloguj się do GSC
2. Przejdź do **Mapy witryn** (Sitemaps)
3. Kliknij **Dodaj nową mapę witryny**
4. Wpisz: `https://boostnow.pl/sitemap.xml`
5. Kliknij **PRZEŚLIJ**

### Sprawdzenie statusu:
- Status powinien zmienić się na **Sukces** (zielone)
- Liczba odkrytych URL-ów powinna wzrosnąć
- Czekaj 24-48h na pełne indeksowanie

---

## 📈 Krok 3: Monitoring Keywords dla Miast

### Keywords do monitorowania:

#### Warszawa (HIGH PRIORITY)
```
1. agencja neuromarketingowa warszawa
2. agencja seo warszawa
3. agencja marketingowa warszawa
4. optymalizacja konwersji warszawa
5. pozycjonowanie warszawa
6. cro warszawa
7. neuromarketing warszawa
8. agencja e-commerce warszawa
```

#### Kraków (HIGH PRIORITY)
```
1. agencja neuromarketingowa kraków
2. agencja seo kraków
3. agencja marketingowa kraków
4. optymalizacja konwersji kraków
5. pozycjonowanie kraków
6. cro kraków
7. neuromarketing kraków
8. agencja e-commerce kraków
```

#### Gdańsk (HIGH PRIORITY)
```
1. agencja neuromarketingowa gdańsk
2. agencja seo gdańsk
3. agencja marketingowa gdańsk
4. optymalizacja konwersji gdańsk
5. pozycjonowanie gdańsk
6. cro gdańsk
7. neuromarketing gdańsk
8. agencja e-commerce gdańsk
```

#### Olsztyn (MEDIUM PRIORITY)
```
1. agencja neuromarketingowa olsztyn
2. agencja seo olsztyn
3. agencja marketingowa olsztyn
4. optymalizacja konwersji olsztyn
5. pozycjonowanie olsztyn
```

#### National (HIGH PRIORITY)
```
1. agencja neuromarketingowa
2. optymalizacja konwersji
3. neuromarketing
4. agencja cro
5. decision science marketing
6. psychologia e-commerce
7. agencja seo
8. agencja marketingowa
```

---

## 📊 Krok 4: Czytanie Raportu Performance w GSC

### Metryki do monitorowania:

| Metryka | Znaczenie | Cel (30 dni) | Cel (90 dni) |
|---------|-----------|--------------|--------------|
| **Impressions** | Liczba wyświetleń w wynikach | 500-1000 | 2000-5000 |
| **Clicks** | Liczba kliknięć | 50-100 | 200-500 |
| **CTR** | Click-Through Rate | 5-10% | 8-15% |
| **Avg Position** | Średnia pozycja | 15-20 | 8-12 |

### Jak czytać raport:
1. Zaloguj się do GSC
2. Przejdź do **Performance**
3. Ustaw okres: **Ostatnie 30 dni** (lub 90 dni)
4. Filtruj po:
   - **Queries** - Keywords
   - **Pages** - URL-y (np. /warszawa, /krakow)
   - **Countries** - Polska (PL)
   - **Device** - Desktop, Mobile

### Interpretacja danych:

**Impressions rosnące, Clicks stałe?**
- ✅ Pozycja się poprawia (rosnąca widoczność)
- ⚠️ CTR jest niski - popraw title/description

**Clicks rosnące, Impressions stałe?**
- ✅ CTR się poprawia (lepszy messaging)
- ✅ Konwersja powinna rosnąć

**Obydwa rosnące?**
- ✅✅ IDEALNIE - wszystko działa

---

## 🎯 Krok 5: Śledzenie Pozycji Keywords

### Metoda 1: Google Search Console (Darmowa)
1. Przejdź do **Performance**
2. Kliknij na keyword
3. Sprawdź średnią pozycję
4. Monitoruj trend co tydzień

**Zalety:** Darmowe, oficjalne dane  
**Wady:** Dane opóźnione o 2-3 dni, brak historii

### Metoda 2: Narzędzia SEO (Płatne)
- **Semrush** - Tracking keywords, rank tracking
- **Ahrefs** - Rank tracker, keywords
- **SE Ranking** - Affordable rank tracking
- **Moz Pro** - Rank tracking

**Rekomendacja:** Użyj GSC (darmowe) przez 30 dni, potem rozważ Semrush/SE Ranking.

---

## 📋 Krok 6: Tworzenie Raportu Pozycji

### Raport powinien zawierać:

#### Cotygodniowy (co 7 dni):
```
Tydzień: 18-24 stycznia 2026

WARSZAWA:
- agencja neuromarketingowa warszawa: Pozycja 45 (poprzednio: 50)
- agencja seo warszawa: Pozycja 52 (poprzednio: 55)
- agencja marketingowa warszawa: Pozycja 38 (poprzednio: 40)

KRAKÓW:
- agencja neuromarketingowa kraków: Pozycja 48 (poprzednio: 52)
- agencja seo kraków: Pozycja 55 (poprzednio: 58)

GDAŃSK:
- agencja neuromarketingowa gdańsk: Pozycja 50 (poprzednio: 55)

NATIONAL:
- agencja neuromarketingowa: Pozycja 35 (poprzednio: 40)
- optymalizacja konwersji: Pozycja 28 (poprzednio: 32)

SUMMARY:
- Średnia pozycja: 44 (poprzednio: 47) ✅ -3 pozycje
- Keywords w TOP 10: 0 (cel: 5)
- Keywords w TOP 20: 2 (cel: 10)
- Keywords w TOP 50: 12 (cel: 30)
```

#### Miesięczny (co 30 dni):
```
Miesiąc: Styczeń 2026

COVERAGE:
- Strony indeksowane: 45/58 (78%)
- Błędy: 0
- Ostrzeżenia: 0

PERFORMANCE:
- Impressions: 450 (wzrost: +450%)
- Clicks: 25 (wzrost: +∞)
- CTR: 5.6%
- Avg Position: 44

KEYWORDS TOP 10:
1. agencja neuromarketingowa: Pozycja 35
2. optymalizacja konwersji: Pozycja 28
3. neuromarketing: Pozycja 42
4. agencja seo: Pozycja 38
5. agencja marketingowa: Pozycja 41

CITIES PERFORMANCE:
- Warszawa: 8 keywords tracked, avg position 45
- Kraków: 7 keywords tracked, avg position 50
- Gdańsk: 6 keywords tracked, avg position 52
- Olsztyn: 5 keywords tracked, avg position 48

NEXT STEPS:
- Napisz artykuł o CRO dla Warszawy
- Popraw CTR dla "agencja neuromarketingowa" (zmień title/description)
- Dodaj backlinki z LinkedIn
```

---

## 🔧 Krok 7: Automatyzacja Raportowania

### Opcja 1: Google Sheets + GSC API (Zaawansowane)
```
1. Stwórz Google Sheet
2. Połącz z GSC API
3. Automatycznie pobieraj dane co dzień
4. Twórz wykresy i raporty
```

### Opcja 2: Data Studio (Rekomendowane)
```
1. Wejdź na https://datastudio.google.com
2. Stwórz nowy raport
3. Dodaj źródło danych: Google Search Console
4. Stwórz dashboard z metrykami
5. Udostępnij raport
```

### Opcja 3: Email Reports (Proste)
```
1. Zaloguj się do GSC
2. Przejdź do Ustawienia → Email reports
3. Wybierz metryki
4. Ustaw częstotliwość: Tygodniowo/Miesięcznie
```

**Rekomendacja:** Użyj **Data Studio** - najlepszy balance między prostotą a funkcjonalnością.

---

## 📱 Krok 8: Monitoring na Urządzeniach Mobilnych

### Ważne: 80% traffic pochodzi z mobile!

1. Przejdź do **Performance**
2. Filtruj po **Device** → **Mobile**
3. Sprawdzaj:
   - Czy CTR na mobile jest niższy niż na desktop?
   - Czy pozycje na mobile są gorsze?
   - Czy mobile version jest zoptymalizowana?

### Jeśli CTR na mobile jest niższy:
- Popraw title (krótszy, bardziej zachęcający)
- Popraw description (bardziej konkretny)
- Dodaj strukturę danych (schema.org)

---

## 🚀 Krok 9: Optymalizacja na Podstawie Danych GSC

### Jeśli keyword ma wysokie impressions, ale niskie clicks:
```
Problem: CTR jest niski
Rozwiązanie:
1. Zmień title - dodaj number, emocję, CTA
2. Zmień description - bądź bardziej konkretny
3. Dodaj structured data (schema.org)
4. Sprawdź, czy snippet jest atrakcyjny
```

### Jeśli keyword ma pozycję 11-20:
```
Problem: Prawie TOP 10, ale nie wchodzisz
Rozwiązanie:
1. Popraw content - dodaj więcej słów kluczowych
2. Wzmocnij internal linking - linkuj z innych stron
3. Dodaj backlinki - poproś partnerów o linki
4. Popraw UX - zmniejsz bounce rate
```

### Jeśli keyword ma pozycję 1-10, ale niskie clicks:
```
Problem: Jesteś w TOP 10, ale mało kliknięć
Rozwiązanie:
1. Popraw title - bądź bardziej konkretny
2. Dodaj emocję lub number ("150% ROAS", "Zwiększ konwersję")
3. Dodaj rich snippet (FAQ, rating, etc.)
4. Sprawdź, czy konkurencja ma lepszy snippet
```

---

## 📊 Krok 10: Tworzenie Dashboard'u

### Metryki do dashboard'u:

```
┌─────────────────────────────────────────────┐
│         BOOSTNOW SEO DASHBOARD              │
├─────────────────────────────────────────────┤
│                                             │
│  COVERAGE                                   │
│  ├─ Indeksowane: 45/58 (78%)               │
│  ├─ Błędy: 0                               │
│  └─ Ostrzeżenia: 0                         │
│                                             │
│  PERFORMANCE (30 dni)                       │
│  ├─ Impressions: 450 (↑ +450%)             │
│  ├─ Clicks: 25 (↑ +∞)                      │
│  ├─ CTR: 5.6%                              │
│  └─ Avg Position: 44 (↓ -6 pozycji)        │
│                                             │
│  KEYWORDS BY CITY                           │
│  ├─ Warszawa: 8 keywords, avg pos 45       │
│  ├─ Kraków: 7 keywords, avg pos 50         │
│  ├─ Gdańsk: 6 keywords, avg pos 52         │
│  └─ Olsztyn: 5 keywords, avg pos 48        │
│                                             │
│  TOP KEYWORDS                               │
│  ├─ agencja neuromarketingowa: Pos 35      │
│  ├─ optymalizacja konwersji: Pos 28        │
│  ├─ neuromarketing: Pos 42                 │
│  ├─ agencja seo: Pos 38                    │
│  └─ agencja marketingowa: Pos 41           │
│                                             │
│  GOALS (90 dni)                             │
│  ├─ Keywords w TOP 10: 5/5 ✅              │
│  ├─ Keywords w TOP 20: 15/15 ✅            │
│  ├─ Keywords w TOP 50: 30/30 ✅            │
│  ├─ Impressions: 2000+ (↑ +344%)           │
│  ├─ Clicks: 200+ (↑ +700%)                 │
│  └─ Avg Position: 12 (↓ -32 pozycji)       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🎯 Checklist Implementacji

- [ ] **Dzień 1:** Weryfikacja domeny w GSC
- [ ] **Dzień 1:** Przesłanie sitemapu (sitemap.xml)
- [ ] **Dzień 2:** Sprawdzenie Coverage (powinno być 45-58 stron)
- [ ] **Dzień 3:** Dodanie keywords do monitorowania
- [ ] **Dzień 7:** Pierwszy raport tygodniowy
- [ ] **Dzień 14:** Drugi raport tygodniowy + optymalizacja
- [ ] **Dzień 30:** Raport miesięczny + analiza
- [ ] **Dzień 30:** Stworzenie Data Studio dashboard
- [ ] **Dzień 30:** Automatyzacja email reports

---

## 📈 Oczekiwane Rezultaty

### Dni 1-7:
- ✅ Domena zweryfikowana
- ✅ Sitemap przesłany
- ✅ Pierwsze impressions (50-100)
- ✅ 0-5 keywords w TOP 50

### Dni 8-30:
- ✅ 45-58 stron indeksowanych
- ✅ 500-1000 impressions
- ✅ 50-100 clicks
- ✅ 5-10 keywords w TOP 50
- ✅ 0-2 keywords w TOP 20

### Dni 31-90:
- ✅ 2000-5000 impressions
- ✅ 200-500 clicks
- ✅ 30+ keywords w TOP 50
- ✅ 10-15 keywords w TOP 20
- ✅ 2-5 keywords w TOP 10

---

## 🔗 Przydatne Linki

- [Google Search Console](https://search.google.com/search-console)
- [Google Data Studio](https://datastudio.google.com)
- [Sitemap.xml](https://boostnow.pl/sitemap.xml)
- [Robots.txt](https://boostnow.pl/robots.txt)

---

**Status:** ✅ GOTOWY DO WDROŻENIA  
**Przygotowane:** 18 stycznia 2026  
**Autor:** Manus AI
