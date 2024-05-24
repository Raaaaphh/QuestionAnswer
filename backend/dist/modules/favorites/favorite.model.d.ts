import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Question } from "../questions/question.model";
export declare class Favorite extends Model {
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
}
