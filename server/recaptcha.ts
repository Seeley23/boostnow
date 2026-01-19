import { z } from 'zod';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

/**
 * Verify reCAPTCHA v3 token on the backend
 * @param token - reCAPTCHA token from frontend
 * @param expectedAction - Expected action (e.g., 'submit', 'contact')
 * @returns RecaptchaResponse with success status and score
 */
export async function verifyRecaptchaToken(
  token: string,
  expectedAction: string = 'submit'
): Promise<RecaptchaResponse> {
  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  if (!token) {
    return {
      success: false,
      score: 0,
      action: expectedAction,
      challenge_ts: new Date().toISOString(),
      hostname: '',
      error_codes: ['missing_token'],
    };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();

    // Validate response
    if (!data.success) {
      console.warn('reCAPTCHA verification failed:', data.error_codes);
      return data;
    }

    // Check if action matches
    if (data.action !== expectedAction) {
      console.warn(`reCAPTCHA action mismatch: expected ${expectedAction}, got ${data.action}`);
      return {
        ...data,
        success: false,
        error_codes: ['action_mismatch'],
      };
    }

    // Check score (0.0 = bot, 1.0 = human)
    // Adjust threshold based on your requirements
    const SCORE_THRESHOLD = 0.5;
    if (data.score < SCORE_THRESHOLD) {
      console.warn(`reCAPTCHA score too low: ${data.score}`);
      return {
        ...data,
        success: false,
        error_codes: ['score_too_low'],
      };
    }

    return data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      score: 0,
      action: expectedAction,
      challenge_ts: new Date().toISOString(),
      hostname: '',
      error_codes: ['verification_error'],
    };
  }
}

/**
 * Middleware to verify reCAPTCHA token in tRPC procedures
 */
export function withRecaptchaVerification(action: string = 'submit') {
  return async (input: { recaptchaToken: string }) => {
    const result = await verifyRecaptchaToken(input.recaptchaToken, action);

    if (!result.success) {
      throw new Error(`reCAPTCHA verification failed: ${result.error_codes?.join(', ')}`);
    }

    return result;
  };
}
