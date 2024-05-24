import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { InvitationsService } from "../services/invitations.service";

@Controller('invitations')
export class InvitationsController {
    constructor(private invitService: InvitationsService) { }

    @Post('send')
    async sendInvitation(@Body('email') email: string, @Body('role') role: string) {
        try {
            return await this.invitService.sendInvitation(email, role);
        }
        catch (error) {
            console.log(error);
        }
    }

    @Get('validate')
    async validateInvitation(@Query('token') token: string) {
        try {
            return await this.invitService.validateInvitation(token);
        }
        catch (error) {
            console.log(error);
        }
    }
}
