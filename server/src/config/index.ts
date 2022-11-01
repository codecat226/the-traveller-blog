import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    port: process.env.PORT || 4004
  },
  db: {
    mongo_url: process.env.MONGO_URL || ''
  }
};
