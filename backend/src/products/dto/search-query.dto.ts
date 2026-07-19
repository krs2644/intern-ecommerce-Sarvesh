import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchQueryDto {
    @ApiProperty({ example: 'phone', description: 'Search query string' })
    @IsString()
    @IsNotEmpty({ message: 'Search query is required' })
    q: string;
}
