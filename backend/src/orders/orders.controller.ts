import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post("place")
  placeOrder(@Request() req: any) {
    return this.ordersService.placeOrder(req.user.id);
  }

  @Get()
  getOrders(@Request() req: any) {
    return this.ordersService.getOrders(req.user.id);
  }

}
