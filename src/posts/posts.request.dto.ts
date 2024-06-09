import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostRequestBodyDto {
  @ApiProperty({ description: '게시판 고유아이디' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: '게시물 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시물 내용' })
  @IsString()
  content: string;
}

export class GetPostsRequestQueryDto {
  @ApiProperty({ description: '게시판 고유아이디' })
  @IsString()
  categoryId: string;
}

export class PatchPostRequestBodyDto {
  @ApiProperty({ description: '게시물 고유아이디' })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: '게시물 게시판 아이디' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ description: '게시물 제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: '게시물 내용' })
  @IsOptional()
  @IsString()
  content?: string;
}
