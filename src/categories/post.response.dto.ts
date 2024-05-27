import { Expose } from 'class-transformer';

@Expose()
export class PostResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categoryId: number;

  constructor(partial: Partial<PostResponseDto>) {
    Object.assign(this, partial);
  }
}
