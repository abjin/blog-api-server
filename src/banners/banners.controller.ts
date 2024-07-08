import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import {
  CreateBannerRequestBodyDto,
  GetBannersRequestQueryDto,
} from './banners.request.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('배너')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: '배너조회' })
  @ApiQuery({ type: GetBannersRequestQueryDto })
  async getBanners(@Query() dto: GetBannersRequestQueryDto) {
    return this.bannersService.getBanners(dto.position);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateBannerRequestBodyDto })
  @ApiOperation({ summary: '배너생성' })
  async createBanner(@Body() dto: CreateBannerRequestBodyDto) {
    return this.bannersService.createBanner(dto);
  }
}
