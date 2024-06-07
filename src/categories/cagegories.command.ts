import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class CategoriesCommand {
  constructor(private readonly prismaService: PrismaService) {}

  @Command({ command: 'post:categories' })
  async postCategories() {
    return this.prismaService.category.createMany({
      data: [
        { id: 'INTRO', title: '회사소개' },
        {
          id: 'EXAMPLE',
          title: '구축사례',
        },
        {
          id: 'NOTICE',
          title: '공지사항',
        },
      ],
    });
  }

  @Command({ command: 'get:all:categories' })
  async getAllCategories() {
    const categories = await this.prismaService.category.findMany();
    console.log(categories);
  }
}
{
  {
    const data = [
      {
        id: 'INTRO',
        title: '회사소개',
      },
      {
        id: 'EXAMPLE',
        title: '구축사례',
      },
      {
        id: 'NOTICE',
        title: '공지사항',
      },
    ];

    const result = data.map((i) => i.id).join('| ');
    console.log(result);
  }
}
