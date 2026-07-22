import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class SearchQueryDto extends PaginationDto {
    @ApiProperty({ example: 'phone', description: 'Search query string' })
    @IsString()
    @IsNotEmpty({ message: 'Search query is required' })
    q: string;
}
