import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CategoryResponseDto } from './category.response.dto';
import { PostResponseDto } from './post.response.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new CategoryResponseDto(category));
  }

  async getCategoryPosts(categoryId: string) {
    const posts = await this.prisma.post.findMany({ where: { categoryId } });
    return posts.map((post) => new PostResponseDto(post));
  }
}
