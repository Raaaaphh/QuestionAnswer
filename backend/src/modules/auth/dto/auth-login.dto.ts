import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}