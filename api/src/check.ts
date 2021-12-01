export const checkIsString = (maybeString: unknown): maybeString is string => {
  return typeof maybeString === 'string';
};
