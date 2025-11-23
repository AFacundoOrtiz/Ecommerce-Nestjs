import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwt-payload.interface';
import { AuthRequest } from 'src/types/express';

@Injectable()
export class authGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(conext: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = conext.switchToHttp().getRequest<AuthRequest>();
    const authHeader = request.headers['authorization'];
    console.log(authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized.');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request.user = payload;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Expired token.');
    }
  }
}
