import cuid from 'cuid';
import { checkIsString } from '../check';
import { Maybe, Opaque } from '../types';
import { redis } from './redis';

/**
 * is a cuid slug
 */
export type Token = Opaque<string>;

export const checkIsToken = (maybeToken: unknown): maybeToken is Token => {
  return checkIsString(maybeToken) && cuid.isSlug(maybeToken);
};
export function assertIsToken(
  maybeToken: unknown
): asserts maybeToken is Token {
  const isToken = checkIsToken(maybeToken);
  if (!isToken) {
    throw new TypeError(`${maybeToken} is not a valid token`);
  }
}

export const createToken = (): Token => {
  const token = cuid.slug();
  assertIsToken(token);

  return token;
};

export const saveToken = async (token: Token, url: string): Promise<Token> => {
  await redis.set(token, url);

  return token;
};

export const getUrlByToken = async (token: Token): Promise<Maybe<string>> => {
  const url = await redis.get(token);

  return url;
};
