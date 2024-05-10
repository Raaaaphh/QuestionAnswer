import { User } from './user.model';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    remove(id: string): Promise<void>;
}
