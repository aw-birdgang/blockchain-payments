import { Body, Controller, HttpException, HttpStatus, Logger, Post, Req } from '@nestjs/common';
import { ERC20Service } from './erc20.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseBalanceOfDto } from '../ether/dto/response-balance-of.dto';
import { ResponseGasPriceDto } from '../ether/dto/response-gasprice.dto';
import { RequestBalanceOfDto } from './dto/resquest-balance-of.dto';
import { RequestBalanceOfTotalDto } from './dto/resquest-balance-of-total.dto';
import { RequestContractNameDto } from './dto/resquest-contract-name.dto';
import { RequestTransferDto } from './dto/resquest-transfer.dto';
import { RequestContractAllowanceDto } from './dto/resquest-contract-allowance.dto';
import { RequestContractApproveDto } from './dto/resquest-contract-approve.dto';
import { RequestContractTransferFromDto } from './dto/resquest-contract-trasnfrom.dto';

@Controller('v1/erc20')
@ApiTags('ETHEREUM ERC20 API')
export class ERC20Controller {
  constructor(private readonly erc20Service: ERC20Service) {}
  private readonly logger = new Logger(ERC20Controller.name);

  @Post('balanceOf')
  @ApiOperation({
    summary: '계정 주소가 보유한 ERC20 자산 조회',
    description: '계정 주소의 자산을 알 수 있다.',
  })
  @ApiCreatedResponse({ description: '보유 자산 조회', type: ResponseBalanceOfDto })
  async balanceOf(@Req() req, @Body() requestBalanceOfDto: RequestBalanceOfDto) {
    try {
      const balance = await this.erc20Service.balanceOf(
        requestBalanceOfDto.ownerAddress,
        requestBalanceOfDto.token,
      );
      this.logger.log(req.url + ' => ' + requestBalanceOfDto.ownerAddress + ' : ' + balance);

      const responseBalanceOfDto = new ResponseBalanceOfDto();
      responseBalanceOfDto.address = requestBalanceOfDto.ownerAddress;
      responseBalanceOfDto.balance = balance.toString();

      return responseBalanceOfDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('balanceOfTotal')
  @ApiOperation({
    summary: '계정주소가 보유한 ERC20 전체 자산 조회',
    description: '계정 주소의 자산을 알 수 있다.',
  })
  @ApiCreatedResponse({ description: '보유자산조회', type: ResponseBalanceOfDto })
  async balanceOfTotal(@Req() req, @Body() requestBalanceOfTotalDto: RequestBalanceOfTotalDto) {
    try {
      const balance = await this.erc20Service.balanceOfTotal(requestBalanceOfTotalDto.ownerAddress);
      this.logger.log(req.url + ' => ' + requestBalanceOfTotalDto.ownerAddress);
      this.logger.log(balance);

      return balance;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('getInfo')
  @ApiOperation({
    summary: 'ERC20 토큰 정보 조회',
    description: 'ERC20 토큰 정보[Name, Symbol, Decimal]를 알 수 있다.',
  })
  async getInfo(@Req() req, @Body() requestContractNameDto: RequestContractNameDto) {
    try {
      const resultData = await this.erc20Service.getInfo(requestContractNameDto.contractAddress);
      this.logger.log(req.url + ' => ' + requestContractNameDto.contractAddress);

      return resultData;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('allowance')
  @ApiOperation({
    summary: 'ERC20 토큰 allowance 조회',
    description: 'ERC20 토큰 allowance를 알 수 있다.',
  })
  async allowance(@Req() req, @Body() requestContractAllowanceDto: RequestContractAllowanceDto) {
    try {
      const resultData = await this.erc20Service.allowance(
        requestContractAllowanceDto.token,
        requestContractAllowanceDto.private_key,
        requestContractAllowanceDto.toAddress,
      );
      this.logger.log(req.url + ' => ' + resultData);

      return { allowance: resultData.toString() };
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('approve')
  @ApiOperation({
    summary: 'ERC20 토큰 approve',
    description: 'ERC20 토큰 approve 할 수 있다.',
  })
  async approve(@Req() req, @Body() requestContractApproveDto: RequestContractApproveDto) {
    try {
      const resultData = await this.erc20Service.approve(
        requestContractApproveDto.token,
        requestContractApproveDto.private_key,
        requestContractApproveDto.toAddress,
        requestContractApproveDto.toAmount,
      );
      this.logger.log(req.url + ' => ' + resultData);

      return { resultData };
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('transferFrom')
  @ApiOperation({
    summary: 'ERC20 토큰 전송 [approve한 계정]',
    description:
      'Sender 로부터 Recipient 에게 지정된 수량(`amount`)의 토큰을 전송한다.<br>함수를 호출하는 계정의 `private_key` 가 필요하다.',
  })
  async transferFrom(
    @Req() req,
    @Body() requestContractTransferFromDto: RequestContractTransferFromDto,
  ) {
    try {
      const resultData = await this.erc20Service.transferFrom(
        requestContractTransferFromDto.token,
        requestContractTransferFromDto.private_key,
        requestContractTransferFromDto.fromAddress,
        requestContractTransferFromDto.toAddress,
        requestContractTransferFromDto.toAmount,
      );
      this.logger.log(req.url + ' => ' + resultData);

      return { resultData };
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('getTransferFee')
  @ApiOperation({
    summary: 'Token 전송 Fee 계산',
    description: 'Token 전송 Fee 계산할 수 있다.',
  })
  @ApiCreatedResponse({ description: 'Token 전송 Gas Price', type: ResponseGasPriceDto })
  async getTransferFee(@Req() req, @Body() requestTransferDto: RequestTransferDto) {
    try {
      const resultData = await this.erc20Service.getTransferGasPrice(
        requestTransferDto.token,
        requestTransferDto.toAddress,
        requestTransferDto.toAmount,
      );
      this.logger.log(req.url + ' => ' + resultData);

      const responseGasPriceDto = new ResponseGasPriceDto();
      responseGasPriceDto.gasPrice = resultData.toString();

      return responseGasPriceDto;
    } catch (ex) {
      this.logger.error(ex.message);
      throw new HttpException(ex.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('transferAmount')
  @ApiOperation({
    summary: 'ERC20 Token 전송',
    description:
      'Sender 로부터 Recipient 에게 지정된 수량(`amount`)의 토큰을 전송한다.<br>Sender 의 `private_key` 가 필요하다.',
  })
  async transferAmount(@Req() req, @Body() transferAmountDto: RequestTransferDto) {
    try {
      const tx = await this.erc20Service.transferAmount(
        transferAmountDto.token,
        transferAmountDto.private_key,
        transferAmountDto.toAddress,
        transferAmountDto.toAmount,
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
