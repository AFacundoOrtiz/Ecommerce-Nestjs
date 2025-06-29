import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { Product } from '../Products/product.entity';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { ProductsRepository } from '../Products/products.repository';
import { UsersRepository } from '../Users/users.repository';
import { Category } from '../Category/category.entity';
import { User } from '../Users/user.entity';
import { RoleService } from '../Role/role.service';
import { Role } from '../Role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      Product,
      Category,
      User,
      Role,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrderService,
    OrderRepository,
    ProductsRepository,
    UsersRepository,
    RoleService,
  ],
})
export class OrdersModule {}
