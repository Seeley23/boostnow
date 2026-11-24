/**
 * Validation for the store audit form. Pure functions, shared by the form
 * component and the tests. client/public/contact.php repeats the same rules
 * on the server.
 */

export type AuditFields = {
  storeUrl: string;
  firstName: string;
  email: string;
  platform: string;
  operationalConsent: boolean;
  marketingConsent: boolean;
};

export type AuditErrors = Partial<Record<keyof AuditFields, string>>;

const HOST_RE = /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Accepts "twojsklep.pl", "www.twojsklep.pl/sklep" or a full http(s) URL.
 * Returns "https://host/path" (path without trailing slash), or null.
 */
export function normalizeStoreUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 2048 || /\s/.test(raw)) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password || url.port) return null;
  const host = url.hostname.toLowerCase();
  if (!HOST_RE.test(host)) return null;
  const path = url.pathname.replace(/\/+$/, "");
  return `${url.protocol}//${host}${path}`;
}

export function normalizeEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function validateAudit(f: AuditFields): AuditErrors {
  const errors: AuditErrors = {};
  if (!normalizeStoreUrl(f.storeUrl)) {
    errors.storeUrl = "Wpisz adres sklepu, np. twojsklep.pl.";
  }
  const name = f.firstName.trim();
  if (!name) errors.firstName = "Wpisz imię.";
  else if (name.length > 80) errors.firstName = "Imię może mieć najwyżej 80 znaków.";
  const email = normalizeEmail(f.email);
  if (!email) errors.email = "Wpisz adres e-mail.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Sprawdź adres e-mail.";
  if (!f.operationalConsent) {
    errors.operationalConsent = "Ta zgoda jest potrzebna, żeby wysłać Ci audyt.";
  }
  return errors;
}
