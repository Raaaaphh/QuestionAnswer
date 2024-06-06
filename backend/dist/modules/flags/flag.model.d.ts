import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Question } from "../questions/question.model";
declare enum Type {
    Spam = "Spam",
    Inappropriate = "Inappropriate"
}
export declare class Flag extends Model {
    idFlag: string;
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
    flagType: Type;
}
export {};
