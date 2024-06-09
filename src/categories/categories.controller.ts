import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  PatchCategoryRequestBodyDto,
  PostCategoryRequestBodyDto,
} from './categories.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('게시판')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: '게시판 생성' })
  @ApiBody({ type: PostCategoryRequestBodyDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  postCategory(@Body() dto: PostCategoryRequestBodyDto) {
    return this.categoriesService.postCategory(dto.id, dto.title);
  }

  @ApiOperation({ summary: '모든 게시판 조회' })
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiOperation({ summary: '게시판 삭제' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

  @ApiOperation({ summary: '게시판 수정' })
  @ApiBody({ type: PatchCategoryRequestBodyDto })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  patchCategory(
    @Param('id') id: string,
    @Body() dto: PatchCategoryRequestBodyDto,
  ) {
    return this.categoriesService.patchCategory(id, {
      id: dto.id,
      title: dto.title,
    });
  }

  @ApiOperation({ summary: '게시판 게시물 조회' })
  @Get(':id')
  getCategoryWithPosts(@Param('id') id: string) {
    return this.categoriesService.getCategoryWithPosts(id);
  }
}
