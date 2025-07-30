import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CartProductDto, CreateCartDto } from "./dto/create-cart.dto";
import { User } from "generated/prisma";

@Injectable()
export class CartsService {
    private readonly logger = new ConsoleLogger('CartsService');

    constructor(
        private readonly _prisma: PrismaService
    ) { }

    async getCart(user: Omit<User, 'password'>) {

        const cart = await this._prisma.cart.findFirst({
            where: {
                userId: user.id
            },
            include: {
                cartProducts: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!cart) {
            this.logger.error(`Request from user ${JSON.stringify(user)} - tried to get their cart but it hasn't been created.`)
            throw new NotFoundException('This user does not have a cart yet.')
        }

        this.logRequestEvent(user, `cart retrieved successfully ${JSON.stringify(cart)}`)        

        return cart;
    }

    async addToCart(user: Omit<User, 'password'>, cartData: CreateCartDto) {
        let cart = await this._prisma.cart.findFirst({
            where: { userId: user.id }
        })

        // If a cart doesn't exist creates a new one for this user
        if (!cart) {
            cart = await this._prisma.cart.create({
                data: {
                    userId: user.id
                }
            })
        }        

        const validProducts: CartProductDto[] = []

        for (const product of cartData.products) {
            const valid = await this._prisma.product.findUnique({
                where: { id: product.productId }
            })

            if (valid) validProducts.push(product)
        }

        if (!validProducts.length)
            throw new BadRequestException('The products are not valid.');        

        try {
            const promises = validProducts.map(async product => {
                
                const cartProductExists = await this._prisma.cartProduct.findUnique({
                    where: {
                        cartId_productId: {
                            cartId: cart.id,
                            productId: product.productId
                        }
                    },
                    include: {
                        product: true
                    }
                })

                // If the product quantity is 0 deletes the CartProduct if it exists.
                if (product.quantity === 0) {
                    if (!cartProductExists) return null;

                    this.logRequestEvent(user, `product removed from cart. Quantity changed to 0. Product: ${JSON.stringify(cartProductExists)}`);

                    return this._prisma.cartProduct.delete({
                        where: {
                            cartId_productId: {
                                cartId: cart.id,
                                productId: product.productId
                            }
                        }
                    })
                }

                // Checks if the CartProduct already exists with the productId and only
                // updates the quantity. If it doesn't, creates a new CartProduct registry.
                const cartProduct = this._prisma.cartProduct.upsert({
                    where: {
                        cartId_productId: { cartId: cart.id, productId: product.productId }
                    },
                    update: product,
                    create: {
                        ...product,
                        cartId: cart.id
                    }
                })
                
                return cartProduct
            });

            await Promise.all(promises);

            this.logRequestEvent(user, `products added to cart ${JSON.stringify(validProducts)}`)
            
            return 'The products were added to your cart!'
        } catch (error) {
            console.log(error);
            this.logger.error(`Request from user ${JSON.stringify(user)} - ${JSON.stringify(error)}`);
            throw new InternalServerErrorException('Something went wrong, please check server logs.')
        }
    }

    private logRequestEvent(user: Omit<User, 'password'>, msg: string) {
        this.logger.log(`Request from user ${JSON.stringify(user)} - ${msg}`);
    }
}