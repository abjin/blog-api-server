import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [CategoriesModule, DbModule, PostsModule],
  controllers: [AppController],
})
export class AppModule {}
