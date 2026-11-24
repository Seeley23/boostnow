/**
 * Copy for /audyt-ai-dla-sklepu. Kept in one place so A/B variants and
 * source-specific messages change the text without touching the layout.
 */

export type LandingVariant = "A" | "B";

export const HERO_VARIANTS: Record<
  LandingVariant,
  { h1: string; lead: string; supporting: string; cta: string; microcopy: string }
> = {
  // A: loss angle
  A: {
    h1: "Czy AI może pomijać Twój sklep?",
    lead: "Gdy klient pyta ChatGPT o produkt, czy Twój sklep ma szansę zostać uwzględniony?",
    supporting:
      "Sprawdź, czy produkty z Twojego sklepu są łatwe do znalezienia, zrozumienia i porównania przez narzędzia AI.",
    cta: "Sprawdź mój sklep",
    microcopy: "Bezpłatny audyt z trzema najważniejszymi rzeczami do poprawy.",
  },
  // B: competition angle
  B: {
    h1: "Gdy klient pyta AI, czy Twój sklep jest wśród polecanych?",
    lead: "ChatGPT i agenci zakupowi AI mogą pomagać klientom znaleźć i porównać produkty. Sprawdź, czy Twój sklep jest przygotowany, aby zostać uwzględnionym.",
    supporting:
      "Otrzymasz bezpłatną analizę tego, co może ograniczać szansę sklepu na zdobywanie klientów z AI.",
    cta: "Odbierz analizę sklepu",
    microcopy: "Bez ogólnej checklisty. Otrzymasz konkretne priorytety.",
  },
};

/** Variant C stays behind a flag until traffic is large enough for A/B/C. */
export const ENABLE_VARIANT_C = false;
export const HERO_VARIANT_C = {
  h1: "Czy Twój sklep jest gotowy na klientów z AI?",
  lead: "Sprawdź, czy produkty i informacje o Twoim sklepie są przygotowane do odczytania, porównania i polecenia przez ChatGPT oraz agentów zakupowych AI.",
  cta: "Odbierz bezpłatny audyt",
};

/** Short line above the H1, matched to the traffic source (utm_source). */
export const SOURCE_MESSAGES: Record<string, string> = {
  linkedin: "Zgłoś sklep do bezpłatnej analizy gotowości na klientów z AI.",
  google: "Sprawdź, czy AI może pomijać Twój sklep.",
  meta: "Przygotuj sklep na nowy sposób wyboru produktów.",
  facebook: "Przygotuj sklep na nowy sposób wyboru produktów.",
  instagram: "Przygotuj sklep na nowy sposób wyboru produktów.",
};

export const PROBLEM = {
  h2: "Klient pyta AI. Czy AI pokaże Twój sklep?",
  body: [
    "Klient może poprosić AI o znalezienie produktu, porównanie ofert i wskazanie najlepszego sklepu.",
    "Jeśli narzędzie nie potrafi poprawnie odczytać informacji o Twoich produktach albo nie znajduje wystarczających informacji o sklepie, może uwzględnić lepiej przygotowaną konkurencję.",
  ],
  lossHeading: "Możesz stracić:",
  losses: ["możliwość dotarcia do nowego klienta,", "wejście na stronę,", "sprzedaż,", "przychód z nowego kanału."],
  closing:
    "Straconego czasu później nie będzie łatwo nadrobić, bo wiarygodność i kompletne informacje buduje się stopniowo.",
};

export const PREVIEW = {
  h2: "Nie dostaniesz ogólnej porady. Dostaniesz konkretny wynik.",
  body: "Audyt pokaże, co może ograniczać przygotowanie Twojego sklepu do pozyskiwania klientów z AI i co warto poprawić w pierwszej kolejności.",
  label: "Przykładowy wynik audytu",
  title: "Gotowość sklepu do kanałów AI",
  scores: [
    { name: "Produkty", value: 55 },
    { name: "Informacje zakupowe", value: 40 },
    { name: "Wiarygodność sklepu", value: 31 },
  ],
  priorityLabel: "Największy priorytet",
  priority: "Uporządkować informacje, które pozwalają AI porównać produkty i warunki zakupu.",
  disclaimer:
    "Wynik jest wskaźnikiem diagnostycznym BoostNow. Nie gwarantuje wyświetlenia ani polecenia sklepu przez konkretne narzędzie AI.",
};

export const SCOPE = {
  h2: "Co sprawdzimy w Twoim sklepie?",
  cards: [
    { title: "Czy AI rozumie, co sprzedajesz?", body: "Sprawdzimy, czy produkty mają kompletne i spójne informacje." },
    { title: "Czy AI może porównać Twoją ofertę?", body: "Sprawdzimy ceny, warianty, dostępność, dostawę i zwroty." },
    { title: "Czy sklep budzi zaufanie?", body: "Sprawdzimy informacje o firmie, opinie i elementy wiarygodności." },
    { title: "Co poprawić najpierw?", body: "Otrzymasz trzy priorytety zamiast długiej listy ogólnych zaleceń." },
  ],
};

export const WHY_NOW = {
  h2: "Warto zacząć, zanim ten kanał stanie się standardem.",
  body: [
    "Sklep, który wcześniej uporządkuje produkty, informacje i treści, będzie miał więcej czasu na budowanie wiarygodności.",
    "Sklepy, które zaczną dopiero wtedy, gdy konkurencja będzie już obecna w kanałach AI, będą musiały nadrabiać stracony czas.",
  ],
};

export const FORM = {
  h2: "Sprawdź, czy Twój sklep jest przygotowany na klientów z AI",
  body: "Wpisz adres sklepu. Przygotujemy bezpłatny audyt z najważniejszymi problemami i priorytetami działań.",
  fields: {
    storeUrl: { label: "Adres sklepu", placeholder: "https://twojsklep.pl" },
    firstName: { label: "Imię", placeholder: "Jak masz na imię?" },
    email: { label: "E-mail", placeholder: "ty@twojsklep.pl" },
    platform: { label: "Platforma sklepu (opcjonalnie)", placeholder: "Wybierz platformę" },
  },
  // Spec list plus the two platforms most Polish shops run on.
  platforms: ["Shopify", "WooCommerce", "PrestaShop", "Shoper", "IdoSell", "Inna", "Nie wiem"],
  operationalConsent:
    "Potwierdzam, że podany adres e-mail może zostać wykorzystany do przesłania zamówionego audytu oraz kontaktu dotyczącego jego realizacji.",
  marketingConsent:
    "Chcę otrzymywać od BoostNow informacje o przygotowaniu sklepów internetowych do pozyskiwania klientów z ChatGPT i agentów AI, w tym materiały, analizy i informacje o usługach. Wiem, że mogę wycofać zgodę w dowolnym momencie.",
  privacyPrefix: "Administratorem danych jest BoostNow. Szczegóły w ",
  privacyLink: "polityce prywatności",
  cta: "Odbierz bezpłatny audyt",
  loading: "Przygotowujemy zgłoszenie…",
  error: "Nie udało się wysłać zgłoszenia. Sprawdź dane i spróbuj ponownie.",
};

export const CREDIBILITY = {
  h2: "Dlaczego robimy ten audyt?",
  body: "Analizujemy sklepy internetowe pod kątem nowych sposobów wyszukiwania i wyboru produktów. Chcemy pokazać właścicielom sklepów, co warto uporządkować, zanim konkurencja zacznie budować przewagę w kanałach AI.",
  name: "Mateusz Nowotka",
  company: "BoostNow",
  authorHref: "/mateusz-nowotka",
};

export const FAQ = [
  {
    q: "Czy audyt jest bezpłatny?",
    a: "Tak. Otrzymasz krótką analizę z najważniejszym problemem i trzema priorytetami działań.",
  },
  {
    q: "Co muszę podać?",
    a: "Adres sklepu, imię i e-mail. Platforma sklepu jest opcjonalna.",
  },
  {
    q: "Czy audyt gwarantuje, że ChatGPT poleci mój sklep?",
    a: "Nie. Audyt pokazuje, co może ograniczać przygotowanie sklepu i jakie działania mogą zwiększyć szansę na zdobywanie klientów z kanałów AI.",
  },
  {
    q: "Co mogę zrobić po otrzymaniu audytu?",
    a: "Możesz wdrożyć zalecenia samodzielnie albo umówić rozmowę z BoostNow, aby omówić możliwy zakres prac.",
  },
];

export const FINAL_CTA = {
  h2: "Sprawdź, czy AI może pomijać Twój sklep",
  body: "Zobacz, co warto poprawić, zanim konkurencja zacznie budować przewagę w tym kanale.",
  cta: "Odbierz bezpłatny audyt",
};

export const SUCCESS = {
  h1: "Zgłoszenie otrzymane",
  body: "Przygotujemy analizę i wyślemy ją na podany adres.",
  nextHeading: "Chcesz omówić wynik szybciej?",
  nextBody:
    "Umów krótką rozmowę. Pokażemy, co ogranicza przygotowanie Twojego sklepu i jakie działania mają największy priorytet.",
  cta: "Umów rozmowę o wdrożeniu",
  secondary: "Wróć na stronę BoostNow",
};

/**
 * Where "Umów rozmowę o wdrożeniu" leads. BoostNow has no booking calendar yet,
 * so this opens an e-mail. Replace with a Google Calendar appointment page
 * (or similar) when one exists.
 */
export const BOOKING_URL =
  "mailto:kontakt@boostnow.pl?subject=" +
  encodeURIComponent("Rozmowa o wdrożeniu: audyt AI sklepu");

export const SEO = {
  title: "Bezpłatny audyt sklepu internetowego w ChatGPT | BoostNow",
  description:
    "Sprawdź, czy Twój sklep jest przygotowany na zdobywanie klientów z ChatGPT i agentów zakupowych AI. Odbierz bezpłatny audyt i poznaj najważniejsze priorytety.",
  canonical: "https://boostnow.pl/audyt-ai-dla-sklepu",
};
