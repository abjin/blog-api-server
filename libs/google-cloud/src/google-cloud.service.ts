import { ConfigService } from '@nestjs/config';

import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleCloudService {
  private readonly bucket: Bucket;
  private readonly storage: Storage;
  private readonly bucketName: string;
  private readonly publicImageBaseUrl = 'https://storage.googleapis.com';

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
    const publicUrl = `${this.publicImageBaseUrl}/${this.bucketName}/${fileName}`;
    console.log({
      signedUrl: urls[0],
      publicUrl: publicUrl,
    });
    return {
      signedUrl: urls[0],
      publicUrl: publicUrl,
    };
  }
}
