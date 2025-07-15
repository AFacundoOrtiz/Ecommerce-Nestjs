import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findByNames(names: string[]): Promise<Role[]> {
    return this.roleRepository.find({ where: { name: In(names) } });
  }

  async createIfNotExists(name: string): Promise<Role> {
    const existing = await this.roleRepository.findOne({ where: { name } });
    if (existing) return existing;
    const role = this.roleRepository.create({ name });
    return this.roleRepository.save(role);
  }

  async preloadDefaultRoles() {
    const defaultRoles = ['user', 'admin', 'superadmin'];

    for (const roleName of defaultRoles) {
      const existing = await this.roleRepository.findOneBy({ name: roleName });
      if (!existing) {
        const role = this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(role);
      }
    }
  }
}
