import { Test, TestingModule } from '@nestjs/testing';
import { DepositWalletService } from './deposit-wallet.service';

describe('ClientWalletService', () => {
  let service: DepositWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepositWalletService],
    }).compile();

    service = module.get<DepositWalletService>(DepositWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
