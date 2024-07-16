import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { GoogleCloudModule } from '@libs/google-cloud';

@Module({
  imports: [GoogleCloudModule],
  providers: [BannersService],
  controllers: [BannersController],
})
export class BannersModule {}
