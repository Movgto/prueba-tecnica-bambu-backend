import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

export class LoginDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly email: string

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly password: string
}