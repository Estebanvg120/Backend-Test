import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCreateTransaction, transaction } from 'src/application/dtos';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';
import { UpdatedstockService } from '../updatedstock/updatedstock.service';
import { ProductsrepositoryService } from 'src/domain/respository/productsrepository/productsrepository.service';

@Injectable()
export class UpdatedtransactionService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _productsRepositoryService: ProductsrepositoryService
  ) { }

  async updatedTransaction(idTransaction: number, quantityProduct: number): Promise<responseCreateTransaction> {
    try {
      const dataTransaction = await this._transactionRepositoryService.transactionByIdRepository(idTransaction);
      const externalstatus = "success";
      const newStock: number = dataTransaction.product.stock - dataTransaction.quantityProduct;
      await this._productsRepositoryService.updatedStockProductRepository(dataTransaction.product.id, newStock);
      dataTransaction.state = externalstatus === 'success' ? "SUCCESS" : "REFUSED";
      dataTransaction.external_id = 'w-aa1222';
      dataTransaction.quantityProduct = quantityProduct;
      const response = await this._transactionRepositoryService.createTransactionRepository(dataTransaction);
      if (!response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Transaction could not be updated'
        }
      }
      return {
        status: HttpStatus.OK,
        message: 'Transaction updated',
        data: { dataTransaction: response }
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }

  }
}
