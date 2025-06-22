import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/dtos/UpdateUserDto.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

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
}
