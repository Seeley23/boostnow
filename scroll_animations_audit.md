# Audyt Animacji Scroll - BoostNow

## 1. SolutionSection - "Masz 0.4 sekundy"
- **Animacje:** ✅ `motion.div` z `containerVariants` i `itemVariants`
- **Efekt:** Fade-in + slide-up na scroll
- **Kod:** `initial="hidden"` → `whileInView="visible"`

## 2. IndustriesSection - "Personalizowanie w zależności od branży"
- **Animacje:** ❌ Brak motion/framer-motion
- **Efekt:** Statyczne - brak animacji
- **Kod:** Zwykły `<div>` bez animacji

## 3. VideoAnimationSection - "Co robimy?"
- **Animacje:** ✅ `motion.div` z `containerVariants` i `itemVariants`
- **Efekt:** Fade-in + slide-up na scroll
- **Kod:** `initial="hidden"` → `whileInView="visible"`

## 4. ComparisonSection - "Czym się różnimy?"
- **Animacje:** ✅ `motion.div` z fade-in
- **Efekt:** Fade-in na scroll
- **Kod:** `initial={{ opacity: 0, y: 30 }}` → `whileInView={{ opacity: 1, y: 0 }}`

## 5. RecentArticlesSection - "Architekci Decyzji dzielą się wiedzą"
- **Animacje:** ✅ `motion.div` z fade-in
- **Efekt:** Fade-in na scroll
- **Kod:** `initial={{ opacity: 0, y: 30 }}` → `whileInView={{ opacity: 1, y: 0 }}`

## 6. FAQSection - "Odpowiedzi na Twoje pytania"
- **Animacje:** ❌ Brak motion/framer-motion
- **Efekt:** Statyczne - brak animacji
- **Kod:** Zwykły `<div>` bez animacji

---

## PROBLEMY:

1. **IndustriesSection:** Brak animacji - statyczne
2. **FAQSection:** Brak animacji - statyczne

## ROZWIĄZANIE:

Dodać `motion.div` z animacjami fade-in + slide-up do:
1. IndustriesSection - header i content
2. FAQSection - header

Użyć tego samego pattern co SolutionSection i VideoAnimationSection:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```
