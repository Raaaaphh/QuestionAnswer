import { Model } from "sequelize-typescript";
export declare enum Role {
    SuperAdmin = "SuperAdmin",
    Lecturer = "Lecturer",
    Student = "Student"
}
export declare class Invitation extends Model {
    idInvitation: string;
    email: string;
    role: Role;
}
