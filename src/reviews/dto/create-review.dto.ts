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
  @IsNumber()
  display_order: number;

  @IsString()
  question_text: string;

  @IsString()
  score_0_text: string;

  @IsString()
  score_1_text: string;

  @IsString()
  score_3_text: string;

  @IsString()
  score_5_text: string;
}

export class CreateReviewDto {
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'User ID',
    example: 1,
  })
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  sigungu: string;

  @IsOptional()
  @IsString()
  detailed_address?: string;

  @IsOptional()
  @IsString()
  residence_year?: string;

  @IsOptional()
  @IsString()
  comprehensive_opinion?: string;

  @IsOptional()
  photos?: any;

  @IsOptional()
  @IsString()
  residence_proof_document?: string;

  @IsNumber()
  rating: number;

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

  @IsNumber()
  usage_fee: number;

  @IsNumber()
  @IsOptional()
  view_count?: number;

  @IsBoolean()
  @IsOptional()
  is_exposed: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  evaluation_items: String[];
}
