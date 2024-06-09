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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('게시물')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '게시판 게시물 조회' })
  @ApiQuery({ type: GetPostsRequestQueryDto })
  @Get()
  getPosts(@Query() query: GetPostsRequestQueryDto) {
    return this.postsService.getPostsByCategory(query.categoryId);
  }

  @ApiOperation({ summary: '단일 게시물 조회' })
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @ApiOperation({ summary: '게시물 생성' })
  @ApiBody({ type: CreatePostRequestBodyDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@Body() dto: CreatePostRequestBodyDto) {
    return this.postsService.createPost(dto);
  }

  @ApiOperation({ summary: '게시물 삭제' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePostById(id);
  }

  @ApiOperation({ summary: '게시물 수정' })
  @ApiBody({ type: PatchPostRequestBodyDto })
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
