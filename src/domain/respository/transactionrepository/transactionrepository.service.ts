import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transaction } from 'src/application/dtos';
import { customer } from 'src/application/dtos/customer.dto';
import { Transaction } from 'src/domain/model/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionrepositoryService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }
  async createTransactionRepository(dataTransaction: transaction) {
    return await this.transactionRepository.save(dataTransaction);
  }

  async transactionByIdRepository(id: string): Promise<transaction> {
    return await this.transactionRepository.findOne({ where: { external_id: id }, relations: ['customer', 'product'] })
  }

}
