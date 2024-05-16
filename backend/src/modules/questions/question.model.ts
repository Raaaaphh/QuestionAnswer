import { BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model, HasMany } from "sequelize-typescript";
import { Answer } from "src/class/answers/answer.model";
import { Favorite } from "src/class/favorites/favorite.model";
import { User } from "src/class/users/user.model";

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
}