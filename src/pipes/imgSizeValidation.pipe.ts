import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImgSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const max = 200 * 1024;

    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    if (file.size > max) {
      throw new BadRequestException('The image must not exceed 200KB.');
    }

    return file;
  }
}
