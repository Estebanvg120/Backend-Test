import { HttpStatus, Injectable } from '@nestjs/common';
import { transaction } from 'src/application/dtos';
import { delivery, deliveryResponse } from 'src/application/dtos/delivery.dto';
import { DeliveryrepositoryService } from 'src/domain/respository/deliveryrepository/deliveryrepository.service';

@Injectable()
export class CreatedeliveryService {
  constructor(
    private readonly _deliveryRepositoryService: DeliveryrepositoryService,
  ) { }

  async createDelivery(dataDelivery: delivery, dataTransaction: transaction): Promise<deliveryResponse> {
    try {
      const finalData = {
        ...dataDelivery,
        transaction: dataTransaction
      }
      const response = await this._deliveryRepositoryService.createDeliveryRepository(finalData);
      if (!response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Transaction could not be created'
        };
      }
      return {
        status: HttpStatus.OK,
        message: 'Transaction could not be created',
        data: response
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }

    }
  }
}
