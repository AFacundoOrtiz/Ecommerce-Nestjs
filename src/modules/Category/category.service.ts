import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryCreated } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async seedCategories() {
    const categories = [
      'smartphone',
      'monitor',
      'keyboard',
      'mouse',
      'pet toy',
    ];
    const categoryCreated: categoryCreated[] = [];

    for (const name of categories) {
      const created = await this.categoryRepository.addNewCategory(name);
      categoryCreated.push({ name, created });
    }

    return categoryCreated;
  }
}
