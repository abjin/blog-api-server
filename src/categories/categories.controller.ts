import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id/posts')
  getCategoryPosts(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryPosts(id);
  }
}
