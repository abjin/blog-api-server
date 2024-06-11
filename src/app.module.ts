import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { DbModule } from './db/db.module';
import { PostsModule } from './posts/posts.module';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { AppCommand } from './app.command';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommandModule,
    CategoriesModule,
    DbModule,
    PostsModule,
    AuthModule,
    InquiriesModule,
  ],
  providers: [AppCommand],
  controllers: [AppController],
})
export class AppModule {}
