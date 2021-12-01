import ioredis from 'ioredis';
import { KEYDB_HOST, KEYDB_PASSWORD, KEYDB_PORT } from '../env';
console.log({ KEYDB_HOST, KEYDB_PASSWORD, KEYDB_PORT });
export const redis = new ioredis(KEYDB_PORT, KEYDB_HOST, {
  password: KEYDB_PASSWORD,
  lazyConnect: true,
});
