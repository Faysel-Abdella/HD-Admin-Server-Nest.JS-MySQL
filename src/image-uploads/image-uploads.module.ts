import { Module } from '@nestjs/common';
import { ImageUploadsService } from './image-uploads.service';
import { ImageUploadsController } from './image-uploads.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/utils/image-upload/upload.service';
@Module({
  controllers: [ImageUploadsController],
  providers: [
    ImageUploadsService,
    ConfigService,
    PrismaService,
    FileUploadService,
  ],
})
export class ImageUploadsModule {}
