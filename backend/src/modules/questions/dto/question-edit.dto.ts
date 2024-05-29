import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class QuestionEditDto {

    @IsString()
    @IsNotEmpty()
    idQuest: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    context: string;

    @IsUUID()
    @IsNotEmpty()
    idUser: string;
}