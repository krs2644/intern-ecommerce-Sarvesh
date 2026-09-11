import { Injectable, BadGatewayException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImportProductsService {
  constructor(private prisma: PrismaService) {}

  async importProducts() {
    const response = await fetch('https://dummyjson.com/products?limit=30');

    if (!response.ok) {
      throw new BadGatewayException('Failed to fetch products from DummyJSON');
    }

    const data = await response.json();

    const products = data.products.map((product: any) => ({
      dummyId: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand ?? '',
      price: product.price,
      discountPercentage: product.discountPercentage ?? 0,
      rating: product.rating ?? 0,
      stock: product.stock ?? 0,
      thumbnail: product.thumbnail,
      images: product.images ?? [],
    }));

    await this.prisma.$transaction([
      this.prisma.product.deleteMany(),
      this.prisma.product.createMany({ data: products }),
    ]);

    return {
      message: `${products.length} products imported successfully`,
    };
  }
}
