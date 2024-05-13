import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Answer } from 'src/answers/answer.model';
import { Favorite } from 'src/favorites/favorite.model';
import { Question } from 'src/questions/question.model';

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
    role: Role;

    @HasMany(() => Question)
    questions: Question[];

    @HasMany(() => Answer)
    answers: Answer[];

    @HasMany(() => Favorite)
    favorites: Favorite[];
}

