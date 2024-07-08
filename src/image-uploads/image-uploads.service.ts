import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateImageUploadDto } from './dto/create-image-upload.dto';
import { UpdateImageUploadDto } from './dto/update-image-upload.dto';
import { FileUploadService } from '../utils/image-upload/upload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageUploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly FileUploadService: FileUploadService,
  ) {}

  async create(
    createImageUploadDto: CreateImageUploadDto,
    images: Express.Multer.File[],
  ) {
    let uploadedData;

    try {
      if (images && images.length > 0) {
        console.log('UPLOADING STARTED');
        uploadedData = await Promise.all(
          images.map(async (photo) => {
            const photoUrl = await this.FileUploadService.uploadPhoto(photo);
            return { url: photoUrl };
          }),
        ).then(async (photos) => {
          const uploadedImage = await this.prisma.image.create({
            data: {
              reviewId: +createImageUploadDto.reviewId,
              userId: +createImageUploadDto.userId,
              adminId: +createImageUploadDto.adminId,
              images: { photos: photos },
              isExposed: createImageUploadDto.isExposed,
            },
          });
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Photos uploaded successfully',
            data: uploadedImage,
          };
        });
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'No photos uploaded',
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

  update(id: number, updateImageUploadDto: UpdateImageUploadDto) {
    return `This action updates a #${id} imageUpload`;
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
