import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Routes } from './routes/Routes';
import { createTransactionApi } from 'src/application/dtos';
import { Strings } from './routes/Strings';

@Injectable()
export class ApirepositoryService {
  constructor(
    private readonly httpService: HttpService,
  ) { }
  async getAcceptanceToken() {
    const response = await firstValueFrom(
      this.httpService.get(process.env.URL_CONSUMO_BASE + Routes.acceptance_token + process.env.PUBLIC_KEY, {}),
    )
    return response.data.data.presigned_acceptance.acceptance_token;
  }

  async createTransaction(data: createTransactionApi): Promise<string> {
    const headers = {
      Authorization: `Bearer ${process.env.PUBLIC_KEY}`,
    }
    const response = await firstValueFrom(
      this.httpService.post(process.env.URL_CONSUMO_BASE + Routes.create_transaction, data, { headers }),
    );
    return response.data.data.id;
  }

  async getTransactionByIdApi(id: string): Promise<String> {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.URL_CONSUMO_BASE}${Routes.get_transaction}${id}`, {}),
    )
    return response.data.data.status;
  }
}
