import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetPostsRequestQueryDto } from './get-posts-request-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(@Query() query: GetPostsRequestQueryDto) {
    return this.postsService.getPostsByCategory(query.categoryId);
  }
}
