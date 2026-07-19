import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiAuth, CurrentUser } from '../decorators';
import { AddToCartDto } from './dto';

@Controller('carts')
@ApiAuth()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  getCart(@CurrentUser() user: any) {
    return this.cartsService.getCart(user.id);
  }

  @Get('total')
  getTotal(@CurrentUser() user: any) {
    return this.cartsService.getTotal(user.id);
  }

  @Post('add')
  addToCart(
    @CurrentUser() user: any,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartsService.addToCart(
      user.id,
      dto.productId,
      dto.quantity ?? 1,
    );
  }

  @Patch('increase/:id')
  increase(
    @Param('id', ParseIntPipe)
    cartItemId: number,
  ) {
    return this.cartsService.increaseQuantity(cartItemId);
  }

  @Patch('decrease/:id')
  decrease(
    @Param('id', ParseIntPipe)
    cartItemId: number,
  ) {
    return this.cartsService.decreaseQuantity(cartItemId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    cartItemId: number,
  ) {
    return this.cartsService.removeItem(cartItemId);
  }

  @Delete()
  clearCart(@CurrentUser() user: any) {
    return this.cartsService.clearCart(user.id);
  }
}
