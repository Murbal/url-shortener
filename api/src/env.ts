import assert from 'assert';

export const KEYDB_PASSWORD = process.env.KEYDB_PASSWORD;
export const KEYDB_HOST = process.env.KEYDB_HOST;
export const KEYDB_PORT = Number(process.env.KEYDB_PORT);

assert(KEYDB_PASSWORD);
assert(KEYDB_HOST);
assert(KEYDB_PORT);
