import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AnswerCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsUUID()
    @IsNotEmpty()
    idQuest: string;
}