import { AuthService } from "./auth.service";
import { AuthRegisterDto, AuthLoginDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    test(): string;
    login(authlog: AuthLoginDto): Promise<import("../users/user.model").User>;
    register(authreg: AuthRegisterDto): Promise<import("../users/user.model").User>;
}
