import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from 'src/modules/Products/product.entity';
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
    description: 'An array of products.',
    example: [
      {
        id: 'e90bc0a5-d1ce-48f8-8653-6fa57b701742',
        name: 'Iphone 15',
        description: 'The best smartphone in the world',
        price: 199.99,
        category: 'smartphone',
      },
      {
        id: '5ca58258-fb0d-4e63-b290-426fadf66e59',
        name: 'Samsung Galaxy S23',
        description: 'The best smartphone in the world',
        price: 150.0,
        category: 'smartphone',
      },
      {
        id: '4e31bc69-d7e3-49c4-a6ef-6fc39045a894',
        name: 'Motorola Edge 40',
        description: 'The best smartphone in the world',
        price: 179.89,
        category: 'smartphone',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Product)
  product: Product[];
}
