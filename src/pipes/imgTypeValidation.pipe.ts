import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImgTypeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const types = ['image/jpeg', 'image/png', 'image/webp'];

    console.log('MIME TYPE DETECTADO:', file?.mimetype);

    if (!file) {
      throw new BadRequestException('No se ha proporcionado ningún archivo.');
    }

    if (!types.includes(file.mimetype)) {
      throw new BadRequestException(
        'Tipo de archivo no permitido. Solo se aceptan imágenes JPG, PNG o WEBP.',
      );
    }

    return file;
  }
}
