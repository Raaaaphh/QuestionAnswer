import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class TagCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsUUID()
    @IsNotEmpty()
    idUser: string;
}