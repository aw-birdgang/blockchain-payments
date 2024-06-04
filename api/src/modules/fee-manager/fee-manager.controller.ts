import { Body, Controller, Post } from '@nestjs/common';
import { FeeManagerService } from './fee-manager.service';

@Controller('fee-manager')
export class FeeManagerController {
  constructor(private readonly feeManagerService: FeeManagerService) {}

  @Post('execute')
  async executeTransaction(@Body() body: any) {
    const { from, to, value, data, signature } = body;
    return await this.feeManagerService.executeTransaction(from, to, value, data, signature);
  }
}
