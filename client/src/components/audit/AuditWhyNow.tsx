import { WHY_NOW } from "./auditCopy";
import { ui } from "./auditUi";

export default function AuditWhyNow() {
  return (
    <section className={ui.section} aria-labelledby="audit-why-now">
      <div className={`${ui.container} border-l-4 border-[#14161c] pl-5 sm:pl-8`}>
        <h2 id="audit-why-now" className={ui.h2}>
          {WHY_NOW.h2}
        </h2>
        <div className="mt-5 space-y-4">
          {WHY_NOW.body.map((p) => (
            <p key={p} className={ui.body}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
