import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { GetPostsRequestQueryDto } from './posts.request.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPostsByCategory({ categoryId, take, cursor }: GetPostsRequestQueryDto) {
    return this.prismaService.post.findMany({
      where: { categoryId },
      take,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });
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
