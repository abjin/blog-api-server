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

  @ApiProperty({ description: '대표 이미지', required: false })
  @IsString()
  @IsOptional()
  image: string;
}

export class GetPostsRequestQueryDto {
  @ApiProperty({ description: '게시판 고유아이디' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: '페이지 아이템 개수' })
  @IsNumber()
  @IsOptional()
  take?: number;

  @ApiProperty({ description: '페이지네이션 커서' })
  @IsNumber()
  @IsOptional()
  cursor?: number;
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

  @ApiProperty({ description: '대표 이미지', required: false })
  @IsString()
  @IsOptional()
  image: string;
}
