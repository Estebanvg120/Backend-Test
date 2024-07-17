import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './infrastructure/adapters/controllers/products/products.controller';
import { ProductsService } from './application/use-case/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './infrastructure/adapters/controllers/customer/customer.controller';
import { TransactionsController } from './infrastructure/adapters/controllers/transactions/transactions.controller';
import { CreatetransactionService, ProductbyidService } from './application/use-case';
import { TransactionbyidService } from './application/use-case/transactionbyid/transactionbyid.service';
import { ConfigModule } from '@nestjs/config';
import { Product } from './domain/model/product.entity';
import { Customer } from './domain/model/customer.entity';
import { Delivery } from './domain/model/delivery.entity';
import { Transaction } from './domain/model/transaction.entity';
import { ProductsrepositoryService } from './domain/respository/productsrepository/productsrepository.service';
import { CreatedeliveryService } from './application/use-case/createdelivery/createdelivery.service';
import { TransactionrepositoryService } from './domain/respository/transactionrepository/transactionrepository.service';
import { DeliveryrepositoryService } from './domain/respository/deliveryrepository/deliveryrepository.service';
import { CustomerbyidService } from './application/use-case/customerbyid/customerbyid.service';
import { CustomerrepositoryService } from './domain/respository/customerrepository/customerrepository.service';
import { UpdatedstockService } from './application/use-case/updatedstock/updatedstock.service';
import { UpdatedtransactionService } from './application/use-case/updatedtransaction/updatedtransaction.service';
import { ApirepositoryService } from './domain/external/apirepository/apirepository.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DATABASE,
      entities: ['/src/domain/model/*.entity{.ts,.js}'],
      migrations: ["migrations/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Product, Customer, Delivery, Transaction]),
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [AppController, ProductsController, CustomerController, TransactionsController],
  providers: [AppService, ProductsService, CreatetransactionService, ProductbyidService, TransactionbyidService, ProductsrepositoryService, CreatedeliveryService, CreatetransactionService, TransactionrepositoryService, DeliveryrepositoryService, CustomerbyidService, CustomerrepositoryService, UpdatedstockService, UpdatedtransactionService, ApirepositoryService],
  exports: [TypeOrmModule]
})
export class AppModule { }
