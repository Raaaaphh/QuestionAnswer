import { Model } from 'sequelize-typescript';
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
}
export {};
