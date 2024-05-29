import { AuthService } from "./auth.service";
import { AuthRegisterDto, AuthLoginDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(): string;
    login(authlog: AuthLoginDto): Promise<{
        user: import("../users/user.model").User;
        token: string;
    }>;
    register(authreg: AuthRegisterDto): Promise<import("../users/user.model").User>;
    verifyEmail(emailToken: string): Promise<{
        status: string;
        message: string;
    }>;
}