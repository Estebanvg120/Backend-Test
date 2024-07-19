import { HttpStatus, Injectable } from '@nestjs/common';
import { createTransaction, responseCreateTransaction, transaction } from 'src/application/dtos';
import { TransactionrepositoryService } from '../../../domain/respository/transactionrepository/transactionrepository.service';
import { CustomerbyidService } from '../customerbyid/customerbyid.service';
import { delivery } from 'src/application/dtos/delivery.dto';
import { ApirepositoryService } from '../../../domain/external/apirepository/apirepository.service';
import { encrypt } from '../../../resources/functions/Functions';
import { ProductbyidService } from '../productbyid/productbyid.service';
import { CreatedeliveryService } from '../createdelivery/createdelivery.service';
import { Strings } from '../../../resources/strings/Strings';

@Injectable()
export class CreatetransactionService {
  constructor(
    private readonly _transactionRepositoryService: TransactionrepositoryService,
    private readonly _customerByIdUseCase: CustomerbyidService,
    private readonly _apiServices: ApirepositoryService,
    private readonly _productByIdUseCase: ProductbyidService,
    private readonly _createDeliveryUseCase: CreatedeliveryService
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
      const dataProduct = await this._productByIdUseCase.getProductById(dataTransaction.idProduct);
      if (!dataProduct.data) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Product not found',
        }
      }
      const dataTrx: transaction = {
        ...dataTransaction.dataTransaction,
        product: dataProduct.data,
        customer: dataCustomerResponse.data
      }
      const dataTransactionResponse = await this._transactionRepositoryService.createTransactionRepository(dataTrx);
      if (!dataTransactionResponse) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'The transaction could not be created',
        }
      }

      const finalDataDelivery: delivery = {
        ...dataTransaction.dataDelivery,
        transaction: dataTransactionResponse
      }
      const deliveryRepsonse = await this._createDeliveryUseCase.createDelivery(finalDataDelivery);
      if (!deliveryRepsonse.data) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Delivery could not be created',
        }
      }
      const referenceTrx = `${process.env.PREFIJO}${Date.now()}`;
      const integrity = `${referenceTrx}${dataTransaction.dataTransaction.amount}${Strings.currency}${process.env.INTEGRITY}`
      const hash = await encrypt(integrity);
      const dataTransactionApi = {
        amount_in_cents: dataTransaction.dataTransaction.amount,
        currency: Strings.currency,
        customer_email: dataTransactionResponse.customer.email,
        reference: referenceTrx,
        payment_method: {
          type: Strings.payment_method_type,
          installments: dataTransaction.dataTransaction.installments,
          token: dataTransaction.dataTransaction.token,
        },
        acceptance_token: token,
        payment_method_type: Strings.payment_method_type,
        signature: hash
      }
      const externalIdTransaction = await this._apiServices.createTransaction(dataTransactionApi);
      if (externalIdTransaction !== "AxiosError") {
        dataTransactionResponse.external_id = externalIdTransaction;
      } else {
        dataTransactionResponse.state = Strings.error
        await this._transactionRepositoryService.createTransactionRepository(dataTransactionResponse);
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Transaction with error',
        }
      }
      await this._transactionRepositoryService.createTransactionRepository(dataTransactionResponse);

      return {
        status: HttpStatus.OK,
        message: 'Transaction created',
        data: {
          dataTransaction: dataTransactionResponse,
          idExternal: externalIdTransaction,
          dataDelivery: deliveryRepsonse.data
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
