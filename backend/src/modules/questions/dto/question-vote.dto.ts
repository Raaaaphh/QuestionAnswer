import { IsNotEmpty, IsUUID } from "class-validator";

export class QuestionVoteDto {
    @IsUUID()
    @IsNotEmpty()
    idUser: string;

    @IsUUID()
    @IsNotEmpty()
    idQuest: string;
}