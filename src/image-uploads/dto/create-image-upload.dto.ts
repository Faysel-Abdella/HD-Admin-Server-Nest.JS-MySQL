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

export class CreateImageUploadDto {
  @ApiProperty({
    required: true,
    type: 'number',
    description: 'The review id to which the image belongs to',
    example: 1,
  })
  @IsNotEmpty()
  reviewId: number | string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'The user id who uploaded the image',
    example: 1,
  })
  @IsNotEmpty()
  userId: number | string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'The admin id who approved the image',
    example: 1,
  })
  @IsNotEmpty()
  adminId: number | string;

  @ApiProperty({
    required: true,
    type: 'array',
    description: 'Array of images to upload',
    example: '[image1.jpg, image2.jpg]',
  })
  @IsNotEmpty()
  @IsOptional()
  images: any;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is the image exposed to the public?',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isExposed?: boolean;
}
