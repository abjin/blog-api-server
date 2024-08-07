import { Injectable } from '@nestjs/common';
import { Position, Banner } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import * as _ from 'lodash';
import { CreateBannerRequestBodyDto } from './banners.request.dto';
import { GoogleCloudService } from '@libs/google-cloud';

type CachedBanners = Partial<{ [key in Position]: Banner[] }>;

const ONE_HOUR = 1000 * 60 * 60;

@Injectable()
export class BannersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleCloudService: GoogleCloudService,
  ) {}

  private cachedBanners: CachedBanners | null;
  private cachedBannesrRefreshTime: number;
  private readonly cachedBannersMaxAge = ONE_HOUR;

  public async getBanners(position: Position): Promise<CachedBanners> {
    if (!position) return this.getCachedBanners();
    return { [position]: (await this.getCachedBanners())[position] || [] };
  }

  private async getCachedBanners(): Promise<CachedBanners> {
    const now = Date.now();
    const cachedBannerAge = now - this.cachedBannesrRefreshTime;

    if (this.cachedBanners && cachedBannerAge < this.cachedBannersMaxAge) {
      return this.cachedBanners;
    }

    const banners = await this.prismaService.banner.findMany({
      where: { show: true },
    });

    this.cachedBannesrRefreshTime = now;
    this.cachedBanners = <CachedBanners>_.groupBy(banners, 'position');
    return this.cachedBanners;
  }

  private refreshCachedBanners() {
    this.cachedBanners = null;
  }

  public async createBanner(dto: CreateBannerRequestBodyDto) {
    const result = await this.prismaService.banner.create({ data: dto });
    this.refreshCachedBanners();
    return result;
  }

  public async deleteBanner(id: number) {
    const result = await this.prismaService.banner.delete({ where: { id } });
    this.refreshCachedBanners();
    return result;
  }

  public getPostsSignedUrl(fileName: string) {
    const filePath = this.getBannerImageFilePath(fileName);
    return this.googleCloudService.getSignedUrl(filePath);
  }

  private getBannerImageFilePath(fileName: string) {
    return `banner/${fileName}`;
  }
}
