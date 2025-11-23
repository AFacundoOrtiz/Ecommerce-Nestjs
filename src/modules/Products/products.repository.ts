import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Category } from '../Category/category.entity';
import { categoryCreated } from '../Category/category.interface';
import { CreateProductDto } from 'src/dtos/CreateProductDto.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  products: CreateProductDto[] = [
    {
      name: 'Iphone 15',
      description: 'The best smartphone in the world',
      price: 199.99,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Samsung Galaxy S23',
      description: 'The best smartphone in the world',
      price: 150.0,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Motorola Edge 40',
      description: 'The best smartphone in the world',
      price: 179.89,
      stock: 12,
      category: 'smartphone',
    },
    {
      name: 'Samsung Odyssey G9',
      description: 'The best monitor in the world',
      price: 299.99,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'LG UltraGear',
      description: 'The best monitor in the world',
      price: 199.99,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'Acer Predator',
      description: 'The best monitor in the world',
      price: 150.0,
      stock: 12,
      category: 'monitor',
    },
    {
      name: 'Razer BlackWidow V3',
      description: 'The best keyboard in the world',
      price: 99.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Corsair K70',
      description: 'The best keyboard in the world',
      price: 79.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Logitech G Pro',
      description: 'The best keyboard in the world',
      price: 59.99,
      stock: 12,
      category: 'keyboard',
    },
    {
      name: 'Razer Viper',
      description: 'The best mouse in the world',
      price: 49.99,
      stock: 12,
      category: 'mouse',
    },
    {
      name: 'Logitech G502 Pro',
      description: 'The best mouse in the world',
      price: 39.99,
      stock: 12,
      category: 'mouse',
    },
    {
      name: 'SteelSeries Rival 3',
      description: 'The best mouse in the world',
      price: 29.99,
      stock: 12,
      category: 'mouse',
    },
  ];

  async addProductIfNotExists(productData: CreateProductDto): Promise<categoryCreated> {
    const existing = await this.productRepository.findOne({
      where: { name: productData.name },
    });

    if (existing) return { name: productData.name, created: false };

    let category = await this.categoryRepository.findOne({
      where: { name: productData.category },
    });

    if (!category) {
      category = this.categoryRepository.create({ name: productData.category });
      await this.categoryRepository.save(category);
    }

    const newProduct = this.productRepository.create({
      ...productData,
      category,
    });

    await this.productRepository.save(newProduct);
    return { name: productData.name, created: true };
  }

  async getProductsPaginated(page = 1, limit = 5) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.productRepository.findAndCount({
      skip,
      take: limit,
      relations: ['category'],
      order: { name: 'ASC' },
    });

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepository
      .findOne({
        where: { id },
        relations: ['category'],
      })
      .then((product) => {
        if (!product) {
          throw new NotFoundException('Product not found.');
        }
        return product;
      });
  }

  validateProducts(products: Product[]) {
    products.map((p) => {
      if (!p) {
        throw new NotFoundException('Product not found.');
      }
      if (p.stock <= 0) {
        throw new BadRequestException('Out of stock.');
      }
      p.stock -= 1;
      return p;
    });
    return products;
  }
}
