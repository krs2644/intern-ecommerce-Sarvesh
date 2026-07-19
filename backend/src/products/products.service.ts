import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Get all products
  async findAll() {
    return this.prisma.product.findMany();
  }

  // Get one product
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    return product;
  }

  // Search products
  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            category: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            brand: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  // Get products by category
  async getByCategory(category: string) {
    return this.prisma.product.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
    });
  }

  // Get all unique categories
  async getCategories() {
    const categories = await this.prisma.product.findMany({
      distinct: ['category'],
      select: {
        category: true,
      },
    });

    return categories.map((c) => c.category);
  }
}