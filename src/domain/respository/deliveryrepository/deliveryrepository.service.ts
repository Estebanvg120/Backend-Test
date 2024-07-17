import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { delivery } from 'src/application/dtos/delivery.dto';
import { Delivery } from 'src/domain/model/delivery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryrepositoryService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
  ) { }
  async createDeliveryRepository(dataDelivery: delivery): Promise<delivery> {
    return await this.deliveryRepository.save(dataDelivery);
  }
}
