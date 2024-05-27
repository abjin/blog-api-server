import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [CategoriesModule, DbModule],
  controllers: [AppController],
})
export class AppModule {}
