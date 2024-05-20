import { IsNotEmpty, IsString } from "class-validator";

export class UserEditNameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;

}