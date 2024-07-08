// comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
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
    example: 18,
    required: true,
  })
  @IsInt()
  review_id: number;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 7,
    required: true,
  })
  @IsInt()
  user_id: number;

  @ApiProperty({
    description: 'The ID of the admin who processed the comment',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  admin_id?: number;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
    required: true,
  })
  @IsString()
  comment: string;

  @ApiProperty({ description: 'Whether the comment is exposed', example: true })
  @IsBoolean()
  is_exposed: boolean;

  @ApiProperty({
    description: 'The date the admin processed the comment',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  admin_processed_at?: any;
}
