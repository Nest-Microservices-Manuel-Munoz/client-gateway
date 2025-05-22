import { envs } from './../config/envs';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from '../config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroServiceHost,
          port: envs.ordersMicroServicePort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
