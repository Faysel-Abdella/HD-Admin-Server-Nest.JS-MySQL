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

  async create(createReviewDto: CreateReviewDto) {
    try {
      const review = await this.prisma.review.create({
        data: createReviewDto,
      });

      const reviewId = review.reviewId;

      const createdReview = await this.prisma.review.findUnique({
        where: { reviewId: reviewId },
        include: {
          User: {
            select: {
              userId: true,
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
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
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
    sigungu?: string,
  ) {
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
          Image: {
            select: {
              imageId: true,
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
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          status: 'APPROVED', // Get only approved reviews
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Reviews retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findNewRegistrationVerificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    //  "신규등록 인증후기" === residenceProofDocument not null & status === waiting
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          residenceProofDocument: { not: null },
          status: 'WAITING',
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findNewRegistrationUnVerificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    // "신규등록 미인증후기" === residenceProofDocument null & status === waiting
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          residenceProofDocument: null,
          status: 'WAITING',
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findCertificationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    // "인증후기" === residenceProofDocument not null & status === approved
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          residenceProofDocument: { not: null },
          status: 'APPROVED',
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findUnverifiedReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    // "미인증후기" === residenceProofDocument null & status === approved
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          residenceProofDocument: null,
          status: 'APPROVED',
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findPetReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    // '반려후기' === status === rejected;
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          status: 'REJECTED',
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findReRegistrationReview(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: string,
    username?: string,
    sigungu?: string,
  ) {
    // "재등록 후기" === status === waiting_for_update' | 'waiting_for_residence_verification' | 'waiting_after_rejection'
    const skip = page ? (page - 1) * limit : 0;

    const orderBy: any = {};

    if (sortBy === 'rating') {
      orderBy.rating = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'usageFee') {
      orderBy.usageFee = sortOrder === 'asc' ? 'asc' : 'desc';
    } else if (sortBy === 'viewCount') {
      orderBy.viewCount = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.registrationDate = sortOrder === 'asc' ? 'asc' : 'desc';
    }

    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          status: {
            in: [
              'WAITING_FOR_UPDATE',
              'WAITING_FOR_RESIDENCE_VERIFICATION',
              'WAITING_AFTER_REJECTION',
            ],
          },
          sigungu: {
            contains: sigungu ? sigungu.toLowerCase() : undefined,
          },
          User: {
            username: {
              contains: username ? username.toLowerCase() : undefined,
            },
          },
        },
        skip: skip,
        ...(limit && { take: limit }),
        orderBy: orderBy,
        include: {
          User: {
            select: {
              userId: true,
              username: true,
              email: true,
            },
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Review retrieved successfully',
        data: reviews,
        totalData: reviews.length,
        page: page ? page : 1,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const review = await this.prisma.review.findUnique({
        where: { reviewId: id },
        include: {
          User: {
            select: {
              userId: true,
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
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.prisma.review.findUnique({
        where: { reviewId: id },
      });

      if (!updatedReview) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Review not found (Invalid Id)',
        };
      }

      await this.prisma.review.update({
        where: { reviewId: id },
        data: {
          address: updateReviewDto.address || updatedReview.address,

          sigungu: updateReviewDto.sigungu || updatedReview.sigungu,

          detailedAddress:
            updateReviewDto.detailedAddress || updatedReview.detailedAddress,

          residenceYear:
            updateReviewDto.residenceYear || updatedReview.residenceYear,

          comprehensiveOpinion:
            updateReviewDto.comprehensiveOpinion ||
            updatedReview.comprehensiveOpinion,

          rating: updateReviewDto.rating || updatedReview.rating,

          usageFee: updateReviewDto.usageFee || updatedReview.usageFee,

          residenceProofDocument:
            updateReviewDto.residenceProofDocument ||
            updatedReview.residenceProofDocument,

          isExposed: updateReviewDto.isExposed || updatedReview.isExposed,

          viewCount: updateReviewDto.viewCount || updatedReview.viewCount,

          status: updateReviewDto.status || updatedReview.status,
        },
      });

      if (
        updateReviewDto.evaluationItems &&
        updateReviewDto.evaluationItems.length > 0
      ) {
        const formattedEvaluationItems = updateReviewDto.evaluationItems.map(
          // {
          // "reviewItems": [
          // {selectedScore: Int, detailedDescription: String, item: {  } },
          // {selectedScore: Int, detailedDescription: String, item: {  } },
          // {selectedScore: Int, detailedDescription: String, item: {  } },
          // {selectedScore: Int, detailedDescription: String, item: {  } },
          //              ]
          // }
          (evaluateItem) => {
            return {
              selectedScore: evaluateItem.selectedScore,
              detailedDescription: evaluateItem.detailedDescription,
              item: {
                displayOrder: evaluateItem.item.displayOrder,
                questionText: evaluateItem.item.questionText,
                score0Text: evaluateItem.item.score0Text,
                score1Text: evaluateItem.item.score1Text,
                score3Text: evaluateItem.item.score3Text,
                score5Text: evaluateItem.item.score5Text,
                price: evaluateItem.item.price,
              },
            };
          },
        );

        await this.prisma.review.update({
          where: { reviewId: id },
          data: {
            reviewEvaluationItems: { reviewItems: formattedEvaluationItems },
          },
        });
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Review Updated Successfully',
        data: await this.prisma.review.findUnique({
          where: { reviewId: id },
          include: {
            User: {
              select: {
                userId: true,
                username: true,
                email: true,
              },
            },
            Image: {
              select: {
                imageId: true,
              },
            },
          },
        }),
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const deletedReview = await this.prisma.review.findUnique({
        where: { reviewId: id },
      });

      if (!deletedReview) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Review not found (Invalid Id)',
        };
      }

      const review = await this.prisma.review.delete({
        where: { reviewId: id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Review deleted successfully',
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
