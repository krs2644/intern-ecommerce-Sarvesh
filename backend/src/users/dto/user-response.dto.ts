import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    email: string;

    @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2026-07-19T14:20:00.000Z' })
    updatedAt: Date;
}

export class DeleteProfileResponseDto {
    @ApiProperty({ example: 'Account deleted successfully' })
    message: string;
}
