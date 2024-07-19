import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsrepositoryService } from '../../../domain/respository/productsrepository/productsrepository.service';
import { paginationDto, allProductsResponse, product } from 'src/application/dtos';

describe('ProductsService', () => {
  let service: ProductsService;
  let repositoryService: ProductsrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsrepositoryService,
          useValue: {
            allProductsRepository: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repositoryService = module.get<ProductsrepositoryService>(ProductsrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('allProducts', () => {
    it('should return products found response', async () => {
      const pagination: paginationDto = { take: 10, page: 1 };
      const products: product[] = [
        {
          id: 0,
          name: '',
          description: '',
          price: 0,
          stock: 0
        },
        {
          id: 0,
          name: '',
          description: '',
          price: 0,
          stock: 0
        },
      ];

      const expectedResponse: allProductsResponse = {
        status: HttpStatus.OK,
        message: 'Products found',
        data: products,
      };

      jest.spyOn(repositoryService, 'allProductsRepository').mockResolvedValue(products);

      const result = await service.allProducts(pagination);
      expect(result).toEqual(expectedResponse);
      expect(repositoryService.allProductsRepository).toHaveBeenCalledWith(pagination);
    });

    it('should return products not found response when no products are found', async () => {
      const pagination: paginationDto = { take: 10, page: 1 };

      const expectedResponse: allProductsResponse = {
        status: HttpStatus.NOT_FOUND,
        message: 'Products not found',
      };

      jest.spyOn(repositoryService, 'allProductsRepository').mockResolvedValue([]);

      const result = await service.allProducts(pagination);
      expect(result).toEqual(expectedResponse);
      expect(repositoryService.allProductsRepository).toHaveBeenCalledWith(pagination);
    });

    it('should return bad request response on error', async () => {
      const pagination: paginationDto = { take: 10, page: 1 };
      const errorMessage = 'Some error';

      const expectedResponse: allProductsResponse = {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      };

      jest.spyOn(repositoryService, 'allProductsRepository').mockRejectedValue(new Error(errorMessage));

      const result = await service.allProducts(pagination);
      expect(result).toEqual(expectedResponse);
      expect(repositoryService.allProductsRepository).toHaveBeenCalledWith(pagination);
    });
  });
});
