import { Table, Model, PrimaryKey, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { Question } from "src/modules/questions/question.model";
import { Tag } from "../tags/tag.model";

@Table
export class QuestionTag extends Model {

    @PrimaryKey
    @ForeignKey(() => Question)
    @Column
    idQuest: string;

    @BelongsTo(() => Question)
    question: Question;

    @PrimaryKey
    @ForeignKey(() => Tag)
    @Column
    idTag: string;

    @BelongsTo(() => Tag)
    tag: Tag;
}