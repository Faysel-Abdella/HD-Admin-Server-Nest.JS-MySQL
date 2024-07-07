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
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.reviewsService.findAll(+page, +limit);
  }

  @Get('new-registration-verification-review')
  findNewRegistrationVerificationReview() {
    return this.reviewsService.findNewRegistrationVerificationReview();
  }

  @Get('new-registration-un-verification-review')
  findNewRegistrationUnVerificationReview() {
    return this.reviewsService.findNewRegistrationUnVerificationReview();
  }

  @Get('certification-review')
  findCertificationReview() {
    return this.reviewsService.findCertificationReview();
  }

  @Get('unverified-review')
  findUnverifiedReview() {
    return this.reviewsService.findUnverifiedReview();
  }

  @Get('pet-review')
  findPetReview() {
    return this.reviewsService.findPetReview();
  }

  @Get('re-registration-review')
  findReRegistrationReview() {
    return this.reviewsService.findReRegistrationReview();
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
