import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Req } from '@nestjs/common';
import { EtherService } from './ether.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseBalanceOfDto } from './dto/response-balance-of.dto';
import { ResponseBlockNumberDto } from './dto/response-block-number.dto';
import { ResponseRPCAddressDto } from './dto/response-rpcaddress.dto';
import { ResponseGasPriceDto } from './dto/response-gasprice.dto';
import { ResponseAccountDto } from './dto/response-account.dto';
import { GetTransferGasPriceDto } from './dto/request-gettransfer-gasprice.dto';
import { TransferAmountDto } from './dto/request-transfer-amount.dto';

@ApiTags('Ethereum')
@Controller('ether')
export class EtherController {
  constructor(private readonly etherService: EtherService) {}
  private readonly logger = new Logger(EtherController.name);

  @Get('balanceOf/:address')
  @ApiOperation({ summary: '계정주소가 보유한 자산 조회', description: '계정 주소의 자산을 알 수 있다.' })
  @ApiCreatedResponse({ description: '보유자산조회', type: ResponseBalanceOfDto })
  async balanceOf(@Req() req, @Param('address') address: string) {
    try {
      const balance = await this.etherService.balanceOf(address);
      this.logger.log(req.url + ' => ' + balance);

      const responseBalanceOfDto = new ResponseBalanceOfDto();
      responseBalanceOfDto.address = address;
      responseBalanceOfDto.balance = balance;

      return responseBalanceOfDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getBlockNumber')
  @ApiOperation({ summary: '현재의 블럭번호 조회', description: '현재의 블럭번호를 조회할 수 있다.' })
  @ApiCreatedResponse({ description: 'BlockNumber', type: ResponseBlockNumberDto })
  async getBlockNumber(@Req() req) {
    try {
      const blockNumber = await this.etherService.getBlockNumber();
      this.logger.log(req.url + ' => ' + blockNumber);

      const responseBlockNumberDto = new ResponseBlockNumberDto();
      responseBlockNumberDto.blockNumber = blockNumber.toString();

      return responseBlockNumberDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getBlockByNumber/:blockNumber')
  @ApiOperation({
    summary: 'Block number에 해당하는 Block 정보 조회',
    description: 'Block number를 통해 Ethereum 네트워크 내 Block 정보 조회를 조회할 수 있다.',
  })
  async getBlockByNumber(@Req() req, @Param('blockNumber') blockNumber: bigint) {
    try {
      const block = await this.etherService.getBlockByNumber(blockNumber);
      this.logger.log(req.url + ' => ' + block);

      return block;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('findAddress/:privateKey')
  @ApiOperation({
    summary: 'Private Key로 주소 찾기',
    description: '개인키로 Blockchain Address를 찾을 수 있다.',
  })
  @ApiCreatedResponse({ description: '주소조회', type: ResponseBalanceOfDto })
  async findAddress(@Req() req, @Param('privateKey') privateKey: string) {
    try {
      const address = await this.etherService.findAddress(privateKey);
      const balance = await this.etherService.balanceOf(address);
      this.logger.log(req.url + ' => ' + address + ' : ' + balance);

      const responseBalanceOfDto = new ResponseBalanceOfDto();
      responseBalanceOfDto.address = address;
      responseBalanceOfDto.balance = balance;

      return responseBalanceOfDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('rpcAddress')
  @ApiOperation({
    summary: 'RPC Address',
    description: 'RPC Address를 찾을 수 있다.',
  })
  @ApiCreatedResponse({ description: 'rpc주소 조회', type: ResponseRPCAddressDto })
  async rpcAddress(@Req() req) {
    try {
      const rpcaddress = await this.etherService.rpcurl;
      this.logger.log(req.url + ' => ' + rpcaddress);

      const responseRPCAddressDto = new ResponseRPCAddressDto();
      responseRPCAddressDto.address = rpcaddress;

      return responseRPCAddressDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getTransactionReceipt/:transactionHash')
  @ApiOperation({
    summary: 'Transaction 의 결과(영수증)을 조회',
    description: 'Transaction 의 결과(영수증)을 조회할 수 있다.',
  })
  async getTransactionReceipt(@Req() req, @Param('transactionHash') transactionHash: string) {
    try {
      const transaction = await this.etherService.getTransactionReceipt(transactionHash);
      this.logger.log(req.url + ' => ' + transaction);

      return transaction;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getGasPrice')
  @ApiOperation({
    summary: 'Gas Price을 조회',
    description: 'GasPrice를 조회할 수 있다.',
  })
  @ApiCreatedResponse({ description: 'GasPrice를 조회', type: ResponseGasPriceDto })
  async getGasPrice(@Req() req) {
    try {
      const gasPrice = await this.etherService.getGasPrice();
      this.logger.log(req.url + ' => ' + gasPrice);

      const responseGasPriceDto = new ResponseGasPriceDto();
      responseGasPriceDto.gasPrice = gasPrice;

      return responseGasPriceDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('createAccount')
  @ApiOperation({
    summary: '블록체인 계정 생성',
    description: '블록체인 계정을 생성할 수 있다.',
  })
  @ApiCreatedResponse({ description: '블록체인 계정 생성', type: ResponseAccountDto })
  async createAccount(@Req() req) {
    try {
      const account = await this.etherService.createAccount();
      this.logger.log(req.url + ' => ' + account);

      const responseAccountDto = new ResponseAccountDto();
      responseAccountDto.address = account.address;
      responseAccountDto.privateKey = account.privateKey;

      return responseAccountDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('getTransferGasPrice')
  @ApiOperation({
    summary: 'Token 전송 Gas Price 계산',
    description: 'Token 전송 Gas Price 계산할 수 있다. 전송속도 speed (0.5 ~ 4.0) [slow:0.7, normal:1, fast:2, very fast:4]',
  })
  @ApiCreatedResponse({ description: 'Token 전송 Gas Price', type: ResponseGasPriceDto })
  async getTransferGasPrice(@Req() req, @Body() getTransferGasPriceDto: GetTransferGasPriceDto) {
    try {
      if (getTransferGasPriceDto.speed < 1) getTransferGasPriceDto.speed = 1;
      else if (getTransferGasPriceDto.speed > 4) getTransferGasPriceDto.speed = 4;

      const gasPrice = await this.etherService.getTransferGasPrice(getTransferGasPriceDto.speed, getTransferGasPriceDto.toAddress);
      this.logger.log(req.url + ' => ' + gasPrice);

      const responseGasPriceDto = new ResponseGasPriceDto();
      responseGasPriceDto.gasPrice = gasPrice;

      return responseGasPriceDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('transferAmount')
  @ApiOperation({
    summary: 'Base Token 전송',
    description: 'Base Token 전송할 수 있다. 전송속도 speed (0.5 ~ 4.0) [slow:0.7, normal:1, fast:2, very fast:4]',
  })
  @ApiCreatedResponse({ description: 'Token 전송 Gas Price', type: ResponseGasPriceDto })
  async transferAmount(@Req() req, @Body() transferAmountDto: TransferAmountDto) {
    try {
      if (transferAmountDto.speed < 1) transferAmountDto.speed = 1;
      else if (transferAmountDto.speed > 4) transferAmountDto.speed = 4;

      const tx = await this.etherService.transferAmount(
        transferAmountDto.speed,
        transferAmountDto.toAddress,
        transferAmountDto.private_key,
        transferAmountDto.amount,
      );
      this.logger.log(req.url);
      this.logger.log(tx);

      return tx;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }
}
