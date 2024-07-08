import { ApiProperty } from '@nestjs/swagger';
import { Position } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class GetBannersRequestQueryDto {
  @ApiProperty({
    description: '노출 위치',
    type: String,
  })
  @IsOptional()
  @IsEnum(Position)
  position: Position;
}

export class CreateBannerRequestBodyDto {
  @ApiProperty({ description: '이미지 url' })
  @IsUrl()
  imageUrl: string;

  @ApiProperty({ description: '랜딩 url' })
  @IsUrl()
  link: string;

  @ApiProperty({ description: '노출 여부' })
  @IsBoolean()
  @IsOptional()
  show: boolean = true;

  @ApiProperty({ description: '노출 순서' })
  @IsNumber()
  @IsOptional()
  order: number = 0;

  @ApiProperty({ description: '노출 위치', type: String })
  @IsEnum(Position)
  position: Position;
}
