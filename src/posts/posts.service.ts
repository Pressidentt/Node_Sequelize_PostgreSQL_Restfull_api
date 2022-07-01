import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {GetPostsLimitedDto} from "./dto/get-posts-limited.dto";
import {Images} from './images.model';
import {CreatePostDto} from "./dto/create-post.dto";
import {FilterPostsDto} from "./dto/filter-posts.dto";

const { Op } = require("sequelize");


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

    async search_system(search:string){
        const answer = []
        const posts_by_name = await this.postRepository.findAll({
            where:{title:search},
            order:[['createdAt', 'DESC']]
            })
    }

    async filter_search(dto:FilterPostsDto){
        let price_min_given = 0
        let price_max_given = 100000
        let answer = []
        console.log('Min : ')
        console.log(dto.price_min)
        console.log('Max :')
        console.log(dto.price_max)
        if(dto.price_min){
           price_min_given = dto.price_min
        }
        if(dto.price_max) {
            price_max_given = dto.price_max
        }

        if(dto.category_id){
            answer = await this.postRepository.findAll({
                where:{
                    categoryId:dto.category_id,
                    price:{ [Op.gt]: price_min_given, [Op.lte]: price_max_given }
                }
            })
        }
        else {
            answer = await this.postRepository.findAll({
                where: {
                    price:{ [Op.gt]: price_min_given, [Op.lte]: price_max_given }
                }
            })
        }

        return answer
    }
    async getOrderedByPriceAsc(){
        return await this.postRepository.findAll({
            order: [['price', 'ASC']]
        })
    }
}
