import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdateProfileDto {
    @ApiPropertyOptional({ example: 'John Doe', description: 'Updated user name' })
    @IsOptional()
    @IsNotEmpty({ message: 'Name is required' })
    name?: string;

    @ApiPropertyOptional({ example: 'john@example.com', description: 'Updated email address' })
    @IsOptional()
    @IsEmail({}, { message: 'Please enter a valid email' })
    email?: string;

    @ApiPropertyOptional({ example: 'NewPassword1!', description: 'New password (min 7 chars, 1 uppercase, 1 number, 1 special char)' })
    @IsOptional()
    @MinLength(7, { message: 'Password must be at least 7 characters long' })
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        { message: 'Password must contain at least one uppercase letter, one number, and one special character' },
    )
    password?: string;
}
