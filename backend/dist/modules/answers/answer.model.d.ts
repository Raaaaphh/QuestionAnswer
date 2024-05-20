import { Model } from "sequelize-typescript";
import { Question } from "src/modules/questions/question.model";
import { User } from "src/modules/users/user.model";
export declare class Answer extends Model {
    idAnsw: string;
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
    content: string;
    final: boolean;
}
