// comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The ID of the associated review',
    example: 1,
    required: true,
  })
  @IsInt()
  reviewId: number;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 1,
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'The ID of the admin who processed the comment',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  adminId?: number;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
    required: true,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    description: 'Whether the comment is exposed',
    example: 'true',
  })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
  })
  isExposed: boolean | string;

  @ApiProperty({
    description: 'The date the admin processed the comment',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  adminProcessedAt?: any;
}
