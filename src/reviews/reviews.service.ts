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

  async create(
    createReviewDto: CreateReviewDto,
    photos: Express.Multer.File[],
  ) {
    let uploadedData;

    if (photos && photos.length > 0) {
      uploadedData = await Promise.all(
        photos.map(async (photo) => {
          const photoUrl = await this.s3Service.uploadPhotoToS3(photo);
          console.log(photoUrl);
          return { url: photoUrl };
        }),
      ).then(async (photos) => {
        const review = await this.prisma.review.create({
          data: {
            user_id: +createReviewDto.user_id,
            address: createReviewDto.address,
            sigungu: createReviewDto.sigungu,
            detailed_address: createReviewDto.detailed_address,
            residence_year: createReviewDto.residence_year,
            comprehensive_opinion: createReviewDto.comprehensive_opinion,
            rating: +createReviewDto.rating,
            usage_fee: +createReviewDto.usage_fee,
            residence_proof_document: createReviewDto.residence_proof_document,
            is_exposed: createReviewDto.is_exposed,
            view_count: createReviewDto.view_count,
            registration_date: new Date(),
            status: createReviewDto.status,
            photos: { photosUrl: photos },
          },
        });
        console.log('THIS IS REVIEW', review);
        return review;
      });

      return uploadedData;
    } else {
      console.log('NO PHOTOS');
    }
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
