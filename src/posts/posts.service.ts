import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {GetPostsLimitedDto} from "./dto/get-posts-limited.dto";
import {CreatePostProductionDto} from "./dto/create-post-production.dto";
import { Images } from './images.model';
import {CreatePostDto} from "./dto/create-post.dto";

const imageType = require('image-type');
@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        @InjectModel(Images) private imagesRepository: typeof Images,
        private fileService: FilesService
    ) {}

    // async create(dto: CreatePostDto, images: Express.Multer.File[]) {
    //     const fileName = await this.fileService.createFile(images);
    //     const post = await this.postRepository.create({...dto, fileName})
    //     return post;
    // }

    async createPostForUsers(dto:CreatePostDto, userId:number, image?: any) {
        const images: string[] = await this.fileService.createMultipleFiles(image);
        const post = await this.postRepository.create({...dto, userId })

        for (let i = 0; i < images.length; i++) {
            await this.imagesRepository.create({
                postId: post.id,
                image: images[i]
            })
        }

        return post;
    }

    async getImagesUrl(postId: number) {
        const images: Images[] = await this.imagesRepository.findAll({where: {postId}});

        const urls: string[] = images.map((image: Images) => image.image); // join(__dirname,'..','static',image_name)
        return urls;
    }

    async getAll() {
       const posts = await this.postRepository.findAll({include: {all:true}});
       return posts;
    }

    async get_posts_ordered_by_time() {
        const posts = await this.postRepository.findAll({
            include: { all: true },
            order: [['createdAt', 'DESC']]
        });

        return posts;
    }

    async get_posts_ordered_by_time_with_limits(dto:GetPostsLimitedDto) {
        const page_number = dto.pageNumber - 1;
        const number_of_posts = dto.postsLimit;
        const posts = await this.postRepository.findAll({offset:number_of_posts*page_number ,limit:number_of_posts, order: [['createdAt', 'DESC']]})
        return posts;
    }
}
