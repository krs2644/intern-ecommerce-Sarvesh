import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiAuth, CurrentUser } from '../decorators';

@Controller('orders')
@ApiAuth()
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post('place')
  placeOrder(@CurrentUser() user: any) {
    return this.ordersService.placeOrder(user.id);
  }

  @Get()
  getOrders(@CurrentUser() user: any) {
    return this.ordersService.getOrders(user.id);
  }

}
