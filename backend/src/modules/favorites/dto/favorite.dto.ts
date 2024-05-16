import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteDto {
    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsString()
    @IsNotEmpty()
    idQuest: string;
}