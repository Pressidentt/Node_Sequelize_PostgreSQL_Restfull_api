import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCategoryDto{
    @ApiProperty({
        example: 'Network and management',
        description: 'Name of category'
    })
    @IsString({message: 'Should be a string'})
    @Length(5, 40, {message: 'The length of post title should be between 5 and 40'})
    readonly title: string;
}
