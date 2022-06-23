import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Categories (for Admin only)')
@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService:CategoriesService) {}

    @ApiOperation({summary:'Create an category'})
    @Roles("Admin")
    @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto)
    }

    @ApiOperation({summary:'Delete a category (not tested/too lazy)'})
    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Post('/delete')
    delete(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.delete(dto)
    }


    @ApiOperation({summary:'Get all categories with connected with them posts'})
    @Roles("Admin")
    @UseGuards(RolesGuard)
    @Get('/all')
    getAll() {
        return this.categoriesService.getAll()
    }

}
