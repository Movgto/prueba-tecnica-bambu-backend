import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class QueryParamsDto {

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    readonly brand?: string;

    @ApiProperty({
        required: false
    })
    @IsString()
    @IsOptional()
    readonly category?: string;
}