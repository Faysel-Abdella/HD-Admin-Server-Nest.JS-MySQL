import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { S3Service } from '../s3/s3.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(photos: Express.Multer.File[]) {
    let uploadedPhotos;

    if (photos && photos.length > 0) {
      uploadedPhotos = await Promise.all(
        photos.map(async (photo) => {
          const photoUrl = await this.s3Service.uploadPhotoToS3(photo);
          console.log(photoUrl);
          return { url: photoUrl };
        }),
      );
    }

    const review = await this.prisma.review.create({
      data: {
        photos: { create: uploadedPhotos },
      },
    });

    return review;
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
