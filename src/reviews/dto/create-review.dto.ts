import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';

class EvaluationItemDto {
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Display order',
    example: 1,
  })
  @IsNumber()
  displayOrder: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Question text',
    example: 'Question 1',
  })
  @IsString()
  questionText: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Detail description of the item',
    example: 'This item is designed for .............',
  })
  detailedDescription: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Score 0 text',
    example: 'Score 0',
  })
  @IsString()
  score0Text: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Score 1 text',
    example: 'Score 1',
  })
  @IsString()
  score1Text: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Score 3 text',
    example: 'Score 3',
  })
  @IsString()
  score3Text: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Score 5 text',
    example: 'Score 5',
  })
  @IsString()
  score5Text: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Price',
    example: 100,
  })
  @IsNumber()
  price: number;
}

export class CreateReviewDto {
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Address',
    example: 'Seoul, Korea',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Detailed address',
    example: 'Gangnam-gu, Seoul, Korea',
  })
  @IsNotEmpty()
  @IsString()
  detailedAddress: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Residence year',
    example: '2021',
  })
  @IsNotEmpty()
  @IsString()
  residenceYear: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Sigungu',
    example: 'Seoul',
  })
  @IsNotEmpty()
  @IsString()
  sigungu?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Comprehensive opinion',
    example: 'Good',
  })
  @IsNotEmpty()
  @IsString()
  comprehensiveOpinion?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Array of photos',
    example: '[ "photo1.jpg", "photo2.jpg"]',
  })
  @IsOptional()
  photos?: any;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Residence proof document',
    example: 'Yes',
  })
  @IsNotEmpty()
  @IsString()
  residenceProofDocument?: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Rating',
    example: 5,
  })
  @IsNotEmpty()
  rating?: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Status',
    enum: [
      'DRAFT',
      'WAITING',
      'APPROVED',
      'REJECTED',
      'WAITING_FOR_UPDATE',
      'WAITING_FOR_RESIDENCE_VERIFICATION',
      'WAITING_AFTER_REJECTION',
    ],
    example: 'APPROVED',
    default: 'DRAFT',
  })
  @IsString()
  @IsOptional()
  status?:
    | 'DRAFT'
    | 'WAITING'
    | 'APPROVED'
    | 'REJECTED'
    | 'WAITING_FOR_UPDATE'
    | 'WAITING_FOR_RESIDENCE_VERIFICATION'
    | 'WAITING_AFTER_REJECTION';

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Usage fee',
    example: 100,
  })
  @IsNotEmpty()
  usageFee?: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'View count',
    example: 100,
    default: 0,
  })
  @IsOptional()
  viewCount?: number;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is exposed',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isExposed?: boolean;

  @ApiProperty({
    required: true,
    type: 'array',
    description: 'Array of evaluation items',
    example:
      '[ { "display_order": 1, "question_text": "Question 1", "score_0_text": "Score 0", "score_1_text": "Score 1", "score_3_text": "Score 3", "score_5_text": "Score 5", "price": 100 }, { "display_order": 2, "question_text": "Question 2", "score_0_text": "Score 0", "score_1_text": "Score 1", "score_3_text": "Score 3", "score_5_text": "Score 5", "price": 200 } ]',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  evaluationItems?: EvaluationItemDto[];
}
