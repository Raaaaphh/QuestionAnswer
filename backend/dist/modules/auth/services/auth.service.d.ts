import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto, AuthRegisterDto } from "../dto";
import { User } from "../../users/user.model";
import { InvitationsService } from "../../invitations/services/invitations.service";
export declare class AuthService {
    private userModel;
    private invitationService;
    private jwtService;
    constructor(userModel: typeof User, invitationService: InvitationsService, jwtService: JwtService);
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
    registerWithToken(token: string, invitationReg: AuthRegisterDto): Promise<User>;
}
