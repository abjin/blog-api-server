import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CategoriesCommand {
  constructor(private readonly prismaService: PrismaService) {}

  @Command({ command: 'get:all:categories' })
  async getAllPosts() {
    const categories = await this.prismaService.category.findMany();
    console.log(categories);
  }
}
