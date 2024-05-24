import { PrimaryKey, Table, Model, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Question } from "../questions/question.model";
import { Picture } from "../pictures/picture.model";
import { User } from "../users/user.model";

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