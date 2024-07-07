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
    description: 'The unique identifier of the comment',
    example: 1,
  })
  @IsInt()
  comment_id: number;

  @ApiProperty({ description: 'The ID of the associated review', example: 1 })
  @IsInt()
  review_id: number;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 1,
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
  @IsDate()
  admin_processed_at?: Date;
}
