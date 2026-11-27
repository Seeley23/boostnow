/**
 * Sends a public form to /contact.php (PHP mail() on Smarthost), which
 * delivers it to kontakt@boostnow.pl. The site is static there, so tRPC
 * endpoints don't exist.
 */
export type FormPayload =
  | { form: "contact"; name: string; email: string; company?: string; message: string; website?: string }
  | { form: "aio"; name: string; email: string; domain: string; industry?: string; website?: string }
  | { form: "geo"; name: string; email: string; siteUrl: string; message?: string; consent: true; website?: string }
  | {
      form: "audit";
      storeUrl: string;
      firstName: string;
      email: string;
      platform?: string;
      operationalConsent: boolean;
      marketingConsent: boolean;
      landingVariant: "A" | "B";
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmContent?: string;
      referrer?: string;
      website?: string;
    };

export async function submitForm(payload: FormPayload): Promise<void> {
  let res: Response;
  try {
    res = await fetch("/contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Brak połączenia. Spróbuj ponownie.");
  }
  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    // Not JSON: the endpoint is missing (e.g. local dev server).
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Nie udało się wysłać wiadomości.");
  }
}
