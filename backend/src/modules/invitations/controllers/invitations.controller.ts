import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { InvitationsService } from "../services/invitations.service";
import { AdminGuard } from "../../../guards/admin.guard";

@Controller('invitations')
export class InvitationsController {
    constructor(private invitService: InvitationsService) { }

    @Post('send')
    @UseGuards(AdminGuard)
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
