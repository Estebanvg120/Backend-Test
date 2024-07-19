import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCreateTransaction, updatedTransaction } from 'src/application/dtos';
import { TransactionrepositoryService } from '../../../domain/respository/transactionrepository/transactionrepository.service';
import { ProductsrepositoryService } from '../../../domain/respository/productsrepository/productsrepository.service';
import { ApirepositoryService } from '../../../domain/external/apirepository/apirepository.service';
import { Strings } from '../../../resources/strings/Strings';



@Injectable()
export class UpdatedtransactionService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _productsRepositoryService: ProductsrepositoryService,
    private readonly _apiRepositoryService: ApirepositoryService,
  ) { }

  async updatedTransaction(data: updatedTransaction): Promise<responseCreateTransaction> {
    try {
      const dataExternalTransaction = await this._apiRepositoryService.getTransactionByIdApi(data.data.transaction.id);
      const dataTransaction = await this._transactionRepositoryService.transactionByIdRepository(data.data.transaction.id);
      if (dataExternalTransaction !== Strings.pending) {
        if (dataExternalTransaction === Strings.approved) {
          const newStock: number = dataTransaction.product.stock - dataTransaction.quantityProduct;
          await this._productsRepositoryService.updatedStockProductRepository(dataTransaction.product.id, newStock);
          dataTransaction.state = Strings.approved;
        } else if (dataExternalTransaction === Strings.decline || dataExternalTransaction === Strings.error) {
          dataTransaction.state = Strings.decline;
        }
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
      }
      return;
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }

  }
}
