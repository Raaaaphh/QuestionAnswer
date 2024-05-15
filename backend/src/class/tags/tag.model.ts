import { BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table
export class Tag extends Model {
    @PrimaryKey
    @Column
    idTag: string;

    @ForeignKey(() => User)
    @Column
    idUser: string;

    @BelongsTo(() => User)
    user: User;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    occurrence: number;
}