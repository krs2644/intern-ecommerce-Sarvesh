import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { ApiAuth, CurrentUser } from '../decorators';
import { OrderResponseDto, PlaceOrderResponseDto } from './dto/order-response.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@ApiAuth()
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post('place')
  @ApiOperation({ summary: 'Place order from current cart' })
  @ApiResponse({ status: 201, description: 'Order placed successfully', type: PlaceOrderResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cart is empty' })
  placeOrder(@CurrentUser() user: any) {
    return this.ordersService.placeOrder(user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for current user' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [OrderResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getOrders(@CurrentUser() user: any) {
    return this.ordersService.getOrders(user.id);
  }

}
