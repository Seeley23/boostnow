import { SCOPE } from "./auditCopy";
import { ui } from "./auditUi";

export default function AuditScope() {
  return (
    <section className={`${ui.section} bg-white`} aria-labelledby="audit-scope">
      <div className={ui.wide}>
        <h2 id="audit-scope" className={ui.h2}>
          {SCOPE.h2}
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {SCOPE.cards.map((c, i) => (
            <li key={c.title} className="rounded-xl border border-[#dcd8cf] p-6">
              <span className="font-heading text-sm font-bold tabular-nums text-[#555a66]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-lg font-bold text-[#14161c]">{c.title}</h3>
              <p className="mt-2 text-[#3a3e48]">{c.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
