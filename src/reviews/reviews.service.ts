import { HttpStatus, Injectable } from '@nestjs/common';
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
        return review;
      });

      return uploadedData;
    } else {
      console.log('NO PHOTOS');
    }
  }

  async findAll() {
    const reviews = await this.prisma.review.findMany();
    return {
      statusCode: HttpStatus.OK,
      message: 'Reviews retrieved successfully',
      data: reviews,
    };
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { review_id: id },
    });

    if (!review) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Review not found',
        data: review,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const { data } = await this.findOne(id);
    const comment = await this.prisma.review.update({
      where: { review_id: id },
      data: {
        address: updateReviewDto.address || data.address,
        sigungu: updateReviewDto.sigungu || data.sigungu,
        detailed_address:
          updateReviewDto.detailed_address || data.detailed_address,
        residence_year: updateReviewDto.residence_year || data.residence_year,
        comprehensive_opinion:
          updateReviewDto.comprehensive_opinion || data.comprehensive_opinion,
        rating: updateReviewDto.rating || data.rating,
        usage_fee: updateReviewDto.usage_fee || data.usage_fee,
        residence_proof_document:
          updateReviewDto.residence_proof_document ||
          data.residence_proof_document,
        is_exposed: updateReviewDto.is_exposed || data.is_exposed,
        view_count: updateReviewDto.view_count || data.view_count,
        status: updateReviewDto.status || data.status,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
