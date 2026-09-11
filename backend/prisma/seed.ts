import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding products from DummyJSON...');

  const response = await fetch('https://dummyjson.com/products?limit=30');

  if (!response.ok) {
    throw new Error('Failed to fetch products from DummyJSON');
  }

  const data = await response.json();

  await prisma.product.deleteMany();

  for (const product of data.products) {
    await prisma.product.create({
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

  console.log('30 products seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
