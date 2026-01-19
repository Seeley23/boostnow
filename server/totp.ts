import crypto from 'crypto';

/**
 * TOTP (Time-based One-Time Password) implementation for 2FA
 * Compatible with Google Authenticator, Authy, Microsoft Authenticator
 */

const TOTP_WINDOW = 1; // Allow 1 time window before/after (30 seconds each)
const TOTP_TIME_STEP = 30; // 30 seconds per TOTP code

/**
 * Generate a secret key for TOTP
 * @returns Base32 encoded secret
 */
export function generateTotpSecret(): string {
  const buffer = crypto.randomBytes(32);
  return base32Encode(buffer);
}

/**
 * Generate QR code URL for TOTP setup
 * @param email - User email
 * @param secret - TOTP secret
 * @param issuer - App name (e.g., 'BoostNow')
 * @returns otpauth:// URL for QR code
 */
export function generateTotpQrCodeUrl(
  email: string,
  secret: string,
  issuer: string = 'BoostNow'
): string {
  const encodedEmail = encodeURIComponent(email);
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedSecret = encodeURIComponent(secret);

  return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${encodedSecret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

/**
 * Verify TOTP code
 * @param secret - Base32 encoded secret
 * @param code - 6-digit code from authenticator
 * @returns true if code is valid
 */
export function verifyTotpCode(secret: string, code: string): boolean {
  if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
    return false;
  }

  const secretBuffer = base32Decode(secret);
  const now = Math.floor(Date.now() / 1000);

  // Check current time window and adjacent windows
  for (let i = -TOTP_WINDOW; i <= TOTP_WINDOW; i++) {
    const timeCounter = Math.floor((now + i * TOTP_TIME_STEP) / TOTP_TIME_STEP);
    const expectedCode = generateTotpCode(secretBuffer, timeCounter);

    if (expectedCode === code) {
      return true;
    }
  }

  return false;
}

/**
 * Generate TOTP code for a given time counter
 */
function generateTotpCode(secret: Buffer, timeCounter: number): string {
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(timeCounter), 0);

  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0x0f;
  const code = (digest[offset] & 0x7f) << 24 |
    (digest[offset + 1] & 0xff) << 16 |
    (digest[offset + 2] & 0xff) << 8 |
    (digest[offset + 3] & 0xff);

  return (code % 1000000).toString().padStart(6, '0');
}

/**
 * Base32 encode (RFC 4648)
 */
function base32Encode(buffer: Buffer): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;

    while (bits >= 5) {
      bits -= 5;
      output += alphabet[(value >> bits) & 31];
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  // Add padding
  while (output.length % 8 !== 0) {
    output += '=';
  }

  return output;
}

/**
 * Base32 decode (RFC 4648)
 */
function base32Decode(encoded: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const lookup: Record<string, number> = {};

  for (let i = 0; i < alphabet.length; i++) {
    lookup[alphabet[i]] = i;
  }

  let bits = 0;
  let value = 0;
  const output: number[] = [];

  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i];

    if (char === '=') break;

    if (!(char in lookup)) {
      throw new Error(`Invalid character in base32 string: ${char}`);
    }

    value = (value << 5) | lookup[char];
    bits += 5;

    if (bits >= 8) {
      bits -= 8;
      output.push((value >> bits) & 0xff);
    }
  }

  return Buffer.from(output);
}
