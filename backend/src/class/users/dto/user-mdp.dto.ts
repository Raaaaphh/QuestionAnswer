import { IsNotEmpty, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    idUser: string;
}