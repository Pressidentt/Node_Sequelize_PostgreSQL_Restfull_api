import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetPostImageDto} from "./dto/get-post-image.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Posts, 3 functions : 1) createPost, 2) getAllPosts, 3)getPostImage ')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Create a post, request should consist of: title, content, userId, image(png)'})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.create(dto, image)
    }

    @ApiOperation({summary: 'Get all existing posts'})
    @Get()
    getPosts (){
        return this.postService.get_posts()
    }

    @Get('/post_image')
    getPostImage(@Body() dto:GetPostImageDto) {
        return this.postService.get_post_image(dto)
    }

    @ApiOperation({summary: 'IMPORTANT one, get the url path to the post image'})
    @Get('/image_url')
    getPostImageUrl(@Body() dto:GetPostImageDto) {
        return this.postService.get_image_url(dto)
    }
}

