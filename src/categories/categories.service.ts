import {Injectable} from '@nestjs/common';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Categories} from "./categories.model";

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categories)  private categoryRepository: typeof Categories) {}
    async create(dto: CreateCategoryDto) {
        return await this.categoryRepository.create(dto)
    }
    async delete(dto: CreateCategoryDto) {
        const title = dto.title
        const category = await this.categoryRepository.findOne({where: {title:title}})
        await category.destroy()
        return `Successfully deleted ${title}`
    }
    async getAll() {
        return await this.categoryRepository.findAll({include: {all:true} })
    }

}
