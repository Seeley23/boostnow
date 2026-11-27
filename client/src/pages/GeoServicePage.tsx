/**
 * /pozycjonowanie-geo: service page for GEO positioning (visibility in
 * ChatGPT, Gemini, Perplexity and Google AI). Free audit first, then a
 * monthly plan from 800 PLN. Every blog article ends with a CTA to the form
 * on this page (shared/geoService.ts).
 */
import { useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { submitForm } from "@/lib/submitForm";
import { trackFormSubmit } from "@/lib/analytics";
import { PAPER, ui } from "@/components/audit/auditUi";
import {
  GEO_ANSWER,
  GEO_FAQ,
  GEO_FORM,
  GEO_FORM_ID,
  GEO_HERO,
  GEO_INCLUDED,
  GEO_PRICE,
  GEO_PROOF,
  GEO_SEO,
  GEO_STEPS,
} from "@shared/geoService";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const inputClass =
  "mt-2 block w-full min-h-12 rounded-lg border border-[#bdb8ad] bg-white px-4 py-3 text-base text-[#14161c] placeholder:text-[#7a7f8a] " +
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[#0b1020]";

type Fields = { name: string; email: string; siteUrl: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Wpisz imię.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Sprawdź adres e-mail.";
  if (!/\.[a-z]{2,}/i.test(f.siteUrl.trim())) e.siteUrl = "Wpisz adres strony, np. twojafirma.pl.";
  if (!f.consent) e.consent = "Ta zgoda jest potrzebna, żebyśmy mogli odpowiedzieć.";
  return e;
}

function GeoForm() {
  const [f, setF] = useState<Fields>({ name: "", email: "", siteUrl: "", message: "", consent: false });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(f);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitForm({
        form: "geo",
        name: f.name.trim(),
        email: f.email.trim().toLowerCase(),
        siteUrl: f.siteUrl.trim(),
        message: f.message.trim() || undefined,
        consent: true,
        website,
      });
      trackFormSubmit("geo_form", { form_location: "pozycjonowanie_geo", has_message: !!f.message.trim() });
      setStatus("done");
    } catch (err) {
      setServerMessage(err instanceof Error ? err.message : "Nie udało się wysłać.");
      setStatus("error");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`geo-${k}-error`} className="mt-2 text-sm font-medium text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `geo-${k}-error` : undefined,
  });

  if (status === "done") {
    return (
      <div role="status" className="mt-8 rounded-xl border border-[#dcd8cf] bg-[#f7f5f0] p-6">
        <p className="font-heading text-2xl font-bold text-[#14161c]">{GEO_FORM.successH}</p>
        <p className={`mt-3 ${ui.body}`}>{GEO_FORM.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative mt-8 space-y-5">
      <div>
        <label htmlFor="geo-name" className="block font-semibold">Imię</label>
        <input id="geo-name" name="name" type="text" autoComplete="given-name" maxLength={120}
          value={f.name} onChange={(e) => set("name", e.target.value)} className={inputClass} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="geo-email" className="block font-semibold">E-mail</label>
        <input id="geo-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none"
          spellCheck={false} maxLength={254} value={f.email} onChange={(e) => set("email", e.target.value)}
          className={inputClass} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="geo-siteUrl" className="block font-semibold">Adres strony firmy</label>
        <input id="geo-siteUrl" name="siteUrl" type="text" inputMode="url" autoComplete="url" autoCapitalize="none"
          spellCheck={false} maxLength={2048} placeholder="twojafirma.pl" value={f.siteUrl}
          onChange={(e) => set("siteUrl", e.target.value)} className={inputClass} {...aria("siteUrl")} />
        {err("siteUrl")}
      </div>
      <div>
        <label htmlFor="geo-message" className="block font-semibold">
          Co chcesz osiągnąć? <span className="font-normal text-[#555a66]">(opcjonalnie)</span>
        </label>
        <textarea id="geo-message" name="message" rows={3} maxLength={2000} value={f.message}
          onChange={(e) => set("message", e.target.value)} className={inputClass}
          placeholder="Np. chcę, żeby ChatGPT polecał moją firmę w Olsztynie." />
      </div>
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="geo-website">Strona</label>
        <input id="geo-website" name="website" tabIndex={-1} autoComplete="off" value={website}
          onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-[#3a3e48]">
          <input name="consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-[#0b1020]" {...aria("consent")} />
          <span>
            {GEO_FORM.consent}{" "}
            <Link href="/polityka-prywatnosci" className={`underline underline-offset-2 ${ui.focus}`}>
              Polityka prywatności
            </Link>
          </span>
        </label>
        {err("consent")}
      </div>
      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-[#b42318]">
          {serverMessage} Możesz też napisać na kontakt@boostnow.pl.
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={`${ui.cta} ${ui.focus} w-full sm:w-auto`}>
        {status === "sending" ? GEO_FORM.sending : GEO_FORM.submit}
      </button>
    </form>
  );
}

export default function GeoServicePage() {
  return (
    <div style={{ background: PAPER, colorScheme: "light" }} className="min-h-screen font-body text-[#14161c]">
      <Helmet>
        <title>{GEO_SEO.title}</title>
        <meta name="description" content={GEO_SEO.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={GEO_SEO.canonical} />
        <meta property="og:title" content={GEO_SEO.title} />
        <meta property="og:description" content={GEO_SEO.description} />
        <meta property="og:url" content={GEO_SEO.canonical} />
      </Helmet>

      <header className="px-4 sm:px-6 pt-5">
        <div className={`${ui.wide} flex items-center justify-between`}>
          <Link href="/" className={`inline-flex rounded ${ui.focus}`} aria-label="BoostNow, strona główna">
            <span className="font-heading text-xl font-bold tracking-tight text-[#14161c]">
              Boost<span className="bg-[#c7ff4e] px-0.5">Now</span>
            </span>
          </Link>
          <Link href="/blog" className={`text-sm font-semibold underline underline-offset-2 ${ui.focus}`}>
            Blog
          </Link>
        </div>
      </header>

      <main>
        <section className="px-4 sm:px-6 pt-12 pb-14 sm:pt-20 sm:pb-20">
          <div className={ui.container}>
            <p className={ui.eyebrow}>{GEO_HERO.eyebrow}</p>
            <h1 className="mt-4 font-heading text-[2.25rem] leading-[1.08] sm:text-5xl font-bold tracking-tight">
              {GEO_HERO.h1}
            </h1>
            <p className={`mt-5 ${ui.body}`}>{GEO_HERO.lead}</p>
            <p className="mt-5 text-lg font-semibold">
              <mark className="bg-[#c7ff4e] px-1 text-[#14161c]">{GEO_HERO.price}</mark>
            </p>
            <div className="mt-8">
              <a href={`#${GEO_FORM_ID}`} className={`${ui.cta} ${ui.focus}`}>
                {GEO_HERO.cta}
              </a>
              <p className={`mt-3 ${ui.muted}`}>{GEO_HERO.microcopy}</p>
            </div>
          </div>
        </section>

        <section className={`${ui.section} bg-white`} aria-labelledby="geo-answer">
          <div className={ui.container}>
            <h2 id="geo-answer" className={ui.h2}>Krótka odpowiedź</h2>
            <p className={`mt-5 ${ui.body}`}>{GEO_ANSWER}</p>
          </div>
        </section>

        <section className={ui.section} aria-labelledby="geo-included">
          <div className={ui.container}>
            <h2 id="geo-included" className={ui.h2}>{GEO_INCLUDED.h2}</h2>
            <ol className="mt-8 space-y-6">
              {GEO_INCLUDED.items.map((it, i) => (
                <li key={it.title} className="flex gap-4">
                  <span aria-hidden="true" className="font-heading text-2xl font-bold text-[#555a66]">{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-xl font-bold">{it.title}</h3>
                    <p className={`mt-1 ${ui.body}`}>{it.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${ui.section} bg-white`} aria-labelledby="geo-proof">
          <div className={ui.wide}>
            <h2 id="geo-proof" className={ui.h2}>{GEO_PROOF.h2}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {GEO_PROOF.cases.map((c) => (
                <div key={c.name} className="rounded-xl border border-[#dcd8cf] p-6">
                  <h3 className="font-heading text-xl font-bold">{c.name}</h3>
                  <p className={ui.muted}>W {c.period} od wdrożenia:</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-[#3a3e48]">
                    {c.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={ui.section} aria-labelledby="geo-price">
          <div className={ui.container}>
            <h2 id="geo-price" className={ui.h2}>{GEO_PRICE.h2}</h2>
            <div className="mt-6 rounded-xl border-2 border-[#0b1020] bg-white p-6">
              <p className="text-lg font-semibold">{GEO_PRICE.start}</p>
              <p className="mt-1 font-heading text-3xl font-bold">
                <mark className="bg-[#c7ff4e] px-1 text-[#14161c]">{GEO_PRICE.monthly}</mark>
              </p>
              <p className={`mt-4 ${ui.body}`}>{GEO_PRICE.body}</p>
            </div>
          </div>
        </section>

        <section className={`${ui.section} bg-white`} aria-labelledby="geo-steps">
          <div className={ui.container}>
            <h2 id="geo-steps" className={ui.h2}>{GEO_STEPS.h2}</h2>
            <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.0625rem] text-[#3a3e48]">
              {GEO_STEPS.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          </div>
        </section>

        <section id={GEO_FORM_ID} className={`${ui.section} scroll-mt-4`} aria-labelledby="geo-form">
          <div className="mx-auto w-full max-w-xl">
            <h2 id="geo-form" className={ui.h2}>{GEO_FORM.h2}</h2>
            <p className={`mt-4 ${ui.body}`}>{GEO_FORM.body}</p>
            <GeoForm />
          </div>
        </section>

        <section className={`${ui.section} bg-white`} aria-labelledby="geo-faq">
          <div className={ui.container}>
            <h2 id="geo-faq" className={ui.h2}>Najczęstsze pytania</h2>
            <div className="mt-6 divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
              {GEO_FAQ.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded font-semibold ${ui.focus} [&::-webkit-details-marker]:hidden`}>
                    {item.q}
                    <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-[#3a3e48]">{item.a}</p>
                </details>
              ))}
            </div>
            <p className={`mt-8 ${ui.body}`}>
              Więcej o GEO: <Link href="/blog/geo-co-to-jest" className={`underline underline-offset-2 ${ui.focus}`}>co to jest GEO</Link>{" "}
              i <Link href="/blog/jak-pojawic-sie-w-chatgpt" className={`underline underline-offset-2 ${ui.focus}`}>jak pojawić się w ChatGPT</Link>.
            </p>
          </div>
        </section>
      </main>

      <footer className="px-4 sm:px-6 py-8">
        <div className={`${ui.wide} flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#555a66]`}>
          <span>© BoostNow</span>
          <Link href="/polityka-prywatnosci" className={`underline underline-offset-2 ${ui.focus}`}>Polityka prywatności</Link>
          <Link href="/regulamin" className={`underline underline-offset-2 ${ui.focus}`}>Regulamin</Link>
        </div>
      </footer>
    </div>
  );
}
