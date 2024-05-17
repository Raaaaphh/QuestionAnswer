import { Model } from "sequelize-typescript";
import { Answer } from "src/modules/answers/answer.model";
import { Favorite } from "src/modules/favorites/favorite.model";
import { User } from "src/modules/users/user.model";
import { QuestionTag } from "../questiontags/questiontag.model";
export declare class Question extends Model {
    idQuest: string;
    idUser: string;
    user: User;
    title: string;
    description: string;
    context: string;
    votes: number;
    flagsSpam: number;
    flagsInappropiate: number;
    status: boolean;
    answers: Answer[];
    favorites: Favorite[];
    questiontags: QuestionTag[];
}
