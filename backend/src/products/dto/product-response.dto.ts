import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    dummyId: number;

    @ApiProperty({ example: 'iPhone 15' })
    title: string;

    @ApiProperty({ example: 'Apple iPhone 15 with A16 Bionic chip' })
    description: string;

    @ApiProperty({ example: 'smartphones' })
    category: string;

    @ApiProperty({ example: 'Apple', nullable: true })
    brand?: string;

    @ApiProperty({ example: 999.99 })
    price: number;

    @ApiProperty({ example: 12.5, nullable: true })
    discountPercentage?: number;

    @ApiProperty({ example: 4.5, nullable: true })
    rating?: number;

    @ApiProperty({ example: 50 })
    stock: number;

    @ApiProperty({ example: 'https://example.com/thumbnail.jpg' })
    thumbnail: string;

    @ApiProperty({ example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'] })
    images: string[];

    @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-07-19T14:20:00.000Z' })
    updatedAt: Date;
}

export class ImportProductsResponseDto {
    @ApiProperty({ example: '30 products imported successfully' })
    message: string;
}
