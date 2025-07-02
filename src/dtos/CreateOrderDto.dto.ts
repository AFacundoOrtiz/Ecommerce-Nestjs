import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../modules/Products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID related with the order.',
    example: '67a7bc81-3c2e-4d31-83b9-094c26e2c5d7',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'An array of product IDs.',
    example: [
      {
        id: 'fe1f4d51-f89b-4842-b91c-e35ca2247d75',
      },
      {
        id: '4b6f2431-9b43-4ba2-9f17-8a84639438ed',
      },
      {
        id: '69bd2ec5-559c-42a3-9254-b0ff49e88d6e',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Product)
  product: Product[];
}
