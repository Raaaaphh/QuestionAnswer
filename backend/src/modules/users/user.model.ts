import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Question } from '../questions/question.model';
import { Answer } from '../answers/answer.model';
import { Favorite } from '../favorites/favorite.model';
import { Tag } from '../tags/tag.model';
import { Vote } from '../votes/vote.model';


export enum Role {
    SuperAdmin = 'SuperAdmin',
    Lecturer = 'Lecturer',
    Student = 'Student',
}

@Table
export class User extends Model {
    @PrimaryKey
    @Column
    idUser: string;

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    confirmed: boolean;

    @Column
    emailToken: string;

    @Column
    role: Role;

    @Column
    color: string;

    @Column
    banned: boolean;

    @HasMany(() => Question)
    questions: Question[];

    @HasMany(() => Answer)
    answers: Answer[];

    @HasMany(() => Favorite)
    favorites: Favorite[];

    @HasMany(() => Tag)
    tags: Tag[];

    @HasMany(() => Vote)
    listVotes: Vote[];
}

