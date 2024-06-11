import { InvitationsService } from "../services/invitations.service";
export declare class InvitationsController {
    private invitService;
    constructor(invitService: InvitationsService);
    sendInvitation(email: string, role: string): Promise<import("../invitation.model").Invitation>;
    validateInvitation(token: string): Promise<{
        email: any;
        role: any;
    }>;
}
