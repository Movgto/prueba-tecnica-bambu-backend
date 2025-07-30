import { Module } from "@nestjs/common";
import { ProductsModule } from "src/products/products.module";
import { SyncService } from "./sync.service";
import { SyncController } from "./sync.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    controllers: [
        SyncController
    ],
    providers: [
        SyncService
    ],
    imports: [
        ProductsModule,
        AuthModule
    ]
})
export class SyncModule {}