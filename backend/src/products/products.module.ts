import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ImportProductsService } from './import-products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductsService, ImportProductsService],
  controllers: [ProductsController],
})
export class ProductsModule { }
