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
}
