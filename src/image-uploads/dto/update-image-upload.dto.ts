import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImageUploadDto } from './create-image-upload.dto';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateImageUploadDto {
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
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
  })
  isExposed?: boolean | string;
}
