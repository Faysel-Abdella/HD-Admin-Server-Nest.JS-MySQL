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
  @IsNumber()
  reviewId: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'The user id who uploaded the image',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'The admin id who approved the image',
    example: 1,
  })
  @IsNumber()
  adminId: number;

  @ApiProperty({
    required: true,
    type: 'file',
    description: 'Array of images to upload',
    example: '[image1.jpg, image2.jpg]',
  })
  @IsNotEmpty()
  images: any;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is the image exposed to the public?',
    example: true,
  })
  @IsBoolean()
  isExposed?: boolean;
}
