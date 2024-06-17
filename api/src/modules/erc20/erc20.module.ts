import { Module } from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { ERC20Controller } from './erc20.controller';
import { CommonService } from 'src/common/common.service';
import { ConfigService } from '../config';

@Module({
  controllers: [ERC20Controller],
  providers: [ERC20Service, CommonService, ConfigService],
})
export class ERC20Module {}
