import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from './dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Get all products with pagination
  async findAll(pagination: PaginationDto): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ skip, take: limit }),
      this.prisma.product.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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

  // Search products with pagination
  async search(query: string, pagination: PaginationDto): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
        {
          category: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
        {
          brand: {
            contains: query,
            mode: 'insensitive' as const,
          },
        },
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get products by category with pagination
  async getByCategory(category: string, pagination: PaginationDto): Promise<PaginatedResponseDto<Product>> {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const where = {
      category: {
        equals: category,
        mode: 'insensitive' as const,
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({ where, skip, take: limit }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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