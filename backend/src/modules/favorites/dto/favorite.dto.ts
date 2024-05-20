import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class FavoriteDto {
    @IsUUID()
    @IsNotEmpty()
    idUser: string;

    @IsUUID()
    @IsNotEmpty()
    idQuest: string;
}