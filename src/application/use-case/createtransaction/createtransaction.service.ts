import { HttpStatus, Injectable } from '@nestjs/common';
import { createTransaction, responseCreateTransaction, transaction } from 'src/application/dtos';
import { TransactionrepositoryService } from 'src/domain/respository/transactionrepository/transactionrepository.service';
import { CustomerbyidService } from '../customerbyid/customerbyid.service';
import { CustomerrepositoryService } from 'src/domain/respository/customerrepository/customerrepository.service';
import { DeliveryrepositoryService } from 'src/domain/respository/deliveryrepository/deliveryrepository.service';
import { delivery } from 'src/application/dtos/delivery.dto';
import { ApirepositoryService } from 'src/domain/external/apirepository/apirepository.service';
import { Strings } from 'src/domain/external/apirepository/routes/Strings';
import { encrypt } from 'src/application/resources/Functions';
import { ProductbyidService } from '../productbyid/productbyid.service';
import { CreatedeliveryService } from '../createdelivery/createdelivery.service';

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
      const integrity = `${process.env.PREFIJO}${dataTransactionResponse.id}${dataTransaction.dataTransaction.amount}${Strings.currency}${process.env.INTEGRITY}`
      const hash = await encrypt(integrity);
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
        signature: hash
      }
      const externalIdTransaction = await this._apiServices.createTransaction(dataTransactionApi);
      if (externalIdTransaction) {
        dataTransactionResponse.external_id = externalIdTransaction;
      } else {
        dataTransactionResponse.state = Strings.error
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
