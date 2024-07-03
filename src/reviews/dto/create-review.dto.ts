import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsDecimal,
  IsBoolean,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  photos?: string[];
}
