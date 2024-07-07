import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guad';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    JwtModule,
    UsersModule,
    ReviewsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ## If you want to protect all routes with JWT, uncomment the following code
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // },
  ],
})
export class AppModule {}
