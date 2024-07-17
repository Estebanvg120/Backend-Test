import { Test, TestingModule } from '@nestjs/testing';
import { TransactionrepositoryService } from './transactionrepository.service';

describe('TransactionrepositoryService', () => {
  let service: TransactionrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionrepositoryService],
    }).compile();

    service = module.get<TransactionrepositoryService>(TransactionrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
