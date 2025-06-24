import { Module } from '@nestjs/common';
import { CloudinaryConfig } from '../../config/cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { Product } from '../Products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryController } from './cloudinary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [CloudinaryConfig, CloudinaryService, CloudinaryRepository],
  controllers: [CloudinaryController],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
