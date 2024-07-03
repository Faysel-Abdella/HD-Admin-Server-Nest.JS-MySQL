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
  readonly comment_id: number;

  @ApiProperty({ description: 'The ID of the associated review', example: 1 })
  @IsInt()
  readonly review_id: number;

  @ApiProperty({
    description: 'The ID of the user who made the comment',
    example: 1,
  })
  @IsInt()
  readonly user_id: number;

  @ApiProperty({
    description: 'The ID of the admin who processed the comment',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  readonly admin_id?: number;

  @ApiProperty({
    description: 'The content of the comment',
    example: 'This is a comment.',
  })
  @IsString()
  readonly comment: string;

  @ApiProperty({
    description: 'The date the comment was made',
    example: new Date(),
  })
  @IsDate()
  readonly comment_date: Date;

  @ApiProperty({ description: 'Whether the comment is exposed', example: true })
  @IsBoolean()
  readonly is_exposed: boolean;

  @ApiProperty({
    description: 'The date the admin processed the comment',
    example: new Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  readonly admin_processed_at?: Date;

  @ApiProperty({
    description: 'The date the comment was last updated',
    example: new Date(),
  })
  @IsDate()
  readonly updated_at: Date;
}
