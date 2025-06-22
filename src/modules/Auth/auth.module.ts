import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../Users/users.repository';
import { UsersService } from '../Users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/user.entity';
import { Role } from '../Role/role.entity';
import { RoleService } from '../Role/role.service';
import { Auth0Strategy } from './strategies/auth0.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    UsersRepository,
    UsersService,
    RoleService,
    Auth0Strategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
