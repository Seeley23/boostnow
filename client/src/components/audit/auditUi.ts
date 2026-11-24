/**
 * Shared class names for the audit landing page ("Editorial Commerce Audit"):
 * warm paper background, dark ink, one strong dark CTA with the brand lime.
 * Text colours on PAPER meet WCAG AA (ink ~16:1, muted ~6.9:1).
 */
export const PAPER = "#f7f5f0";
export const INK = "#14161c";
export const NAVY = "#0b1020";
export const LIME = "#c7ff4e";

export const ui = {
  section: "px-4 sm:px-6 py-14 sm:py-20",
  container: "mx-auto w-full max-w-3xl",
  wide: "mx-auto w-full max-w-5xl",
  eyebrow: "text-xs font-semibold uppercase tracking-[0.18em] text-[#555a66]",
  h2: "font-heading text-[1.75rem] leading-[1.15] sm:text-4xl font-semibold tracking-tight text-[#14161c]",
  body: "text-[1.0625rem] leading-relaxed text-[#3a3e48]",
  muted: "text-sm leading-relaxed text-[#555a66]",
  rule: "border-t border-[#dcd8cf]",
  focus:
    "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#0b1020]",
  cta:
    "inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0b1020] px-7 py-3.5 text-base font-semibold text-[#c7ff4e] shadow-sm transition-colors hover:bg-[#1c2340] disabled:cursor-not-allowed disabled:opacity-70",
  ctaSecondary:
    "inline-flex min-h-12 items-center justify-center rounded-lg border border-[#14161c] px-6 py-3 text-base font-semibold text-[#14161c] transition-colors hover:bg-[#14161c] hover:text-[#f7f5f0]",
};
