import { customer } from "./customer.dto";
import { delivery } from "./delivery.dto";
import { product } from "./products.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";



export class transaction {
  @ApiPropertyOptional()
  id?: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiProperty()
  external_id: string;

  @ApiProperty()
  customer: customer;

  @ApiProperty()
  product: product;

  @ApiProperty()
  quantityProduct: number;

  @ApiPropertyOptional()
  installments?: number;

  @ApiPropertyOptional()
  token?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

}

export class responseCreateTransaction {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: {
    dataTransaction?: transaction;
    dataCustomer?: customer;
    dataDelivery?: delivery;
    idExternal?: string;
  }
}

export class responseCreateTransactionUseCase {
  @ApiProperty()
  dataTransaction: transaction;

  @ApiProperty()
  dataCustomer: customer;
}

export class createTransaction {
  @ApiProperty()
  idCustomer: number;

  @ApiProperty()
  dataTransaction: transaction;

  @ApiProperty()
  idProduct: number;

  @ApiProperty()
  dataDelivery: delivery;
}

export class payment_method {
  @ApiProperty()
  type: string;

  @ApiProperty()
  installments: number;

  @ApiProperty()
  token: string;
}

export class createTransactionApi {
  @ApiProperty()
  amount_in_cents: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  customer_email: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  payment_method: payment_method;

  @ApiProperty()
  acceptance_token: string;

  @ApiProperty()
  payment_method_type: string;
}

export class dataTransactionApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount_in_cents: number;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  customer_email: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  payment_method_type: string;

  @ApiProperty()
  redirect_url: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  shipping_address: string | null;

  @ApiProperty()
  payment_link_id: string | null;

  @ApiProperty()
  payment_source_id: string | null;

}
export class transactionApi {
  @ApiProperty()
  transaction: dataTransactionApi
}

export class signature {
  @ApiProperty()
  properties: string[];

  @ApiProperty()
  checksum: string;
}

export class updatedTransaction {
  @ApiProperty()
  event: string;

  @ApiProperty()
  data: transactionApi

  @ApiProperty()
  environment: string;

  @ApiProperty()
  signature: signature;

  @ApiProperty()
  timestamp: number;

  @ApiProperty()
  sent_at: string;
}
