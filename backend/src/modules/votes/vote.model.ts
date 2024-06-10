import { Table, Model, PrimaryKey, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { User } from "../users/user.model";


@Table
export class Vote extends Model {
    @PrimaryKey
    @Column
    idVote: string;

    @ForeignKey(() => Question)
    @Column
    idQuest: string;

    @BelongsTo(() => Question)
    question: Question;

    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;
}