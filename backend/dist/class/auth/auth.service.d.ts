import { AuthLoginDto, AuthRegisterDto } from "./dto";
import { User } from "../users/user.model";
export declare class AuthService {
    private userModel;
    constructor(userModel: typeof User);
    test(): string;
    login(authlog: AuthLoginDto): Promise<string>;
    register(authreg: AuthRegisterDto): Promise<User>;
}
