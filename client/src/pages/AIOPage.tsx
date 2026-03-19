import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { trpc } from "@/lib/trpc";

/* ─────────────────────────────────────────────
   AIO PAGE – AI Optimization for E-commerce
   BoostNow | Premium B2B Performance Landing
   Colors: #0b1020 | #c7ff4e | #00c88a | #f7f8fa
   ───────────────────────────────────────────── */

const LIME = "#c7ff4e";
const EMERALD = "#00c88a";
const NAVY = "#0b1020";

// ── Reusable fade-in wrapper ──────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Stat card ─────────────────────────────────
function StatCard({
  number,
  label,
  sub,
}: {
  number: string;
  label: string;
  sub?: string;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-8 rounded-2xl border"
      style={{
        background: "rgba(199,255,78,0.04)",
        borderColor: "rgba(199,255,78,0.18)",
      }}
    >
      <span
        className="text-5xl md:text-6xl font-black tracking-tight"
        style={{ color: LIME }}
      >
        {number}
      </span>
      <span className="text-lg font-semibold text-white">{label}</span>
      {sub && (
        <span className="text-sm" style={{ color: "rgba(247,248,250,0.5)" }}>
          {sub}
        </span>
      )}
    </div>
  );
}

// ── Step card ─────────────────────────────────
function StepCard({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      <div
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
        style={{ background: LIME, color: NAVY }}
      >
        {num}
      </div>
      <div>
        <p className="font-bold text-white text-lg mb-1">{title}</p>
        <p style={{ color: "rgba(247,248,250,0.6)" }} className="text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

// ── FAQ item ──────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(247,248,250,0.1)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center py-5 gap-4">
        <span className="font-semibold text-white text-base md:text-lg">{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-transform duration-300"
          style={{
            background: "rgba(199,255,78,0.12)",
            color: LIME,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "rgba(247,248,250,0.6)" }}
        >
          {a}
        </p>
      </motion.div>
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", domain: "", industry: "" });
  const [regulamin, setRegulamin] = useState(false);
  const [regulaminError, setRegulaminError] = useState(false);

  const submitMutation = trpc.aio.submit.useMutation();

  const inputStyle = {
    background: "rgba(247,248,250,0.06)",
    border: "1px solid rgba(247,248,250,0.12)",
  };
  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = LIME);
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.target.style.borderColor = "rgba(247,248,250,0.12)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regulamin) { setRegulaminError(true); return; }
    setRegulaminError(false);
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      domain: form.domain,
      industry: form.industry || undefined,
    });
  };

  if (submitMutation.isSuccess) {
    return (
      <div className="text-center py-16">
        <div
          className="inline-flex w-16 h-16 rounded-full items-center justify-center mb-6 text-3xl"
          style={{ background: "rgba(0,200,138,0.15)", color: EMERALD }}
        >
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Zgłoszenie wysłane</h3>
        <p style={{ color: "rgba(247,248,250,0.6)" }}>
          Odezwiemy się i pokażemy, jak możemy ustawić Twoją firmę w wynikach AI.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: "rgba(247,248,250,0.7)" }}>
            Imię *
          </label>
          <input
            required
            type="text"
            placeholder="Jan Kowalski"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium" style={{ color: "rgba(247,248,250,0.7)" }}>
            E-mail *
          </label>
          <input
            required
            type="email"
            placeholder="jan@firma.pl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
            style={inputStyle}
            onFocus={focusStyle}
            onBlur={blurStyle}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "rgba(247,248,250,0.7)" }}>
          Adres strony / domena *
        </label>
        <input
          required
          type="text"
          placeholder="twojastrona.pl"
          value={form.domain}
          onChange={(e) => setForm({ ...form, domain: e.target.value })}
          className="px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
          style={inputStyle}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" style={{ color: "rgba(247,248,250,0.7)" }}>
          Branża (opcjonalnie)
        </label>
        <input
          type="text"
          placeholder="np. e-commerce, usługi, B2B, lokalny biznes..."
          value={form.industry}
          onChange={(e) => setForm({ ...form, industry: e.target.value })}
          className="px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
          style={inputStyle}
          onFocus={focusStyle}
          onBlur={blurStyle}
        />
      </div>

      {/* Regulamin checkbox */}
      <div className="flex items-start gap-3 mt-1">
        <button
          type="button"
          role="checkbox"
          aria-checked={regulamin}
          onClick={() => { setRegulamin(!regulamin); setRegulaminError(false); }}
          className="mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all"
          style={{
            background: regulamin ? LIME : "rgba(247,248,250,0.06)",
            border: regulaminError
              ? "1.5px solid #ff4e4e"
              : regulamin
              ? `1.5px solid ${LIME}`
              : "1.5px solid rgba(247,248,250,0.25)",
          }}
        >
          {regulamin && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="#0b1020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <p className="text-xs leading-relaxed" style={{ color: regulaminError ? "#ff6b6b" : "rgba(247,248,250,0.5)" }}>
          Akceptuję{" "}
          <Link href="/regulamin" className="underline hover:text-white transition-colors">
            Regulamin
          </Link>{" "}
          i{" "}
          <Link href="/polityka-prywatnosci" className="underline hover:text-white transition-colors">
            Politykę Prywatności
          </Link>{" "}
          BoostNow. Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zgłoszenia. *
        </p>
      </div>
      {regulaminError && (
        <p className="text-xs" style={{ color: "#ff6b6b" }}>
          Musisz zaakceptować regulamin, aby wysłać zgłoszenie.
        </p>
      )}

      {submitMutation.isError && (
        <p className="text-sm text-center" style={{ color: "#ff6b6b" }}>
          Wystąpił błąd. Spróbuj ponownie lub napisz na kontakt@boostnow.pl
        </p>
      )}

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="mt-2 py-4 px-8 rounded-xl font-black text-base tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        style={{ background: LIME, color: NAVY }}
      >
        {submitMutation.isPending ? "Wysyłanie..." : "Zgłoś firmę do AIO →"}
      </button>
      <p className="text-xs text-center" style={{ color: "rgba(247,248,250,0.4)" }}>
        Odezwiemy się i pokażemy, jak możemy ustawić Twoją firmę w wynikach AI.
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function AIOPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div style={{ background: NAVY, color: "#f7f8fa" }} className="min-h-screen">
      <Helmet>
        <title>AIO – Pozycjonowanie w AI | BoostNow</title>
        <meta
          name="description"
          content="Pozycjonowanie stron w AI — ChatGPT, Perplexity, Gemini. BoostNow wdraża AIO i sprawia, że Twoja firma pojawia się w odpowiedziach AI."
        />
        <meta
          name="keywords"
          content="AIO, AI Optimization, pozycjonowanie w AI, ChatGPT SEO, Perplexity SEO, Gemini SEO, optymalizacja pod AI, widoczność w AI, pozycjonowanie stron, agencja SEO, BoostNow"
        />
      </Helmet>

      <Navigation />

      {/* ── 1. HERO ─────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "rgba(199,255,78,0.07)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "rgba(0,200,138,0.06)" }}
        />

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          {/* Badge */}
          <FadeIn>
            <div className="flex justify-center mb-8">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(199,255,78,0.1)",
                  border: "1px solid rgba(199,255,78,0.3)",
                  color: LIME,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: LIME }}
                />
                Nowy standard – AIO: Pozycjonowanie w AI
              </span>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[0.95] tracking-tight mb-8"
            >
              AI już decyduje,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${LIME} 0%, ${EMERALD} 100%)`,
                }}
              >
                kogo poleca.
              </span>
            </h1>
          </FadeIn>

          {/* Sub */}
          <FadeIn delay={0.2}>
            <p
              className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ color: "rgba(247,248,250,0.65)" }}
            >
              Pytanie brzmi: czy Twoja firma — czy{" "}
              <span className="text-white font-semibold">konkurencji?</span>
              <br />
              W BoostNow ustawiamy strony i marki tak, żeby AI zaczęła je rekomendować.
            </p>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-xl font-black text-lg tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                style={{
                  background: LIME,
                  color: NAVY,
                  boxShadow: `0 0 40px rgba(199,255,78,0.25)`,
                }}
              >
                Chcę być widoczny w AI →
              </button>
              <span
                className="text-sm font-medium"
                style={{ color: "rgba(247,248,250,0.45)" }}
              >
                Pierwsze efekty nawet w 10 dni
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 2. PROBLEM ──────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: "#0d1326" }}>
        <div className="container max-w-4xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6 text-center"
              style={{ color: LIME }}
            >
              Zmiana rynku
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-12">
              Klient już nie scrolluje.
              <br />
              <span style={{ color: "rgba(247,248,250,0.4)" }}>Pyta AI.</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔍",
                title: "Kiedyś",
                desc: "Klient wpisywał frazę w Google i scrollował wyniki. Twoja reklama mogła go złapać.",
                muted: true,
              },
              {
                icon: "⚡",
                title: "Dziś",
                desc: "Klient pyta ChatGPT, Perplexity lub Gemini: \"Jaka firma to robi?\" — i dostaje gotową rekomendację.",
                muted: false,
              },
              {
                icon: "🎯",
                title: "Jutro",
                desc: "AI będzie filtrować 30–50% zapytań przed Google. Kto nie jest zoptymalizowany pod AI, nie istnieje.",
                muted: false,
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="p-7 rounded-2xl h-full"
                  style={{
                    background: item.muted
                      ? "rgba(247,248,250,0.03)"
                      : "rgba(199,255,78,0.05)",
                    border: `1px solid ${
                      item.muted
                        ? "rgba(247,248,250,0.08)"
                        : "rgba(199,255,78,0.15)"
                    }`,
                  }}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{
                      color: item.muted ? "rgba(247,248,250,0.3)" : LIME,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: item.muted
                        ? "rgba(247,248,250,0.35)"
                        : "rgba(247,248,250,0.75)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. CO SIĘ ZMIENIŁO ──────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: EMERALD }}
              >
                To nie jest SEO
              </p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                Rynek zmienił się.
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${LIME}, ${EMERALD})`,
                  }}
                >
                  Zasady też.
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(247,248,250,0.6)" }}
              >
                SEO optymalizuje pod Google. AIO optymalizuje pod AI — ChatGPT, Perplexity, 
                Gemini, Copilot i asystentów, którzy coraz częściej są pierwszym punktem kontaktu klienta z marką.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(247,248,250,0.6)" }}
              >
                InPost uruchomił asystenta AI. Allegro testuje rekomendacje AI. 
                Klienci pytają AI o firmy, usługi, specjalistów i produkty — zanim wejdą na stronę.
                Agencje, sklepy, kancelarie, gabinety, deweloperzy — każda branża jest już w grze.
                To nie jest przyszłość — to dzieje się teraz.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "SEO",
                    desc: "Optymalizacja pod algorytmy Google. Widoczność w wynikach wyszukiwania.",
                    active: false,
                  },
                  {
                    label: "AIO",
                    desc: "Optymalizacja pod modele AI. Twoja firma i strona w odpowiedziach ChatGPT, Perplexity i Gemini.",
                    active: true,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl"
                    style={{
                      background: item.active
                        ? "rgba(199,255,78,0.07)"
                        : "rgba(247,248,250,0.03)",
                      border: `1px solid ${
                        item.active
                          ? "rgba(199,255,78,0.25)"
                          : "rgba(247,248,250,0.08)"
                      }`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-black"
                        style={{
                          background: item.active ? LIME : "rgba(247,248,250,0.08)",
                          color: item.active ? NAVY : "rgba(247,248,250,0.4)",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.active && (
                        <span
                          className="text-xs font-bold"
                          style={{ color: LIME }}
                        >
                          Nowy standard
                        </span>
                      )}
                    </div>
                    <p
                      className="text-sm"
                      style={{
                        color: item.active
                          ? "rgba(247,248,250,0.75)"
                          : "rgba(247,248,250,0.35)",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}

                <div
                  className="p-5 rounded-2xl mt-2"
                  style={{
                    background: "rgba(0,200,138,0.08)",
                    border: "1px solid rgba(0,200,138,0.2)",
                  }}
                >
                  <p className="text-sm font-semibold" style={{ color: EMERALD }}>
                    ⚡ Okno przewagi jest teraz.
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(247,248,250,0.5)" }}
                  >
                    Kto wdroży AIO jako pierwszy w swojej branży, zbuduje pozycję, 
                    której konkurencja nie odbierze przez lata.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. CO ROZWIĄZUJE BOOSTNOW ───────────── */}
      <section className="py-24 md:py-32" style={{ background: "#0d1326" }}>
        <div className="container max-w-5xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Usługa wdrożeniowa
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-4">
              Co robi BoostNow.
            </h2>
            <p
              className="text-center text-lg mb-16 max-w-xl mx-auto"
              style={{ color: "rgba(247,248,250,0.5)" }}
            >
              Nie dajesz nam narzędzia i sam analizujesz. My wdrażamy. Ty zbierasz wyniki.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                num: "01",
                title: "Analiza obecności w AI",
                desc: "Sprawdzamy, jak modele AI postrzegają Twoją firmę i stronę. Co cytują, co pomijają, gdzie jest luka.",
              },
              {
                num: "02",
                title: "Przebudowa treści i opisów",
                desc: "Przepisujemy opisy produktów, kategorie i treści tak, żeby AI je rozumiała i chciała cytować.",
              },
              {
                num: "03",
                title: "Struktura danych i sygnały",
                desc: "Wdrażamy schema markup, dane strukturalne i sygnały autorytetu, które AI bierze pod uwagę przy rekomendacjach.",
              },
              {
                num: "04",
                title: "Pozycjonowanie w AI",
                desc: "Twoja firma zaczyna pojawiać się w odpowiedziach ChatGPT, Perplexity, Gemini i innych modeli AI.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="p-7 rounded-2xl h-full"
                  style={{
                    background: "rgba(247,248,250,0.03)",
                    border: "1px solid rgba(247,248,250,0.08)",
                  }}
                >
                  <span
                    className="text-xs font-black tracking-widest mb-4 block"
                    style={{ color: "rgba(199,255,78,0.5)" }}
                  >
                    {item.num}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247,248,250,0.55)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROOF / WYNIKI ───────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Wyniki
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-16">
              Liczby mówią same.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            <FadeIn delay={0}>
              <StatCard
                number="10+"
                label="Bezpośrednich cytowań w AI"
                sub="Osiągnięte w pierwszym wdrożeniu"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <StatCard
                number="10 dni"
                label="Do pierwszych efektów"
                sub="Pierwsze cytowania w odpowiedziach AI"
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <StatCard
                number="3 kroki"
                label="Do wdrożenia AIO"
                sub="Zgłoszenie → Analiza → Wdrożenie"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div
              className="p-8 rounded-2xl text-center"
              style={{
                background: "rgba(0,200,138,0.06)",
                border: "1px solid rgba(0,200,138,0.18)",
              }}
            >
              <p className="text-lg font-semibold text-white mb-2">
                "Nasza firma zaczęła pojawiać się w odpowiedziach ChatGPT. 
                Klienci piszą, że znaleźli nas przez AI."
              </p>
              <p className="text-sm" style={{ color: "rgba(247,248,250,0.4)" }}>
                — Klient BoostNow, branża usługowa
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 6. DLACZEGO TERAZ ───────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "#0d1326" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(199,255,78,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Okno przewagi
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-8">
              Dlaczego działać teraz,
              <br />
              <span style={{ color: "rgba(247,248,250,0.35)" }}>nie za rok?</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: "Dziś: niska konkurencja w AI",
                desc: "Większość firm nie wie jeszcze, że AIO istnieje. Kto wejdzie teraz, buduje pozycję bez walki.",
                color: LIME,
              },
              {
                title: "Za rok: tłok i wyższe koszty",
                desc: "Gdy AIO stanie się standardem, wejście będzie droższe, trudniejsze i mniej skuteczne.",
                color: "rgba(247,248,250,0.3)",
              },
              {
                title: "AI uczy się na danych",
                desc: "Im wcześniej Twoja firma pojawia się w odpowiedziach AI, tym silniejszy sygnał autorytetu budujesz.",
                color: LIME,
              },
              {
                title: "Konkurencja nie śpi",
                desc: "Twój największy konkurent może już testować AIO. Każdy dzień zwłoki to jego przewaga.",
                color: "rgba(247,248,250,0.3)",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="p-6 rounded-2xl h-full"
                  style={{
                    background: "rgba(247,248,250,0.03)",
                    border: `1px solid rgba(247,248,250,0.08)`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-4"
                    style={{ background: item.color }}
                  />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247,248,250,0.55)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DLA KOGO ─────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container max-w-5xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Dla kogo
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-center leading-tight mb-16">
              To jest dla Ciebie, jeśli...
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "🛒",
                title: "Sklep e-commerce",
                desc: "Sprzedajesz produkty online i chcesz, żeby AI je rekomendowała zanim klient trafi na stronę.",
              },
              {
                icon: "🏢",
                title: "Marka DTC",
                desc: "Budujesz markę bezpośrednio do klienta i chcesz być tam, gdzie klient szuka.",
              },
              {
                icon: "📍",
                title: "Biznes lokalny",
                desc: "Działasz lokalnie i chcesz, żeby AI wskazywała Cię klientom szukającym w Twoim mieście.",
              },
              {
                icon: "🚀",
                title: "Founder / Manager",
                desc: "Chcesz przejąć ruch z AI, zanim zrobi to konkurencja — niezależnie od branży.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="p-6 rounded-2xl text-center h-full"
                  style={{
                    background: "rgba(247,248,250,0.03)",
                    border: "1px solid rgba(247,248,250,0.08)",
                  }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(247,248,250,0.5)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. JAK WYGLĄDA WSPÓŁPRACA ───────────── */}
      <section className="py-24 md:py-32" style={{ background: "#0d1326" }}>
        <div className="container max-w-3xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Proces
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-16">
              3 kroki do widoczności w AI.
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-8">
            <FadeIn delay={0}>
              <StepCard
                num="1"
                title="Zgłoszenie"
                desc="Wypełniasz formularz. Podajesz domenę strony. My analizujemy Twoją obecną widoczność w AI — bez zobowiązań."
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div
                className="w-px h-8 ml-6"
                style={{ background: "rgba(199,255,78,0.2)" }}
              />
              <StepCard
                num="2"
                title="Analiza i strategia AIO"
                desc="Przygotowujemy pełną analizę: co AI cytuje, czego nie, gdzie jest luka. Dostajesz konkretny plan wdrożenia."
              />
            </FadeIn>
            <FadeIn delay={0.2}>
              <div
                className="w-px h-8 ml-6"
                style={{ background: "rgba(199,255,78,0.2)" }}
              />
              <StepCard
                num="3"
                title="Wdrożenie i pozycjonowanie w AI"
                desc="Wdrażamy AIO. Przebudowujemy treści, strukturę danych i sygnały. Twoja firma zaczyna pojawiać się w odpowiedziach AI."
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 9. GŁÓWNY CTA BLOCK ─────────────────── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: LIME }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,200,138,0.3) 0%, transparent 70%)",
          }}
        />
        <div className="container max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2
              className="text-4xl md:text-6xl font-black leading-tight mb-6"
              style={{ color: NAVY }}
            >
              Nie pozwól, żeby AI
              <br />
              polecała konkurencję.
            </h2>
            <p
              className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(11,16,32,0.7)" }}
            >
              Zgłoś się do BoostNow i ustaw swoją firmę tam, gdzie klienci 
              zaczynają szukać — w odpowiedziach AI.
            </p>
            <button
              onClick={scrollToForm}
              className="px-10 py-5 rounded-xl font-black text-lg tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
              style={{
                background: NAVY,
                color: LIME,
                boxShadow: "0 8px 40px rgba(11,16,32,0.3)",
              }}
            >
              Chcę być widoczny w AI →
            </button>
          </FadeIn>
        </div>
      </section>

      {/* ── 10. FORMULARZ ───────────────────────── */}
      <section className="py-24 md:py-32" ref={formRef} id="kontakt">
        <div className="container max-w-xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              Zgłoszenie
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-4">
              Ustaw swoją firmę w AI.
            </h2>
            <p
              className="text-center mb-12"
              style={{ color: "rgba(247,248,250,0.5)" }}
            >
              Wypełnij formularz. Odezwiemy się w ciągu 24h.
            </p>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* ── 11. FAQ ─────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ background: "#0d1326" }}>
        <div className="container max-w-2xl mx-auto px-6">
          <FadeIn>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4 text-center"
              style={{ color: LIME }}
            >
              FAQ
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-center leading-tight mb-12">
              Pytania i odpowiedzi.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div>
              {[
                {
                  q: "Czym różni się AIO od SEO?",
                  a: "SEO optymalizuje stronę pod algorytmy Google — chodzi o ranking w wynikach wyszukiwania. AIO (AI Optimization) optymalizuje treści i dane pod modele językowe — ChatGPT, Perplexity, Gemini — które coraz częściej bezpośrednio rekomendują produkty i sklepy. To dwa różne kanały, dwa różne mechanizmy.",
                },
                {
                  q: "Jak szybko można zobaczyć efekty?",
                  a: "Pierwsze cytowania w odpowiedziach AI mogą pojawić się nawet w ciągu 10 dni od wdrożenia. Pełne efekty — stabilna widoczność w wielu modelach AI — budują się przez 4–8 tygodni.",
                },
                {
                  q: "Dla jakich firm i stron to działa?",
                  a: "AIO działa dla każdej firmy, która chce być rekomendowana przez AI. Najlepsze efekty osiągają: sklepy e-commerce, firmy usługowe (agencje, kancelarie, gabinety), biznesy lokalne oraz marki B2B. Kluczowe jest posiadanie wartościowych treści na stronie — im lepsza baza, tym szybsze efekty.",
                },
                {
                  q: "Czy to działa tylko dla ChatGPT?",
                  a: "Nie. AIO optymalizuje widoczność we wszystkich głównych modelach AI: ChatGPT, Perplexity, Google Gemini, Microsoft Copilot, Claude i asystentach zakupowych sklepów (np. InPost AI). Jeden zestaw optymalizacji — wiele kanałów.",
                },
                {
                  q: "Jak wygląda współpraca z BoostNow?",
                  a: "Zgłaszasz firmę przez formularz. Robimy analizę obecności w AI. Przygotowujemy strategię AIO. Wdrażamy — przebudowujemy treści, strukturę danych, sygnały autorytetu. Monitorujemy cytowania i raportujemy wyniki. Ty skupiasz się na biznesie.",
                },
              ].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 12. MINI FOOTER ─────────────────────── */}
      <footer
        className="py-10 border-t"
        style={{
          background: NAVY,
          borderColor: "rgba(247,248,250,0.08)",
        }}
      >
        <div className="container max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="BoostNow"
              className="h-8 w-auto opacity-90"
            />
          </Link>
          <p className="text-sm" style={{ color: "rgba(247,248,250,0.35)" }}>
            © 2025 BoostNow Agencja marketingowa · NIP: 7393776527
          </p>
          <a
            href="mailto:kontakt@boostnow.pl"
            className="text-sm transition-colors hover:text-white"
            style={{ color: "rgba(247,248,250,0.45)" }}
          >
            kontakt@boostnow.pl
          </a>
        </div>
      </footer>

      {/* ── Sticky CTA (mobile) ─────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50"
        style={{
          background: "linear-gradient(to top, rgba(11,16,32,1) 60%, transparent)",
        }}
      >
        <button
          onClick={scrollToForm}
          className="w-full py-4 rounded-xl font-black text-base tracking-wide"
          style={{ background: LIME, color: NAVY }}
        >
          Chcę być widoczny w AI →
        </button>
      </div>
    </div>
  );
}
