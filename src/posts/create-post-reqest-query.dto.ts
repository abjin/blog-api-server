import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class CreatePostRequestBodyDto {
  @IsString()
  categoryId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
