import {Body, Controller, Get, HttpStatus, Logger, Param, Post, Query, Request, Res,} from '@nestjs/common';
import {WalletService} from './wallet.service';

import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger';
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {MasterWalletRequestCreateDto} from "../../dto/master-wallet-request-create.dto";
import {Wallet} from "../../entities";

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  private readonly logger = new Logger(WalletController.name);


  @Get()
  @ApiOperation({ summary: '모든 지갑 조회 API' })
  @ApiOkResponse({
    description: '모든 지갑 을 조회 한다.',
    type: Wallet,
    isArray: true,
  })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10, description: 'Number of wallets to return at one time',})
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number of the wallets to retrieve',})
  async findWallets(
      @Request() req,
      @Query('take') take: number = 10,
      @Query('page') page: number = 1,
      @Res() res: Response
  ) {
    const wallets = await this.walletService.findWallets({take, page});
    return res.status(HttpStatus.OK).json(wallets);
  }


  @Get(':clientId')
  @ApiOperation({ summary: '클라이언트 정보 조회 API' })
  @ApiOkResponse({
    description: 'Name 이 일치 하는 클라이언트 정보를 조회 한다.',
    type: Wallet,
  })
  async findByClientId(
      @Param('clientId') clientId: string,
      @Res() res: Response,
  ) {
    this.logger.log("findByClientId > clientId : " + clientId);
    const responseDto = await this.walletService.findByClientId(clientId);
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }


  @Get('list/:clientId')
  @ApiOperation({ summary: '클라이언트 정보 조회 API' })
  @ApiOkResponse({
    description: 'ID 가 일치 하는 클라이언트 목록 정보를 조회 한다.',
    type: Wallet,
    isArray: true,
  })
  async findAllByClientId(
      @Param('clientId') clientId: string,
      @Res() res: Response,
  ) {
    this.logger.log("findAllByClientId > clientId : " + clientId);
    const responseDto = await this.walletService.findAllByClientId(clientId);
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }



  @Post()
  @ApiOperation({ summary: '클라이언트 컨테이너 를 생성 API', description: '클라이언트 컨테이너 를 생성 한다.' })
  @ApiCreatedResponse({ description: '클라이언트 컨테이너 를 생성 한다.', type: Wallet })
  async createWallet(
      @Body() masterWalletRequestCreateDto: MasterWalletRequestCreateDto,
      @Res() res: Response,
  ) {
    const response = await this.walletService.createWallet(masterWalletRequestCreateDto.clientId,);
    return res.status(HttpStatus.OK).json(instanceToPlain(response));
  }

}
