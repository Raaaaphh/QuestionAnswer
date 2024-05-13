import { Model } from 'sequelize-typescript';
import { Answer } from 'src/answers/answer.model';
import { Favorite } from 'src/favorites/favorite.model';
import { Question } from 'src/questions/question.model';
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
    questions: Question[];
    answers: Answer[];
    favorites: Favorite[];
}
export {};
