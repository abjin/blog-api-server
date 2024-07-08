import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GetInquiriesRequestQueryDto,
  PostInquiryRequestDto,
} from './inquiries.request.dto';
import { InquiriesService } from './inquiries.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('문의')
@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @ApiOperation({ summary: '문의 하기' })
  @ApiBody({ type: PostInquiryRequestDto })
  @Post()
  postInquiry(@Body() dto: PostInquiryRequestDto) {
    return this.inquiriesService.createInquiry(dto);
  }

  @ApiOperation({ summary: '문의 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getInquiries(@Query() dto: GetInquiriesRequestQueryDto) {
    return this.inquiriesService.getInquiries(dto);
  }

  @ApiOperation({ summary: '문의 단일 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getInquiry(@Param('id', ParseIntPipe) id: number) {
    return this.inquiriesService.getInquiry(id);
  }
}
