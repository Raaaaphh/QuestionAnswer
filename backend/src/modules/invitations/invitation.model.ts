import { PrimaryKey, Table, Model, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../users/user.model";

@Table
export class Invitation extends Model {

    @PrimaryKey
    @Column
    idInvitation: string;

    @ForeignKey(() => User)
    @Column
    idSender: string;

    @BelongsTo(() => User)
    sender: User;

    @ForeignKey(() => User)
    @Column
    idReceiver: string;

}