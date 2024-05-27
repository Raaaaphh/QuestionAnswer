import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Answer } from "../answers/answer.model";
import { Favorite } from "../favorites/favorite.model";
import { QuestionTag } from "../questiontags/questiontag.model";
import { Picture } from "../pictures/picture.model";
import { Vote } from "../votes/vote.model";
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
    pictures: Picture[];
    listVotes: Vote[];
}
