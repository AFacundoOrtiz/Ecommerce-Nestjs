import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!isUUID(value)) {
      throw new BadRequestException(`The ID ${value} is not a valid UUID.`);
    }

    return value;
  }
}
