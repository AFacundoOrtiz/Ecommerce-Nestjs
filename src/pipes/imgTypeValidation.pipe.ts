import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImgTypeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const types = ['image/jpeg', 'image/png', 'image/webp'];

    console.log('MIME TYPE DETECTADO:', file?.mimetype);

    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    if (!types.includes(file.mimetype)) {
      throw new BadRequestException(
        'File type not allowed. Only JPG, PNG, or WEBP images are accepted.',
      );
    }

    return file;
  }
}
