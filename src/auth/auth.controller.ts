import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @ApiOperation({summary: 'Login controller uses CreateUser schema'})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Ordinary user registration controller uses CreateUser schema'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Admin registration controller uses CreateUser schema, wont be available at production'})
    @Post('/admin_registration')
    registrationAdmin(@Body() userDto: CreateUserDto) {
        return this.authService.registrationAdmin(userDto)
    }

}
