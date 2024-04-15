import {Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Common_Code, Client, } from 'src/entities';
import {ConfigService} from "../config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Common_Code]),
  ],
  providers: [ConfigService, CommonService],
  exports: [CommonService],
})
export class CommonModule {}
