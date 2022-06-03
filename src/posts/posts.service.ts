import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {GetPostImageDto} from "./dto/get-post-image.dto";
import {join} from "path";
import {GetPostsLimitedDto} from "./dto/get-posts-limited.dto";
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
    async get_posts_ordered_by_time() {
        const posts = await this.postRepository.findAll({include: {all:true}, order: [['createdAt', 'DESC']]})
        return posts;
    }
    async get_posts_ordered_by_time_with_limits(dto:GetPostsLimitedDto) {
        const page_number = dto.pageNumber - 1;
        const number_of_posts = dto.postsLimit;
        const posts = await this.postRepository.findAll({offset:number_of_posts*page_number ,limit:number_of_posts, order: [['createdAt', 'DESC']]})
        return posts;
    }


}
