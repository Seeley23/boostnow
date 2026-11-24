import { PREVIEW } from "./auditCopy";
import { ui } from "./auditUi";

export default function AuditPreview() {
  return (
    <section className={ui.section} aria-labelledby="audit-preview">
      <div className={`${ui.wide} grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center`}>
        <div>
          <h2 id="audit-preview" className={ui.h2}>
            {PREVIEW.h2}
          </h2>
          <p className={`mt-5 ${ui.body}`}>{PREVIEW.body}</p>
        </div>

        <figure className="m-0">
          <div
            className="rounded-xl border border-[#dcd8cf] bg-white p-6 sm:p-8 shadow-[0_1px_0_#dcd8cf,0_18px_40px_-24px_rgba(20,22,28,0.35)]"
            aria-label="Przykładowy wynik audytu. Dane przykładowe."
          >
            <p className="inline-block rounded bg-[#14161c] px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#f7f5f0]">
              {PREVIEW.label}
            </p>
            <p className="mt-4 font-heading text-xl font-bold text-[#14161c]">{PREVIEW.title}</p>
            <dl className="mt-6 space-y-4">
              {PREVIEW.scores.map((s) => (
                // One <div> per group holding only <dt>/<dd>, as HTML requires.
                <div key={s.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4">
                  <dt className="text-[#3a3e48]">{s.name}</dt>
                  <dd className="m-0 font-semibold tabular-nums text-[#14161c]">{s.value}/100</dd>
                  <dd className="col-span-2 m-0 mt-2 h-2 rounded-full bg-[#ece9e2]" aria-hidden="true">
                    <div className="h-2 rounded-full bg-[#14161c]" style={{ width: `${s.value}%` }} />
                  </dd>
                </div>
              ))}
            </dl>
            <div className={`mt-6 pt-5 ${ui.rule}`}>
              <p className={ui.eyebrow}>{PREVIEW.priorityLabel}</p>
              <p className="mt-2 text-[#14161c]">
                <span className="bg-[#c7ff4e] px-1 box-decoration-clone">{PREVIEW.priority}</span>
              </p>
            </div>
          </div>
          <figcaption className={`mt-4 ${ui.muted}`}>{PREVIEW.disclaimer}</figcaption>
        </figure>
      </div>
    </section>
  );
}
