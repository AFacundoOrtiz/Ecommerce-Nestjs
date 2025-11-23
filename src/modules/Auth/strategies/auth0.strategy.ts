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
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: 'openid profile email',
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    _extraParams: any,
    profile: any,
    done: (err: unknown, user: unknown, info?: unknown) => void,
  ): void {
    const { id, displayName, emails, _json } = profile;

    const user = {
      auth0Id: id,
      name: displayName,
      email: emails?.[0]?.value,
      picture: _json.picture,
    };

    done(null, user);
  }
}
