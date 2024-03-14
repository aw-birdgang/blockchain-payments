import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group_Info, Group_Apikey, Group_Master_Wallet, Group_Fee_Purse, Group_Fee_Purse_History, Common_Code } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group_Apikey, Group_Master_Wallet, Group_Info, Group_Fee_Purse, Group_Fee_Purse_History, Common_Code]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
