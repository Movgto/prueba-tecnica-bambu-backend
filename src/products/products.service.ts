import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException, Logger, NotFoundException, Scope } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';
import { QueryParamsDto } from './dto/query-params.dto';

@Injectable()
export class ProductsService {

    private _logger = new ConsoleLogger(ProductsService.name);

    constructor(
        // @InjectModel(Product.name)
        // private readonly _productModel: Model<Product>,
        private readonly _prisma: PrismaService,
        private readonly _httpService: HttpService
    ) { }

    async findAll(queryParams?: QueryParamsDto) {
        // return this._productModel.find();
        const brand = queryParams?.brand?.replace(/_/g, ' ').trim();

        const allProducts = await this._prisma.product.findMany({
            where: {
                brand,
                category: queryParams?.category
            }
        });

        this._logger.log('GET /products');

        return allProducts;
    }

    async findById(id: number) {
        const product = await this._prisma.product.findUnique({
            where: {
                id
            }
        })

        if (!product) {
            this._logger.error(`Could't find a product with Id ${id}`);
            throw new NotFoundException(`Product with id ${id} was not found.`)
        }

        return product;
    }           

    async syncProducts() {

        try {

            // Transforms the observable http request to a promise and waits for the response
            const { data: { products: productsRaw } } = await lastValueFrom(this._httpService.get('https://dummyjson.com/products?limit=0'));            

            // Creates a new array of products taking only the necessary data
            const products: Prisma.ProductCreateInput[] = productsRaw.map(p => ({
                title: p.title,
                description: p.description,
                price: p.price,
                brand: p.brand,
                category: p.category
            }))

            // Updates the existing products if it matches with the name, if there is no match creates a new product
            // and adds it to the database.
            const promises = products.map(p => 
                this._prisma.product.upsert({
                    where: { title: p.title },
                    update: p,
                    create: p
                })
            )       

            await Promise.all(promises);

            this._logger.log('The database has been syncronized!');
        } catch (error) {
            this._logger.error(`An error ocurred while trying to synchronize the DB. ${error}`);

            throw new InternalServerErrorException('Something went wrong with this request, please check the logs for more info.');
        }

        return 'The DB has been synchronized successfully!';
    }
}
