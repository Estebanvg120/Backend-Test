import { Test, TestingModule } from '@nestjs/testing';
import { ApirepositoryService } from './apirepository.service';

describe('ApirepositoryService', () => {
  let service: ApirepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApirepositoryService],
    }).compile();

    service = module.get<ApirepositoryService>(ApirepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
