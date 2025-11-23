import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../dtos/CreateOrderDto.dto';
import { authGuard } from '../../guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller(`orders`)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Post() // Crea una orden y la retorna con los detalles de la compra.
  createOrder(@Body() createOrder: CreateOrderDto) {
    try {
      return this.orderService.createOrder(createOrder);
    } catch (e) {
      throw new BadRequestException(`Error creating the order: ${e}`);
    }
  }

  @ApiBearerAuth('jwt')
  @UseGuards(authGuard)
  @Get(`:id`) // Retorna una orden de compra por ID.
  getOrderById(@Param('id') id: string) {
    try {
      return this.orderService.getOrderById(id);
    } catch (e) {
      throw new BadRequestException(`Error: ${e}`);
    }
  }
}
