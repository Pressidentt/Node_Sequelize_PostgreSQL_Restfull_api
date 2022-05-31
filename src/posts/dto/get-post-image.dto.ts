import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class GetPostImageDto{
    @IsNumber({},{message: 'Should be a number'})
    @ApiProperty({example: '6', description: 'The post id, which image to return'})
    readonly postId: number;
}
