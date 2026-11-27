/**
 * Copy for the GEO positioning service page (/pozycjonowanie-geo) and the
 * call to action shown at the end of every blog article. One source for the
 * React page, the JSON-LD (server/page-meta.ts) and the static prerender.
 */
export const GEO_PATH = "/pozycjonowanie-geo";
export const GEO_FORM_ID = "formularz";

export const GEO_ARTICLE_CTA = {
  heading: "Szukasz agencji, która wypozycjonuje Twoją firmę w ChatGPT?",
  text: "Pozycjonowanie GEO od BoostNow: zaczynamy od bezpłatnego audytu, potem od 800 zł miesięcznie.",
  cta: "Wypełnij formularz kontaktowy",
  href: `${GEO_PATH}#${GEO_FORM_ID}`,
};

export const GEO_SEO = {
  title: "Pozycjonowanie GEO: Twoja firma w ChatGPT od 800 zł | BoostNow",
  description:
    "Pozycjonowanie GEO od BoostNow: Twoja firma w odpowiedziach ChatGPT, Gemini, Perplexity i Google AI. Start od bezpłatnego audytu, potem od 800 zł/mies.",
  canonical: `https://boostnow.pl${GEO_PATH}`,
  datePublished: "2026-11-27",
  dateModified: "2026-11-27",
};

export const GEO_HERO = {
  eyebrow: "Pozycjonowanie GEO",
  h1: "Twoja firma w odpowiedziach ChatGPT i Google AI",
  lead: "Klient pyta AI, kogo wybrać. Sprawimy, że asystenci AI znają Twoją firmę i ją polecają.",
  price: "Start: bezpłatny audyt. Potem od 800 zł miesięcznie.",
  cta: "Zamów bezpłatny audyt",
  microcopy: "Odpowiadamy w ciągu 24 godzin. Bez zobowiązań.",
};

export const GEO_ANSWER =
  "Pozycjonowanie GEO to praca nad tym, żeby ChatGPT, Gemini, Perplexity i Tryb AI Google polecały Twoją firmę. BoostNow zaczyna od bezpłatnego audytu: sprawdzamy, kogo AI poleca zamiast Ciebie. Potem poprawiamy stronę, treści i wzmianki o firmie. Pozycjonowanie GEO kosztuje od 800 zł miesięcznie.";

export const GEO_INCLUDED = {
  h2: "Co robimy w ramach pozycjonowania GEO?",
  items: [
    {
      title: "Bezpłatny audyt widoczności w AI",
      body: "Zadajemy ChatGPT, Gemini i Perplexity pytania Twoich klientów. Sprawdzamy, kogo polecają zamiast Ciebie.",
    },
    {
      title: "Dostęp robotów AI do strony",
      body: "Sprawdzamy robots.txt, serwer i kod strony. Na naszej własnej stronie hosting blokował roboty AI bez naszej wiedzy.",
    },
    {
      title: "Treści, które AI cytuje",
      body: "Przepisujemy ważne strony na krótkie odpowiedzi: co robisz, dla kogo, gdzie i za ile.",
    },
    {
      title: "Wzmianki o firmie w sieci",
      body: "Porządkujemy wizytówkę Google, katalogi branżowe i profil firmy w ChatGPT.",
    },
    {
      title: "Raport co miesiąc",
      body: "Powtarzamy te same pytania i liczymy polecenia. Pokazujemy ruch z ChatGPT i Gemini w Google Analytics.",
    },
  ],
};

export const GEO_PROOF = {
  h2: "Jakie wyniki dało GEO naszym klientom?",
  cases: [
    {
      name: "Caruma (cyfrowe paszporty produktów, B2B)",
      period: "90 dni",
      points: [
        "cytowania w Przeglądzie od AI Google obok KPMG i Komisji Europejskiej",
        "41 sesji z Gemini i 9 z Perplexity (Google Analytics 4)",
        "151 000 wyświetleń w Google",
      ],
    },
    {
      name: "SU-2 Kiteboards (sklep internetowy)",
      period: "120 dni",
      points: [
        "TOP 1 i TOP 2 w Google na świecie na frazy zakupowe",
        "4 razy w jednej odpowiedzi Przeglądu od AI Google",
        "widoczność w ChatGPT i Perplexity",
      ],
    },
  ],
};

export const GEO_PRICE = {
  h2: "Ile kosztuje pozycjonowanie GEO?",
  start: "Bezpłatny audyt na start",
  monthly: "od 800 zł miesięcznie",
  body: "Dokładną cenę podajemy po audycie. Zależy od branży, liczby usług i konkurencji w AI. Nie wiążemy klientów długimi umowami.",
};

export const GEO_STEPS = {
  h2: "Jak zacząć?",
  steps: [
    "Wypełniasz formularz. Zajmie Ci to 2 minuty.",
    "Robimy bezpłatny audyt i wysyłamy Ci wynik.",
    "Rozmawiamy o planie i cenie.",
    "Startujemy. Co miesiąc dostajesz raport.",
  ],
};

export const GEO_FORM = {
  h2: "Zamów bezpłatny audyt GEO",
  body: "Podaj adres strony. Sprawdzimy, czy ChatGPT i Google AI polecają Twoją firmę, i odezwiemy się w ciągu 24 godzin.",
  submit: "Wyślij i odbierz bezpłatny audyt",
  sending: "Wysyłanie…",
  consent: "Zgadzam się na kontakt w sprawie audytu i oferty BoostNow.",
  successH: "Dziękujemy! Zgłoszenie dotarło.",
  successBody: "Odezwiemy się w ciągu 24 godzin z wynikiem audytu albo pytaniem o szczegóły.",
};

export const GEO_FAQ = [
  {
    q: "Czym jest pozycjonowanie GEO?",
    a: "Pozycjonowanie GEO (Generative Engine Optimization) to praca nad tym, żeby asystenci AI polecali Twoją firmę. Dotyczy ChatGPT, Gemini, Perplexity i Trybu AI Google.",
  },
  {
    q: "Ile kosztuje pozycjonowanie GEO w BoostNow?",
    a: "Audyt na start jest bezpłatny. Pozycjonowanie GEO kosztuje od 800 zł miesięcznie. Dokładną cenę podajemy po audycie.",
  },
  {
    q: "Czy gwarantujecie, że ChatGPT poleci moją firmę?",
    a: "Nie. Nikt nie kontroluje odpowiedzi ChatGPT. Poprawiamy to, od czego zależy polecenie: dostęp robotów, treść strony i wzmianki o firmie. Efekt mierzymy co miesiąc.",
  },
  {
    q: "Kiedy zobaczę efekty?",
    a: "Z naszych wdrożeń: pierwsze cytowania w Perplexity pojawiają się po około 30 dniach. W Przeglądzie od AI Google zwykle po 60–90 dniach.",
  },
  {
    q: "Czy GEO zastępuje SEO?",
    a: "Nie. GEO opiera się na SEO, bo asystenci AI korzystają z wyników wyszukiwarek. W audycie sprawdzamy oba kanały.",
  },
];
