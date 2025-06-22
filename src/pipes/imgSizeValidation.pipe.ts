import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImgSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const max = 200 * 1024;

    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo.');
    }

    if (file.size > max) {
      throw new BadRequestException('La imagen no debe superar los 200KB.');
    }

    return file;
  }
}
