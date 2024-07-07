import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/utils/decorators';
import { LocalGuard } from './guards/local.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  @Public()
  @UsePipes(new ValidationPipe())
  userRegister(@Body() registerDto: RegisterDto) {
    return this.authService.userRegister(registerDto);
  }

  @Post('user/login')
  @Public()
  @UsePipes(new ValidationPipe())
  // ## if you want to protect the login route with the LocalGuard, uncomment the following code
  // @UseGuards(LocalGuard)
  userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin/register')
  @Public()
  @UsePipes(new ValidationPipe())
  adminRegister(@Body() registerDto: RegisterDto) {
    return this.authService.adminRegister(registerDto);
  }

  @Post('admin/login')
  @Public()
  @UsePipes(new ValidationPipe())
  // ## if you want to protect the login route with the LocalGuard, uncomment the following code
  // @UseGuards(LocalGuard)
  adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }
}
