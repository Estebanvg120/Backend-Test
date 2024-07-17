import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCreateTransaction, transaction, updatedTransaction } from 'src/application/dtos';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';
import { UpdatedstockService } from '../updatedstock/updatedstock.service';
import { ProductsrepositoryService } from 'src/domain/respository/productsrepository/productsrepository.service';
import { ApirepositoryService } from 'src/domain/external/apirepository/apirepository.service';
import { Strings } from 'src/domain/external/apirepository/routes/Strings';
import { CreatedeliveryService } from '../createdelivery/createdelivery.service';

@Injectable()
export class UpdatedtransactionService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _productsRepositoryService: ProductsrepositoryService,
    private readonly _apiRepositoryService: ApirepositoryService,
    private readonly _createDeliveryUseCase: CreatedeliveryService
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
