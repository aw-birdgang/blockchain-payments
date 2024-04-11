import {Controller, Get, HttpCode, HttpStatus, Req} from '@nestjs/common';
import {ClientService} from "./client.service";
import {
    ApiForbiddenResponse,
    ApiHeader,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {Client} from "../../entities/client.entity";

@ApiTags('client/me')
@Controller('client/me')
export class ClientController {
    constructor(
        private readonly clientService: ClientService,
    ) {}

    @ApiOperation({ summary: '내정보 보기' })
    @ApiUnauthorizedResponse({ description: '401. UnauthorizedException.' })
    @ApiForbiddenResponse({ description: '403. ForbiddenException.' })
    @ApiOkResponse({
        type: [Client],
        description: '200. Success. Returns a client info',
    })
    @HttpCode(HttpStatus.OK)
    @Get('info')
    findById(@Req() request: Request): Promise<Client> {
        const { sub: userId } = request['user'];
        return this.clientService.findById(userId);
    }

}
