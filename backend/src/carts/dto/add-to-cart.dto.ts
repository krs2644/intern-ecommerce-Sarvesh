import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
    @ApiProperty({ example: 1, description: 'Product ID to add to cart' })
    @IsInt({ message: 'Product ID must be an integer' })
    @IsNotEmpty({ message: 'Product ID is required' })
    productId: number;

    @ApiPropertyOptional({ example: 1, description: 'Quantity (defaults to 1)', default: 1 })
    @IsOptional()
    @IsInt({ message: 'Quantity must be an integer' })
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity?: number;
}
