import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /*@Post('seeder')
  async seedCategories() {
    return await this.categoryService.seedCategories();
  }*/
}
