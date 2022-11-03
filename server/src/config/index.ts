import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    port: process.env.PORT || 4004,
    priv_key: process.env.PRIV_KEY || ''
  },
  db: {
    mongo_url: process.env.MONGO_URL || ''
  }
};
