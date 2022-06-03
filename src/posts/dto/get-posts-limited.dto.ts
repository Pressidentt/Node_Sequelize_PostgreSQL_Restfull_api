import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class GetPostsLimitedDto{
    @IsNumber({},{message: 'Should be a number'})
    @ApiProperty({example: '6', description: 'The page number, e.g 1 for first page and e.t.c'})
    readonly pageNumber: number;
    @IsNumber({},{message: 'Should be a number'})
    @ApiProperty({example: '6', description: 'The number of posts to show for each page'})
    readonly postsLimit: number;
}
