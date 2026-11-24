import { PROBLEM } from "./auditCopy";
import { ui } from "./auditUi";

export default function AuditProblem() {
  return (
    <section className={`${ui.section} bg-white`} aria-labelledby="audit-problem">
      <div className={ui.container}>
        <h2 id="audit-problem" className={ui.h2}>
          {PROBLEM.h2}
        </h2>
        <div className="mt-6 space-y-4">
          {PROBLEM.body.map((p) => (
            <p key={p} className={ui.body}>
              {p}
            </p>
          ))}
        </div>
        <p className="mt-8 font-semibold text-[#14161c]">{PROBLEM.lossHeading}</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {PROBLEM.losses.map((l) => (
            <li key={l} className="flex gap-3 border-l-2 border-[#14161c] pl-3 text-[#3a3e48]">
              {l}
            </li>
          ))}
        </ul>
        <p className={`mt-8 ${ui.muted}`}>{PROBLEM.closing}</p>
      </div>
    </section>
  );
}
