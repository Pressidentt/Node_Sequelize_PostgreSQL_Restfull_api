import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {GetPostImageDto} from "./dto/get-post-image.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {GetPostsLimitedDto} from "./dto/get-posts-limited.dto";

@ApiTags('Posts')
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


    @ApiOperation({summary: 'Get all posts, ordered by time in descending order '})
    @Get('/posts_ordered')
    getPostsOrderedByTime() {
       return this.postService.get_posts_ordered_by_time();
    }
    @ApiOperation({summary: 'Get the limited number of posts and using offset (for limited posts on user screen and button to show more posts) , ordered by time in descending order '})
    @Get('/posts_with_limits_ordered')
    getPostsWithLimits(@Body() dto:GetPostsLimitedDto) {
        return this.postService.get_posts_ordered_by_time_with_limits(dto);
    }
}

