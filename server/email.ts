import { notifyOwner } from "./_core/notification";

/**
 * Send contact form notification to kontakt@boostnow.pl
 */
export async function sendContactFormNotification({
  name,
  email,
  company,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<boolean> {
  const title = `Nowe zapytanie kontaktowe od ${name}`;
  
  const content = `
**Imię i nazwisko:** ${name}
**Email:** ${email}
${company ? `**Firma:** ${company}` : ""}

**Wiadomość:**
${message}

---
Wysłano z formularza kontaktowego na boostnow.pl
  `.trim();

  return await notifyOwner({
    title,
    content,
  });
}
