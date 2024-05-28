import { AuthService } from "../services/auth.service";
import { AuthLoginDto, AuthRegisterDto } from "../dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(): string;
    login(authlog: AuthLoginDto): Promise<{
        user: import("../../users/user.model").User;
        token: string;
    }>;
    register(authreg: AuthRegisterDto): Promise<import("../../users/user.model").User>;
    verifyEmail(emailToken: string): Promise<{
        status: string;
        message: string;
    }>;
    registerWithToken(token: string, authreg: AuthRegisterDto): Promise<import("../../users/user.model").User>;
}
