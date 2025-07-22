import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthRequest } from 'src/types/express';

@Injectable()
export class SelfOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const userIdFromToken = request.user.sub;
    const userIdFromParams = request.params.id;

    const isSuperAdmin = user.role[0] === 'superadmin';

    if (isSuperAdmin || userIdFromToken === userIdFromParams) {
      return true;
    }

    throw new ForbiddenException('Access denied.');
  }
}
