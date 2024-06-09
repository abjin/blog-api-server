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

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  postCategory(@Body() dto: PostCategoryRequestBodyDto) {
    return this.categoriesService.postCategory(dto.id, dto.title);
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }

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

  @Get(':id')
  getCategoryWithPosts(@Param('id') id: string) {
    return this.categoriesService.getCategoryWithPosts(id);
  }
}
