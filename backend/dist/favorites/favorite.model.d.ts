import { Model } from "sequelize-typescript";
import { Question } from "src/questions/question.model";
import { User } from "src/users/user.model";
export declare class Favorite extends Model {
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
}
