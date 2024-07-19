import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { CreatetransactionService } from './createtransaction.service';
import { TransactionrepositoryService } from '../../../domain/respository/transactionrepository/transactionrepository.service';
import { CustomerbyidService } from '../customerbyid/customerbyid.service';
import { ApirepositoryService } from '../../../domain/external/apirepository/apirepository.service';
import { ProductbyidService } from '../productbyid/productbyid.service';
import { CreatedeliveryService } from '../createdelivery/createdelivery.service';
import { createTransaction, productsResponse, transaction } from 'src/application/dtos';
import { responseCustomer } from 'src/application/dtos/customer.dto';
import { deliveryResponse } from 'src/application/dtos/delivery.dto';
import { Transaction } from 'src/domain/model/transaction.entity';
import * as encryptModule from '../../../resources/functions/Functions';

describe('CreatetransactionService', () => {
  let service: CreatetransactionService;
  let transactionRepositoryService: TransactionrepositoryService;
  let customerByIdUseCase: CustomerbyidService;
  let apiServices: ApirepositoryService;
  let productByIdUseCase: ProductbyidService;
  let createDeliveryUseCase: CreatedeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatetransactionService,
        {
          provide: TransactionrepositoryService,
          useValue: {
            createTransactionRepository: jest.fn(),
          },
        },
        {
          provide: CustomerbyidService,
          useValue: {
            customerById: jest.fn(),
          },
        },
        {
          provide: ApirepositoryService,
          useValue: {
            getAcceptanceToken: jest.fn(),
            createTransaction: jest.fn(),
            getTransactionByIdApi: jest.fn(),
          },
        },
        {
          provide: ProductbyidService,
          useValue: {
            getProductById: jest.fn(),
          },
        },
        {
          provide: CreatedeliveryService,
          useValue: {
            createDelivery: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreatetransactionService>(CreatetransactionService);
    transactionRepositoryService = module.get<TransactionrepositoryService>(TransactionrepositoryService);
    customerByIdUseCase = module.get<CustomerbyidService>(CustomerbyidService);
    apiServices = module.get<ApirepositoryService>(ApirepositoryService);
    productByIdUseCase = module.get<ProductbyidService>(ProductbyidService);
    createDeliveryUseCase = module.get<CreatedeliveryService>(CreatedeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should create transaction and return the correct response', async () => {
      const createTransactionData: createTransaction = {
        idCustomer: 1,
        idProduct: 1,
        dataTransaction: {
          amount: 1000,
          token: 'token123',
          installments: 1,
          description: 'buy description',
          external_id: '1234-1234-1234',
          customer: {
            name: 'NameCustomer',
            lastname: 'LastnameCustomer',
            documentNumber: '11223344'
          },
          product: {
            id: 0,
            name: 'NameProduct',
            description: 'Description product',
            price: 0,
            stock: 0
          },
          quantityProduct: 0
        },
        dataDelivery: {
          address: '123 Street',
          city: 'City',
          department: 'Department',
          complement: 'Complement',
          nameDelivery: 'Name Delivery',
          lastnameDelivery: 'Last Name Delivery',
          documentType: 'CC',
          document: '11111111',
          phone: '1234567',
          email: 'email@email.com',
          transaction: {
            amount: 0,
            description: 'Transaction description',
            external_id: '1234-1234-1234',
            customer: {
              name: 'Name Customer',
              lastname: 'Lastname Customer',
              documentNumber: '123444444'
            },
            product: {
              id: 0,
              name: 'Product Name',
              description: 'Description',
              price: 0,
              stock: 0
            },
            quantityProduct: 0
          }
        },
      };

      const mockCustomer = { data: { id: 1, email: 'customer@example.com' } };
      const mockProduct = { data: { id: 1, stock: 100, price: 1000 } };
      const mockTransaction = {
        id: 1,
        customer: mockCustomer.data,
        product: mockProduct.data,
        amount: createTransactionData.dataTransaction.amount,
        token: createTransactionData.dataTransaction.token,
        installments: createTransactionData.dataTransaction.installments,
        state: '',
      };
      const mockReference = `${process.env.PREFIJO}${Date.now()}`;
      const mockToken = 'Token';
      const mockHash = 'Hash';
      const mockDelivery = { data: { id: 1, address: '123 Street', city: 'City', country: 'Country' } };

      jest.spyOn(apiServices, 'getAcceptanceToken').mockResolvedValue('token123');
      jest.spyOn(customerByIdUseCase, 'customerById').mockResolvedValue(mockCustomer as responseCustomer);
      jest.spyOn(productByIdUseCase, 'getProductById').mockResolvedValue(mockProduct as productsResponse);
      jest.spyOn(transactionRepositoryService, 'createTransactionRepository').mockResolvedValue(mockTransaction as unknown as transaction & Transaction);
      jest.spyOn(createDeliveryUseCase, 'createDelivery').mockResolvedValue(mockDelivery as unknown as deliveryResponse);
      jest.spyOn(apiServices, 'createTransaction').mockResolvedValue('externalId123');
      jest.spyOn(encryptModule, 'encrypt').mockResolvedValue('hashedSignature');


      const result = await service.createTransaction(createTransactionData);

      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Transaction created',
        data: {
          dataTransaction: mockTransaction,
          idExternal: 'externalId123',
          dataDelivery: mockDelivery.data,
        },
      });

      expect(apiServices.getAcceptanceToken).toHaveBeenCalled();
      expect(customerByIdUseCase.customerById).toHaveBeenCalledWith(createTransactionData.idCustomer);
      expect(productByIdUseCase.getProductById).toHaveBeenCalledWith(createTransactionData.idProduct);
      expect(transactionRepositoryService.createTransactionRepository).toHaveBeenCalledWith({
        ...createTransactionData.dataTransaction,
        product: mockProduct.data,
        customer: mockCustomer.data,
      });
      expect(createDeliveryUseCase.createDelivery).toHaveBeenCalledWith({
        ...createTransactionData.dataDelivery,
        transaction: mockTransaction,
      });
      expect(apiServices.createTransaction).toHaveBeenCalledWith({
        amount_in_cents: createTransactionData.dataTransaction.amount,
        currency: 'USD',
        customer_email: 'ejemplo@example.com',
        reference: mockReference,
        payment_method: {
          type: 'CARD',
          installments: createTransactionData.dataTransaction.installments,
          token: createTransactionData.dataTransaction.token,
        },
        acceptance_token: mockToken,
        payment_method_type: 'CARD',
        signature: mockHash,
      });
    });

    it('should return customer not found response', async () => {
      const createTransactionData: createTransaction = {
        idCustomer: 1,
        idProduct: 1,
        dataTransaction: {
          amount: 1000,
          token: 'token123',
          installments: 1,
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
        },
        dataDelivery: {
          address: '123 Street',
          city: 'City',
          department: '',
          complement: '',
          nameDelivery: '',
          lastnameDelivery: '',
          documentType: '',
          document: '',
          phone: '',
          email: '',
          transaction: {
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
          }
        },
      };

      jest.spyOn(customerByIdUseCase, 'customerById').mockResolvedValue({ data: null } as responseCustomer);

      const result = await service.createTransaction(createTransactionData);

      expect(result).toEqual({
        status: HttpStatus.NOT_FOUND,
        message: 'Customer not found',
      });
    });

    it('should return product not found response', async () => {
      const createTransactionData: createTransaction = {
        idCustomer: 1,
        idProduct: 1,
        dataTransaction: {
          amount: 1000,
          token: 'token123',
          installments: 1,
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
        },
        dataDelivery: {
          address: '123 Street',
          city: 'City',
          department: '',
          complement: '',
          nameDelivery: '',
          lastnameDelivery: '',
          documentType: '',
          document: '',
          phone: '',
          email: '',
          transaction: {
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
          }
        },
      };

      const mockCustomer = { data: { id: 1, email: 'customer@example.com' } };

      jest.spyOn(customerByIdUseCase, 'customerById').mockResolvedValue(mockCustomer as responseCustomer);
      jest.spyOn(productByIdUseCase, 'getProductById').mockResolvedValue({ data: null } as productsResponse);

      const result = await service.createTransaction(createTransactionData);

      expect(result).toEqual({
        status: HttpStatus.NOT_FOUND,
        message: 'Product not found',
      });
    });

    it('should return bad request response on error', async () => {
      const createTransactionData: createTransaction = {
        idCustomer: 1,
        idProduct: 1,
        dataTransaction: {
          amount: 1000,
          token: 'token123',
          installments: 1,
          description: 'buy description',
          external_id: '1234-1234-1234',
          customer: {
            name: 'NameCustomer',
            lastname: 'LastnameCustomer',
            documentNumber: '11223344'
          },
          product: {
            id: 0,
            name: 'NameProduct',
            description: 'Description product',
            price: 0,
            stock: 0
          },
          quantityProduct: 0
        },
        dataDelivery: {
          address: '123 Street',
          city: 'City',
          department: 'Department',
          complement: 'Complement',
          nameDelivery: 'Name Delivery',
          lastnameDelivery: 'Last Name Delivery',
          documentType: 'CC',
          document: '11111111',
          phone: '1234567',
          email: 'email@email.com',
          transaction: {
            amount: 0,
            description: 'Transaction description',
            external_id: '1234-1234-1234',
            customer: {
              name: 'Name Customer',
              lastname: 'Lastname Customer',
              documentNumber: '123444444'
            },
            product: {
              id: 0,
              name: 'Product Name',
              description: 'Description',
              price: 0,
              stock: 0
            },
            quantityProduct: 0
          }
        },
      };

      const errorMessage = 'Some error';

      jest.spyOn(apiServices, 'getAcceptanceToken').mockRejectedValue(new Error(errorMessage));

      const result = await service.createTransaction(createTransactionData);

      expect(result).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      });
    });
  });
});
