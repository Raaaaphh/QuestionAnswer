import { PrimaryKey, Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Question } from "src/class/questions/question.model";
import { User } from "src/class/users/user.model";

@Table
export class Answer extends Model {

    @PrimaryKey
    @Column
    idAnsw: string;

    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Question)
    @Column
    idQuest: string;

    @BelongsTo(() => Question)
    question: Question;

    @Column
    content: string;

    @Column
    final: boolean;

}