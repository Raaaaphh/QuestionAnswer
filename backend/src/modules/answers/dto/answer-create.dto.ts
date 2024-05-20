import { IsNotEmpty, IsString } from "class-validator";

export class AnswerCreateDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsString()
    @IsNotEmpty()
    idQuest: string;
}