import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {    

    constructor(
        private readonly _productsService: ProductsService
    ) {

    }

    @Get()
    getAllProducts() {
        return this._productsService.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseUUIDPipe) id: string) {
        return this._productsService.findById(id);
    }    
}
