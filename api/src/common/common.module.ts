import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInfo, GroupApikey, GroupMasterWallet, GroupFeePurse, Group_Fee_Purse_History, Common_Code } from 'src/entities';
import {ConfigService} from "../config";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupApikey, GroupMasterWallet, GroupInfo, GroupFeePurse, Group_Fee_Purse_History, Common_Code]),
  ],
  providers: [ConfigService, CommonService],
  exports: [CommonService],
})
export class CommonModule {}