import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { Product } from '../Products/product.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from '../Users/users.repository';
import { ProductsRepository } from '../Products/products.repository';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private usersRepo: UsersRepository,
    private productsRepo: ProductsRepository,
  ) {}

  async getOrder(id: string) {
    return this.orderRepository
      .findOne({
        where: { id },
        relations: [`orderDetail`, `orderDetail.products`],
      })
      .then((order) => {
        if (!order) {
          throw new NotFoundException('Order do not exist.');
        }
        return order;
      });
  }

  async findProducts(product: Product[]) {
    const productIds = product.map((product) => product.id);

    try {
      const foundProducts = await Promise.all(
        productIds.map((id) => this.productsRepo.getProductById(id)),
      );
      return foundProducts;
    } catch (e) {
      throw new NotFoundException(`Products not found. Error: ${e}`);
    }
  }
}
