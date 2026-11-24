import { useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { submitForm } from "@/lib/submitForm";
import { FORM } from "./auditCopy";
import { normalizeEmail, normalizeStoreUrl, validateAudit, type AuditErrors, type AuditFields } from "./auditForm";
import { trackAudit, type Attribution } from "./auditTracking";
import type { LandingVariant } from "./auditCopy";
import { ui } from "./auditUi";

type Props = {
  variant: LandingVariant;
  attribution: Attribution;
  onSuccess: (platform: string) => void;
};

const FIELD_ORDER: (keyof AuditFields)[] = ["storeUrl", "firstName", "email", "platform", "operationalConsent"];

const inputClass =
  "mt-2 block w-full min-h-12 rounded-lg border bg-white px-4 py-3 text-base text-[#14161c] placeholder:text-[#7a7f8a] " +
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-1 focus-visible:outline-[#0b1020]";

export default function AuditLeadForm({ variant, attribution, onSuccess }: Props) {
  const [fields, setFields] = useState<AuditFields>({
    storeUrl: "",
    firstName: "",
    email: "",
    platform: "",
    operationalConsent: false,
    marketingConsent: false,
  });
  const [errors, setErrors] = useState<AuditErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const ctx = {
    landingVariant: variant,
    utmSource: attribution.utmSource,
    utmCampaign: attribution.utmCampaign,
    platform: fields.platform,
  };

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    trackAudit("form_start", ctx);
  };

  function update<K extends keyof AuditFields>(key: K, value: AuditFields[K]) {
    const next = { ...fields, [key]: value };
    setFields(next);
    // After the first submit attempt, re-validate as the user fixes fields.
    if (submitted) setErrors(validateAudit(next));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setSubmitted(true);
    const found = validateAudit(fields);
    setErrors(found);
    const invalid = FIELD_ORDER.filter((k) => found[k]);
    if (invalid.length) {
      trackAudit("form_validation_error", ctx, { fields: invalid.join(",") });
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMessage("");
    try {
      await submitForm({
        form: "audit",
        storeUrl: normalizeStoreUrl(fields.storeUrl) ?? fields.storeUrl.trim(),
        firstName: fields.firstName.trim(),
        email: normalizeEmail(fields.email),
        platform: fields.platform || undefined,
        operationalConsent: fields.operationalConsent,
        marketingConsent: fields.marketingConsent,
        landingVariant: variant,
        utmSource: attribution.utmSource || undefined,
        utmMedium: attribution.utmMedium || undefined,
        utmCampaign: attribution.utmCampaign || undefined,
        utmContent: attribution.utmContent || undefined,
        referrer: attribution.referrer || undefined,
        website,
      });
      trackAudit("form_submit_success", ctx);
      onSuccess(fields.platform);
    } catch (err) {
      // Keep everything the user typed; only show the error.
      setServerMessage(err instanceof Error ? err.message : "");
      setStatus("error");
      trackAudit("form_submit_error", ctx, { message: err instanceof Error ? err.message : "unknown" });
    }
  }

  const fieldError = (key: keyof AuditFields) =>
    errors[key] ? (
      <p id={`${key}-error`} className="mt-2 text-sm font-medium text-[#b42318]">
        {errors[key]}
      </p>
    ) : null;

  const describedBy = (key: keyof AuditFields) => (errors[key] ? `${key}-error` : undefined);
  const borderFor = (key: keyof AuditFields) => (errors[key] ? "border-[#b42318]" : "border-[#bdb8ad]");

  return (
    <section id="audyt-formularz" className={`${ui.section} bg-white scroll-mt-4`} aria-labelledby="audit-form-h2">
      <div className="mx-auto w-full max-w-xl">
        <h2 id="audit-form-h2" className={ui.h2}>
          {FORM.h2}
        </h2>
        <p className={`mt-4 ${ui.body}`}>{FORM.body}</p>

        <form ref={formRef} noValidate onSubmit={handleSubmit} onFocus={markStarted} className="relative mt-8 space-y-5">
          <div>
            <label htmlFor="audit-storeUrl" className="block font-semibold text-[#14161c]">
              {FORM.fields.storeUrl.label}
            </label>
            <input
              id="audit-storeUrl"
              name="storeUrl"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              required
              placeholder={FORM.fields.storeUrl.placeholder}
              value={fields.storeUrl}
              onChange={(e) => update("storeUrl", e.target.value)}
              aria-invalid={errors.storeUrl ? true : undefined}
              aria-describedby={describedBy("storeUrl")}
              className={`${inputClass} ${borderFor("storeUrl")}`}
            />
            {fieldError("storeUrl")}
          </div>

          <div>
            <label htmlFor="audit-firstName" className="block font-semibold text-[#14161c]">
              {FORM.fields.firstName.label}
            </label>
            <input
              id="audit-firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              maxLength={80}
              placeholder={FORM.fields.firstName.placeholder}
              value={fields.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              aria-invalid={errors.firstName ? true : undefined}
              aria-describedby={describedBy("firstName")}
              className={`${inputClass} ${borderFor("firstName")}`}
            />
            {fieldError("firstName")}
          </div>

          <div>
            <label htmlFor="audit-email" className="block font-semibold text-[#14161c]">
              {FORM.fields.email.label}
            </label>
            <input
              id="audit-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              placeholder={FORM.fields.email.placeholder}
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={`${inputClass} ${borderFor("email")}`}
            />
            {fieldError("email")}
          </div>

          <div>
            <label htmlFor="audit-platform" className="block font-semibold text-[#14161c]">
              {FORM.fields.platform.label}
            </label>
            <select
              id="audit-platform"
              name="platform"
              value={fields.platform}
              onChange={(e) => update("platform", e.target.value)}
              className={`${inputClass} ${borderFor("platform")}`}
            >
              <option value="">{FORM.fields.platform.placeholder}</option>
              {FORM.platforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="space-y-4 pt-1">
            <legend className="sr-only">Zgody</legend>
            <div>
              <div className="flex items-start gap-3">
                <input
                  id="audit-operationalConsent"
                  name="operationalConsent"
                  type="checkbox"
                  required
                  checked={fields.operationalConsent}
                  onChange={(e) => update("operationalConsent", e.target.checked)}
                  aria-invalid={errors.operationalConsent ? true : undefined}
                  aria-describedby={describedBy("operationalConsent")}
                  className="mt-1 h-5 w-5 flex-shrink-0 accent-[#0b1020] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0b1020]"
                />
                <label htmlFor="audit-operationalConsent" className="text-sm leading-relaxed text-[#3a3e48]">
                  {FORM.operationalConsent} <span className="text-[#b42318]" aria-hidden="true">*</span>
                </label>
              </div>
              {fieldError("operationalConsent")}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="audit-marketingConsent"
                name="marketingConsent"
                type="checkbox"
                checked={fields.marketingConsent}
                onChange={(e) => update("marketingConsent", e.target.checked)}
                className="mt-1 h-5 w-5 flex-shrink-0 accent-[#0b1020] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0b1020]"
              />
              <label htmlFor="audit-marketingConsent" className="text-sm leading-relaxed text-[#3a3e48]">
                {FORM.marketingConsent} (opcjonalnie)
              </label>
            </div>
          </fieldset>

          <p className={ui.muted}>
            {FORM.privacyPrefix}
            <Link href="/polityka-prywatnosci" className={`underline underline-offset-2 text-[#14161c] ${ui.focus}`}>
              {FORM.privacyLink}
            </Link>
            .
          </p>

          {/* Honeypot: hidden from people and assistive tech. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="audit-website">Strona</label>
            <input
              id="audit-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div role="status" aria-live="polite" className="min-h-0">
            {status === "error" && (
              <p className="rounded-lg border border-[#b42318] bg-[#fef3f2] p-3 text-sm text-[#b42318]">
                {FORM.error}
                {serverMessage && serverMessage !== FORM.error ? ` (${serverMessage})` : ""}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className={`${ui.cta} ${ui.focus} w-full`}
          >
            {status === "sending" ? FORM.loading : FORM.cta}
          </button>
        </form>
      </div>
    </section>
  );
}
