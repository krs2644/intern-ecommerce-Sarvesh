import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async placeOrder(userId: number) {

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new NotFoundException("Cart is empty");
    }

    let total = 0;

    for (const item of cart.items) {
      total += item.product.price * item.quantity;
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        totalPrice: total,
        status: "Placed",
      },
    });

    for (const item of cart.items) {

      await this.prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        },
      });

    }

    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return {
      message: "Order placed successfully",
      order,
    };
  }

  async getOrders(userId: number) {

    return this.prisma.order.findMany({

      where: {
        userId,
      },

      include: {

        orderItems: {

          include: {
            product: true,
          },

        },

      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }
}
