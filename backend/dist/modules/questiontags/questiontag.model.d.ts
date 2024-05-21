import { Model } from "sequelize-typescript";
import { Question } from "src/modules/questions/question.model";
import { Tag } from "../tags/tag.model";
export declare class QuestionTag extends Model {
    idQuest: string;
    question: Question;
    idTag: string;
    tag: Tag;
}
