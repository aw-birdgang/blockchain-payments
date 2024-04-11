import {Controller, Logger} from '@nestjs/common';
import {WalletService} from './wallet.service';

import {ApiTags} from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  private readonly logger = new Logger(WalletController.name);

}
