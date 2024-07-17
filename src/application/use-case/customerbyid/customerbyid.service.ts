import { HttpStatus, Injectable } from '@nestjs/common';
import { responseCustomer } from 'src/application/dtos/customer.dto';
import { CustomerrepositoryService } from 'src/domain/respository/customerrepository/customerrepository.service';

@Injectable()
export class CustomerbyidService {
  constructor(
    private readonly _customerbyidRepositoryService: CustomerrepositoryService,
  ) { }
  async customerById(id: number): Promise<responseCustomer> {
    try {
      const response = await this._customerbyidRepositoryService.customerByIdRepository(id);
      if (!response) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Customer not found'
        }
      }
      return {
        status: HttpStatus.OK,
        message: 'Customer found',
        data: response
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }
    }
  }
}
