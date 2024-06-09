import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PostCategoryRequestBodyDto {
  @ApiProperty({ description: '게시판 고유아이디' })
  @IsString()
  id: string;

  @ApiProperty({ description: '게시판 이름' })
  @IsString()
  title: string;
}

export class PatchCategoryRequestBodyDto {
  @ApiProperty({ description: '게시판 고유아이디' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ description: '게시판 이름' })
  @IsOptional()
  @IsString()
  title?: string;
}
