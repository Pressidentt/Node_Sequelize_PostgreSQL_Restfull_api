import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: 'Searching for metal supplier for our company', description: 'Title of post, should be between 5 and 60 symbols'})
    @IsString({message: 'Should be a string'})
    @Length(5, 60, {message: 'The length of post title should be between 5 and 60'})
    
    readonly title: string;
    @ApiProperty({example: 'Searching for metal supplier for our company and much more...', description: 'The content part of post should consist of 0 - 700 sybmols'})
    @IsString({message: 'Should be a string'})
    @Length(5, 500, {message: 'The length of post title should be between 5 and 500'})
    readonly content: string;
  
    @ApiProperty({example: '6', description: 'The id of user, whose post it is'})
    readonly userId: number;
}
