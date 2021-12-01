import ioredis from 'ioredis';
import { KEYDB_HOST, KEYDB_PASSWORD, KEYDB_PORT } from '../env';

export const redis = new ioredis(KEYDB_PORT, KEYDB_HOST, {
  password: KEYDB_PASSWORD,
  lazyConnect: true,
});
