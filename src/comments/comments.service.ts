import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const review = await this.prisma.review.findUnique({
      where: { reviewId: createCommentDto.reviewId },
    });

    if (!review) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message:
          'The review to add the comment is not found (Invalid review id)',
      };
    }

    try {
      const comment = await this.prisma.comment.create({
        data: createCommentDto,
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Comment created successfully',
        data: comment,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAll(page?: number, limit?: number) {
    const skip = page ? (page - 1) * limit : 0;

    try {
      const [comments, totalData] = await Promise.all([
        this.prisma.comment.findMany({
          skip: skip,
          ...(limit && { take: limit }),
        }),
        this.prisma.comment.count(),
      ]);

      return {
        statusCode: HttpStatus.OK,
        message: 'Comments retrieved successfully',
        data: comments,
        totalData: totalData,
        page: page ? page : 1,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { commentId: id },
      });

      if (!comment) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Comment not found (Invalid Id)',
          data: comment,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.prisma.comment.findUnique({
      where: { commentId: id },
    });

    if (!updatedComment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Comment not found (Invalid Id)',
      };
    }
    try {
      const comment = await this.prisma.comment.update({
        where: { commentId: id },
        data: {
          ...updatedComment,
          ...updateCommentDto,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Comment updated successfully',
        data: comment,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    const deleted = await this.prisma.comment.findUnique({
      where: { commentId: id },
    });

    if (!deleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Comment not found (Invalid Id)',
      };
    }

    try {
      const comment = await this.prisma.comment.delete({
        where: { commentId: id },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Comment deleted successfully',
        data: comment,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
