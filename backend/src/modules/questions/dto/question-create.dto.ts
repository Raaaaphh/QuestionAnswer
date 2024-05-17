import { IsNotEmpty, IsString } from "class-validator";

export class QuestionCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    context: string;

    @IsString()
    @IsNotEmpty()
    idUser: string;

    listTags: any[];
}