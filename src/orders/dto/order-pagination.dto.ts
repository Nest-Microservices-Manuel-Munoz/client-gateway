import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { PaginationDto } from '../../common';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      OrderStatusList,
    ).join(', ')}`,
  })
  status: OrderStatus;
}
