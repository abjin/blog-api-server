import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class PostInquiryRequestDto {
  @ApiProperty({ description: '유저 이름' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: '담당 직원', required: false })
  @IsString()
  @IsOptional()
  staffName?: string;

  @ApiProperty({ description: '유저 핸드폰 번혼' })
  @IsPhoneNumber('KR')
  phone: string;

  @ApiProperty({ description: '유저 이메일', required: false })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: '문의 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '문의 날짜', required: false })
  @IsDate()
  createdAt = new Date();
}

export class GetInquiriesRequestQueryDto {
  @ApiProperty({ description: '페이지 아이템 개수' })
  @IsNumber()
  @IsOptional()
  take?: number;

  @ApiProperty({ description: '페이지네이션 커서' })
  @IsNumber()
  @IsOptional()
  cursor?: number;

  @ApiProperty({ description: '정렬 기준' })
  @IsOptional()
  orderby?: 'asc' | 'desc' = 'desc';
}
