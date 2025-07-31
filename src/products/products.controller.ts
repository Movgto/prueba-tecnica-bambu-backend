import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryParamsDto } from './dto/query-params.dto';
import { ApiOperation, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';

@Controller('products')
export class ProductsController {

    constructor(
        private readonly _productsService: ProductsService
    ) {

    }

    @ApiOperation({
        summary: 'Gets the list of products',
        description: `Gets the full list of products or optionally filters the results
                    by brand or category`
    })
    @ApiResponse({
        status: 200,
        description: 'List of products.',
        type: [ProductResponseDto]
    })  
    @Get()
    getAllProducts(        
        @Query() queryParamsDto: QueryParamsDto
    ) {
        return this._productsService.findAll(queryParamsDto);
    }

    @ApiOperation({
        summary: 'Gets a Product by Id'
    })
    @ApiResponse({
        status: 200,
        description: 'Gets a Product by Id.',
        type: ProductResponseDto
    })
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this._productsService.findById(id);
    }
}
