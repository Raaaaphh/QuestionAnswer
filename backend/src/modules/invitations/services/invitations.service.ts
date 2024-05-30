import { Injectable, NotFoundException } from "@nestjs/common";
import { Invitation, Role } from "../invitation.model";
import { JwtService } from "@nestjs/jwt";
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { sendMailInvitation } from "../../../mailers/mail.utils";

@Injectable()
export class InvitationsService {
    constructor(private jwtService: JwtService) { }

    async sendInvitation(email: string, role: string) {
        const invitation = new Invitation();
        invitation.idInvitation = uuidv4();
        invitation.email = email;
        invitation.role = role as Role;
        await invitation.save();

        const payload = { email, role };
        const token = this.jwtService.sign(payload, { expiresIn: '7d' });
        const inviteLink = `http://localhost:5173/register/invitation?token=${token}`;

        await sendMailInvitation(email, inviteLink);
        return invitation;
    }

    async validateInvitation(token: string) {
        try {
            const decoded = this.jwtService.verify(token);
            return { email: decoded.email, role: decoded.role };
        } catch (error) {
            throw new NotFoundException('Invalid or expired token');
        }
    }
}

