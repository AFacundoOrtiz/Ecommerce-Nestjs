import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { Product } from '../modules/Products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'User ID related with the order.',
    example: '2dc6add8-f274-4f79-a6ef-8e9d3973c0c5',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'An array of product IDs.',
    example: [
      {
        id: '1720c4ee-7f2a-4536-9d4b-d67a598ad124',
      },
      {
        id: 'e94290e2-8492-4f3f-aa15-9bd62483fb76',
      },
      {
        id: '11917af7-0831-4694-b76d-1b4eb9547df2',
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Product)
  product: Product[];
}
