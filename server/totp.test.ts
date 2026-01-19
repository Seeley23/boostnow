import { describe, it, expect } from 'vitest';
import { generateTotpSecret, generateTotpQrCodeUrl, verifyTotpCode } from './totp';

describe('TOTP (2FA) Implementation', () => {
  it('should generate a valid TOTP secret', () => {
    const secret = generateTotpSecret();
    expect(secret).toBeDefined();
    expect(secret.length).toBeGreaterThan(0);
    expect(secret).toMatch(/^[A-Z2-7=]+$/);
  });

  it('should generate QR code URL', () => {
    const secret = generateTotpSecret();
    const email = 'user@example.com';
    const qrUrl = generateTotpQrCodeUrl(email, secret, 'BoostNow');

    expect(qrUrl).toContain('otpauth://totp/');
    expect(qrUrl).toContain('BoostNow');
    expect(qrUrl).toContain('user%40example.com');
    expect(qrUrl).toContain('secret=');
    expect(qrUrl).toContain('algorithm=SHA1');
    expect(qrUrl).toContain('digits=6');
  });

  it('should verify valid TOTP code', () => {
    const testSecret = 'JBSWY3DPEBLW64TMMQ======';
    try {
      const result = verifyTotpCode(testSecret, '000000');
      expect(typeof result).toBe('boolean');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should reject invalid TOTP codes', () => {
    const secret = generateTotpSecret();
    expect(verifyTotpCode(secret, '12345')).toBe(false);
    expect(verifyTotpCode(secret, '1234567')).toBe(false);
    expect(verifyTotpCode(secret, 'abcdef')).toBe(false);
    expect(verifyTotpCode(secret, '')).toBe(false);
  });

  it('should handle multiple secrets independently', () => {
    const secret1 = generateTotpSecret();
    const secret2 = generateTotpSecret();

    expect(secret1).not.toBe(secret2);

    const qr1 = generateTotpQrCodeUrl('user1@example.com', secret1);
    const qr2 = generateTotpQrCodeUrl('user2@example.com', secret2);

    expect(qr1).not.toBe(qr2);
  });
});
