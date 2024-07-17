export class customer {
  id?: number;
  name: string;
  lastname: string;
  documentType?: string;
  documentNumber: string;
  phone?: string;
  email?: string;
}

export class responseCustomer {
  status: number;
  message: string;
  data?: customer;
}