/**
 * /audyt-ai-dla-sklepu: landing page for a free store audit ("is AI skipping
 * my shop?"). Not linked from the main navigation; traffic comes from ads,
 * LinkedIn and posts. The form sells the audit; the success state and the
 * audit report sell the paid implementation.
 */
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import AuditHero from "@/components/audit/AuditHero";
import AuditProblem from "@/components/audit/AuditProblem";
import AuditPreview from "@/components/audit/AuditPreview";
import AuditScope from "@/components/audit/AuditScope";
import AuditWhyNow from "@/components/audit/AuditWhyNow";
import AuditLeadForm from "@/components/audit/AuditLeadForm";
import AuditFinalCta from "@/components/audit/AuditFinalCta";
import { BOOKING_URL, CREDIBILITY, FAQ, SEO, SUCCESS } from "@/components/audit/auditCopy";
import { getAttribution, getLandingVariant, sourceKey, trackAudit } from "@/components/audit/auditTracking";
import { PAPER, ui } from "@/components/audit/auditUi";

function Header() {
  return (
    <header className="px-4 sm:px-6 pt-5">
      <div className={`${ui.wide} flex items-center justify-between`}>
        <Link href="/" className={`inline-flex rounded ${ui.focus}`} aria-label="BoostNow, strona główna">
          {/* Dark wordmark on paper; the site logo is light-on-dark. */}
          <span className="font-heading text-xl font-semibold tracking-tight text-[#14161c]">
            Boost<span className="bg-[#c7ff4e] px-0.5">Now</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

function Credibility() {
  return (
    <section className={ui.section} aria-labelledby="audit-why-us">
      <div className={ui.container}>
        <h2 id="audit-why-us" className={ui.h2}>
          {CREDIBILITY.h2}
        </h2>
        <p className={`mt-5 ${ui.body}`}>{CREDIBILITY.body}</p>
        <p className="mt-6 text-[#14161c]">
          <Link href={CREDIBILITY.authorHref} className={`font-semibold underline underline-offset-2 ${ui.focus}`}>
            {CREDIBILITY.name}
          </Link>
          <br />
          <span className="text-[#555a66]">{CREDIBILITY.company}</span>
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className={`${ui.section} bg-white`} aria-labelledby="audit-faq">
      <div className={ui.container}>
        <h2 id="audit-faq" className={ui.h2}>
          Najczęstsze pytania
        </h2>
        <div className="mt-6 divide-y divide-[#dcd8cf] border-y border-[#dcd8cf]">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 rounded font-semibold text-[#14161c] ${ui.focus} [&::-webkit-details-marker]:hidden`}
              >
                {item.q}
                <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[#3a3e48]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessView({ onBooking }: { onBooking: () => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24" aria-labelledby="audit-success">
      <div className={ui.container}>
        <p className={ui.eyebrow}>Bezpłatny audyt sklepu</p>
        <h1
          id="audit-success"
          ref={ref}
          tabIndex={-1}
          className="mt-4 font-heading text-[2.25rem] leading-[1.08] sm:text-5xl font-semibold tracking-tight text-[#14161c] outline-none"
        >
          {SUCCESS.h1}
        </h1>
        <p className={`mt-5 ${ui.body}`}>{SUCCESS.body}</p>

        <div className="mt-10 rounded-xl border border-[#dcd8cf] bg-white p-6 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#14161c]">{SUCCESS.nextHeading}</h2>
          <p className={`mt-3 ${ui.body}`}>{SUCCESS.nextBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={BOOKING_URL} onClick={onBooking} className={`${ui.cta} ${ui.focus}`}>
              {SUCCESS.cta}
            </a>
            <Link href="/" className={`${ui.ctaSecondary} ${ui.focus}`}>
              {SUCCESS.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AiCommerceAuditPage() {
  const [variant] = useState(getLandingVariant);
  const [attribution] = useState(getAttribution);
  const [done, setDone] = useState(false);
  const [platform, setPlatform] = useState("");
  const viewTracked = useRef(false);

  const ctx = {
    landingVariant: variant,
    utmSource: attribution.utmSource,
    utmCampaign: attribution.utmCampaign,
    platform,
  };

  useEffect(() => {
    // Ref guard: one landing_view per page load, also under StrictMode.
    if (viewTracked.current) return;
    viewTracked.current = true;
    trackAudit("landing_view", ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHeroCta = () => trackAudit("hero_cta_click", ctx, { position: "hero" });
  const onFinalCta = () => trackAudit("hero_cta_click", ctx, { position: "final" });
  const onBooking = () => {
    trackAudit("audit_next_step_click", ctx);
    trackAudit("call_booking_click", ctx);
  };

  return (
    <div style={{ background: PAPER, colorScheme: "light" }} className="min-h-screen font-body text-[#14161c]">
      <Helmet>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SEO.canonical} />
        <meta property="og:title" content={SEO.title} />
        <meta property="og:description" content={SEO.description} />
        <meta property="og:url" content={SEO.canonical} />
      </Helmet>

      <Header />

      <main>
        {done ? (
          <SuccessView onBooking={onBooking} />
        ) : (
          <>
            <AuditHero variant={variant} sourceKey={sourceKey(attribution.utmSource)} onCtaClick={onHeroCta} />
            <AuditProblem />
            <AuditPreview />
            <AuditScope />
            <AuditWhyNow />
            <AuditLeadForm
              variant={variant}
              attribution={attribution}
              onSuccess={(p) => {
                setPlatform(p);
                setDone(true);
              }}
            />
            <Credibility />
            <Faq />
            <AuditFinalCta onCtaClick={onFinalCta} />
          </>
        )}
      </main>

      <footer className="px-4 sm:px-6 py-8">
        <div className={`${ui.wide} flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#555a66]`}>
          <span>© BoostNow</span>
          <Link href="/polityka-prywatnosci" className={`underline underline-offset-2 ${ui.focus}`}>
            Polityka prywatności
          </Link>
          <Link href="/regulamin" className={`underline underline-offset-2 ${ui.focus}`}>
            Regulamin
          </Link>
        </div>
      </footer>
    </div>
  );
}
