import { Test, TestingModule } from '@nestjs/testing';
import { TransactionbyidService } from './transactionbyid.service';
import { TransactionrepositoryService } from '../../../domain/respository/transactionrepository/transactionrepository.service';
import { createTransaction, responseCreateTransaction } from 'src/application/dtos';
import { HttpStatus } from '@nestjs/common';
import { DeliveryrepositoryService } from '../../../domain/respository/deliveryrepository/deliveryrepository.service';


describe('TransactionbyidService', () => {
  let service: TransactionbyidService;
  let transactionRepositoryService: TransactionrepositoryService;
  let deliverRepositoryService: DeliveryrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionbyidService,
        {
          provide: TransactionrepositoryService,
          useValue: {
            transactionByIdRepository: jest.fn(),
          },
        },
        {
          provide: DeliveryrepositoryService,
          useValue: {
            createDeliveryrepository: jest.fn(),
            getDeliveryByTransactionRepository: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<TransactionbyidService>(TransactionbyidService);
    transactionRepositoryService = module.get<TransactionrepositoryService>(TransactionrepositoryService);
    deliverRepositoryService = module.get<DeliveryrepositoryService>(DeliveryrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('transactionById', () => {
    it('should return transaction details if found', async () => {
      const id = 1;
      const mockResponse: createTransaction = {
        idProduct: 1,
        idCustomer: 1,
        dataTransaction: {
          id: 1,
          amount: 100,
          state: 'approved',
          description: '',
          external_id: '',
          quantityProduct: 2,
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
          }
        },
        dataDelivery: {
          id: 10,
          department: "stringNumber",
          city: "stringNumber",
          complement: "stringNumber",
          nameDelivery: "stringNumber",
          lastnameDelivery: "stringNumber",
          documentType: "stringNumber",
          document: "stringNumber",
          phone: "stringNumber",
          email: "stringNumber",
          address: "stringNumber",
          createAt: new Date(),
          updatedAt: new Date(),
          transaction: {
            id: 1,
            amount: 100,
            state: 'approved',
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
          }
        }
      };

      const expectedResponse: responseCreateTransaction = {
        status: HttpStatus.OK,
        message: 'Transaction found',
        data: { dataTransaction: mockResponse.dataTransaction, dataDelivery: mockResponse.dataDelivery },
      };

      jest.spyOn(transactionRepositoryService, 'transactionByIdRepository').mockResolvedValue(mockResponse.dataTransaction);
      jest.spyOn(deliverRepositoryService, 'getDeliveryByTransactionRepository').mockResolvedValue(mockResponse.dataDelivery);

      const result = await service.transactionById(id.toString());

      expect(result).toEqual(expectedResponse);
      expect(transactionRepositoryService.transactionByIdRepository).toHaveBeenCalledWith(id.toString());
      expect(deliverRepositoryService.getDeliveryByTransactionRepository).toHaveBeenCalledWith(id);
    });

    it('should return BAD_REQUEST if transaction is not found', async () => {
      const id = '1';
      const expectedResponse: responseCreateTransaction = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Transaction not found',
      };

      jest.spyOn(transactionRepositoryService, 'transactionByIdRepository').mockResolvedValue(null);

      const result = await service.transactionById(id);

      expect(result).toEqual(expectedResponse);
      expect(transactionRepositoryService.transactionByIdRepository).toHaveBeenCalledWith(id);
    });

    it('should handle errors', async () => {
      const id = '1';
      const errorMessage = 'Error fetching transaction';
      const expectedResponse: responseCreateTransaction = {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      };

      jest.spyOn(transactionRepositoryService, 'transactionByIdRepository').mockRejectedValue(new Error(errorMessage));

      const result = await service.transactionById(id);

      expect(result).toEqual(expectedResponse);
      expect(transactionRepositoryService.transactionByIdRepository).toHaveBeenCalledWith(id);
    });
  });
});
