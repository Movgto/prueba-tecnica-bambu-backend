import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    readonly title: string;

    @IsString()
    @MinLength(1)
    readonly description: string;

    @IsNumber()
    @Min(0)
    readonly price: string;

    @IsString()
    @MinLength(1)
    readonly category: string;

    @IsString()
    @MinLength(1)
    readonly brand: string;
}