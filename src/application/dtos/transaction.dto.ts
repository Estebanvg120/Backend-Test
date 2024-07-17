import { Delivery } from "src/domain/model/delivery.entity";
import { customer } from "./customer.dto";
import { delivery } from "./delivery.dto";
import { product } from "./products.dto";



export class transaction {
  id?: number;
  amount: number;
  description: string;
  state?: string;
  external_id: string;
  customer: customer;
  product: product;
  quantityProduct: number;
  installments?: number;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class responseCreateTransaction {
  status: number;
  message: string;
  data?: {
    dataTransaction?: transaction;
    dataCustomer?: customer;
    dataDelivery?: delivery;
    idExternal?: string;
  }
}

export class responseCreateTransactionUseCase {
  dataTransaction: transaction;
  dataCustomer: customer;
}

export class createTransaction {
  idCustomer: number;
  dataTransaction: transaction;
  dataProduct: product
}

export class createTransactionApi {
  amount_in_cents: number;
  currency: string;
  customer_email: string;
  reference: string;
  payment_method: {
    type: string;
    installments: number,
    token: string,
  }
  acceptance_token: string;
  payment_method_type: string;
}