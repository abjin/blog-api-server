import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPostsByCategory(categoryId: string) {
    return this.prismaService.post.findMany({ where: { categoryId } });
  }
}
