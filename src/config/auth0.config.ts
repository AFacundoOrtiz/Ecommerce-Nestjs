import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

export const authZeroConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.HOST || 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN?.startsWith('http')
    ? process.env.AUTH0_DOMAIN
    : `https://${process.env.AUTH0_DOMAIN}`,
};
