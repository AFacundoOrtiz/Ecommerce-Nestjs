import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../Role/role.entity';
import { RoleService } from '../Role/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, UsersRepository, RoleService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
