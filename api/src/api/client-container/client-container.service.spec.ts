import { Test, TestingModule } from '@nestjs/testing';
import { ClientContainerService } from './client-container.service';

describe('ClientContainerService', () => {
  let service: ClientContainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientContainerService],
    }).compile();

    service = module.get<ClientContainerService>(ClientContainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
