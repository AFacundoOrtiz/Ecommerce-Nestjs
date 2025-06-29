import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addNewCategory(name: string): Promise<boolean> {
    const exists = await this.categoryRepository.findOne({ where: { name } });
    if (exists) return false;

    const category = this.categoryRepository.create({ name });
    await this.categoryRepository.save(category);
    return true;
  }

  /*async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }*/
}
