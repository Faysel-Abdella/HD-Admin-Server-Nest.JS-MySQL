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

class reviewEvaluationItemDto {
  @ApiProperty({
    name: 'selectedScore',
    required: true,
    type: 'number',
    description: ' selected score',
    example: 1,
  })
  @IsNotEmpty()
  selectedScore: number;

  @ApiProperty({
    name: 'detailedDescription',
    required: true,
    type: 'string',
    description: 'detailed description',
    example: 1,
  })
  detailedDescription: string;

  @ApiProperty({
    name: 'item',
    required: true,
    type: 'array',
    description: 'array of evaluation items',
    example: {
      displayOrder: 1,
      questionText: 'Question 1',
      score0Text: 'Score 0',
      score1Text: 'Score 1',
      score3Text: 'Score 3',
      score5Text: 'Score 5',
      price: 100,
    },
  })
  item: EvaluationItemDto;
}

export class UpdateReviewDto {
  // @ApiProperty({
  //   required: true,
  //   type: 'number',
  //   description: 'User ID',
  //   example: 1,
  // })
  // @IsNotEmpty()
  // userId: number;

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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sigungu?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Comprehensive opinion',
    example: 'Good',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  comprehensiveOpinion?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Residence proof document',
    example: 'Yes',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  residenceProofDocument?: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Rating',
    example: 5,
  })
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  @IsBoolean()
  @IsOptional()
  isExposed?: boolean;

  @ApiProperty({
    required: true,
    type: 'array',
    description: 'Array of evaluation items',
    example: [
      {
        selectedScore: 1,
        detailedDescription: 'detailed description',
        items: {
          displayOrder: 1,
          questionText: 'Question 1',
          score0Text: 'Score 0',
          score1Text: 'Score 1',
          score3Text: 'Score 3',
          score5Text: 'Score 5',
          price: 100,
        },
      },
      {
        selectedScore: 1,
        detailedDescription: 'detailed description',
        items: {
          displayOrder: 1,
          questionText: 'Question 1',
          score0Text: 'Score 0',
          score1Text: 'Score 1',
          score3Text: 'Score 3',
          score5Text: 'Score 5',
          price: 100,
        },
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  evaluationItems?: reviewEvaluationItemDto[];
}
