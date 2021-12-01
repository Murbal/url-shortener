import { Type, Static } from '@sinclair/typebox';
import { Token } from '../services/token';

export const UploadShortUrlPayloadDTOValidator = Type.Object({
  url: Type.String(),
});
export type UploadShortUrlPayloadDTO = Static<
  typeof UploadShortUrlPayloadDTOValidator
>;

export const UploadShortUrlReplyDTOValidator = Type.Object({
  token: Type.String(),
});
export type UploadShortUrlReplyDTO = { token: Token };
