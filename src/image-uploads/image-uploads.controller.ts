import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ImageUploadsService } from './image-uploads.service';
import { CreateImageUploadDto } from './dto/create-image-upload.dto';
import { UpdateImageUploadDto } from './dto/update-image-upload.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image-uploads')
export class ImageUploadsController {
  constructor(private readonly imageUploadsService: ImageUploadsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  create(
    @Body() createImageUploadDto: CreateImageUploadDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.imageUploadsService.create(createImageUploadDto, images);
  }

  @Get()
  findAll() {
    return this.imageUploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageUploadsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateImageUploadDto: UpdateImageUploadDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.imageUploadsService.update(+id, updateImageUploadDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageUploadsService.remove(+id);
  }
}
