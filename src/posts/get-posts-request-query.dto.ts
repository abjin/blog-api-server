import { IsString } from 'class-validator';

export class GetPostsRequestQueryDto {
  @IsString()
  categoryId: string;
}
