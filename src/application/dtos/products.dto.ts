export class product {

  id: number;

  name: string;

  description: string;

  price: number;

  stock: number;

  quiantityProduct?: number;
}

export class productsResponse {
  status: number;

  message: string;

  data?: product;
}

export class allProductsResponse {
  status: number;

  message: string;

  data?: product[];
}

export class paginationDto {
  take: number;
  page: number;
}