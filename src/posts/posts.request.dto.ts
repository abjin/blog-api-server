import { IsNumber, IsOptional, IsString } from 'class-validator';

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

export class PatchPostRequestBodyDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}
