import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryrepositoryService } from './deliveryrepository.service';

describe('DeliveryrepositoryService', () => {
  let service: DeliveryrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryrepositoryService],
    }).compile();

    service = module.get<DeliveryrepositoryService>(DeliveryrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
