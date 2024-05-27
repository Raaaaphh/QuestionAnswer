import { Model } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { User } from "../users/user.model";
export declare class Vote extends Model {
    idVote: string;
    idQuest: string;
    question: Question;
    idUser: string;
    user: User;
}
