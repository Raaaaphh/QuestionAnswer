import { Model } from 'sequelize-typescript';
import { Question } from '../questions/question.model';
import { Answer } from '../answers/answer.model';
import { Favorite } from '../favorites/favorite.model';
import { Tag } from '../tags/tag.model';
import { Vote } from '../votes/vote.model';
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
    confirmed: boolean;
    emailToken: string;
    role: Role;
    color: string;
    banned: boolean;
    questions: Question[];
    answers: Answer[];
    favorites: Favorite[];
    tags: Tag[];
    listVotes: Vote[];
}
export {};
