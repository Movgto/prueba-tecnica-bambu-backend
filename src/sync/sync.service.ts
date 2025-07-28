import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ProductsService } from "src/products/products.service";

@Injectable()
export class SyncService {

    constructor(
        private _productsService: ProductsService
    ) {}

    // Cron decorator to schedule a cron job to syncronize the database with the DummyJSON data
    // every 12 hours
    @Cron(CronExpression.EVERY_12_HOURS)
    syncDB() {
        return this._productsService.syncProducts();
    }
}