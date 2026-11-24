import { FINAL_CTA } from "./auditCopy";
import { ui } from "./auditUi";

export default function AuditFinalCta({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24 bg-[#0b1020]" aria-labelledby="audit-final">
      <div className={`${ui.container} text-center`}>
        <h2
          id="audit-final"
          className="font-heading text-[1.75rem] leading-[1.15] sm:text-4xl font-bold tracking-tight text-[#f7f5f0]"
        >
          {FINAL_CTA.h2}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[#c9cdd6]">{FINAL_CTA.body}</p>
        <a
          href="#audyt-formularz"
          onClick={onCtaClick}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#c7ff4e] px-7 py-3.5 text-base font-semibold text-[#0b1020] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#c7ff4e]"
        >
          {FINAL_CTA.cta}
        </a>
      </div>
    </section>
  );
}
