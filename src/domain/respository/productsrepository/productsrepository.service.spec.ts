import { Test, TestingModule } from '@nestjs/testing';
import { ProductsrepositoryService } from './productsrepository.service';

describe('ProductsrepositoryService', () => {
  let service: ProductsrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsrepositoryService],
    }).compile();

    service = module.get<ProductsrepositoryService>(ProductsrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
