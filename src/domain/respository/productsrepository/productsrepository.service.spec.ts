import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../../../domain/model/delivery.entity';
import { delivery } from 'src/application/dtos/delivery.dto';
import { DeliveryrepositoryService } from '../deliveryrepository/deliveryrepository.service';

describe('DeliveryrepositoryService', () => {
  let service: DeliveryrepositoryService;
  let repository: Repository<Delivery>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryrepositoryService,
        {
          provide: getRepositoryToken(Delivery),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DeliveryrepositoryService>(DeliveryrepositoryService);
    repository = module.get<Repository<Delivery>>(getRepositoryToken(Delivery));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createDeliveryRepository', () => {
    it('should save a delivery and return it', async () => {
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

      const savedDelivery = {
        ...dataDelivery
      };

      jest.spyOn(repository, 'save').mockResolvedValue(savedDelivery as Delivery);

      const result = await service.createDeliveryRepository(dataDelivery);
      expect(result).toEqual(savedDelivery);
      expect(repository.save).toHaveBeenCalledWith(dataDelivery);
    });
  });
});