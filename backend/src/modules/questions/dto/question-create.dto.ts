import { IsNotEmpty, IsString, ArrayMinSize, IsArray, ArrayNotEmpty, IsUUID, IsOptional } from "class-validator";

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

    @IsUUID()
    @IsNotEmpty()
    idUser: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsUUID(undefined, { each: true })
    listTags: string[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @IsString({ each: true })
    listPictures?: string[];
}
