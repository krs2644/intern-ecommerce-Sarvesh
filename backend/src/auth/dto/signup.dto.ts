import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class SignupDto {
    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @ApiProperty({ example: 'Password1!', description: 'Password with min 7 chars, 1 uppercase, 1 number, 1 special char' })
    @MinLength(7, { message: 'Password must be at least 7 characters long' })
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        { message: 'Password must contain atleast one uppercase letter, one number, and one special character' },
    )
    password: string;
}
