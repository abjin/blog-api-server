import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPostsByCategory(categoryId: string) {
    return this.prismaService.post.findMany({ where: { categoryId } });
  }

  getPostById(id: number) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  createPost(data: { categoryId: string; title: string; content: string }) {
    return this.prismaService.post.create({ data });
  }

  deletePostById(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }

  patchPost(id: number, data: Partial<Post>) {
    return this.prismaService.post.update({ where: { id }, data });
  }
}
