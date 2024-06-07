import { Table, Model, PrimaryKey, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Question } from "../questions/question.model";

export enum FlagType {
    Spam = 'Spam',
    Inappropriate = 'Inappropriate',
}


@Table
export class Flag extends Model {
    @PrimaryKey
    @Column
    idFlag: string;

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
    flagType: FlagType;

}