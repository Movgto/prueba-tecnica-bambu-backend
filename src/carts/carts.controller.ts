import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CartsService } from "./carts.service";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { Prisma, User } from "generated/prisma";
import { CreateCartDto } from "./dto/create-cart.dto";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CartResponseDto } from "./dto/cart-response.dto";

@ApiBearerAuth('JWT-auth')
@Controller('carts')
@UseGuards(AuthGuard())
export class CartsController {

    constructor(
        private _cartsService: CartsService
    ) {}

    @ApiOperation({
        summary: 'Gets the cart of the authenticated User'
    })
    @ApiResponse({
        status: 200,
        description: 'Gets the Cart of the authenticated User',
        type: CartResponseDto
    })
    @Get()
    get(@GetUser() user: Omit<User, 'password'>) {
        return this._cartsService.getCart(user);
    }
    
    @ApiOperation({
        summary: 'Add Products to your Cart',
        description: `Adds products to the authenticated user's cart.
                    \x20If it doesn't exist creates a new one.
                    \nYou can update the quantity of the products. If the quantity
                    \nof a product is set to 0 that gets that product removed from the cart.`        
    })
    @Post()
    create(
        @GetUser() user: Omit<User, 'password'>,
        @Body() cartData: CreateCartDto
    ) {
        return this._cartsService.addToCart(user, cartData);
    }    
}