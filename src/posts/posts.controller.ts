import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  GetPostsRequestQueryDto,
  CreatePostRequestBodyDto,
  PatchPostRequestBodyDto,
} from './posts.request.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@Body() dto: CreatePostRequestBodyDto) {
    return this.postsService.createPost(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePostById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PatchPostRequestBodyDto,
  ) {
    return this.postsService.patchPost(id, {
      id: dto.id,
      categoryId: dto.categoryId,
      content: dto.content,
      title: dto.title,
    });
  }
}
