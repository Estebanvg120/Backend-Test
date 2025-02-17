import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createTransaction, responseCreateTransaction, updatedTransaction } from 'src/application/dtos';
import { CreatetransactionService } from 'src/application/use-case';
import { TransactionbyidService } from 'src/application/use-case/transactionbyid/transactionbyid.service';
import { UpdatedtransactionService } from 'src/application/use-case/updatedtransaction/updatedtransaction.service';

@ApiTags("Transactions")
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly _createTransactionUseCase: CreatetransactionService,
    private readonly _transactionbyidUseCase: TransactionbyidService,
    private readonly _updatedTransactionUseCase: UpdatedtransactionService

  ) { }
  @Post('/transaction')
  async createTransaction(@Body() dataTransaction: createTransaction): Promise<responseCreateTransaction> {
    return await this._createTransactionUseCase.createTransaction(dataTransaction);
  }

  @Get('/transaction/:id')
  async getTransactionById(@Param('id') id: string) {
    return await this._transactionbyidUseCase.transactionById(id);
  }

  @Post('/updatedtransaction')
  async updateTransaction(@Body() data: updatedTransaction): Promise<responseCreateTransaction> {
    return await this._updatedTransactionUseCase.updatedTransaction(data);

  }
}
