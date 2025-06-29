import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderDetail } from '../OrderDetail/orderDetail.entity';
import { Product } from '../Products/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';
import { UsersRepository } from '../Users/users.repository';
import { ProductsRepository } from '../Products/products.repository';
import { Category } from '../Category/category.entity';
import { User } from '../Users/user.entity';
import { Role } from '../Role/role.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private usersRepo: UsersRepository,
    private productsRepo: ProductsRepository,
  ) {}

  async getOrder(id: string) {
    return this.orderRepository.findOne({
      where: { id },
      relations: [`orderDetail`],
    });
  }

  async addOrder(createOrder: CreateOrderDto) {
    const { userId, product } = createOrder;

    const user = await this.usersRepo.getById(userId);

    const productIds = product.map((product) => product.id);

    const foundProducts = await Promise.all(
      productIds.map((id) => this.productsRepo.getProductById(id)),
    );

    const validatedProducts = this.productsRepo.validateProducts(foundProducts);

    await Promise.all(
      validatedProducts.map((product) => this.productRepository.save(product)),
    );

    const total = validatedProducts.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    const orderDetail = this.orderDetailRepository.create({
      price: total,
      products: validatedProducts,
    });
    await this.orderDetailRepository.save(orderDetail);

    const order = this.orderRepository.create({ user, orderDetail });

    await this.orderRepository.save(order);
    return {
      message: 'Order created.',
      orderDetail,
    };
  }
}
