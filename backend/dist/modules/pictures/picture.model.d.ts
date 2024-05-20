import { Model } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { Answer } from "../answers/answer.model";
export declare class Picture extends Model {
    idImage: string;
    idQuest: string;
    question: Question;
    idAnsw: string;
    answer: Answer;
    imageUrl: string;
}
