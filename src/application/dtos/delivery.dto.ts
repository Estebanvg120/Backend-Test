import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { transaction } from "./transaction.dto";

export class delivery {
  @ApiPropertyOptional()
  id?: number;

  @ApiProperty()
  department: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  nameDelivery: string;

  @ApiProperty()
  lastnameDelivery: string;

  @ApiProperty()
  documentType: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ type: () => transaction })
  transaction: transaction

  @ApiPropertyOptional()
  createAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}

export class deliveryResponse {

  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional()
  data?: delivery
}