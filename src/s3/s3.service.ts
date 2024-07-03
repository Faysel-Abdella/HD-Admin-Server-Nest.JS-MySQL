import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });
  }

  async uploadPhotoToS3(photo: Express.Multer.File): Promise<string> {
    const key = `photos/${uuidv4()}-image.jpg`;

    const params: S3.PutObjectRequest = {
      Bucket: 'hd-admin-bucket',
      Key: key,
      Body: photo.buffer,
      ACL: 'public-read',
    };

    await this.s3.upload(params).promise();

    return `https://hd-admin-bucket.s3.amazonaws.com/${key}`;
  }
}
