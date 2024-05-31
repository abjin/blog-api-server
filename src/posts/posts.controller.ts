import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsRequestQueryDto } from './get-posts-request-query.dto';
import { CreatePostRequestBodyDto } from './create-post-reqest-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() query: GetPostsRequestQueryDto) {
    return this.postsService.getPostsByCategory(query.categoryId);
  }

  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @Post()
  CreatePost(@Body() dto: CreatePostRequestBodyDto) {
    return this.postsService.createPost(dto);
  }
}
