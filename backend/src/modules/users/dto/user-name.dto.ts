import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserEditNameDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    idUser: string;

}