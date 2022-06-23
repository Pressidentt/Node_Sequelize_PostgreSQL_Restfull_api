import { Module } from '@nestjs/common';
import {CategoriesController} from "./categories.controller";
import {CategoriesService} from "./categories.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "../posts/posts.model";
import {Categories} from "./categories.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService],
    imports: [
        SequelizeModule.forFeature([Post, Categories]),
        JwtModule
    ],
    exports:[CategoriesService]


})
export class CategoriesModule {}

