import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { categoryCreated } from '../Category/category.interface';
import { CreateProductDto } from 'src/dtos/CreateProductDto.dto';
import { UpdateProductDto } from 'src/dtos/UpdateProductDto.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

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
    return await this.productsRepository.createProduct(product);
  }

  async deleteProduct(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async updateProduct(id: string, updateData: UpdateProductDto) {
    if (updateData)
      return await this.productsRepository.updateProduct(id, updateData);
  }
}
