import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigService } from '../../config';
import { BlockInfo } from 'entities/src/entities/ethereum-block-info.entity';
import { EthereumTransactionDelivery } from 'entities/src/entities/ethereum-transaction-delivery.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([BlockInfo, EthereumTransactionDelivery]),
  ],
  providers: [ConfigService],
})
export class DeliveryCheckerModule {}
