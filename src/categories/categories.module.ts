import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoriesCommand } from './cagegories.command';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesCommand],
})
export class CategoriesModule {}
