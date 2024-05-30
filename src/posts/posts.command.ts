import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PostsCommand {
  constructor(private readonly prismaService: PrismaService) {}

  @Command({ command: 'get:all:post' })
  async getAllPosts() {
    const posts = await this.prismaService.post.findMany();
    console.log(posts);
  }
}
