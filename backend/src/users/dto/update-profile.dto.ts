import { IsEmail, IsNotEmpty, IsOptional, MinLength, Matches } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Name is required' })
    name?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Please enter a valid email' })
    email?: string;

    @IsOptional()
    @MinLength(7, {
        message: 'Password must be at least 7 characters long',
    })
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        {
            message: 'Password must contain at least one uppercase letter, one number, and one special character',
        },
    )
    password?: string;
}
