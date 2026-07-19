import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '../../products/dto/product-response.dto';

export class OrderItemResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    orderId: number;

    @ApiProperty({ example: 5 })
    productId: number;

    @ApiProperty({ example: 2 })
    quantity: number;

    @ApiProperty({ example: 999.99 })
    price: number;

    @ApiProperty({ type: ProductResponseDto })
    product: ProductResponseDto;
}

export class OrderResponseDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 1 })
    userId: number;

    @ApiProperty({ example: 1999.98 })
    totalPrice: number;

    @ApiProperty({ example: 'Placed' })
    status: string;

    @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-07-19T14:20:00.000Z' })
    updatedAt: Date;

    @ApiProperty({ type: [OrderItemResponseDto] })
    orderItems: OrderItemResponseDto[];
}

export class PlaceOrderResponseDto {
    @ApiProperty({ example: 'Order placed successfully' })
    message: string;

    @ApiProperty({ type: OrderResponseDto })
    order: OrderResponseDto;
}
