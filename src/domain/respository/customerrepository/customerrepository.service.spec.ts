import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerrepositoryService } from './customerrepository.service';
import { Customer } from '../../model/customer.entity';
import { customer } from 'src/application/dtos/customer.dto';

describe('CustomerrepositoryService', () => {
  let service: CustomerrepositoryService;
  let repository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerrepositoryService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CustomerrepositoryService>(CustomerrepositoryService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('customerByIdRepository', () => {
    it('should return a customer by id', async () => {
      const id = 1;
      const foundCustomer: customer = {
        name: '',
        lastname: '',
        documentNumber: ''
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(foundCustomer as Customer);

      const result = await service.customerByIdRepository(id);
      expect(result).toEqual(foundCustomer);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if customer is not found', async () => {
      const id = 999;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.customerByIdRepository(id);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});