import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PostCategoryRequestBodyDto } from './categories.request.dto';
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

  @Get(':id')
  getCategoryWithPosts(@Param('id') id: string) {
    return this.categoriesService.getCategoryWithPosts(id);
  }
}
