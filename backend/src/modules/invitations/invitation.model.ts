import { PrimaryKey, Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";

export enum Role {
    SuperAdmin = 'SuperAdmin',
    Lecturer = 'Lecturer',
    Student = 'Student',
}

@Table
export class Invitation extends Model {

    @PrimaryKey
    @Column
    idInvitation: string;

    @Column
    email: string;

    @Column
    role: Role;
}