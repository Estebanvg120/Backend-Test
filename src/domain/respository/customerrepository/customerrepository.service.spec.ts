import { Test, TestingModule } from '@nestjs/testing';
import { CustomerrepositoryService } from './customerrepository.service';

describe('CustomerrepositoryService', () => {
  let service: CustomerrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerrepositoryService],
    }).compile();

    service = module.get<CustomerrepositoryService>(CustomerrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
