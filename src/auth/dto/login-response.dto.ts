import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {

    @ApiProperty()
    token: string;

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}