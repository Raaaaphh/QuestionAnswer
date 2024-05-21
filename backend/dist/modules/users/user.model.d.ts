import { Model } from 'sequelize-typescript';
import { Answer } from 'src/modules/answers/answer.model';
import { Favorite } from 'src/modules/favorites/favorite.model';
import { Question } from 'src/modules/questions/question.model';
import { Tag } from '../tags/tag.model';
declare enum Role {
    SuperAdmin = "SuperAdmin",
    Lecturer = "Lecturer",
    Student = "Student"
}
export declare class User extends Model {
    idUser: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    color: string;
    questions: Question[];
    answers: Answer[];
    favorites: Favorite[];
    tags: Tag[];
}
export {};
