import {Body, Controller, HttpStatus, Logger, Post, Res} from '@nestjs/common';
import {WalletService} from './wallet.service';

import {ApiCreatedResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ClientContainer} from "../../entities";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {MasterWalletRequestCreateDto} from "../../dto/master-wallet-request-create.dto";

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  private readonly logger = new Logger(WalletController.name);



  @Post()
  @ApiOperation({ summary: '클라이언트 컨테이너 를 생성 API', description: '클라이언트 컨테이너 를 생성 한다.' })
  @ApiCreatedResponse({ description: '클라이언트 컨테이너 를 생성 한다.', type: ClientContainer })
  async createMasterWallet(
      @Body() masterWalletRequestCreateDto: MasterWalletRequestCreateDto,
      @Res() res: Response,
  ) {
    const response = await this.walletService.createMasterWallet(masterWalletRequestCreateDto.code, masterWalletRequestCreateDto.network);
    return res.status(HttpStatus.OK).json(instanceToPlain(response));
  }

}
