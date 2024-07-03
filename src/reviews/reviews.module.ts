import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, S3Service],
})
export class ReviewsModule {}
