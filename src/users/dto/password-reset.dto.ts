import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PasswordResetDto {
   @ApiProperty({
      description: 'New password for user'
   })
   @IsString()
   readonly new_password:string;
}