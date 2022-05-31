import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {GetPostImageDto} from "./dto/get-post-image.dto";
import {join} from "path";
const imageType = require('image-type');
@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName})
        return post;
    }

    async get_posts() {
       const posts = await this.postRepository.findAll({include: {all:true}})
        return posts;
    }


    async get_post_image(dto: GetPostImageDto) {
        const id = dto.postId;
        const post = await this.postRepository.findByPk(id);
        const image_file = post.image;
        const image = await this.fileService.getFile(image_file)

        return image;
       }
    async get_image_url(dto:GetPostImageDto) {
        const id = dto.postId;
        const post = await this.postRepository.findByPk(id);
        const image_name = post.image;
        const url = join(__dirname,'..','static',image_name)

        return url;

    }


}
