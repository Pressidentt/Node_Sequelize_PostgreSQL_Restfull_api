import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@mail.ru', description: 'mail'})
    @IsString({message: 'Should be a string'})
    @IsEmail({}, {message: "Is not mail"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'password'})
    @IsString({message: 'Should be a string'})
    @Length(4, 16, {message: 'The length of password should be between 4 and 16'})
    readonly password: string;
}
