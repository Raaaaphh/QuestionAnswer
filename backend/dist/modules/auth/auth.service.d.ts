import { AuthLoginDto, AuthRegisterDto } from "./dto";
import { User } from "../users/user.model";
import { MailerService } from "src/mailers/mailer.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private userModel;
    private mailerService;
    private jwtService;
    constructor(userModel: typeof User, mailerService: MailerService, jwtService: JwtService);
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
}
