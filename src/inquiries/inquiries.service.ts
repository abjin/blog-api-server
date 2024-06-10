import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { PostInquiryRequestDto } from './inquiries.request.dto';

@Injectable()
export class InquiriesService {
  constructor(private readonly prismaService: PrismaService) {}

  createInquiry(dto: PostInquiryRequestDto) {
    return this.prismaService.inquiry.create({ data: dto });
  }
}
