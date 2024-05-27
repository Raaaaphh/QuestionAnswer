import { IsNotEmpty, IsString, IsUUID, IsArray, ArrayNotEmpty, ArrayMinSize } from "class-validator";

export class QuestionEditDto {

    @IsUUID()
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

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    listTags: string[];
}