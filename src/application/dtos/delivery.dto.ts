import { transaction } from "./transaction.dto";

export class delivery {
  id?: number;
  department: string;
  city: string;
  complement: string;
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  address: string;
  transaction: transaction
  createAt?: Date;
  updatedAt?: Date;
}

export class deliveryResponse {
  status: number;
  message: string;
  data?: delivery
}