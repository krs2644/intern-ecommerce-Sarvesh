import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
    @IsInt({ message: 'Product ID must be an integer' })
    @IsNotEmpty({ message: 'Product ID is required' })
    productId: number;

    @IsOptional()
    @IsInt({ message: 'Quantity must be an integer' })
    @Min(1, { message: 'Quantity must be at least 1' })
    quantity?: number;
}
