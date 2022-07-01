import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {GetPostImageDto} from "./dto/get-post-image.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {GetPostsLimitedDto} from "./dto/get-posts-limited.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Client} from "../users/decorators/users.decorator";
import {CreatePostProductionDto} from "./dto/create-post-production.dto";
import {FilterPostsDto} from "./dto/filter-posts.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Create a post, request should consist of: title, content, userId(FROM TOKEN), price, images(up to 4)(png)'})
    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images',4))
    createPost(
        @Client('id') userId: number,
        @Body() dto: CreatePostDto,
        @UploadedFiles() images: Array<Express.Multer.File>
    ) {
        return this.postService.createPostForUsers(dto, userId, images)
    }

    // @Post()
    // createPostForUser(@Client('id') userId: number, dto: CreatePostProductionDto, @UploadedFile() image?: any) {
    //     return this.postService.createPostForUsers(dto, userId, image);
    // }

    @ApiOperation({summary: 'Get all existing posts'})
    @Get()
    getPosts (){
        return this.postService.getAll()
    }

    @ApiOperation({summary: 'IMPORTANT one, get the url path to the post image'})
    @Get('/image_url')
    getPostImageUrl(@Body() dto:GetPostImageDto) {
        return this.postService.getImagesUrl(dto.postId);
    }

    @ApiOperation({summary: 'Get all posts, ordered by time in descending order '})
    @Get('/posts_ordered_by_time_desc')
    getPostsOrderedByTime() {
       return this.postService.get_posts_ordered_by_time();
    }

    @ApiOperation({summary: 'Get the limited number of posts and using offset (for limited posts on user screen and button to show more posts) , ordered by time in descending order '})
    @Get('/posts_with_limits_ordered')
    getPostsWithLimits(@Body() dto:GetPostsLimitedDto) {
        return this.postService.get_posts_ordered_by_time_with_limits(dto);
    }
    @ApiOperation({summary: 'Get filtered_posts'})
    @Get('/filtered_posts')
    filteredPosts(@Body() dto:FilterPostsDto) {
        return this.postService.filter_search(dto)
    }
    @ApiOperation({summary: 'Get all posts ordered by Asc price'})
    @Get('/get_all_orderedAsc_price')
    getAllWithAscendingPrice() {
        return this.postService.getOrderedByPriceAsc()
    }
    /*@ApiOperation({summary: 'Get all posts ordered by Asc price'})
    @Get('/get_all_orderedAsc_price')
    getFilteredPosts(@Param(price_min?:string ) ) {
        return this.postService.getOrderedByPriceAsc()
    }*/
}

