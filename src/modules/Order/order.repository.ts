import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { User } from '../Users/user.entity';
import { Product } from '../Products/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getOrder(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: [`orderDetail`],
    });
  }

  async addOrder(createOrder: CreateOrderDto) {
    const { userId, product } = createOrder;

    const user = await this.userRepository.findOneByOrFail({ id: userId });

    const productIds = product.map((product) => product.id);

    const validProducts = await this.productRepository.find({
      where: { id: In(productIds), stock: In([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) },
    });

    let total = 0;

    for (const product of validProducts) {
      total += Number(product.price);
      product.stock -= 1;
    }

    await this.productRepository.save(validProducts);

    const orderDetail = this.orderDetailRepository.create({
      price: total,
      products: validProducts,
    });
    await this.orderDetailRepository.save(orderDetail);

    const order = this.orderRepository.create({
      user,
      orderDetail: orderDetail,
    });

    return this.orderRepository.save(order);
  }
}
