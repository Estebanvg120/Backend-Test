import { HttpStatus, Injectable } from '@nestjs/common';
import { createTransaction, responseCreateTransaction, transaction } from 'src/application/dtos';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';
import { CustomerbyidService } from '../customerbyid/customerbyid.service';
import { CustomerrepositoryService } from 'src/domain/respository/customerrepository/customerrepository.service';
import { DeliveryrepositoryService } from 'src/domain/respository/deliveryrepository/deliveryrepository.service';
import { delivery } from 'src/application/dtos/delivery.dto';
import { ApirepositoryService } from 'src/domain/external/apirepository/apirepository.service';
import { Strings } from 'src/domain/external/apirepository/routes/Strings';

@Injectable()
export class CreatetransactionService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _customerByIdUseCase: CustomerbyidService,
    private readonly _apiServices: ApirepositoryService
  ) { }
  async createTransaction(dataTransaction: createTransaction): Promise<responseCreateTransaction> {
    try {
      const token = await this._apiServices.getAcceptanceToken();
      const dataCustomerResponse = await this._customerByIdUseCase.customerById(dataTransaction.idCustomer);
      if (!dataCustomerResponse.data) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Customer not found',
        }
      }
      const dataTrx: transaction = {
        ...dataTransaction.dataTransaction,
        product: dataTransaction.dataProduct,
        customer: dataCustomerResponse.data
      }
      const dataTransactionResponse = await this._transactionRepositoryService.createTransactionRepository(dataTrx);
      if (!dataTransactionResponse) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'The transaction could not be created',
        }
      }
      const integrity = `${process.env.PREFIJO}${dataTransactionResponse.id}${dataTransaction.dataTransaction.amount}${Strings.currency}${process.env.INTEGRITY}`
      const encondedText = new TextEncoder().encode(integrity);
      const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      const dataTransactionApi = {
        amount_in_cents: dataTransaction.dataTransaction.amount,
        currency: Strings.currency,
        customer_email: dataTransactionResponse.customer.email,
        reference: `${process.env.PREFIJO}${dataTransactionResponse.id}`,
        payment_method: {
          type: Strings.payment_method_type,
          installments: dataTransaction.dataTransaction.installments,
          token: dataTransaction.dataTransaction.token,
        },
        acceptance_token: token,
        payment_method_type: Strings.payment_method_type,
        signature: hashHex
      }

      const externalIdTransaction = await this._apiServices.createTransaction(dataTransactionApi)

      return {
        status: HttpStatus.OK,
        message: 'Transaction created',
        data: {
          dataTransaction: dataTransactionResponse,
          dataCustomer: dataCustomerResponse.data,
          idExternal: externalIdTransaction
        }
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }
  }
}
