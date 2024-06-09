import { IsString } from 'class-validator';

export class PostCategoryRequestBodyDto {
  @IsString()
  id: string;

  @IsString()
  title: string;
}
