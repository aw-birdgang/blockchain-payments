import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { WalletService } from './wallet.service';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { MasterWalletRequestCreateDto } from './dto/master-wallet-request-create.dto';
import { Wallet } from '../../entities';

@Controller('v1/wallet')
@ApiTags('WALLET API')
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
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of wallets to return at one time',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number of the wallets to retrieve',
  })
  async findWallets(
    @Request() req,
    @Query('take') take: number = 10,
    @Query('page') page: number = 1,
    @Res() res: Response,
  ) {
    const wallets = await this.walletService.findWallets({ take, page });
    return res.status(HttpStatus.OK).json(wallets);
  }

  @Post()
  @ApiOperation({
    summary: '클라이언트 컨테이너 를 생성 API',
    description: '클라이언트 컨테이너 를 생성 한다.',
  })
  @ApiCreatedResponse({ description: '클라이언트 컨테이너 를 생성 한다.', type: Wallet })
  async createWallet(
    @Body() masterWalletRequestCreateDto: MasterWalletRequestCreateDto,
    @Res() res: Response,
  ) {
    const response = await this.walletService.createWallet(masterWalletRequestCreateDto.clientId);
    return res.status(HttpStatus.OK).json(instanceToPlain(response));
  }

  @Put(':name')
  @ApiOperation({
    summary: '지갑 이름 정보 수정 API',
    description: '지갑 이름 정보 수정 합니다.',
  })
  @ApiOkResponse({
    description: '지갑 이름 정보 수정 합니다.',
    type: Wallet,
  })
  async updateName(@Param('id') id: string, @Query('name') name: string, @Res() res: Response) {
    const client = await this.walletService.updateName(id, name);
    return res.status(HttpStatus.OK).json(instanceToPlain(client));
  }
}
