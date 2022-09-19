import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UserResetDto} from "./dto/user-reset.dto";
import {PasswordService} from "./password.service";
import {PasswordResetDto} from "../users/dto/password-reset.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('password')
export class PasswordController {
    constructor(private passwordService:PasswordService) {}

    @ApiOperation({summary: 'Receive password reset email'})
    @ApiResponse({status: 200})
    @Post('/sendEmailReset')
 public async createReset(@Body() dto : UserResetDto){
        return this.passwordService.reset_password(dto)
   }

    @ApiOperation({summary: 'Change password, takes argument new password and token from url(if needed could be changed to client gives token way)'})
    @ApiResponse({status: 200})
   @Post('/changePassword/:id')
    changePassword(@Param('id') id:string, @Body() dto: PasswordResetDto){
       return this.passwordService.changePassword(dto,id);
   }

}
