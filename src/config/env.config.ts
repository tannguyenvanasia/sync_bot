import * as dotenv from 'dotenv';

const ENV = process.env.ENV;
export const envFilePath = `.env.${ENV ?? 'local'}`;

dotenv.config({ path: envFilePath });

export default () => ({
  MEZON_TOKEN: process.env.MEZON_TOKEN || '',
  BOT_ID: process.env.BOT_ID || '',
});
