import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { customer } from 'src/application/dtos/customer.dto';
import { Customer } from '../../../domain/model/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerrepositoryService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) { }
  async customerByIdRepository(id: number): Promise<customer> {
    return await this.customerRepository.findOne({ where: { id } })
  }
}
