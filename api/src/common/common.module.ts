import {Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Common_Code, Group, GroupContainer} from 'src/entities';
import {ConfigService} from "../config";

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupContainer, Group, Common_Code]),
  ],
  providers: [ConfigService, CommonService],
  exports: [CommonService],
})
export class CommonModule {}