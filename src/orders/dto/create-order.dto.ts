import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  // @IsNumber()
  // @IsPositive()
  // totalAmount: number;
  // @IsNumber()
  // @IsPositive()
  // totalItems: number;
  // @IsEnum(OrderStatusList, {
  //   message: `status must be one of the following: ${OrderStatusList.join(', ')}`,
  // })
  // @IsOptional()
  // status: OrderStatus = OrderStatus.PENDING;
  // @IsBoolean()
  // @IsOptional()
  // paid: boolean = false;
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
