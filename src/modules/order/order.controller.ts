import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderItem } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body('email') email: string,
    @Body('items') items: OrderItem[],
    @Body('paymentType') paymentType: string
  ) {
    return await this.orderService.createOrder(email, items, paymentType);
  }
}