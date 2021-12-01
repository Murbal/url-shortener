import cuid from 'cuid';
import { checkIsToken, createToken } from '../services/token';

describe('token', () => {
  it('should create a valid token of cuid slug format', () => {
    const token = createToken();
    const isToken = cuid.isSlug(token);

    expect(isToken).toBe(true);
  });

  it('should fail for invalid cuid slugs', () => {
    const invalidCuidSlugs = ['123456', '123456789ab', 0];

    invalidCuidSlugs.forEach((invalidCuidSlug) => {
      expect(checkIsToken(invalidCuidSlug)).toBe(false);
    });
  });

  it('should pass for valid cuid slugs', () => {
    const validCuidSlugs = ['1234567', '12345678', 'abcdefghi', 'abcdefghij'];

    validCuidSlugs.forEach((validCuidSlug) => {
      expect(checkIsToken(validCuidSlug)).toBe(true);
    });
  });
});
