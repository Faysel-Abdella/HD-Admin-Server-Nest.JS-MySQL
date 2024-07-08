import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User, Admin } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async userRegister(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          username: registerDto.username,
        },
      });
      if (user) {
        const payload = {
          email: registerDto.email,
          sub: user.userId,
          username: user.username,
        };
        return {
          access_token: this.jwtService.sign(payload),
          user: user,
        };
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const fields = error.meta?.target;
        const fieldMessage = fields
          ? `Unique constraint failed on the fields: ${fields}`
          : 'Unique constraint failed';
        console.error(fieldMessage);
        throw new HttpException(fieldMessage, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async userLogin(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (passwordMatch) {
        const payload = {
          email: loginDto.email,
          sub: user.userId,
          username: user.username,
        };
        return {
          access_token: this.jwtService.sign(payload),
          user: user,
        };
      }
    }
  }

  // Admin register and login methods
  async adminRegister(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const admin = await this.prisma.admin.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          username: registerDto.username,
        },
      });
      if (admin) {
        const payload = {
          email: registerDto.email,
          sub: admin.adminId,
          username: admin.username,
        };
        return {
          access_token: this.jwtService.sign(payload),
          admin: admin,
        };
      }
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const fields = error.meta?.target;
        const fieldMessage = fields
          ? `Unique constraint failed on the fields: ${fields}`
          : 'Unique constraint failed';
        console.error(fieldMessage);
        throw new HttpException(fieldMessage, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async adminLogin(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; admin: Admin }> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email: loginDto.email,
      },
    });

    if (admin) {
      const passwordMatch = await bcrypt.compare(
        loginDto.password,
        admin.password,
      );
      if (passwordMatch) {
        const payload = {
          email: loginDto.email,
          sub: admin.adminId,
          username: admin.username,
        };
        return {
          access_token: this.jwtService.sign(payload),
          admin: admin,
        };
      }
    }
  }
}
