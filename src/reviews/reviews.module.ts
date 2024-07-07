import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/utils/image-upload/upload.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, FileUploadService],
})
export class ReviewsModule {}
