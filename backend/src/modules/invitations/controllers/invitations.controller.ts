import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query, UseGuards } from "@nestjs/common";
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
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            else {
                throw new BadRequestException('An error occurred while sending the invitation');
            }
        }
    }

    @Get('validate')
    async validateInvitation(@Query('token') token: string) {
        try {
            return await this.invitService.validateInvitation(token);
        }
        catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            else {
                throw new BadRequestException('An error occurred while validating the invitation');
            }
        }
    }
}
