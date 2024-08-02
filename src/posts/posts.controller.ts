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
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  GetPostsRequestQueryDto,
  CreatePostRequestBodyDto,
  PatchPostRequestBodyDto,
  GetPostsSignedUrlRequestQueryDto,
} from './posts.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { HttpCacheInterceptor } from 'src/http-cache.interceptor';
import { InmemoryCacheKeys } from 'src/constants';

@ApiTags('게시물')
@UseInterceptors(HttpCacheInterceptor)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: '게시물 signed url 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get('signed-url')
  getPostsSignedUrl(@Query() { fileName }: GetPostsSignedUrlRequestQueryDto) {
    return this.postsService.getPostsSignedUrl(fileName);
  }

  @ApiOperation({ summary: '게시판 게시물 조회' })
  @CacheKey(InmemoryCacheKeys.GetPosts)
  @CacheTTL(1000 * 60)
  @Get()
  getPosts(@Query() query: GetPostsRequestQueryDto) {
    return this.postsService.getPostsByCategory(query);
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
      image: dto.image,
    });
  }
}
