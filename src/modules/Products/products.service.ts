import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { categoryCreated } from '../Category/category.interface';
import { CreateProductDto } from 'src/dtos/CreateProductDto.dto';
import { UpdateProductDto } from 'src/dtos/UpdateProductDto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Category } from '../Category/category.entity';
import { CategoryService } from '../Category/category.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productDBRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryDBRepository: Repository<Category>,
    private readonly productsRepository: ProductsRepository,
    private readonly categoryService: CategoryService,
  ) {}

  async seedProducts() {
    const result: categoryCreated[] = [];
    for (const product of this.productsRepository.products) {
      const created =
        await this.productsRepository.addProductIfNotExists(product);
      result.push(created);
    }
    return result;
  }

  getProductsPaginated(page: number, limit: number) {
    return this.productsRepository.getProductsPaginated(page, limit);
  }

  async getProductById(id: string) {
    return await this.productsRepository.getProductById(id);
  }

  async createProduct(product: CreateProductDto) {
    const exist = await this.productDBRepository.findOne({
      where: { name: product.name },
    });

    if (exist) {
      throw new Error('Already exist a product with this name.');
    }

    const category = await this.categoryDBRepository.findOne({
      where: { name: product.category },
    });

    if (!category) {
      throw new Error(`Category "${product.category}" does not exist.`);
    }
    const newProduct = this.productDBRepository.create({
      ...product,
      category,
    });

    await this.productDBRepository.save(newProduct);

    return `Product: "${product.name}" uploaded.`;
  }

  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async updateProduct(id: string, updateData: UpdateProductDto) {
    const { category, ...rest } = updateData;
    const updatedFields: DeepPartial<Product> = { ...rest };

    if (category) {
      const catExist = await this.categoryService.getCategoryByName(category);
      updatedFields.category = catExist;
    }

    await this.productDBRepository.update(id, updatedFields);

    const product = await this.productsRepository.getProductById(id);

    return {
      message: 'Product updated.',
      product: product,
    };
  }
}
