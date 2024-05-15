import { IsNotEmpty, IsString } from "class-validator";

export class TagCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;
}