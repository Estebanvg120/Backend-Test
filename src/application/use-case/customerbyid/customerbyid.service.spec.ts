import { Test, TestingModule } from '@nestjs/testing';
import { CustomerbyidService } from './customerbyid.service';

describe('CustomerbyidService', () => {
  let service: CustomerbyidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerbyidService],
    }).compile();

    service = module.get<CustomerbyidService>(CustomerbyidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
