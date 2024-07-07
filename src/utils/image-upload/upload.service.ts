import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  private uploadDirectory: string;

  constructor() {
    this.uploadDirectory = 'uploads/images';
  }

  async uploadPhoto(photo: Express.Multer.File): Promise<string> {
    if (!photo) {
      throw new BadRequestException('No photo provided');
    }

    const fileName = `${uuidv4()}-image.jpg`;
    const filePath = path.join(this.uploadDirectory, fileName);

    await fs.promises.writeFile(filePath, photo.buffer);

    return filePath;
  }
}
