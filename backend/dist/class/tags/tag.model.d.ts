import { Model } from "sequelize-typescript";
import { User } from "../users/user.model";
export declare class Tag extends Model {
    idTag: string;
    idUser: string;
    user: User;
    name: string;
    description: string;
    occurrence: number;
}
