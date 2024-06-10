import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { EmailModule } from '@libs/email';

@Module({
  imports: [EmailModule],
  providers: [InquiriesService],
  controllers: [InquiriesController],
})
export class InquiriesModule {}
