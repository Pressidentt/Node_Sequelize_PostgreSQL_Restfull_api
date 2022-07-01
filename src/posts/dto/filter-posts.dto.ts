import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString, Length} from "class-validator";

export class FilterPostsDto{
    @ApiProperty({
        example: '0+',
        description: 'Minimum price tag of a post (not obligatory)'
    })

    @IsNumber({}, {message:'Has to be a number'})
    @IsOptional()
    readonly price_min?: number;

    @ApiProperty({
        example: '<1000000',
        description: 'Max price tag of a post (not obligatory)'
    })
    @IsNumber({}, {message:'Has to be a number'})
    @IsOptional()
    readonly price_max?: number;

    @ApiProperty({
        example: 'IT',
        description: 'The id of the category for filtering, (not obligatory)'
    })

    @IsOptional()
    @IsNumber({}, {message:'Has to be a number'})
    readonly category_id?: number;

}
