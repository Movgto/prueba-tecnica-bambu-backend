import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SyncModule } from './sync/sync.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from './config/env.config';
import { environmentSchema } from './config/env.schema';
import { AuthModule } from './auth/auth.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      validationSchema: environmentSchema
    }),
    ProductsModule,
    CartsModule,
    SyncModule,
    // MongooseModule.forRoot(process.env.DATABASE_URL!,
    //   {
    //     dbName: process.env.DATABASE_NAME
    //   }
    // ),
    ScheduleModule.forRoot(),
    AuthModule,  
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
