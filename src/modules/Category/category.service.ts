import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { categoryCreated } from './category.interface';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryDBRepository: Repository<Category>,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getCategoryByName(name: string) {
    const category = await this.categoryDBRepository.findOne({
      where: { name },
    });
    if (!category) {
      throw new NotFoundException(`Category: ${name} not found.`);
    }
    return category;
  }

  async seedCategories() {
    const categories = ['smartphone', 'monitor', 'keyboard', 'mouse', 'pet toy'];
    const categoryCreated: categoryCreated[] = [];

    for (const name of categories) {
      const created = await this.categoryRepository.addNewCategory(name);
      categoryCreated.push({ name, created });
    }

    return categoryCreated;
  }
}
