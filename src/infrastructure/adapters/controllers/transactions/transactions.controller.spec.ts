import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService, ProductbyidService } from '../../../../application/use-case';
import { allProductsResponse, paginationDto, productsResponse } from '../../../../application/dtos/products.dto';
import { HttpStatus } from '@nestjs/common';
import { ProductsController } from '../products/products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;
  let productByIdService: ProductbyidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            allProducts: jest.fn(),
          },
        },
        {
          provide: ProductbyidService,
          useValue: {
            getProductById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
    productByIdService = module.get<ProductbyidService>(ProductbyidService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const pagination: paginationDto = { take: 10, page: 1 };
      const mockResponse: allProductsResponse = {
        status: HttpStatus.OK,
        message: 'Products found',
        data: [],
      };

      jest.spyOn(productsService, 'allProducts').mockResolvedValue(mockResponse);

      const result = await controller.getAllProducts(pagination);

      expect(result).toEqual(mockResponse);
      expect(productsService.allProducts).toHaveBeenCalledWith(pagination);
    });

    it('should handle errors', async () => {
      const pagination: paginationDto = { take: 10, page: 1 };
      const errorMessage = 'Error fetching products';

      jest.spyOn(productsService, 'allProducts').mockRejectedValue(new Error(errorMessage));

      try {
        await controller.getAllProducts(pagination);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('getProduct', () => {
    it('should return a product by id', async () => {
      const id = 1;
      const mockResponse: productsResponse = {
        status: HttpStatus.OK,
        message: 'Product found',
        data: {
          id: 1, name: 'Product 1', stock: 100,
          description: '',
          price: 0
        },
      };

      jest.spyOn(productByIdService, 'getProductById').mockResolvedValue(mockResponse);

      const result = await controller.getProduct(id);

      expect(result).toEqual(mockResponse);
      expect(productByIdService.getProductById).toHaveBeenCalledWith(id);
    });

    it('should handle errors', async () => {
      const id = 1;
      const errorMessage = 'Error fetching product';

      jest.spyOn(productByIdService, 'getProductById').mockRejectedValue(new Error(errorMessage));

      try {
        await controller.getProduct(id);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
