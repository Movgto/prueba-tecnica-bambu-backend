import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, Min, ValidateNested } from "class-validator";

export class CartProductDto {

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    readonly productId: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    readonly quantity: number;
}

export class CreateCartDto {
    @ApiProperty({
        type: [CartProductDto]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartProductDto)
    readonly products: CartProductDto[]
}