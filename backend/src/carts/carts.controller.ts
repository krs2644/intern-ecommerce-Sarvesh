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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { ApiAuth, CurrentUser } from '../decorators';
import { AddToCartDto } from './dto';
import { CartResponseDto, CartItemResponseDto } from './dto/cart-response.dto';

@ApiTags('Carts')
@ApiBearerAuth()
@Controller('carts')
@ApiAuth()
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user cart with items' })
  @ApiResponse({ status: 200, description: 'Cart retrieved', type: CartResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCart(@CurrentUser() user: any) {
    return this.cartsService.getCart(user.id);
  }

  @Get('total')
  @ApiOperation({ summary: 'Get cart total price' })
  @ApiResponse({ status: 200, description: 'Cart total', schema: { example: 1499.99 } })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTotal(@CurrentUser() user: any) {
    return this.cartsService.getTotal(user.id);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add product to cart' })
  @ApiResponse({ status: 201, description: 'Product added to cart', type: CartItemResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
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
  @ApiOperation({ summary: 'Increase cart item quantity by 1' })
  @ApiParam({ name: 'id', description: 'Cart item ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Quantity increased', type: CartItemResponseDto })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  increase(
    @Param('id', ParseIntPipe) cartItemId: number,
  ) {
    return this.cartsService.increaseQuantity(cartItemId);
  }

  @Patch('decrease/:id')
  @ApiOperation({ summary: 'Decrease cart item quantity by 1 (removes if qty <= 1)' })
  @ApiParam({ name: 'id', description: 'Cart item ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Quantity decreased', type: CartItemResponseDto })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  decrease(
    @Param('id', ParseIntPipe) cartItemId: number,
  ) {
    return this.cartsService.decreaseQuantity(cartItemId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'id', description: 'Cart item ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Item removed', type: CartItemResponseDto })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  remove(
    @Param('id', ParseIntPipe) cartItemId: number,
  ) {
    return this.cartsService.removeItem(cartItemId);
  }

  @Delete()
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  clearCart(@CurrentUser() user: any) {
    return this.cartsService.clearCart(user.id);
  }
}
