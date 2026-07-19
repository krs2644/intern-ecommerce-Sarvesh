import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImportProductsService {
  constructor(private prisma: PrismaService) {}

  async importProducts() {
    const response = await fetch(
      'https://dummyjson.com/products?limit=30',
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products from DummyJSON');
    }

    const data = await response.json();

    await this.prisma.product.deleteMany();

    for (const product of data.products) {
      await this.prisma.product.create({
        data: {
          dummyId: product.id,
          title: product.title,
          description: product.description,
          category: product.category,
          brand: product.brand,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          thumbnail: product.thumbnail,
          images: product.images,
        },
      });
    }

    return {
      message: '30 products imported successfully',
    };
  }
}
