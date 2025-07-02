import { Expose, Type } from 'class-transformer';
import { OrderDetailResponseDto } from './OrderDetailReponseDto.dto';

export class OrderResponseDto {
  @Expose()
  id: string;

  @Expose()
  date: Date;

  @Expose()
  @Type(() => OrderDetailResponseDto)
  orderDetail: OrderDetailResponseDto;
}
