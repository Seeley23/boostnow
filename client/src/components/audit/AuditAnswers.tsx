import { Link } from "wouter";
import { ANSWERS, CREDIBILITY } from "./auditCopy";
import { ui } from "./auditUi";

/**
 * Self-contained answer blocks below the form: written to be quoted by AI
 * search (ChatGPT, Gemini, Perplexity, AI Overviews) and to rank for the
 * "how do I check / why does AI skip my shop" questions.
 */
export default function AuditAnswers() {
  const { check, why, method } = ANSWERS;
  return (
    <section className={ui.section} aria-label="Jak sprawdzić widoczność sklepu w AI">
      <div className={`${ui.container} space-y-14`}>
        <article aria-labelledby="audit-answer-check">
          <h2 id="audit-answer-check" className={ui.h2}>
            {check.h2}
          </h2>
          <p className={`mt-5 ${ui.body}`}>{check.intro}</p>
          <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#14161c]">
            {check.steps.map((step) => (
              <li key={step} className={ui.body}>
                {step}
              </li>
            ))}
          </ol>
          <p className={`mt-5 ${ui.body}`}>{check.outro}</p>
        </article>

        <article aria-labelledby="audit-answer-why">
          <h2 id="audit-answer-why" className={ui.h2}>
            {why.h2}
          </h2>
          <div className="mt-5 space-y-4">
            {why.paragraphs.map((p) => (
              <p key={p} className={ui.body}>
                {p}
              </p>
            ))}
            <p className={ui.body}>
              {why.linkLead}
              <Link href={why.linkHref} className={`font-semibold underline underline-offset-2 text-[#14161c] ${ui.focus}`}>
                {why.linkText}
              </Link>
              .
            </p>
          </div>
        </article>

        <article aria-labelledby="audit-answer-method">
          <h2 id="audit-answer-method" className={ui.h2}>
            {method.h2}
          </h2>
          <div className="mt-5 space-y-4">
            {method.paragraphs.map((p) => (
              <p key={p} className={ui.body}>
                {p}
              </p>
            ))}
          </div>
        </article>

        <p className={`${ui.muted} ${ui.rule} pt-5`}>
          <time dateTime="2026-11-24">{ANSWERS.updatedLabel}</time>
          {" · "}
          <Link href={CREDIBILITY.authorHref} className={`underline underline-offset-2 ${ui.focus}`}>
            {ANSWERS.author}
          </Link>
          {" · "}
          <Link href="/aio" className={`underline underline-offset-2 ${ui.focus}`}>
            AIO dla e-commerce
          </Link>
        </p>
      </div>
    </section>
  );
}
