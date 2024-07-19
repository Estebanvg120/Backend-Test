import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { allProductsResponse, paginationDto, productsResponse } from '../../../../application/dtos/products.dto';
import { ProductbyidService, ProductsService } from '../../../../application/use-case';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(
    private readonly _productsUseCase: ProductsService,
    private readonly _productByIdUseCase: ProductbyidService,

  ) { }
  @Get('/allProducts')
  async getAllProducts(
    @Query() pagination: paginationDto,
  ): Promise<allProductsResponse> {
    return await this._productsUseCase.allProducts(pagination);

  }

  @Get('/product/:id')
  async getProduct(@Param('id') id: number): Promise<productsResponse> {
    return await this._productByIdUseCase.getProductById(id);
  }

}
