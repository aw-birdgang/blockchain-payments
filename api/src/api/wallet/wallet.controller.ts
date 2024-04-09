import { Controller, HttpException, HttpStatus, Logger, Body, Param, Get, Post, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';

import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { GroupApikey } from 'src/entities';
import { RequestUserIDDto } from './dto/request-userid.dto';
import { RequestUserIDWebHookDto } from './dto/request-userid-webhook.dto';
import { ResponseApiKeyDto } from './dto/response-account.dto';
import { ResponseWalletDto } from './dto/response-wallet.dto';
import { RequestFeeDto } from './dto/request-fee.dto';
import { DepositTransactions } from './dto/request-deposit-transactions.dto';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  private readonly logger = new Logger(WalletController.name);

  @Get('getApiKey/:group_code')
  @ApiOperation({ summary: '회원 ApiKey 조회', description: '회원 ApiKey를 조회할 수 있다.' })
  @ApiCreatedResponse({ description: '회원ApiKey정보', type: ResponseApiKeyDto })
  async selectApiKey(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectApiKey(group_code);

      const responseDto = new GroupApikey();

      if (resultData.length == 0) {
        responseDto.group_code = group_code;
        responseDto.api_key = '';
        responseDto.webhook_href = '';
        responseDto.created_at = new Date(1900, 1, 1);

        this.logger.log(req.url + ' => ' + responseDto);
        return responseDto;
      } else {
        this.logger.log(req.url + ' => ' + responseDto);
        return resultData;
      }
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('setApiKey')
  @ApiOperation({ summary: '회원 ApiKey 생성', description: '회원 ApiKey를 생성할 수 있다.' })
  @ApiCreatedResponse({ description: '회원ApiKey정보', type: ResponseApiKeyDto })
  async createApiKey(@Req() req, @Body() requestUserIDDto: RequestUserIDDto) {
    try {
      const resultData = await this.walletService.createApiKey(requestUserIDDto.group_code);
      this.logger.log(req.url + ' => ' + resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('updateWebhookHref')
  @ApiOperation({ summary: '회원 Webhook href 저장', description: '회원 Webhook href를 저장할 수 있다.' })
  @ApiCreatedResponse({ description: '회원 webhook href 저장', type: ResponseApiKeyDto })
  async updateWebhookHref(@Req() req, @Body() requestUserIDWebHookDto: RequestUserIDWebHookDto) {
    try {
      const resultData = await this.walletService.updateWebhookHref(
        requestUserIDWebHookDto.group_code,
        requestUserIDWebHookDto.WebhookHref,
      );
      this.logger.log(req.url + ' => ' + resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getMasterWallet/:group_code')
  @ApiOperation({ summary: '회원 Master Wallet 조회', description: '회원 Master Wallet를 조회할 수 있다. 없으면 자동 생성하도록 한다.' })
  @ApiCreatedResponse({ description: '회원Master Wallet 정보', type: ResponseWalletDto })
  async selectMasterWallet(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectMasterWallet(group_code);

      if (resultData.length == 0) {
        const resultData = await this.walletService.createMasterWallet(group_code);
        this.logger.log(req.url);
        return resultData;
      } else {
        this.logger.log(req.url);
        return resultData;
      }
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getMasterWalletBalance/:group_code')
  @ApiOperation({
    summary: '그룹 Master지갑 자산 조회',
    description: '그룹 Master지갑 자산을 조회할 수 있다. 없으면 자동 생성하도록 한다.',
  })
  @ApiCreatedResponse({ description: '그룹 Master지갑 자산 조회', type: ResponseWalletDto })
  async selectMasterWalletBalance(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectMasterWalletBalance(group_code);
      this.logger.log(req.url);

      resultData.forEach((item) => {
        try {
          item['coin_amount'] = item['coin_amount'] / 100000000;
        } catch {
          item['coin_amount'] = 0;
        }
      });
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('setMasterWallet')
  // @ApiOperation({ summary: '회원 MasterWallet 생성', description: '회원 Master Wallet를 생성할 수 있다. Network: Ethereum / Tron' })
  // @ApiCreatedResponse({ description: '회원MasterWallet정보', type: ResponseMasterWalletDto })
  // async createMasterWallet(@Req() req, @Body() requestMasterWalletDto: RequestMasterWalletDto) {
  //   try {
  //     const resultData = await this.walletService.createMasterWallet(requestMasterWalletDto.group_code, 'Ethereum');
  //     this.logger.log(req.url + ' => ' + resultData);
  //     return resultData;
  //   } catch (ex) {
  //     this.logger.error(ex.message);
  //     console.log(ex.message);
  //     throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get('getFeeWallet/:group_code')
  @ApiOperation({ summary: '회원 Fee Wallet 조회', description: '회원 Fee Wallet를 조회할 수 있다. 없으면 자동 생성하도록 한다.' })
  @ApiCreatedResponse({ description: '회원Fee Wallet 정보', type: ResponseWalletDto })
  async selectFeeWallet(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectFeeWallet(group_code);

      if (resultData.length == 0) {
        const resultData = await this.walletService.createFeeWallet(group_code);
        this.logger.log(req.url);
        return resultData;
      } else {
        this.logger.log(req.url);
        return resultData;
      }
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getFeeWalletBalance/:group_code')
  @ApiOperation({
    summary: '그룹 Fee지갑 자산 조회',
    description: '그룹 Fee지갑 자산을 조회할 수 있다. 없으면 자동 생성하도록 한다.',
  })
  @ApiCreatedResponse({ description: '그룹 Fee지갑 자산 조회', type: ResponseWalletDto })
  async selectFeeWalletBalance(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectFeeWalletBalance(group_code);
      this.logger.log(req.url);

      resultData.forEach((item) => {
        try {
          item['coin_amount'] = item['coin_amount'] / 100000000;
        } catch {
          item['coin_amount'] = 0;
        }
      });
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getaddress/:group_code')
  @ApiOperation({
    summary: '새로운 회원 입금주소 받기',
    description: '새로운 회원 입금주소를 받을 수 있다.<br>회원 입금주소는 일정기간 미사용시 회수하도록 한다.',
  })
  async getaddress(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectCoinAddress(group_code);

      this.logger.log(req.url + ' => ' + resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getAddressAll/:group_code')
  @ApiOperation({
    summary: '현재 할당되어 있는 회원 입금주소 전체조회',
    description: '현재 할당되어 있는 회원 입금주소 전체를 조회할 수 있다.<br>회원 입금주소는 일정기간 미사용시 회수하도록 한다.',
  })
  async getAddressAll(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectCurrentCoinAddress(group_code);

      this.logger.log(req.url + ' => ' + resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getRegisteredAddress/:group_code')
  @ApiOperation({
    summary: '과거 할당되었던 회원 입금주소 전체조회',
    description: '과거 할당되었던 회원 입금주소 전체를 조회할 수 있다.<br>회원 입금주소는 일정기간 미사용시 회수하도록 한다.',
  })
  async getRegisteredAddress(@Req() req, @Param('group_code') group_code: string) {
    try {
      const resultData = await this.walletService.selectRegisteredCoinAddress(group_code);

      this.logger.log(req.url + ' => ' + resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getDepositFee')
  @ApiOperation({
    summary: '입금수수료율 조회',
    description: '입금 수수료율을 조회할 수 있다.',
  })
  async selectDepositFee(@Req() req) {
    try {
      const resultData = await this.walletService.selectDepositFee();

      this.logger.log(req.url + ' => ', resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('getWithdrawFee')
  @ApiOperation({
    summary: '출금수수료율 조회',
    description: '출금 수수료율을 조회할 수 있다.',
  })
  async selectWithdrawFee(@Req() req) {
    try {
      const resultData = await this.walletService.selectWithdrawtFee();

      this.logger.log(req.url + ' => ', resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('setDepositFee')
  @ApiOperation({
    summary: '입금수수료율 설정',
    description: '입금 수수료율을 설정할 수 있다.',
  })
  async updateDepositFee(@Req() req, @Body() requestFeeDto: RequestFeeDto) {
    try {
      const resultData = await this.walletService.updateDepositFee(requestFeeDto.ethereum_fee, requestFeeDto.polygon_fee);

      this.logger.log(req.url + ' => ', resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('setWithdrawFee')
  @ApiOperation({
    summary: '출금수수료율 설정',
    description: '출금 수수료율을 설정할 수 있다.',
  })
  async updateWithdrawFee(@Req() req, @Body() requestFeeDto: RequestFeeDto) {
    try {
      const resultData = await this.walletService.updateWithdrawFee(requestFeeDto.ethereum_fee, requestFeeDto.polygon_fee);

      this.logger.log(req.url + ' => ', resultData);
      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      console.log(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('webhook_test')
  @ApiOperation({
    summary: 'Webhook Test',
    description: 'Webhook Test',
  })
  async webhook_test(@Req() req, @Body() depositTransactions: DepositTransactions) {
    this.logger.log(req.url + ' => ');
    console.log(depositTransactions);
    return depositTransactions;
  }
}
