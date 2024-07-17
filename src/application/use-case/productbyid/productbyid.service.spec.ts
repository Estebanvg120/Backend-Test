import { Test, TestingModule } from '@nestjs/testing';
import { ProductbyidService } from './productbyid.service';

describe('ProductbyidService', () => {
  let service: ProductbyidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductbyidService],
    }).compile();

    service = module.get<ProductbyidService>(ProductbyidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
