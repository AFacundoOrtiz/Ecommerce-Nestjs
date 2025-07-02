import { Expose, Type } from 'class-transformer';
import { ProductsResponseDto } from './ProductsResponseDto.dto';

export class OrderDetailResponseDto {
  @Expose()
  id: string;

  @Expose()
  price: number;

  @Expose()
  @Type(() => ProductsResponseDto)
  products: ProductsResponseDto[];
}
