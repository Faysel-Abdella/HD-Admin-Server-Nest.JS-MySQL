import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class UpdateCommentDto {
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

  @ApiProperty({ description: 'Whether the comment is exposed', example: true })
  @IsBoolean()
  isExposed: string;

  @ApiProperty({
    description: 'The date the admin processed the comment',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  adminProcessedAt?: any;
}
