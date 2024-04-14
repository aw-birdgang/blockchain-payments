import {Module} from '@nestjs/common';
import {CommonService} from './common.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Common_Code, Client, ClientContainer} from 'src/entities';
import {ConfigService} from "../config";

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientContainer, Client, Common_Code]),
  ],
  providers: [ConfigService, CommonService],
  exports: [CommonService],
})
export class CommonModule {}
