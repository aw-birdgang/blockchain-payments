import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { ClientRequestCreateDto } from './dto/client-request-create.dto';
import { instanceToPlain } from 'class-transformer';

@Controller('v1/client')
@ApiTags('CLIENT API')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  private readonly logger = new Logger(ClientController.name);

  @Post()
  @ApiOperation({ summary: '클라이언트 를 생성 API', description: '클라이언트 를 생성 한다.' })
  @ApiCreatedResponse({ description: '클라이언트 를 생성 한다.', type: Client })
  async create(@Body() clientRequestCreateDto: ClientRequestCreateDto, @Res() res: Response) {
    const response = await this.clientService.createClient(clientRequestCreateDto);
    return res.status(HttpStatus.OK).json(instanceToPlain(response));
  }

  @Get()
  @ApiOperation({ summary: '모든 클라이언트 조회 API' })
  @ApiOkResponse({
    description: '모든 클라이언트 를 조회 한다.',
    type: Client,
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
  async findClients(
    @Request() req,
    @Query('take') take: number = 10,
    @Query('page') page: number = 1,
    @Res() res: Response,
  ) {
    const tokens = await this.clientService.findClients({ take, page });
    return res.status(HttpStatus.OK).json(tokens);
  }

  @Get(':id')
  @ApiOperation({ summary: '클라이언트 정보 조회 API' })
  @ApiUnauthorizedResponse({ description: '401. UnauthorizedException.' })
  @ApiForbiddenResponse({ description: '403. ForbiddenException.' })
  @ApiOkResponse({
    type: [Client],
    description: '200. Success. Returns a client info',
  })
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string, @Res() res: Response) {
    const responseDto = await this.clientService.findById(id);
    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }

  @Put('webhookUrl/:webhookUrl')
  @ApiOperation({
    summary: '클라이언트 콜백 주소 정보 수정 API',
    description: '입금 정보 지불 정보 수정 합니다.',
  })
  @ApiOkResponse({
    description: '입금 정보 지불 정보 수정 합니다.',
    type: Client,
  })
  async updateWebhookUrl(
    @Param('id') id: string,
    @Query('webhookUrl') webhookUrl: string,
    @Res() res: Response,
  ) {
    this.logger.log('updateWebhookUrl ');
    const client = await this.clientService.updateWebhookUrl(id, webhookUrl);
    return res.status(HttpStatus.OK).json(instanceToPlain(client));
  }

  @Delete(':id')
  @ApiOperation({ summary: '클라이언트 삭제 API' })
  @ApiNoContentResponse({ description: 'Id가 일치 하는 클라이언트 정보를 삭제 한다.' })
  async delete(@Param('id') id: string, @Res() res: Response) {
    const cat = await this.clientService.deleteClient(id);
    return res.status(HttpStatus.OK).json(cat);
  }
}
