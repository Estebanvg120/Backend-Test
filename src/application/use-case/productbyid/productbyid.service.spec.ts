import { Test, TestingModule } from '@nestjs/testing';
import { CustomerrepositoryService } from '../../../domain/respository/customerrepository/customerrepository.service';
import { customer, responseCustomer } from 'src/application/dtos/customer.dto';
import { HttpStatus } from '@nestjs/common';
import { CustomerbyidService } from '../customerbyid/customerbyid.service';

describe('CustomerbyidService', () => {
  let service: CustomerbyidService;
  let customerRepositoryService: CustomerrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerbyidService,
        {
          provide: CustomerrepositoryService,
          useValue: {
            customerByIdRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerbyidService>(CustomerbyidService);
    customerRepositoryService = module.get<CustomerrepositoryService>(CustomerrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('customerById', () => {
    it('should return customer details if found', async () => {
      const id = 1;
      const mockResponse: customer = {
        id, name: 'John Doe', email: 'john@example.com',
        lastname: '',
        documentNumber: ''
      };
      const expectedResponse: responseCustomer = {
        status: HttpStatus.OK,
        message: 'Customer found',
        data: mockResponse,
      };

      jest.spyOn(customerRepositoryService, 'customerByIdRepository').mockResolvedValue(mockResponse);

      const result = await service.customerById(id);

      expect(result).toEqual(expectedResponse);
      expect(customerRepositoryService.customerByIdRepository).toHaveBeenCalledWith(id);
    });

    it('should return NOT_FOUND if customer is not found', async () => {
      const id = 1;
      const expectedResponse: responseCustomer = {
        status: HttpStatus.NOT_FOUND,
        message: 'Customer not found',
      };

      jest.spyOn(customerRepositoryService, 'customerByIdRepository').mockResolvedValue(null);

      const result = await service.customerById(id);

      expect(result).toEqual(expectedResponse);
      expect(customerRepositoryService.customerByIdRepository).toHaveBeenCalledWith(id);
    });

    it('should handle errors', async () => {
      const id = 1;
      const errorMessage = 'Error fetching customer';
      const expectedResponse: responseCustomer = {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      };

      jest.spyOn(customerRepositoryService, 'customerByIdRepository').mockRejectedValue(new Error(errorMessage));

      const result = await service.customerById(id);

      expect(result).toEqual(expectedResponse);
      expect(customerRepositoryService.customerByIdRepository).toHaveBeenCalledWith(id);
    });
  });
});
