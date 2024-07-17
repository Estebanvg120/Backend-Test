import { Test, TestingModule } from '@nestjs/testing';
import { UpdatedstockService } from './updatedstock.service';

describe('UpdatedstockService', () => {
  let service: UpdatedstockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatedstockService],
    }).compile();

    service = module.get<UpdatedstockService>(UpdatedstockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
