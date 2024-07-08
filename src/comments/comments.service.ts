import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: createCommentDto,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Comment created successfully',
      data: comment,
    };
  }

  async findAll(page?: number, limit?: number) {
    const skip = page ? (page - 1) * limit : 0;
    const comments = await this.prisma.comment.findMany({
      skip: skip,
      ...(limit && { take: limit }),
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Comments retrieved successfully',
      data: comments,
    };
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { comment_id: id },
    });

    if (!comment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Comment not found',
        data: comment,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Comment retrieved successfully',
      data: comment,
    };
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updatedComment = await this.prisma.comment.findUnique({
      where: { comment_id: id },
    });

    if (!updatedComment) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Comment not found (Invalid Id)',
      };
    }

    const comment = await this.prisma.comment.update({
      where: { comment_id: id },
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
  }

  async remove(id: number) {
    const deleted = await this.prisma.comment.findUnique({
      where: { comment_id: id },
    });

    if (!deleted) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Comment not found (Invalid Id)',
      };
    }

    const comment = await this.prisma.comment.delete({
      where: { comment_id: id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Comment deleted successfully',
      data: comment,
    };
  }
}
