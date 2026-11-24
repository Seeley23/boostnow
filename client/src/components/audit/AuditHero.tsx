import { HERO_EYEBROW, HERO_VARIANTS, SOURCE_MESSAGES, type LandingVariant } from "./auditCopy";
import { ui } from "./auditUi";

type Props = {
  variant: LandingVariant;
  sourceKey: string;
  onCtaClick: () => void;
};

export default function AuditHero({ variant, sourceKey, onCtaClick }: Props) {
  const copy = HERO_VARIANTS[variant];
  const sourceLine = SOURCE_MESSAGES[sourceKey];
  return (
    <section className="px-4 sm:px-6 pt-8 pb-14 sm:pt-14 sm:pb-20" aria-labelledby="audit-h1">
      <div className={ui.container}>
        <p className={ui.eyebrow}>{sourceLine ?? HERO_EYEBROW}</p>
        <h1
          id="audit-h1"
          data-hero="h1"
          className="mt-4 font-heading text-[2.25rem] leading-[1.08] sm:text-6xl font-bold tracking-tight text-[#14161c]"
        >
          {copy.h1}
        </h1>
        <p data-hero="lead" className="mt-6 text-xl sm:text-2xl leading-snug text-[#14161c]">{copy.lead}</p>
        <p data-hero="supporting" className={`mt-4 max-w-2xl ${ui.body}`}>{copy.supporting}</p>
        <div className="mt-8 flex flex-col items-start gap-3">
          <a data-hero="cta" href="#audyt-formularz" onClick={onCtaClick} className={`${ui.cta} ${ui.focus}`}>
            {copy.cta}
          </a>
          <p data-hero="microcopy" className={ui.muted}>{copy.microcopy}</p>
        </div>
      </div>
    </section>
  );
}
