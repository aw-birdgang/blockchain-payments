import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {instanceToPlain} from "class-transformer";
import {ClientContainerService} from "./client-container.service";
import {ClientContainerRequestCreateDto} from "../../dto/client-container-request-create.dto";
import {ClientContainer} from "../../entities";

@Controller('clientContainer')
@ApiTags('Client Container API')
export class ClientContainerController {
    constructor(
        private readonly clientContainerService: ClientContainerService,
    ) {}

    @Post()
    @ApiOperation({ summary: '클라이언트 를 생성 API', description: '클라이언트 를 생성 한다.' })
    @ApiCreatedResponse({ description: '클라이언트 를 생성 한다.', type: ClientContainer })
    async createClientContainer(
        @Body() clientContainerRequestCreateDto: ClientContainerRequestCreateDto,
        @Res() res: Response,
    ) {
        const response = await this.clientContainerService.create(clientContainerRequestCreateDto);
        return res.status(HttpStatus.OK).json(instanceToPlain(response));
    }


    @Get()
    @ApiOperation({ summary: '모든 클라이언트 을 조회 API' })
    @ApiOkResponse({ description: '모든 클라이언트 을 조회 한다.', type: ClientContainer })
    async findAll(@Res() res: Response) {
        let clients = await this.clientContainerService.findAll();
        return res.status(HttpStatus.OK).json(clients);
    }


    @Get(':client_code')
    @ApiOperation({summary: '클라이언트 정보 조회 API'})
    @ApiUnauthorizedResponse({description: '401. UnauthorizedException.'})
    @ApiForbiddenResponse({description: '403. ForbiddenException.'})
    @ApiOkResponse({
        type: [ClientContainer],
        description: '200. Success. Returns a client info',
    })
    @HttpCode(HttpStatus.OK)
    async findByClientCode(
        @Param('client_code', ) client_code: string,
        @Res() res: Response,
    ) {
        const responseDto = await this.clientContainerService.findByClientCode(client_code);
        return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
    }


    @Delete(':client_code')
    @ApiOperation({ summary: '클라이언트 삭제 API' })
    @ApiNoContentResponse({ description: 'Id가 일치 하는 클라이언트 정보를 삭제 한다.' })
    async delete(
        @Param('client_code') client_code: string,
        @Res() res: Response,
    ) {
        const cat = await this.clientContainerService.deleteClientContainer(client_code);
        return res.status(HttpStatus.OK).json(cat);
    }

}
