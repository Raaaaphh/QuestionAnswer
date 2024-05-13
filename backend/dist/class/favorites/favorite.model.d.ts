import { Model } from "sequelize-typescript";
import { Question } from "src/class/questions/question.model";
import { User } from "src/class/users/user.model";
export declare class Favorite extends Model {
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
}
