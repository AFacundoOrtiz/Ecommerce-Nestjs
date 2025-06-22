import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/modules/Category/category.module';
import { ProductsModule } from 'src/modules/Products/products.module';
import { RoleModule } from 'src/modules/Role/role.module';
import { DatabaseSeeder } from './database.seeder';

@Module({
  imports: [RoleModule, CategoryModule, ProductsModule],
  providers: [DatabaseSeeder],
})
export class SeederModule {}
