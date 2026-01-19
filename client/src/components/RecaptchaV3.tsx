import { useEffect } from 'react';

interface RecaptchaV3Props {
  onToken: (token: string) => void;
  action?: string;
}

export function RecaptchaV3({ onToken, action = 'submit' }: RecaptchaV3Props) {
  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const executeRecaptcha = async () => {
    if (typeof window !== 'undefined' && (window as any).grecaptcha) {
      try {
        const token = await (window as any).grecaptcha.execute(
          import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          { action }
        );
        onToken(token);
      } catch (error) {
        console.error('reCAPTCHA error:', error);
      }
    }
  };

  // Execute reCAPTCHA when component mounts
  useEffect(() => {
    const timer = setTimeout(executeRecaptcha, 1000);
    return () => clearTimeout(timer);
  }, [action]);

  return null; // reCAPTCHA v3 is invisible
}

export async function getRecaptchaToken(action: string = 'submit'): Promise<string> {
  if (typeof window !== 'undefined' && (window as any).grecaptcha) {
    try {
      const token = await (window as any).grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action }
      );
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return '';
    }
  }
  return '';
}
