import { ApiProperty } from '@nestjs/swagger';

export class UserPayloadDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;
}

export class SignupResponseDto {
    @ApiProperty({ example: 'User registered successfully' })
    message: string;

    @ApiProperty({ type: UserPayloadDto })
    user: UserPayloadDto;
}

export class LoginResponseDto {
    @ApiProperty({ example: 'Login Successful' })
    message: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;

    @ApiProperty({ type: UserPayloadDto })
    user: UserPayloadDto;
}
