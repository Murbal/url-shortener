export const checkIsUrl = (maybeUrl: string): boolean => {
  try {
    new URL(maybeUrl);

    return true;
  } catch {
    return false;
  }
};
