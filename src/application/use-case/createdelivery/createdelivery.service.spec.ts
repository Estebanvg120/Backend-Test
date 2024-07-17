import { Test, TestingModule } from '@nestjs/testing';
import { CreatedeliveryService } from './createdelivery.service';

describe('CreatedeliveryService', () => {
  let service: CreatedeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatedeliveryService],
    }).compile();

    service = module.get<CreatedeliveryService>(CreatedeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
