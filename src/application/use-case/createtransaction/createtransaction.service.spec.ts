import { Test, TestingModule } from '@nestjs/testing';
import { CreatetransactionService } from './createtransaction.service';

describe('CreatetransactionService', () => {
  let service: CreatetransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatetransactionService],
    }).compile();

    service = module.get<CreatetransactionService>(CreatetransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
