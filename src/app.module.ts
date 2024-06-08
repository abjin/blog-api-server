import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommandModule,
    CategoriesModule,
    DbModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
