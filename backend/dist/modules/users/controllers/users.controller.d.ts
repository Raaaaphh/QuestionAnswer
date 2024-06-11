import { UsersService } from "../services/users.service";
import { UserEditMdpDto, UserEditNameDto } from "../dto";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../user.model").User[]>;
    findByName(name: string): Promise<import("../user.model").User[]>;
    findOne(id: string): Promise<import("../user.model").User>;
    remove(id: string): Promise<import("../user.model").User>;
    editMdp(mdpDto: UserEditMdpDto): Promise<import("../user.model").User>;
    editName(nameDto: UserEditNameDto): Promise<import("../user.model").User>;
    ban(id: string): Promise<import("../user.model").User>;
}
