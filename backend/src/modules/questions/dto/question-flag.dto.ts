import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class QuestionFlagDto {
    @IsUUID()
    @IsNotEmpty()
    idUser: string;

    @IsUUID()
    @IsNotEmpty()
    idQuest: string;

    @IsString()
    @IsNotEmpty()
    flagType: string;
}