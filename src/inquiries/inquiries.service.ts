import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { PostInquiryRequestDto } from './inquiries.request.dto';
import { EmailService } from '@libs/email';

@Injectable()
export class InquiriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createInquiry(dto: PostInquiryRequestDto) {
    await this.emailService.sendEmail();
    return this.prismaService.inquiry.create({ data: dto });
  }
}
