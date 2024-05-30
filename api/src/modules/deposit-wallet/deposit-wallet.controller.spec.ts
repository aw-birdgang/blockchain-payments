import { Test, TestingModule } from '@nestjs/testing';
import { DepositWalletController } from './deposit-wallet.controller';

describe('ClientWalletController', () => {
  let controller: DepositWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositWalletController],
    }).compile();

    controller = module.get<DepositWalletController>(DepositWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
