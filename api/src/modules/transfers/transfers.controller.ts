import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { TransfersService } from './transfers.service';
import { Transfer } from './entities/transfer.entity';
import { instanceToPlain } from 'class-transformer';

@Controller('v1/transfers')
@ApiTags('TRANSFERS API')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  private readonly logger = new Logger(TransfersController.name);

  @Get()
  @ApiOperation({ summary: '모든 입출금 내역 조회 API' })
  @ApiOkResponse({
    description: '모든 입출금 내역 을 조회 한다.',
    type: Transfer,
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
  async findTransfers(
    @Request() req,
    @Query('take') take: number = 10,
    @Query('page') page: number = 1,
    @Res() res: Response,
  ) {
    const transfers = await this.transfersService.findTransfers({ take, page });
    return res.status(HttpStatus.OK).json(transfers);
  }

  @Get(':id')
  @ApiOperation({ summary: '입출금 내역 정보 조회 API' })
  @ApiUnauthorizedResponse({ description: '401. UnauthorizedException.' })
  @ApiForbiddenResponse({ description: '403. ForbiddenException.' })
  @ApiOkResponse({
    type: [Transfer],
    description: '200. Success. Returns a transfer info',
  })
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const responseDto = await this.transfersService.findById(id);
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }
}
