import { Expose } from 'class-transformer';

@Expose()
export class CategoryResponseDto {
  id: string;
  title: string;

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
}
