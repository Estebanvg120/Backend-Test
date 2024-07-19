import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UpdatedtransactionService } from './updatedtransaction.service';
import { TransactionrepositoryService } from '../../../domain/respository/transactionrepository/transactionrepository.service';
import { ProductsrepositoryService } from '../../../domain/respository/productsrepository/productsrepository.service';
import { ApirepositoryService } from '../../../domain/external/apirepository/apirepository.service';
import { CreatedeliveryService } from '../createdelivery/createdelivery.service';
import { transaction, updatedTransaction } from 'src/application/dtos';
import { Transaction } from 'src/domain/model/transaction.entity';
import { Strings } from '../../../resources/strings/Strings';

describe('UpdatedtransactionService', () => {
  let service: UpdatedtransactionService;
  let transactionRepositoryService: TransactionrepositoryService;
  let productsRepositoryService: ProductsrepositoryService;
  let apiRepositoryService: ApirepositoryService;
  let createDeliveryUseCase: CreatedeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatedtransactionService,
        {
          provide: TransactionrepositoryService,
          useValue: {
            transactionByIdRepository: jest.fn(),
            createTransactionRepository: jest.fn(),
          },
        },
        {
          provide: ProductsrepositoryService,
          useValue: {
            updatedStockProductRepository: jest.fn(),
          },
        },
        {
          provide: ApirepositoryService,
          useValue: {
            getTransactionByIdApi: jest.fn(),
          },
        },
        {
          provide: CreatedeliveryService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UpdatedtransactionService>(UpdatedtransactionService);
    transactionRepositoryService = module.get<TransactionrepositoryService>(TransactionrepositoryService);
    productsRepositoryService = module.get<ProductsrepositoryService>(ProductsrepositoryService);
    apiRepositoryService = module.get<ApirepositoryService>(ApirepositoryService);
    createDeliveryUseCase = module.get<CreatedeliveryService>(CreatedeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updatedTransaction', () => {
    it('should update transaction and return the correct response when transaction is approved', async () => {
      const updatedTransactionData: updatedTransaction = {
        data: {
          transaction: {
            id: '1',
            amount_in_cents: 0,
            reference: '',
            customer_email: '',
            currency: '',
            payment_method_type: '',
            redirect_url: '',
            status: '',
            shipping_address: '',
            payment_link_id: '',
            payment_source_id: ''
          },
        },
        event: '',
        environment: '',
        signature: {
          properties: [],
          checksum: ''
        },
        timestamp: 0,
        sent_at: ''
      };

      const mockTransaction = {
        product: { id: 1, stock: 100 },
        quantityProduct: 2,
        state: '',
      };

      const updatedTransactionResponse = {
        product: { id: 1, stock: 98 },
        quantityProduct: 2,
        state: Strings.approved,
      };

      jest.spyOn(apiRepositoryService, 'getTransactionByIdApi').mockResolvedValue(Strings.approved);
      jest.spyOn(transactionRepositoryService, 'transactionByIdRepository').mockResolvedValue(mockTransaction as transaction);
      jest.spyOn(productsRepositoryService, 'updatedStockProductRepository').mockResolvedValue(undefined);
      jest.spyOn(transactionRepositoryService, 'createTransactionRepository').mockResolvedValue(updatedTransactionResponse as unknown as transaction & Transaction);

      const result = await service.updatedTransaction(updatedTransactionData);

      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Transaction updated',
        data: { dataTransaction: updatedTransactionResponse },
      });

      expect(apiRepositoryService.getTransactionByIdApi).toHaveBeenCalledWith(updatedTransactionData.data.transaction.id);
      expect(transactionRepositoryService.transactionByIdRepository).toHaveBeenCalledWith(updatedTransactionData.data.transaction.id);
      expect(productsRepositoryService.updatedStockProductRepository).toHaveBeenCalledWith(mockTransaction.product.id, mockTransaction.product.stock - mockTransaction.quantityProduct);
      expect(transactionRepositoryService.createTransactionRepository).toHaveBeenCalledWith(mockTransaction);
    });

    it('should return transaction not found response when no transaction is found', async () => {
      const updatedTransactionData: updatedTransaction = {
        data: {
          transaction: {
            id: '999',
            amount_in_cents: 0,
            reference: '',
            customer_email: '',
            currency: '',
            payment_method_type: '',
            redirect_url: '',
            status: '',
            shipping_address: '',
            payment_link_id: '',
            payment_source_id: ''
          },
        },
        event: '',
        environment: '',
        signature: {
          properties: [],
          checksum: ''
        },
        timestamp: 0,
        sent_at: ''
      };

      jest.spyOn(apiRepositoryService, 'getTransactionByIdApi').mockResolvedValue(Strings.decline);
      jest.spyOn(transactionRepositoryService, 'transactionByIdRepository').mockResolvedValue({} as Transaction);
      jest.spyOn(transactionRepositoryService, 'createTransactionRepository').mockResolvedValue(null);

      const result = await service.updatedTransaction(updatedTransactionData);

      expect(result).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Transaction could not be updated',
      });
    });

    it('should return bad request response on error', async () => {
      const updatedTransactionData: updatedTransaction = {
        data: {
          transaction: {
            id: '1',
            amount_in_cents: 0,
            reference: '',
            customer_email: '',
            currency: '',
            payment_method_type: '',
            redirect_url: '',
            status: '',
            shipping_address: '',
            payment_link_id: '',
            payment_source_id: ''
          },
        },
        event: '',
        environment: '',
        signature: {
          properties: [],
          checksum: ''
        },
        timestamp: 0,
        sent_at: ''
      };

      const errorMessage = 'Some error';

      jest.spyOn(apiRepositoryService, 'getTransactionByIdApi').mockRejectedValue(new Error(errorMessage));

      const result = await service.updatedTransaction(updatedTransactionData);

      expect(result).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      });
    });
  });
});
