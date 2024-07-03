import { Injectable } from '@nestjs/common';
import { Public } from './utils/decorators';

@Injectable()
export class AppService {
  @Public()
  getHello(): string {
    return 'Hello World!';
  }
}
