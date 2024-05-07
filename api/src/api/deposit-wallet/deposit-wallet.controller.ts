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
    Res
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Response} from "express";
import {instanceToPlain} from "class-transformer";
import {DepositWalletService} from "./deposit-wallet.service";
import {ClientWalletRequestCreateDto} from "./dto/client-wallet-request-create.dto";
import {DepositWallet} from "./entities/deposit-wallet.entity";


@Controller('v1/client-wallet')
@ApiTags('CLIENT WALLET API')
export class DepositWalletController {
    constructor(
        private readonly clientWalletService: DepositWalletService,
    ) {}

    private readonly logger = new Logger(DepositWalletController.name);

    @Post()
    @ApiOperation({ summary: '클라이언트 지갑 생성 API', description: '클라이언트 지갑을 생성 한다.' })
    @ApiCreatedResponse({ description: '클라이언트 를 생성 한다.', type: DepositWallet })
    async create(
        @Body() clientRequestCreateDto: ClientWalletRequestCreateDto,
        @Res() res: Response,
    ) {
        const response = await this.clientWalletService.createDepositWallet(clientRequestCreateDto);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


    @Get()
    @ApiOperation({ summary: '모든 클라이언트 조회 API' })
    @ApiOkResponse({
        description: '모든 클라이언트 를 조회 한다.',
        type: DepositWallet,
        isArray: true,
    })
    @ApiQuery({ name: 'take', required: false, type: Number, example: 10, description: 'Number of wallets to return at one time',})
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number of the wallets to retrieve',})
    async findClients(
        @Request() req,
        @Query('take') take: number = 10,
        @Query('page') page: number = 1,
        @Res() res: Response
    ) {
        const tokens = await this.clientWalletService.findClients({take, page});
        return res.status(HttpStatus.OK).json(tokens);
    }

    @Get(':id')
    @ApiOperation({summary: '클라이언트 정보 조회 API'})
    @ApiUnauthorizedResponse({description: '401. UnauthorizedException.'})
    @ApiForbiddenResponse({description: '403. ForbiddenException.'})
    @ApiOkResponse({
        type: [DepositWallet],
        description: '200. Success. Returns a client info',
    })
    @HttpCode(HttpStatus.OK)
    async findById(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const responseDto = await this.clientWalletService.findById(id);
        return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
    }


    @Delete(':id')
    @ApiOperation({ summary: '클라이언트 삭제 API' })
    @ApiNoContentResponse({ description: 'Id가 일치 하는 클라이언트 정보를 삭제 한다.' })
    async delete(
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        const cat = await this.clientWalletService.deleteClientWallet(id);
        return res.status(HttpStatus.OK).json(cat);
    }

}

