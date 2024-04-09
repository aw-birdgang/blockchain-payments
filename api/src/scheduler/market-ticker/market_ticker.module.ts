import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MarketTicker } from 'src/entities';
import { MarketTickerService } from './market_ticker.service';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketTicker]), HttpModule],
  providers: [MarketTickerService, CommonService],
})
export class MarketTickerModule {}