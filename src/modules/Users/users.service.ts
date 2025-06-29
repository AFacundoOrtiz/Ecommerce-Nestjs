import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UpdateUserDto } from '../../dtos/UpdateUserDto.dto';
import { UpdateRoleDto } from '../../dtos/UpdateRoleDto.dto';
import { hashPassword } from '../../helpers/hashPassword';
import { RoleService } from '../Role/role.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly roleService: RoleService,
  ) {}

  async getUsersPaginated(pageNum: number, limitNum: number) {
    return await this.usersRepository.getUsersPaginated(pageNum, limitNum);
  }

  async getUserById(id: string) {
    return await this.usersRepository.getById(id);
  }

  async createUser(user: Partial<User>) {
    return await this.usersRepository.createUser(user);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    const user = await this.usersRepository.getById(id);
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }

    if (updateData.email && updateData.email !== user.email) {
      const relatedEmail = await this.usersRepository.findByEmail(
        updateData.email,
      );
      if (relatedEmail) {
        throw new BadRequestException('Email already used.');
      }
    }

    return await this.usersRepository.updateUser(user, updateData);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async updateRoles(id: string, role: UpdateRoleDto) {
    const user = await this.usersRepository.getById(id);
    if (!user) {
      throw new BadRequestException('User does not exist.');
    }
    return await this.usersRepository.updateRoles(user, role);
  }

  async seedUsers() {
    for (const user of this.usersRepository.users) {
      const existing = await this.usersRepository.findByEmail(user.email);
      if (!existing) {
        const hashedPassword = await hashPassword(user.password);
        const roles = await this.roleService.findByNames(user.roles);

        const newUser = await this.usersRepository.createUser({
          ...user,
          password: hashedPassword,
          roles,
        });

        await this.usersRepository.createUser(newUser);
      }
    }
  }
}
