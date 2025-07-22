import {
  BadRequestException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { authGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';

@ApiTags('Seeders')
@Controller('seed')
export class SeedController {
  constructor(private readonly seeder: DatabaseSeeder) {}

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('superadmin')
  @Post('roles')
  async seedRoles() {
    try {
      await this.seeder.seedRoles();
      return { message: 'Seeded Roles successfully.' };
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('superadmin')
  @Post('users')
  async seedUsers() {
    try {
      await this.seeder.seedUsers();
      return { message: 'Seeded users successfully.' };
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('superadmin')
  @Post('categories')
  async seedCategories() {
    try {
      await this.seeder.seedCategories();
      return { message: 'Seeded categories successfully.' };
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('superadmin')
  @Post('products')
  async seedProducts() {
    try {
      await this.seeder.seedProducts();
      return { message: 'Seeded products successfully.' };
    } catch (error) {
      throw new BadRequestException(`Error: ${error}`);
    }
  }
}
