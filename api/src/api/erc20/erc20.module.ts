import { Module } from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { ERC20Controller } from './erc20.controller';
import { CommonService } from 'src/common/common.service';

@Module({
  controllers: [ERC20Controller],
  providers: [ERC20Service, CommonService],
})
export class ERC20Module {}
