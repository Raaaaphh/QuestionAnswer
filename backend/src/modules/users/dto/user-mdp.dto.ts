import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserEditMdpDto {
    @IsString()
    @IsNotEmpty()
    oldpassword: string;

    @IsString()
    @IsNotEmpty()
    newpassword: string;

    @IsString()
    @IsNotEmpty()
    confirmpassword: string;

    @IsUUID()
    @IsNotEmpty()
    idUser: string;
}