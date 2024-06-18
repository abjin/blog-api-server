import { ConfigService } from '@nestjs/config';

import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleCloudService {
  private bucket: Bucket;
  private storage: Storage;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get('GOOGLE_PROJECT_ID'),
      credentials: {
        client_email: this.configService.get('GOOGLE_CLIENT_EMAIL'),
        private_key: this.configService
          .get('GOOGLE_PRIVATE_KEY')
          .split(String.raw`\n`)
          .join('\n'),
      },
    });
    this.bucketName = configService.get('GOOGLE_BUCKET_NAME');
    this.bucket = this.storage.bucket(this.bucketName);
  }

  async getSignedUrl(fileName: string) {
    const file = this.bucket.file(fileName);
    const urls = await file.getSignedUrl({
      version: 'v4',
      expires: Date.now() + 1000 * 60 * 60,
      action: 'write',
    });
    const publicUrl = `https://storage.cloud.google.com/${this.bucketName}/${fileName}`;
    return {
      signedUrl: urls[0],
      publicUrl: publicUrl,
    };
  }
}
