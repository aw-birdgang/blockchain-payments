import { Module } from '@nestjs/common';
import { EtherService } from './ether.service';
import { EtherController } from './ether.controller';

@Module({
  controllers: [EtherController],
  providers: [EtherService],
})
export class EtherModule {}
