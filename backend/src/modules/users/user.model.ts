import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Answer } from 'src/modules/answers/answer.model';
import { Favorite } from 'src/modules/favorites/favorite.model';
import { Question } from 'src/modules/questions/question.model';
import { Tag } from '../tags/tag.model';

enum Role {
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

    @HasMany(() => Question)
    questions: Question[];

    @HasMany(() => Answer)
    answers: Answer[];

    @HasMany(() => Favorite)
    favorites: Favorite[];

    @HasMany(() => Tag)
    tags: Tag[];
}

