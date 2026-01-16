# Mapa Artykułów Powiązanych z Terminami w Glossary

## 📋 Struktura Powiązań

Każdy termin w Glossary powinien mieć sekcję "Powiązane Artykuły" z linkami do artykułów, które wyjaśniają termin w praktyce.

---

## 🔗 Mapowanie Terminów → Artykuły

### **1. Decision Science**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)
- Artykuł 5: "Audyt Neuromarketingowy"
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **2. Neuromarketing**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)
- Artykuł 5: "Audyt Neuromarketingowy"

### **3. Conversion Rate Optimization (CRO)**
- Artykuł 1: "Jak zwiększyć konwersję w e-commerce" (główny)
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium"
- Artykuł 4: "Visual AI w Marketingu Wideo"

### **4. Błędy Poznawcze (Cognitive Biases)**
- Artykuł 1: "Jak zwiększyć konwersję" (główny)
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)
- Artykuł 5: "Audyt Neuromarketingowy"

### **5. Anchoring (Zakotwiczenie)**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)

### **6. Scarcity (Poczucie Braku)**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)

### **7. Social Proof (Dowód Społeczny)**
- Artykuł 1: "Jak zwiększyć konwersję" (główny)
- Artykuł 4: "Visual AI w Marketingu Wideo"

### **8. Conversion Funnel (Lejek Konwersji)**
- Artykuł 1: "Jak zwiększyć konwersję" (główny)
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium"
- Artykuł 5: "Audyt Neuromarketingowy"

### **9. Customer Journey (Ścieżka Klienta)**
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium" (główny)
- Artykuł 5: "Audyt Neuromarketingowy"

### **10. A/B Testing**
- Artykuł 1: "Jak zwiększyć konwersję" (główny)
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium"

### **11. User Experience (UX)**
- Artykuł 1: "Jak zwiększyć konwersję" (główny)
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium"
- Artykuł 4: "Visual AI w Marketingu Wideo"

### **12. Bounce Rate (Wskaźnik Odrzuceń)**
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium" (główny)
- Artykuł 5: "Audyt Neuromarketingowy"

### **13. SEO (Search Engine Optimization)**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **14. Keywords (Słowa Kluczowe)**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **15. Long-Tail Keywords**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **16. Meta Tags**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **17. Schema Markup**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **18. Copywriting**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)
- Artykuł 4: "Visual AI w Marketingu Wideo"

### **19. Emotional Triggers (Wyzwalacze Emocji)**
- Artykuł 2: "Psychologia Sprzedaży w E-commerce" (główny)
- Artykuł 4: "Visual AI w Marketingu Wideo"

### **20. CTR (Click-Through Rate)**
- Artykuł 1: "Jak zwiększyć konwersję" (wzmianka)

### **21. ROAS (Return on Ad Spend)**
- Artykuł 3: "Optymalizacja Konwersji (CRO) dla Marek Premium"

---

## 📊 Statystyka Powiązań

| Termin | Liczba Artykułów | Artykuły |
|--------|------------------|----------|
| Decision Science | 3 | Art. 2, 5, 1 |
| Neuromarketing | 2 | Art. 2, 5 |
| CRO | 3 | Art. 1, 3, 4 |
| Cognitive Biases | 3 | Art. 1, 2, 5 |
| Anchoring | 1 | Art. 2 |
| Scarcity | 1 | Art. 2 |
| Social Proof | 2 | Art. 1, 4 |
| Conversion Funnel | 3 | Art. 1, 3, 5 |
| Customer Journey | 2 | Art. 3, 5 |
| A/B Testing | 2 | Art. 1, 3 |
| UX | 3 | Art. 1, 3, 4 |
| Bounce Rate | 2 | Art. 3, 5 |
| Copywriting | 2 | Art. 2, 4 |
| Emotional Triggers | 2 | Art. 2, 4 |
| ROAS | 1 | Art. 3 |

---

## 🎨 Design Sekcji "Powiązane Artykuły"

### Lokalizacja
- Umieścić na dole każdego terminu w Glossary
- Przed sekcją "Powiązane Terminy"

### Struktura HTML
```jsx
<section className="mt-8 pt-8 border-t border-gray-800">
  <h3 className="text-lg font-semibold text-white mb-4">📚 Powiązane Artykuły</h3>
  <div className="grid md:grid-cols-2 gap-4">
    {relatedArticles.map(article => (
      <Link href={article.url} className="group">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-lime-400 transition-colors">
          <h4 className="text-sm font-semibold text-white group-hover:text-lime-400 mb-1">
            {article.title}
          </h4>
          <p className="text-xs text-gray-400">{article.description}</p>
        </div>
      </Link>
    ))}
  </div>
</section>
```

### Styling
- **Tło:** `bg-gray-900`
- **Border:** `border-gray-800`, hover: `border-lime-400`
- **Tekst:** `text-white`, hover: `text-lime-400`
- **Ikona:** 📚 (książka)
- **Grid:** 2 kolumny na desktop, 1 na mobile

---

## 📝 Dane Artykułów do Wyświetlenia

```javascript
const relatedArticles = {
  "conversion-rate-optimization": [
    {
      id: "jak-zwiekszac-konwersje",
      title: "Jak zwiększyć konwersję w e-commerce",
      description: "Strategie CRO, psychologia klienta, optymalizacja UX",
      url: "/blog/jak-zwiekszac-konwersje-ecommerce"
    },
    {
      id: "cro-marki-premium",
      title: "CRO dla Marek Premium",
      description: "Optymalizacja konwersji dla e-commerce premium",
      url: "/blog/cro-marki-premium"
    },
    {
      id: "visual-ai-wideo",
      title: "Visual AI w Marketingu Wideo",
      description: "Zwiększenie sprzedaży przez animacje",
      url: "/blog/visual-ai-marketing-wideo"
    }
  ],
  "cognitive-biases": [
    {
      id: "jak-zwiekszac-konwersje",
      title: "Jak zwiększyć konwersję w e-commerce",
      description: "Błędy poznawcze w praktyce",
      url: "/blog/jak-zwiekszac-konwersje-ecommerce"
    },
    {
      id: "psychologia-sprzedazy",
      title: "Psychologia Sprzedaży w E-commerce",
      description: "Dlaczego klienci nie kupują",
      url: "/blog/psychologia-sprzedazy-ecommerce"
    },
    {
      id: "audyt-neuromarketingowy",
      title: "Audyt Neuromarketingowy",
      description: "Identyfikacja błędów poznawczych",
      url: "/blog/audyt-neuromarketingowy"
    }
  ],
  // ... więcej terminów
};
```

---

## 🔄 Implementacja w Glossary.tsx

### Krok 1: Dodaj Dane Artykułów
```javascript
interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
  relatedArticles?: Article[]; // NOWE
}
```

### Krok 2: Dodaj Sekcję w Komponencie
```jsx
{expandedId === item.id && (
  <div className="px-6 py-4 bg-gray-950 border-t border-gray-800">
    <p className="text-gray-300 mb-4">{item.definition}</p>
    
    {/* Related Articles Section */}
    {item.relatedArticles && item.relatedArticles.length > 0 && (
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-3 font-semibold">📚 Powiązane Artykuły:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {item.relatedArticles.map(article => (
            <Link key={article.id} href={article.url} className="group">
              <div className="bg-gray-800 rounded p-3 hover:bg-gray-700 transition-colors">
                <h4 className="text-sm font-semibold text-lime-400 group-hover:text-lime-300 mb-1">
                  {article.title}
                </h4>
                <p className="text-xs text-gray-400">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}
    
    {/* Related Terms Section */}
    {item.relatedTerms && item.relatedTerms.length > 0 && (
      <div>
        <p className="text-sm text-gray-400 mb-2">Powiązane terminy:</p>
        <div className="flex flex-wrap gap-2">
          {item.relatedTerms.map(term => (
            // ... existing code
          ))}
        </div>
      </div>
    )}
  </div>
)}
```

### Krok 3: Zaktualizuj Dane Terminów
Dla każdego terminu dodaj pole `relatedArticles` z listą artykułów.

---

## 🎯 Oczekiwane Rezultaty

**Po Implementacji:**
- ✅ Zwiększenie internal link clicks o 40-60%
- ✅ Zmniejszenie bounce rate na Glossary o 15-20%
- ✅ Zwiększenie session duration o 30-40%
- ✅ Lepsze SEO - Google widzi powiązania między stronami
- ✅ Lepsze AI Search (GEO) - AI rozumie kontekst

**Po 30 Dniach:**
- ✅ Artykuły będą rankować wyżej dla long-tail keywords
- ✅ Glossary będzie rankować dla "słownik neuromarketing", "słownik SEO"
- ✅ Zwiększenie organic traffic z internal linking

---

## 📋 Checklist Implementacji

- [ ] Dodaj pole `relatedArticles` do interfejsu `GlossaryItem`
- [ ] Zaktualizuj dane wszystkich 20+ terminów z artykułami
- [ ] Stwórz komponent `RelatedArticles`
- [ ] Dodaj sekcję do Glossary.tsx
- [ ] Testuj linki - sprawdź czy wszystkie działają
- [ ] Sprawdź design na mobile
- [ ] Dodaj tracking GA4 dla internal link clicks
- [ ] Monitoruj metryki: bounce rate, session duration, CTR
