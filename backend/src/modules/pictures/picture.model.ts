import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { Answer } from "../answers/answer.model";

@Table
export class Picture extends Model {
    @PrimaryKey
    @Column
    idPicture: string;

    @ForeignKey(() => Question)
    @Column
    idQuest: string;

    @BelongsTo(() => Question)
    question: Question;

    @ForeignKey(() => Answer)
    @Column
    idAnsw: string;

    @BelongsTo(() => Answer)
    answer: Answer;

    @Column
    url: string;

}