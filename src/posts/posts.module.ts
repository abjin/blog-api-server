import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsCommand } from './posts.command';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsCommand],
})
export class PostsModule {}
