import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { CreatedeliveryService } from './createdelivery.service';
import { DeliveryrepositoryService } from '../../../domain/respository/deliveryrepository/deliveryrepository.service';
import { delivery, deliveryResponse } from 'src/application/dtos/delivery.dto';

describe('CreatedeliveryService', () => {
  let service: CreatedeliveryService;
  let deliveryRepositoryService: DeliveryrepositoryService;

  const dataDelivery: delivery = {
    department: '',
    city: '',
    complement: '',
    nameDelivery: '',
    lastnameDelivery: '',
    documentType: '',
    document: '',
    phone: '',
    email: '',
    address: '',
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatedeliveryService,
        {
          provide: DeliveryrepositoryService,
          useValue: {
            createDeliveryRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreatedeliveryService>(CreatedeliveryService);
    deliveryRepositoryService = module.get<DeliveryrepositoryService>(DeliveryrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDelivery', () => {
    it('should return BAD_REQUEST if createDeliveryRepository returns null', async () => {
      jest.spyOn(deliveryRepositoryService, 'createDeliveryRepository').mockResolvedValue(null);

      const result: deliveryResponse = await service.createDelivery(dataDelivery);
      expect(result).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: 'Transaction could not be created'
      });
    });

    it('should return OK and the delivery data if createDeliveryRepository is successful', async () => {
      const savedDelivery = {
        ...dataDelivery,
        // add any properties that are added by the repository (e.g., id)
      };

      jest.spyOn(deliveryRepositoryService, 'createDeliveryRepository').mockResolvedValue(savedDelivery);

      const result: deliveryResponse = await service.createDelivery(dataDelivery);
      expect(result).toEqual({
        status: HttpStatus.OK,
        message: 'Transaction could not be created',
        data: savedDelivery
      });
    });

    it('should return BAD_REQUEST if an exception is thrown', async () => {
      const errorMessage = 'Some error';
      jest.spyOn(deliveryRepositoryService, 'createDeliveryRepository').mockRejectedValue(new Error(errorMessage));

      const result: deliveryResponse = await service.createDelivery(dataDelivery);
      expect(result).toEqual({
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage
      });
    });
  });
});
