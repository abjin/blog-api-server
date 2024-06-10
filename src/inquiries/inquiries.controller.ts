import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostInquiryRequestDto } from './inquiries.request.dto';
import { InquiriesService } from './inquiries.service';

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
}
