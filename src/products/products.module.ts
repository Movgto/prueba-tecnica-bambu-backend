import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: Product.name,
    //     schema: productSchema
    //   }
    // ]),
    HttpModule
  ]
})
export class ProductsModule {}
