import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";
import { PrismaService } from "src/common/prisma/prisma.service";

@Module({
    controllers: [CartsController],
    providers: [CartsService, PrismaService],
    imports: [AuthModule]
})
export class CartsModule {}