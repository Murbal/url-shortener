import {
  FastifyInstance,
  preHandlerHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandlerMethod,
} from 'fastify';
import { BadRequest } from 'http-errors';
import {
  RedirectFromShortUrlBodyDTO,
  RedirectFromShortUrlBodyDTOValidator,
} from '../dto/redirect.route';
import { assertIsToken, getUrlByToken } from '../services/token';

type PreHandler = preHandlerHookHandler<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  { Params: RedirectFromShortUrlBodyDTO }
>;
type RouteHandler = RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  { Params: RedirectFromShortUrlBodyDTO }
>;

const assertParamsPreHandler: PreHandler = (req, _, done) => {
  assertIsToken(req.params.token);

  done();
};

const handleRedirectRoute: RouteHandler = async (req, res) => {
  const token = req.params.token;

  const url = await getUrlByToken(token);
  if (!url) {
    throw new BadRequest(`No url found for /${token}`);
  }

  res.redirect(302, url);
};

export const addRedirectRoute = (fastify: FastifyInstance): void => {
  fastify.route<{ Params: RedirectFromShortUrlBodyDTO }>({
    method: 'GET',
    url: '/:token',
    schema: {
      params: RedirectFromShortUrlBodyDTOValidator,
    },
    preHandler: assertParamsPreHandler,
    handler: handleRedirectRoute,
  });
};
