import { HttpStatus, Injectable } from '@nestjs/common';
import { productsResponse } from 'src/application/dtos/products.dto';
import { ProductsrepositoryService } from 'src/domain/respository/productsrepository/productsrepository.service';

@Injectable()
export class ProductbyidService {
  constructor(
    private readonly _productsRepositoryService: ProductsrepositoryService,
  ) { }
  async getProductById(id: number): Promise<productsResponse> {
    try {
      const response = await this._productsRepositoryService.productByIdRepository(id);
      if (!response) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found'
        }
      }
      return {
        status: HttpStatus.OK,
        message: 'Product found',
        data: response
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }

  }
}

