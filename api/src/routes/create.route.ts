import {
  FastifyInstance,
  preHandlerHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import validator from 'validator';
import { BadRequest } from 'http-errors';
import {
  UploadShortUrlPayloadDTO,
  UploadShortUrlPayloadDTOValidator,
  UploadShortUrlReplyDTO,
  UploadShortUrlReplyDTOValidator,
} from '../dto/create.dto';
import { createToken, saveToken } from '../services/token';

type RouteGenericTypings = {
  Body: UploadShortUrlPayloadDTO;
  Reply: UploadShortUrlReplyDTO;
};
type PreHandler = preHandlerHookHandler<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericTypings
>;
type RouteHandler = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericTypings
>;

const assertBodyPreHandler: PreHandler = (req, _, done) => {
  const isUrl = validator.isURL(req.body.url);
  if (!isUrl) {
    throw new BadRequest(`${req.body.url} is not a valid url`);
  }

  done();
};
const handleCreateShortUrlRoute: RouteHandler = async (req) => {
  const url = req.body.url;

  const token = createToken();
  await saveToken(token, url);

  return { token };
};

export const addCreateShortUrlRoute = (
  fastifyInstance: FastifyInstance
): void => {
  fastifyInstance.route<RouteGenericTypings>({
    method: 'POST',
    url: '/',
    schema: {
      body: UploadShortUrlPayloadDTOValidator,
      response: {
        200: UploadShortUrlReplyDTOValidator,
      },
    },
    preHandler: assertBodyPreHandler,
    handler: handleCreateShortUrlRoute,
  });
};
