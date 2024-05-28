import { User } from '../user.model';
import { UserEditMdpDto, UserEditNameDto } from '../dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByName(name: string): Promise<User[]>;
    remove(id: string): Promise<User>;
    editMdp(mdpDto: UserEditMdpDto): Promise<User>;
    editName(userDto: UserEditNameDto): Promise<User>;
    findById(id: string): Promise<User | null>;
    ban(id: string): Promise<User>;
}
