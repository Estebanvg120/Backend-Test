import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { delivery } from 'src/application/dtos/delivery.dto';
import { Delivery } from '../../../domain/model/delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryrepositoryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) { }
  async createDeliveryRepository(dataDelivery: delivery): Promise<delivery> {
    const response = await this.deliveryRepository.save(dataDelivery);
    return response;
  }

  async getDeliveryByTransactionRepository(idTransaction: number): Promise<delivery> {
    const response = await this.deliveryRepository.findOne({ where: { transaction: { id: idTransaction } } });
    return response;
  }
}
