import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { EmailModule } from 'yes/email';

@Module({
  imports: [EmailModule],
  providers: [InquiriesService],
  controllers: [InquiriesController],
})
export class InquiriesModule {}
