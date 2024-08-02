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
import { BannersModule } from './banners/banners.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    { ...HttpModule.register({}), global: true },
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    CommandModule,
    CategoriesModule,
    DbModule,
    PostsModule,
    AuthModule,
    InquiriesModule,
    BannersModule,
  ],
  providers: [AppCommand],
  controllers: [AppController],
})
export class AppModule {}
