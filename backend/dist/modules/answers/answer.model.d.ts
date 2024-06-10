import { Model } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { Picture } from "../pictures/picture.model";
import { User } from "../users/user.model";
export declare class Answer extends Model {
    idAnsw: string;
    idUser: string;
    user: User;
    idQuest: string;
    question: Question;
    content: string;
    final: boolean;
    pictures: Picture[];
}
