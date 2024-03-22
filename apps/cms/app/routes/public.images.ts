import { createLoader } from 'remixjs/server';

export const loader = createLoader({
  selfUrl: process.env['REMIX_SERVER_DOMAIN'] as string,
});
