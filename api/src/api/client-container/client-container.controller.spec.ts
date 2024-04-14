import { Test, TestingModule } from '@nestjs/testing';
import { ClientContainerController } from './client-container.controller';

describe('ClientContainerController', () => {
  let controller: ClientContainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientContainerController],
    }).compile();

    controller = module.get<ClientContainerController>(ClientContainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
