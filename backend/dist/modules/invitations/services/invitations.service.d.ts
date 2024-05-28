import { Invitation } from "../invitation.model";
import { JwtService } from "@nestjs/jwt";
export declare class InvitationsService {
    private questModel;
    private jwtService;
    constructor(questModel: typeof Invitation, jwtService: JwtService);
    sendInvitation(email: string, role: string): Promise<Invitation>;
    validateInvitation(token: string): Promise<{
        email: any;
        role: any;
    }>;
}
