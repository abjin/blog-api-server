import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CategoryResponseDto } from './categories.response.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  postCategory(id: string, title: string) {
    return this.prisma.category.create({ data: { id, title } });
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new CategoryResponseDto(category));
  }

  async getCategoryWithPosts(categoryId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: { posts: { take: 8 } },
    });
    return new CategoryResponseDto(category);
  }

  deleteCategory(categoryId: string) {
    return this.prisma.category.delete({
      where: { id: categoryId },
    });
  }

  patchCategory(id: string, data: Partial<Category>) {
    return this.prisma.category.update({ where: { id }, data });
  }
}
