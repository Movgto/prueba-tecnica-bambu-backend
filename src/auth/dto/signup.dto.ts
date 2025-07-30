import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsString, MinLength } from "class-validator";

export class SignupDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly name: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly lastname: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly password: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    readonly passwordConfirmation: string

    @ApiProperty({
        example: 'YYYY-MM-DD'
    })
    @IsDateString()
    readonly dateOfBirth: string
}