import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'john@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @ApiProperty({ example: 'Password1!', description: 'User password' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
