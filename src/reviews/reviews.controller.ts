import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('admin/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 10))
  create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    // If the photo is mandatory, uncomment the following code
    // if (!photos) {
    //   throw new BadRequestException('photos is missing');
    // }

    return this.reviewsService.create(createReviewDto, photos);
  }

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findAll(+page, +limit, sortBy, sortOrder);
  }

  @Get('new-registration-verification-review')
  findNewRegistrationVerificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findNewRegistrationVerificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
    );
  }

  @Get('new-registration-un-verification-review')
  findNewRegistrationUnVerificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findNewRegistrationUnVerificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
    );
  }

  @Get('certification-review')
  findCertificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findCertificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
    );
  }

  @Get('unverified-review')
  findUnverifiedReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findUnverifiedReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
    );
  }

  @Get('pet-review')
  findPetReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findPetReview(+page, +limit, sortBy, sortOrder);
  }

  @Get('re-registration-review')
  findReRegistrationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    return this.reviewsService.findReRegistrationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
