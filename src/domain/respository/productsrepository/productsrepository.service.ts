import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginationDto, product } from 'src/application/dtos';
import { Product } from '../../../domain/model/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsrepositoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) { }
  async allProductsRepository({ take, page }: paginationDto): Promise<product[]> {
    const skip = (page - 1) * take;
    return await this.productsRepository.find({ skip, take, order: { id: 'ASC' } });
  }

  async productByIdRepository(id: number): Promise<product> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async updatedStockProductRepository(id: number, stock: number) {
    return await this.productsRepository.update(id, { stock });
  }
}
