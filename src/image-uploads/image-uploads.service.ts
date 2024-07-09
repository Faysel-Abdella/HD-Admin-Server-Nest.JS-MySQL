import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageUploadDto } from './dto/create-image-upload.dto';
import { UpdateImageUploadDto } from './dto/update-image-upload.dto';
import { FileUploadService } from '../utils/image-upload/upload.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Transform } from 'class-transformer';

@Injectable()
export class ImageUploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly FileUploadService: FileUploadService,
  ) {}

  private transformBoolean(value: any) {
    return value.toLowerCase() === 'true';
  }

  async create(
    createImageUploadDto: CreateImageUploadDto,
    images: Express.Multer.File[],
  ) {
    try {
      if (images && images.length > 0) {
        console.log('UPLOADING STARTED');

        const uploadedImages = await Promise.all(
          images.map(async (photo) => {
            const photoUrl = await this.FileUploadService.uploadPhoto(photo);
            const uploadedImage = await this.prisma.image.create({
              data: {
                reviewId: +createImageUploadDto.reviewId,
                userId: +createImageUploadDto.userId,
                adminId: +createImageUploadDto.adminId,
                imageUrl: photoUrl,
                isExposed: this.transformBoolean(
                  createImageUploadDto.isExposed,
                ),
              },
            });
            return uploadedImage;
          }),
        );

        return {
          statusCode: HttpStatus.CREATED,
          message: 'Photos uploaded successfully',
          data: uploadedImages,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'No photos is provided ',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const images = await this.prisma.image.findMany();
      if (images.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No photos found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Photos retrieved successfully',
        data: images,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  findOne(id: number) {
    try {
      const image = this.prisma.image.findUnique({
        where: { imageId: id },
      });
      if (!image) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Photo not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Photo retrieved successfully',
        data: image,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  async update(
    id: number,
    updateImageUploadDto: UpdateImageUploadDto,
    images: Express.Multer.File[],
  ) {
    console.log(updateImageUploadDto);
    try {
      const updatedImage = await this.prisma.image.findUnique({
        where: { imageId: id },
      });

      if (!updatedImage) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Image not found (Invalid Id)',
        };
      }

      if (images && images.length > 0) {
        console.log('UPLOADING STARTED');

        const uploadedImages = await Promise.all(
          images.map(async (photo) => {
            const photoUrl = await this.FileUploadService.uploadPhoto(photo);
            const updatedImage = await this.prisma.image.update({
              where: { imageId: id },
              data: {
                imageUrl: photoUrl,
                isExposed: this.transformBoolean(
                  updateImageUploadDto.isExposed,
                ),
              },
            });
            return updatedImage;
          }),
        );

        return {
          statusCode: HttpStatus.OK,
          message: 'Photo updated successfully',
          data: uploadedImages,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'No photos is provided ',
        };
      }
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  remove(id: number) {
    try {
      const deletedImage = this.prisma.image.delete({
        where: { imageId: id },
      });
      if (!deletedImage) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Photo not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Photo deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
