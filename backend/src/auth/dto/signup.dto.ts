import { IsEmail, IsNotEmpty, Matches, MinLength, } from 'class-validator';

export class SignupDto {

    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Please enter a valid email' })
    email: string;

    @MinLength(7, {
        message: 'Password must be at least 7 characters long'
    })
    @Matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
        {
            message: 'Password must contain atleast one uppercase letter, one number, and one special character',
        },
    )
    password: string;
}