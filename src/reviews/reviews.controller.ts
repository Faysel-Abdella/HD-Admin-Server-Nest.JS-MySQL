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
import { ApiQuery } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  sortByQueryOption,
  sortOrderOption,
  pageOption,
  limitOption,
  addressOption,
  usernameOption,
} from '../utils/queryOptions';
import { Exclude } from 'class-transformer';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('add-review')
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

  @Get('admin/reviews')
  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(addressOption)
  @ApiQuery(usernameOption)
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('address') address?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findAll(
      +page,
      +limit,
      sortBy,
      sortOrder,
      address,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/new-registration-verification-review')
  findNewRegistrationVerificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findNewRegistrationVerificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/new-registration-un-verification-review')
  findNewRegistrationUnVerificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findNewRegistrationUnVerificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/certification-review')
  findCertificationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findCertificationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/unverified-review')
  findUnverifiedReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findUnverifiedReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/pet-review')
  findPetReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findPetReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @ApiQuery(sortOrderOption)
  @ApiQuery(sortByQueryOption)
  @ApiQuery(pageOption)
  @ApiQuery(limitOption)
  @ApiQuery(usernameOption)
  @Get('admin/reviews/re-registration-review')
  findReRegistrationReview(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
    @Query('username') username?: string,
    @Query('sigungu') sigungu?: string,
  ) {
    return this.reviewsService.findReRegistrationReview(
      +page,
      +limit,
      sortBy,
      sortOrder,
      username,
      sigungu,
    );
  }

  @Get('admin/reviews/:id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch('admin/reviews/:id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete('admin/reviews/:id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
