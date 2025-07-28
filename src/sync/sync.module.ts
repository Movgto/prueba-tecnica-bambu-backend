import { Module } from "@nestjs/common";
import { ProductsModule } from "src/products/products.module";
import { SyncService } from "./sync.service";
import { SyncController } from "./sync.controller";

@Module({
    controllers: [
        SyncController
    ],
    providers: [
        SyncService
    ],
    imports: [
        ProductsModule
    ]
})
export class SyncModule {}