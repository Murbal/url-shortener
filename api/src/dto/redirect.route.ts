import { Type } from '@sinclair/typebox';
import { Token } from '../services/token';

export const RedirectFromShortUrlBodyDTOValidator = Type.Object({
  token: Type.String(),
});
export type RedirectFromShortUrlBodyDTO = {
  token: Token;
};
