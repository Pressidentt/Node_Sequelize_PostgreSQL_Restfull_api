import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserResetDto {
    @ApiProperty({
        description: 'The mail of user;s, who wants to change the password'
    })
    @IsString()
    readonly email:string;

    @ApiProperty({
        description: 'Token, should be none, created at server'
    })
    @IsString()
    token?:string;
}