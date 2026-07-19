import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../products/dto/product-response.dto';

export class CartItemResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    cartId: number;

    @ApiProperty({ example: 5 })
    productId: number;

    @ApiProperty({ example: 2 })
    quantity: number;

    @ApiProperty({ type: ProductResponseDto })
    product: ProductResponseDto;
}

export class CartResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    userId: number;

    @ApiProperty({ type: [CartItemResponseDto] })
    items: CartItemResponseDto[];

    @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-07-19T14:20:00.000Z' })
    updatedAt: Date;
}

export class CartTotalResponseDto {
    @ApiProperty({ example: 1499.99 })
    total: number;
}
