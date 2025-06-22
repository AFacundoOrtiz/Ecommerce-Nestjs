import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(createOrder: CreateOrderDto) {
    return this.orderRepository.addOrder(createOrder);
  }

  getOrderById(id: string) {
    return this.orderRepository.getOrder(id);
  }
}
