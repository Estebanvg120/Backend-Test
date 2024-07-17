import { Test, TestingModule } from '@nestjs/testing';
import { UpdatedtransactionService } from './updatedtransaction.service';

describe('UpdatedtransactionService', () => {
  let service: UpdatedtransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatedtransactionService],
    }).compile();

    service = module.get<UpdatedtransactionService>(UpdatedtransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
