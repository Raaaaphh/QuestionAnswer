import { Model } from 'sequelize-typescript';
import { Answer } from 'src/class/answers/answer.model';
import { Favorite } from 'src/class/favorites/favorite.model';
import { Question } from 'src/class/questions/question.model';
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
}
export {};
