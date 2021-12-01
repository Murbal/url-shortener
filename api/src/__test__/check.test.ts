import { checkIsString } from '../check';

describe('check', () => {
  it('should fail for non-string values', () => {
    const nonStringValues = [
      Symbol(),
      [],
      {},
      new Map(),
      new Set(),
      BigInt(0),
      0,
      false,
      null,
      undefined,
    ];

    nonStringValues.forEach((nonStringValue) => {
      expect(checkIsString(nonStringValue)).toBe(false);
    });
  });

  it('should pass for string values', () => {
    const stringValues = ['', '0'];

    stringValues.forEach((stringValue) => {
      expect(checkIsString(stringValue)).toBe(true);
    });
  });
});
