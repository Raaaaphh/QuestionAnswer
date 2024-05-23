import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './invitation.model';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';

@Module({
    imports: [SequelizeModule.forFeature([Invitation])],
    providers: [InvitationsService],
    controllers: [InvitationsController],
})
export class InvitationsModule { }
