import * as dotenv from 'dotenv';
dotenv.config();

export const dev = {
  app: {
    port: process.env.PORT || 4004,
    priv_key: process.env.JWT_SECRET || 'secret'
  },
  db: {
    mongo_url: process.env.MONGO_URL || ''
  },
  smtp: {
    auth_email: process.env.AUTH_EMAIL || '',
    auth_pw: process.env.AUTH_PW || ''
  }
};
