import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../modules/Products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID related with the order.',
    example: 'ae1ae47d-5561-46b4-97e8-c1720f47c257',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'An array of product IDs.',
    example: [
      {
        id: 'e90bc0a5-d1ce-48f8-8653-6fa57b701742',
      },
      {
        id: '5ca58258-fb0d-4e63-b290-426fadf66e59',
      },
      {
        id: '4e31bc69-d7e3-49c4-a6ef-6fc39045a894',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Product)
  product: Product[];
}
