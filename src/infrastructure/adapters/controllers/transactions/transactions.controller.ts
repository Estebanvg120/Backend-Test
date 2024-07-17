import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { createTransaction, responseCreateTransaction, transaction, updatedTransaction } from 'src/application/dtos';
import { CreatetransactionService } from 'src/application/use-case';
import { CreatedeliveryService } from 'src/application/use-case/createdelivery/createdelivery.service';
import { CustomerbyidService } from 'src/application/use-case/customerbyid/customerbyid.service';
import { TransactionbyidService } from 'src/application/use-case/transactionbyid/transactionbyid.service';
import { UpdatedtransactionService } from 'src/application/use-case/updatedtransaction/updatedtransaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly _createTransactionUseCase: CreatetransactionService,
    private readonly _transactionbyidUseCase: TransactionbyidService,
    private readonly _createDeliveryUseCase: CreatedeliveryService,
    private readonly _customerByIdUseCase: CustomerbyidService,
    private readonly _updatedTransactionUseCase: UpdatedtransactionService

  ) { }
  @Post('/transaction')
  async createTransaction(@Body() dataTransaction: createTransaction): Promise<responseCreateTransaction> {
    return await this._createTransactionUseCase.createTransaction(dataTransaction);
  }

  @Get('/transaction/:id')
  async getTransactionById(@Param('id') id: string) {
    const dataResponse = await this._transactionbyidUseCase.transactionById(id);
    return {
      status: 200,
      message: 'success',
      data: dataResponse.data.dataTransaction,
    }
  }

  @Put('/updatedtransaction/:id')
  async updateTransaction(@Body() data: updatedTransaction): Promise<responseCreateTransaction> {
    return await this._updatedTransactionUseCase.updatedTransaction(data);

  }
}
