import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto, AuthRegisterDto } from "../dto";
import { User } from "../../users/user.model";
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: typeof User, jwtService: JwtService);
    test(): string;
    login(authlog: AuthLoginDto): Promise<{
        user: User;
        token: string;
    }>;
    register(authreg: AuthRegisterDto): Promise<User>;
    verifyEmail(emailToken: string): Promise<{
        status: string;
        message: string;
    }>;
    registerWithToken(token: string, authreg: AuthRegisterDto): Promise<{
        user: User;
        token: string;
    }>;
}
