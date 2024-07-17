import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCreateTransaction } from 'src/application/dtos';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';

@Injectable()
export class TransactionbyidService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
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
      return {
        status: HttpStatus.OK,
        message: 'Transaction found',
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
