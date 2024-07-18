import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Routes } from './routes/Routes';
import { createTransactionApi } from 'src/application/dtos';

@Injectable()
export class ApirepositoryService {
  constructor(
    private readonly httpService: HttpService,
  ) { }
  async getAcceptanceToken() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(process.env.URL_CONSUMO_BASE + Routes.acceptance_token + process.env.PUBLIC_KEY, {}),
      )
      return response.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTransaction(data: createTransactionApi): Promise<string> {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.PUBLIC_KEY}`,
      }
      const response = await firstValueFrom(
        this.httpService.post(process.env.URL_CONSUMO_BASE + Routes.create_transaction, data, { headers }),
      );
      return response.data.data.id;
    } catch (error) {
      return error.name

    }
  }

  async getTransactionByIdApi(id: string): Promise<String> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${process.env.URL_CONSUMO_BASE}${Routes.get_transaction}${id}`, {}),
      )
      return response.data.data.status;
    } catch (error) {
      throw new Error(error);

    }
  }
}
