import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';

@Module({
  providers: [InquiriesService],
  controllers: [InquiriesController],
})
export class InquiriesModule {}
