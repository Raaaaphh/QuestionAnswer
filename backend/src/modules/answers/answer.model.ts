import { PrimaryKey, Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Question } from "src/modules/questions/question.model";
import { User } from "src/modules/users/user.model";
import { Picture } from "../pictures/picture.model";

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

    @HasMany(() => Picture)
    pictures: Picture[];

}