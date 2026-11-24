/**
 * A/B variant, traffic source and analytics events for /audyt-ai-dla-sklepu.
 * Events go to the GTM dataLayer through the shared trackEvent helper.
 * Storage access is wrapped: private windows and blocked storage must not
 * break the page.
 */
import { trackEvent } from "@/lib/analytics";
import type { LandingVariant } from "./auditCopy";

export const VARIANT_KEY = "boostnow_audit_variant";
const ATTRIBUTION_KEY = "boostnow_audit_attribution";

export type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  referrer: string;
};

const EMPTY_ATTRIBUTION: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  referrer: "",
};

function storageGet(storage: "local" | "session", key: string): string | null {
  try {
    return (storage === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function storageSet(storage: "local" | "session", key: string, value: string): void {
  try {
    (storage === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
  } catch {
    // Storage unavailable: the variant just isn't sticky in this browser.
  }
}

/**
 * Random 50/50 assignment, kept in localStorage so a refresh shows the same
 * version. `?wariant=A|B` forces a variant (for previews) without saving it.
 * During prerender (no window) the page renders variant A.
 */
export function getLandingVariant(): LandingVariant {
  if (typeof window === "undefined") return "A";
  const forced = new URLSearchParams(window.location.search).get("wariant")?.toUpperCase();
  if (forced === "A" || forced === "B") return forced;
  const saved = storageGet("local", VARIANT_KEY);
  if (saved === "A" || saved === "B") return saved;
  const assigned: LandingVariant = Math.random() < 0.5 ? "A" : "B";
  storageSet("local", VARIANT_KEY, assigned);
  return assigned;
}

/**
 * UTM parameters and referrer from the first visit in this session. Later
 * in-session visits without UTMs keep the original source.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return EMPTY_ATTRIBUTION;
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "",
  };
  const hasUtm = fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign || fromUrl.utmContent;
  const savedRaw = storageGet("session", ATTRIBUTION_KEY);
  if (savedRaw && !hasUtm) {
    try {
      return { ...EMPTY_ATTRIBUTION, ...JSON.parse(savedRaw) };
    } catch {
      // Corrupted value: fall through and overwrite it.
    }
  }
  const clipped = Object.fromEntries(
    Object.entries(fromUrl).map(([k, v]) => [k, v.slice(0, 500)])
  ) as Attribution;
  storageSet("session", ATTRIBUTION_KEY, JSON.stringify(clipped));
  return clipped;
}

/** Maps utm_source to a key of SOURCE_MESSAGES. */
export function sourceKey(utmSource: string): string {
  const s = utmSource.toLowerCase();
  if (s.includes("linkedin")) return "linkedin";
  if (s.includes("google")) return "google";
  if (s === "fb" || s.includes("facebook")) return "facebook";
  if (s === "ig" || s.includes("instagram")) return "instagram";
  if (s.includes("meta")) return "meta";
  return "";
}

export type AuditEvent =
  | "landing_view"
  | "hero_cta_click"
  | "form_start"
  | "form_validation_error"
  | "form_submit_success"
  | "form_submit_error"
  | "audit_next_step_click"
  | "call_booking_click";

export type AuditEventContext = {
  landingVariant: LandingVariant;
  utmSource: string;
  utmCampaign: string;
  platform?: string;
};

export function trackAudit(event: AuditEvent, ctx: AuditEventContext, extra?: Record<string, unknown>) {
  trackEvent(event, {
    landing: "audyt-ai-dla-sklepu",
    landingVariant: ctx.landingVariant,
    utmSource: ctx.utmSource || undefined,
    utmCampaign: ctx.utmCampaign || undefined,
    platform: ctx.platform || undefined,
    ...extra,
  });
}
