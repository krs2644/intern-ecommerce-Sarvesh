import { IsNotEmpty, IsString } from 'class-validator';

export class SearchQueryDto {
    @IsString()
    @IsNotEmpty({ message: 'Search query is required' })
    q: string;
}
