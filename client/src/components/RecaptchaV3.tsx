import { useEffect } from 'react';

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

interface RecaptchaV3Props {
  onToken: (token: string) => void;
  action?: string;
}

/**
 * Loads the reCAPTCHA v3 script and executes a token request.
 * Gracefully no-ops when VITE_RECAPTCHA_SITE_KEY is not configured.
 */
export function RecaptchaV3({ onToken, action = 'submit' }: RecaptchaV3Props) {
  useEffect(() => {
    if (!SITE_KEY) return; // No key configured — skip silently

    // Avoid adding the script more than once
    const scriptId = 'recaptcha-v3-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Wait for grecaptcha to be ready before calling execute
    const timer = setTimeout(() => {
      const gr = (window as any).grecaptcha;
      if (!gr) return;
      gr.ready(() => {
        gr.execute(SITE_KEY, { action })
          .then((token: string) => onToken(token))
          .catch((err: unknown) => {
            // Log only in dev to avoid noise in production
            if (import.meta.env.DEV) {
              console.warn('[reCAPTCHA]', err);
            }
          });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [action, onToken]);

  return null; // reCAPTCHA v3 is invisible
}

export async function getRecaptchaToken(action: string = 'submit'): Promise<string> {
  if (!SITE_KEY) return '';

  const gr = (window as any).grecaptcha;
  if (!gr) return '';

  return new Promise((resolve) => {
    gr.ready(() => {
      gr.execute(SITE_KEY, { action })
        .then((token: string) => resolve(token))
        .catch(() => resolve(''));
    });
  });
}
