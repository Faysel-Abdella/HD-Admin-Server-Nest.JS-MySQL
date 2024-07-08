import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { FileUploadService } from '../utils/image-upload/upload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly FileUploadService: FileUploadService,
  ) {}

  // A typical post request body for adding a review - form-data
  /*
   {
  "address": "Adama",
  "sigungu": "test",
  "user_id": 1,
  "rating": 2,
  "usage_fee": 30,
  ....other fields
  "photos": [file, file]
  "evaluation_items": [
    {
      "display_order": 2,
      "question_text": "text",
      "score_0_text": "0",
      "score_1_text": "1",
      "score_3_text": "3",
      "score_5_text": "5",
      "price": 20
    },
     {
      "display_order": 3,
      "question_text": "text",
      "score_0_text": "0",
      "score_1_text": "1",
      "score_3_text": "3",
      "score_5_text": "5",
      "price": 20
    }
    ]
  }
   */

  async create(
    createReviewDto: CreateReviewDto,
    photos: Express.Multer.File[],
  ) {
    let uploadedData;

    if (photos && photos.length > 0) {
      uploadedData = await Promise.all(
        photos.map(async (photo) => {
          const photoUrl = await this.FileUploadService.uploadPhoto(photo);
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
            view_count: +createReviewDto.view_count,
            registration_date: new Date(),
            status: createReviewDto.status,
            photos: { photosUrl: photos },
          },
        });

        const reviewId = review.review_id;
        const evaluation_items = createReviewDto.evaluation_items;

        if (evaluation_items && evaluation_items.length > 0) {
          const evaluationItems = evaluation_items.map((item) => {
            return {
              display_order: item.display_order,
              question_text: item.question_text,
              score_0_text: item.score_0_text,
              score_1_text: item.score_1_text,
              score_3_text: item.score_3_text,
              score_5_text: item.score_5_text,
              price: item.price,
              review_id: reviewId,
            };
          });

          await this.prisma.evaluationItem.createMany({
            data: evaluationItems,
          });
        }

        const createdReview = await this.prisma.review.findUnique({
          where: { review_id: reviewId },
          include: {
            EvaluationItem: true,
            User: {
              select: {
                user_id: true,
                username: true,
                email: true,
              },
            },
          },
        });

        return {
          statusCode: HttpStatus.CREATED,
          message: 'Review created successfully',
          data: createdReview,
        };
      });
    } else {
      console.log('NO PHOTOS');
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
          view_count: +createReviewDto.view_count,
          registration_date: new Date(),
          status: createReviewDto.status,
          photos: { photosUrl: [] },
        },
      });

      const reviewId = review.review_id;
      const evaluation_items = createReviewDto.evaluation_items;

      if (evaluation_items && evaluation_items.length > 0) {
        const evaluationItems = evaluation_items.map((item) => {
          return {
            display_order: item.display_order,
            question_text: item.question_text,
            score_0_text: item.score_0_text,
            score_1_text: item.score_1_text,
            score_3_text: item.score_3_text,
            score_5_text: item.score_5_text,
            price: item.price,
            review_id: reviewId,
          };
        });

        await this.prisma.evaluationItem.createMany({
          data: evaluationItems,
        });
      }

      const createdReview = await this.prisma.review.findUnique({
        where: { review_id: reviewId },
        include: {
          EvaluationItem: true,
          User: {
            select: {
              user_id: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Review created successfully without photos',
        data: createdReview,
      };
    }
  }

  async findAll(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    address?: string,
    username?: string,
  ) {
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const reviews = await this.prisma.review.findMany({
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy, // { property: 'asc' | 'desc' }
      where: {
        address: {
          contains: address ? address.toLowerCase() : undefined,
        },
        status: address ? 'APPROVED' : undefined,
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Reviews retrieved successfully',
      data: reviews,
    };
  }

  async findNewRegistrationVerificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    //  "신규등록 인증후기" === residence_proof_document not null & status === waiting
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        residence_proof_document: { not: null },
        status: 'WAITING',
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findNewRegistrationUnVerificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    // "신규등록 미인증후기" === residence_proof_document null & status === waiting
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        residence_proof_document: null,
        status: 'WAITING',
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findCertificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    // "인증후기" === residence_proof_document not null & status === approved
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        residence_proof_document: { not: null },
        status: 'APPROVED',
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findUnverifiedReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    // "미인증후기" === residence_proof_document null & status === approved
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        residence_proof_document: null,
        status: 'APPROVED',
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findPetReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    // '반려후기' === status === rejected;
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        status: 'REJECTED',
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findReRegistrationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
  ) {
    // "재등록 후기" === status === waiting_for_update' | 'waiting_for_residence_verification' | 'waiting_after_rejection'
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usage_fee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.view_count = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registration_date = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    const review = await this.prisma.review.findMany({
      where: {
        status: {
          in: [
            'WAITING_FOR_UPDATE',
            'WAITING_FOR_RESIDENCE_VERIFICATION',
            'WAITING_AFTER_REJECTION',
          ],
        },
        User: {
          username: username ? username.toLowerCase() : undefined,
        },
      },
      skip: skip,
      ...(limit && { take: limit }),
      orderBy: orderBy,
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    };
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { review_id: id },
      include: {
        EvaluationItem: true,
        User: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
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
    const updatedReview = await this.prisma.review.update({
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

    if (updateReviewDto.evaluation_items) {
      const updatedEvaluationItems =
        await this.prisma.evaluationItem.updateMany({
          where: { review_id: id },
          data: updateReviewDto.evaluation_items,
        });
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Review Updated Successfully',
      data: await this.prisma.review.findUnique({
        where: { review_id: id },
        include: {
          EvaluationItem: true,
          User: {
            select: {
              user_id: true,
              username: true,
              email: true,
            },
          },
        },
      }),
    };
  }

  async remove(id: number) {
    await this.findOne(id);
    const review = await this.prisma.review.delete({
      where: { review_id: id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Review deleted successfully',
    };
  }
}
