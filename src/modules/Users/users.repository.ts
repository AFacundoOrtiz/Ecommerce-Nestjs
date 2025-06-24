import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto.dto';
import { RoleService } from '../Role/role.service';
import { UpdateRoleDto } from 'src/dtos/UpdateRoleDto.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async getUsersPaginated(pageNum = 1, limitNum = 5) {
    const [data, total] = await this.userRepository.findAndCount({
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      select: [`id`, `name`, 'email', 'address', 'phone', 'country', 'city'],
      relations: ['roles', 'orders'],
    });

    return { data, pageNum, limitNum, total };
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders', 'roles'],
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        orders: {
          id: true,
          date: true,
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async createUser(user: Partial<User>) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return `User deleted.`;
  }

  async updateUser(user: User, updateData: UpdateUserDto) {
    Object.assign(user, updateData);

    await this.userRepository.save(user);
    return `User updated succesfully.`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateRoles(user: User, role: UpdateRoleDto) {
    const roles = await this.roleService.findByNames(role.roles);

    if (roles.length !== role.roles.length) {
      const foundRoles = roles.map((r) => r.name);
      const missing = role.roles.filter((r) => !foundRoles.includes(r));
      throw new BadRequestException(
        `Roles doesn't exist: ${missing.join(', ')}`,
      );
    }

    user.roles = roles;
    await this.userRepository.save(user);

    return {
      message: 'Roles updated successfully.',
      roles: roles.map((r) => r.name),
    };
  }
}
