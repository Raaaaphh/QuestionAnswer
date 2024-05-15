import { AuthLoginDto, AuthRegisterDto } from "./dto";
import { User } from "../users/user.model";
import { MailerService } from "src/Mailers/mailer.service";
export declare class AuthService {
    private userModel;
    private mailerService;
    constructor(userModel: typeof User, mailerService: MailerService);
    test(): string;
    login(authlog: AuthLoginDto): Promise<User>;
    register(authreg: AuthRegisterDto): Promise<User>;
}
