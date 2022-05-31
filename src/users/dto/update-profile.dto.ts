import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateProfileDto {


   @ApiProperty({example:'Wassim',description:'Name of the user'})
   @IsString({message:'Should be a string'})
   readonly name: string;

   @ApiProperty({example:'El',description:'Surname of the user'})
   @IsString({message: 'Should be a string'})
   readonly surname: string;

   @IsNumber({},{message:'Has to be a number'})
   @ApiProperty({example:'19(18 default)',description:'User age, has to be older 18(not not limited from back-end)'})
   readonly age: number;


}