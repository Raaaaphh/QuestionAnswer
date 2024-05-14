import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}