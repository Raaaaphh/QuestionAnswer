import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.model").User[]>;
    findOne(id: string): Promise<import("./user.model").User>;
    remove(id: string): Promise<void>;
}
