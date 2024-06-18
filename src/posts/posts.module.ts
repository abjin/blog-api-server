import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { GoogleCloudModule } from '@libs/google-cloud';

@Module({
  imports: [GoogleCloudModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
