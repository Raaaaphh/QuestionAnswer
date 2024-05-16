import { Table, Model, PrimaryKey, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { Question } from "src/modules/questions/question.model";
import { User } from "src/modules/users/user.model";

@Table
export class Favorite extends Model {

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;

    @PrimaryKey
    @ForeignKey(() => Question)
    @Column
    idQuest: string;

    @BelongsTo(() => Question)
    question: Question;
}