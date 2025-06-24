import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CategoryService } from '../modules/Category/category.service';
import { ProductsService } from '../modules/Products/products.service';
import { RoleService } from '../modules/Role/role.service';
import { UsersService } from '../modules/Users/users.service';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    await this.roleService.preloadDefaultRoles();
    await this.usersService.seedUsers();
    await this.categoryService.seedCategories();
    await this.productService.seedProducts();
  }
}
