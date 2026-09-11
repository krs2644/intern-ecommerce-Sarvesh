import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a cart if it doesn't exist
   */
  private async getOrCreateCart(userId: number) {
    let cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
      });
    }

    return cart;
  }

  /**
   * Get complete cart
   */
  async getCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);

    return this.prisma.cart.findUnique({
      where: {
        id: cart.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  /**
   * Add product
   */
  async addToCart(userId: number, productId: number, quantity = 1) {
    const cart = await this.getOrCreateCart(userId);

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existing = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    const newQuantity = existing ? existing.quantity + quantity : quantity;

    if (newQuantity > product.stock) {
      throw new BadRequestException(
        `Insufficient stock for "${product.title}". Available: ${product.stock}, requested: ${newQuantity}`,
      );
    }

    if (existing) {
      return this.prisma.cartItem.update({
        where: {
          id: existing.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  /**
   * Increase quantity
   */
  async increaseQuantity(cartItemId: number, userId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: { cart: true, product: true },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (item.cart.userId !== userId) {
      throw new ForbiddenException('You do not have access to this cart item');
    }

    const newQuantity = item.quantity + 1;

    if (newQuantity > item.product.stock) {
      throw new BadRequestException(
        `Insufficient stock for "${item.product.title}". Available: ${item.product.stock}`,
      );
    }

    return this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: newQuantity,
      },
    });
  }

  /**
   * Decrease quantity
   */
  async decreaseQuantity(cartItemId: number, userId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: { cart: true },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (item.cart.userId !== userId) {
      throw new ForbiddenException('You do not have access to this cart item');
    }

    if (item.quantity <= 1) {
      return this.removeItem(cartItemId, userId);
    }

    return this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: item.quantity - 1,
      },
    });
  }

  /**
   * Remove product
   */
  async removeItem(cartItemId: number, userId: number) {
    const item = await this.prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
      include: { cart: true },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (item.cart.userId !== userId) {
      throw new ForbiddenException('You do not have access to this cart item');
    }

    return this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  /**
   * Total Price
   */
  async getTotal(userId: number) {
    const cart = await this.getCart(userId);

    if (!cart) return 0;

    let total = 0;

    for (const item of cart.items) {
      total += item.product.price * item.quantity;
    }

    return total;
  }

  /**
   * Clear cart
   */
  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });

    if (!cart) {
      return;
    }

    return this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });
  }
}
