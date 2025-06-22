import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto.dto';
import { RoleService } from '../Role/role.service';

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
      throw new NotFoundException('Usuario no encontrado.');
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
    if (updateData.roles && updateData.roles.length > 0) {
      const roles = await this.roleService.findByNames(updateData.roles);
      user.roles = roles;
    }

    const { roles, ...rest } = updateData;

    console.log('Update Data:', updateData);

    Object.assign(user, rest);

    await this.userRepository.save(user);
    return `User updated succesfully.`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
