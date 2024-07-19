import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionrepositoryService } from './transactionrepository.service';
import { Transaction } from '../../model/transaction.entity';
import { transaction } from 'src/application/dtos';

describe('TransactionrepositoryService', () => {
  let service: TransactionrepositoryService;
  let repository: Repository<Transaction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionrepositoryService,
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TransactionrepositoryService>(TransactionrepositoryService);
    repository = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransactionRepository', () => {
    it('should save a transaction and return it', async () => {
      const dataTransaction: transaction = {
        amount: 0,
        description: '',
        external_id: '',
        customer: {
          name: '',
          lastname: '',
          documentNumber: ''
        },
        product: {
          id: 0,
          name: '',
          description: '',
          price: 0,
          stock: 0
        },
        quantityProduct: 0
      };

      const savedTransaction = {
        ...dataTransaction,
        // add any properties that are added by the repository (e.g., id)
      };

      jest.spyOn(repository, 'save').mockResolvedValue(savedTransaction as Transaction);

      const result = await service.createTransactionRepository(dataTransaction);
      expect(result).toEqual(savedTransaction);
      expect(repository.save).toHaveBeenCalledWith(dataTransaction);
    });
  });

  describe('transactionByIdRepository', () => {
    it('should return a transaction by id', async () => {
      const id = 'some-id';
      const foundTransaction: transaction = {
        amount: 0,
        description: '',
        external_id: '',
        customer: {
          name: '',
          lastname: '',
          documentNumber: ''
        },
        product: {
          id: 0,
          name: '',
          description: '',
          price: 0,
          stock: 0
        },
        quantityProduct: 0
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(foundTransaction as Transaction);

      const result = await service.transactionByIdRepository(id);
      expect(result).toEqual(foundTransaction);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { external_id: id }, relations: ['customer', 'product'] });
    });

    it('should return null if transaction is not found', async () => {
      const id = '15113-1721331804-56965';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.transactionByIdRepository(id);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { external_id: id }, relations: ['customer', 'product'] });
    });
  });
});
