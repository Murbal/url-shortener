import fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import { addCreateShortUrlRoute } from './routes/create.route';
import { addRedirectRoute } from './routes/redirect.route';
import { redis } from './services/redis';

const server = fastify();

server.register(fastifyRateLimit, { max: 30, timeWindow: '1 minute' });

addCreateShortUrlRoute(server);
addRedirectRoute(server);

const start = async () => {
  await redis.connect();
  await server.listen(4000, '0.0.0.0');

  console.log('listening...');
};

start();
