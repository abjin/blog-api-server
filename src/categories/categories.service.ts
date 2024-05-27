import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CategoryResponseDto } from './category.response.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategory(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    return new CategoryResponseDto(category);
  }

  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories.map((category) => new CategoryResponseDto(category));
  }
}
