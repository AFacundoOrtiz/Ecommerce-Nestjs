import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { Product } from '../Products/product.entity';
import { User } from '../Users/user.entity';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Product, User])],
  controllers: [OrdersController],
  providers: [OrderService, OrderRepository],
})
export class OrdersModule {}
