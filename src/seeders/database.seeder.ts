import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CategoryService } from 'src/modules/Category/category.service';
import { ProductsService } from 'src/modules/Products/products.service';
import { RoleService } from 'src/modules/Role/role.service';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(
    private readonly roleService: RoleService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    await this.roleService.preloadDefaultRoles();
    await this.categoryService.seedCategories();
    await this.productService.seedProducts();
  }
}
