import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCreateTransaction } from 'src/application/dtos';
import { DeliveryrepositoryService } from 'src/domain/respository/deliveryrepository/deliveryrepository.service';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';

@Injectable()
export class TransactionbyidService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _getDeliveryByTransactionRepositoryService: DeliveryrepositoryService
  ) { }
  async transactionById(id: string): Promise<responseCreateTransaction> {
    try {
      const response = await this._transactionRepositoryService.transactionByIdRepository(id);
      if (!response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Transaction not found'
        }
      }
      const responseDelivery = await this._getDeliveryByTransactionRepositoryService.getDeliveryByTransactionRepository(response.id)
      if (!responseDelivery) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Delivery not found'
        }
      }

      return {
        status: HttpStatus.OK,
        message: 'Transaction found',
        data: { dataTransaction: response, dataDelivery: responseDelivery }
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }
  }
}
