import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from '../Order/order.entity';
import { Product } from '../Products/product.entity';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order)
  order: Order;

  @ManyToMany(() => Product, (product) => product.details)
  @JoinTable()
  products: Product[];
}
