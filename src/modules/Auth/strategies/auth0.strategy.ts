/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.development' });

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid profile email',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: any,
    done: Function,
  ) {
    const { id, displayName, emails, _json } = profile;

    const user = {
      auth0Id: id,
      name: displayName,
      email: emails?.[0]?.value,
      picture: _json.picture,
    };

    return done(null, user);
  }
}
