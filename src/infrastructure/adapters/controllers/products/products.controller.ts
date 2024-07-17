import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { paginationDto, productsResponse } from 'src/application/dtos/products.dto';
import { ProductbyidService, ProductsService } from 'src/application/use-case';
import { UpdatedstockService } from 'src/application/use-case/updatedstock/updatedstock.service';


@Controller('products')
export class ProductsController {
  constructor(
    private readonly _productsUseCase: ProductsService,
    private readonly _productByIdUseCase: ProductbyidService,
    private readonly _updatedStockUseCase: UpdatedstockService

  ) { }
  @Get('/allProducts')
  async getAllProducts(
    @Query() pagination: paginationDto,
  ): Promise<productsResponse> {
    return await this._productsUseCase.allProducts(pagination);

  }

  @Get('/product/:id')
  async getProduct(@Param('id') id: number): Promise<productsResponse> {
    return await this._productByIdUseCase.getProductById(id);
  }

}
