import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BannersService } from './banners.service';
import {
  CreateBannerRequestBodyDto,
  GetBannerSignedUrlRequestQueryDto,
  GetBannersRequestQueryDto,
} from './banners.request.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('배너')
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  @ApiOperation({ summary: '배너조회' })
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

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '배너삭제' })
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return this.bannersService.deleteBanner(id);
  }

  @ApiOperation({ summary: '배너 signed url 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get('signed-url')
  getPostsSignedUrl(@Query() { fileName }: GetBannerSignedUrlRequestQueryDto) {
    return this.bannersService.getPostsSignedUrl(fileName);
  }
}
