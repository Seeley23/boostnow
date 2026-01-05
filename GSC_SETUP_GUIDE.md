# Google Search Console - Instrukcja Konfiguracji

## 📋 Wymagania Wstępne

- ✅ Strona musi być **opublikowana** (nie localhost)
- ✅ Dostęp do domeny **boostnow.pl**
- ✅ Konto Google

---

## 🚀 Krok 1: Dodaj Stronę do Google Search Console

### 1.1. Przejdź do Google Search Console
- URL: https://search.google.com/search-console
- Zaloguj się kontem Google

### 1.2. Dodaj Nową Właściwość
- Kliknij **"Dodaj właściwość"** (Add Property)
- Wybierz **"Prefiks adresu URL"** (URL prefix)
- Wpisz: `https://boostnow.pl`
- Kliknij **"Kontynuuj"**

---

## ✅ Krok 2: Weryfikacja Własności (3 Metody)

### **METODA 1: Google Tag Manager (NAJŁATWIEJSZA!)** ✅ ZALECANE

**Dlaczego najłatwiejsza:**
- ✅ GTM już jest wdrożony (GTM-TZX2NB5F)
- ✅ Nie wymaga edycji kodu
- ✅ Weryfikacja automatyczna

**Instrukcja:**
1. W GSC wybierz **"Weryfikuj przez Google Tag Manager"**
2. Sprawdź czy GTM ID to: **GTM-TZX2NB5F**
3. Kliknij **"Weryfikuj"**
4. ✅ Gotowe!

---

### **METODA 2: Meta Tag HTML**

**Instrukcja:**
1. W GSC wybierz **"Tag HTML"**
2. Skopiuj kod weryfikacyjny (np. `google1234567890abcdef.html`)
3. Otwórz plik `/home/ubuntu/boostnow/client/index.html`
4. Znajdź linię 17:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
   ```
5. Zamień `YOUR_VERIFICATION_CODE_HERE` na **Twój kod weryfikacyjny**
6. Zapisz plik i opublikuj stronę
7. Wróć do GSC i kliknij **"Weryfikuj"**
8. ✅ Gotowe!

---

### **METODA 3: Plik HTML**

**Instrukcja:**
1. W GSC wybierz **"Plik HTML"**
2. Pobierz plik weryfikacyjny (np. `google1234567890abcdef.html`)
3. Przenieś plik do `/home/ubuntu/boostnow/client/public/`
4. Opublikuj stronę
5. Sprawdź czy plik jest dostępny: `https://boostnow.pl/google1234567890abcdef.html`
6. Wróć do GSC i kliknij **"Weryfikuj"**
7. ✅ Gotowe!

---

## 📊 Krok 3: Prześlij Sitemap.xml

### 3.1. Dodaj Sitemap
1. W GSC przejdź do **"Sitemapy"** (Sitemaps)
2. Wpisz: `sitemap.xml`
3. Kliknij **"Prześlij"**
4. ✅ Gotowe!

### 3.2. Sprawdź Status
- Status: **"Sukces"** (Success)
- Wykryte URL: **55 URLs**

---

## 🔍 Krok 4: Monitoruj Wydajność

### 4.1. Przejdź do "Wydajność" (Performance)
- Kliknij **"Wydajność"** w menu bocznym
- Poczekaj **2-7 dni** na pierwsze dane

### 4.2. Monitoruj 6 Focused Keywords
1. **agencja marketingowa**
2. **decision science**
3. **inżynieria konwersji**
4. **GEO positioning**
5. **zwiększenie konwersji**
6. **ROAS**

### 4.3. Metryki do Śledzenia
- **Kliknięcia** (Clicks) - liczba kliknięć w wyniki
- **Wyświetlenia** (Impressions) - ile razy strona pojawiła się w wynikach
- **CTR** (Click-Through Rate) - procent kliknięć / wyświetlenia
- **Średnia pozycja** (Average Position) - średnia pozycja w wynikach

---

## 📈 Krok 5: Optymalizacja (Po 30 Dniach)

### 5.1. Analiza Zapytań
1. Przejdź do **"Wydajność" → "Zapytania"**
2. Sprawdź które keywords mają:
   - ✅ **Wysokie wyświetlenia + niski CTR** → popraw title/description
   - ✅ **Niską pozycję** → popraw content lub dodaj więcej treści
   - ✅ **Wysoką pozycję + niskie kliknięcia** → popraw snippet

### 5.2. Indeksowanie
1. Przejdź do **"Indeksowanie" → "Strony"**
2. Sprawdź czy wszystkie 55 URLs są zindeksowane
3. Jeśli nie - kliknij **"Poproś o indeksowanie"** (Request Indexing)

### 5.3. Core Web Vitals
1. Przejdź do **"Doświadczenie" → "Core Web Vitals"**
2. Sprawdź metryki:
   - ✅ **LCP < 2.5s** (Good)
   - ✅ **FID < 100ms** (Good)
   - ✅ **CLS < 0.1** (Good)

---

## 🎯 Oczekiwane Wyniki (Po 30 Dniach)

### Metryki Bazowe
- **Wyświetlenia:** 500-1,500/miesiąc
- **Kliknięcia:** 50-150/miesiąc
- **CTR:** 5-10%
- **Średnia pozycja:** 15-30 (pierwsza strona Google)

### Metryki Docelowe (Po 90 Dniach)
- **Wyświetlenia:** 2,000-5,000/miesiąc
- **Kliknięcia:** 200-500/miesiąc
- **CTR:** 10-15%
- **Średnia pozycja:** 5-15 (top 10 Google)

---

## ⚠️ Częste Problemy

### Problem 1: "Nie można zweryfikować własności"
**Rozwiązanie:**
- Sprawdź czy GTM jest aktywny (GTM-TZX2NB5F)
- Sprawdź czy meta tag jest poprawny
- Sprawdź czy plik HTML jest dostępny publicznie

### Problem 2: "Sitemap nie może być odczytana"
**Rozwiązanie:**
- Sprawdź czy `https://boostnow.pl/sitemap.xml` jest dostępna
- Sprawdź czy sitemap ma prawidłowy format XML
- Sprawdź czy robots.txt nie blokuje sitemap

### Problem 3: "Brak danych w Wydajności"
**Rozwiązanie:**
- Poczekaj 2-7 dni na pierwsze dane
- Sprawdź czy strona jest zindeksowana
- Sprawdź czy robots.txt nie blokuje Google Bot

---

## 📚 Dodatkowe Zasoby

### Google Search Console Help
- https://support.google.com/webmasters

### Google Search Central
- https://developers.google.com/search

### Schema Markup Validator
- https://validator.schema.org

### Google Rich Results Test
- https://search.google.com/test/rich-results

---

## ✅ Checklist

- [ ] Dodaj stronę do GSC
- [ ] Zweryfikuj własność (GTM lub Meta Tag)
- [ ] Prześlij sitemap.xml
- [ ] Sprawdź indeksowanie (55 URLs)
- [ ] Monitoruj wydajność (30 dni)
- [ ] Optymalizuj na podstawie danych
- [ ] Sprawdź Core Web Vitals
- [ ] Poproś o indeksowanie nowych stron

---

**Powodzenia! 🚀**

Jeśli masz pytania, skontaktuj się z zespołem BoostNow.
