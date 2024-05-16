import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteAddDto {
    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsString()
    @IsNotEmpty()
    idQuest: string;
}