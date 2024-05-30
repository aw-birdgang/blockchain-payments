import { Module } from '@nestjs/common';
import { EtherService } from './ether.service';
import { EtherController } from './ether.controller';
import { ConfigService } from '../../config';
import { CommonService } from '../../common/common.service';

@Module({
  controllers: [EtherController],
  providers: [CommonService, ConfigService, EtherService],
})
export class EtherModule {}
