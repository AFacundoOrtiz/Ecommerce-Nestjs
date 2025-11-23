import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';
import { ProductsRepository } from '../Products/products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Products/product.entity';
import { Repository } from 'typeorm';
import { UsersRepository } from '../Users/users.repository';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { Order } from './order.entity';
import { plainToInstance } from 'class-transformer';
import { OrderResponseDto } from 'src/dtos/OrderResponseDto.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly orderRepo: OrderRepository,
    private readonly productsRepo: ProductsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async createOrder(createOrder: CreateOrderDto) {
    const { userId, product } = createOrder;

    const user = await this.usersRepo.getById(userId);

    const findedProducts = await this.orderRepo.findProducts(product);

    const validatedProducts = this.productsRepo.validateProducts(findedProducts);

    await Promise.all(validatedProducts.map((product) => this.productRepository.save(product)));

    const total = validatedProducts.reduce((sum, product) => sum + Number(product.price), 0);

    const orderDetail = this.orderDetailRepository.create({
      price: total,
      products: validatedProducts,
    });
    await this.orderDetailRepository.save(orderDetail);

    const order = this.orderRepository.create({ user, orderDetail });

    await this.orderRepository.save(order);
    return {
      message: 'Order created.',
      id: order.id,
      total: orderDetail.price,
      list: validatedProducts.map((product) => product.name),
    };
  }

  async getOrderById(id: string) {
    const order = await this.orderRepo.getOrder(id);
    return plainToInstance(OrderResponseDto, order, {
      excludeExtraneousValues: true,
    });
  }
}
