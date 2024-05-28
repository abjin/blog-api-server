import { Expose, Type } from 'class-transformer';
import { PostResponseDto } from './post.response.dto';
import { Post } from '@prisma/client';

@Expose()
export class CategoryResponseDto {
  id: string;
  title: string;
  @Type(() => PostResponseDto)
  posts?: Post[];

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
}