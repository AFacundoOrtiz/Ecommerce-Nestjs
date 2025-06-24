import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CloudinaryRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async imgToProduct(id: string, imgUrl: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} does not exist.`);
    }

    product.imgUrl = imgUrl;
    await this.productRepository.save(product);

    return {
      message: 'Image uploaded successfully.',
      product,
    };
  }
}
