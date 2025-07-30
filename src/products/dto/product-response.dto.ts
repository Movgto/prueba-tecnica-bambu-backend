import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly brand: string;

    @ApiProperty()
    readonly category: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;
}