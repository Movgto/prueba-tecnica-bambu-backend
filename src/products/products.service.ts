import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Scope } from '@nestjs/common';
import { v4 } from 'uuid'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name)
        private readonly _productModel: Model<Product>,
        private readonly _httpService: HttpService
    ) { }

    findAll() {
        return this._productModel.find();
    }

    findById(id: string) {
        return 'This action should retrieve a product from the DB with the provided Id, NOT YET IMPLEMENTED';
    }

    async create(product: CreateProductDto) {
        try {
            const newProduct = await this._productModel.create(product);

            return newProduct

        } catch (error) {
            console.error(error);

            if (error.code === 11000) {
                throw new BadRequestException(`There's already a product with a property that is not allowed to be repeated: ${JSON.stringify(error.keyValue)}`)
            }

            throw new InternalServerErrorException('Something went wrong when creating a new product, check logs.');
        }
    }

    update(id: string, product: UpdateProductDto) {

        return product;
    }

    deleteById(id: string) {
        return 'This action deletes a product from the DB, NOT YET IMPLEMENTED';
    }


    async syncProducts() {

        try {

            // Transforms the observable http request to a promise and waits for the response
            const { data: { products: productsRaw } } = await lastValueFrom(this._httpService.get('https://dummyjson.com/products?limit=0'));            

            // Creates a new array of products taking only the necessary data
            const products: CreateProductDto[] = productsRaw.map(p => ({
                title: p.title,
                description: p.description,
                price: p.price,
                brand: p.brand,
                category: p.category
            }))

            // Updates the existing products if it matches with the name, if there is no match creates a new product
            // and adds it to the database.
            products.forEach(async p => {
                await this._productModel.updateOne(
                    {
                        title: p.title
                    },
                    p,
                    {
                        upsert: true
                    }
                )
            })

            console.log('The database has been synchronized successfully');

        } catch (error) {
            console.error(error);

            throw new InternalServerErrorException('Something went wrong with this request, please check the logs for more info.');
        }

        return 'The DB has been synchronized successfully!';
    }
}
