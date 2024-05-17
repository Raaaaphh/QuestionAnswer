import { BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model, HasMany } from "sequelize-typescript";
import { User } from "../users/user.model";
import { QuestionTag } from "../questiontags/questiontag.model";

@Table
export class Tag extends Model {
    @PrimaryKey
    @Column
    idTag: string;

    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    occurrence: number;

    @HasMany(() => QuestionTag)
    questiontags: QuestionTag[];
}