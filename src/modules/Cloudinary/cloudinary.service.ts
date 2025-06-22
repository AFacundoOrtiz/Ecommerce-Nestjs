/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { Injectable } from '@nestjs/common';
import {
  UploadApiResponse,
  UploadApiOptions,
  v2 as cloudinary,
} from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  async uploadImg(
    file: Express.Multer.File,
    options: Partial<UploadApiOptions> = { resource_type: 'auto' },
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error || !result)
            return reject(error || new Error('Upload result is undefined'));
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
