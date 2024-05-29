import { IsNotEmpty, Matches, validate } from 'class-validator';

export class AuthRegisterDto {

    @Matches(/^.+@utp\.edu\.my$/, { message: 'L\'adresse e-mail doit se terminer par @utp.edu.my' })
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}
