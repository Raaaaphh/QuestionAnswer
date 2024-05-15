import { IsNotEmpty, IsString } from "class-validator";

export class QuestionDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;
}