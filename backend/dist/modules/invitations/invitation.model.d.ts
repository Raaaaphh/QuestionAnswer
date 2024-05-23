import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
export declare class Invitation extends Model {
    idInvitation: string;
    idSender: string;
    sender: User;
    idReceiver: string;
}
