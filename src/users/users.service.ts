import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        email: true,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: user,
    };
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found (Invalid id)',
      };
    }

    await this.prisma.user.delete({ where: { userId: id } });

    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
      data: user,
    };
  }
}
