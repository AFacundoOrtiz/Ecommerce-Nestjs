import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';
import { authGuard } from 'src/guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller(`orders`)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Post() // Crea una orden.
  createOrder(@Body() createOrder: CreateOrderDto) {
    return this.orderService.createOrder(createOrder);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Get(`:id`) // Retorna una orden de compra por ID.
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }
}
