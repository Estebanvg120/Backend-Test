import { HttpStatus, Injectable } from '@nestjs/common';
import { allProductsResponse, paginationDto, productsResponse } from 'src/application/dtos';
import { ProductsrepositoryService } from 'src/domain/respository/productsrepository/productsrepository.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly _productsrepositoryService: ProductsrepositoryService,
  ) { }
  async allProducts(pagination: paginationDto): Promise<allProductsResponse> {
    try {
      const response = await this._productsrepositoryService.allProductsRepository(pagination);
      if (response.length === 0) {
        return { status: HttpStatus.NOT_FOUND, message: 'Products not found' }
      }
      return { status: HttpStatus.OK, message: 'Products found', data: response }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      }

    }
  }
}
