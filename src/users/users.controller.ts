import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {Client} from "./decorators/users.decorator";

@ApiTags('User')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Dont use it, instead use auth/login'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }


    @ApiOperation({summary: 'Get all users, requires Admin token'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Give a role'})
    @ApiResponse({status: 200})
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }

    @ApiOperation({summary: 'Update user profile section, requires user bearer token'})
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200})
    @Post('/updateProfile')
    updateProfile(@Client('id') userid:number, @Body() dto: UpdateProfileDto) {
        return this.usersService.profile_update(dto, userid);
    }
}
