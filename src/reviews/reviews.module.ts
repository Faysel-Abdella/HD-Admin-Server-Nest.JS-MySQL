import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/utils/image-upload/upload.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, FileUploadService, ConfigService],
})
export class ReviewsModule {}
