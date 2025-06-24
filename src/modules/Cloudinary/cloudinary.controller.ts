import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { FileInterceptor } from '@nestjs/platform-express';
import { UuidValidationPipe } from '../../pipes/uuidValidation.pipe';
import { ImgSizeValidationPipe } from '../../pipes/imgSizeValidation.pipe';
import { ImgTypeValidationPipe } from '../../pipes/imgTypeValidation.pipe';
import { authGuard } from '../../guards/auth.guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/role.decorator';

@ApiTags('Files')
@Controller('files')
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly cloudinaryRepository: CloudinaryRepository,
  ) {}

  @ApiOperation({ summary: 'Upload an image y link it with a product.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBearerAuth('jwt')
  @UseGuards(authGuard, RolesGuard)
  @Roles('admin')
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ImgSizeValidationPipe(), new ImgTypeValidationPipe())
    file: Express.Multer.File,
    @Param('id', UuidValidationPipe) id: string,
  ) {
    const uploadResult = await this.cloudinaryService.uploadImg(file);
    return this.cloudinaryRepository.imgToProduct(id, uploadResult.secure_url);
  }
}
