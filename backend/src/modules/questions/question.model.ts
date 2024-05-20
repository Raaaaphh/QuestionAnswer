import { BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model, HasMany } from "sequelize-typescript";
import { Answer } from "src/modules/answers/answer.model";
import { Favorite } from "src/modules/favorites/favorite.model";
import { User } from "src/modules/users/user.model";
import { QuestionTag } from "../questiontags/questiontag.model";
import { Picture } from "../pictures/picture.model";

@Table
export class Question extends Model {
    @PrimaryKey
    @Column
    idQuest: string;

    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;

    @Column
    title: string;

    @Column
    description: string;

    @Column
    context: string;

    @Column
    votes: number;

    @Column
    flagsSpam: number;

    @Column
    flagsInappropiate: number;

    @Column
    status: boolean;

    @HasMany(() => Answer)
    answers: Answer[];

    @HasMany(() => Favorite)
    favorites: Favorite[];

    @HasMany(() => QuestionTag)
    questiontags: QuestionTag[];

    @HasMany(() => Picture)
    pictures: Picture[];

}