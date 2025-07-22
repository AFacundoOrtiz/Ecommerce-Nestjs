import { Module } from '@nestjs/common';
import { DatabaseSeeder } from './database.seeder';
import { RoleModule } from '../modules/Role/role.module';
import { CategoryModule } from '../modules/Category/category.module';
import { ProductsModule } from '../modules/Products/products.module';
import { UsersModule } from '../modules/Users/users.module';
import { SeedController } from './seed.controller';
@Module({
  imports: [RoleModule, CategoryModule, ProductsModule, UsersModule],
  providers: [DatabaseSeeder],
  controllers: [SeedController],
})
export class SeederModule {}
