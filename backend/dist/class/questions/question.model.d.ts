import { Model } from "sequelize-typescript";
import { Answer } from "src/class/answers/answer.model";
import { Favorite } from "src/class/favorites/favorite.model";
import { User } from "src/class/users/user.model";
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
}
