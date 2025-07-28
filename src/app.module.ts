import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncModule } from './sync/sync.module';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ProductsModule,
    SyncModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
