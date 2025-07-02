import { Expose } from 'class-transformer';

export class ProductsResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  price: number;
}
