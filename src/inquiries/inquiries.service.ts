import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { PostInquiryRequestDto } from './inquiries.request.dto';
import { EmailService } from '@libs/email';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InquiriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async createInquiry(dto: PostInquiryRequestDto) {
    await this.emailService.sendEmail({
      to: this.configService.get('INQUIRY_MAIL_RECEIVER'),
      subject: '고객 문의',
      html: this.createInquiryHtmlFromJson(dto),
    });
    return this.prismaService.inquiry.create({ data: dto });
  }

  private createInquiryHtmlFromJson(dto: PostInquiryRequestDto): string {
    const inquiryTime = new Date(dto.createdAt);
    inquiryTime.setHours(inquiryTime.getHours() + 9);
    return `
      <h2>고객 정보</h2>
      작성자 이름: ${dto.name}<br>
      작성자 핸드폰 번호: ${dto.phone}<br>
      작성자 이메일: ${dto.email}<br>
      담당직원: ${dto.staffName || '없음'}<br>
      <br><br>
      <h2>문의 내용</h2>
      ${dto.content}
      <br><br>
      <h3>문의 날짜</h3>
      ${inquiryTime.toISOString()}<br>
    `;
  }

  public async getInquiries({
    take = 100,
    cursor,
    orderby,
  }: {
    take?: number;
    cursor?: number;
    orderby?: 'asc' | 'desc';
  }) {
    return this.prismaService.inquiry.findMany({
      orderBy: { id: orderby },
      take,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    });
  }

  public async getInquiry(id: number) {
    return this.prismaService.inquiry.findUnique({ where: { id } });
  }
}
