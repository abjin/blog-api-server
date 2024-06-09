import { IsOptional, IsString } from 'class-validator';

export class PostCategoryRequestBodyDto {
  @IsString()
  id: string;

  @IsString()
  title: string;
}

export class PatchCategoryRequestBodyDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  title: string;
}
