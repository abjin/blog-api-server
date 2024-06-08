import { IsString } from 'class-validator';

export class CreatePostRequestBodyDto {
  @IsString()
  categoryId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class GetPostsRequestQueryDto {
  @IsString()
  categoryId: string;
}
