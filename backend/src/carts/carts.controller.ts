import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  getCart(@Request() req: any) {
    return this.cartsService.getCart(req.user.id);
  }

  @Get('total')
  getTotal(@Request() req: any) {
    return this.cartsService.getTotal(req.user.id);
  }

  @Post('add')
  addToCart(
    @Request() req: any,
    @Body()
    body: {
      productId: number;
      quantity?: number;
    },
  ) {
    return this.cartsService.addToCart(
      req.user.id,
      body.productId,
      body.quantity ?? 1,
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
  clearCart(@Request() req: any) {
    return this.cartsService.clearCart(req.user.id);
  }
}
